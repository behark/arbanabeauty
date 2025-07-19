/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for faster development
    ignoreDuringBuilds: true,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Enable external packages for server components
  serverExternalPackages: ['stripe'],
};

module.exports = nextConfig;
