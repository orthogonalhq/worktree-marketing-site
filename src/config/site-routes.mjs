/** @typedef {"indexable" | "noindex" | "publication"} RouteClass */

/**
 * @typedef {{ path: string, routeClass: RouteClass, lastModified: string }} StaticRoute
 * @typedef {{ pattern: string, routeClass: "publication", lastModifiedFrom: "article metadata" }} PublicationRoute
 * @typedef {{ source: string, destination: string, permanent: true }} PermanentRedirect
 */

/** @type {{ canonicalOrigin: string, staticRoutes: readonly StaticRoute[], publicationRoutes: readonly PublicationRoute[], noindexRoutes: readonly { pattern: string, routeClass: "noindex" }[], redirects: readonly PermanentRedirect[], pendingDependencies: readonly { source: string, destination: string, reason: string }[], unknownRoutes: { expectedStatus: 404, probePath: string } }} */
export const siteRoutes = {
  canonicalOrigin: "https://worktree.agency",
  staticRoutes: [
    { path: "/", routeClass: "indexable", lastModified: "2026-08-15" },
    { path: "/services/ai-automation", routeClass: "indexable", lastModified: "2026-08-21" },
    { path: "/services/ai-implementation", routeClass: "indexable", lastModified: "2026-08-21" },
    { path: "/services/managed-ai", routeClass: "indexable", lastModified: "2026-08-21" },
    { path: "/product", routeClass: "indexable", lastModified: "2026-08-20" },
    { path: "/product/agents", routeClass: "indexable", lastModified: "2026-08-21" },
    { path: "/product/security", routeClass: "indexable", lastModified: "2026-08-21" },
    { path: "/product/compare-ai-agent-approaches", routeClass: "indexable", lastModified: "2026-08-20" },
    { path: "/use-cases", routeClass: "indexable", lastModified: "2026-07-13" },
    { path: "/about", routeClass: "indexable", lastModified: "2026-07-13" },
    { path: "/legal/privacy", routeClass: "indexable", lastModified: "2026-08-13" },
    { path: "/legal/terms", routeClass: "indexable", lastModified: "2026-07-13" },
    { path: "/legal/data-use", routeClass: "indexable", lastModified: "2026-08-13" },
    { path: "/deploy", routeClass: "indexable", lastModified: "2026-07-13" },
  ],
  publicationRoutes: [
    { pattern: "/blog", routeClass: "publication", lastModifiedFrom: "article metadata" },
    { pattern: "/blog/[slug]", routeClass: "publication", lastModifiedFrom: "article metadata" },
  ],
  noindexRoutes: [
    { pattern: "/deploy/book", routeClass: "noindex" },
    { pattern: "/deploy/thanks", routeClass: "noindex" },
    { pattern: "/partners", routeClass: "noindex" },
    { pattern: "/partners/[slug]", routeClass: "noindex" },
  ],
  redirects: [
    { source: "/book", destination: "/deploy/book", permanent: true },
    { source: "/docs", destination: "/product", permanent: true },
    { source: "/how-it-works", destination: "/services/ai-implementation", permanent: true },
    { source: "/product/managed-operations", destination: "/services/managed-ai", permanent: true },
    { source: "/resources", destination: "/use-cases", permanent: true },
    { source: "/security", destination: "/product/security", permanent: true },
    { source: "/compare-ai-agent-approaches", destination: "/product/compare-ai-agent-approaches", permanent: true },
  ],
  pendingDependencies: [],
  unknownRoutes: {
    expectedStatus: 404,
    probePath: "/__route-contract-missing__",
  },
};
