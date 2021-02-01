import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// Create new order
// POST /api/orders
// desc Private
const addOrderItems = asyncHandler(async (req, res) => {

    const {
        orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            shippingPrice,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            user: req.user._id
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

})


// get order by ID
// GET /api/orders/:id
// desc Private
const getOrderByID = asyncHandler(async (req, res) => {

})
export { addOrderItems }