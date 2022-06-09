import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
    },
    clearCart: (state) => {
      state.products = [];
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.cartId !== action.payload
      );
    },
    increase: (state, { payload }) => {
      const product = state.products.find((item) => item.cartId === payload);
      product.qty += 1;
    },
    decrease: (state, { payload }) => {
      const products = state.products.find(
        (product) => product.cartId === payload
      );
      products.qty -= 1;
    },
    calculateTotals: (state) => {
      let qty = 0;
      let total = 0;
      state.products.forEach((item) => {
        qty += item.qty;
        total += item.qty * item.price;
      });
      state.quantity = qty;
      state.total = total;
    },
  },
});

export const { addToCart, increase, decrease, removeItem, calculateTotals, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
