import React from 'react'
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state: any) => state.cart);

  return (
    <header>
      <Navbar bg="dark" expand="md" collapseOnSelect variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link >
                  Cart {cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cartItems.reduce((acc: any, cartItem: any) => acc + cartItem.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
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