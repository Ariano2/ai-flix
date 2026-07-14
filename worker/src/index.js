const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  // add your deployed Firebase Hosting URL here once you deploy, e.g.:
  // 'https://ai-flix-startup.web.app',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : null;
  return {
    ...(allowOrigin && { 'Access-Control-Allow-Origin': allowOrigin }),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request) });
    }

    if (request.method !== 'POST') {
      return jsonResponse(request, { error: 'Method not allowed' }, 405);
    }

    const { searchText } = await request.json();
    if (typeof searchText !== 'string' || !searchText.trim()) {
      return jsonResponse(request, { error: 'searchText is required' }, 400);
    }

    const prompt =
      'Act as a Movie Recommendation system and suggest some movies for the query : ' +
      searchText +
      '. Only give me names of 5 movies, comma seperated like example result given ahead. Example Result: The Godfather, The Fall Guy, Jurassic Park, The Dark Knight, Braveheart';

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
        }),
      }
    );

    if (!groqResponse.ok) {
      return jsonResponse(request, { error: 'Groq request failed' }, 502);
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return jsonResponse(request, { error: 'Groq returned no content' }, 502);
    }

    const movieNames = content.split(',').map((name) => name.trim());
    return jsonResponse(request, { movieNames });
  },
};
