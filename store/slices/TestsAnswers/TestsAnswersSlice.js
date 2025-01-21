import { createSlice } from '@reduxjs/toolkit';

const testsAnswersSlice = createSlice({
  name: 'testsAnswer',
  initialState: {
    testsAnswersLoading: false,
    testsAnswersErrorMsg: '',
    testsAnswersSuccess: false,
    allTestsAnswers: [],
    allTestsAnswersTemp: '',
    terminoExamen: false,
    status: null,
  },
  reducers: {
    testsAnswersDefault: ( state ) => {
      state.testsAnswersLoading = false;
      state.testsAnswersErrorMsg = '';
      state.testsAnswersSuccess = false;
    },
    testsAnswersLoading: (state, action) => {
      state.testsAnswersLoading = action.payload;
    },
    testsAnswersError: (state, action) => {
      state.testsAnswersErrorMsg = action.payload;
      state.testsAnswersLoading = false;
      state.testsAnswersSuccess = false;
    },
    listTestsAnswers: (state, action) => {
      state.allTestsAnswers = action.payload;
      state.status = 'success';
    },
    addTestsAnswers: (state, action) => {
      state.allTestsAnswers = action.payload;
      state.status = 'success';
      state.testsAnswersSuccess = true;
    },
    addTestsAnswersTemp: (state, action) => {
      state.allTestsAnswersTemp = action.payload;
    },
    SeTerminoExamen: (state, action) => {
      state.terminoExamen = action.payload;
    },
    
  }
});

export const { testsAnswersDefault, testsAnswersLoading, testsAnswersError, listTestsAnswers, 
  addTestsAnswers, addTestsAnswersTemp, selectTestsAnswers, SeTerminoExamen } = testsAnswersSlice.actions;

export default testsAnswersSlice.reducer;