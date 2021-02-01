import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom"
import Rating from './Rating'

const Product = ({product}) => {

    return (
        <Card className="my-3 p-3 rounded w3-animate-opacity">
<<<<<<< HEAD
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
=======
            <Link  to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
>>>>>>> f90e590df0baa831b701af54156afb9d410b79f4
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>

        </Card>
    );
};

export default Product;
