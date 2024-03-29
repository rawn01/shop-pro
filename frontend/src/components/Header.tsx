import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../hooks";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const logoutHandler = async (e: React.SyntheticEvent) => {
    try {
      await logout({}).unwrap();
      dispatch(removeCredentials(null));
      navigate("/");
    } catch(ex: any) {
      toast.error(ex?.data?.message || ex?.error)
    }
  };

  const _renderProfileOrSignin = () => {
    if(userInfo) {
      return (
        <NavDropdown title={userInfo.name} id="username">
          <LinkContainer to="/profile">
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      )
    }

    return (
      <LinkContainer to="/login">
        <Nav.Link>Sign in</Nav.Link>
      </LinkContainer>
    );
  };

  return (
    <header>
      <Navbar bg="dark" expand="md" collapseOnSelect variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              Home
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

              {_renderProfileOrSignin()}

              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="admin-menu">
                  <LinkContainer to={"/admin/productlist"}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to={"/admin/userlist"}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to={"/admin/orderlist"}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header