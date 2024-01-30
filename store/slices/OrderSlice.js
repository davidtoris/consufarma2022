import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orderData: [],
    orderStatus: 'error',
    orderMessage: 'No se pudo realizar la transacción',
  },
  reducers: {
    orderSuccess: (state, action) => {
      state.orderStatus = 'success';
      state.orderData = action.payload;
    },
    orderError: (state, action) => {
      state.orderStatus = 'error';
      state.orderMessage = action.payload;
    },
  }
});

export const { orderSuccess, orderError } = ordersSlice.actions;

export default ordersSlice.reducer;