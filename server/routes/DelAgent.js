const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.get("/", (req, res, next) => {
  //let {custID} = req.body;
  console.log(req.query.EmpID);
  //console.log(custID);
  let sql=`select OI.Quantity,M.ItemName,OI.ItemPrice,OI.OrderID from OrderItems OI,Menu M where OrderID=(select OrderID as OID from Delivers where EmpID=${req.query.EmpID}) and OI.ItemID=M.ItemID;`;
  db.query(sql,(err,response)=>{
    console.log(response,sql);
    if(err||response.length==0||response==null||response==undefined){
      return res.status(400).json({msg:"You have no Orders!"});
    }
    return  res.status(200).json(response);
  })
});

router.get("/Details", (req, res, next) => {
    //let {custID} = req.body;
    console.log(req.query.EmpID);
    //console.log(custID);
    let sql=`select * from Employee E,Location L where E.EmpID=${req.query.EmpID} and L.LocID=(select D.LocID from Delivers D where EmpID=${req.query.EmpID});`;
    db.query(sql,(err,response)=>{
      console.log(response,sql);
    //   if(err||response.length==0||response==null||response==undefined){
    //     return res.status(400).json({msg:"You have no Orders!"});
    //   }
      return  res.status(200).json(response[0]);
    })
  });

  router.get("/Delivered", (req, res, next) => {
    //let {custID} = req.body;
    console.log(req.query.EmpID);
    let sql=`update OrderDetails set Status='DL' where OrderID=${req.query.OrderID};`;

    let sql2=`update Delivery_Agent set CurrentStatus='avl' where EmpID=${req.query.EmpID};`
    //console.log(custID);
    db.query(sql,(err,response)=>{
      console.log(response,sql);
        db.query(sql2,(err,res1)=>{
            return  res.status(200).json(res1);
        })
    })
  });

module.exports = router;
