import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // cacheComponents: true,
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
    ],
  },
};

export default nextConfig;
