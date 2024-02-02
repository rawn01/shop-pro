import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useAppSelector(state => state.auth);

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading: isLoadingOrders } = useGetMyOrdersQuery();

  useEffect(() => {
    if(userInfo) {
      setName(userInfo.name);;
      setEmail(userInfo.email);
    }
  }, [userInfo?.name, userInfo?.email]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(password !== passwordConfirm) {
      return toast.error("Password do not match");
    } 
    
    try {
      const res = await updateProfile({ id: userInfo!.id, name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated!");
    } catch(ex: any) {
      toast.error(ex.data?.message || ex.message)
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password' className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' onClick={submitHandler} className='my-2'>
            Update
          </Button>

          {isLoadingUpdateProfile && <h2>Loading...</h2>}
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Order</h2>
        {isLoadingOrders ? (
          <h2>Loading...</h2>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.orders.map((order: any) => {
                return (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? `${order.paidAt.substring(0, 10)}` : <FaTimes style={{ color: "red" }} />}</td>
                    <td>{order.isDelivered ? `${order.deliveredAt.substring(0, 10)}` : <FaTimes style={{ color: "red" }} />}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen;