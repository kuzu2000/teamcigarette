import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProductDetails } from '../../redux/api';
import { addToCart } from './../../redux/cartSlice';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const ProductDetailDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImg = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;

  @media only screen and (max-width: 420px) {
    justify-content: center;
    padding: 0;
    width: 400px;
  }
`;

const Img = styled.img`
  width: 80%;
  border-radius: 10px;
  background-position: center;
`;
const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-family: sans-serif;

  
`;

const ProductTitle = styled.div`
  font-size: 48px;
  text-transform: uppercase;
  color: #000;
  padding: 0;
  font-family: Barlow Condensed, sans-serif;
  font-weight: 500;
`;

const ProductPrice = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.75rem;
  color: #212121;
`;

const ProductDescription = styled.div`
  margin-top: 15px;
`;

const ProductDescriptionHeader = styled.h3`
  font-size: 14px;
  font-family: Inter var;
  font-size: 0.875rem;
  line-height: 1.7142857;
  @media only screen and (max-width: 420px) {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

const ProductDesciptionPara = styled.p`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-top: 5px;
  line-height: 25px;
  font-size: 14px;
  color: #616161;
`;

const ProductSize = styled.div`
  margin-top: 15px;
`;

const ProductSizeHeader = styled.h3`
  font-weight: 400;
  font-family: Inter var;
  font-weight: 500;

  @media only screen and (max-width: 420px) {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

const ADDTOCART = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
`;

const ADDTOCARTBUTTON = styled.button`
  cursor: pointer;
  width: 90%;
  padding: 16px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: none;
  background: none;
  outline: none;
  font-weight: 600;
  background-color: #000000;
  color: #fff;

  &:enabled:hover {
    background-color: white;
    color: #000000;
    border: 1px solid #000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }

   @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const Lists = styled.div`
  float: left;
  clear: both;
  padding: 0;
  width: 80%;
  margin-bottom: 10px;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const Radios = styled.div`
  display: flex;
  gap: 0.75rem;
  font-family: sans-serif;
`;

const Select = styled.div`
  flex: 1;
`;

const Label = styled.label`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: Inter var;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border-style: solid;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: #e5e7eb;
  background-color: #fff;
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #000;
  flex: 1 1 0%;
`;

const Input = styled.input`
  display: none;
  &:checked ~ ${Label} {
    background-color: #1a1a1a;
    color: white;
  }

  &:disabled ~ ${Label} {
    opacity: 0.25;
    cursor: not-allowed;
  }
`;

const IsError = styled.div`
  margin-top: 10px;
  float: left;
  clear: both;
  padding: 0;
  width: 100%;
  margin-bottom: 10px;
`;

const IsErrorMessage = styled.span`
  display: inline-block;
  background-color: #de2a2a;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  padding: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  border-radius: 0.375rem;
`;

const ProductDetailComponent = () => {
  const [showError, setShowError] = useState(false);
  const [size, setSize] = useState('XL');
  const [qty, setQty] = useState(1);
  const handleChange = (e) => {
    setSize(e.target.value);
    if (e.target.name === 'true') {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const productId = pathname.split('/')[2];

  useEffect(() => {
    getProductDetails(dispatch, productId);
  }, [dispatch, productId]);

  const product = useSelector((state) => state.productList);
  const { products, isFetching } = product;
  const cart = useSelector((state) => state.cart.products.length);

  const handleClick = () => {
    dispatch(addToCart({ ...products, size, cartId: cart + 1, qty }));
  };

  useEffect(() => {
    if (isFetching) {
      document.title = `Loading...`;
    } else {
      document.title = `${products.name} - Team Cigarette`;
    }
  }, [products.name, isFetching]);

  return (
    <Container>
      <ProductDetailDiv>
        <ProductImg>
          <Img src={products.displayImg} alt={products.name} />
        </ProductImg>
        <ProductInfo>
          <ProductTitle>{products.name}</ProductTitle>
          <ProductPrice>${products.price}</ProductPrice>
          <ProductDescription>
            <ProductDescriptionHeader>Description</ProductDescriptionHeader>
            <ProductDesciptionPara>{products.desc}</ProductDesciptionPara>
          </ProductDescription>
          <ProductSize>
            <ProductSizeHeader>Size</ProductSizeHeader>

            <Lists>
              <Radios>
                {products.sizes?.map((s) => (
                  <Select key={s.size}>
                    <Input
                      id={s.size}
                      value={s.size}
                      type="radio"
                      name={(s.quantity < 3).toString()}
                      checked={size === s.size}
                      onChange={handleChange}
                      disabled={s.quantity === 0}
                      showError={s.quantity < 3}
                    />
                    <Label htmlFor={s.size}>{s.size}</Label>
                  </Select>
                ))}
              </Radios>
              {showError && (
                <IsError>
                  <IsErrorMessage>Low on Stock</IsErrorMessage>
                </IsError>
              )}
            </Lists>
          </ProductSize>
          <ADDTOCART>
            <ADDTOCARTBUTTON
              onClick={handleClick}
              disabled={!products.isAvailable}
              type="submit"
            >
              Add to cart
            </ADDTOCARTBUTTON>
          </ADDTOCART>
        </ProductInfo>
      </ProductDetailDiv>
    </Container>
  );
};

export default ProductDetailComponent;
