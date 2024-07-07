import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import GenreMovieList from './GenreMovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (movies.genre === null) {
    return;
  }
  return (
    <div className=" bg-black">
      <div className="relative z-20 pl-12 -mt-52">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieList title={'Popular'} movies={movies.popularMovies} />
        {movies.genre.genres.map((genre, index) => {
          return (
            <GenreMovieList
              key={genre.id}
              id={genre.id}
              title={genre.name}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SecondaryContainer;
