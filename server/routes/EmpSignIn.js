const { json, response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("../config");
const db = require("../db");

//db.
router.post("/", (req, res, next) => {
  //let {custID} = req.body;
  //console.log(req.params);
  //console.log(custID);
  let sql=`select EmpName,EmpID from Employee where EmpID=${req.body.EmpId} and Password="${req.body.Password}";`;
  db.query(sql,(err,response)=>{
    console.log(response,sql);
    if(err||response.length==0||response==null||response==undefined){
      return res.status(400).json({msg:"You have entered an invalid username or password"});
    }
    return  res.status(200).json(response[0]);
  })
});

module.exports = router;
