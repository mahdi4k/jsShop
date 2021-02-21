import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {CreateCategory} from "../../actions/categoryAction";
import {Link} from "react-router-dom";
import {CATEGORY_CREATE_RESET} from "../../constants/CategoryConstants";

const CategoryCreateScreen = ({history}) => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const categoryCreate = useSelector(state => state.CategoryProduct)
    const {error: errorCreate, loading: loadingCreate, success: successCreate} = categoryCreate

    useEffect(() => {
        dispatch({type: CATEGORY_CREATE_RESET})

        if (successCreate) {
            history.push(`/admin/productlist`)
        }

    }, [history, successCreate])


    const submitHandler = async (e) => {
        const slug =  name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

        e.preventDefault()
        dispatch(CreateCategory({name, slug}))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <Container className='py-3 w3-animate-opacity'>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={12}>
                        <h1>Create Category</h1>

                        {loadingCreate ? <Loader/> : errorCreate ? <Message variant='danger'>{errorCreate}</Message> : (
                            <Form onSubmit={submitHandler}>
                                <Row>

                                    <Col xs={12} md={6}>
                                        <Form.Group controlId='name'>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type='text' placeholder='Enter Category name'
                                                          value={name || ''}
                                                          onChange={(e) => setName(e.target.value)}>
                                            </Form.Control>

                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Button type='submit' variant='primary'>
                                    create
                                </Button>

                            </Form>
                        )}
                    </Col>

                </Row>
            </Container>

        </>

    );
};

export default CategoryCreateScreen;