import { useEffect } from 'react';
import { options } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addGenres } from '../utils/movieSlice';

const useGenres = () => {
  const dispatch = useDispatch();
  const genre = useSelector((store) => store.movies.genre);
  const getGenreData = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      options
    );
    const json = await data.json();
    dispatch(addGenres(json));
  };
  useEffect(() => {
    !genre && getGenreData();
  }, []);
};

export default useGenres;
