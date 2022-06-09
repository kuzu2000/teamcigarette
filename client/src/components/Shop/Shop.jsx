import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './../../redux/productSlice';
import { Link } from 'react-router-dom';
const Container = styled.div`
width: 100%;
height: 100vh;
background-color: #000;

@media only screen and (max-width: 420px) {
  min-height: 100vh;
}
`;

const ShopTitle = styled.div`
  width: 100%;
  margin-bottom: 4rem;

  margin-top: 55px;

  @media only screen and (max-width: 420px) {
    margin-bottom: 40px;
    margin-top: 45px;
  }
 
`;

const ShopHeader = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  font-family: Barlow Condensed,sans-serif;

  
`;

const ShopPara = styled.p`
  text-align: center;
  text-transform: uppercase;
  color: #888;
  margin: 0 auto;
  line-height: 22px;
  width: 40%;

  @media only screen and (max-width: 420px) {
    width: 80%;
    margin-bottom: 25px;
  }
`;

const ProductS = styled.div`
  width: 100%;
  height: 100%;
  clear: both;
  margin: 0 auto;
  padding: 20px;
  max-width: 1180px;
  font-family: Roboto, sans-serif;
`;

const ProductDetail = styled.div`
  position: absolute;
  bottom: 40px;
  left: 55px;
  text-align: center;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  margin: 0 auto;
  padding: 14px 20px;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  background-color: #000;
  border-radius: 5px;
  width: 70%;

  @media only screen and (max-width: 420px) {
    bottom: 60px;
  }
`;

const FrontPicture = styled.img`
  position: absolute;
  opacity: 1;
  top: -25px;
  left: 50px;
  margin: 0 auto;
  max-height: 300px;
  padding: 0;
  width: 70%;
  text-align: center !important;
  transition: all 0.4s ease-in-out;
`;

const BackPicture = styled.img`
  opacity: 0;
  position: absolute;
  top: -25px;
  left: 50px;
  margin: 0 auto;
  max-height: 300px;
  padding: 0;
  width: 70%;
  text-align: center !important;
  transition: all 0.4s ease-in-out;
`;

const Product = styled.div`
  float: left;
  width: 32%;
  position: relative;
  margin: 0 0.5%;
  height: 500px !important;
  cursor: pointer;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }

  &:hover ${ProductDetail} {
    opacity: 1;
  }

  &:hover ${FrontPicture} {
    opacity: 0;
  }

  &:hover ${BackPicture} {
    opacity: 1;
  }

`;

const ProductBlock = styled.div`
  position: absolute;
  bottom: 60px;
  margin: 0 auto;
  padding: 0 0 20px;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 320px;
  text-align: center;
  border: 1px solid #111111;
  border-radius: 7px 7px 0 0;

  @media only screen and (max-width: 420px) {
    bottom: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 130px;
  text-transform: uppercase;
  margin: 0;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-family: Barlow Condensed,sans-serif;
  border-radius: 0 0 7px 7px;
`;

const ProductPara = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;
  margin-top: 15px;
`;


const Shop = () => {
  const products = useSelector(state => state.productList.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
}, [dispatch])
  return (
    <Container>
      <ShopTitle>
        <ShopHeader>SHOP OUR GEAR</ShopHeader>
        <ShopPara>
          GO GRAB SOME SWEET GEAR TO REP TEAM CIGARETTES AT THE NEXT EVENT, OR
          TO RELAX IN WHILST WATCHING AT HOME!
        </ShopPara>
      </ShopTitle>
      <ProductS>
        {Array.from(products).slice(0,3).map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="link"
          >
            <Product>
              <ProductBlock></ProductBlock>
              <FrontPicture src={product.frontSide} alt={product.name} />
              <BackPicture src={product.backSide} alt={product.name} />
              <ProductInfo>
                <h1 style={{ fontSize: 32 }}>{product.name}</h1>
                <ProductPara>$ {product.price}</ProductPara>
              </ProductInfo>
              <ProductDetail>View Product</ProductDetail>
            </Product>
          </Link>
        ))}
      </ProductS>
    </Container>
  );
};

export default Shop;
