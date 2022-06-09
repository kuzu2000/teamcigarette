import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from './requestMethod';

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const res = await publicRequest.get('/products');
  return res.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    showError: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.isFetching = false;
    },
    updateProduct: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    deleteProduct: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    getProduct: (state, action) => {
      state.products = action.payload
      state.isFetching = false;
    }
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.products = action.payload
    },
    [fetchProducts.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {
  startLoading,
  showError,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct
} = productSlice.actions;
export default productSlice.reducer;
