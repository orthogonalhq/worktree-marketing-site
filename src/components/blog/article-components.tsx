import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./article-content.module.css";

function ExternalLink({ href, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");

  return <a {...props} className={styles.link} href={href} rel={isExternal ? "noreferrer" : undefined} target={isExternal ? "_blank" : undefined} />;
}

function Figure({ children, ...props }: ComponentPropsWithoutRef<"figure">) {
  return <figure {...props} className={styles.figure}>{children}</figure>;
}

function Image({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} className={styles.image} loading="lazy" />;
}

export function Callout({ children, title = "Note" }: { children: React.ReactNode; title?: string }) {
  return <aside className={styles.callout}><strong>{title}</strong><div>{children}</div></aside>;
}

export function Citation({ children }: { children: React.ReactNode }) {
  return <span className={styles.citation}>{children}</span>;
}

export function DataTable({ children }: { children: ReactNode }) {
  return <div className={styles.tableWrap}><table className={styles.table}>{children}</table></div>;
}

export const articleComponents = {
  a: ExternalLink,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote {...props} className={styles.quote} />,
  code: (props: ComponentPropsWithoutRef<"code">) => <code {...props} className={styles.code} />,
  figcaption: (props: ComponentPropsWithoutRef<"figcaption">) => <figcaption {...props} className={styles.caption} />,
  figure: Figure,
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h2 {...props} className={styles.headingTwo} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} className={styles.headingTwo} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} className={styles.headingThree} />,
  img: Image,
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} className={styles.listItem} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} className={styles.list} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} className={styles.paragraph} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre {...props} className={styles.pre} />,
  table: (props: ComponentPropsWithoutRef<"table">) => <div className={styles.tableWrap}><table {...props} className={styles.table} /></div>,
  td: (props: ComponentPropsWithoutRef<"td">) => <td {...props} className={styles.cell} />,
  th: (props: ComponentPropsWithoutRef<"th">) => <th {...props} className={styles.headerCell} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} className={styles.list} />,
  Callout,
  Citation,
  DataTable,
};
