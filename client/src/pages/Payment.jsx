import React, {Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearCart } from '../redux/cartSlice';
import { orderAction } from './../redux/api';
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
justify-content: flex-end;
`;

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

const OrderItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;

  
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

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { products, loading } = order;
  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  React.useEffect(() => {
    document.title = "Create Order - Team Cigarette"
  }, [])

  //discount & tax
  const toPrice = (num) => Number(num.toFixed(2));
  let shippingPrice = products.amount > 100 ? toPrice(0) : toPrice(10);
  let tax = toPrice(0.15 * products.amount);
  const total = products.amount + shippingPrice + tax;

  const handleOrder = (e) => {
    e.preventDefault()
    const value = {
      userId: currentUser?.result._id,
      products: products.products,
      total: total,
      fullName: products.fullName,
      homeAddress: products.homeAddress,
      city: products.city,
      postalCode: products.postalCode,
      country: products.country,
      itemsPrice: products.amount,
      shippingPrice,
      tax,
    };
    orderAction(dispatch, value);
    navigate('/history')
    dispatch(clearCart());
  };



  // const lastOrders = useSelector((state) => state.order.orders);
  // console.log(lastOrders)

  // useEffect(() => {
  //   dispatch(fetchOrders({ userId: currentUser?.result._id }));
  // }, [dispatch, currentUser?.result._id]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (success) {
  //       navigate(`/history/${lastOrders[0]._id}`)
  //     }
  //   }, 5000)
  //   return () => clearTimeout(timer)
	// }, [lastOrders, navigate, success])

  return (
    <>
      <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <PaymentInfoCOntainer>
          <AddressContainer>
            <h3 style={{ marginBottom: 10 }}>Shipping Address</h3>
            <NameBlock>
              <Name>
                Name:{' '}
                <span style={{ fontWeight: '100', fontSize: '1rem' }}>
                  {products.fullName}
                </span>
              </Name>
            </NameBlock>
            <AddressBlock>
              <Address>
                Address:{' '}
                <span style={{ fontWeight: '100', fontSize: '1rem' }}>
                  {products.homeAddress}, {products.city}, {products.postalCode}
                  , {products.country}
                </span>
              </Address>
            </AddressBlock>
          </AddressContainer>
          <OrderItemsContainer>
            <h3 style={{ marginBottom: 10 }}>Order Items</h3>
            {products?.products.map((product) => (
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
                  {product.qty} x ${product.price} = $
                  {product.qty * product.price}
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
              <div className="summaryItemPrice">$ {products.amount}</div>
            </OrderItem>
            <OrderItem>
              <div className="summaryItemText">Estimated Shipping</div>
              <div className="summaryItemPrice">$ {shippingPrice}</div>
            </OrderItem>
            <OrderItem>
              <div className="summaryItemText">Tax</div>
              <div className="summaryItemPrice">$ {tax}</div>
            </OrderItem>
            <OrderItemTotal>
              <div className="summaryItemText">Total</div>
              <div className="summaryItemPrice">$ {total}</div>
            </OrderItemTotal>
            {loading ? (
              <OrderButton disabled={loading} onClick={handleOrder}>
                <i className="fa fa-spinner fa-spin"></i>
              </OrderButton>
            ) : (
              <OrderButton onClick={handleOrder}>Place Order</OrderButton>
            )}
          </OrderWrapper>
        </OrderSummary>
      </Container>
    </>
  );
};

export default Payment;
