const { response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  console.log(req.query);
  db.query(
    `select * from (select ItemID,Quantity from Cart where CustID=${req.query.CustID}) as C  natural right outer join Menu;`,
    (err, response) => {
      res.status(200).json(response);
      return response;
    }
  );
  // db.query(`SELECT * from CART WHERE CustID=${req.query.CustID}`,(err,response)=>{
  //   let cartItems=[],Qty={};
  //   cartItems=response;
  //   Object.values(cartItems).map(q=>{Qty[q.ItemID]=q.Quantity;console.log(q.ItemID,q.Quantity);});
  // });

  // // console.log("--------");
  // // console.log(Qty);
  // // console.log(cartItems);
  // // console.log("--------");
  // let sql = "SELECT * from Menu;";
  // db.query(sql, (err, response) => {
  //   if (err) throw err;
  //   //console.log(response);
  //   res.setHeader("Access-Control-Allow-Origin","*");
  //   let tp=response.map(q=>({...q,qty:isNaN(Qty[q.ItemID])?0:Qty[q.ItemID]}));
  //   console.log(tp);
  //   res.status(200).json(tp);
  //   //res.send('Database Created ....')
  //   return response;
  // });
});

module.exports = router;
