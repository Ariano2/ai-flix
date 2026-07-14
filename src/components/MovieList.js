import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [movies]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (movies === null) {
    return;
  }

  return (
    <div className="px-6">
      <h1 className="text-xl md:text-3xl py-4 text-white">{title}</h1>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 md:w-12 flex items-center justify-center bg-black/50 text-white text-3xl hover:bg-black/80 transition-colors"
          >
            &#8249;
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 md:w-12 flex items-center justify-center bg-black/50 text-white text-3xl hover:bg-black/80 transition-colors"
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
