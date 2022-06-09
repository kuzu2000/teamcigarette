import React, {useEffect} from 'react';
import styled from 'styled-components';
import Sponsors from '../Sponsors/Sponsors';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from './../../redux/cartSlice';
const Container = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background: rgb(0, 0, 0);
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const CartHeader = styled.div`
  padding-top: 10px;
  text-align: center;
  font-size: 28px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 380px) {
    flex-direction: column;
  }
`;

const ItemList = styled.div`
  flex: 3;
  padding: 20px;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(22, 22, 22);
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;

  @media only screen and (max-width: 380px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  flex: 2;
  margin-left: 20px;
  padding: 10px 0;

  @media only screen and (max-width: 380px) {
    flex-direction: row;
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 200px;
`;

const ItemDetails = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DeleteButton = styled.button`
  postion: absolute;
  right: 50px;
  margin-right: 30px;
  top: 25px;
  border: none;
  background: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: rgb(255, 0, 0);
  }

  @media only screen and (max-width: 380px) {
    margin-top: 10px;
  }
`;

const Price = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media only screen and (max-width: 380px) {
    margin-bottom: 0px;
  }
`;

const ProductQtyButton = styled.button`
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: 0.4s;

  &:hover {
    background-color: rgb(15, 15, 15);
  }

  @media only screen and (max-width: 380px) {
    font-size: 2rem;
    height: 60px;
    width: 60px;
  }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summmary = styled.div`
  padding: 20px;
  flex: 1;
  height: 50vh;
`;

const SummaryWrapper = styled.div`
  padding: 20px;
  background-color: rgb(22, 22, 22);
  border-radius: 5px;
`;

const SummaryTitle = styled.div`
  padding: 0px;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 600;
  background-color: rgb(22, 22, 22);
  border-radius: 5px;
`;

const SummaryItemTotal = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const CartButton = styled.button`
  width: 100%;
  padding: 10px;
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

const NoCart = styled.div`
  padding: 80px 0;
  max-width: 1080px;
  margin: 0 auto;
`;

const NoCartHeader = styled.h1`
  text-align: center;
  font-family: Barlow Condensed, sans-serif;
  font-weight: 500;
  font-size: 62px;
`;

const CartEmpty = styled.div`
margin: 0;
    padding: 40px 20px;
    box-sizing: border-box;
    width: 100%;
    background-color: #111;
    border-radius: 10px;
`

const CartEmptyMessage = styled.div`
font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
    text-align: center;
    font-family: Roboto,sans-serif;
`

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);
  React.useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    document.title = "Cart - Team Cigarette"
  }, [])

  const handleIncrease = (name) => {
    dispatch(increase(name));
  };

  const handleDecrease = (name) => {
    dispatch(decrease(name));
  };

  const handleCheckOut = () => {
    navigate('/login?redirect=/shipping');
  }
  return (
    <>
      <Sponsors />
      <Container>
        {cart.products.length === 0 ? (
          <>
            <NoCart>
              <NoCartHeader>Your Cart</NoCartHeader>
              <CartEmpty>
                <CartEmptyMessage>{`There are currently no items in your cart.    `}<Link style={{textDecoration: 'underline'}} className="link" to="/">Continue Shopping</Link></CartEmptyMessage>
              </CartEmpty>
            </NoCart>
          </>
        ) : (
          <>
            <CartHeader>Shopping Cart</CartHeader>
            <div style={{ textAlign: 'center' }}>
              {cart.quantity > 1
                ? `(${cart.quantity}) items`
                : `(${cart.quantity}) item`}
            </div>
            <Bottom>
              <ItemList>
                {Array.from(cart.products).map((product) => (
                  <Product key={product.cartId}>
                    <Item>
                      <ProductImage
                        src={product.frontSide}
                        alt={product.name}
                      />
                      <ItemDetails>
                        <div className="productName">
                          <b>Product Name:</b> {product.name}
                        </div>
                        <div className="productSize">
                          <b>Product Size:</b> {product.size}
                        </div>
                        <div className="productQty">
                          <b>Product Quantity:</b> {product.qty}
                        </div>
                      </ItemDetails>
                    </Item>

                    <Price>
                      <ProductAmountContainer>
                        <ProductQtyButton
                          onClick={() => {
                            product.qty < 10 && handleIncrease(product.cartId);
                          }}
                        >
                          +
                        </ProductQtyButton>
                        <div className="productAmount">{product.qty}</div>
                        <ProductQtyButton
                          onClick={() => {
                            product.qty > 1 && handleDecrease(product.cartId);
                          }}
                        >
                          -
                        </ProductQtyButton>
                      </ProductAmountContainer>
                      <ProductPrice>$ {product.price}</ProductPrice>
                    </Price>
                    <DeleteButton
                      onClick={() => dispatch(removeItem(product.cartId))}
                    >
                      <DeleteIcon sx={{fontSize: '2.5rem'}}/>
                    </DeleteButton>
                  </Product>
                ))}
              </ItemList>
              <Summmary>
                <SummaryWrapper>
                  <SummaryTitle>CART TOTAL</SummaryTitle>
                  <SummaryItemTotal>
                    <div className="summaryItemText">Total</div>
                    <div className="summaryItemPrice">$ {cart.total}</div>
                  </SummaryItemTotal>
                  <CartButton onClick={handleCheckOut}>Proceed to Checkout</CartButton>
                  <p style={{fontSize: 14, marginTop: 5}}>*Shipping will be free, if the total amount exceeds $100.</p>
                </SummaryWrapper>
              </Summmary>
            </Bottom>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
