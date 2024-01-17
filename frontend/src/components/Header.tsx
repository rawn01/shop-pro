import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" expand="md" collapseOnSelect variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle>

          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link >Cart</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>Sign in</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header