/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
  // Enable external packages for server components
  serverExternalPackages: ['stripe'],
};

module.exports = nextConfig;
