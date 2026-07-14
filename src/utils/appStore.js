import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import gptReducer from './gptSlice';
import movieInfoSliceReducer from './movieInfoSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    movieInfo: movieInfoSliceReducer,
  },
});

export default appStore;
