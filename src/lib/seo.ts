import type { Metadata } from "next";

import { siteRoutes } from "@/config/site-routes.mjs";
import type { ArticleMetadata } from "@/lib/blog/schema";

export const siteName = "Worktree";
export const siteUrl = new URL(siteRoutes.canonicalOrigin);

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

function absoluteUrl(path: string): URL {
  return new URL(path, siteUrl);
}

export function createPageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: socialTitle } : title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      siteName,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Worktree" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}

export function createNoIndexMetadata({ title, description }: Omit<PageMetadataInput, "path">): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}

export function createArticleMetadata(article: Pick<ArticleMetadata, "slug" | "title" | "summary" | "seoTitle" | "seoDescription" | "publishedAt" | "updatedAt" | "image">): Metadata {
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.summary;
  const path = `/blog/${article.slug}`;
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;
  const images = article.image
    ? [{ url: absoluteUrl(article.image.src), alt: article.image.alt }]
    : [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Worktree" }];

  return {
    ...createPageMetadata({ title, description, path }),
    openGraph: {
      type: "article",
      url,
      title: socialTitle,
      description,
      siteName,
      images,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: article.image ? [absoluteUrl(article.image.src)] : [absoluteUrl("/twitter-image")],
    },
  };
}

export const organizationWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: siteName,
      legalName: "Orthogonal Labs Inc.",
      url: siteUrl.toString(),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: siteName,
      url: siteUrl.toString(),
      publisher: { "@id": `${siteUrl}#organization` },
    },
  ],
} as const;
