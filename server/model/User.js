const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    BussinessName:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const User = mongoose.model('User', userSchema); 

module.exports = User;