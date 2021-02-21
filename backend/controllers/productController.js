import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all Products
// GET /api/products
// desc Fetch all products
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            //mongodb $regex
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})

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
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = new Product({
        name: name,
        price: price,
        user: req.user._id,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock,
        numbReviews: 0,
        description: description,
        rating: 0
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


// Get top rated products
// GET /api/products/top
// Private
const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)

})


export {getProducts, getProductById, DeleteProduct, createProduct, updateProduct, createProductReview, getTopProducts}