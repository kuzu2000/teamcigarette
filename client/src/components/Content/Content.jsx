import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
const Container = styled.div`
  background-color: rgb(0, 0, 0);
  display: flex;
  padding: 1rem 3rem;
  width: 100vw;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    padding: 5px;
  }
`


const FeaturedProducts = styled.div`
  color: rgb(248, 248, 248);
  background-color: rgb(17, 17, 17);
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 6px 1rem;
  align-items: center;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  font-family: Barlow Condensed,sans-serif;

  &:hover {
    background-color: rgb(34, 34, 34);
  }

  @media only screen and (max-width: 420px) {
    width: 100%;
    margin: 0;
    margin-top: 10px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductName = styled.h3`
font-size: 28px;
font-weight: 500;
`;

const ProductPrice = styled.p`
font-size: 18px;
color: #888;
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Content = () => {
  return (
    <Container>
      <Link style={{flex: 1}} to={`/products/6298e2b826a7fc68787b0286`} className="link flex">
      <FeaturedProducts>
        <ProductInfo>
          <ProductName>T-shirt (white)</ProductName>
          <ProductPrice>$ 20</ProductPrice>
        </ProductInfo>
        <ProductImage>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654186675373tshirtfront-removebg-preview.png?alt=media&token=2af25208-5c44-47c9-901e-7d33cab7bdba"
            alt="T-shirt (white)"
          />
        </ProductImage>
      </FeaturedProducts>
      </Link>

      <Link style={{flex: 1}} to={`/products/6298d60e26a7fc68787b0256`} className="link flex">
      <FeaturedProducts>
        <ProductInfo>
          <ProductName>Hoodie (Black)</ProductName>
          <ProductPrice>$ 50</ProductPrice>
        </ProductInfo>
        <ProductImage>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/esport-ff6a4.appspot.com/o/1654183433504hoodieblack-removebg-preview.png?alt=media&token=fa2aef07-d86b-4340-abd2-4f93147ba0fb"
            alt="Hoodie (Black)"
          />
        </ProductImage>
      </FeaturedProducts>
      </Link>

     <a className="link flex" style={{flex: 1}} href="https://discord.com" rel="noreferrer" target="_blank">
      <FeaturedProducts>
        <ProductInfo>
          <ProductName>JOIN OUR DISCORD!</ProductName>
          <ProductPrice>DISCORD.GG</ProductPrice>
        </ProductInfo>
        <ProductImage>
          <Image
            src="data:image/webp;base64,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"
            alt=""
          />
        </ProductImage>
      </FeaturedProducts>
      </a>
    </Container>
  );
};

export default Content;
