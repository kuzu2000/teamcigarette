import React, {Suspense} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: Roboto, sans-serif;
  background-color: rgb(0, 0, 0);
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ErrorTitle = styled.h1`
  font-size: 62px;
  text-transform: uppercase;
  color: #fff;
  margin: 0 auto 40px;
  padding: 0;
  max-width: 600px;
  text-align: center;
  font-family: Barlow Condensed, sans-serif;
`;

const ErrorPara = styled.p`
  font-size: 18px;
  color: #fff;
  margin: 0 0 20px;
  padding: 0;
  text-align: center;
`;

const ErrorPage = () => {
  return (
    <>
      <Suspense fallback={<div><CircularProgress/></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <ErrorContainer>
          <ErrorTitle>404 PAGE NOT FOUND</ErrorTitle>
          <ErrorPara>The page you requested does not exist.</ErrorPara>
          <ErrorPara>
            <Link
              style={{ textDecoration: 'underline' }}
              className="link"
              to="/"
            >
              Continue shopping
            </Link>
          </ErrorPara>
        </ErrorContainer>
      </Container>
    </>
  );
};

export default ErrorPage;
