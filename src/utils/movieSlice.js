import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    trailerVideo: null,
    genre: null,
    moviesByGenre: null,
    error: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addGenres: (state, action) => {
      state.genre = action.payload;
    },
    // payload is a { [genreId]: movies[] } dictionary, not a positional array
    addMoviesByGenre: (state, action) => {
      state.moviesByGenre = action.payload;
    },
    setMoviesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addTrailerVideo,
  addGenres,
  addMoviesByGenre,
  setMoviesError,
} = movieSlice.actions;
