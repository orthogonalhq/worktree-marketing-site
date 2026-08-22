import "server-only";

import { getAuthor, type Author } from "@/lib/blog/authors";
import { articleRegistry, type RegisteredArticle } from "@/content/blog/registry";

import { articleMetadataSchema, type ArticleMetadata } from "./schema";

export type Article = ArticleMetadata & {
  author: Author;
  Component: RegisteredArticle["Component"];
};

function validateArticleRegistry(registry: readonly RegisteredArticle[]): readonly Article[] {
  const seenSlugs = new Set<string>();
  const articles = registry.map(({ metadata, Component }) => {
    const article = articleMetadataSchema.parse(metadata);

    if (seenSlugs.has(article.slug)) {
      throw new Error(`Duplicate blog article slug: ${article.slug}`);
    }
    seenSlugs.add(article.slug);

    const author = getAuthor(article.authorId);
    if (!author) {
      throw new Error(`Unknown author ID \"${article.authorId}\" for article \"${article.slug}\".`);
    }

    return { ...article, author, Component };
  });

  for (const article of articles) {
    for (const relatedSlug of article.relatedSlugs ?? []) {
      if (!seenSlugs.has(relatedSlug)) {
        throw new Error(`Article \"${article.slug}\" references missing related article \"${relatedSlug}\".`);
      }
    }
  }

  return articles;
}

// Validate once at module load so invalid local content fails wherever consumers build.
const allArticles = validateArticleRegistry(articleRegistry);
const articlesBySlug = new Map(allArticles.map((article) => [article.slug, article]));

function isPublished(article: Article): boolean {
  return article.status === "published";
}

export function getPublishedArticles(): readonly Article[] {
  return allArticles
    .filter(isPublished)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPublishedArticleSlugs(): readonly string[] {
  return getPublishedArticles().map((article) => article.slug);
}

export function getPublishedArticleBySlug(slug: string): Article | undefined {
  const article = articlesBySlug.get(slug);
  return article && isPublished(article) ? article : undefined;
}

export function getPublishedRelatedArticles(article: Pick<Article, "relatedSlugs">): readonly Article[] {
  return (article.relatedSlugs ?? [])
    .map((slug) => getPublishedArticleBySlug(slug))
    .filter((related): related is Article => related !== undefined);
}
