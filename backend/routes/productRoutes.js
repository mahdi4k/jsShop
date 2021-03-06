import express from 'express'

const router = express.Router()
import {
    getProductById,
    getProducts,
    DeleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin, DeleteProduct).put(protect, admin, updateProduct)
router.get('/rating/top',getTopProducts)

export default router