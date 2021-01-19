import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all Products
// GET /api/products
// desc Fetch all products
const getProducts = asyncHandler(async (req,res)=>{
    const products = await  Product.find({})
    res.json(products)

})
// Fetch single Products
// GET /api/products
const getProductById = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'})
    }
})
export {getProducts,getProductById}