import { createSlice } from '@reduxjs/toolkit';

const testsSlice = createSlice({
  name: 'tests',
  initialState: {
    testLoading: false,
    testErrorMsg: '',
    testSuccess: false,
    allTests: [],
    status: null,
  },
  reducers: {
    testDefault: ( state ) => {
      state.testLoading = false;
      state.testErrorMsg = '';
      state.testSuccess = false;
    },
    testLoading: (state, action) => {
      state.testLoading = action.payload;
    },
    testError: (state, action) => {
      state.testErrorMsg = action.payload;
      state.testLoading = false;
      state.testSuccess = false;
    },
    listTests: (state, action) => {
      state.allTests = action.payload;
      state.status = 'success';
    },
    addTests: (state, action) => {
      state.allTests = action.payload;
      state.status = 'success';
      state.testSuccess = true;
    },
    selectTests: (state, action) => {
      state.selectSpeciality = action.payload;
    },
  }
});

export const { testDefault, testLoading, testError, listTests, addTests, selectTests } = testsSlice.actions;

export default testsSlice.reducer;