import React from 'react';
import MovieList from './MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { options } from '../utils/constants';
import { useEffect } from 'react';
import { addMoviesByGenre } from '../utils/movieSlice';

const SecondaryContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const fetchGenreMovies = async (id) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' +
        id,
      options
    );
    const json = await data.json();
    return json;
  };
  useEffect(() => {
    if (movies.genre === null || movies.moviesByGenre?.length === 19) {
      return;
    }
    const promisesArray = movies.genre.genres.map((genre) =>
      fetchGenreMovies(genre.id)
    );
    const updateStore = async () => {
      const genreMovies = await Promise.all(promisesArray);
      dispatch(addMoviesByGenre(genreMovies));
    };
    updateStore();
  }, [movies.genre]);

  return (
    <div className=" bg-black">
      <div className="relative z-20 pl-12 -mt-52">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieList title={'Popular'} movies={movies.popularMovies} />
        {movies.moviesByGenre &&
          movies.genre.genres.map((genre, index) => {
            return (
              <MovieList
                title={genre.name}
                key={genre.id}
                movies={movies.moviesByGenre[index].results}
              ></MovieList>
            );
          })}
      </div>
    </div>
  );
};

export default SecondaryContainer;
