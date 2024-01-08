/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
