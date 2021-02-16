//import React , {useState,useEffect} from 'react';
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import jwt from 'jwt-decode'
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
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import ProductListScreen from "./screens/Admin/productsListScreen";
import ProductEditScreen from "./screens/Admin/productEditScreen"
import OrdersList from "./screens/Admin/ordersListScreen";

function App() {
    useEffect(() => {
        if (localStorage.getItem('userInfo') !== null) {
            const {token} = JSON.parse(localStorage.getItem('userInfo'))
            const {exp} = jwt(token)

            if (Date.now() >= exp * 1000) {
                localStorage.clear();
                 (<Redirect to="/"/>)
            }
        }
    }, [Redirect])
    return (
        <Router>
            <Header/>
            <Container>
                <Switch>
                    <Route path='/login' component={LoginScreen}/>
                    <Route path='/shipping' component={ShippingScreen}/>
                    <Route path='/Payment' component={PaymentScreen}/>
                    <Route path='/placeorder' component={placeOrderScreen}/>
                    <Route path='/order/:id' component={OrderScreen}/>
                    <Route path='/register' component={RegisterScreen}/>
                    <Route path='/profile' component={ProfileScreen}/>
                    <Route path='/cart/:id?' component={CartScreen}/>
                    <Route path='/admin/userlist' component={UserListScreen}/>
                    <Route path='/admin/productlist' component={ProductListScreen}/>
                    <Route path='/admin/orderlist' component={OrdersList}/>
                    <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
                    <Route path='/search/:keyword' component={HomeScreen} exact/>
                    <Route path='/' component={HomeScreen} exact/>
                </Switch>
            </Container>
            <Footer/>

        </Router>
    );
}


export default App;
