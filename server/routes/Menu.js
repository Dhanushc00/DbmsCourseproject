const express = require("express");
const router = express.Router();
const config = require("../config");
//const mysql = require("mysql");
const db=require('../db');

//db.
async function Menu() {

}

router.get("/", (req, res, next) => {
  console.log("Menu Request---:" + req);
  let sql = "SELECT * from Menu;";
  db.query(sql, (err, response) => {
    if (err) throw err;
    console.log(response);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.status(200).send(response);
    //res.send('Database Created ....')
  });
});

module.exports = router;
