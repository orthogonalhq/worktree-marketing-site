import type { MetadataRoute } from "next";

import { siteRoutes } from "@/config/site-routes.mjs";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: {
      userAgent: "*",
      allow: isPreview ? undefined : "/",
      disallow: isPreview ? "/" : undefined,
    },
    sitemap: `${siteRoutes.canonicalOrigin}/sitemap.xml`,
  };
}
