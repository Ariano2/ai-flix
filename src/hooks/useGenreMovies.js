import { useEffect } from 'react';
import { options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMoviesByGenre } from '../utils/movieSlice';
const useGenreMovies = (id) => {
  const dispatch = useDispatch();
  const getMovieList = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' +
        id,
      options
    );
    const json = await data.json();
    return json;
    // dispatch(addMoviesByGenre(json));
  };
  useEffect(() => {
    getMovieList();
  }, []);
};

export default useGenreMovies;
