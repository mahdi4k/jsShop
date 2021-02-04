import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {Logout} from '../actions/userAction'
import SweetAlert from "sweetalert-react";
const Header = () => {
    const [sweetAlertOff, sweetAlertOn] = useState(false)

    const dispatch = useDispatch()

    const selectUserInfo = useSelector((state) => state.userLogin)
    const {userInfo} = selectUserInfo

    const logoutHandler = () => {

        dispatch(Logout())
        sweetAlertOn(true)
    }

    return (
        <header>
            <SweetAlert
                show={sweetAlertOff}
                title="با موفقیت خارج شدید"
                type="success"
                onConfirm={() => sweetAlertOn(false)}
                onEscapeKey={() => sweetAlertOn(false)}
                onOutsideClick={() => sweetAlertOn(false)}
                confirmButtonText="حله"
            />
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Proshop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link href="/Cart"><i className="fas fa-shopping-cart mr-1"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                ) : <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'>Sing in</i>
                                    </Nav.Link>
                                </LinkContainer>
                            }
                            {userInfo && userInfo.isAdmin &&(
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            User
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                                Product
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                           Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>


                                </NavDropdown>
                            )}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
