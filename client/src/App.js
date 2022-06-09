import './App.css';
import React, { Suspense } from 'react';
import Nav from './components/Nav/Nav';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Admin from './pages/Admin';
import Cart from './components/Cart/Cart';
import { useSelector } from 'react-redux';
import ErrorPage from './pages/ErrorPage';
import CreateNews from './pages/CreateNews';
import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Account from './pages/Account';
import OrderUpdate from './pages/OrderUpdate';
import TeamsPage from './pages/TeamsPage';
import { CircularProgress } from '@mui/material';
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const OrderDetail = React.lazy(() => import('./pages/OrderDetail'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'));
const TeamDetail = React.lazy(() =>
  import('./components/TeamDetail/TeamDetail')
);
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const promise = loadStripe(
  'pk_test_51Ku0eaKNsPpoql9XEOvBDUwcx9sWFeNmMwnYt3maCcPbFzdSI6iskgLKbjWFNkDQnEqu2sOf2thralW3mr20Knc900KNjKQKsH'
);
function App() {
  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />
          <Route
            exact
            path="/teams/:id"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <TeamDetail />
              </Suspense>
            }
          />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/account" element={<Account />} />
          <Route
            exact
            path="/history"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <OrderHistory />
              </Suspense>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <About />
              </Suspense>
            }
          />
          <Route
            exact
            path="/history/:id"
            element={
              <Elements stripe={promise}>
                <Suspense
                  fallback={
                    <div>
                      <CircularProgress />
                    </div>
                  }
                >
                  <OrderDetail />
                </Suspense>
              </Elements>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              currentUser && currentUser?.result.isAdmin ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/admin/:id"
            element={
              currentUser && currentUser?.result.isAdmin ? (
                <OrderUpdate />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route
            exact
            path="/news"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <NewsPage />
              </Suspense>
            }
          />
          <Route exact path="/teams" element={<TeamsPage />} />
          <Route
            exact
            path="/news/:id"
            element={
              <Suspense
                fallback={
                  <div>
                    <CircularProgress />
                  </div>
                }
              >
                <NewsDetail />
              </Suspense>
            }
          />
          <Route exact path="/news/create" element={<CreateNews />} />
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
