/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;