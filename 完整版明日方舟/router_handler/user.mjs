import { randomCode, sendCode } from "../sendCode/utils.mjs";
import { sendCodes } from "../sendCode/aliyun.mjs";
import svgCaptcha from "svg-captcha";
import mysql from "../db/index.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.mjs";
import { deal } from "../static/dealData.mjs";

// 发放数字验证码
export function getCode(req, res) {
  // 数字验证码样式
  var codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: "0o1i", // 验证码字符中排除 0o1i
    noise: 4, // 干扰线条的数量
    fontSize: 42,
    color: true, //开启文字颜色
    background: "#aa88ff", //背景色
    width: 150,
    height: 44,
  };

  // 生成验证码
  var captcha = svgCaptcha.createMathExpr(codeConfig);
  req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
  var codeData = {
    img: captcha.data,
  };

  // 将验证码存入数据库
  const sql = "insert into arknight.codes set ?";
  mysql.query(
    sql,
    { code: req.session.captcha, time: req.session.cookie._expires },
    (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("验证码存入数据库失败");
    }
  );

  // 定时清除数据库中的过期验证码,2分钟消除一次
  const sql2 = `SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);delete from arknight.codes where ?`;
  mysql.query(sql2, { time: req.session.cookie._expires }, (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("验证码清除失败");
  });

  res.type("svg");
  res.send(codeData.img);
}

// 短信验证码发放
export function telCode(req, res) {
  // 接收客户端传递过来的手机号和图形验证码
  const { telephone, mathCode } = req.body;
  // 查询数据库中短信验证码
  const sql = "select * from arknight.codes where code = ?";
  mysql.query(sql, mathCode, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("验证码不存在或已过期");
    if (result[0].code !== mathCode) return res.cc("验证码错误");

    // 验证码正确，发送短信
    const code = randomCode(4); //生成4位数字随机验证码

    // 通讯云
    /*     sendCode("13129697383",5201,function(success){
            console.log(success)
            if(success){
                res.send("短信验证码已发送");
            }else{
                res.send("短信验证码发送失败");
            }
        }) */

    // 阿里云接口
    sendCodes(telephone, code)
      .then((results) => {
        // console.log(results);
        if (results.data.status == "OK") {

          const sql3 = `insert into arknight.telcode set ?`
          mysql.query(sql3,{ code, time: req.session.cookie._expires + "-telCode" },(err,result)=>{
            // console.log(result.affectedRows)
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc("验证码获取失败");
          })

          const sql4 = `SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);SELECT SLEEP(20);delete from arknight.telcode where ?`
          mysql.query(sql4,{time: req.session.cookie._expires + "-telCode" },(err,result)=>{
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc("验证码获取失败");
          })

          res.send({ status: 0, message: "短信验证码已发送" });

        } else {
          res.send(results.data.reason);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });
}

// 账号注册
export function register(req, res) {
  const userinfo = req.body;

  if (!userinfo.telephone || !userinfo.password || !userinfo.code) {
    return res.send({ status: 1, msg: "手机或密码或验证码不能为空!" });
  }
  
  userinfo.telephone = deal(userinfo.telephone,userinfo.telephone.length - 4)

  function delExtra(str) {
    if (!str.includes("/") && !str.includes(" ") && !str.includes(":")) {
      return str;
    } else {
      if (str.includes("/")) {
        str = str.replace("/", "");
        return delExtra(str);
      } else if (str.includes(":")) {
        str = str.replace(":", "");
        return delExtra(str);
      } else if (str.includes(" ")) {
        str = str.replace(" ", "");
        return delExtra(str);
      }
    }
  }

  // 定义sql语句  检测用户名是否被占用
  let sql = "select * from arknight.user where telephone=? and userid=?";
  mysql.query(sql, [userinfo.telephone, userinfo.userId], (err, result) => {
    if (err) return res.send({ status: 1, msg: err.message });
    if (result.length > 0)
      return { status: 1, msg: "手机号已存在，请创建其它手机号" };
  });

  // 加密密码
  userinfo.password = bcrypt.hashSync(userinfo.password, 10);
  let userid = new Date().toLocaleString();

  userid = delExtra(userid);

  // 于数据库中新建用户
  let sql3 = "insert into arknight.user set ?";
  mysql.query(
    sql3,
    { telephone: userinfo.telephone, password: userinfo.password, userid },
    (err, result) => {
      if (err) return res.send({ status: 1, msg: err.message });

      // mysql语句执行成功，但影响行数不足为1
      if (result.affectedRows !== 1)
        return res.send({ status: 1, msg: "手机号注册失败,请稍后再试！" });

      const userinfoObj = {
        userid,
        UID: "night" + userid,
        telephone:userinfo.telephone,
        email: userid + "请填写邮箱",
        playerName: userid + "请填写昵称",
        IP: req.ip + " " + userid,
        idNumber: userid + "请填写身份证",
      };

      let sql4 = "insert into arknight.userinfo set ?";
      mysql.query(sql4, userinfoObj, (err, result) => {
        if (err) return res.send({ status: 1, msg: "注册失败！" });

        // mysql语句执行成功，但影响行数不足为1
        if (result.affectedRows !== 1)
          return res.send({ status: 1, msg: "手机号注册失败,请稍后再试！" });

        // 注册成功
        return res.send({
          message: "账号注册成功！...",
          userId: userid,
          UID: "night" + userid,
          status: "0",
        });
      });
    }
  );
  return;
}

// 密码登录
export function login(req, res) {
  // console.log(req.headers.origin)
  // res.header("Access-Control-Allow-Origin", req.headers.origin);
  // 接收数据
  const userinfo = req.body;

  userinfo.telephone = deal(userinfo.telephone,userinfo.telephone.length - 4)

  // 查询数据库中的用户名
  const sql = "select * from arknight.user where telephone=? and userid=?";
  mysql.query(sql, [userinfo.telephone, userinfo.userId], (err, result) => {
    // 执行sql语句失败
    if (err) return res.cc(err);
    // 执行成功，但影响的数据不足一行
    if (result.length !== 1) return res.cc("登录失败");

    // 将用户输入的密码与数据库内密码进行比对
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      result[0].password
    );

    // 密码比对结果为false，登录失败
    if (!compareResult) {
      return res.cc("密码错误");
    }

    // 剔除密码和头像的值
    const user = { ...res[0], password: "" };

    // 将客户信息对象加密，生成token
    const token = jwt.sign(user, config.jwtSecretKet, {
      expiresIn: "24h", // token有效期为24h
    });

    // 将生成的响应字符串响应给客户端
    res.send({
      status: 0,
      telephone: userinfo.telephone,
      message: "登录成功!请稍候...",
      token: "Bearer " + token, // 便于客户端使用，直接响应服务器端的bearer
    });
  });
}

// 短信登录
export function codeLogin(req, res) {
  // 接收数据
  const userinfo = req.body;

  if (!userinfo.telephone || !userinfo.code) {
    return res.send({ status: 1, msg: "手机或验证码不能为空!" });
  }

  userinfo.telephone = deal(userinfo.telephone,userinfo.telephone.length - 4)

  // 查询数据库中的用户名
  const sql = "select * from arknight.user where telephone=? and userid=?";
  mysql.query(sql, [userinfo.telephone, userinfo.userId], (err, result) => {
    // 执行sql语句失败
    if (err) return res.cc(err);
    // 执行成功，但影响的数据不足一行
    if (result.length !== 1) return res.cc("登录失败");
    const user = { ...res[0], password: "" };

    // 将客户信息对象加密，生成token
    const token = jwt.sign(user, config.jwtSecretKet, {
      expiresIn: "24h", // token有效期为24h
    });

    // 将生成的响应字符串响应给客户端
    res.send({
      status: 0,
      telephone: userinfo.telephone,
      message: "登录成功!请稍候...",
      token: "Bearer " + token, // 便于客户端使用，直接响应服务器端的bearer
    });
  });
}
