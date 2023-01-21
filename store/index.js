import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../slices/CoursesSlice';
import specialitiesReducer from '../slices/SpecialitiesSlice';
import resultsReducer from '../slices/resultsSlice';

const store = configureStore({
  reducer: {
    results: resultsReducer,
    courses: coursesReducer,
    specialities: specialitiesReducer,
  },
});

export default store;