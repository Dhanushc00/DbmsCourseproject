const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.post("/upd", async (req, res, next) => {
  // if(!req.body){
  //   console.log("0--0"+req.body);
  //   return res.sendStatus(500);
  // }
  let { data, id } = req.body;
  //console.log(req.params);
  console.log(data, id);
  //res.setHeader("Access-Control-Allow-Origin","*");
  let sql = "";
  await db.query(
    `delete from Cart where CustID=${req.body.id};`,
    async (err1, result) => {
      if (err1) return res.status(500).json({ msg: err1 });
      Object.values(data).map((q) => {
        sql += `(${req.body.id},${Number(q.id)},${q.qty}),`;
      });
      let len = String(sql).length;
      let sql1 = String(sql).substring(0, len - 1);
      console.log(sql1);
      await db.query(`insert into Cart values${sql1};`, (err, response) => {
        console.log("asdf");
        if (err) return res.status(500).json({ msg: err });
        else return res.status(200).json({ msg: "updated" });
      });
    }
  );

  //console.log('sikl');
});

router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  console.log(req.query.CustID);
  db.query(
    `select * from Location where LocID=(select LocID from Customer where CustID=${req.query.CustID});`,
    (err, response) => {
      console.log(String(response));
      return res.status(200).json(response);
    }
  );
});

module.exports = router;
