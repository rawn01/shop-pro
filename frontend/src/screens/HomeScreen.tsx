import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);
  
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: any) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id} className="d-flex align-items-stretch">
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </Fragment>
  )
}

export default HomeScreen;