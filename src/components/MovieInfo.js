import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BACKDROP_CDN_URL, IMG_CDN_URL, PROFILE_CDN_URL } from '../utils/constants';
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../utils/tmdb';
import {
  addMovieInfo,
  addTrailer,
  addCast,
  deleteMovieInfo,
  setMovieInfoLoading,
  setMovieInfoError,
} from '../utils/movieInfoSlice';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const MovieInfo = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movieData = useSelector((store) => store.movieInfo.movieData);
  const trailer = useSelector((store) => store.movieInfo.trailer);
  const cast = useSelector((store) => store.movieInfo.cast);
  const loading = useSelector((store) => store.movieInfo.loading);
  const error = useSelector((store) => store.movieInfo.error);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      dispatch(setMovieInfoLoading(true));
      dispatch(setMovieInfoError(null));
      try {
        const [details, credits, videos] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ]);
        dispatch(addMovieInfo(details));
        dispatch(addCast(credits.cast || []));
        const trailerVideos = videos.results.filter(
          (video) => video.type === 'Trailer'
        );
        dispatch(addTrailer(trailerVideos[0] || videos.results[0] || null));
      } catch (err) {
        dispatch(
          setMovieInfoError('Could not load movie details. Please try again.')
        );
      } finally {
        dispatch(setMovieInfoLoading(false));
      }
    };
    fetchMovieInfo();
    return () => {
      dispatch(deleteMovieInfo());
    };
  }, [movieId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!movieData) {
    return null;
  }

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
    backdrop_path,
    release_date,
  } = movieData;

  const genreNames = genres?.length
    ? genres.map((genre) => genre.name).join(', ')
    : 'Not available';
  const formattedRating =
    typeof vote_average === 'number' && vote_average > 0
      ? `${vote_average.toFixed(1)} (${vote_count} ratings)`
      : 'Not available';
  const formattedReleaseDate = release_date
    ? new Date(release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not available';
  const formattedBudget = budget
    ? `$${(budget / 1_000_000).toFixed(2)} Million`
    : 'Not available';
  const formattedRevenue = revenue
    ? `$${(revenue / 1_000_000).toFixed(2)} Million`
    : 'Not available';

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative w-full aspect-video md:aspect-[21/9]">
        {backdrop_path && (
          <img
            className="w-full h-full object-cover"
            src={BACKDROP_CDN_URL + backdrop_path}
            alt={original_title}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8 p-4 md:p-12">
          {poster_path && (
            <img
              className="hidden md:block w-40 lg:w-52 rounded-lg shadow-2xl -mb-16 lg:-mb-20 border border-gray-800"
              src={IMG_CDN_URL + poster_path}
              alt={original_title}
            />
          )}
          <div>
            <h1 className="text-2xl md:text-5xl font-bold drop-shadow-lg">
              {original_title}
            </h1>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-sm md:text-base text-gray-300">
              {runtime > 0 && <span>{runtime} Minutes</span>}
              <span>{genreNames}</span>
              <span>
                {status === 'Released'
                  ? formattedReleaseDate
                  : 'Yet to be released'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 pt-6 md:pt-10 pb-10 md:pl-[calc(10rem+4rem)] lg:pl-[calc(13rem+4rem)]">
        <p className="font-semibold text-gray-200">
          Rating: <span className="text-white">{formattedRating}</span>
        </p>
        <p className="mt-4 text-gray-300 max-w-3xl leading-relaxed">
          {overview || 'No overview available.'}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-gray-400">
          <p>
            Budget: <span className="text-gray-200">{formattedBudget}</span>
          </p>
          <p>
            Revenue: <span className="text-gray-200">{formattedRevenue}</span>
          </p>
        </div>
      </div>

      {cast && cast.length > 0 && (
        <div className="px-4 md:px-12 pb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {cast.slice(0, 12).map((member) => (
              <div key={member.id} className="flex-shrink-0 w-24 text-center">
                {member.profile_path ? (
                  <img
                    className="w-24 h-24 rounded-full object-cover mx-auto border border-gray-700"
                    src={PROFILE_CDN_URL + member.profile_path}
                    alt={member.name}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto border border-gray-700">
                    <span className="text-lg text-gray-400">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                <p className="mt-2 text-sm font-medium truncate">
                  {member.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {member.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {trailer && (
        <div className="px-4 md:px-12 pb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Trailer</h2>
          <iframe
            className="w-full md:w-10/12 aspect-video mx-auto"
            src={'https://www.youtube.com/embed/' + trailer.key}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
