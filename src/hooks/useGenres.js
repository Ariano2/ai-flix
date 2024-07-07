import { useEffect } from 'react';
import { options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGenres } from '../utils/movieSlice';

const useGenres = () => {
  const dispatch = useDispatch();
  const getGenreData = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      options
    );
    const json = await data.json();
    dispatch(addGenres(json));
  };
  useEffect(() => {
    getGenreData();
  }, []);
};

export default useGenres;
