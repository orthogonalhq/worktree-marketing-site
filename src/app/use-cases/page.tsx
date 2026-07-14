import type { Metadata } from "next";
import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Workflow Use Cases | Worktree",
  description: "Illustrative recurring business workflows that teams can evaluate with Worktree.",
};

export default function UseCasesPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">Use cases</p>
            <h1 id="use-cases-heading" className="worktree-type-page-title mt-5">Start with the recurring work your team already understands.</h1>
            <p className="worktree-type-lead mt-6">Worktree begins with one recurring workflow. Together, we map how that work moves through its process, systems, and approvals, then build a managed workflow around it.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="use-cases-start">
              <h2 id="use-cases-start" className="worktree-type-card-title">A practical place to start</h2>
              <p className="worktree-type-body mt-4">A first workflow has a rhythm the team can describe: what starts the work, which systems hold the relevant context, what needs to be prepared, and where approval belongs. Mapping those details gives the managed workflow a clear foundation.</p>
            </section>

            <section aria-labelledby="use-cases-examples">
              <h2 id="use-cases-examples" className="worktree-type-card-title">Illustrative workflow examples</h2>
              <p className="worktree-type-body mt-4">These examples are illustrative. They describe the kinds of recurring work a team might choose to map, not customer deployments or promised outcomes.</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <article className="border-t border-[var(--nous-stroke-subtle)] pt-5">
                  <h3 className="worktree-type-card-title">Operational follow-through</h3>
                  <p className="worktree-type-body mt-3">A routine may gather status from the relevant systems, prepare the next step, and route it for review when approval is needed.</p>
                </article>
                <article className="border-t border-[var(--nous-stroke-subtle)] pt-5">
                  <h3 className="worktree-type-card-title">Account preparation</h3>
                  <p className="worktree-type-body mt-3">A recurring customer touchpoint may begin with context gathered from the systems the team already uses, followed by material prepared for human review.</p>
                </article>
                <article className="border-t border-[var(--nous-stroke-subtle)] pt-5">
                  <h3 className="worktree-type-card-title">Internal coordination</h3>
                  <p className="worktree-type-body mt-3">A repeatable handoff may collect the needed information, prepare an update or draft, and make the required approval visible before the work moves on.</p>
                </article>
                <article className="border-t border-[var(--nous-stroke-subtle)] pt-5">
                  <h3 className="worktree-type-card-title">Recurring reporting</h3>
                  <p className="worktree-type-body mt-3">A regular reporting routine may assemble inputs from relevant systems and prepare a report for the team to evaluate and approve.</p>
                </article>
              </div>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="use-cases-next">
              <h2 id="use-cases-next" className="worktree-type-card-title">From example to managed workflow</h2>
              <p className="worktree-type-body mt-4">After the process is mapped, Worktree builds the managed workflow and evaluates it after launch. What the evaluation shows informs focused improvements to the workflow.</p>
              <Link className="mt-6 inline-block text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/deploy">Start a workflow review</Link>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
