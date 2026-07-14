import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies, setMoviesError } from '../utils/movieSlice';
import { useEffect } from 'react';
import { getPopularMovies as fetchPopularMovies } from '../utils/tmdb';

const usePopularMovies = () => {
  // fetch data from TMDB API and update the store
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    try {
      const json = await fetchPopularMovies();
      dispatch(addPopularMovies(json.results));
    } catch (err) {
      dispatch(setMoviesError('Could not load popular movies.'));
    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
