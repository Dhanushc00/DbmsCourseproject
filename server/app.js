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


app.listen(3009, () => {
    console.log("Server Started !!");
  });
