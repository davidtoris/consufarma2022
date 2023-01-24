import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    allBasket: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.allBasket = [...state.allBasket, action.payload];
    },
  }
});

export const { addItem } = basketSlice.actions;

export default basketSlice.reducer;
