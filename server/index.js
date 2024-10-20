const express = require('express')
const dotenv = require('dotenv').config();
const Dbconnect = require('./config/Dbconnection')
const app = express();

//Db connection
Dbconnect();
app.use(express.json());

const port = process.env.PORT;
app.listen(port, (req, res) => {
    console.log(`Server Listenning at port ${port}`);
})