import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NotionPageContent } from "@/components/partner-portal/notion-renderer";
import { PortalShell, PortalUnavailable } from "@/components/partner-portal/portal-shell";
import {
  getPartnerAuthConfiguration,
  isValidPartnerSession,
  PARTNER_SESSION_COOKIE,
} from "@/lib/partner-portal/auth";
import {
  getPartnerPortalDocument,
  pageIdFromSlug,
} from "@/lib/partner-portal/notion";
import { getPartnerPortalBasePath } from "@/lib/partner-portal/routing";

export const dynamic = "force-dynamic";

type PartnerPortalDocumentPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PartnerPortalDocumentPage({ params }: PartnerPortalDocumentPageProps) {
  const [{ slug }, basePath, cookieStore] = await Promise.all([
    params,
    getPartnerPortalBasePath(),
    cookies(),
  ]);
  const configuration = getPartnerAuthConfiguration();
  const sessionValue = cookieStore.get(PARTNER_SESSION_COOKIE)?.value;

  if (!configuration || !isValidPartnerSession(sessionValue, configuration)) {
    const nextPath = `${basePath}/${slug}`;
    redirect(`${basePath}?next=${encodeURIComponent(nextPath)}`);
  }

  const pageId = pageIdFromSlug(slug);
  if (!pageId) notFound();

  const document = await getPartnerPortalDocument(pageId).catch((error: unknown) => {
    console.error("partner_portal_document_load_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
      pageId,
    });
    return undefined;
  });

  if (document === undefined) return <PortalUnavailable basePath={basePath} />;
  if (document === null) notFound();

  return (
    <PortalShell
      authenticated
      basePath={basePath}
      coverUrl={document.coverUrl}
      title={document.title}
    >
      <NotionPageContent
        basePath={basePath}
        blocks={document.blocks}
        pageLinks={document.pageLinks}
      />
    </PortalShell>
  );
}
