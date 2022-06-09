import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../redux/orderSlice';
import Moment from 'moment';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  color: #fff;
  position: relative;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const OrderHeader = styled.h2`
  margin: 20px;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 600;
`;

const ProductList = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 380px) {
    display: none;
  }
`;

const ProductListTable = styled.table`
  width: 100%;
`;

const ProductTableHeader = styled.th`
  text-align: center;
`;

const ProductTableRow = styled.tr`
  &:nth-child(odd) {
    background-color: rgb(29, 29, 29);
  }
`;

const ProductTableData = styled.td`
  padding: 10px;
`;

const EditButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid white;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: white;
  }
`;

const DeleteButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgb(255, 0, 0);
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: rgb(255, 0, 0);
  }
`;

const CartEmpty = styled.div`
  margin: 0;
  padding: 40px 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: #111;
  border-radius: 10px;
`;

const CartEmptyMessage = styled.div`
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: Roboto, sans-serif;
`;

const ProductResponsiveContainer = styled.div`
  display: none;
  width: 100vw;
  min-height: 100vh;
  @media only screen and (max-width: 380px) {
    display: block;
  }
`;

const ProductResponsiveLists = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 380px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ProductResponsiveList = styled.div`
  @media only screen and (max-width: 380px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    background-color: rgb(17, 17, 17);
    padding: 15px;
    border-radius: 5px;
    color: #00cfff;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const ProductId = styled.div`
  @media only screen and (max-width: 380px) {
    margin-bottom: 15px;
  }
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ProductImage = styled.img`
  @media only screen and (max-width: 380px) {
    width: 159px;
    height: 159px;
  }
`;

const ProductD = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductN = styled.div``;

const ProductS = styled.div``;

const ProductP = styled.div``;

const ProductTotal = styled.div`
  @media only screen and (max-width: 380px) {
    margin-top: 15px;
  }
`;

const ProductPaid = styled.div`
  @media only screen and (max-width: 380px) {
    margin-top: 10px;
  }
`;

const ProductDelievered = styled.div`
  @media only screen and (max-width: 380px) {
    margin-top: 10px;
  }
`;

const ProductDate = styled.div`
  @media only screen and (max-width: 380px) {
    margin-top: 10px;
  }
`;

const ProductButton = styled.button`
  @media only screen and (max-width: 380px) {
    margin-top: 10px;
    border: none;
    background: none;
    background-color: white;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    font-size: 0.85rem;
    font-weight: 600;

    &:hover {
      filter: brightness(70%);
    }
  }
`;

const OrderHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  React.useEffect(() => {
    document.title = "Order History - Team Cigarette"
  }, [])

  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrders({ userId: currentUser?.result._id }));
  }, [dispatch, currentUser?.result._id]);

  return (
    <>
      <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <OrderHeader>Order History</OrderHeader>
        {orders.length < 1 ? (
          <CartEmpty>
            <CartEmptyMessage>
              {`You haven't ordered anything to make history.    `}
              <Link
                style={{ textDecoration: 'underline' }}
                className="link"
                to="/"
              >
                Go Shopping
              </Link>
            </CartEmptyMessage>
          </CartEmpty>
        ) : (
          <ProductList>
            <ProductListTable>
              <thead>
                <tr>
                  <ProductTableHeader>ID</ProductTableHeader>
                  <ProductTableHeader>Date</ProductTableHeader>
                  <ProductTableHeader>Total</ProductTableHeader>
                  <ProductTableHeader>Paid</ProductTableHeader>
                  <ProductTableHeader>Delievered</ProductTableHeader>
                  <ProductTableHeader>Actions</ProductTableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from(orders).map((order) => (
                  <ProductTableRow key={order._id}>
                    <ProductTableData>{order._id}</ProductTableData>
                    <ProductTableData>
                      {Moment(order.createdAt).format('MMMM DD, YYYY')}
                    </ProductTableData>
                    <ProductTableData>${order.total}</ProductTableData>
                    <ProductTableData>
                      {order.isPaid ? 'Yes' : 'No'}
                    </ProductTableData>
                    <ProductTableData>
                      {order.status ? 'Yes' : 'No'}
                    </ProductTableData>
                    <ProductTableData>
                      <EditButton>
                        <Link to={`/history/${order._id}`} className="link">
                          Details
                        </Link>
                      </EditButton>
                    </ProductTableData>
                  </ProductTableRow>
                ))}
              </tbody>
            </ProductListTable>
          </ProductList>
        )}
        {orders.length < 1 ? (
          <CartEmpty>
            <CartEmptyMessage>
              {`You haven't ordered anything to make history.    `}
              <Link
                style={{ textDecoration: 'underline' }}
                className="link"
                to="/"
              >
                Go Shopping
              </Link>
            </CartEmptyMessage>
          </CartEmpty>
        ) : (
          <ProductResponsiveContainer>
            <ProductResponsiveLists>
              {Array.from(orders)?.map((order) => (
                <ProductResponsiveList>
                  <ProductId>
                    Order Id:{' '}
                    <span
                      style={{ fontSize: 16, color: 'white', fontWeight: 400 }}
                    >
                      {order._id}
                    </span>
                  </ProductId>
                  <ProductItem>
                    <ProductImage
                      src={order?.products[0]?.frontSide}
                    ></ProductImage>
                    <ProductD>
                      <ProductN>
                        Name:{' '}
                        <span
                          style={{
                            fontSize: 16,
                            color: 'white',
                            fontWeight: 400,
                          }}
                        >
                          {order?.products[0]?.name}
                        </span>
                      </ProductN>
                      <ProductS>
                        Size:{' '}
                        <span
                          style={{
                            fontSize: 16,
                            color: 'white',
                            fontWeight: 400,
                          }}
                        >
                          {order?.products[0]?.size}
                        </span>
                      </ProductS>
                      <ProductP>
                        Price:{' '}
                        <span
                          style={{
                            fontSize: 16,
                            color: 'white',
                            fontWeight: 400,
                          }}
                        >
                          $
                          {order?.products[0]?.quantity *
                            order?.products[0]?.price}
                        </span>
                      </ProductP>
                    </ProductD>
                  </ProductItem>
                  <ProductTotal>
                    Total:{' '}
                    <span
                      style={{ fontSize: 16, color: 'white', fontWeight: 400 }}
                    >
                      ${order.total}
                    </span>
                  </ProductTotal>
                  <ProductPaid>
                    Paid:{' '}
                    <span
                      style={{ fontSize: 16, color: 'white', fontWeight: 400 }}
                    >
                      {order.isPaid ? 'Yes' : 'No'}
                    </span>
                  </ProductPaid>
                  <ProductDelievered>
                    Delievered:{' '}
                    <span
                      style={{ fontSize: 16, color: 'white', fontWeight: 400 }}
                    >
                      {order.status ? 'Yes' : 'No'}
                    </span>
                  </ProductDelievered>
                  <ProductDate>
                    Date:{' '}
                    <span
                      style={{ fontSize: 16, color: 'white', fontWeight: 400 }}
                    >
                      {Moment(order.createdAt).format('MMMM DD, YYYY')}{' '}
                    </span>
                  </ProductDate>
                  <ProductButton>
                    <Link to={`/history/${order._id}`} className="link">
                      View Detail
                    </Link>
                  </ProductButton>
                </ProductResponsiveList>
              ))}
            </ProductResponsiveLists>
          </ProductResponsiveContainer>
        )}
      </Container>
    </>
  );
};

export default OrderHistory;
