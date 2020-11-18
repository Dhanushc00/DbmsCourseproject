const express = require('express');
const router = express.Router();
const config = require('../config');
const db=require('../db');
/*---------------------------------------------------------------------------------------------
---------------------------THIS ROUTE WAS MADE SOLELY FOR THE PURPOSE OF DBMS PROJECT----------
-----------------------------------------------------------------------------------------------
*/
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
db.query("create table Menu(ItemID int NOT NULL AUTO_INCREMENT, ItemPrice float(6,2) NOT NULL, ItemName varchar(60) NOT NULL, Item_Status varchar(5), primary key(ItemID));");
db.query("create table Location(LocID int NOT NULL AUTO_INCREMENT, Address varchar(100) NOT NULL, Landmarks varchar(60), primary key(LocID));");
db.query("create table Employee(EmpID int NOT NULL, EmpName varchar(15) NOT NULL, Phone varchar(11) NOT NULL, Gender char(1), Joindate date NOT NULL, Password varchar(30) NOT NULL, primary key(EmpID));");
db.query("create table Customer(CustID int NOT NULL AUTO_INCREMENT,CustName varchar(15) NOT NULL, LocID int NOT NULL, Phone_no varchar(11) NOT NULL, primary key (CustID,Phone_no), foreign key(LocID) references Location(LocID));");
db.query("create table Cart(CustID int NOT NULL, ItemID int, Quantity int, primary key(CustID,ItemID), foreign key(ItemID) references Menu(ItemID), foreign key(CustID) references Customer(CustID));");
db.query("create table Vehicle(VehicleID int NOT NULL, LocID int, Status varchar(7), primary key(VehicleID), foreign key(LocID) references Location(LocID));");
db.query("create table Delivery_Agent(EmpID int NOT NULL,CurrentStatus varchar(5) NOT NULL, primary key(EmpID), foreign key (EmpID) references Employee(EmpID));");
db.query("create table Desk_Employee(EmpID int NOT NULL, Desk_No int NOT NULL, primary key(EmpID), foreign key (EmpID) references Employee(EmpID));");
db.query("create table Payment(PaymentID int NOT NULL AUTO_INCREMENT, Payment_method varchar(5) NOT NULL, Payment_Amt float(7,2) NOT NULL, primary key(PaymentID));");
db.query("create table OrderDetails(CustID int NOT NULL,OrderID int NOT NULL AUTO_INCREMENT, PaymentID int NOT NULL, OrderTimeStamp datetime default CURRENT_TIMESTAMP NOT NULL, Status varchar(2), primary key(OrderID), foreign key(CustID) references Customer(CustID), foreign key(PaymentID) references Payment(PaymentID));");
db.query("create table OrderItems(OrderID int NOT NULL, ItemID int NOT NULL, ItemPrice float(6,2) NOT NULL, Quantity int NOT NULL, primary key(OrderID,ItemID), foreign key(OrderID) references OrderDetails(OrderID), foreign key(ItemID) references Menu(ItemID));");
db.query("create table Delivers(EmpID int NOT NULL, LocID int NOT NULL, OrderID int NOT NULL,foreign key (EmpID) references Employee(EmpID), foreign key(LocID) references Location(LocID), foreign key(OrderID) references OrderDetails(OrderID), primary key(OrderID));");
/*--------AutoInc Table-------------*/
db.query("alter table Menu AUTO_INCREMENT=601;");
db.query("alter table OrderDetails AUTO_INCREMENT=401;");
db.query("alter table Customer AUTO_INCREMENT=102;");
db.query("alter table Location AUTO_INCREMENT=201;");
db.query("alter table Payment AUTO_INCREMENT=701;");

db.query("insert into Menu values(NULL,200, 'Reg.Pizza','avl');");
db.query("insert into Menu values(NULL,300, 'Med.Pizza','avl');");
db.query("insert into Menu values(NULL,450, 'Lar.Pizza','avl');");
db.query("insert into Menu values(NULL,175, 'Rice Bowl','avl');");
db.query("insert into Menu values(NULL,350, 'Grill Chicken','avl');");
db.query("insert into Menu values(NULL,460, 'Cheese Grill Chicken','avl');");
db.query("insert into Menu values(NULL,125, 'Chicken Biryani','avl');");
db.query("insert into Menu values(NULL,225, 'Lollypop Chicken','avl');");
db.query("insert into Menu values(NULL,250, '1KG Black Forest','avl');");
db.query("insert into Menu values(NULL,135, '0.5KG Black Forest','avl');");

db.query("insert into Location values(NULL,'121 Sivasakthi Nagar' , 'Arun Icecream Parlour');");
db.query("insert into Location values(NULL,'11 KPN Nagar' , 'Black and white Saloon');");
db.query("insert into Location values(NULL,'140 Kumar Nagar' , 'Dominos Pizza');");
db.query("insert into Location values(NULL,'34/9 Gandhi Nagar' , 'Apple service Center');");
db.query("insert into Location values(NULL,'1 Park Avenue' , 'Arasan Arisi Mandi');");
db.query("insert into Location values(NULL,'13 Prime Appartments' , 'Balaji Electrical Shop');");
db.query("insert into Location values(NULL,'121/45 Vivekanadhar Colony' , 'Supreme Mobiles');");
db.query("insert into Location values(NULL,'134/18 Golden Nagar' , 'Vasanth And Co');");
db.query("insert into Location values(NULL,'48 Brindhavan Nagar' , 'Gandhi Park');");
db.query("insert into Location values(NULL,'59 Karupurayan Colony' , 'Stadium Sports Corner');");

db.query("insert into Employee values(301, 'Kunal', '8907680243', 'M',DATE '2010-07-19', 'Ironmanrocks24');");
db.query("insert into Employee values(302, 'Sejal', '8956750243', 'F',DATE '2008-06-01', 'Crystalpal13');");
db.query("insert into Employee values(303, 'Harry', '7307683243', 'M',DATE '2009-03-13', 'Engineer101');");
db.query("insert into Employee values(304, 'Simran', '7907685243', 'F',DATE '2010-05-23', 'SimplePassword');");
db.query("insert into Employee values(305, 'Grace', '8907680243', 'F',DATE '2011-07-29', 'Greatday1234');");
db.query("insert into Employee values(306, 'Karthi', '8907680243', 'M',DATE '2009-05-09', 'MySecurePassword12');");
db.query("insert into Employee values(307, 'Jai', '8779023243', 'M',DATE '2009-08-30', 'Panther23434');");
db.query("insert into Employee values(308, 'Sandy', '8457367243', 'M',DATE '2010-07-21', 'Hacker12345');");
db.query("insert into Employee values(309, 'Siva', '7786890003', 'M',DATE '2010-09-11', 'Uncrackable123');");
db.query("insert into Employee values(310, 'Sheela', '8212380243', 'F',DATE '2012-07-11', 'Jarvisisgreat1908');");
db.query("insert into Employee values(401, 'Jack', '8212389043', 'M',DATE '2012-07-11', 'ididgreat111908');");
db.query("insert into Employee values(404, 'Jack1', '9212389043', 'M',DATE '2012-07-11', 'ididgreat111908');");
db.query("insert into Employee values(405, 'Jack2', '7212389043', 'M',DATE '2012-07-11', 'ididgreat111908');");
db.query("insert into Employee values(406, 'Jack3', '8412389043', 'M',DATE '2012-07-11', 'ididgreat111908');");
db.query("insert into Employee values(407, 'Jack4', '8212389043', 'M',DATE '2012-07-11', 'ididgreat111908');");

db.query("insert into Customer values(101,'Mithun', 201, '9294029977');");
db.query("insert into Customer values(102,'Dhanush', 202, '9924029971');");
db.query("insert into Customer values(103,'Vicky', 203, '9993027972');");
db.query("insert into Customer values(104,'Rohit' , 204, '9934029673');");
db.query("insert into Customer values(105,'Dinesh' , 205, '9944022974');");
db.query("insert into Customer values(106,'Gireesh' , 206, '9994042975');");
db.query("insert into Customer values(107,'Giri' , 207, '9994029276');");
db.query("insert into Customer values(108,'Sai' , 208, '9994629178');");
db.query("insert into Customer values(109,'Gokul' , 209, '9994729379');");
db.query("insert into Customer values(110,'Marry' , 210, '9994021370');");

db.query("insert into Cart values(101,604,1);");
db.query("insert into Cart values(102,602,2);");
db.query("insert into Cart values(103,603,3);");
db.query("insert into Cart values(104,607,4);");
db.query("insert into Cart values(105,610,5);");
db.query("insert into Cart values(106,608,1);");
db.query("insert into Cart values(107,607,3);");
db.query("insert into Cart values(108,609,1);");
db.query("insert into Cart values(109,601,2);");
db.query("insert into Cart values(110,605,3);");

db.query("insert into Vehicle values(901, 201,'N/A');");
db.query("insert into Vehicle values(902, 203,'N/A');");
db.query("insert into Vehicle values(903, NULL,'avl');");
db.query("insert into Vehicle values(904, NULL,'avl');");
db.query("insert into Vehicle values(905, NULL,'avl');");
db.query("insert into Vehicle values(906, 206,'N/A');");
db.query("insert into Vehicle values(907, 202,'N/A');");
db.query("insert into Vehicle values(908, NULL,'avl');");
db.query("insert into Vehicle values(909, NULL,'avl');");
db.query("insert into Vehicle values(910, 208,'N/A');");

db.query("insert into Delivery_Agent values(301,'N/A');");
db.query("insert into Delivery_Agent values(302,'avl');");
db.query("insert into Delivery_Agent values(304,'N/A');");
db.query("insert into Delivery_Agent values(305,'N/A');");
db.query("insert into Delivery_Agent values(306,'N/A');");
db.query("insert into Delivery_Agent values(307,'N/A');");

db.query("insert into Desk_Employee values(303,11);");
db.query("insert into Desk_Employee values(308,12);");
db.query("insert into Desk_Employee values(309,13);");
db.query("insert into Desk_Employee values(310,14);");

db.query("insert into Payment values(NULL,'Card',973.5);");
db.query("insert into Payment values(NULL,'UPI',708);");
db.query("insert into Payment values(NULL,'COD',442.5);");
db.query("insert into Payment values(NULL,'UPI',896.5);");
db.query("insert into Payment values(NULL,'COD',560.5);");
db.query("insert into Payment values(NULL,'Card',619.5);");
db.query("insert into Payment values(NULL,'UPI',236);");
db.query("insert into Payment values(NULL,'Card',354);");
db.query("insert into Payment values(NULL,'UPI',531);");
db.query("insert into Payment values(NULL,'COD',236);");
db.query("insert into Payment values(NULL,'Card',413);");
db.query("insert into Payment values(NULL,'COD',572.3);");

db.query("insert into OrderDetails values(101,NULL,701,TIMESTAMP'2020-04-20 00:00:05','DL');");
db.query("insert into OrderDetails values(101,NULL,702,TIMESTAMP'2020-05-02 20:40:01','DL');");
db.query("insert into OrderDetails values(103,NULL,703,TIMESTAMP'2020-05-18 21:00:00','DL');");
db.query("insert into OrderDetails values(105,NULL,704,TIMESTAMP'2020-06-19 13:25:34','DL');");
db.query("insert into OrderDetails values(106,NULL,705,TIMESTAMP'2020-06-22 14:07:04','DL');");
db.query("insert into OrderDetails values(106,NULL,706,TIMESTAMP'2020-08-08 18:09:23','DL');");
db.query("insert into OrderDetails values(104,NULL,707,TIMESTAMP'2020-08-19 09:20:56','DL');");
db.query("insert into OrderDetails values(107,NULL,708,TIMESTAMP'2020-08-25 04:23:12','DL');");
db.query("insert into OrderDetails values(107,NULL,709,TIMESTAMP'2020-09-18 07:45:16','DL');");
db.query("insert into OrderDetails values(108,NULL,710,TIMESTAMP'2020-09-19 10:54:19','DL');");
db.query("insert into OrderDetails values(108,NULL,711,TIMESTAMP'2020-10-12 12:12:18','WT');");
db.query("insert into OrderDetails values(103,NULL,712,TIMESTAMP'2020-10-13 13:13:10','WT');");

db.query("insert into OrderItems values(401,601,200,1);");
db.query("insert into OrderItems values(401,603,450,1);");
db.query("insert into OrderItems values(401,604,175,1);");
db.query("insert into OrderItems values(402,602,300,2);");
db.query("insert into OrderItems values(403,607,125,3);");
db.query("insert into OrderItems values(404,602,300,1);");
db.query("insert into OrderItems values(404,606,460,1);");
db.query("insert into OrderItems values(405,608,225,1);");
db.query("insert into OrderItems values(405,609,250,1);");
db.query("insert into OrderItems values(406,607,125,1);");
db.query("insert into OrderItems values(406,608,225,1);");
db.query("insert into OrderItems values(406,604,175,1);");
db.query("insert into OrderItems values(407,601,200,1);");
db.query("insert into OrderItems values(408,602,300,1);");
db.query("insert into OrderItems values(409,603,450,1);");
db.query("insert into OrderItems values(410,601,200,1);");
db.query("insert into OrderItems values(411,605,350,1);");
db.query("insert into OrderItems values(412,605,350,1);");
db.query("insert into OrderItems values(412,610,135,1);");

db.query("insert into Delivers values(401,201,401);");
db.query("insert into Delivers values(404,203,402);");
db.query("insert into Delivers values(405,206,403);");
db.query("insert into Delivers values(406,202,404);");
db.query("insert into Delivers values(407,208,405);");

res.send("inside ./createDB.....");
});
  
module.exports=router;