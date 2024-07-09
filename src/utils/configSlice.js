import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'configuration',
  initialState: {
    language: 'English',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default configSlice.reducer;
export const { setLanguage } = configSlice.actions;
