import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Static UA/RU preview site in public/clearlyreformed (pages use relative links, so send short URLs to the real file)
  async headers() {
    return [
      {
        source: "/clearlyreformed/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/clearlyreformed", destination: "/clearlyreformed/ua/index.html", permanent: false },
      { source: "/clearlyreformed/:lang(ua|ru)", destination: "/clearlyreformed/:lang/index.html", permanent: false },
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
