import React from 'react';
import MovieList from './MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addMoviesByGenre } from '../utils/movieSlice';
import { getMoviesByGenre } from '../utils/tmdb';

const SecondaryContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const fetchGenreMovies = async (id) => {
    try {
      const json = await getMoviesByGenre(id);
      return { genreId: id, results: json.results };
    } catch (err) {
      return { genreId: id, results: [] };
    }
  };
  useEffect(() => {
    if (movies.genre === null || movies.moviesByGenre !== null) {
      return;
    }
    const promisesArray = movies.genre.genres.map((genre) =>
      fetchGenreMovies(genre.id)
    );
    const updateStore = async () => {
      const genreResults = await Promise.all(promisesArray);
      const moviesByGenre = {};
      genreResults.forEach(({ genreId, results }) => {
        moviesByGenre[genreId] = results;
      });
      dispatch(addMoviesByGenre(moviesByGenre));
    };
    updateStore();
  }, [movies.genre, movies.moviesByGenre, dispatch]);

  return (
    <div className=" bg-black">
      <div className="relative z-20 pl-4 md:pl-12 mt-0 md:-mt-52">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieList title={'Popular'} movies={movies.popularMovies} />
        {movies.moviesByGenre &&
          movies.genre.genres.map((genre) => {
            return (
              <MovieList
                title={genre.name}
                key={genre.id}
                movies={movies.moviesByGenre[genre.id]}
              ></MovieList>
            );
          })}
      </div>
    </div>
  );
};

export default SecondaryContainer;
