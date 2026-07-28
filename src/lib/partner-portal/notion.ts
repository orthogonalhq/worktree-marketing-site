import "server-only";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_API_VERSION = "2026-03-11";
const DEFAULT_PORTAL_PAGE_ID = "3aad5a4c-f68c-81d7-ba48-e8f763836b7e";
const MAX_BLOCKS_PER_LEVEL = 1_000;
const MAX_BLOCK_DEPTH = 8;

export type NotionRichText = {
  annotations: {
    bold: boolean;
    code: boolean;
    color: string;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
  equation?: { expression: string };
  href: string | null;
  plain_text: string;
  type: string;
};

export type PortalBlock = {
  children?: PortalBlock[];
  has_children: boolean;
  id: string;
  type: string;
  [key: string]: unknown;
};

export type PortalPageLink = {
  id: string;
  title: string;
};

export type PortalDocument = {
  blocks: PortalBlock[];
  coverUrl: string | null;
  id: string;
  pageLinks: PortalPageLink[];
  title: string;
};

type NotionListResponse = {
  has_more: boolean;
  next_cursor: string | null;
  results: PortalBlock[];
};

type NotionPageResponse = {
  cover?: {
    external?: { url?: string };
    file?: { url?: string };
  } | null;
  id: string;
  properties: Record<
    string,
    {
      title?: NotionRichText[];
      type?: string;
    }
  >;
};

export class PartnerPortalConfigurationError extends Error {}
export class PartnerPortalNotionError extends Error {}

function normalizePageId(value: string) {
  const hex = value.replace(/[^0-9a-f]/gi, "").toLowerCase();
  if (hex.length !== 32) throw new PartnerPortalNotionError("Invalid Notion page identifier");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function compactPageId(value: string) {
  return normalizePageId(value).replaceAll("-", "");
}

export function pageSlug(title: string, pageId: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  return `${slug || "page"}-${compactPageId(pageId)}`;
}

export function pageIdFromSlug(slug: string) {
  const match = slug.match(/([0-9a-f]{32})$/i);
  return match ? normalizePageId(match[1]) : null;
}

function portalPageId() {
  return normalizePageId(process.env.NOTION_PARTNER_PORTAL_PAGE_ID ?? DEFAULT_PORTAL_PAGE_ID);
}

function notionToken() {
  const token = process.env.NOTION_PARTNER_PORTAL_TOKEN;
  if (!token) throw new PartnerPortalConfigurationError("Notion partner portal is not configured");
  return token;
}

async function notionRequest<T>(path: string, attempt = 0): Promise<T> {
  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${notionToken()}`,
      "Notion-Version": NOTION_API_VERSION,
    },
    next: { revalidate: 300 },
  });

  if (response.status === 429 && attempt < 3) {
    const retryAfterSeconds = Number(response.headers.get("retry-after") ?? 1);
    await new Promise((resolve) => setTimeout(resolve, Math.min(Math.max(retryAfterSeconds, 1), 5) * 1_000));
    return notionRequest<T>(path, attempt + 1);
  }

  if (!response.ok) {
    throw new PartnerPortalNotionError(`Notion request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function retrieveBlockChildren(blockId: string, depth = 0): Promise<PortalBlock[]> {
  if (depth > MAX_BLOCK_DEPTH) {
    throw new PartnerPortalNotionError("Notion content exceeds the supported nesting depth");
  }

  const blocks: PortalBlock[] = [];
  let cursor: string | null = null;

  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (cursor) query.set("start_cursor", cursor);

    const response = await notionRequest<NotionListResponse>(
      `/blocks/${encodeURIComponent(blockId)}/children?${query.toString()}`,
    );
    blocks.push(...response.results);

    if (blocks.length > MAX_BLOCKS_PER_LEVEL) {
      throw new PartnerPortalNotionError("Notion content exceeds the supported page size");
    }

    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);

  const hydrated: PortalBlock[] = [];
  for (const block of blocks) {
    if (block.has_children && block.type !== "child_page" && block.type !== "child_database") {
      hydrated.push({
        ...block,
        children: await retrieveBlockChildren(block.id, depth + 1),
      });
    } else {
      hydrated.push(block);
    }
  }

  return hydrated;
}

function richTextPlainText(items: NotionRichText[] | undefined) {
  return items?.map((item) => item.plain_text).join("") ?? "";
}

async function retrievePage(pageId: string) {
  const page = await notionRequest<NotionPageResponse>(`/pages/${encodeURIComponent(pageId)}`);
  const titleProperty = Object.values(page.properties).find((property) => property.type === "title");

  return {
    coverUrl: page.cover?.external?.url ?? page.cover?.file?.url ?? null,
    id: normalizePageId(page.id),
    title: richTextPlainText(titleProperty?.title) || "Worktree Partner Portal",
  };
}

function collectPageLinks(blocks: PortalBlock[], links: PortalPageLink[] = []) {
  for (const block of blocks) {
    if (block.type === "child_page") {
      const childPage = block.child_page as { title?: string } | undefined;
      links.push({
        id: normalizePageId(block.id),
        title: childPage?.title?.trim() || "Untitled page",
      });
    }

    if (block.children) collectPageLinks(block.children, links);
  }

  return links;
}

export async function getPartnerPortalRoot(): Promise<PortalDocument> {
  const id = portalPageId();
  const [page, blocks] = await Promise.all([retrievePage(id), retrieveBlockChildren(id)]);

  return {
    ...page,
    blocks,
    pageLinks: collectPageLinks(blocks),
  };
}

export async function getPartnerPortalDocument(requestedPageId: string): Promise<PortalDocument | null> {
  const root = await getPartnerPortalRoot();
  const normalizedRequestedId = normalizePageId(requestedPageId);
  const requestedLink = root.pageLinks.find((page) => page.id === normalizedRequestedId);

  if (!requestedLink) return null;

  const [page, blocks] = await Promise.all([
    retrievePage(normalizedRequestedId),
    retrieveBlockChildren(normalizedRequestedId),
  ]);

  return {
    ...page,
    blocks,
    pageLinks: root.pageLinks,
  };
}

export function notionBlockData<T>(block: PortalBlock) {
  return (block[block.type] ?? {}) as T;
}

export function pageIdFromNotionHref(href: string) {
  const match = href.match(
    /([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}|[0-9a-f]{32})(?:[/?#]|$)/i,
  );
  return match ? normalizePageId(match[1]) : null;
}
