import React, { useRef } from 'react';
import lang from '../utils/lang';
import { useDispatch, useSelector } from 'react-redux';
import { openai } from '../utils/openai';
import { options } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  // search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      options
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    // make call to open ai api and get the movie results
    const gptQuery =
      'Act as a Movie Recommendation system and suggest some movies for the query : ' +
      searchText.current.value +
      '. Only give me names of 5 movies, comma seperated like example result given ahead. Example Result: The Godfater,The Fall Guy, Jurrasic Park, The Dark Knight, Braveheart';
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if (!gptResults.choices) {
      // error handling
    }
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(', ');
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  const currentLanguage = useSelector((store) => store.configuration.language);
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" bg-black w-1/2 grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[currentLanguage].gptPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          {lang[currentLanguage].gptSearchText}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
