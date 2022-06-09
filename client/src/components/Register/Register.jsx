import React, { useState } from 'react';
import Sponsors from '../Sponsors/Sponsors';
import styled from 'styled-components';
import { register } from './../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const ContainerBackground = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
`;

const Header1 = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  color: rgb(256, 256, 256);
  font-size: 48px;
  text-align: center;
`;

const LoginForm = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(256, 256, 256);
  flex-direction: column;
  font-family: 'Barlow Condensed', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #111;
  border-radius: 40px;
  padding: 40px;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const Label = styled.label`
  margin: 0 0 10px;
  font-weight: 600;
  font-size: 12px;

  @media only screen and (max-width: 420px) {
    font-size: 1rem;
    letter-spacing: 3px;
  }
`;

const Input = styled.input`
  margin: 0 0 10px;
  padding: 10px;
  font-size: 12px;
  border: 1px solid #1b1b1b;
  background-color: #0a0a0a;
  width: 1180px;
  color: #fff;

  @media only screen and (max-width: 420px) {
    width: 90%;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  border: none;
  padding: 16px 4px;
  margin: 0;
  background: #fff;
  color: #000;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  width: 150px;

  &:hover {
    filter: brightness(70%);
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { isFetching, currentUser } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { username, email, password };
    if (!form) {
      alert('Password and confirm password are not match');
    } else {
      register(dispatch, form);
    }
  };

  React.useEffect(() => {
    if (currentUser) {
      navigate(redirect);
    }
  }, [navigate, redirect, currentUser]);

  return (
    <>
      <Sponsors />
      <Background>
        <ContainerBackground
          style={{
            backgroundImage: `url('https://cdn.shopify.com/s/files/1/0077/8027/0133/files/account_background.jpg?v=1576303044')`,
          }}
        >
          <Header1>REGISTER</Header1>
          <LoginForm>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="username">USERNAME</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                type="text"
                id="username"
              />
              <Label htmlFor="email">EMAIL</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                id="email"
              />
              <Label htmlFor="password">PASSWORD</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                id="password"
              />
              {isFetching ? (
                <Button disabled={isFetching} type="submit">
                  <i className="fa fa-spinner fa-spin"></i> CREATE ACCOUNT
                </Button>
              ) : (
                <Button type="submit">CREATE ACCOUNT</Button>
              )}
            </Form>
          </LoginForm>
        </ContainerBackground>
      </Background>
    </>
  );
};

export default Register;
