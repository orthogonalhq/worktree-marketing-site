import type { ReactNode } from "react";
import Link from "next/link";
import styles from "@/app/partners/portal.module.css";
import {
  notionBlockData,
  pageIdFromNotionHref,
  pageSlug,
  type NotionRichText,
  type PortalBlock,
  type PortalPageLink,
} from "@/lib/partner-portal/notion";

type RendererContext = {
  basePath: string;
  pageLinks: PortalPageLink[];
};

type RichTextBlockData = {
  color?: string;
  is_toggleable?: boolean;
  rich_text?: NotionRichText[];
};

function localPageHref(page: PortalPageLink, basePath: string) {
  return `${basePath}/${pageSlug(page.title, page.id)}`;
}

function resolveHref(href: string, context: RendererContext) {
  const pageId = pageIdFromNotionHref(href);
  const page = pageId ? context.pageLinks.find((candidate) => candidate.id === pageId) : undefined;

  return page ? localPageHref(page, context.basePath) : href;
}

function annotatedText(item: NotionRichText, key: string) {
  let node: ReactNode = item.type === "equation" ? item.equation?.expression ?? item.plain_text : item.plain_text;

  if (item.annotations.code) node = <code key={`${key}-code`}>{node}</code>;
  if (item.annotations.bold) node = <strong key={`${key}-bold`}>{node}</strong>;
  if (item.annotations.italic) node = <em key={`${key}-italic`}>{node}</em>;
  if (item.annotations.strikethrough) node = <s key={`${key}-strike`}>{node}</s>;
  if (item.annotations.underline) node = <u key={`${key}-underline`}>{node}</u>;
  if (item.annotations.color !== "default") {
    node = <span key={`${key}-color`} data-notion-color={item.annotations.color}>{node}</span>;
  }

  return node;
}

function RichText({
  context,
  items = [],
}: {
  context: RendererContext;
  items?: NotionRichText[];
}) {
  return (
    <>
      {items.map((item, index) => {
        const key = `${index}-${item.plain_text}`;
        const node = annotatedText(item, key);

        if (!item.href) return <span key={key}>{node}</span>;

        const href = resolveHref(item.href, context);
        if (href.startsWith("/")) return <Link key={key} href={href}>{node}</Link>;

        return (
          <a key={key} href={href} target="_blank" rel="noreferrer">
            {node}
          </a>
        );
      })}
    </>
  );
}

function plainText(items: NotionRichText[] | undefined) {
  return items?.map((item) => item.plain_text).join("") ?? "";
}

function isDescriptionParagraph(block: PortalBlock | undefined) {
  if (!block || block.type !== "paragraph") return false;
  const data = notionBlockData<RichTextBlockData>(block);
  return Boolean(plainText(data.rich_text).trim()) && data.color === "gray";
}

function PageCard({
  block,
  context,
  description,
}: {
  block: PortalBlock;
  context: RendererContext;
  description?: PortalBlock;
}) {
  const data = notionBlockData<{ title?: string }>(block);
  const page = context.pageLinks.find((candidate) => candidate.id === block.id);
  const title = page?.title ?? data.title ?? "Untitled page";
  const href = page ? localPageHref(page, context.basePath) : context.basePath || "/";
  const descriptionData = description ? notionBlockData<RichTextBlockData>(description) : undefined;

  return (
    <Link className={styles.pageCard} href={href}>
      <span className={styles.pageCardTitle}>{title}</span>
      {descriptionData?.rich_text ? (
        <span className={styles.pageCardDescription}>
          <RichText context={context} items={descriptionData.rich_text} />
        </span>
      ) : null}
      <span className={styles.pageCardArrow} aria-hidden="true">→</span>
    </Link>
  );
}

function ListGroup({
  blocks,
  context,
  ordered,
}: {
  blocks: PortalBlock[];
  context: RendererContext;
  ordered: boolean;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <List className={styles.list}>
      {blocks.map((block) => {
        const data = notionBlockData<RichTextBlockData>(block);
        return (
          <li key={block.id} data-notion-color={data.color ?? "default"}>
            <RichText context={context} items={data.rich_text} />
            {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
          </li>
        );
      })}
    </List>
  );
}

function TableBlock({ block, context }: { block: PortalBlock; context: RendererContext }) {
  const data = notionBlockData<{ has_column_header?: boolean; has_row_header?: boolean }>(block);
  const rows = block.children?.filter((child) => child.type === "table_row") ?? [];

  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowData = notionBlockData<{ cells?: NotionRichText[][] }>(row);
            return (
              <tr key={row.id}>
                {(rowData.cells ?? []).map((cell, columnIndex) => {
                  const HeaderCell = (data.has_column_header && rowIndex === 0) ||
                    (data.has_row_header && columnIndex === 0) ? "th" : "td";
                  return (
                    <HeaderCell key={`${row.id}-${columnIndex}`}>
                      <RichText context={context} items={cell} />
                    </HeaderCell>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function HeadingBlock({
  block,
  context,
}: {
  block: PortalBlock;
  context: RendererContext;
}) {
  const data = notionBlockData<RichTextBlockData>(block);
  const Heading = block.type === "heading_1" ? "h2" : block.type === "heading_2" ? "h3" : "h4";
  const heading = <Heading data-notion-color={data.color ?? "default"}>
    <RichText context={context} items={data.rich_text} />
  </Heading>;

  if (!data.is_toggleable) return heading;

  return (
    <details className={styles.toggle}>
      <summary>{heading}</summary>
      {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
    </details>
  );
}

function mediaUrl(block: PortalBlock) {
  const data = notionBlockData<{
    external?: { url?: string };
    file?: { url?: string };
  }>(block);
  return data.external?.url ?? data.file?.url ?? null;
}

function Block({ block, context }: { block: PortalBlock; context: RendererContext }) {
  const data = notionBlockData<RichTextBlockData>(block);

  switch (block.type) {
    case "paragraph":
      if (!plainText(data.rich_text).trim() && !block.children?.length) return null;
      return (
        <div className={styles.paragraph} data-notion-color={data.color ?? "default"}>
          <RichText context={context} items={data.rich_text} />
          {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
        </div>
      );
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "heading_4":
      return <HeadingBlock block={block} context={context} />;
    case "quote":
      return (
        <blockquote data-notion-color={data.color ?? "default"}>
          <RichText context={context} items={data.rich_text} />
          {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
        </blockquote>
      );
    case "callout": {
      const callout = notionBlockData<
        RichTextBlockData & {
          icon?: { emoji?: string; type?: string };
        }
      >(block);
      return (
        <aside className={styles.callout} data-notion-color={callout.color ?? "default"}>
          <span className={styles.calloutIcon} aria-hidden="true">
            {callout.icon?.type === "emoji" ? callout.icon.emoji : "•"}
          </span>
          <div>
            <RichText context={context} items={callout.rich_text} />
            {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
          </div>
        </aside>
      );
    }
    case "divider":
      return <hr />;
    case "to_do": {
      const todo = notionBlockData<RichTextBlockData & { checked?: boolean }>(block);
      return (
        <div className={styles.todo}>
          <input type="checkbox" checked={Boolean(todo.checked)} readOnly aria-label="Task status" />
          <span><RichText context={context} items={todo.rich_text} /></span>
        </div>
      );
    }
    case "toggle":
      return (
        <details className={styles.toggle}>
          <summary><RichText context={context} items={data.rich_text} /></summary>
          {block.children?.length ? <Blocks blocks={block.children} context={context} /> : null}
        </details>
      );
    case "table":
      return <TableBlock block={block} context={context} />;
    case "child_page":
      return <PageCard block={block} context={context} />;
    case "image": {
      const url = mediaUrl(block);
      const imageData = notionBlockData<{ caption?: NotionRichText[] }>(block);
      if (!url) return null;
      return (
        <figure className={styles.figure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={plainText(imageData.caption)} />
          {imageData.caption?.length ? (
            <figcaption><RichText context={context} items={imageData.caption} /></figcaption>
          ) : null}
        </figure>
      );
    }
    case "code": {
      const code = notionBlockData<RichTextBlockData & { language?: string }>(block);
      return (
        <pre className={styles.code}><code data-language={code.language ?? "plain text"}>
          {plainText(code.rich_text)}
        </code></pre>
      );
    }
    case "equation": {
      const equation = notionBlockData<{ expression?: string }>(block);
      return <div className={styles.equation}>{equation.expression}</div>;
    }
    case "column_list":
      return (
        <div className={styles.columns}>
          {block.children?.map((column) => (
            <div key={column.id} className={styles.column}>
              <Blocks blocks={column.children ?? []} context={context} />
            </div>
          ))}
        </div>
      );
    case "synced_block":
      return block.children?.length ? <Blocks blocks={block.children} context={context} /> : null;
    case "bookmark":
    case "embed":
    case "link_preview": {
      const linkData = notionBlockData<{ caption?: NotionRichText[]; url?: string }>(block);
      if (!linkData.url) return null;
      return (
        <a className={styles.bookmark} href={linkData.url} target="_blank" rel="noreferrer">
          <span>{plainText(linkData.caption) || linkData.url}</span>
          <span aria-hidden="true">↗</span>
        </a>
      );
    }
    case "file":
    case "pdf":
    case "video":
    case "audio": {
      const url = mediaUrl(block);
      const fileData = notionBlockData<{ caption?: NotionRichText[] }>(block);
      if (!url) return null;
      return (
        <a className={styles.bookmark} href={url} target="_blank" rel="noreferrer">
          <span>{plainText(fileData.caption) || `Open ${block.type}`}</span>
          <span aria-hidden="true">↗</span>
        </a>
      );
    }
    default:
      return block.children?.length ? <Blocks blocks={block.children} context={context} /> : null;
  }
}

function Blocks({ blocks, context }: { blocks: PortalBlock[]; context: RendererContext }) {
  const rendered: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const type = block.type;
      const group: PortalBlock[] = [];
      while (index < blocks.length && blocks[index].type === type) {
        group.push(blocks[index]);
        index += 1;
      }
      index -= 1;
      rendered.push(
        <ListGroup
          key={`list-${group[0].id}`}
          blocks={group}
          context={context}
          ordered={type === "numbered_list_item"}
        />,
      );
      continue;
    }

    if (block.type === "child_page" && isDescriptionParagraph(blocks[index + 1])) {
      rendered.push(
        <PageCard
          key={block.id}
          block={block}
          context={context}
          description={blocks[index + 1]}
        />,
      );
      index += 1;
      continue;
    }

    rendered.push(<Block key={block.id} block={block} context={context} />);
  }

  return <>{rendered}</>;
}

export function NotionPageContent({
  basePath,
  blocks,
  pageLinks,
}: {
  basePath: string;
  blocks: PortalBlock[];
  pageLinks: PortalPageLink[];
}) {
  return (
    <article className={styles.article}>
      <Blocks blocks={blocks} context={{ basePath, pageLinks }} />
    </article>
  );
}
