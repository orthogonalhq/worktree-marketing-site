import type { Metadata } from "next";
import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Our AI Workflow Engineering Team",
  description:
    "Learn how Worktree helps established teams implement and manage AI workflows. Worktree is operated by Orthogonal Labs Inc. in British Columbia, Canada.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="about-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">About Worktree</p>
            <h1 id="about-heading" className="worktree-type-page-title mt-5">Managed workflows for real operational work.</h1>
            <p className="worktree-type-lead mt-6">Worktree is operated by Orthogonal Labs Inc., a company based in British Columbia, Canada. We help teams turn recurring business processes into managed agent workflows.</p>
            <p className="worktree-type-body mt-4">For local service information, explore Worktree&apos;s <Link className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/locations/vancouver">AI automation services in Vancouver and the Lower Mainland</Link>.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="about-approach">
              <h2 id="about-approach" className="worktree-type-card-title">How we work</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Worktree starts with a focused workflow that a team already understands but still handles manually. We help map the process, connect the relevant systems, define where approval belongs, and build the managed workflow around that work.</p>
                <p>Our aim is practical operational progress: a workflow that can gather context, prepare work, route decisions, and keep the process moving with the right human involvement.</p>
              </div>
            </section>

            <section aria-labelledby="about-start">
              <h2 id="about-start" className="worktree-type-card-title">Start with one workflow</h2>
              <p className="worktree-type-body mt-4">We do not begin by promising automation for every department. We begin with one recurring workflow that is important enough to improve and structured enough to evaluate.</p>
            </section>

            <section aria-labelledby="about-examples">
              <h2 id="about-examples" className="worktree-type-card-title">A note on examples</h2>
              <p className="worktree-type-body mt-4">The workflow examples and visual demonstrations on this site are illustrative. They show the kind of operational work Worktree is designed to discuss, not a promise of a particular customer outcome.</p>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="about-contact">
              <h2 id="about-contact" className="worktree-type-card-title">Contact</h2>
              <p className="worktree-type-body mt-4">For general or privacy questions, contact Orthogonal Labs Inc. at <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl">hello@orthg.nl</a>. We do not publish a public office address.</p>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
