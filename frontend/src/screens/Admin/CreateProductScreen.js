import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Container, Row, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {CreateProduct} from "../../actions/productActions";
import {Link} from "react-router-dom";
import {PRODUCT_CREATE_RESET} from "../../constants/productConstants";

const ProductCreateScreen = ({match, history}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('/placeholder.png')
    const [preImage, setPreImage] = useState(null)
    const [file, setFile] = useState('');
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()
    const [countInStock, setCountInStock] = useState()
    const [description, setDescription] = useState('')
    const [successCreateProduct, setSuccessCreateProduct] = useState(false)
    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate} = productCreate

    useEffect(() => {

        if (successCreate) {
            history.push(`/admin/productlist`)
        }

    }, [history, successCreate])


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        setPreImage(null)
        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });
            const {fileName, filePath} = res.data

            dispatch(CreateProduct({
                _id: Date.now(),
                name,
                price,
                image: fileName,
                brand,
                category,
                description,
                countInStock
            }))
            setImage(fileName)
            setSuccessCreateProduct(true)
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else if (err.response.status === 422) {
                console.log('just image');
            }
        }

    }
    const onChangeUploadImage = (e) => {
        const targetFile = e.target.files[0]
        setFile(targetFile);
        setPreImage(targetFile.name)
        const reader = new FileReader();
        const url = reader.readAsDataURL(targetFile);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <Container className='py-3 w3-animate-opacity'>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={12}>
                        <h1>Create Product</h1>

                        {loadingCreate ? <Loader/> : errorCreate ? <Message variant='danger'>{errorCreate}</Message> : (
                            <Form onSubmit={submitHandler}>
                                <Row>

                                    <Col xs={12} md={6}>
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
                                            <Form.Control type='number' placeholder='Enter price'
                                                          value={countInStock || ''}
                                                          onChange={(e) => setCountInStock(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId='category'>
                                            <Form.Label>category</Form.Label>
                                            <Form.Control type='text' placeholder='Enter category'
                                                          value={category || ''}
                                                          onChange={(e) => setCategory(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId='description'>
                                            <Form.Label>description</Form.Label>
                                            <Form.Control type='text' placeholder='Enter description'
                                                          value={description || ''}
                                                          onChange={(e) => setDescription(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Image fluid src={preImage ? image : `/images/${image}`}/>
                                        <Form.File
                                            id="customFile"
                                            label={preImage ? preImage : "choose image"}
                                            custom
                                            onChange={onChangeUploadImage}
                                        />
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

export default ProductCreateScreen;