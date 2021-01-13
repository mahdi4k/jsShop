import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";

class Loader extends Component {
    render() {
        return (
            <Spinner animation='border' role='status' style={
                {
                    width:'100px' , height:'100px' , margin : 'auto',display:'block'
                }
            }>
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }
}

export default Loader;
