import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieRecommendations } from '../utils/movieRecommender';
import { searchMovie } from '../utils/tmdb';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const json = await searchMovie(movie);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    setErrorMessage(null);
    try {
      const gptMovies = await getMovieRecommendations(searchText.current.value);
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      setErrorMessage(
        'Could not get recommendations right now. Please try again.'
      );
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" bg-black w-full text-sm md:text-lg md:w-1/2 grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today?"
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          Search
        </button>
      </form>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    </div>
  );
};

export default GptSearchBar;
