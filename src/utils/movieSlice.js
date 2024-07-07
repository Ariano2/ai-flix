import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    trailerVideo: null,
    genre: null,
    moviesByGenre: [],
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
    addMoviesByGenre: (state, action) => {
      state.moviesByGenre.push(action.payload);
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
} = movieSlice.actions;
