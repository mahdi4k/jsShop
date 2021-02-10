import express from 'express'

const router = express.Router()
import {
    getProductById,
    getProducts,
    DeleteProduct,
    createProduct,
    updateProduct
} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";



router.route('/' ).get(getProducts).post(protect,admin,createProduct)
router.route('/:id' ).get(getProductById).delete(protect,admin,DeleteProduct).put(protect,admin,updateProduct)


export default router