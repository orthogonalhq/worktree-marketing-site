# Worktree commercial SEO architecture implementation plan

Status: Revised after independent double-blind review; proposed for approval  
Prepared: 2026-08-21  
Scope: National commercial service pages, Product differentiation, route migration, navigation, internal links, technical SEO, and a gated Vancouver follow-on

## Executive decision

Worktree should retain both Service and Product sections, but each must answer a different buyer question:

- **Service:** What will Worktree do for our operation, and what responsibility will it assume?
- **Product:** What system, interfaces, controls, and operating artifacts make that service credible?

The current Product overview, Agents, Security, and Comparison pages can keep distinct product-proof or buyer-decision jobs with light changes. The current Managed Operations page is the exception: it is already a service sales page in content and intent. It should become `/services/managed-ai`, and `/product/managed-operations` should permanently redirect to it.

The implementation should launch the national commercial core atomically. Do not publish isolated service routes, permanent redirects, or navigation entries in separate production releases. The Vancouver page should follow only after its local facts are verified.

## Desired outcome

After the national release:

1. Every primary commercial query has one indexable page owner.
2. Worktree's high-touch service is unmistakably the offer.
3. Product pages strengthen the service sale without behaving like alternative service landing pages.
4. Navigation and internal links make both page families discoverable.
5. No internal link points through a redirect.
6. Every indexable URL returns `200`, self-canonicalizes, has one H1, and appears once in the sitemap.
7. Every retired URL resolves through one permanent redirect directly to a live canonical destination.
8. Homepage demonstrations and narrative remain outside this migration except for the minimum metadata and service-routing changes explicitly approved below.

## Non-goals

This plan does not authorize:

- Replacing or redesigning the homepage workflow gallery.
- Reopening the locked homepage narrative or visual system.
- Creating an indexable `/services` hub.
- Building new SaaS product functionality.
- Creating municipality or industry doorway pages.
- Publishing customer proof, integration claims, pricing, timelines, certifications, or service levels without separate evidence approval.
- Launching the Vancouver page or Google Business Profile before the required facts are verified.
- Creating the proposed cost guide in the same release.

## Current repository state

The repository is already partway through an earlier route migration. The implementation must begin from the current code rather than from older planning assumptions.

| Area | Current state | Implication |
| --- | --- | --- |
| Canonical origin | `https://worktree.agency` in `src/config/site-routes.mjs` | Retain as the single production origin. |
| Product overview | `/product` is indexable and presents agents, security, managed operations, and comparison. | Keep; reframe its managed-operation chapter as proof and route to the service owner. |
| Agents | `/product/agents` is indexable and strongly product-oriented. | Keep with small metadata, CTA, and internal-link changes. |
| Managed Operations | `/product/managed-operations` is indexable and contains workflow fit, Blueprint, deployment lifecycle, controls, post-launch operation, Deployment Record, and engagement scope. | Consolidate into `/services/managed-ai`; it is the principal cannibalization risk. |
| Security | `/product/security` is canonical and `/security` redirects there. A stale source page still exists at `src/app/security/page.tsx`. | Keep the Product destination; remove the stale source file after verifying the redirect. |
| Comparison | `/product/compare-ai-agent-approaches` is canonical and the top-level URL redirects there. A stale source page still exists. | Keep the Product destination; remove the stale source file and replace its remaining `/how-it-works` link. |
| Service routes | No `/services/*` pages exist. | Create the three national service owners together. |
| Vancouver | No `/locations/vancouver` route exists. | Hold until local publication facts are approved. |
| Navigation | Managed Operations is currently inside the Product menu; there is no Services menu. The desktop menu maps four Product links over a three-item positional icon array. | Add Services as a first-class navigation family, remove Managed Operations from Product, and replace positional icon coupling with a stable link-to-icon mapping. |
| Sitemap | Generated from `siteRoutes.staticRoutes`. | Route-contract changes will update sitemap membership automatically. |
| Metadata | `createPageMetadata` supplies self-canonical, robots, Open Graph, and Twitter fields. | Use the existing helper on every new route. |
| Route verification | `scripts/check-routes.mjs` checks declared redirects, status, canonical, H1, indexability, noindex routes, and sitemap membership against a running build. It cannot detect an omitted public route. | Add an exhaustive route inventory, redirect-destination checks, and a rendered internal-link crawl before using it as the release gate. |

## Authoritative implementation sources

The implementation uses this source order:

1. `BRANDING.md` for the offer and service-versus-product posture.
2. This implementation plan for canonical routes, migration, scope, sequencing, and release gates.
3. `docs/seo-query-url-map.md` for query ownership and internal-link relationships.
4. `docs/seo-page-briefs.md` for buyer jobs, evidence, and claim boundaries.
5. The route-normalized, claims-approved page copy artifacts for public copy.
6. Current source files for verified implemented behavior—not as authority to preserve superseded URLs or claims.

The query map, briefs, and copy artifacts were revised with this plan to use `/product/security` and remove `/product/managed-operations` as a retained proof route. If a later conflict appears, stop implementation and reconcile the documents before coding; do not choose whichever source is most convenient.

`/product/security` is the approved canonical security page. `/security` remains a permanent redirect and must not receive internal links.

## Target information architecture

```text
Home
├── Services
│   ├── AI automation
│   ├── AI implementation
│   └── Managed AI
├── Product
│   ├── Product overview
│   ├── Worktree Agents
│   ├── Product Security
│   └── Compare approaches
├── Use cases
├── Blog
├── About
└── Vancouver and Lower Mainland [separate gated release]
```

There is no `/services` page in the initial architecture. Services may be a navigation label and menu without becoming an indexable URL.

## Query and page ownership

| Canonical URL | Primary job | Primary query role | Boundary |
| --- | --- | --- | --- |
| `/` | Establish Worktree as the implementation and operating partner; route the buyer. | `AI implementation partner` | Does not reproduce the service-page methods. |
| `/services/ai-automation` | Help the buyer identify and improve recurring work before selecting the solution. | `AI automation services` | Summarizes implementation and managed operation only as next steps. |
| `/services/ai-implementation` | Carry a workflow, pilot, or mandate through design, integration, testing, acceptance, and launch. | `AI implementation services` | Does not become a general automation catalogue or detailed managed-service page. |
| `/services/managed-ai` | Define post-launch evaluation, support, exceptions, material change, reporting, and improvement. | `managed AI services` | Does not become generic MLOps, cloud hosting, or a Product UI inventory. |
| `/product` | Explain the Worktree delivery system and how its parts work together. | Brand and product-proof intent | Avoids service head terms in title and H1. |
| `/product/agents` | Demonstrate the agent role, tools, permissions, approvals, and run evidence. | Worktree Agents and agent-product intent | Avoids `AI agent implementation services` ownership. |
| `/product/security` | Document factual workflow controls and data handling. | Product security and control research | Avoids broad cybersecurity-vendor positioning. |
| `/product/compare-ai-agent-approaches` | Compare packaged, open-source, internal, and managed responsibility models. | Comparison and build-versus-buy intent | Does not become a second managed-service landing page. |
| `/locations/vancouver` | Establish genuine Lower Mainland relevance and route into the national offer. | `AI automation Vancouver` | Does not duplicate national service copy. |

## URL migration contract

| Current URL | Final behavior | Destination | Reason |
| --- | --- | --- | --- |
| `/product/managed-operations` | Permanent redirect | `/services/managed-ai` | Current content and intent are service-oriented. |
| `/how-it-works` | Permanent redirect | `/services/ai-implementation` | The implementation page best answers process and delivery intent. |
| `/docs` | Permanent redirect; destination decided in work package 0 | No-data fallback: `/product` | Historical signals are mixed. Product is the fallback for the gallery's current developer-documentation framing. |
| `/security` | Preserve permanent redirect | `/product/security` | Migration is already represented in the route contract. |
| `/compare-ai-agent-approaches` | Preserve permanent redirect | `/product/compare-ai-agent-approaches` | Migration is already represented in the route contract. |
| `/book` | Preserve permanent redirect | `/deploy/book` | Existing conversion migration. |
| `/resources` | Preserve permanent redirect | `/use-cases` | Existing resource migration. |

No redirect may point to another redirect. Before the release, fetch every source with redirects disabled and fetch every destination independently to confirm a direct `308 → 200` path.

### `/docs` decision protocol

The Worktree business owner must approve the final `/docs` destination before route-contract work begins.

Evidence artifact: a short preflight note recording any available Search Console landing-page data, analytics landing sessions, backlink targets and anchor text, and the historical route behavior.

Decision rule:

- Predominantly developer-documentation or product anchors → `/product`.
- Predominantly implementation/how-it-works anchors → `/services/ai-implementation`.
- Predominantly managed-operation anchors → `/services/managed-ai`.
- No material data → `/product`.

Deadline: work package 0 exit gate. Record one destination in the route table before any cacheable redirect is implemented. Do not leave `/docs` pointing to the retired Product URL or introduce a redirect chain.

## Product-page change budget

### `/product`: light-to-moderate reframe

Estimated impact: 15–25% of page copy and links; no structural redesign required.

Keep:

- The complete-system framing.
- Agent and workflow proof.
- Security and access-boundary proof.
- Evaluation, exception, and improvement artifacts.
- Comparison section.

Change:

- Replace the current title `AI Agent Infrastructure and Managed Operations` with product-specific language that does not compete with `managed AI services`.
- Keep the H1 product-oriented.
- Replace the Product navigation link to `/product/managed-operations` with a contextual service link to `/services/managed-ai`.
- Frame the managed-operation section as evidence of how the service is delivered, then route to the service owner.
- Add contextual links to `/services/ai-implementation` and `/services/ai-automation` where the buyer's question becomes commercial.
- Keep `/deploy` as a conversion option without making every proof section a sales section.

Acceptance test: a reader should understand the machinery behind Worktree without mistaking `/product` for a fourth general service page.

### `/product/agents`: minimal reframe

Estimated impact: 5–15% of metadata, opening/closing copy, and links.

Keep:

- Role-based agent positioning.
- Run, source, action, approval, output, and history demonstrations.
- Scoped access and human authority sections.

Change:

- Preserve branded/product language in metadata and H1.
- Replace the final `/product/managed-operations` link with `/services/managed-ai`.
- Add one contextual link to `/services/ai-implementation` for buyers asking how the agent is put into production.
- Link to `/services/ai-automation` only where the buyer is still choosing the workflow.

Acceptance test: the page proves what a Worktree Agent is and how it behaves; it does not sell a duplicative implementation engagement.

### `/product/security`: minimal link and cleanup pass

Estimated impact: under 10%.

Keep the current factual, restrained security posture. Add contextual links to implementation and managed AI only where those pages summarize the controls. Remove the stale `src/app/security/page.tsx` source after verifying `/security` redirects correctly.

Do not broaden this release into a security-program rewrite.

### `/product/compare-ai-agent-approaches`: minimal migration cleanup

Estimated impact: 10–20%.

- Keep the current comparison intent and canonical Product URL.
- Replace the internal `/how-it-works` link with `/services/ai-implementation`.
- Link Worktree's managed option to `/services/managed-ai` where appropriate.
- Retain private, scope-based pricing language.
- Ensure the Worktree column does not overwhelm the neutral comparison.
- Remove the stale `src/app/compare-ai-agent-approaches/page.tsx` source after redirect verification.

## Service-page implementation

### Shared implementation principles

- Use the approved page brief as the factual contract and the reviewed copy artifact as the copy source.
- Do not implement unratified draft language merely because it exists in `docs/`.
- Reuse low-level brand primitives such as `WorktreeShell`, `Eyebrow`, CTA treatments, typography tokens, and existing product-proof components.
- Do not build a schema-driven generic service-page generator. Each service has a different buyer argument and should have a distinct visual rhythm.
- Share only proven low-level layout styles after the first page demonstrates that the abstraction is real.
- Every designed workflow or artifact must be labeled illustrative until customer proof is approved.
- No public pricing, connector catalogue, customer logo, result metric, timeline, certification, or service-level claim is added in this release.

### Operational claims sign-off

Illustrative-evidence approval does not authorize operational commitments. Before copy is marked implementation-ready, maintain a claims register with these sign-offs:

| Claim | Required approval | Release rule |
| --- | --- | --- |
| Private pricing | Worktree business owner | Remove every fixed, minimum, or starting price. Scope and commercial proposal follow the deployment review. |
| Business-hours support | Business owner and delivery owner | Publish only the confirmed support window and avoid response-time or availability implications. |
| Monthly Deployment Record | Business owner and delivery owner | Publish the monthly cadence only if the service can reliably deliver it; otherwise describe an agreed review cadence. |
| United States and Canada availability | Business owner | Confirm contracting, billing, delivery, and support posture before publishing availability. |
| Monitoring and review | Delivery owner | Define the actual evidence and review process; never imply every run or continuous human observation. |
| Retention, deletion, access removal, and offboarding | Business owner against current legal/data-use pages | Link to the approved policy language and do not create a conflicting sales-page promise. |

The business owner records approval in the claims register. Engineering verifies that product or operating claims are supported by implemented behavior. Any claim without both required approvals is removed or rewritten as scope-dependent before code review.

### `/services/ai-implementation`

Use `docs/seo-copy-ai-implementation.md` after copy ratification.

Required public jobs:

1. Name the production gap.
2. Show the workflow anatomy.
3. Explain the path from current process to controlled launch.
4. Explain integration as part of the operating path.
5. Show Blueprint, test, acceptance, launch, and initial Deployment Record artifacts.
6. Clarify customer and Worktree responsibilities.
7. Route ongoing-operation questions to `/services/managed-ai`.

Primary product-proof links: `/product`, `/product/agents`, and `/product/security`.

### `/services/ai-automation`

Use `docs/seo-copy-ai-automation.md` after coordinated review.

Required public jobs:

1. Make recurring operational friction recognizable.
2. Show how to select a strong first workflow.
3. Establish eliminate → simplify → clarify → automate as the decision sequence.
4. Show the complete path from signal to human judgment and output.
5. Use a small number of explicitly illustrative workflow patterns.
6. Route delivery detail to implementation and post-launch responsibility to managed AI.

Primary supporting links: `/use-cases`, `/services/ai-implementation`, `/services/managed-ai`, and `/product/agents`.

### `/services/managed-ai`

Consolidate the strongest parts of the current Managed Operations page with the reviewed service copy. Do not mechanically copy both documents into one longer page.

Required public jobs:

1. Establish that launch creates an operating responsibility.
2. Define the observe → evaluate → respond → improve → record → review loop.
3. State what Worktree manages and what authority remains with the customer.
4. Explain evaluation, exceptions, the approved support posture, material change, and the approved Deployment Record cadence.
5. Route product-interface questions to `/product` and `/product/agents` rather than maintaining a duplicate Product page.

The new service route must be fully rendered and locally verified before `/product/managed-operations` becomes a permanent redirect.

## Homepage scope

The homepage change is intentionally small and is governed by `docs/seo-copy-homepage.md`.

Permitted changes:

- Align metadata with the `AI implementation partner` category without targeting all three service head terms.
- Add one compact service-routing element inside the existing Infrastructure/Product credibility chapter.
- Normalize `/product/` links to `/product`.
- Change only the current gallery `/docs` link target and label to the approved direct canonical destination.
- Add the Vancouver link only when the local page is live.
- Keep the Product link as the primary proof path.

Prohibited changes in this workstream:

- Replacing gallery scenarios.
- Changing gallery visual behavior.
- Adding regulated-domain demonstrations.
- Reordering the six locked homepage chapters.
- Inventing a customer-story substitute.
- Rewriting existing gallery claims under the pretext of link cleanup.

The existing gallery scenes, claims, visuals, interaction, and chapter order remain unchanged. Pre-existing gallery security and regulated-domain claims are deferred findings and are not ratified by this release. The archived `docs/seo-copy-homepage-superseded.md` must never be used as an implementation source.

## Navigation and internal-link implementation

### Header

Add a first-class `Services` menu containing:

- AI Automation
- AI Implementation
- Managed AI

Keep the Product menu containing:

- Product overview
- Worktree Agents
- Product Security
- Compare approaches

Remove Managed Operations from the Product menu. Update active-state logic so `/services/*` activates Services and `/product/*` activates Product.

Do not continue the current `productIcons[index]` pattern. Associate icons with stable link identifiers or an explicit mapping so adding or removing a navigation item cannot produce an undefined icon at runtime.

Use one mutually exclusive desktop state such as `openMenuId: "services" | "product" | null`. Each trigger requires a unique panel ID, correct `aria-controls` and `aria-expanded`, Escape behavior, outside-click closing, focus containment, and a defined focus return to its trigger. Opening one menu closes the other. Extend the mobile section-id model to include Services and verify that only one accordion section is expanded at a time.

### Mobile and footer

- Add a Services section containing the three service owners.
- Keep Product proof routes in Product.
- Keep Compare approaches under Product.
- Add Vancouver under Company or a clearly labeled Locations grouping only when its route is live.
- Do not link a navigation label to a nonexistent `/services` page.

### Contextual internal links

| Source | Required destinations | Purpose |
| --- | --- | --- |
| Homepage | Three services, Product, Use Cases, Security, Comparison | Route category demand and distribute internal authority. |
| Automation | Implementation, Managed AI, Use Cases, Agents, Security | Move from problem recognition to delivery and ongoing confidence. |
| Implementation | Automation, Managed AI, Product, Agents, Security, Use Cases | Connect workflow selection, delivery, proof, and operation. |
| Managed AI | Implementation, Product, Agents, Security, Comparison | Connect post-launch responsibility to build history and product proof. |
| Product overview | Three services where relevant | Convert product understanding into the correct commercial path. |
| Agents | Implementation and Managed AI | Connect product behavior to deployment and operation. |
| Security | Implementation and Managed AI | Return trust research to the relevant service. |
| Comparison | Implementation, Managed AI, Use Cases | Route decision-stage readers without duplicating service copy. |
| Use Cases | Automation, Implementation, deployment review | Turn workflow recognition into the appropriate commercial path. |

Use descriptive, varied anchor text. Do not force exact-match anchors into every placement.

## Technical SEO implementation

### Route contract

Update `src/config/site-routes.mjs` in the same change set as the new pages:

- Add the three service routes to `staticRoutes` with the release date.
- Remove `/product/managed-operations` from `staticRoutes`.
- Add its direct permanent redirect to `/services/managed-ai`.
- Change `/how-it-works` to point directly to `/services/ai-implementation`.
- Change `/docs` to the approved direct destination.
- Preserve the Security and Comparison redirects.
- Add `/prism-wave-prototype`, `/wave-prototype`, and `/ribbon-renderer` to `noindexRoutes` so the route contract covers their existing page-level directives.
- Add `/locations/vancouver` only in the later local release.
- Update `lastModified` to the release date for each existing canonical page receiving a substantive content change. Do not change dates for untouched pages.

`src/app/sitemap.ts` should not need architectural changes because it consumes the route contract. Verify the generated output rather than editing it redundantly.

### Metadata and canonicals

Every new page must use `createPageMetadata` with:

- A unique title aligned to its mapped query.
- A unique buyer-facing description.
- Its canonical path.
- One visible H1 distinct from sibling pages.

Product titles and H1s must remain product- or brand-specific. Mentioning service concepts in body copy is acceptable; targeting the same primary query in metadata and H1 is not.

Before release, compare every retained Product page with its adjacent Service owner across title, description, H1, hero promise, major H2s, primary CTA, internal anchor text, and duplicated delivery-method sections. A Product page passes only when it has a positive distinct job—not merely the absence of an exact keyword.

### Structured data

- Retain the existing Organization and WebSite graph.
- Add accurate `Service` JSON-LD to the three service pages only if the provider, service type, and area served can be stated without unsupported details.
- Do not add prices or `Offer` data.
- Do not add FAQ structured data merely to pursue a rich result.
- If breadcrumbs are implemented, use only real, navigable ancestors. With no `/services` hub, service-page breadcrumbs should be `Home → Current service`, not a link to a nonexistent parent.
- Structured data is not a launch blocker if the content, canonical, sitemap, and links are correct.

### Redirect and duplicate-source cleanup

After destination pages pass local route checks:

- Remove `src/app/product/managed-operations/page.tsx` when the redirect becomes active.
- Remove stale `src/app/security/page.tsx`.
- Remove stale `src/app/compare-ai-agent-approaches/page.tsx` and its unused route-local assets only after confirming the canonical Product page owns the required styles and content.
- Search the repository for links to every redirect source and replace them with canonical destinations.
- Remove or separately approve every fixed, minimum, or starting Worktree price. The canonical Comparison page's `Annual managed engagement starting around $25K` row must not survive the private-pricing release.
- Revalidate the canonical Comparison page's third-party product descriptions, external source URLs, wage figures, and other time-sensitive claims immediately before release.

## Implementation work packages

### Work package 0: approval and baseline

1. Ratify the route-normalized service-page copy set or record exact revisions in one final artifact per route.
2. Approve the exact homepage delta in `docs/seo-copy-homepage.md`; reject the archived superseded draft as an implementation source.
3. Complete the operational claims register and obtain the required business/delivery/engineering sign-offs.
4. Apply the `/docs` decision protocol, record its evidence, and approve one direct destination.
5. Approve the complete route and redirect table, including `/product/security` as canonical.
6. Capture the current production route check, sitemap, indexed-page list, Search Console page/query baseline, and any known backlinks to retired URLs.
7. Record the exact base commit and a file-level snapshot of the dirty worktree. Confirm how existing user changes in every overlapping file will be preserved.
8. Prepare and locally test the rollback-compatible fallback artifact described below.

Exit gate: final copy artifacts, claims, URLs, redirects, navigation families, homepage boundary, base commit, worktree-preservation method, and fallback artifact are approved.

### Work package 1: build the three service destinations locally

1. Implement the AI implementation page first as the delivery spine.
2. Implement automation against the approved boundary with implementation.
3. Build `/services/managed-ai` by editing and consolidating—not concatenating—the existing Managed Operations content and managed-service draft.
4. Reuse product-proof components only where they answer the page's buyer question.
5. Verify responsive layout, keyboard behavior, reduced motion, and illustrative labels before connecting public navigation.

Exit gate: all three routes render locally with approved copy, one H1, self-canonical metadata, no broken links, and no unsupported claims.

### Work package 2: differentiate Product

1. Reframe `/product` metadata, managed-operation section, and contextual links.
2. Update `/product/agents` closing CTA and supporting service links.
3. Add restrained service links to `/product/security`.
4. Update Comparison links; remove the public `$25K` starting-price row; preserve private, scope-based pricing language.
5. Revalidate competitor descriptions, external sources, wage references, and all other time-sensitive Comparison claims.
6. Review title, description, H1, hero, major H2s, primary CTA, anchors, and method sections against adjacent Service pages.
7. Confirm that each Product page still works independently for a buyer evaluating Worktree's product proof.

Exit gate: Product pages do not use service-owner head terms in titles/H1s, and each has a distinct reason to remain indexed.

### Work package 3: navigation, homepage routing, and route contract

1. Add `serviceNavigationLinks` to `src/components/site-navigation-data.ts`.
2. Update desktop, mobile, and footer navigation without creating `/services`.
3. Remove Managed Operations from Product navigation.
4. Apply only the approved homepage metadata, compact service-routing element, Product-link normalization, and one gallery link-target/label correction.
5. Update the route contract, direct redirects, and sitemap membership.
6. Add Automation and Implementation links to `/use-cases` while retaining the deployment-review path.
7. Replace every repository-internal link to a redirect source or noncanonical trailing-slash variant.
8. Remove the stale source pages after destination and redirect checks pass.

Exit gate: no public navigation or internal page links to an absent route or redirect source.

### Work package 4: release verification

Run project JavaScript tooling only inside WSL and first verify that `node -p "process.platform"` returns `linux`.

Required checks:

1. ESLint on all changed TypeScript and TSX files.
2. Production Next.js build.
3. Start the production build locally.
4. Generate an exhaustive inventory of filesystem-backed public pages and compare it with `staticRoutes`, `publicationRoutes`, `noindexRoutes`, redirects, and deliberately absent routes. Fail on any unclassified page.
5. Run `npm run check:routes -- http://localhost:<port>` against that build.
6. Confirm every redirect source returns one `308` and every declared destination returns `200` directly with redirects disabled.
7. Crawl all server-rendered internal links. Fail on redirect sources, unknown paths, noncanonical trailing-slash variants, and links to gated routes.
8. Verify exactly one title, description, canonical, and H1 on every indexable route; check title and description uniqueness across the commercial set.
9. Parse every JSON-LD block and verify that no structured data contains price, unapproved claims, or nonexistent ancestors.
10. Verify sitemap inclusion and exclusion exactly once per canonical, including negative assertions for redirect, noindex, and gated routes.
11. Verify desktop Services/Product mutual exclusion, unique IDs, Escape behavior, focus return, outside-click closing, and touch behavior; verify the extended mobile section model.
12. Check representative mobile, tablet, desktop, and wide-desktop layouts.
13. Confirm preview deployments emit `noindex, nofollow` through the existing preview header behavior.
14. Run the tested fallback deployment smoke check before approving the production `308`s.

Exit gate: the exhaustive route contract and national route matrix below pass without exception; no check may be left as “extend or supplement later.”

## National release route matrix

| URL | Expected status | Canonical | Sitemap |
| --- | ---: | --- | --- |
| `/` | 200 | `/` | Include |
| `/services/ai-automation` | 200 | Self | Include |
| `/services/ai-implementation` | 200 | Self | Include |
| `/services/managed-ai` | 200 | Self | Include |
| `/product` | 200 | Self | Include |
| `/product/agents` | 200 | Self | Include |
| `/product/security` | 200 | Self | Include |
| `/product/compare-ai-agent-approaches` | 200 | Self | Include |
| `/use-cases` | 200 | Self | Include |
| `/blog` | 200 | Self | Include |
| Every published `/blog/[slug]` | 200 | Self | Include |
| `/about` | 200 | Self | Include |
| `/legal/privacy` | 200 | Self | Include |
| `/legal/terms` | 200 | Self | Include |
| `/legal/data-use` | 200 | Self | Include |
| `/deploy` | 200 | Self | Include |
| `/deploy/book` | 200 + noindex | N/A | Exclude |
| `/deploy/thanks` | 200 + noindex | N/A | Exclude |
| `/partners` and known `/partners/[slug]` | 200 + noindex | N/A | Exclude |
| `/prism-wave-prototype` | 200 + noindex | N/A | Exclude |
| `/wave-prototype` | 200 + noindex | N/A | Exclude |
| `/ribbon-renderer` | 200 + noindex | N/A | Exclude |
| `/product/managed-operations` | 308 | N/A | Exclude |
| `/how-it-works` | 308 | N/A | Exclude |
| `/docs` | 308 | N/A | Exclude |
| `/security` | 308 | N/A | Exclude |
| `/compare-ai-agent-approaches` | 308 | N/A | Exclude |
| `/book` | 308 | N/A | Exclude |
| `/resources` | 308 | N/A | Exclude |
| `/services` | 404 | N/A | Exclude and do not link |
| `/locations/vancouver` | 404 in national release | N/A | Exclude and do not link |
| Unknown route probe | 404 | N/A | Exclude |

## Deployment strategy

### National core

Ship the following in one production deployment:

- Three service destinations.
- Managed Operations consolidation and redirect.
- Product differentiation.
- Services navigation.
- Homepage routing changes.
- Internal-link updates.
- Route-contract and sitemap updates.
- Stale duplicate-source cleanup.

This prevents a period where navigation points to missing pages, Product and Service compete simultaneously, or permanent redirects land on incomplete destinations.

### Vancouver follow-on

Release `/locations/vancouver` separately after confirming:

- Exact public locality wording.
- Legitimate operating address and hidden-address posture.
- Practical in-person service area.
- Public phone and hours.
- Google Business Profile eligibility and URL.
- Local conversion attribution.

The page can be reviewed before those facts exist, but it must not enter `staticRoutes`, the sitemap, navigation, or production until they are approved.

## Rollback strategy

Permanent redirects can be cached, so rollback must preserve every released destination URL.

Before production, the deployment owner must prepare a rollback-compatible hotfix artifact based on the release candidate. It must preserve:

- All three new service destination routes.
- Every new permanent redirect and its direct destination.
- Self-canonical metadata and sitemap membership.
- A simplified, server-rendered version of any new page whose primary component fails.

Build the artifact and run the route matrix against it. Record its commit or immutable deployment identifier in the release note.

After the production `308`s receive traffic, an ordinary platform rollback to the pre-release deployment is prohibited because it would remove cached destinations. Recovery becomes forward-fix-only.

Forward-fix trigger: a new destination returns non-`200`, fails to render its primary content, loses its canonical/indexation contract, or creates a blocking navigation failure.

Forward-fix procedure:

1. Keep all new canonical routes live.
2. Deploy the tested fallback artifact or apply the prepared simplified route.
3. Preserve permanent redirects and sitemap membership.
4. Revert or repair only the defective component, copy block, or navigation treatment.
5. Smoke-test the affected destination, its redirect source, canonical, H1, primary CTA, and navigation path.

Owner: the person performing the production deployment. The release note must name that person and the backup reviewer before deployment begins.

If the managed-service consolidation is rejected before production, restore `/product/managed-operations` in the route contract and do not ship its permanent redirect. After a production `308` ships, do not casually reverse the URL direction; correct the destination page instead.

## Cannibalization measurement after launch

Cannibalization is not proven merely because two pages receive impressions for related language. Review page/query behavior for evidence that the wrong page is replacing or rotating with the intended owner.

### Baseline and cadence

- Record the current page/query baseline before deployment.
- Inspect indexing and canonical selection immediately after launch.
- Review query-to-page performance at approximately 2, 4, 8, and 12 weeks.
- Segment the United States and Canada separately.
- Keep Vancouver out of the national comparison until its page launches.

Owner: the Worktree business owner or delegated SEO operator named in the release note. Record each review in `docs/seo-post-launch-query-page-review.md` with the date range, country, query cluster, landing URLs, impressions, clicks, average position, conversions when available, diagnosis, and decision.

Minimum evidence rule: correct technical faults immediately, but do not change the information architecture for suspected cannibalization before at least 28 days and either 100 cluster impressions or two consecutive review periods showing the same URL replacement/rotation pattern. If the threshold is not met by week 12, preserve the architecture and continue observation rather than interpreting absence of data as failure.

### Expected behavior

- `AI automation services` variants primarily accrue to `/services/ai-automation`.
- `AI implementation services` and integration variants primarily accrue to `/services/ai-implementation`.
- `managed AI services` and ongoing-operation variants primarily accrue to `/services/managed-ai`.
- Product routes accrue branded, interface, agent-role, security, and comparison queries.

### Warning signs

- Google repeatedly swaps a Product and Service URL for the same primary commercial query.
- A Product URL outranks the service owner while satisfying the commercial intent less completely.
- Search Console shows substantial primary-query impressions split across pages with unstable positions.
- Internal links and anchor text still imply that a Product page is the primary commercial owner.

### Response order

1. Correct internal links, navigation labels, metadata, and H1 emphasis.
2. Tighten duplicated sections and strengthen the service owner's missing evidence or buyer answer.
3. Reassess whether the Product page still has a distinct job.
4. Consolidate only when persistent data shows the distinction is not working.

Do not react to a few early impressions by adding more pages or reversing the architecture.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Product pages still sound like services | Enforce title/H1 boundaries and route commercial questions to the service owner. |
| Service pages look like repetitive SEO templates | Give each page a distinct buyer argument and visual proof surface; avoid a generic page generator. |
| Redirect chains or dead destinations | Ship routes and direct redirects atomically; extend route verification. |
| Stale top-level source pages confuse maintenance | Remove them after canonical destination and redirect checks pass. |
| Homepage scope expands into a demo redesign | Apply only the exact metadata, compact routing, canonical-link normalization, and one gallery link-target/label delta; preserve every scene and behavior. |
| Missing customer proof weakens conversion | Label designed artifacts honestly and replace them with real evidence after the first engagement. |
| Private pricing becomes evasive copy | Explain positively that the review determines requirements, scope, and the commercial proposal. |
| Vancouver page creates false local signals | Gate publication on verified location, service-area, profile, and in-person facts. |
| Permanent redirect needs rollback | Prepare and route-test a forward-fix artifact; prohibit rollback to a deployment that lacks cached destinations. |

## Expected file changes

### Create for the national release

- `src/app/services/ai-automation/page.tsx`
- `src/app/services/ai-implementation/page.tsx`
- `src/app/services/managed-ai/page.tsx`
- Route-specific styles or components only where required by the approved designs

### Modify for the national release

- `src/app/page.tsx` — approved metadata, Product-link normalization, and compact service routing only
- `src/app/product/page.tsx`
- `src/app/product/agents/page.tsx`
- `src/app/product/security/page.tsx`
- `src/app/product/compare-ai-agent-approaches/page.tsx`
- `src/app/use-cases/page.tsx`
- `src/components/homepage-workflow-gallery.tsx` — one link target and label only
- `src/components/site-navigation-data.ts`
- `src/components/desktop-site-navigation.tsx`
- `src/components/mobile-site-menu.tsx`
- `src/components/site-shell.tsx`
- `src/config/site-routes.mjs`
- `scripts/check-routes.mjs`
- Shared styles only as demonstrated necessary

### Create as release-control artifacts

- `docs/seo-commercial-claims-register.md`
- `docs/seo-redirect-preflight.md`
- `docs/seo-post-launch-query-page-review.md`
- Release note identifying the base commit, preserved dirty-worktree changes, deployment owner, backup reviewer, production candidate, and tested fallback artifact

### Remove after migration verification

- `src/app/product/managed-operations/page.tsx`
- `src/app/security/page.tsx`
- `src/app/compare-ai-agent-approaches/page.tsx`
- Unused route-local assets belonging only to the stale source pages

### Create later for the local release

- `src/app/locations/vancouver/page.tsx`
- Local route styles or components as required

`src/app/sitemap.ts`, `src/app/robots.ts`, and `src/lib/seo.ts` should be modified only if implementation proves the current generic behavior insufficient. Do not change them preemptively.

## Review decisions

The implementation can proceed when the following are approved:

1. **Architecture:** Keep both Service and Product; consolidate only Managed Operations.
2. **Managed URL:** `/services/managed-ai` becomes canonical and `/product/managed-operations` redirects.
3. **Security URL:** `/product/security` is canonical; `/security` remains a permanent redirect.
4. **Navigation:** Add mutually exclusive Services and Product menus; remove Managed Operations from Product.
5. **Homepage boundary:** Use the exact metadata/link delta; no gallery scene, visual, behavior, or narrative redesign.
6. **Legacy `/docs`:** Apply the evidence protocol before coding; use `/product` when no material data exists.
7. **Release shape and recovery:** One atomic national release; forward-fix-only after permanent redirects; Vancouver follows separately.
8. **Copy and claims gate:** Review final route-normalized copy and approve operational commitments before they enter code.
9. **Evidence posture:** Illustrative artifacts remain labeled until real customer evidence exists; pre-existing homepage claims are not ratified by this release.

## Definition of done

The national implementation is complete when:

- The three service pages are live, indexable, self-canonical, and in the sitemap.
- Managed Operations has one canonical service owner and one direct permanent redirect from the retired Product URL.
- Product overview, Agents, Security, and Comparison remain distinct indexable proof or decision pages.
- Final route-normalized copy and the operational claims register are approved; no unapproved support, reporting, geographic, retention, monitoring, or pricing commitment is public.
- No fixed, minimum, or starting Worktree price appears on a public page.
- Header, mobile menu, footer, homepage, Product, and supporting pages link directly to canonical destinations.
- No internal link targets a redirect source.
- The exhaustive route inventory and rendered-link crawl pass, including direct redirect destinations, unique titles and descriptions, canonical tags, JSON-LD, sitemap inclusion/exclusion, and intended noindex routes.
- Route, lint, build, responsive, navigation, metadata, canonical, sitemap, and preview-noindex checks pass.
- The `/docs` evidence note records the redirect decision before implementation.
- The tested forward-fix artifact and release owner are recorded before permanent redirects ship.
- The pre-launch Search Console baseline and post-launch review cadence are recorded.
- Vancouver remains unpublished until its separate release gate is satisfied.
