import type { Metadata } from "next";
import Link from "next/link";

import { WorktreeShell } from "@/components/site-shell";
import { getPublishedArticles } from "@/lib/blog/content";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/seo";

import styles from "./blog.module.css";

const articles = getPublishedArticles();

export const metadata: Metadata = articles.length > 0
  ? createPageMetadata({
    title: "Practical Notes for Business Operations Leaders",
    description: "Practical notes from Worktree on designing, launching, and operating AI workflows in business operations.",
    path: "/blog",
  })
  : createNoIndexMetadata({
    title: "Worktree Blog",
    description: "Practical notes from Worktree on designing, launching, and operating AI workflows in business operations.",
  });

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}

export default function BlogIndexPage() {
  const featured = articles.find((article) => article.featured);
  const remainingArticles = featured ? articles.filter((article) => article.slug !== featured.slug) : articles;

  return (
    <WorktreeShell>
      <section className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Worktree blog</p>
          <h1 className={styles.title}>Practical notes for business and operations leaders.</h1>
          <p className={styles.lead}>Clear thinking for teams deciding where AI can help, how a workflow should be controlled, and what it takes to keep useful work running.</p>
        </header>

        {articles.length === 0 ? (
          <section className={styles.empty} aria-labelledby="blog-empty-heading">
            <h2 id="blog-empty-heading">Notes will appear here when they are ready.</h2>
            <p>Worktree publishes considered guidance about real operating work, not a stream of generic AI updates.</p>
          </section>
        ) : (
          <>
            {featured ? <article className={styles.featured}>
              <p className={styles.featuredLabel}>Featured note</p>
              <div>
                <div className={styles.meta}><span className={styles.date}>{formatDate(featured.publishedAt)}</span>{featured.topic ? <><span className={styles.separator}>/</span><span className={styles.topic}>{featured.topic}</span></> : null}</div>
                <h2 className={styles.articleTitle}><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
                <p className={styles.summary}>{featured.summary}</p>
              </div>
            </article> : null}
            <ol className={styles.list} aria-label="Published articles">
              {remainingArticles.map((article) => <li className={styles.listItem} key={article.slug}>
                <div className={styles.meta}><span className={styles.date}>{formatDate(article.publishedAt)}</span>{article.topic ? <><span className={styles.separator}>/</span><span className={styles.topic}>{article.topic}</span></> : null}</div>
                <div><h2 className={styles.articleTitle}><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p className={styles.summary}>{article.summary}</p></div>
              </li>)}
            </ol>
          </>
        )}
      </div>
      </section>
    </WorktreeShell>
  );
}
