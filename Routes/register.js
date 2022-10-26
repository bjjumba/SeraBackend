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
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(6).max(200).required().email(),
      password: Joi.string().min(6).max(200).required()
    })

    const{error}=schema.validate(req.body)
    //returning a validation error
    if(error) return res.status(400).status(400).json({
      success:false,
      error:error.details[0]
    })
    //check if a user exists
    let Checkuser=await User.findOne({email:email})
    if(Checkuser) return res.status(400).status(400).json({
      success:false,
      message:"user already exists......."
    })
   
    let user=new User({
        name,
        email,
        password
    })
//generating the salt
const salt=await bcrypt.genSalt(10)
//adding salt too much salt for the hackers
user.password=await bcrypt.hash(user.password,salt)

//saving object
let savedUser=await user.save()
//jwt function 
const token=genAuthToken(savedUser)

res.status(200).json({
  success: true,
  token
})

})

module.exports=router