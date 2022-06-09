import React, { useState } from 'react';
import styled from 'styled-components';
import Sponsors from '../components/Sponsors/Sponsors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateAdminOrder } from '../redux/api';
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
const Select = styled.select`
padding: 10px 15px;
font-size: 1rem;
`


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
const OrderUpdate = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const orderId = pathname.split('/')[2]
  console.log(orderId)
  
  
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.orders)
  const isLoading = useSelector(state => state.order.loading)
  const [isPaid, setisPaid] = useState(orders.isPaid)
  const [status, setStatus] = useState(orders.status)
  const inputs = {
    isPaid, status
  }
  console.log(inputs)
  

  const handleUpdate = (e) => {
    e.preventDefault()
      updateAdminOrder(dispatch, orderId, inputs, navigate)
  }
    return (
        <>
      <Sponsors />
      <Container>
        <FormContainer>
          <Form onSubmit={handleUpdate}>
            <h1 style={{ textAlign: 'center', fontFamily: 'monospace' }}>
              Update Order
            </h1>
            <Label htmlFor="isPaid">Is Paid</Label>
            <Select defaultValue={orders.isPaid ? "true" : 'false'} onChange={(e) => setisPaid(e.target.value)} name="isPaid" id="isPaid">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
            <Label htmlFor="status">Is Delievered</Label>
            <Select defaultValue={orders.status ? "true" : 'false'} onChange={(e) => setStatus(e.target.value)} name="status" id="status">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
            {isLoading ? (
              <PlaceOrderButton disabled={isLoading}>
                <i className="fa fa-spinner fa-spin"></i>
              </PlaceOrderButton>
            ) : (
              <PlaceOrderButton type="submit">Update Order</PlaceOrderButton>
            )}
          </Form>
        </FormContainer>
      </Container>
    </>
    );
}

export default OrderUpdate;
