import React, { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getOrder, updateUserOrder } from '../redux/api';
import { userRequest } from '../redux/requestMethod';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  font-family: sans-serif;
  padding: 40px;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    padding: 5px;
  }
`;
const PaymentInfoCOntainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(17, 17, 17);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const NameBlock = styled.div`
  display: flex;
`;
const Name = styled.h4``;

const AddressBlock = styled.div``;
const Address = styled.h4``;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(17, 17, 17);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const OrderItems = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media only screen and (max-width: 420px) {
    margin-bottom: 15px;
  }
  
`;

const ItemImage = styled.img`
  width: 80px;
  height: 100px;
`;
const ItemName = styled.div`
display: flex;
flex: 1;
justify-content: flex-end;`;

const ItemQuantity = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;`;

const OrderSummary = styled.div`
  flex: 1;
  padding: 20px;

  @media only screen and (max-width: 420px) {
    width: 100%;
    padding: 0;
  }
`;

const OrderWrapper = styled.div`
  padding: 20px;
  background-color: rgb(22, 22, 22);
  border-radius: 5px;
`;

const OrderTitle = styled.div`
  margin-bottom: 25px;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 600;
  background-color: rgb(22, 22, 22);
  border-radius: 5px;
`;

const OrerItemFlex = styled.div`
display: flex;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    justify-contnet: flex-start;
  }
`

const OrderItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const OrderItemTotal = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 0.3s;

  &:hover {
    color: black;
    background-color: white;
  }

`;

const OrderDetail = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  const { pathname } = useLocation();
  const orderId = pathname.split('/')[2];
  const [loading, setLoading] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState('');
  const elements = useElements();
  const stripe = useStripe();

  React.useEffect(() => {
    const makeRequest = async() => {
      const res = await userRequest.post('/checkout/payment', {
        amount: order.total,
      });
      setClientSecret(res.data.clientSecret);
    }
    makeRequest();
  }, [clientSecret, order.total]);

  React.useEffect(() => {
    document.title = "Order Detail - Team Cigarette"
  }, [])

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: 'card',
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        updateUserOrder(dispatch, orderId, { isPaid: true });
        setLoading(false);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getOrder(dispatch, orderId);
  }, [dispatch, orderId]);

  const cardElementOptions = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontSize: '16px',
        '::placeholder': {
          color: '#fff',
        },
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#fa755a',
        fontSize: '16px',
      },
    },
  };

  return (
    <>
    <Suspense fallback={<div><CircularProgress/></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <PaymentInfoCOntainer>
          <h2 style={{ marginBottom: 20 }}>Order History Detail</h2>
          <h3 style={{ marginBottom: 20 }}>Order Number: {order._id}</h3>
          <AddressContainer>
            <h3 style={{ marginBottom: 10 }}>Shipping Address</h3>
            <NameBlock>
              <Name>
                Name:{' '}
                <span style={{ fontWeight: '100', fontSize: '1rem' }}>
                  {order.fullName}
                </span>
              </Name>
            </NameBlock>
            <AddressBlock>
              <Address>
                Address:{' '}
                <span style={{ fontWeight: '100', fontSize: '1rem' }}>
                  {order.homeAddress}, {order.city}, {order.postalCode},{' '}
                  {order.country}
                </span>
              </Address>
            </AddressBlock>
            <span
              style={{
                marginTop: 5,
                fontSize: '1rem',
                padding: 15,
                borderRadius: 5,
                backgroundColor: order.status ? '#bcffa6' : '#ffe0e0',
                color: order.status ? '#2d9314' : '#ff0000',
                fontWeight: 600,
              }}
            >
              {order.status ? 'Delievered' : 'Not Delievered'}
            </span>
          </AddressContainer>
          <AddressContainer>
            <h3 style={{ marginBottom: 10 }}>Payment</h3>
            <NameBlock>
              <Name>
                Payment:{' '}
                <span style={{ fontWeight: '100', fontSize: '1rem' }}>
                  Stripe
                </span>
              </Name>
            </NameBlock>
            <span
              style={{
                marginTop: 5,
                fontSize: '1rem',
                padding: 15,
                borderRadius: 5,
                backgroundColor: loading
                  ? '#000'
                  : order.isPaid
                  ? '#bcffa6'
                  : '#ffe0e0',
                color: loading ? '#fff' : order.isPaid ? '#2d9314' : '#ff0000',
                fontWeight: 600,
              }}
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : order.isPaid ? (
                <span>
                  <i
                    style={{ fontSize: 24 }}
                    className="fa fa-check-circle-o"
                  ></i>{' '}
                  Paid
                </span>
              ) : (
                'Not Paid'
              )}
            </span>
          </AddressContainer>
          <OrderItemsContainer>
            <h3 style={{ marginBottom: 10 }}>Order Items</h3>
            {order?.products?.map((product) => (
              <OrderItems key={product.cartId}>
                <ItemImage
                  alt={product.name}
                  src={product.frontSide}
                ></ItemImage>
                 <OrerItemFlex>
                <ItemName>
                  {product.name} | {product.size}
                </ItemName>
                <ItemQuantity>
                  {product.quantity} x ${product.price} = $
                  {product.quantity * product.price}
                </ItemQuantity>
                </OrerItemFlex>
              </OrderItems>
            ))}
          </OrderItemsContainer>
        </PaymentInfoCOntainer>
        <OrderSummary>
          <OrderWrapper>
            <OrderTitle>Order Total</OrderTitle>
            <OrderItem>
              <div className="summaryItemText">Items</div>
              <div className="summaryItemPrice">$ {order.itemsPrice}</div>
            </OrderItem>
            <OrderItem>
              <div className="summaryItemText">Estimated Shipping</div>
              <div className="summaryItemPrice">$ {order.shippingPrice}</div>
            </OrderItem>
            <OrderItem>
              <div className="summaryItemText">Tax</div>
              <div className="summaryItemPrice">$ {order.tax}</div>
            </OrderItem>
            <OrderItemTotal style={{ marginBottom: 10 }}>
              <div className="summaryItemText">Total</div>
              <div className="summaryItemPrice">$ {order.total}</div>
            </OrderItemTotal>
           {!order.isPaid && <CardElement options={cardElementOptions} /> }
            {order.isPaid ? (
              <OrderButton
                style={{ color: '#2d9314', backgroundColor: '#bcffa6' }}
              >
                <i
                  style={{ fontSize: 24 }}
                  className="fa fa-check-circle-o"
                ></i>{' '}
                Payment Successful
              </OrderButton>
            ) : loading ? (
              <OrderButton
                disabled={loading}
                style={{ marginTop: '15px' }}
                onClick={handlePayment}
              >
                <i className="fa fa-spinner fa-spin"></i>
              </OrderButton>
            ) : (
              <OrderButton
                style={{ marginTop: '15px' }}
                onClick={handlePayment}
              >
                Place Order
              </OrderButton>
            )}
          </OrderWrapper>
        </OrderSummary>
      </Container>
    </>
  );
};

export default OrderDetail;
