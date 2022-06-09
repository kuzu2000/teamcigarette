import React, { Suspense } from 'react';

import { CircularProgress } from '@mui/material';
const Content = React.lazy(() => import('../components/Content/Content'));
const Teams = React.lazy(() => import('../components/Teams/Teams'));
const Header = React.lazy(() => import('../components/Header/Header'));
const Shop = React.lazy(() => import('../components/Shop/Shop'));
const News = React.lazy(() => import('../components/News/News'));
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'));
const Home = () => {
  React.useEffect(() => {
    document.title = 'Team Cigarette';
  }, []);
  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <Suspense
          fallback={
            <div>
              <CircularProgress />
            </div>
          }
        >
          <Sponsors />
          <Header />
          <Content />
          <News />
          <Shop />
          <Teams />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
