import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../slices/CoursesSlice';
import specialitiesReducer from '../slices/SpecialitiesSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    specialities: specialitiesReducer,
  },
});

export default store;