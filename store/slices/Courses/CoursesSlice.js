import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: [],
    allCoursesDate: [],
    status: null,
    statusDate: null,
  },
  reducers: {
    addCourses: (state, action) => {
      state.allCourses = action.payload;
      state.status = 'success';
    },
    addCoursesDate: (state, action) => {
      state.allCoursesDate = action.payload;
      state.statusDate = 'success';
    },
  }
});

export const { addCourses, addCoursesDate, addSpecialities } = coursesSlice.actions;

export default coursesSlice.reducer;