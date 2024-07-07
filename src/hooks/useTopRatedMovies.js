import { useDispatch } from 'react-redux';
import { options } from '../utils/constants';
import { addTopRatedMovies } from '../utils/movieSlice';
import { useEffect } from 'react';

const useTopRatedMovies = () => {
  // fetch data from TMDB API and update the store
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1',
      options
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
