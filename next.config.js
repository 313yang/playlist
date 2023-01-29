/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "i.scdn.co",
      "thisis-images.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "mosaic.scdn.co",
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
        source: "/api/token",
        destination: `https://accounts.spotify.com/api/token`,
      },
    ];
  },
};

module.exports = nextConfig;
