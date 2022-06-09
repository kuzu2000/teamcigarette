import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "./requestMethod";

export const fetchOrders = createAsyncThunk('fetchOrders', async (userId) => {
  const res = await userRequest.post('/orders/mine', userId);
  return res.data;
});

export const fetchAdminOrders = createAsyncThunk('fetchAdminOrders', async () => {
  const res = await userRequest.get('/orders/admin');
  return res.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    products: null,
    orders: [],
    loading: null,
    error: false
  },
  reducers: {
    isLoading: (state) => {
      state.loading = true
      state.error = false
    }, 
    isError: (state) => {
      state.loading = false
      state.error = true
    },
    addOrder: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchOrder: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    updateOrder: (state, action) => {
      state.orders = action.payload
      state.loading = false
    }
  },
   extraReducers: {
    [fetchOrders.pending]: (state) => {
        state.isFetching = true;
        state.isError = false;
      },
      [fetchOrders.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.orders = action.payload
      },
      [fetchOrders.rejected]: (state) => {
        state.isFetching = false;
        state.isError = true;
      },
      [fetchAdminOrders.pending]: (state) => {
        state.isFetching = true;
        state.isError = false;
      },
      [fetchAdminOrders.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.orders = action.payload
      },
      [fetchAdminOrders.rejected]: (state) => {
        state.isFetching = false;
        state.isError = true;
      },
  },
});

export const { addOrder,  isLoading, isError, fetchOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;