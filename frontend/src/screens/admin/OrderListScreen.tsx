import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: allOrders, isLoading } = useGetAllOrdersQuery();

  return (
    <Fragment>
      <h1>Orders</h1>
      {isLoading && <h1>Loading...</h1>}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered On</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {allOrders?.map((order: any) => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
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
    </Fragment>
  )
}

export default OrderListScreen