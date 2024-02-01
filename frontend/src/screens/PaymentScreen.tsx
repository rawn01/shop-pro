import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutStep from '../components/CheckoutStep';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useAppSelector((state) => state.cart)

  useEffect(() => {
    if(!shippingAddress) {
      navigate("/shipping")
    }
  }, [shippingAddress]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <Form onSubmit={submitHandler} className='my-2'>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check 
              type='radio' 
              className='my-4' 
              label="PayPal or Credit Card" 
              id="paypal" 
              name="paymentMethod" 
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <Button type='submit' variant='primary' className='my-4'>
              Continue
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen;