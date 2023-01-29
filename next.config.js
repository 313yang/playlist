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
};

module.exports = nextConfig;
