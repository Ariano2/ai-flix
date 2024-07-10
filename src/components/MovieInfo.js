import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMG_CDN_URL, options } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMovieInfo,
  addTrailer,
  deleteMovieInfo,
} from '../utils/movieInfoSlice';

const MovieInfo = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const id = movieId;
  const movieData = useSelector((store) => store.movieInfo.movieData);
  const trailer = useSelector((store) => store.movieInfo.trailer);
  useEffect(() => {
    const fetchTrailer = async (movieId) => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      );
      const json = await data.json();
      const trailerVideos = json.results.filter(
        (trailer) => trailer.type === 'Trailer'
      );
      dispatch(addTrailer(trailerVideos[0] || json.results[0]));
    };
    const fetchData = async () => {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US',
        options
      );
      const json = await data.json();
      dispatch(addMovieInfo(json));
    };
    fetchTrailer();
    fetchData();
    return () => {
      dispatch(deleteMovieInfo());
    };
  }, []);
  if (movieData) {
    const {
      original_title,
      budget,
      revenue,
      runtime,
      vote_average,
      vote_count,
      overview,
      genres,
      status,
      poster_path,
      release_date,
    } = movieData;
    const genreData = genres.map((genre) => genre.name);
    return (
      movieData && (
        <div>
          <div className="flex flex-row items-center py-10 px-10 bg-gray-100">
            <div className="w-6/12 px-[5%]">
              <img className="h-auto" src={IMG_CDN_URL + poster_path}></img>
            </div>
            <div className=" bg-red-200 px-10 pb-10">
              <h1 className="text-4xl py-10">
                {original_title}{' '}
                <span className="text-lg">{runtime} Minutes</span>{' '}
                <span className="text-lg">({status})</span>
              </h1>
              <p className="text-lg py-4">Genres : {genreData.join(', ')}</p>
              <p className="text-md py-4">{overview}</p>
              <p className="font-semibold text-lg">
                Average Rating - {vote_average} ({vote_count} ratings)
              </p>
              <p>
                {status
                  ? 'Released On : ' + release_date
                  : 'Yet To Be Released'}
              </p>
              {/*budget/revenue is in millions of dollars*/}
              <p className="text-md">
                Budget - {(budget / 1000000).toFixed(2)} Million dollars
                <br /> Revenue - {(revenue / 1000000).toFixed(2)} Million
                dollars
              </p>
            </div>
          </div>
          <div className="bg-gray-100">
            {trailer && (
              <iframe
                className="w-9/12 aspect-video mx-auto pb-10"
                src={'https://www.youtube.com/embed/' + trailer.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )
    );
  }
};

export default MovieInfo;
