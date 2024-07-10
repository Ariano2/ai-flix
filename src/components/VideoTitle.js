import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black rounded-lg text-xl px-3 md:px-12 py-1 md:py-4 hover:bg-opacity-80">
          ▷ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 bg-opacity-50 rounded-lg text-white text-xl px-8 py-4">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
