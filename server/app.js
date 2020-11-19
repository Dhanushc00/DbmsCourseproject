//const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const db=require("./db");
const cors = require('cors');
const {menuValue} =require("./insertValues");
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/menu',require('./routes/Menu'));
app.use('/createDB',require('./routes/CreateDB'));
app.use('/cart',require('./routes/Cart'));
app.use('/signUP',require('./routes/SignUp'));
app.use('/signIn',require('./routes/SignIn'));
app.use('/placeOrder',require('./routes/placeOrder'));
app.use('/myOrders',require('./routes/myOrders'));
app.use('/empSignIn',require('./routes/EmpSignIn'));
app.use('/delAgt',require('./routes/DelAgent'));
app.use('/deskApp',require('./routes/DeskApp'));
app.use('/address',require('./routes/Address'));
///DeskApp/Assign
app.use('/DeskApp',require('./routes/DeskApp'));
const server=app.listen(3009, () => {
    console.log("Server Started !!");
  });
server.timeout=12000000;
