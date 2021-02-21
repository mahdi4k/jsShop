import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {listProducts, deleteProduct, CreateProduct} from "../../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../../constants/productConstants";
import Paginate from "../../components/Paginate";

const ProductListScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])


    const ProductList = products.map(product => (
        <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>
                {product.price}
            </td>
            <td>
                {product.category}
            </td>
            <td>
                {product.brand}
            </td>
            <td style={{textAlign: "center"}}>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'> </i>
                    </Button>
                </LinkContainer>
                <Button variant='danger' className='btn-sm btn'
                        onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash'> </i>
                </Button>
            </td>
        </tr>
    ))

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <LinkContainer to={`/admin/product/create`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'> </i> Creat product
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {ProductList}

                            </tbody>
                        </Table>
                        <Paginate isAdmin={true} page={page} pages={pages}/>

                    </>
                )

            }
        </>
    );
};

export default ProductListScreen;