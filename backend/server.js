import express from 'express'
import connectDB from './config/db.js'
import products from './data/products.js'
import  dotenv  from 'dotenv'
const app = express()

dotenv.config()

connectDB()

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find( product => product._id === req.params.id)
    res.json(product) 
})

app.listen(5000 , console.log(`Server running on port ${process.env.PORT}`)) 