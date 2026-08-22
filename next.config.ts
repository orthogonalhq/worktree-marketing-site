import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { siteRoutes } from "./src/config/site-routes.mjs";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  transpilePackages: ["three"],
  // Use polling so dev hot reload notices edits reliably on Windows/networked
  // worktree paths where filesystem events can be missed.
  watchOptions: {
    pollIntervalMs: 500,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [...siteRoutes.redirects];
  },
  async headers() {
    if (process.env.VERCEL_ENV !== "preview") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
