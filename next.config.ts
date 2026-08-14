import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Use polling so dev hot reload notices edits reliably on Windows/networked
  // worktree paths where filesystem events can be missed.
  watchOptions: {
    pollIntervalMs: 500,
  },
};

export default nextConfig;
