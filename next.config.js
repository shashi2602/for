/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdn.jsdelivr.net",
      "raw.githubusercontent.com",
      "avatars.githubusercontent.com",
      "www.google.com",
    ],
  },
};

module.exports = nextConfig;
