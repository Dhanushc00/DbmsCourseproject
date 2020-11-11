const { json } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");
const {parse, stringify} = require('flatted');
//db.
router.post("/", (req, res, next) => {
  let {data} = req.body;
  //console.log(data);
  console.log(parse(stringify(data)));
  let sql;
  Object.values(data).map((q) => {
    sql = `insert into Cart values(${100},${Number(q.id)},${q.qty});`;
    db.query(sql);
  });
  db.query("SELECT * from Cart",(err,response)=>res.status(200).send(stringify(response)));
  
  return "Success";
  //   let sql = "SELECT * from Menu;";
  //   db.query(sql, (err, response) => {
  //     if (err) throw err;
  //     console.log(response);
  //     res.setHeader("Access-Control-Allow-Origin","*");
  //     res.status(200).json(response);
  //     //res.send('Database Created ....')
  //     return response;
  //   });
});

module.exports = router;
