import React, {useState, useEffect} from 'react';
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET,} from "../constants/orderConstants";

const OrderScreen = ({match}) => {

    const orderId = match.params.id

    const dispatch = useDispatch()


    const orderDetails = useSelector(state => state.orderDetails)

    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)

    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)

    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    if (!loading) {
        // calculate price
        order.itemsPrice = order.orderItems.reduce((acc, item) => (
            acc + item.price * item.qty
        ), 0)

        order.shippingPrice = order.itemsPrice > 100 ? 0 : 5
    }
    useEffect(() => {
        if (!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
        }
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId, successDeliver, successPay])

    const SuccessPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <Row>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name :</strong>{order.user.name}</p>
                                <p><a href="{`mailto : ${order.user.email}`}">{order.user.email}</a></p>
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.country},
                                    {order.shippingAddress.postalCode},
                                </p>
                                {order.isDelivered ?
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                    <Message variant='danger'>Not Delivered</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method : </strong>
                                <p>  {order.paymentMethod.paymentMethod}</p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                    <Message variant='danger'>Not paid</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> :

                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <Row className="mt-3" key={item.product}>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        ))}
                                    </ListGroup>

                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {loadingDeliver && <loader/>}
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button onClick={deliverHandler} type='button' className='btn btn-block'>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button onClick="SuccessPaymentHandler" variant='info'>
                                    Pay
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
};

export default OrderScreen;