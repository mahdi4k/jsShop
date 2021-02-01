//import React , {useState,useEffect} from 'react';
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import placeOrderScreen from "./screens/placeOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {


    return (
        <Router>
            <Header/>
            <Container>

                <Route path='/login' component={LoginScreen}/>
                <Route path='/shipping' component={ShippingScreen}/>
                <Route path='/Payment' component={PaymentScreen}/>
                <Route path='/placeorder' component={placeOrderScreen}/>
                <Route path='/order/:id' component={OrderScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route path='/profile' component={ProfileScreen}/>
                <Route path='/cart/:id?' component={CartScreen}/>
                <Route path='/product/:id' component={ProductScreen}/>
                <Route path='/' component={HomeScreen} exact/>

            </Container>
            <Footer/>

        </Router>
    );
}


export default App;
