const express = require("express");
const router = express.Router();
const config = require("../config");
const db=require('../db');

//db.
router.get("/", (req, res, next) => {
  //console.log("Menu Request---:" + req);
  let sql = "SELECT * from Menu;";
  db.query(sql, (err, response) => {
    if (err) throw err;
    //console.log(response);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.status(200).json(response);
    //res.send('Database Created ....')
    return response;
  });
});

module.exports = router;
