const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type: String,
        required:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type: String,
        required:true,
        minLength:3,
        maxLength:200,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minLength:3,
        maxLength:1024,
        unique: true
    },
})

const User =mongoose.model('User',UserSchema);

exports.User=User