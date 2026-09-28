import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The Stitch mockups hot-link every asset from Google's CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
