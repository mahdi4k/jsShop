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
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// update order To Paid
// GET /api/orders/:id/pay
// desc Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// update order to delivered
// GET /api/orders/:id/deliver
// desc Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// get logged in user order
// GET /api/orders/myOrders
// desc Private
const getMyOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

// get all orders
// GET /api/orders
// desc Private/Admin
const getOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {addOrderItems, getOrderByID, updateOrderToPaid, getMyOrder, getOrder,updateOrderToDelivered}