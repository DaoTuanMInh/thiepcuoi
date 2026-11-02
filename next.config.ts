import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    unoptimized: true,
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
      {
        source: '/nhatrai',
        destination: '/nha-trai',
        permanent: false,
      },
      {
        source: '/trai',
        destination: '/nha-trai',
        permanent: false,
      },
      {
        source: '/nhagai',
        destination: '/nha-gai',
        permanent: false,
      },
      {
        source: '/gai',
        destination: '/nha-gai',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
