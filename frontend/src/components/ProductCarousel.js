import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";
import Message from "./Message";
import {listTopProducts} from "../actions/productActions";
import {useDispatch, useSelector} from "react-redux";

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return error ? <Message variant='danger'>{error}</Message> :
        <Carousel pause='hover' className='bg-dark d-flex mt-4 justify-content-center'>
            {products.map(product => (
                <Carousel.Item interval={100000} key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image className='rounded-circle' src={`images/${product.image}`} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel-cation'>
                            <h2>{product.name} ({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
};

export default ProductCarousel;