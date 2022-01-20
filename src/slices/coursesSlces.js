import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instanceAPI from '../config/axiosconfig';

export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async () => {
    const courses = await instanceAPI.get('/cursos-speciality')
      .then((resp) => resp.data);
    console.log(courses);
    return courses;
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    getCourses: [],
    status: null,
    selected: [],
  },
  reducers: {
    
  },
  extraReducers: {
    [getCourses.pending]: (state) => {
      state.status = 'loading';
    },
    [getCourses.fulfilled]: (state, action) => {
      state.status = 'success';
      state.courses = action.payload;
    },
    [getCourses.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});
// export const { itemSelected } = promotionSlice.actions;
export default coursesSlice.reducer;