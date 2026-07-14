import type { Metadata } from "next";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms | Worktree",
  description: "Terms for using the public Worktree website.",
};

export default function TermsPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="terms-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">Terms</p>
            <h1 id="terms-heading" className="worktree-type-page-title mt-5">Terms for this public website.</h1>
            <p className="worktree-type-lead mt-6">These terms apply to your use of the Worktree website, operated by Orthogonal Labs Inc. They do not set commercial terms for customer deployments.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="terms-use">
              <h2 id="terms-use" className="worktree-type-card-title">Using the site</h2>
              <p className="worktree-type-body mt-4">You may use this site for lawful, informational purposes. Do not interfere with its operation, attempt unauthorized access, use it in a way that harms others, or misrepresent your relationship with Worktree or Orthogonal Labs Inc.</p>
            </section>

            <section aria-labelledby="terms-information">
              <h2 id="terms-information" className="worktree-type-card-title">Information, examples, and demos</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>The site describes Worktree&apos;s approach to managed business-agent workflows. It is informational only and is not an offer to provide services or legal, commercial, financial, or other professional advice.</p>
                <p>Visual workflow demonstrations and examples are illustrative. They do not represent a live customer deployment, a guaranteed outcome, or a promise that a workflow will be suitable for a particular use.</p>
              </div>
            </section>

            <section aria-labelledby="terms-engagements">
              <h2 id="terms-engagements" className="worktree-type-card-title">Customer engagements</h2>
              <p className="worktree-type-body mt-4">Any customer deployment, including its scope, data handling, commercial terms, and responsibilities, must be set out in a separate written agreement. This website does not create a customer service agreement.</p>
            </section>

            <section aria-labelledby="terms-availability">
              <h2 id="terms-availability" className="worktree-type-card-title">Availability and changes</h2>
              <p className="worktree-type-body mt-4">We may change, suspend, or remove website content or functionality. We provide the site as available and do not promise that it will always be complete, current, secure, or uninterrupted.</p>
            </section>

            <section aria-labelledby="terms-law">
              <h2 id="terms-law" className="worktree-type-card-title">Governing law</h2>
              <p className="worktree-type-body mt-4">These website terms are governed by the laws of British Columbia and the applicable federal laws of Canada.</p>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="terms-contact">
              <h2 id="terms-contact" className="worktree-type-card-title">Questions</h2>
              <p className="worktree-type-body mt-4">Last updated July 13, 2026. Contact Orthogonal Labs Inc. at <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl?subject=Website%20terms">hello@orthg.nl</a> with questions about these website terms.</p>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
