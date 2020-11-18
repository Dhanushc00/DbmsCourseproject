const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.post("/", (req, res, next) => {
  let { Name, PhNo, AddressLine1, Landmark } = req.body;
  //console.log(req.params);
  console.log(Name);
  let sql;
  //   Object.values(data).map((q) => {
  //     sql = `insert into Cart values(${100},${Number(q.id)},${q.qty});`;
  //     db.query(sql);
  //   });
  //res.setHeader("Access-Control-Allow-Origin","*");
  db.query(`insert into Location values(NULL,"${AddressLine1}","${Landmark}rest");`,(err,res3)=>console.log(err,response));
  db.query("select max(LocID) as LID from Location;",(err,response)=>{
    db.query(`insert into Customer values(NULL,"${Name}",${response[0].LID},"${PhNo}");`,(err,response1)=>console.log(err,response1));
    db.query("select max(CustID) as id from Customer;",(err,response2)=>{
      res.status(200).json(response2[0]); 
      return response2;
    })
  });
 
  //let res1;
  
 //return res1;
  // let sql1 = "select max(CustID) as id from Customer;";
  // let custID = 100;
  // db.query(sql1, (err, response) => {
  //   if(err) custID=100;
  //   console.log(response);
  //   if(response.id==null){
  //       custID=100;
  //   }else{
  //       console.log(response.id);
  //       custID=response+1;
  //   }
  // });
  // sql = `insert into Customer values(${custID},"${Name}",${PhNo},"${AddressLine1}","${Landmark}");`;
  // db.query(sql, (err, response) => {
  //   if (err) {
  //     res.status(400);
  //     console.log("errr");
  //     console.log(err);
  //     return String(err);
  //   }
  //   res.status(200).send(response);
  //   console.log(response);
  //   console.log(sql);
  //   return JSON.stringify(response);
  // });
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
