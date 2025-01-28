import { createSlice } from '@reduxjs/toolkit';

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    mailStatus: '',
  },
  reducers: {
    mailLoading: ( state ) => {
      state.mailStatus = 'loading';
    },
    mailSuccess: ( state ) => {
      state.mailStatus = 'success';
    },
    mailReset: (state) => {
      state.mailStatus = '';
    },
  }
});

export const { mailLoading, mailSuccess, mailReset } = mailSlice.actions;

export default mailSlice.reducer;