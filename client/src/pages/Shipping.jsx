import React, { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/orderSlice';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: sans-serif;
  background-color: #000;
  color: white;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 380px) {
    width: 90%;
  }
`;

const Form = styled.form`
  width: 400px;
  background-color: rgb(29, 29, 29);
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 10px;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: 600;
`;
const Input = styled.input`
  margin-top: 5px;
  background: none;
  background-color: rgb(17, 17, 17);
  outline: none;
  border: none;
  padding: 10px 22px;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 5px;
`;

const PlaceOrderButton = styled.button`
  margin-top: 20px;
  border: none;
  background: none;
  background-color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    filter: brightness(70%);
  }
`;

const Shipping = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {products, total} = cart
  const user = useSelector(state => state.user)
  const {currentUser} = user


  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault()
      dispatch(addOrder({...input, products, userId: currentUser?.result._id, amount: total }))
      navigate('/payment')
  }

  useEffect(() => {
    document.title = `Shipping - Team Cigarette`;
  }, []);
  return (
    <>
      <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <FormContainer>
          <Form onSubmit={handleClick}>
            <h1 style={{ textAlign: 'center', fontFamily: 'monospace' }}>
              Shipping Address
            </h1>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              placeholder="Full Name..."
              type="text"
              onChange={handleInput}
              id="fullName"
              name="fullName"
              required
            />
            <Label htmlFor="homeAddress">Address</Label>
            <Input
              placeholder="Address..."
              type="text"
              onChange={handleInput}
              id="homeAddress"
              name="homeAddress"
              required
            />
            <Label htmlFor="city">City</Label>
            <Input
              placeholder="City..."
              onChange={handleInput}
              type="text"
              id="city"
              name="city"
              required
            />
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              placeholder="Postal Code..."
              type="number"
              onChange={handleInput}
              id="postalCode"
              name="postalCode"
              required
            />
            <Label htmlFor="country">Country</Label>
            <Input
              placeholder="Postal Code..."
              type="text"
              onChange={handleInput}
              id="country"
              name="country"
              required
            />
            <PlaceOrderButton disabled={!input} type="submit">Place Order</PlaceOrderButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default Shipping;
