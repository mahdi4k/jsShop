import express from 'express'

const router = express.Router()
import {getProductById, getProducts ,DeleteProduct} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";



router.route('/' ).get(getProducts)
router.route('/:id' ).get(getProductById).delete(protect,admin,DeleteProduct)


export default router