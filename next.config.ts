import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/eight-laws',
        destination: '/eight-laws-of-health',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
