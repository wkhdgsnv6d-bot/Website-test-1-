import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prototype: remote placeholder photography is served unoptimised so the
    // project runs without an image pipeline. Swap these for local assets in
    // /public and remove `unoptimized` for production.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
