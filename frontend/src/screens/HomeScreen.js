import React, {useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Col,Row} from "react-bootstrap";
import {listProducts} from "../actions/productActions";
import { CSSTransition } from 'react-transition-group';

// productList is coming from global state from store.js


const HomeScreen = () => {

const dispatch = useDispatch()
 
    useEffect( () => {

        dispatch(listProducts())

     },[dispatch])

//from global state
const productList = useSelector(state =>state.productList)

const {loading , error , products} = productList

<<<<<<< HEAD
    const productItems = products.map(product => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
        </Col>
    ))
    return (
        <>

           <h1>Latest Products</h1>

          {loading ? <Loader/> : error  ? <Message variant='danger'>{error}</Message> : <Row> { productItems }  </Row> }

=======
const productItem = products.map(product =>(
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
         <Product product={product} />
    </Col>
))
    return (
        <>
        
            <h1>Latest Products</h1>
                {loading ? <Loader/> : error  ? <Message variant='danger'>{error}</Message> :  
                
                    <Row>
                        {productItem} 
                    </Row>

                 
                 }
>>>>>>> f90e590df0baa831b701af54156afb9d410b79f4
        </>
    );
};

export default HomeScreen;
