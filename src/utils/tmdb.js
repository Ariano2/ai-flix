import { options } from './constants';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const cache = new Map(); // path -> { data, expiresAt }

const tmdbFetch = async (path) => {
  const cached = cache.get(path);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }
  const response = await fetch(`${TMDB_BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  const data = await response.json();
  cache.set(path, { data, expiresAt: Date.now() + CACHE_TTL_MS });
  return data;
};

export const getMovieDetails = (movieId) =>
  tmdbFetch(`/movie/${movieId}?language=en-US`);

export const getMovieCredits = (movieId) =>
  tmdbFetch(`/movie/${movieId}/credits?language=en-US`);

export const getMovieVideos = (movieId) =>
  tmdbFetch(`/movie/${movieId}/videos?language=en-US`);

export const searchMovie = (query) =>
  tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
  );

export const getGenres = () => tmdbFetch('/genre/movie/list?language=en');

export const getPopularMovies = () => tmdbFetch('/movie/popular?page=1');

export const getNowPlayingMovies = () =>
  tmdbFetch('/movie/now_playing?page=1');

export const getTopRatedMovies = () => tmdbFetch('/movie/top_rated?page=1');

export const getMoviesByGenre = (genreId) =>
  tmdbFetch(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
  );
