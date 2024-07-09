import React from 'react';
import lang from '../utils/lang';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
  const currentLanguage = useSelector((store) => store.configuration.language);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[currentLanguage].gptPlaceholder}
        />
        <button className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3">
          {lang[currentLanguage].gptSearchText}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
