import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Product from '../components/Product';

const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    // @ts-ignore
    return <div>{error?.data?.message || error?.message}</div>
  }
  
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products?.map((product: any) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id} className="d-flex align-items-stretch">
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </Fragment>
  )
};

export default HomeScreen;


// import React, { Fragment, useEffect, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import Product from '../components/Product';
// import axios from 'axios';

// const HomeScreen = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("/api/products").then((res) => setProducts(res.data));
//   }, []);
  
//   return (
//     <Fragment>
//       <h1>Latest Products</h1>
//       <Row>
//         {products.map((product: any) => {
//           return (
//             <Col sm={12} md={6} lg={4} xl={3} key={product._id} className="d-flex align-items-stretch">
//               <Product product={product} />
//             </Col>
//           )
//         })}
//       </Row>
//     </Fragment>
//   )
// };