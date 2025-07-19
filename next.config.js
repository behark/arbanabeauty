/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for faster development
    ignoreDuringBuilds: true,
  },
  // Enable static exports for Netlify
  output: 'export',
  // Optional: Add a trailing slash to all paths
  trailingSlash: true,
  // Optional: Change the output directory to 'out' for Netlify
  distDir: 'out',
  // Enable React Strict Mode
  reactStrictMode: true,
};

module.exports = nextConfig;
