const express = require("express");
const router = express.Router();
const config = require("../config");
const db=require('../db');

//db.
router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  //console.log(req.query);
  let sql = "select O.OrderID,O.OrderTimeStamp from OrderDetails O where O.Status='WT';";
  db.query(sql, (err, response) => {
    return res.status(200).json(response);;
  });
});

module.exports = router;
