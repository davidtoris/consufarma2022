import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../slices/CoursesSlice';
import specialitiesReducer from '../slices/SpecialitiesSlice';
import resultsReducer from '../slices/resultsSlice';
import basketReducer from '../slices/basketSlice';

const store = configureStore({
  reducer: {
    basket: basketReducer,
    results: resultsReducer,
    courses: coursesReducer,
    specialities: specialitiesReducer,
  },
});

export default store;
