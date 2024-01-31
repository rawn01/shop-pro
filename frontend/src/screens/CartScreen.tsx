import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Card, ListGroup, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { useAppDispatch, useAppSelector } from "../hooks";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeCartHandler = (id: any) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const _renderItems = () => {
    return (
      <ListGroup variant="flush">
        {cartItems.map((cartItem: any) => (
          <ListGroup.Item key={cartItem._id}>
            <Row>
              <Col md={2}>
                <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
              </Col>
              <Col md={2}>
                {cartItem.price}
              </Col>
              <Col md={2}>
                <Form.Control 
                  as="select" 
                  value={cartItem.qty} 
                  onChange={(e) => dispatch(addToCart({ ...cartItem, qty: Number(e.target.value) }))}
                >
                  {[...Array(cartItem.countInStock).keys()].map(x => {
                    return (
                      <option key={x} value={x + 1}>{x + 1}</option>
                    )
                  })}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button type="button" variant="light" onClick={() => removeCartHandler(cartItem._id)}>
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go back</Link>
          </div>
        ) : (
          _renderItems()
        )}
      </Col>
      <Col md={4}>
        <Card >
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal: {cartItems.reduce((acc: any, cartItem: any) => acc + cartItem.qty, 0)}</h2>
              ${cartItems.reduce((acc: any, cartItem: any) => acc + cartItem.qty * cartItem.price, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;