import type { Metadata } from "next";
import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "How Worktree Works | Worktree",
  description: "How Worktree turns one recurring business process into a managed workflow and improves it after launch.",
};

export default function HowItWorksPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">How it works</p>
            <h1 id="how-it-works-heading" className="worktree-type-page-title mt-5">From one recurring process to a managed workflow.</h1>
            <p className="worktree-type-lead mt-6">Worktree starts with a focused workflow, captures its operating definition in a Consultation Blueprint, builds the managed capability, then records evaluations and improvements after launch.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="how-it-works-select">
              <p className="worktree-type-eyebrow">01</p>
              <h2 id="how-it-works-select" className="worktree-type-card-title mt-3">Choose one recurring workflow</h2>
              <p className="worktree-type-body mt-4">The work begins with a routine the team already performs. Starting with one workflow keeps the focus on understanding the real process and the work that needs to move through it.</p>
            </section>

            <section aria-labelledby="how-it-works-map">
              <p className="worktree-type-eyebrow">02</p>
              <h2 id="how-it-works-map" className="worktree-type-card-title mt-3">Map the process, systems, and approvals</h2>
              <p className="worktree-type-body mt-4">Worktree maps how the workflow starts, the systems and rules it relies on, the points where approval belongs, the risks, and the definition of success. These decisions become the Consultation Blueprint.</p>
            </section>

            <section aria-labelledby="how-it-works-build">
              <p className="worktree-type-eyebrow">03</p>
              <h2 id="how-it-works-build" className="worktree-type-card-title mt-3">Build the managed workflow</h2>
              <p className="worktree-type-body mt-4">Worktree builds, connects, tests, and deploys the agent and workflow around the agreed Blueprint. Acceptance establishes the evaluation baseline and initializes the Deployment Record.</p>
            </section>

            <section aria-labelledby="how-it-works-improve">
              <p className="worktree-type-eyebrow">04</p>
              <h2 id="how-it-works-improve" className="worktree-type-card-title mt-3">Evaluate and improve after launch</h2>
              <p className="worktree-type-body mt-4">After launch, Worktree evaluates the workflow and uses what is learned to make focused improvements. The Deployment Record is updated monthly with performance, material changes, limitations, risks, and next actions.</p>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="how-it-works-example">
              <h2 id="how-it-works-example" className="worktree-type-card-title">Illustrative path</h2>
              <p className="worktree-type-body mt-4">Illustratively, a team may begin with a recurring request, map the systems that hold its context and the approval it needs, then build and evaluate the managed workflow around that routine. The details are determined by the workflow being mapped.</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <Link className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/product">See what the deployment includes</Link>
                <Link className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/deploy">Start a workflow review</Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
