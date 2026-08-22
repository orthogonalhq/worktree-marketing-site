# Implementation handoff: Worktree commercial SEO architecture

Prepared: 2026-08-21  
Audience: implementation agent  
Authority: execute the approved national commercial-site implementation locally; do not deploy to production without separate authorization

## Assignment

Implement the national Worktree commercial SEO architecture described in `docs/seo-commercial-architecture-implementation-plan.md`.

The outcome is one coherent national release candidate with:

- Three distinct service pages for AI automation, AI implementation, and managed AI.
- Product pages retained as proof and buyer-decision pages rather than competing service pages.
- Managed Operations consolidated into `/services/managed-ai`.
- Services and Product represented as separate navigation families.
- Direct canonical internal links, a complete route contract, and release-grade verification.
- The homepage changed only within its explicitly approved SEO/link boundary.

Do not treat this as a generic redesign or a request to expand the SaaS product.

## Read before editing

Read these files completely and use them in this authority order:

1. `AGENTS.md` and any applicable parent instructions.
2. `BRANDING.md` — authoritative for the business offer, voice, and Service-versus-Product posture.
3. `docs/seo-commercial-architecture-implementation-plan.md` — authoritative for URLs, scope, sequencing, migration, and release gates.
4. `docs/seo-query-url-map.md` — authoritative for query ownership and internal-link relationships.
5. `docs/seo-page-briefs.md` — authoritative for each page's buyer job and claim boundaries.
6. The route-specific copy artifact listed below, after resolving its approval-gated claims.
7. Current source files as evidence of implemented behavior, not as authority for stale URLs or unsupported claims.

Route-specific copy:

| Destination | Copy source |
| --- | --- |
| `/services/ai-automation` | `docs/seo-copy-ai-automation.md` |
| `/services/ai-implementation` | `docs/seo-copy-ai-implementation.md` |
| `/services/managed-ai` | `docs/seo-copy-managed-ai.md`, selectively consolidated with the current Managed Operations page |
| `/` | `docs/seo-copy-homepage.md` |

Never implement `docs/seo-copy-homepage-superseded.md`. It is an archived proposal, not an implementation source.

## Approved architecture

- Keep both Service and Product page families.
- Service pages answer what Worktree will do and what operating responsibility it assumes.
- Product pages answer what system, controls, interfaces, and operating artifacts make the service credible.
- `/services/ai-automation` owns `AI automation services` intent.
- `/services/ai-implementation` owns `AI implementation services` intent.
- `/services/managed-ai` owns `managed AI services` intent.
- `/product/security` is canonical; `/security` remains a direct permanent redirect.
- `/product/compare-ai-agent-approaches` is canonical; the top-level comparison URL remains a direct permanent redirect.
- `/product/managed-operations` is retired and redirects directly to `/services/managed-ai` only after the new destination passes local verification.
- `/services` must remain absent and return `404`; do not link to it.
- `/locations/vancouver` is excluded from the national release and must remain absent, unlinked, and out of the sitemap.

## Mandatory preflight

Complete work package 0 before route migration or permanent redirects. Record the results in repository-local artifacts.

1. Capture the exact base commit and `git status --short`. This worktree already contains extensive modified and untracked user work. Preserve it. Never reset, discard, or overwrite overlapping changes merely to make the implementation easier.
2. Create `docs/seo-commercial-claims-register.md`. Record approval or a conservative rewrite/removal for every gated claim:
   - private pricing;
   - business-hours support;
   - Deployment Record cadence;
   - United States and Canada availability;
   - monitoring and review;
   - retention, deletion, access removal, and offboarding.
3. Create `docs/seo-redirect-preflight.md`. Record the current route state, the complete redirect table, direct destinations, the `/docs` decision, and the fallback test.
4. Apply the `/docs` evidence protocol in the implementation plan. If no material analytics, backlink, or historical evidence is available, record that fact and use the approved fallback `/product`. Do not create a redirect chain.
5. Record a production/Search Console baseline when access exists. If credentials or production evidence are unavailable, state the exact limitation rather than inventing a baseline.
6. Prepare and test the forward-fix artifact required by the plan before approving cacheable `308` redirects. Record its immutable identifier or reproducible local state in the release note.

If a claim lacks required business or delivery approval, remove it or rewrite it as scope-dependent. Do not infer operational commitments from aspirational copy.

## Implementation sequence

### 1. Build canonical service destinations

Implement in this order:

1. `/services/ai-implementation`
2. `/services/ai-automation`
3. `/services/managed-ai`

Each page must:

- Use `createPageMetadata` with a unique title, description, and self-canonical path.
- Have exactly one visible H1 and a buyer argument distinct from its siblings.
- Use the reviewed copy only after claim normalization.
- Label designed workflows and artifacts as illustrative.
- Reuse existing low-level brand primitives where appropriate.
- Avoid a schema-driven generic service-page generator; the pages require distinct narrative and visual rhythms.
- Link directly to canonical Product proof and adjacent Service destinations.
- Avoid public prices, invented evidence, customer logos, fixed timelines, service levels, certifications, or connector catalogues.

Build and verify `/services/managed-ai` before activating the redirect from `/product/managed-operations`. Consolidate the strongest Managed Operations material; do not concatenate two drafts into an oversized page.

### 2. Differentiate retained Product pages

Apply the minimal changes described in the implementation plan to:

- `/product`
- `/product/agents`
- `/product/security`
- `/product/compare-ai-agent-approaches`

For each adjacent Product/Service pair, compare title, description, H1, hero promise, major H2s, primary CTA, anchor text, and delivery-method sections. A Product page passes only if it has a positive product-proof or buyer-decision job.

Private pricing is already the approved posture. Preserve the current removal of the public `$25K` starting-price language and search all public source for any other fixed, minimum, or starting Worktree price.

Revalidate all time-sensitive third-party comparison claims and source links immediately before release. Use primary sources for technical/product facts.

### 3. Implement navigation, homepage routing, and internal links

- Add Services navigation for AI Automation, AI Implementation, and Managed AI.
- Keep Product overview, Agents, Product Security, and Compare approaches under Product.
- Remove Managed Operations from Product navigation.
- Do not create or link a `/services` hub.
- Replace positional Product-icon coupling with stable identifiers or an explicit link-to-icon mapping.
- Use one mutually exclusive desktop menu state for Services and Product.
- Preserve correct IDs, `aria-controls`, `aria-expanded`, Escape closing, outside-click closing, focus handling, and focus return.
- Extend the mobile section model so only one section is expanded at a time.
- Add the canonical Automation and Implementation routes to `/use-cases` while preserving its deployment-review path.

Homepage scope is exact:

- Update the approved metadata.
- Normalize `/product/` links to `/product`.
- Add the one compact service-routing element specified in `docs/seo-copy-homepage.md`.
- Change only the gallery's current `/docs` link target and label to the approved destination.

Do not change gallery scenarios, scene copy, visuals, behavior, regulated-domain examples, chapter order, or the locked homepage narrative. Existing gallery claims are a deferred finding and are not ratified by this implementation.

### 4. Update the route contract atomically

Update `src/config/site-routes.mjs` in the same change set as the working destinations:

- Add all three service routes to `staticRoutes`.
- Remove `/product/managed-operations` from `staticRoutes` and redirect it directly to `/services/managed-ai`.
- Redirect `/how-it-works` directly to `/services/ai-implementation`.
- Redirect `/docs` directly to the evidence-approved destination.
- Preserve Security, Comparison, Book, and Resources redirect behavior unless the approved contract explicitly changes their destination.
- Classify the three prototype routes under `noindexRoutes`.
- Do not add Vancouver.
- Update `lastModified` only for routes receiving substantive changes.

Do not edit `src/app/sitemap.ts`, `src/app/robots.ts`, or `src/lib/seo.ts` unless verification demonstrates the generic implementation is insufficient.

After destination and redirect tests pass, remove only the verified stale route sources listed in the plan. Confirm that their required styles or assets are not used by canonical routes before removal.

## Verification requirements

All project Node and package commands must run inside WSL. Before the first such command in each execution context, verify:

```sh
node -p "process.platform"
```

It must return `linux`. Do not fall back to Windows Node tooling.

At minimum:

1. Run ESLint on every changed TypeScript/TSX file.
2. Run the production Next.js build.
3. Start the production build locally.
4. Extend verification to inventory every filesystem-backed public page and classify it as canonical, publication-driven, noindex, redirect, or deliberately absent.
5. Run `npm run check:routes -- http://127.0.0.1:<port>`.
6. Verify each redirect is one direct `308` and its destination is a direct `200` with redirects disabled.
7. Crawl rendered internal links and fail on redirect sources, missing routes, gated routes, or noncanonical trailing-slash variants.
8. Verify one unique title, description, canonical, and H1 per indexable page.
9. Parse every JSON-LD block and reject price data, unsupported claims, or nonexistent ancestors.
10. Verify positive and negative sitemap membership against the complete national route matrix in the plan.
11. Test desktop and mobile navigation behavior and representative responsive widths.
12. Confirm preview deployments retain `noindex, nofollow` behavior.
13. Smoke-test the prepared fallback artifact before treating the permanent redirects as releasable.

Do not reduce the route matrix to only routes already known by the route manifest; omitted public pages are part of what verification must detect.

## Release boundaries and stop conditions

- Produce a locally verified national release candidate. Do not deploy without explicit authorization.
- Do not publish or link Vancouver in this release.
- Do not redesign the homepage or workflow gallery.
- Do not add product functionality, analytics instrumentation, IndexNow, `llms.txt`, or a monitoring platform.
- Do not manufacture customer evidence or operational capability.
- Do not ship isolated service routes, navigation changes, or permanent redirects separately. The national core is one atomic release.
- Once production `308` redirects receive traffic, recovery is forward-fix-only; never roll back to a deployment that removes their destinations.
- If existing user work conflicts materially with the approved implementation and cannot be preserved safely, stop and report the exact files and conflict instead of choosing silently.

## Required handback

Return:

1. A concise implementation summary grouped by service pages, Product differentiation, navigation/homepage, and route contract.
2. A list of created, modified, and removed files.
3. The claims-register decisions and any remaining owner approvals.
4. The recorded base commit and how pre-existing dirty-worktree changes were preserved.
5. Exact verification commands and outcomes.
6. The complete observed route-matrix result, including negative and noindex cases.
7. Any production/Search Console checks that remain unavailable.
8. The forward-fix artifact identifier and named deployment owner/backup reviewer, or an explicit statement that production release is still gated on them.
9. Confirmation that no production deployment occurred unless separately authorized.

The work is complete only when the definition of done in `docs/seo-commercial-architecture-implementation-plan.md` is satisfied without exceptions or deferred verification.
