const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  console.log(req.query);
  db.query(`select O.OrderID,O.OrderTimeStamp,P.Payment_method from OrderDetails O,Payment P  where P.PaymentID=O.PaymentID and O.CustID=${req.query.CustID};`,(err, response) => {
      //if(err) console.log(err); 
      //console.log(`select OrderID,OrderTimeStamp from OrderDetails where CustID=${req.query.CustID};`,response);
      return res.status(200).send(response);
    });

});

router.get("/Items", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  console.log(req.params);
  db.query(
    `select M.ItemName,OT.Quantity,OT.ItemPrice,P.Payment_Amt,P.Payment_method from Payment P,OrderItems OT, Menu M ,OrderDetails where OT.ItemID=M.ItemID and OT.OrderID=OrderDetails.OrderID and OrderDetails.PAYMENTID=P.PAYMENTID and OT.OrderID=${req.query.OrderID};`,
    (err, res1) => {
      return res.status(200).json(res1);
    }
  );
});
module.exports = router;
