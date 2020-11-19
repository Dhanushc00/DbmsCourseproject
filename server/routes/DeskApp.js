const { response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  //console.log(req.query);
  let sql ="select O.OrderID,O.OrderTimeStamp from OrderDetails O where O.Status='WT';";
  db.query(sql, (err, response) => {
    return res.status(200).json(response);
  });
});

router.get("/AssignAgent", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  //console.log(req.query);
  let sql =
    "select D.EmpID,E.EmpName,E.Phone from Employee E, Delivery_Agent D where E.EmpID=D.EmpID and D.CurrentStatus='avl';";
  db.query(sql, (err, response) => {
    return res.status(200).json(response);
  });
});

router.post("/AssignAgent", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  //console.log(req.query);
  let sql1 = `select LocID as LID from Customer,OrderDetails where OrderDetails.OrderID=${req.body.OrderID} and OrderDetails.CustID=Customer.CustID;`;
  console.log(sql1);

  let sql3 = `update Delivery_Agent set CurrentStatus='N/A' where EmpID=${req.body.EmpID};`;
  let sql4 = `update OrderDetails set Status='OD' where OrderID=${req.body.OrderID};`;

  db.query(sql1, (err, response) => {
    console.log(response);
    let sql2 = `insert into Delivers values(${req.body.EmpID},${response[0].LID},${req.body.OrderID});`;
    console.log(sql2);
    db.query(sql2, (err, res1) => {
      console.log(sql3);
      db.query(sql3, (err, res2) => {
        console.log(sql4);
        db.query(sql4, () => {
          return res.status(200).json({ msg: "success" });
        });
      });
    });
  });
});

router.get("/menu", (req, res, next) => {
  let sql = "select * from Menu;";
  db.query(sql, (err, response) => {
    return res.status(200).json(response);
  });
});

router.post("/updmenu", (req, res, next) => {
  console.log(req.body);
  let r = req.body.Avl == "Y" ? "avl" : "N/A";
  let sql=`update Menu set ItemPrice=${req.body.Price}, ItemName="${req.body.name}", Item_Status="${r}" where ItemID=${req.body.id};`;
  db.query(sql,(err,response)=>{
    console.log(sql);
    console.log(err);
    if(err){
      return res.status(400).json({msg:err})
    }
    db.query("select * from Menu",(err,res1)=>{
      return res.status(200).json(res1);
    })
  })
});

router.delete("/updmenu", (req, res, next) => {
  console.log(req.body);
  let sql=`DELETE FROM Menu WHERE ItemID =${req.body.id}`;
  db.query(sql,(err,response)=>{
    if(err){
      return res.status(400).json({msg:err})
    }
    db.query("select * from Menu",(err,res1)=>{
      return res.status(200).json(res1);
    })
  })
});

router.put("/updmenu", (req, res, next) => {
  console.log(req.body);
  let r = req.body.Avl == "Y" ? "avl" : "N/A";
  let sql=`insert into Menu values(NULL,${req.body.Price},"${req.body.name}","${r}")`;
  db.query(sql,(err,response)=>{
    db.query("select * from Menu",(err,res1)=>{
      return res.status(200).json(res1);
    })
  })
});

module.exports = router;
