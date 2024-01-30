import { createSlice } from '@reduxjs/toolkit';

const specialitiesSlice = createSlice({
  name: 'specialities',
  initialState: {
    allSpecialities: [],
    selectSpeciality: '',
    status: null,
  },
  reducers: {
    addSpecialities: (state, action) => {
      state.allSpecialities = action.payload;
      state.status = 'success';
    },
    selectSpecialities: (state, action) => {
      state.selectSpeciality = action.payload;
    },
  }
});

export const { addSpecialities, selectSpecialities } = specialitiesSlice.actions;

export default specialitiesSlice.reducer;