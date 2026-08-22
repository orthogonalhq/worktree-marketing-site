# Worktree SEO query-to-URL map

Status: Approved Phase 3 architecture  
Last updated: 2026-08-21

## Purpose

This document assigns each ratified search intent to one responsible page. It translates `docs/seo-query-priorities.md` into a site architecture without allowing keywords to override Worktree's approved positioning, buyer, evidence standards, or copy voice.

This is a page-ownership decision, not a copy draft or implementation authorization. Page briefs and copy follow after this map is approved.

## Governing decisions

- The homepage owns the relationship and category position.
- Commercial service pages own measurable acquisition queries.
- The first release does not create a `/services` hub. The homepage already performs the routing job, and a thin parent page would add overlap without a distinct buyer intent.
- Product pages prove how the service is delivered; they do not compete for the same commercial head terms.
- One substantive Vancouver page owns the local intent.
- The security page owns the broad security and governance authority cluster.
- One cost guide owns cost, pricing-driver, and ROI research rather than scattering those topics across commercial pages.
- `AI integration services` remains inside the implementation cluster for the first complete test. It should split only if Search Console and SERP evidence later show a distinct buyer job.
- Exact-match wording does not determine the URL, headline, or copy sequence. The page must first satisfy the buyer's intent and Worktree's factual offer.

## Commercial page owners

### Homepage and category

| Field | Decision |
| --- | --- |
| Target URL | `/` |
| Route action | Retain and reposition metadata and copy around the approved category job. |
| Primary query cluster | `AI implementation partner` |
| Supporting queries | `AI implementation company`; `agentic AI services`; selected brand and managed-deployment language |
| Search intent | Commercial provider and relationship evaluation |
| Page job | Establish Worktree as the hands-on partner that identifies, implements, and remains accountable for a valuable AI-enabled workflow. Route buyers to the correct service path. |
| Target buyer state | The buyer believes AI could improve operations but may not know the correct workflow, implementation scope, or operating model. |
| Required evidence | Clear engagement model; named implementation stages; real people and accountability; product-level controls; initial proof or deployment artifacts; accurate US and Canadian availability. |
| Primary CTA | Start a deployment review at `/deploy`. |
| Required links | Three national service pages; `/use-cases`; `/product/security`; `/product/compare-ai-agent-approaches`; `/locations/vancouver`; `/product`. |
| Canonical and indexation | Self-canonical; indexable; included in sitemap. |

The homepage should not attempt to rank independently for all three service clusters. It introduces them and passes authority to their owners.

### AI implementation

| Field | Decision |
| --- | --- |
| Target URL | `/services/ai-implementation` |
| Route action | Create a commercial service page. |
| Primary query cluster | `AI implementation services` |
| Supporting queries | `AI agent implementation services`; `AI agent deployment services`; `AI integration services`; `AI implementation company`; `enterprise AI implementation services`; `AI implementation partner` |
| Search intent | Commercial provider evaluation for planning, integrating, testing, and launching AI in a real operation |
| Page job | Show how Worktree takes one suitable workflow from operational understanding through system integration, controls, testing, deployment, training, and acceptance. |
| Target buyer state | The buyer has a workflow, opportunity, pilot, or executive mandate and needs a provider capable of reaching controlled production. |
| Required evidence | Workflow map; systems and data dependencies; access and approval design; evaluation cases; deployment checklist; ownership boundaries; integration examples only when verified; first case study when available. |
| Primary CTA | Start an implementation review at `/deploy`. |
| Parent and sibling links | `/`; `/services/ai-automation`; `/services/managed-ai`; `/product/security`; `/use-cases`; `/product`; `/blog/ai-automation-cost`. |
| Canonical and indexation | Self-canonical; indexable; include in sitemap. |

`AI integration services` remains a supporting phrase here because integration is one implementation stage rather than a separate Worktree offer. Do not create `/services/ai-integration` during the first test.

### AI automation

| Field | Decision |
| --- | --- |
| Target URL | `/services/ai-automation` |
| Route action | Create a commercial service page. |
| Primary query cluster | `AI automation services` |
| Supporting queries | `AI workflow automation services`; `business automation services`; `business workflow automation`; `AI business process automation`; `AI automation agency` as comparison language only |
| Search intent | Commercial provider evaluation for reducing recurring manual work across business systems |
| Page job | Help an operations buyer recognize the right workflow, understand how automation fits around people and systems, and see why controlled implementation matters. |
| Target buyer state | The buyer sees repetitive work, delays, handoffs, or re-entry but may not have decided whether the answer is an agent, automation, process change, or system integration. |
| Required evidence | Concrete workflow examples; before-state; event, inputs, systems, actions, approvals, exceptions, and outputs; baseline method; measured result when real; implementation controls. |
| Primary CTA | Review a workflow at `/deploy`. |
| Parent and sibling links | `/`; `/services/ai-implementation`; `/services/managed-ai`; `/use-cases`; `/product/security`; `/blog/ai-automation-cost`; `/product/agents`. |
| Canonical and indexation | Self-canonical; indexable; include in sitemap. |

This page may acknowledge that buyers search for an `AI automation agency`, but Worktree should describe itself as an implementation and operating partner.

### Managed AI service

| Field | Decision |
| --- | --- |
| Target URL | `/services/managed-ai` |
| Route action | Create a commercial service page. Reposition the existing product page as proof rather than using it as the commercial owner. |
| Primary query cluster | `managed AI services` |
| Supporting queries | `managed AI operations`; `AI agent monitoring`; `AI agent maintenance`; `AI agent evaluation`; managed workflow and ongoing-support language |
| Search intent | Commercial evaluation of ongoing operation, monitoring, support, evaluation, and improvement after deployment |
| Page job | Define what Worktree actually does after launch and distinguish managed workflow operation from generic cloud infrastructure, MLOps, and unsupported 24/7 service claims. |
| Target buyer state | The buyer has or expects a production workflow and knows that launch does not resolve quality, integration, incident, cost, and change ownership. |
| Required evidence | Supported service window; monitoring and review activities; evaluation method; incident and exception handling; change log or Deployment Record; reporting cadence; clear exclusions; real operating history when available. |
| Primary CTA | Review a managed deployment at `/deploy`. |
| Parent and sibling links | `/`; `/services/ai-implementation`; `/services/ai-automation`; `/product`; `/product/agents`; `/product/security`; `/product/compare-ai-agent-approaches`. |
| Canonical and indexation | Self-canonical; indexable; include in sitemap. |

### Vancouver and Lower Mainland

| Field | Decision |
| --- | --- |
| Target URL | `/locations/vancouver` |
| Route action | Create one substantive local commercial page. Do not create municipality clones. |
| Primary query cluster | `AI automation Vancouver` |
| Supporting queries | `AI services Vancouver`; `AI consulting Vancouver`; `AI implementation company Vancouver`; `AI automation agency Vancouver`; `AI agent development Vancouver`; legitimate `near me` demand through the Business Profile |
| Search intent | Local commercial provider evaluation with a preference for regional credibility or in-person contact |
| Page job | Establish Worktree's genuine Lower Mainland presence and explain the same implementation-and-operation offer in locally relevant terms. |
| Target buyer state | A Vancouver or Lower Mainland operations buyer wants a credible local provider and may use broader consulting, services, agency, or development language. |
| Required evidence | Real operating location and service area; accurate in-person availability; regional industries only where genuinely relevant; local customer evidence and reviews when available; Canadian contracting, privacy, and data-handling facts when verified. |
| Primary CTA | Start a local deployment review at `/deploy` with campaign attribution. |
| Parent and sibling links | `/`; three national service pages; `/about`; `/product/security`; the legitimate Google Business Profile. |
| Canonical and indexation | Self-canonical; indexable; include in sitemap; no regional canonical to a national page; no `hreflang` required for this same-language local page. |

## Supporting and proof routes

These pages remain indexable because they provide distinct buyer value. Their metadata, headings, and internal links must make their supporting job clear so they do not compete with the commercial owners.

| URL | Page job | Query role | Required action | Canonical / indexation |
| --- | --- | --- | --- | --- |
| `/product` | Explain the managed-deployment system, artifacts, and deliverables that substantiate the service. | Navigational and product-proof language such as `managed agent deployment`; no primary commercial cluster. | Retain. Link prominently to implementation and managed-service owners. Avoid positioning it as a fourth general service page. | Self-canonical; indexable; sitemap. |
| `/product/agents` | Show the agent, workflow, tools, approval, and run-history surfaces behind one deployed business role. | Supporting `managed AI agents`, `AI agents for business`, and product-proof language. | Retain and narrow. Avoid targeting `AI agent implementation services`. | Self-canonical; indexable; sitemap. |
| `/use-cases` | Help buyers identify work suitable for a first implementation. | `AI workflow use cases`, workflow examples, and supporting problem discovery. | Retain as a hub. Do not create individual use-case pages until real evidence supports them. | Self-canonical; indexable; sitemap. |
| `/product/security` | Explain Worktree's verified boundaries, permissions, approvals, data handling, review, and recovery posture. | Own `AI agent security`; support `AI agent governance` and secure-deployment questions. | Retain and expand only with verified controls. Service pages should summarize and link here rather than duplicate the detail. Preserve the permanent redirect from `/security`. | Self-canonical; indexable; sitemap. |
| `/product/compare-ai-agent-approaches` | Help buyers choose between packaged, open-source, self-hosted, internal, and managed responsibility models. | Comparison and build-versus-buy intent; supporting operating-cost language. | Move the existing page under `/product`. Replace its internal `/how-it-works` redirect link with a direct service link. Keep product, service, and navigation links pointed at the nested canonical URL. | Self-canonical; indexable; sitemap. The former `/compare-ai-agent-approaches` URL permanently redirects here. |
| `/deploy` | Convert qualified interest into a scoped review. | Conversion destination, not a page-level acquisition target. | Retain. Service and authority pages should use specific CTA context when linking here. | Self-canonical; indexable; sitemap. |
| `/about` | Establish the people, company, location, and accountability behind Worktree. | Brand and trust intent. | Retain. Link to the Vancouver page and commercial owners. | Self-canonical; indexable; sitemap. |
| `/blog` | Organize original research and buyer guidance. | Publication hub, not a commercial cluster owner. | Retain while articles exist. | Self-canonical; indexable; sitemap. |
| `/blog/ibm-ai-transformation-work-redesign` | Demonstrate Worktree's workflow-first operating point of view using carefully sourced analysis. | Informational workflow-design and AI-transformation intent. | Retain. Add contextual links to the automation and implementation pages when copy work begins. | Self-canonical; indexable; sitemap. |

Legal pages remain indexable, self-canonical trust documents and do not receive acquisition queries.

## Approved publication owner

| Field | Decision |
| --- | --- |
| Target URL | `/blog/ai-automation-cost` |
| Route action | Proposed publication after commercial pages and pricing boundaries are established. |
| Primary query | `AI automation cost` |
| Supporting queries | `AI implementation cost`; `AI automation ROI`; cost drivers; implementation pricing; internal versus managed operating cost |
| Search intent | Commercial investigation and business-case development |
| Page job | Explain what creates cost, how scope changes cost, what internal operating work buyers often omit, and how to build an honest measurement case. |
| Required evidence | Verified commercial boundaries; no invented base price; no universal ROI; sourced internal-cost references where used; clear distinction between implementation and ongoing operation. |
| Primary CTA | Start a scoped deployment review at `/deploy`. |
| Required links | Implementation, automation, managed service, comparison, and security pages. |
| Canonical and indexation | Self-canonical; publication indexable when published; include through the blog sitemap mechanism. |

One guide owns both automation and implementation cost initially. Split them only if search data later shows materially different intent and each page can provide distinct evidence.

## Deferred query ownership

| Query or cluster | Initial disposition | Promotion condition |
| --- | --- | --- |
| `AI integration services` | Supporting query on `/services/ai-implementation`. | Split only if Search Console shows material distinct demand and SERPs require a different buyer job or evidence set. |
| `agentic AI services` | Supporting category language on `/` and implementation content. | Promote only if it develops stable commercial intent beyond broad enterprise consulting and trend terminology. |
| `AI automation agency` | Comparison language on the automation page; possible later buyer-decision article. | Promote only if qualified inquiries appear and a distinct comparison page can avoid adopting the agency identity. |
| `AI agent evaluation` | Supporting managed-service and security topic. | Promote when Worktree has an original evaluation method, examples, or tooling worth an independent result. |
| `AI agent monitoring` | Supporting managed-service and product-proof topic. | Promote when real monitoring evidence and a distinct informational intent exist. |
| `AI agent governance` | Supporting security topic. | Promote when Worktree can contribute original, verified governance guidance beyond summarizing larger authorities. |
| `AI agent maintenance` | Supporting managed-service topic. | Promote when SERP intent and operating evidence support an independent guide. |
| Individual workflow or industry queries | Use-cases hub only. | Promote after a real deployment supplies distinct intent, expertise, and customer evidence. |
| Municipality queries outside Vancouver | Vancouver page and Business Profile service area only. | Promote only with real clients, relationships, evidence, or materially different local information. |

## Cannibalization boundaries

| Owner | It may summarize | It must not become |
| --- | --- | --- |
| Homepage | All services and proof surfaces | A duplicate implementation, automation, or managed-service page |
| Implementation service | Workflow selection, integration, deployment, controls, and launch | A broad automation catalogue or detailed ongoing-service page |
| Automation service | Recurring work, workflow diagnosis, automation design, and operational outcomes | A generic no-code agency page or duplicate implementation methodology |
| Managed AI service | Monitoring, evaluation, support, incidents, reporting, and improvement | A generic MLOps, cloud-infrastructure, or platform page |
| Product pages | Concrete machinery and artifacts behind the service | Alternate commercial landing pages targeting the same service terms |
| Security | Verified controls, governance, permissions, approvals, and data boundaries | A claim to be a general cybersecurity vendor |
| Comparison | Responsibility models, tradeoffs, and operating cost | The primary implementation or managed-service sales page |
| Cost guide | Cost drivers, scope, internal effort, measurement, and ROI method | A price list or duplicate commercial landing page |
| Vancouver | Genuine local relevance and the national service offer | A copied national page with place names inserted |

If a supporting product page cannot maintain a distinct page job after copy briefing, the safer decision is consolidation and redirect—not two pages with slightly different vocabulary.

## Internal-link requirements

| Source | Required destinations | Link purpose |
| --- | --- | --- |
| Homepage | Three service owners, use cases, security, comparison, Vancouver, product proof | Distribute authority and let buyers self-select their problem. |
| Implementation | Automation, managed service, security, product overview, use cases, cost guide | Connect build, controls, ongoing ownership, and commercial investigation. |
| Automation | Implementation, managed service, use cases, cost guide, security | Move buyers from problem recognition to delivery and operating confidence. |
| Managed service | Implementation, security, managed-operations proof, comparison | Establish continuity from deployment to operation. |
| Security | Implementation and managed service | Return trust research to the relevant commercial path. |
| Use cases | Automation, implementation, deployment review | Convert workflow recognition into assessment. |
| Comparison | Implementation, managed service, cost guide, use cases | Move decision-stage readers toward the appropriate ownership model. |
| Cost guide | Implementation, automation, managed service, comparison, deployment review | Connect commercial investigation to scope and conversion. |
| Vancouver | Three national services, about, security, deployment review | Combine local credibility with complete service depth. |
| Product proof | The service page each product surface substantiates | Prevent product detail from becoming an isolated or competing acquisition path. |

Anchor text should be descriptive but varied. Exact-match anchors are not required on every link.

## Route-contract and indexation actions for implementation

These are documented consequences of the map, not changes made in this phase:

1. Add the four proposed commercial routes to `src/config/site-routes.mjs` and the sitemap when they exist.
2. Do not add `/services` unless later evidence supports a distinct page job; the nested service URLs do not require an indexable parent route.
3. Add `/product/compare-ai-agent-approaches` to the indexable route contract and sitemap with self-canonical metadata.
4. Preserve the permanent redirect from `/compare-ai-agent-approaches` to `/product/compare-ai-agent-approaches`, and replace repository-internal links with the canonical destination.
5. Consolidate `/product/managed-operations` into `/services/managed-ai`, redirect the retired Product URL directly, and remove it from the sitemap and navigation.
6. Keep `/deploy/book`, `/deploy/thanks`, `/partners`, `/partners/[slug]`, `/prism-wave-prototype`, `/wave-prototype`, and `/ribbon-renderer` out of the index and classify them in the route contract.
7. Preserve `/book` to `/deploy/book` and `/resources` to `/use-cases`. Resolve `/docs` through the implementation preflight; use `/product` when no backlink or analytics evidence supports a more specific destination.
8. Change the `/how-it-works` redirect destination to `/services/ai-implementation` after that page launches, and replace repository-internal links with direct canonical links.
9. Keep only canonical, intended indexable URLs in the sitemap.

## Acceptance criteria

This map is ready for page briefing when:

- Each ratified page-owning query has exactly one responsible URL.
- `AI integration services` is explicitly contained within implementation for the first test.
- Product and service pages have distinct jobs.
- Local intent has one substantive owner and no municipality doorway plan.
- Cost, security, and managed-operation authority queries have owners without multiplying pages prematurely.
- Every proposed indexable route has a canonical and sitemap decision.
- Redirect and noindex consequences are recorded before implementation.

## Next deliverable after approval

Create page briefs for the homepage, three national service pages, and Vancouver page using `docs/customer-centric-sales-copy-posture.md`. Briefs should define the buyer question, desired operational change, authoritative facts, available evidence, boundaries, CTA, and relationship to adjacent pages before copy is written.
