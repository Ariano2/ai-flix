import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { posterBG } from '../utils/constants';

const Gpt = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={posterBG} alt="movie posters background" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default Gpt;
