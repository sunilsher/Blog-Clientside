import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/authSlice';
const NavigationBar = () => {
    const {isLoggedIn} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink className='nav-link' to="/"><h3>Lets Blog</h3></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="ml-auto align-items-center">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="/blog">Blog</NavLink>
                        {isLoggedIn && <NavLink className='nav-link' to="/profile">Profile</NavLink>}
                        {isLoggedIn && <Nav.Link className='nav-link' onClick={()=>dispatch(logOut())}>Logout</Nav.Link>}
                        {!isLoggedIn && <NavLink className='nav-link' to="/login">Login</NavLink>}
                        { !isLoggedIn && <NavLink className='nav-link' to="/register"><Button>Get Started</Button></NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;