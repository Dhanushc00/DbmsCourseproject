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
  let sql=`select OI.Quantity,M.ItemName,OI.ItemPrice,OI.OrderID from OrderItems OI,Menu M where OrderID=(select max(OrderID) as OID from Delivers where EmpID=${req.query.EmpID}) and OI.ItemID=M.ItemID;`;
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
    //let sql=`select * from (select OrderID as OID from Delivers where EmpID=${req.query.EmpID}) D natural join (select * from OrderDetails where Status="WL") O;`;
    // let sql1=`select L.Address,L.Landmarks,C.Phone_no from Location L, Customer C,OrderDetails OI where OI.OrderID=(select max(OrderID) as OID from Delivers where EmpID=${req.query.EmpID} and Status="WT") and OI.CustID=C.CustID and C.LocID=L.LocID;`;
    // db.query(sql,(err,response)=>{
    //   console.log(response,sql);
    //   return  res.status(200).json(response[0]);
    // })
    /*
      select L.Address,L.Landmarks,L.Phone_no,E.EmpID from (select L.Address,L.Landmarks,C.Phone_no from Location L, Customer C,OrderDetails OI where OI.OrderID=(select max(OrderID) as OID from Delivers where EmpID=501) and OI.CustID=C.CustID and C.LocID=L.LocID) L natural join (select * from Employee where 
      EmpID=501) E;
    */
    //let sql2=`select L.Address,L.Landmarks,C.Phone_no from Location L, Customer C,OrderDetails OI where OI.OrderID=OID and OI.CustID=C.CustID and C.LocID=L.LocID;`;
    let sql2=`select L.Address,L.Landmarks,L.Phone_no,E.EmpName from (select L.Address,L.Landmarks,C.Phone_no from Location L, Customer C,OrderDetails OI where OI.OrderID=(select max(OrderID) as OID from Delivers where EmpID=${req.query.EmpID}) and OI.CustID=C.CustID and C.LocID=L.LocID and OI.Status="OD") L natural join (select * from Employee where EmpID=${req.query.EmpID}) E;`;
      console.log(sql2);
    db.query(sql2,(err,response)=>{
        if(err){
          return res.send(400).json({msg:"No ORder left..."})
        }
        return res.status(200).json(response[0]);
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
