import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: [],
    userLoading: false,
    userSuccess: false,
    userRegister: false,
    userToken: false,
    userErrorMsg: '',
  },
  reducers: {
    getUser: (state, action) => {
      state.userData = action.payload;
      state.userLoading = false;
      state.userSuccess = true;
    },
    userLoadingFunc: (state, action) => {
      state.userLoading = action.payload;
    },
    userErrorFunc: (state, action) => {
      state.userErrorMsg = action.payload;
      state.userLoading = false;
      state.userRegister = false;
      state.userSuccess = false;
    },
    userDefault: ( state ) => {
      state.userLoading = false;
      state.userErrorMsg = '';
      state.userSuccess = false;
    },
    userRegister: ( state ) => {
      state.userLoading = false;
      state.userErrorMsg = '';
      state.userRegister = true;
    },
    userSuccess: ( state ) => {
      state.userLoading = false;
      state.userErrorMsg = '';
      state.userSuccess = true;
    },
    userSuccessTokenFunc: ( state ) => {
      state.userLoading = false;
      state.userToken = true;
    },
  }
});

export const { getUser, userSuccess, userLoadingFunc, userErrorFunc, 
  userDefault, userRegister, userSuccessTokenFunc } = authSlice.actions;

export default authSlice.reducer;
