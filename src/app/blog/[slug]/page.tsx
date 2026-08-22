import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { WorktreeShell } from "@/components/site-shell";
import { getPublishedArticleBySlug, getPublishedArticleSlugs, getPublishedRelatedArticles } from "@/lib/blog/content";
import { createArticleMetadata, siteUrl } from "@/lib/seo";

import styles from "../blog.module.css";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getPublishedArticleBySlug((await params).slug);
  return article ? createArticleMetadata(article) : { robots: { index: false, follow: false } };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const article = getPublishedArticleBySlug((await params).slug);
  if (!article) notFound();

  const articleUrl = new URL(`/blog/${article.slug}`, siteUrl).toString();
  const author = article.author.kind === "organization"
    ? { "@type": "Organization", "@id": `${siteUrl}#organization`, name: article.author.name, url: article.author.url }
    : { "@type": "Person", "@id": `${siteUrl}#author-${article.author.id}`, name: article.author.name, url: article.author.url };
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.summary,
        datePublished: article.publishedAt,
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        mainEntityOfPage: { "@id": articleUrl },
        author,
        publisher: { "@id": `${siteUrl}#organization` },
        isPartOf: { "@id": `${siteUrl}#website` },
        ...(article.image ? { image: new URL(article.image.src, siteUrl).toString() } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl.toString() },
          { "@type": "ListItem", position: 2, name: "Blog", item: new URL("/blog", siteUrl).toString() },
          { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
        ],
      },
    ],
  };
  const relatedArticles = getPublishedRelatedArticles(article);
  const ArticleContent = article.Component;

  return (
    <WorktreeShell>
      <section className={styles.article}>
      <div className={styles.articleInner}>
        <StructuredData data={articleSchema} />
        <Link className={styles.back} href="/blog">Back to Worktree blog</Link>
        <article>
          <header className={styles.articleHeader}>
            {article.topic ? <p className={styles.eyebrow}>{article.topic}</p> : null}
            <h1 className={styles.articleTitleLarge}>{article.title}</h1>
            <p className={styles.articleSummary}>{article.summary}</p>
            <p className={styles.byline}>By {article.author.url ? <a href={article.author.url}>{article.author.name}</a> : article.author.name} <span aria-hidden="true">·</span><time dateTime={article.publishedAt}>Published {formatDate(article.publishedAt)}</time>{article.updatedAt ? <><span aria-hidden="true">·</span><time dateTime={article.updatedAt}>Updated {formatDate(article.updatedAt)}</time></> : null}</p>
          </header>
          {article.image ? <figure className={styles.heroFigure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={article.image.alt} className={styles.heroImage} src={article.image.src} />
          </figure> : null}
          <div className={styles.content}><ArticleContent /></div>
          {article.corrections?.length ? <section className={styles.noteSection} aria-labelledby="corrections-heading"><h2 id="corrections-heading">Corrections</h2><ul>{article.corrections.map((correction) => <li key={correction}>{correction}</li>)}</ul></section> : null}
          {article.sources?.length ? <section className={styles.noteSection} aria-labelledby="sources-heading"><h2 id="sources-heading">Sources and notes</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.title}</a></li>)}</ul></section> : null}
          {relatedArticles.length ? <section className={styles.related} aria-labelledby="related-heading"><h2 id="related-heading">Related reading</h2><ul className={styles.relatedList}>{relatedArticles.map((related) => <li key={related.slug}><Link href={`/blog/${related.slug}`}>{related.title}</Link><p className={styles.summary}>{related.summary}</p></li>)}</ul></section> : null}
        </article>
      </div>
      </section>
    </WorktreeShell>
  );
}
