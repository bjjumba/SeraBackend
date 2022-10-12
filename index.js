const express=require('express')
const cors =require('cors')
const products=require('./products')
const app =express()

//applying middleware(helpers)

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to our Server")
})
app.get("/products",(req,res)=>{
    res.send(products)
})

const port =process.env.PORT || 5000
app.listen(port,console.log(`Server lsitening at port ${port}`))









