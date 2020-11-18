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
  db.query(`update Location set Address="${req.body.address}" where LocID=(select LocID from Customer where CustID=${req.body.CustID});`);
  db.query(
    `insert into Payment values(NULL,"${req.body.meth}",${req.body.price});`,()=>{
      db.query(`select max(PaymentID) as PID from Payment;`, (err, response) => {
        db.query(
          `insert into OrderDetails values(${req.body.CustID},NULL,${response[0].PID},now(),'WT');`,
          () => {
            db.query(
              `select max(OrderID) as OID from OrderDetails;`,
              (err, res1) => {
                db.query(
                  `select C.ItemID,M.ItemPrice,C.Quantity from Cart C,Menu M where C.ItemID=M.ItemID and C.CustID=${req.body.CustID};`,
                  (err, res2) => {
                    console.log(res1[0]);
                    let sql="";
                    res2.map((q) =>
                          sql+=`(${res1[0].OID},${q.ItemID},${q.ItemPrice},${q.Quantity}),`
                    );
                    sql=sql.substr(0,sql.length-1);
                    console.log(sql);
                    db.query(
                      `insert into OrderItems values${sql};`
                    )
                    db.query(`delete from Cart where CustID=${req.body.CustID};`, () => {
                      return res.status(200).json({ msg: "updatesucces" });
                    });
                  }
                );
              }
            );
          }
        );
      });
    }
  );

 


  // select max(OrderID) as OID from OrderDetails;
  // select C.ItemID,M.ItemPrice,C.Quantity from Cart C,Menu M where C.ItemID=M.ItemID and C.CustID=#value;

  // #Flushing the Cart after order
  // delete from Cart where CustID=#value;

  // #In Loop
  // insert into OrderItems values(OrderID,ItemID,ItemPrice,ItemQty);
});

module.exports = router;
