import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Card, ListGroup, Image, Form, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useGetOrderByIdQuery, useGetPayPalClientIdQuery, useCreateOrderMutation, usePayOrderMutation, useDeliverOrderMutation  } from '../slices/ordersApiSlice';
import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id } = useParams();
  const { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(id);

  const [payOrder, { isLoading: isLoadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: isLoadingDeliver }] = useDeliverOrderMutation();
  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  // const { data: paypalData, isLoading: isLoadingPayPal, error: isErrorPayPal } = useGetPayPalClientIdQuery();

  const { userInfo } = useAppSelector(state => state.auth);

  const onApproveTest = async () => {
    await payOrder({ orderId: id, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success("Order marked as delivered!");
    } catch(ex: any) {
      toast.error(ex.data?.message || ex.message);
    }
  };

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
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Alert variant='success'>
                  Order delivered on {order.deliveredAt}
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
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant='success'>
                  Paid on {order.paidAt}
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
              {order.orderItems.map((item, idx) => {
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
                  <Col>{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              {/* PAY PLACEHOLDER  */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoadingPay && <h2>Fetching payment data...</h2>}
                  <div>
                    <Button onClick={onApproveTest} style={{ margin: "10px 0", width: "100%" }}>
                      Test Pay
                    </Button>
                    {/* Disabling paypal buttons */}
                    {/* <div>
                      <PayPalButtons 
                        createOrder={createOrderHandler}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      />
                    </div> */}
                  </div>

                </ListGroup.Item>
              )}
              {/* DELIVERED PLACEHOLDER */}
              {isLoadingDeliver && <h2>Loading...</h2>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' onClick={deliverOrderHandler} className='btn btn-block'>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;



// useEffect(() => {
//   if(!isLoadingPayPal && !isErrorPayPal && paypalData.clientId) {
//     const loadPayPalScript = async () => {
//       paypalDispatch({ 
//         type: "resetOptions",
//         value: {
//           clientId: paypalData.clientId,
//           currency: "USD"
//         }
//       })

//       paypalDispatch({ type: "setLoadingStatus", value: SCRIPT_LOADING_STATE.PENDING });
//     }

//     if(order && !order.isPaid) {
//       if(!window.paypal) {
//         loadPayPalScript();
//       }
//     }
//   }
// }, [order, paypalData, isLoadingPayPal, isErrorPayPal]);

// const createOrderHandler = (data: any, actions: any) => {
//   return actions.order.create({
//     purchase_units: [
//       {
//         amount: {
//           value: order.totalPrice
//         }
//       }
//     ]
//   }).then((orderId: any) => {
//     return orderId;
//   })
// };

// const onApproveHandler = (data: any, actions: any) => {
//   return actions.order.capture().then(async (details: any) => {
//     try {
//       await payOrder({ id, details });
//       refetch();
//       toast.success("Payment Successful");
//     } catch(ex: any) {
//       toast.error("Payment failed: ", ex.data?.message || ex.message)
//     }
//   })
// };

// const onErrorHandler = (err: any) => {
//   toast.error(err.message);
// };