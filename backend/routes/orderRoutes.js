import express from 'express'
const router = express.Router()
import {addOrderItems, getOrderByID, updateOrderToPaid, getMyOrder , getOrder , updateOrderToDelivered} from "../controllers/orderController.js";
import {protect,admin} from "../middleware/authMiddleware.js";



router.route('/').post(protect, addOrderItems).get(protect,admin,getOrder)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin , updateOrderToDelivered)

export default router