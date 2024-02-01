import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutStep from '../components/CheckoutStep';
import { toast } from "react-toastify";
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const { 
    cartItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = useAppSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createOrder, { isError, isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if(!shippingAddress?.address) {
      navigate("/shipping");
    } else if(!paymentMethod) {
      navigate("/payment")
    }
  }, [shippingAddress, paymentMethod]);

  const placeOrderHandler = async (e: React.SyntheticEvent) => {
    try {
      const res = await createOrder({
        orderItems: cartItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch(ex: any) {
      toast.error(ex);
    }
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:{" "}</strong>
                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}, ${shippingAddress.postalCode}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:{" "}</strong>
                {`${paymentMethod}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <h2>Your cart is empty</h2>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems?.map((item, idx) => {
                    return (
                      <ListGroup.Item key={idx}>
                        <Row>
                          <Col md={2} className='d-flex align-items-center'>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>

                          <Col>
                            <Link to={`/products/${item._id}`}>
                              {item.name}  
                            </Link>                          
                          </Col>

                          <Col md={4}>
                            {`${item.qty} x ${item.price} = ${item.qty! * item.price}`}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  })} 
                </ListGroup>
              )}           
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button 
                  type='button' 
                  className='btn-block' 
                  disabled={cartItems.length === 0}
                  onClick={(e) => placeOrderHandler(e)}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;