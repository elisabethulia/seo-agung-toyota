import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace with your image domain
        port: '',
        pathname: '/**', // Allows all paths on this domain
      },
    ],
  },
};

export default nextConfig;