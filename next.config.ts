import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }

    config.resolve.fallback = {
      'child_process': false,
      'fs': false,
      'readline': false,
    }

    return config
  },
}

export default nextConfig
