import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black rounded-lg text-white text-xl px-12 py-4 hover:bg-opacity-80">
          ▷ Play
        </button>
        <button className="mx-2 bg-gray-500 bg-opacity-50 rounded-lg text-white text-xl px-12 py-4">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
