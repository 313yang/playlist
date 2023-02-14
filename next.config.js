/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "i.scdn.co",
      "thisis-images.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "mosaic.scdn.co",
      "seeded-session-images.scdn.co",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mood",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `/api/search/:keyword`,
        destination: `https://api.spotify.com/v1/search?q=:keyword&type=playlist&limit=50&offset=0`,
      },
      {
        source: `/api/new-releases`,
        destination: `https://api.spotify.com/v1/browse/new-releases`,
      },
      {
        source: "/api/token",
        destination: `https://accounts.spotify.com/api/token`,
      },
      {
        source: "/api/video/:query",
        destination: `https://www.youtube.com/results?search_query=:query`,
      },
      {
        source: "/api/track/:id",
        destination: `https://api.spotify.com/v1/playlists/:id/tracks?limit=100`,
      },
    ];
  },
};

module.exports = nextConfig;
