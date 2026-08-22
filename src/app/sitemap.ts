import type { MetadataRoute } from "next";

import { siteRoutes } from "@/config/site-routes.mjs";
import { getPublishedArticles } from "@/lib/blog/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = siteRoutes.staticRoutes.map(({ path, lastModified }) => ({
    url: new URL(path, siteRoutes.canonicalOrigin).toString(),
    lastModified,
  }));
  const articles = getPublishedArticles();

  if (articles.length === 0) {
    return staticEntries;
  }

  const latestArticleDate = articles.reduce(
    (latest, article) => Date.parse(article.updatedAt ?? article.publishedAt) > Date.parse(latest) ? article.updatedAt ?? article.publishedAt : latest,
    articles[0].updatedAt ?? articles[0].publishedAt,
  );

  return [
    ...staticEntries,
    { url: new URL("/blog", siteRoutes.canonicalOrigin).toString(), lastModified: latestArticleDate },
    ...articles.map((article) => ({
      url: new URL(`/blog/${article.slug}`, siteRoutes.canonicalOrigin).toString(),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ];
}
