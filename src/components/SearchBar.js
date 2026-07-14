import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovie } from '../utils/tmdb';
import useDebounce from '../hooks/useDebounce';
import { IMG_CDN_URL } from '../utils/constants';

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 6;

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setError(null);
      return;
    }
    let cancelled = false;
    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const json = await searchMovie(trimmed);
        if (!cancelled) {
          setSuggestions(json.results.slice(0, MAX_SUGGESTIONS));
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not search movies.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (movieId) => {
    navigate('/browse/movieInfo/' + movieId);
    setIsOpen(false);
    setQuery('');
  };

  const showSuggestions = isOpen && query.trim().length >= MIN_QUERY_LENGTH;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close search' : 'Open search'}
        className="text-white text-sm md:text-base px-3 py-2 border border-gray-500 rounded-lg hover:bg-gray-800"
      >
        {isOpen ? 'Close' : 'Search'}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-20 w-48 md:w-80">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-black border border-gray-500 rounded-lg text-white p-2 outline-none"
          />

          {showSuggestions && (
            <div className="mt-2 max-h-96 overflow-y-auto bg-black border border-gray-700 rounded-lg shadow-lg">
              {isLoading && (
                <p className="text-gray-400 text-sm p-3">Searching...</p>
              )}
              {!isLoading && error && (
                <p className="text-red-500 text-sm p-3">{error}</p>
              )}
              {!isLoading && !error && suggestions.length === 0 && (
                <p className="text-gray-400 text-sm p-3">No movies found.</p>
              )}
              {!isLoading &&
                !error &&
                suggestions.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleSelect(movie.id)}
                    className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-800"
                  >
                    {movie.poster_path ? (
                      <img
                        src={IMG_CDN_URL + movie.poster_path}
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-gray-800 rounded flex-shrink-0" />
                    )}
                    <span className="text-white text-sm truncate">
                      {movie.title}
                    </span>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
