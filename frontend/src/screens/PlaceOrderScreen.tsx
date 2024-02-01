import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutStep from '../components/CheckoutStep';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod } = useAppSelector(state => state.cart);

  useEffect(() => {
    if(!shippingAddress?.address) {
      navigate("/shipping");
    } else if(!paymentMethod) {
      navigate("/payment")
    }
  }, [shippingAddress, paymentMethod])

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}></Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;