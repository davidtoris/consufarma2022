import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/Courses/CoursesSlice';
import specialitiesReducer from './slices/Speciality/SpecialitiesSlice';
import resultsReducer from './slices/resultsSlice';
import basketReducer from './slices/basketSlice';
import orderReducer from './slices/OrderSlice';
import authReducer from './slices/Auth/AuthSlice';
import testReducer from './slices/Tests/TestSlice';

const store = configureStore({
  reducer: {
    tests: testReducer,
    auths: authReducer,
    orders: orderReducer,
    basket: basketReducer,
    results: resultsReducer,
    specialities: specialitiesReducer,
    courses: coursesReducer,
  },
});

export default store;
