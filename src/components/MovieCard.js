import React from 'react';
import { IMG_CDN_URL } from './../utils/constants';
import { Link } from 'react-router-dom';

const MovieCard = ({ poster_path, id }) => {
  if (!poster_path) return;
  return (
    <Link to={'/browse/movieInfo/' + id}>
      <div className="w-48">
        <img alt="Movie Card" src={IMG_CDN_URL + poster_path} />
      </div>
    </Link>
  );
};

export default MovieCard;
