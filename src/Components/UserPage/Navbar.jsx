import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Navbaar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#ddd' }} variant="light">
      <Container style={{height:"100%"}}>

        {/* Navbar Brand */}
        <Navbar.Brand>Job Portal</Navbar.Brand>

        {/* Toggle Button for Responsive View */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as="div">
              <Link style={{ textDecoration: 'none', color: 'black' }} to='/ViewJob'>
                Find Job
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link style={{ textDecoration: 'none', color: 'black'  }} to='/Events'>
                Events
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link style={{ textDecoration: 'none', color: 'black' }} to='/AppliedJob'>
                Applied Jobs
              </Link>
            </Nav.Link>
          </Nav>

          {/* Contact Info */}
          <Nav className="ms-auto d-flex align-items-center">
            <span style={{ color: 'black', marginRight: '10px' }}>Contact:</span>
            <span style={{ color: 'black', fontWeight: 'bold' }}>(808) 555-0111</span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
