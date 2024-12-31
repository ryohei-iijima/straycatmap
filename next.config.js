module.exports = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
      },
    ],
    unoptimized: true,
  },
  trailingSlash: true,
}