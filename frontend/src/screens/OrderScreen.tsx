import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Card, ListGroup, Image, Form, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useGetOrderByIdQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id } = useParams();
  const { data, isLoading, refetch, error } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Order #{id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item variant='flush'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {data.user.name}
              </p>
              <p>
                <strong>Email: </strong> {data.user.email}
              </p>
              <p>
                <strong>Address: </strong> {data.shippingAddress.address}, {data.shippingAddress.city}, {data.shippingAddress.country}, {data.shippingAddress.postalCode}
              </p>
              {data.isDelivered ? (
                <Alert variant='success'>
                  Order delivered on {data.deliveredAt}
                </Alert>
              ) : (
                <Alert variant='danger'>
                  Order not delivered
                </Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {data.paymentMethod}
              </p>
              {data.isDelivered ? (
                <Alert variant='success'>
                  Paid on {data.paidAt}
                </Alert>
              ) : (
                <Alert variant='danger'>
                  Payment Pending
                </Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* @ts-expect-error */}
              {data.orderItems.map((item, idx) => {
                return (
                  <ListGroup.Item key={idx}>
                    <Row>
                      <Col md={2}>
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
                  <Col>{data.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${data.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${data.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${data.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              {/* PAY PLACEHOLDER  */}
              {/* DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;