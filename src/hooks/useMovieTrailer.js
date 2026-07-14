import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo, setMoviesError } from '../utils/movieSlice';
import { getMovieVideos as fetchMovieVideos } from '../utils/tmdb';

const useMovieTrailer = (movieId) => {
  // fetch trailer video and update the store with trailer video data
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    try {
      const json = await fetchMovieVideos(movieId);
      const filterData = json.results.filter(
        (video) => video.type === 'Trailer'
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      dispatch(setMoviesError('Could not load trailer.'));
    }
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
    // fetch once on mount; already-fetched state guards against refetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMovieTrailer;
