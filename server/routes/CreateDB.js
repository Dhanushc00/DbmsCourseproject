const express = require('express');
const router = express.Router();
const config = require('../config');
const {menuValue} = require('../insertValues');
const db=require('../db');

router.get('/', (req, res, next) => {
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
  db.query("create table Employee(EmpID int NOT NULL, EmpName varchar(15) NOT NULL, Phone int NOT NULL, Gender char(1), Joindate date NOT NULL, Password varchar(30) NOT NULL, primary key(EmpID));");
  db.query("create table Customer(CustID int NOT NULL,CustName varchar(15) NOT NULL, LocID int NOT NULL, Phone_no int NOT NULL, primary key (CustID), foreign key(LocID) references Location(LocID));");
  db.query("create table Cart(CustID int NOT NULL, ItemID int, Quantity int, primary key(CustID,ItemID), foreign key(ItemID) references Menu(ItemID), foreign key(CustID) references Customer(CustID));");
  db.query("create table Vehicle(VehicleID int NOT NULL, LocID int, Status varchar(7), primary key(VehicleID), foreign key(LocID) references Location(LocID));");
  db.query("create table Delivery_Agent(EmpID int NOT NULL,CurrentStatus varchar(5) NOT NULL, VehicleID int, primary key(EmpID), foreign key (EmpID) references Employee(EmpID));");
  db.query("create table Desk_Employee(EmpID int NOT NULL, Desk_No int NOT NULL, primary key(EmpID), foreign key (EmpID) references Employee(EmpID));");
  db.query("create table Payment(PaymentID int NOT NULL, Payment_method varchar(5) NOT NULL, Payment_Amt float(7,2) NOT NULL, primary key(PaymentID));");
  db.query("create table OrderDetails(CustID int NOT NULL,OrderID int NOT NULL, PaymentID int NOT NULL, OrderTimeStamp TIMESTAMP NOT NULL,  primary key(OrderID), foreign key(CustID) references Customer(CustID), foreign key(PaymentID) references Payment(PaymentID));");
  db.query("create table OrderItems(OrderID int NOT NULL, ItemID int NOT NULL, ItemPrice float(6,2) NOT NULL, Quantity int NOT NULL, primary key(OrderID,ItemID), foreign key(OrderID) references OrderDetails(OrderID), foreign key(ItemID) references Menu(ItemID));");
  db.query("create table Delivers(EmpID int NOT NULL, LocID int NOT NULL, OrderID int NOT NULL,foreign key (EmpID) references Employee(EmpID), foreign key(LocID) references Location(LocID), foreign key(OrderID) references OrderDetails(OrderID), primary key(OrderID));");
  // /*------------------------------------------------------*/
  menuValue.map(q=>{
      sql=`insert into Menu values(${q.id},${q.price},"${q.name}","${q.status}");`;
      db.query(sql);
  })
  db.query(`insert into Location values(${101},"Address","LandMark");`);
  db.query(`insert into Customer values(${100},"Mithun",${101},${98008808});`);
  res.send("inside ./createDB.....");
  });
  
  module.exports=router;