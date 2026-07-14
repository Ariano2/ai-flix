import { GROQ_WORKER_URL } from './constants';

export const getMovieRecommendations = async (searchText) => {
  const response = await fetch(GROQ_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ searchText }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data.movieNames;
};
