import arknights from "../../static/arknights.mjs";
import mysql from "../../db/index.mjs";
import { exchangeContext } from "../../static/context.mjs";
import moment from "moment";

export function getContext(req, res) {
  const sql = `insert into arknight.context set ?`;
  let contextObj = exchangeContext();

  contextObj.arr4.forEach((item, index) => {
    mysql.query(
      sql,
      {
        context: item,
        problem: contextObj.arr5[index].join(","),
      },
      (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1)
          return res.cc("礼包未获取成功，请重新刷新页面");
      }
    );
  });

  
  //   当数据库数据大于200条时清空数据
  const sql2 = `select * from arknight.context`;
  mysql.query(sql2, (err, result) => {
    if (err) return res.cc(err);
    if (result.length > 200) {
        console.log(result)
      const sql3 = `truncate table arknight.context`;
      mysql.query(sql3, (err, result) => {
        if (err) return res.cc(err);
      });

    }
  });

  res.send({
    status: "0",
    exchangeGift: arknights.personlCenter.exchangeGift,
    context: contextObj.arr4,
  });
}

export function getGift(req, res) {
  const { context } = req.body;
  let time = moment().format("YYYY-MM-DD hh:mm:ss a");


  const sql = `select * from arknight.context where context = ?`;
  mysql.query(sql, context, (err, result) => {
    if (err) return res.cc(err);
    if (result.length < 1) return res.cc("礼包未获取成功，请重新刷新页面");
    // console.log(result);

    const sql3 = `SELECT SLEEP(20);SELECT SLEEP(20);delete from arknight.context where context = ?`;
    mysql.query(sql3, context, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("未知错误");
    });

    res.send({
      status: "0",
      items: result[0].problem,
      time,
    });
  });
}
