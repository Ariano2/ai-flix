import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies, setMoviesError } from '../utils/movieSlice';
import { useEffect } from 'react';
import { getTopRatedMovies as fetchTopRatedMovies } from '../utils/tmdb';

const useTopRatedMovies = () => {
  // fetch data from TMDB API and update the store
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const getTopRatedMovies = async () => {
    try {
      const json = await fetchTopRatedMovies();
      dispatch(addTopRatedMovies(json.results));
    } catch (err) {
      dispatch(setMoviesError('Could not load top rated movies.'));
    }
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
    // fetch once on mount; already-fetched state guards against refetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedMovies;
