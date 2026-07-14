import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId, replayCount, isMuted }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;
    // small delay so the embed's message listener is ready, especially
    // right after a replay-triggered remount
    const timeoutId = setTimeout(() => {
      iframeWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: isMuted ? 'mute' : 'unMute',
          args: [],
        }),
        '*'
      );
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [isMuted, replayCount]);

  return (
    <div className="w-screen p-0">
      <iframe
        ref={iframeRef}
        key={replayCount}
        className="w-screen aspect-video"
        src={
          'https://www.youtube.com/embed/' +
          trailerVideo?.key +
          '?autoplay=1&mute=1&enablejsapi=1'
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
