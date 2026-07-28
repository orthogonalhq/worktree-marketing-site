import { cookies } from "next/headers";
import {
  NotionPageContent,
} from "@/components/partner-portal/notion-renderer";
import {
  PartnerAccessGate,
  PortalShell,
  PortalUnavailable,
} from "@/components/partner-portal/portal-shell";
import {
  getPartnerAuthConfiguration,
  isValidPartnerSession,
  PARTNER_SESSION_COOKIE,
} from "@/lib/partner-portal/auth";
import {
  getPartnerPortalRoot,
} from "@/lib/partner-portal/notion";
import {
  getPartnerPortalBasePath,
  safePartnerPortalNext,
} from "@/lib/partner-portal/routing";

export const dynamic = "force-dynamic";

type PartnerPortalPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    next?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PartnerPortalPage({ searchParams }: PartnerPortalPageProps) {
  const [basePath, query, cookieStore] = await Promise.all([
    getPartnerPortalBasePath(),
    searchParams,
    cookies(),
  ]);
  const configuration = getPartnerAuthConfiguration();
  const sessionValue = cookieStore.get(PARTNER_SESSION_COOKIE)?.value;
  const authenticated = configuration
    ? isValidPartnerSession(sessionValue, configuration)
    : false;

  if (!authenticated) {
    const requestedNext = firstValue(query.next);
    return (
      <PartnerAccessGate
        basePath={basePath}
        error={configuration ? firstValue(query.error) : "configuration"}
        nextPath={safePartnerPortalNext(requestedNext ?? null, basePath)}
      />
    );
  }

  const document = await getPartnerPortalRoot().catch((error: unknown) => {
    console.error("partner_portal_root_load_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  });

  if (!document) return <PortalUnavailable basePath={basePath} />;

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
