import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGenres, setMoviesError } from '../utils/movieSlice';
import { getGenres } from '../utils/tmdb';

const useGenres = () => {
  const dispatch = useDispatch();
  const genre = useSelector((store) => store.movies.genre);
  const getGenreData = async () => {
    try {
      const json = await getGenres();
      dispatch(addGenres(json));
    } catch (err) {
      dispatch(setMoviesError('Could not load genres.'));
    }
  };
  useEffect(() => {
    !genre && getGenreData();
    // fetch once on mount; already-fetched state guards against refetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useGenres;
