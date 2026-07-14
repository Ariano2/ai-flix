import { createSlice } from '@reduxjs/toolkit';

const movieInfoSlice = createSlice({
  name: 'movieInfo',
  initialState: {
    movieData: null,
    trailer: null,
    cast: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMovieInfo: (state, action) => {
      state.movieData = action.payload;
    },
    deleteMovieInfo: (state) => {
      state.movieData = null;
      state.trailer = null;
      state.cast = null;
      state.loading = false;
      state.error = null;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addCast: (state, action) => {
      state.cast = action.payload;
    },
    setMovieInfoLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMovieInfoError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default movieInfoSlice.reducer;
export const {
  addMovieInfo,
  deleteMovieInfo,
  addTrailer,
  addCast,
  setMovieInfoLoading,
  setMovieInfoError,
} = movieInfoSlice.actions;
