import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Container, Row, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {listProductDetails, updateProduct} from "../../actions/productActions";
import {Link} from "react-router-dom";
import {PRODUCT_UPDATE_RESET} from "../../constants/productConstants";

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id //url param :id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('/placeholder.png')
    const [file, setFile] = useState('');
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()
    const [countInStock, setCountInStock] = useState()
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()


    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);
    useEffect(() => {

        if (successUpdate) {
            //for remove old data product
            dispatch({type: PRODUCT_UPDATE_RESET});
        }

        if (loading === false) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)

        }

    }, [successUpdate, product, dispatch, history, loading])


    const submitHandler = async (e) => {
        e.preventDefault()

        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))

    }
    const onChangeUploadImage = (e) => {
        setFile(e.target.files[0]);

    }
    const onSubmitUploadImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });
            const {fileName, filePath} = res.data

            dispatch(updateProduct({
                _id: productId,
                name,
                price,
                image: fileName,
                brand,
                category,
                description,
                countInStock
            }))
            setImage(fileName)
            setUploading(true)
            history.push(`/admin/product/${match.params.id}/edit`)
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else if (err.response.status === 422) {
                console.log('just image');
            }
        }

    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <Container className='py-3 w3-animate-opacity'>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Edit Product</h1>
                        {loadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter name' value={name || ''}
                                                  onChange={(e) => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='Price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number' placeholder='Enter price' value={price || ''}
                                                  onChange={(e) => setPrice(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>


                                <Form.Control type='hidden' value={image || ''}
                                              onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>


                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type='text' placeholder='Enter brand' value={brand || ''}
                                                  onChange={(e) => setBrand(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>count in stock</Form.Label>
                                    <Form.Control type='number' placeholder='Enter price' value={countInStock || ''}
                                                  onChange={(e) => setCountInStock(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>category</Form.Label>
                                    <Form.Control type='text' placeholder='Enter category' value={category || ''}
                                                  onChange={(e) => setCategory(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>description</Form.Label>
                                    <Form.Control type='text' placeholder='Enter description' value={description || ''}
                                                  onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    update
                                </Button>

                            </Form>
                        )}
                    </Col>
                    <Col xs={12} md={6}>
                        {loading ? '' : error ? <Message variant='danger'>{error}</Message> : (
                            <form onSubmit={onSubmitUploadImage}>
                                <div className='custom-file mb-4'>
                                    <Image fluid src={`/images/${image}`}/>
                                    <Form.File
                                        id="customFile"
                                        label="Custom file input"
                                        custom
                                        onChange={onChangeUploadImage}
                                    />
                                    {uploading}
                                </div>

                                <input
                                    type='submit'
                                    value='Upload'
                                    className='btn btn-primary btn-block mt-4'
                                />
                            </form>
                        )}
                    </Col>
                </Row>
            </Container>

        </>

    );
};

export default ProductEditScreen;