# Homepage SEO implementation delta

Status: Proposed exact delta for coordinated review  
Target URL: `/`  
Last updated: 2026-08-21

## Scope

This document replaces the superseded full homepage copy proposal. It authorizes only metadata, canonical-link normalization, one compact service-routing element, and a link-target/label correction inside the existing gallery. It does not authorize new gallery scenarios, scene copy, visual changes, behavioral changes, or narrative restructuring.

`docs/homepage-narrative-strategy.mdx` remains authoritative for the homepage.

## SEO fields

- **Proposed title:** AI Implementation Partner for Managed Workflows | Worktree
- **Proposed meta description:** Worktree works alongside established US and Canadian businesses to implement and manage AI workflows with clear controls and ongoing engineering support.
- **Canonical:** `/`
- **Primary query:** `AI implementation partner`
- **Search intent:** Provider, relationship, and category evaluation

The title and description require copy approval before implementation. Do not add the three service head terms to the title or H1.

## Exact public-copy delta

### Hero

Keep the existing eyebrow, H1, lead, CTA labels, layout, and display.

Normalize the existing Product links from `/product/` to `/product`. No hero narrative rewrite is included in this release.

### Service-routing element

Add one compact routing element inside the existing Infrastructure/Product credibility chapter, after the current proof list and before the chapter exits to Product.

**Label:** Worktree services

**Intro:** Start with the part of the operating problem you already understand.

- **Choose the workflow:** AI automation services → `/services/ai-automation`
- **Put it into production:** AI implementation services → `/services/ai-implementation`
- **Keep it operating:** Managed AI services → `/services/managed-ai`

The element routes buyers; it is not a new standalone homepage chapter and must not duplicate the service-page methods.

### Existing gallery link correction

In `src/components/homepage-workflow-gallery.tsx`, change only the current `/docs` link and its label:

- **Current:** Read developer documentation → `/docs`
- **Proposed:** Explore the Worktree Product → `/product`

This is a link-target and label correction only. Do not alter the containing scene, claims, layout, interaction, media, or visual behavior.

### Vancouver

Do not add a Vancouver link during the national release. Add the local link only when `/locations/vancouver` has passed its separate publication gate and is live.

## Explicitly excluded

- Gallery scenario replacement.
- Gallery scene rewriting.
- New regulated-domain examples.
- New security claims or changes to existing gallery security claims.
- Gallery visual or interaction changes.
- Homepage chapter reordering.
- Customer-story placeholders or substitutes.
- A new generic services chapter.

The current gallery contains pre-existing security and regulated-domain assertions. This SEO release does not ratify, expand, or remediate those claims. They remain a deferred content and product-evidence review outside this implementation scope.

## Expected files

- `src/app/page.tsx` — metadata, Product-link normalization, and compact service routing.
- `src/components/homepage-workflow-gallery.tsx` — one link target and label only.
- Existing homepage styles only if the compact routing element cannot be expressed with current primitives.

## Acceptance criteria

- Existing H1, gallery scenarios, chapter order, and gallery behavior are unchanged.
- The homepage links directly to all three canonical service owners.
- No homepage link targets `/docs`, `/product/managed-operations`, `/security`, or another redirect source.
- `/product/` variants are normalized to `/product`.
- The service-routing element reads as navigation, not a duplicate service section.
- No Vancouver link appears before the local route is live.
