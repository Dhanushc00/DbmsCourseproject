//const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const db=require("./db");
const {menuValue} =require("./insertValues");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  /*------------------DB Creation--------------------*/
let sql="drop database onlineFood";
db.query(sql,(err,response)=>
  {if(err) console.log(err);
    console.log(response);
  })
sql="CREATE DATABASE onlineFood";
db.query(sql,(err,response)=>
  {if(err) throw err;
    console.log(response);
  })
sql="use onlineFood";
db.query(sql,(err,response)=>
  {if(err) throw err;
    console.log(response);
  })
/*------------------Table Creation--------------------*/
db.query("create table Menu(ItemID int NOT NULL, ItemPrice float(6,2) NOT NULL, ItemName varchar(60) NOT NULL, Item_Status varchar(5), primary key(ItemID));");
db.query("create table Location(LocID int NOT NULL, Address varchar(100) NOT NULL, Landmarks varchar(60), primary key(LocID));");
// db.query("create table Employee(EmpID int NOT NULL, EmpName varchar(15) NOT NULL, Phone int NOT NULL, Gender char(1), Joindate date NOT NULL, Password varchar(30) NOT NULL, primary key(EmpID));");
// db.query("create table Customer(CustID int NOT NULL,CustName varchar(15) NOT NULL, LocID int NOT NULL, Phone_no int NOT NULL, primary key (CustID), foreign key(LocID) references Location);");
// db.query("create table Cart(CustID int NOT NULL, ItemID int, Quantity int, primary key(CustID,ItemID), foreign key(ItemID) references Menu, foreign key(CustID) references Customer);");
// db.query("create table Vehicle(VehicleID int NOT NULL, LocID int, Status varchar(7), primary key(VehicleID), foreign key(LocID) references Location);");
// db.query("create table Delivery_Agent(EmpID int NOT NULL,CurrentStatus varchar(5) NOT NULL, VehicleID int, primary key(EmpID), foreign key (EmpID) references Employee);");
// db.query("create table Desk_Employee(EmpID int NOT NULL, Desk_No int NOT NULL, primary key(EmpID), foreign key (EmpID) references Employee);");
// db.query("create table Payment(PaymentID int NOT NULL, Payment_method varchar(5) NOT NULL, Payment_Amt float(7,2) NOT NULL, primary key(PaymentID));");
// db.query("create table OrderDetails(CustID int NOT NULL,OrderID int NOT NULL, PaymentID int NOT NULL, OrderTimeStamp TIMESTAMP NOT NULL,  primary key(OrderID), foreign key(CustID) references Customer, foreign key(PaymentID) references Payment);");
// db.query("create table OrderItems(OrderID int NOT NULL, ItemID int NOT NULL, ItemPrice float(6,2) NOT NULL, Quantity int NOT NULL, primary key(OrderID,ItemID), foreign key(OrderID) references OrderDetails, foreign key(ItemID) references Menu);");
// db.query("create table Delivers(EmpID int NOT NULL, LocID int NOT NULL, OrderID int NOT NULL,foreign key (EmpID) references Employee, foreign key(LocID) references Location, foreign key(OrderID) references OrderDetails, primary key(OrderID));");
// /*------------------------------------------------------*/

menuValue.map(q=>{
    sql=`insert into Menu values(${q.id},${q.price},"${q.name}","${q.status}");`;
    db.query(sql);
})





res.send("Success !!");
});


app.use('/menu',require('./routes/Menu'));


// app.get('/createdb',()=>{
//     let sql="CREATE TABLE Menu (ItemID NUMBER(3) NOT NULL, ItemPrice NUMBER(3,2) NOT NULL, ItemName VARCHAR(60) NOT NULL, Item_Status VARCHAR(5), PRIMARY KEY(ItemID));";
//     db.query(sql,(err,res)=>
//     {if(err) throw err;
//       console.log(res);
//       //res.send('Database Created ....')
//     })
//     console.log('rapap');
// })



// app.get('/menu',(req,res)=>{
//     let sql="SELECT * from Menu;";
//     const tp=db.query(sql,(err,response)=>
//     {if(err) throw err;
//       console.log(response);
//       res.setHeader("Access-Control-Allow-Origin","*");
//       res.status(200).send(response);
//       //res.send('Database Created ....')
//       return response;
//     })
//     return tp;
// //     console.log('rapap');
// })
app.listen(3009, () => {
    console.log("Server Started !!");
  });
