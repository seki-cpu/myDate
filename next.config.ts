import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isolate local verification from an already running development server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
