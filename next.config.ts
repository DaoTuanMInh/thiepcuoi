import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/',
        permanent: false,
      },
      {
        source: '/i/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
