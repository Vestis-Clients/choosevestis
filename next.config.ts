import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The Clearly Reformed preview moved to its own site; old links forward there.
  async redirects() {
    return [
      { source: "/clearlyreformed", destination: "https://clearlyreformed-preview.vercel.app/", permanent: true },
      { source: "/clearlyreformed/:path*", destination: "https://clearlyreformed-preview.vercel.app/:path*", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
