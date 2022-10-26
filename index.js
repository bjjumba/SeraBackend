const express=require('express')
const cors =require('cors')
const mongoose=require('mongoose')
const products=require('./products')
const register=require('./Routes/register')
const login=require('./Routes/login')
const app =express()
require('dotenv').config()
//applying middleware(helpers)

app.use(express.json())
app.use(cors())

app.use("/api/register",register)
app.use("/api/login",login)
app.get("/",(req,res)=>{
    res.send("Welcome to our Server")
})
app.get("/products",(req,res)=>{
    res.send(products)
})


const uri=process.env.ATLAS_DB_URI
const port =process.env.PORT || 5000
app.listen(port,console.log(`Server lsitening at port ${port}`))

mongoose.connect(process.env.ATLAS_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Database Connected successfully")).catch((err)=>console.log(`Error message:${err.message}`))









