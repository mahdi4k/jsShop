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
<<<<<<< HEAD
import placeOrderScreen from "./screens/placeOrderScreen";
=======
 function App() {
>>>>>>> f90e590df0baa831b701af54156afb9d410b79f4

function App() {


<<<<<<< HEAD
    return (
        <Router>
            <Header/>
            <Container>

                <Route path='/login' component={LoginScreen}/>
                <Route path='/shipping' component={ShippingScreen}/>
                <Route path='/Payment' component={PaymentScreen}/>
                <Route path='/placeorder' component={placeOrderScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route path='/profile' component={ProfileScreen}/>
                <Route path='/cart/:id?' component={CartScreen}/>
                <Route path='/product/:id' component={ProductScreen}/>
                <Route path='/' component={HomeScreen} exact/>

            </Container>
            <Footer/>
=======
  return (
      <Router>
        <Header/>
          <Container>
 
                            <Route path='/' component={HomeScreen} exact />
                            <Route path='/login' component={LoginScreen} />
                            <Route path='/shipping' component={ShippingScreen} />
                            <Route path='/Payment' component={PaymentScreen} />
                            <Route path='/register' component={RegisterScreen} />
                            <Route path='/profile' component={ProfileScreen} />
                            <Route path='/cart/:id?' component={CartScreen} />
                            <Route path='/product/:id' component={ProductScreen} />
                              
          </Container>
        <Footer/>
>>>>>>> f90e590df0baa831b701af54156afb9d410b79f4

        </Router>
    );
}


export default App;
