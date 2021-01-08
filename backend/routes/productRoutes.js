import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel'
const router = express.Router()


// Feth all Ptoducts
// GET /api/products
// desc Fetch all products

router.get('/', asyncHandler (async(req,res)=>{
    const product = await Product.find({})
}))


// Feth single Ptoducts
// GET /api/products
router.get('/:id',asyncHandler((req,res)=>{
     const product = await Product.findById(req.params.id)

     if(product){
         res.json(product)
     } else {
         res.status(404).json({ message : 'Product not found' })
     }
}))

export default router