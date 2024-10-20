const express = require('express')
const dotenev = require('dotenv').config()
const Dbconnect = require('./config/Dbconnection')
const router = require('./routes/Userroutes')
const Taxrate = require('./controller/Usercontroller')
const cors = require('cors')
const app = express();

//Db connection
Dbconnect();
app.use(express.json());
app.use('/api/v1',router);
app.use(cors());


const port = process.env.PORT;



app.listen(port , (req,res)=>{
    console.log(`Server Listenning at Port ${port}`);
})
