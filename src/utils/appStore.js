import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import gptReducer from './gptSlice';
import configurationReducer from './configSlice';
import movieInfoSliceReducer from './movieInfoSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    configuration: configurationReducer,
    movieInfo: movieInfoSliceReducer,
  },
});

export default appStore;
