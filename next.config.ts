import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/t/p/**")]
  },
  allowedDevOrigins: ["fedora"]
};

export default nextConfig;


