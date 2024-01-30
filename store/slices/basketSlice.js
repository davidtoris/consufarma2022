import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    allBasket: 0,
    staus: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.allBasket = action.payload;
    },
  }
});

export const { addItem } = basketSlice.actions;

export default basketSlice.reducer;
