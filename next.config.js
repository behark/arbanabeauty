/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for faster development
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
