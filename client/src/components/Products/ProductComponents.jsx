import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './../../redux/productSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fff;
`;

const ProductS = styled.div`
  width: 100%;
  clear: both;
  margin: 0 auto;
  padding: 20px;
  max-width: 1180px;
  font-family: Roboto, sans-serif;
  margin-top: 40px;
  @media only screen and (max-width: 380px) {
    margin-top: 60px;
  }
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

  @media only screen and (max-width: 380px) {
    bottom: -6px;
  }

  ${({ soldout }) =>
    soldout &&
    `
    opacity: 1;
  `}

  
`;

const FrontPicture = styled.img`
  position: absolute;
  opacity: 1;
  top: -25px;
  left: 70px;
  margin: 0 auto;
  max-height: 300px;
  padding: 0;
  width: 60%;
  text-align: center !important;
  transition: all 0.4s ease-in-out;
`;

const BackPicture = styled.img`
  opacity: 0;
  position: absolute;
  top: -25px;
  left: 70px;
  margin: 0 auto;
  max-height: 300px;
  padding: 0;
  width: 60%;
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
text-align: center;

  @media only screen and (max-width: 380px) {
    width: 100%;
    height: 400px !important;
    margin-bottom: 45px;
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

  ${({ soldout }) =>
    soldout &&
    `
    opacity: .4;
  `}
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

  @media only screen and (max-width: 380px) {
    bottom: 15px;
    max-height: 300px;
    text-align: center;
    padding: 0;
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
  font-family: Barlow Condensed, sans-serif;
  border-radius: 0 0 7px 7px;

  @media only screen and (max-width: 380px) {
    bottom: 80px;
    text-align: center;
    padding: 0;
  }
`;

const ProductPara = styled.p`
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;
  margin-top: 15px;

 
`;
const ProductComponents = () => {
    const productss = useSelector((state) => state.productList.products);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
    useEffect(() => {
      document.title = 'Team Cigarette Shop';
    }, []);
  
    // const [sort, setSort] = useState('newest');
    // const [filteredProducts, setProducts] = useState(product);
  
    // useEffect(() => {
    //   if (sort === 'asc') {
    //     setProducts((prev) => Array.from(prev).sort((a, b) => a.price - b.price));
    //   } else if (sort === 'desc') {
    //     setProducts((prev) => Array.from(prev).sort((a, b) => b.price - a.price));
    //   } else {
    //     setProducts((prev) =>
    //      Array.from(prev).sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
    //     );
    //   }
    // }, [sort]);
  
    return (
      <Container>
        {/* <SELECT onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="desc">Price (Higher to lower)</option>
          <option value="asc">Price (Lower to higher)</option>
        </SELECT> */}
        <ProductS>
          {Array.from(productss).map((product) => (
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
    )
  }
  

export default ProductComponents;
