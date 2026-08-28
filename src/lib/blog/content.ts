import "server-only";

import { getAuthor, type Author } from "@/lib/blog/authors";
import { articleRegistry, type RegisteredArticle } from "@/content/blog/registry";

import { articleMetadataSchema, type ArticleMetadata } from "./schema";
import { getBlogTag } from "./tags";

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

    for (const tagId of article.tags) {
      if (!getBlogTag(tagId)) {
        throw new Error(`Unknown blog tag \"${tagId}\" for article \"${article.slug}\".`);
      }
    }

    return { ...article, author, Component };
  });

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

export function getPublishedRelatedArticles(
  article: Pick<Article, "slug" | "tags">,
  limit = 3,
): readonly Article[] {
  const articleTags = new Set(article.tags);

  return getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      sharedTagCount: candidate.tags.filter((tag) => articleTags.has(tag)).length,
    }))
    .filter(({ sharedTagCount }) => sharedTagCount > 0)
    .sort((a, b) =>
      b.sharedTagCount - a.sharedTagCount
      || Date.parse(b.article.publishedAt) - Date.parse(a.article.publishedAt)
      || a.article.slug.localeCompare(b.article.slug),
    )
    .slice(0, limit)
    .map(({ article: relatedArticle }) => relatedArticle);
}
