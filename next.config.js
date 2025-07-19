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
  // Add trailing slash for Netlify compatibility
  trailingSlash: true,
  // Configure images
  images: {
    domains: ['localhost', 'arbanabeauty.netlify.app', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
