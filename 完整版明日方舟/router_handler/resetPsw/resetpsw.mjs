import svgCaptcha from "svg-captcha";
import mysql from "../../db/index.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.mjs";
import { randomCode } from "../../sendCode/utils.mjs";
import { sendCodes } from "../../sendCode/aliyun.mjs";
export function resetPsw(req, res) {
  const userinfo = req.body;

  const sql = `select * from arknight.telcode where code = ?`;

  mysql.query(sql, userinfo.code, (err, result) => {
    if (err) return res, cc(err);
    if (result.length !== 1) return res.cc("验证码不存在或已失效");

    const sql2 = "select * from arknight.user where userid=?";
    mysql.query(sql2, userinfo.userId, (err2, result2) => {
      // 执行sql语句失败
      if (err2) return res.cc(err2);
      // 执行成功，但影响的数据不足一行
      if (result2.length !== 1) return res.cc("用户不存在");

      // 将用户输入的密码与数据库内密码进行比对
      const compareResult = bcrypt.compareSync(
        userinfo.oldPassword,
        result2[0].password
      );

      // 密码比对结果为false，登录失败
      if (!compareResult) {
        return res.cc("密码错误");
      }

        // 加密密码
      userinfo.newPassword = bcrypt.hashSync(userinfo.password, 10);
      console.log(userinfo.userId, userinfo.newPassword)

      const sql3 = `update arknight.user set password = ? where userid = ?`;
      mysql.query(
        sql3,
        [userinfo.newPassword,userinfo.userId],
        (err3, result3) => {
          if (err3) return res.cc(err3);
          console.log(result3.affectedRows)
          console.log(result3)
          if(result3.affectedRows != 1) return res.cc("密码修改失败")

          res.send({ status: "0", message: "密码修改成功！" });
        }
      );
    });
  });
}

export function getPswCode(req,res){
  // 接收客户端传递过来的手机号和图形验证码
  const { userId,telephone } = req.body;
  // 查询数据库中短信验证码
  const sql = "select * from arknight.user where userid = ?";
  mysql.query(sql, userId, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("用户不存在");
    // 验证码正确，发送短信
    const code = randomCode(4); //生成4位数字随机验证码

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