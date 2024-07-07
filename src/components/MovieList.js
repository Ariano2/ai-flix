import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (movies === null) {
    return;
  }
  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
