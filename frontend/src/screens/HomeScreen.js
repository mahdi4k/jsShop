import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Col, Row} from "react-bootstrap";
import {listProducts} from "../actions/productActions";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

// productList is coming from global state from store.js


const HomeScreen = ({match}) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber])

//from global state
    const productList = useSelector(state => state.productList)

    const {loading, error, products, page, pages} = productList

    const productItems = products.map(product => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
        </Col>
    ))
    return (
        <>
            { !keyword && <ProductCarousel/> }
            <h1>Latest Products</h1>

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                <>
                    <Row> {productItems} </Row>
                    <Paginate keyword={keyword ? keyword : ''} page={page} pages={pages}/>
                </>
            }

        </>
    );
};

export default HomeScreen;
