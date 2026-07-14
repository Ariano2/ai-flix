import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const VideoTitle = ({ title, overview, onReplay, isMuted, onToggleMute }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const isTrailerPlaying = Boolean(trailerVideo);

  const buttonOpacity = isTrailerPlaying
    ? 'bg-opacity-50 hover:bg-opacity-90'
    : 'bg-opacity-100';

  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      {showMoreInfo && (
        <p className="py-4 md:py-6 text-sm md:text-lg w-full md:w-1/4">
          {overview}
        </p>
      )}
      <div className="my-4 md:m-0 pointer-events-auto flex flex-wrap items-center gap-2">
        <button
          onClick={onReplay}
          className={`bg-white text-black rounded-lg text-sm md:text-xl px-3 md:px-12 py-1 md:py-4 transition-opacity ${buttonOpacity}`}
        >
          &#9655; Play
        </button>
        <button
          onClick={() => setShowMoreInfo((show) => !show)}
          className={`bg-gray-500 rounded-lg text-white text-sm md:text-xl px-3 md:px-8 py-1 md:py-4 transition-opacity ${buttonOpacity}`}
        >
          {showMoreInfo ? 'Hide Info' : 'ⓘ More Info'}
        </button>
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute trailer' : 'Mute trailer'}
          className={`bg-gray-500 rounded-lg text-white text-sm md:text-xl px-3 md:px-4 py-1 md:py-4 transition-opacity ${buttonOpacity}`}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
