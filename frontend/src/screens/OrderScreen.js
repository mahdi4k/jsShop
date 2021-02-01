import React, {useState, useEffect} from 'react';
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import {getOrderDetails} from "../actions/orderActions";

const OrderScreen = ({match}) => {

    const orderId = match.params.id

    const dispatch = useDispatch()


    const orderDetails = useSelector(state => state.orderDetails)

    const {order, loading, error} = orderDetails


    if (!loading){
        // calculate price
        order.itemsPrice = order.orderItems.reduce((acc, item) => (
            acc + item.price * item.qty
        ), 0)

        order.shippingPrice = order.itemsPrice > 100 ? 0 : 5
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

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
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method : </strong>
                                {order.paymentMethod.paymentMethod}
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

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
};

export default OrderScreen;