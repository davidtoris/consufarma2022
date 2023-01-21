import { createSlice } from '@reduxjs/toolkit';

const ResultsSlice = createSlice({
  name: 'results',
  initialState: {
    dataResults: [],
    statusResults: '',
    errorResults: '',
    itemResults: [],
  },
  reducers: {
    resultsPending: (state) => {
      state.statusResults = 'loading';
    },
    resultsSuccess: (state, action) => {
      state.dataResults = action.payload;
      state.statusResults = 'success';
    },
    resultsError: (state, action) => {
      state.statusResults = 'error';
      state.errorResults = action.payload;
    },
    itemResults: (state, action) => {
      state.itemResults = action.payload;
    },
  },
});

export const { resultsPending, resultsSuccess, resultsError, itemResults } = ResultsSlice.actions;
export default ResultsSlice.reducer;