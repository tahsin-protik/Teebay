import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarComponent = () => {
 const userName = localStorage.getItem('name');

 const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/'; // Redirect to root
 };

 return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Teebay</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/all-products">All Products</Nav.Link>
            <Nav.Link as={Link} to="/my-products">My Products</Nav.Link>
            <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
            <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link>{userName}</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 );
};

export default NavbarComponent;