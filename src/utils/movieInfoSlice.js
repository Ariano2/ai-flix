import { createSlice } from '@reduxjs/toolkit';

const movieInfoSlice = createSlice({
  name: 'movieInfo',
  initialState: {
    movieData: null,
    trailer: null,
  },
  reducers: {
    addMovieInfo: (state, action) => {
      state.movieData = action.payload;
    },
    deleteMovieInfo: (state) => {
      state.movieData = null;
      state.trailer = null;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export default movieInfoSlice.reducer;
export const { addMovieInfo, deleteMovieInfo, addTrailer } =
  movieInfoSlice.actions;
