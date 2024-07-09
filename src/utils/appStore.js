import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import gptReducer from './gptSlice';
import configurationReducer from './configSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    configuration: configurationReducer,
  },
});

export default appStore;
