const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.post("/", (req, res, next) => {
  let {PhNo} = req.body;
  //console.log(req.params);
  console.log(PhNo);
  let sql;
  //   Object.values(data).map((q) => {
  //     sql = `insert into Cart values(${100},${Number(q.id)},${q.qty});`;
  //     db.query(sql);
  //   });
  db.query(`select CustID from Customer where Phone_no='${PhNo}';`,(err,response)=>{res.status(200).json(response[0]);return response[0];});
  //res.setHeader("Access-Control-Allow-Origin","*");
 

 
 
  //db.query("SELECT * from Cart",(err,response)=>res.status(200).send(stringify(response)));

  //return response;
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
