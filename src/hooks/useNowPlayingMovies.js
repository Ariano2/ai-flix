import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies, setMoviesError } from '../utils/movieSlice';
import { useEffect } from 'react';
import { getNowPlayingMovies as fetchNowPlayingMovies } from '../utils/tmdb';

const useNowPlayingMovies = () => {
  // fetch data from TMDB API and update the store
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    try {
      const json = await fetchNowPlayingMovies();
      dispatch(addNowPlayingMovies(json.results));
    } catch (err) {
      dispatch(setMoviesError('Could not load now playing movies.'));
    }
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
    // fetch once on mount; already-fetched state guards against refetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
