const bcrypt = require('bcrypt')
const Joi=require('joi')
const express= require('express')
const genAuthToken=require('../utils/genAuthToken')
const {User}= require('../Models/user')

const router=express.Router()

router.post("/",async(req,res)=>{
    const {email,password,name} = req.body
    //using Joi to validate our request body
    const schema=Joi.object({
      email: Joi.string().min(6).max(200).required().email(),
      password: Joi.string().min(6).max(200).required()
    })

    const {error}=schema.validate(req.body)
    //returning a validation error
    if(error) return res.status(400).json({
        success:false,
        error:error.details[0]
      })

    //check if a user exists
    let Checkuser=await User.findOne({email:email})
    if(!Checkuser) return res.status(400).json({
      success:false,
      message:"Invalid Email or Password...."
    })
    //comparing passwords and passwords
    const isValid=await bcrypt.compare(req.body.password,Checkuser.password)//returns true if the passwords are the same and viceversa
    if(!isValid) return res.status(400).json({success:false, message:"Invalid Email or Password"})

    //if the password and email test is passed then->
    const token=genAuthToken(Checkuser)

    return res.status(200).json({success:true,token})



})

module.exports =router