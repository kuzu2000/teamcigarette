import React, { useState, Suspense} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/api';
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

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { currentUser } = user;
  const [username, setUsername] = useState(currentUser?.result.username);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const input = {
    username,
    password,
  };

  const handleClick = (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      if (input) {
        update(
          dispatch,
          input,
          currentUser?.result.email,
          currentUser?.result._id
        );
        setLoading(false);
        setSuccess(true);
      }
    }, 1500)
  };


  return (
    <>
      <Suspense fallback={<div><CircularProgress/></div>}>
      <Sponsors />
      </Suspense>
      <Container>
        <FormContainer>
          <Form onSubmit={handleClick}>
            <h1 style={{ textAlign: 'center', fontFamily: 'monospace' }}>
              User Profile
            </h1>
            {success && <span
              style={{
                marginTop: 5,
                fontSize: '1rem',
                padding: 15,
                borderRadius: 5,
                backgroundColor: '#bcffa6',
                color: '#2d9314',
                fontWeight: 600,
              }}
            >
              Profile Updated Successfully
            </span>}
            <Label htmlFor="username">User Name</Label>
            <Input
              placeholder="Username..."
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
              name="username"
            />
            {/* <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Email..."
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              required
            /> */}
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
            />
            {loading ? (
              <PlaceOrderButton disabled={loading} type="submit">
                <i className="fa fa-spinner fa-spin"></i>
              </PlaceOrderButton>
            ) : (
              <PlaceOrderButton type="submit">Update Account</PlaceOrderButton>
            )}
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default Account;
