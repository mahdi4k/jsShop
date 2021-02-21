// Create Category (ADMIN)
// POST /api/category
//Private/Admin
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
    const {name,products,slug} = req.body


    const category = new Category({
        name: name,
        slug: slug,
        products: products,
    })

    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
})
export {createCategory}