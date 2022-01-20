import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from '../slices/coursesSlces';

export const store = configureStore({
  reducer: {
    courses : coursesReducer,
  },
})