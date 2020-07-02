import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  { AuthContext } from '../../context/auth-context';

import './MainNavigation.css';


const MainNavigation = props => {

    const auth = useContext(AuthContext);

    return (<Navbar bg="dark" variant="dark">
        <Navbar.Brand>RES</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link><Link to="/">Strona Główna</Link></Nav.Link>
            {auth.isPartnership && <Nav.Link><Link to="/partnership">Program partnerski</Link></Nav.Link>}
            {auth.isOwner && <Nav.Link><Link to="/employees">Zarządzaj pracownikami</Link></Nav.Link>}
            {auth.isOwner && <Nav.Link><Link to="/settings">Ustawienia</Link></Nav.Link>}
            <Nav.Link onClick={() => auth.logout()}>Wyloguj się</Nav.Link>
        </Nav>
    </Navbar>);
};

export default MainNavigation;