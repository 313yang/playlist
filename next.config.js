/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "i.scdn.co",
      "thisis-images.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "mosaic.scdn.co",
      "seeded-session-images.scdn.co",
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/mood",
  //       permanent: true,
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: `/api/search/:keyword/:offset`,
        destination: `https://api.spotify.com/v1/search?q=:keyword&type=playlist&limit=50&offset=:offset`,
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
        source: "/api/featured/:offset",
        destination: `https://api.spotify.com/v1/browse/featured-playlists?limit=50&offset=:offset`,
      },
      {
        source: "/api/playlist/:id/:offset",
        destination: `https://api.spotify.com/v1/playlists/:id/tracks?limit=100&offset=:offset`,
      },
      {
        source: "/api/album/:id",
        destination: `https://api.spotify.com/v1/albums/:id/`,
      },
    ];
  },
};

module.exports = nextConfig;
