import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserProfile} from "../actions/userAction";
import {listMyOrders} from "../actions/orderActions";

//we can't use user login detail for update because is be save in localstorage when the user
//login to website and be not  updated value when a value updated
const ProfileScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    // check if user is login
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderMyList = useSelector(state => state.orderMyList)
    const {error: errorOrder, loading: orderLoading, data} = orderMyList

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [history, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== ConfirmPassword) {
            setMessage('Password do not match')
        } else {
            // dispatch Update profile
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }

    }
    return <Row>
        <Col md={3}>

            <h2>User Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name}
                                  onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email}
                                  onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}
                                  onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter confirm password' value={ConfirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>


        </Col>
        <Col md={9}>
            <h2>My orders</h2>
            {orderLoading ? <Loader/> : errorOrder ? <Message variant='danger'>{errorOrder}</Message> :

                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>PAID</th>
                            <th>Delivered</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map(order =>(
                                <tr key={order._id}>
                                <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) :  <i style={{color:'red'}} className='fas fa-times'> </i>  }</td>
                                    <td>{order.isDelivered ? order.isDelivered.substring(0,10) :  <i style={{color:'red'}} className='fas fa-times'> </i>  }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            }
        </Col>
    </Row>;
};

export default ProfileScreen;