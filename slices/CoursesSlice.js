import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: [],
    status: null,
  },
  reducers: {
    addCourses: (state, action) => {
      state.allCourses = action.payload;
      state.status = 'success';
    },
  }
});

export const { addCourses, addSpecialities } = coursesSlice.actions;

export default coursesSlice.reducer;