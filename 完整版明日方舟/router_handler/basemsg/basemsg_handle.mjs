import mysql from "../../db/index.mjs";
import { deal,checkCode } from "../../static/dealData.mjs";

export function baseMsg(req, res) {
    const userinfo = req.body;
  
    userinfo.telephone = deal(userinfo.telephone, userinfo.telephone.length - 4);
  
    console.log(userinfo)
  
    // 查询数据库
    const sql = "select * from arknight.userinfo";
    mysql.query(sql, (err, result) => {
      if (err) return res.cc(err);
  
      if (result.affectedRows < 1) return res.cc("用户不存在");
      result.forEach((item, index) => {
        if (
          userinfo.telephone == item.telephone &&
          userinfo.userId == item.userid
        ) {
          Object.values(result[index]).map((item) => {});
          let { id, status,UID,userid,IP, ...user } = result[index];
  
          res.send({ status: "0", user });
          return;
        }
      });
    });
  }
  
  // 邮箱修改
  export function setEmail(req, res) {
    // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
    const userinfo = req.body;
    userinfo.email = deal(userinfo.email, userinfo.email.indexOf("@"));
  
    userinfo.telephone = deal(userinfo.telephone, userinfo.telephone.length - 4);
  
    const sql = `select * from arknight.telcode where code = ?`;
    mysql.query(sql,[ userinfo.code], (err, result) => {
      if (err) return res.cc(err);
      // 18813766116
      if (result.length != 1) return res.cc("验证码不存在或已过期");
  
      if(result[0].code != userinfo.code) return res.cc("验证码输入有误或已过期")
  
          const sql2 = `update arknight.userinfo set email = ? where telephone = ? and userid = ?`;
          mysql.query(
            sql2,
            [userinfo.email, userinfo.telephone, userinfo.userId],
            (err2, result2) => {
              if (err2) return res.cc(err2);
  
              if (result2.affectedRows != 1) return res.cc("邮箱修改失败");
  
              res.send({ status: "0", message: "邮箱修改成功！" });
            }
          );
    });
  }
  
  // 手机号修改
  export function setTel(req, res) {
    // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
    const userinfo = req.body;
  
    userinfo.telephone = deal(userinfo.telephone, userinfo.telephone.length - 4);
  
    const sql = `select * from arknight.telcode where code = ?`;
    mysql.query(sql, userinfo.code, (err, result) => {
      if (err) return res.cc(err);
  
      if (result.length != 1) return res.cc("验证码不存在或已过期");
  
      if(result[0].code != userinfo.code) return res.cc("验证码输入有误或已过期")
  
      const sql2 = `update arknight.userinfo set telephone = ? where telephone = ? and userid = ?`;
      mysql.query(
        sql2,
        [userinfo.telephone, userinfo.userId],
        (err2, result2) => {
          if (err2) return res.cc(err2);
  
          if (result2.affectedRows != 1) return res.cc("手机号修改失败");
  
          res.send({ status: "0", message: "手机号修改成功！" });
        }
      );
    });
  }
  
  // 身份证修改
  export function setID(req, res) {
    // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
    const userinfo = req.body;
  
    userinfo.telephone = deal(userinfo.telephone, userinfo.telephone.length - 4);
    
  
    const sql = `select * from arknight.telcode where code = ?`;
    mysql.query(sql, userinfo.code, (err, result) => {
      if (err) return res.cc(err);
  
      if (result.length != 1) return res.cc("验证码不存在或已过期");
  
      if(result[0].code != userinfo.code) return res.cc("验证码输入有误或已过期")
  
      if(checkCode(userinfo.idNumber)){
      userinfo.idNumber = deal(userinfo.idNumber,userinfo.idNumber.length-4)
  
      const sql2 = `update arknight.userinfo set idNumber = ? where telephone = ? and userid = ?`;
      mysql.query(
        sql2,
        [userinfo.idNumber,userinfo.telephone, userinfo.userId],
        (err2, result2) => {
          if (err2) return res.cc(err2);
  
          if (result2.affectedRows != 1) return res.cc("身份证修改失败");
  
          res.send({ status: "0", message: "身份证修改成功！" });
        }
      );
    }else{
        res.cc("身份证输入有误，请重新输入")
    }
    });
  }
  
  // 昵称修改
  export function setNickName(req,res){
    const {nickName,userId} = req.body
  
    const sql = `update arknight.userinfo set playerName = ? where userid = ?`;
    mysql.query(
      sql,
      [nickName,userId],
      (err, result) => {
        if (err) return res.cc(err);
  
        if (result.affectedRows != 1) return res.cc("昵称修改失败");
  
        res.send({ status: "0", message: "昵称修改成功！" });
      }
    );
  }