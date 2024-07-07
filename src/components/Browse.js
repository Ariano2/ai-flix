import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from './../hooks/useTopRatedMovies';
import useGenres from '../hooks/useGenres';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useGenres();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
        MainContainer
          -VideoBackground
          -VideoTitle
        SecondaryContainer
          - MovieList * N
          - cards * N
      */}
    </div>
  );
};

export default Browse;
