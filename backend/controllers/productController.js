import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all Products
// GET /api/products
// desc Fetch all products
const getProducts = asyncHandler(async (req, res) => {
    //mongodb syntax
    const keyword = req.query.keyword ? {
        name : {
            $regex : req.query.keyword,
            $options : 'i'
        }
    }:{}

    const products = await Product.find({...keyword})
    res.json(products)

})
// Fetch single Products
// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'})
    }
})

// Delete Product   (ADMIN)
// DELETE /api/products/:id
//Private/Admin
const DeleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404).json({message: 'Product not found'})
    }
})

// Create Product (ADMIN)
// POST /api/products
//Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 10,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sam',
        category: 'sample',
        countInStock: 1,
        numbReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// Update Product (ADMIN)
// PUT /api/products/:id
//Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// Create new review
// POST /api/products/:id/reviews
//Private/
const createProductReview = asyncHandler(async (req, res) => {

    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(404)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


export {getProducts, getProductById, DeleteProduct, createProduct, updateProduct, createProductReview}