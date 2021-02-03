import express from 'express'

const router = express.Router()
import {addOrderItems, getOrderByID, updateOrderToPaid, getMyOrder} from "../controllers/orderController.js";
import {protect} from "../middleware/authMiddleware.js";


router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router