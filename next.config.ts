import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/index", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
