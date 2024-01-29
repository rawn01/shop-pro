import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Ratings from '../components/Ratings';
import axios from 'axios';
import { useGetProductByIdQuery } from '../slices/productApiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useGetProductByIdQuery(id!);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    // navigate("/");
  };

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!product) {
    // Error
    return <h1>Item not found</h1>;
  }

  return (
    <Fragment>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} fluid alt="Img" />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Ratings value={product.rating} text={` ${product.numReviews} reviews`} />
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In stock" : "Out of stock"}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map(x => {
                          return (
                            <option key={x} value={x + 1}>{x + 1}</option>
                          )
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ProductScreen;