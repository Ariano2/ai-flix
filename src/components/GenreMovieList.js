import React from 'react';
import useGenreMovies from '../hooks/useGenreMovies';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GenreMovieList = ({ id, title, index }) => {
  useGenreMovies(id);
  const movies = useSelector((store) => store.movies.moviesByGenre);
  // console.log(movies[index]?.results);
  if (movies.length === 0) {
    return;
  }
  return (
    <div>
      {movies[index]?.results && (
        <MovieList title={title} movies={movies[index]?.results} />
      )}
    </div>
  );
};

export default GenreMovieList;
