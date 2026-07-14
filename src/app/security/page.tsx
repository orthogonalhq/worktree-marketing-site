import type { Metadata } from "next";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Security | Worktree",
  description: "A factual overview of Worktree workflow controls and data handling.",
};

export default function SecurityPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="security-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">Security</p>
            <h1 id="security-heading" className="worktree-type-page-title mt-5">Security starts with workflow boundaries.</h1>
            <p className="worktree-type-lead mt-6">Worktree is a managed deployment service for business-agent workflows. The appropriate controls depend on the workflow, the systems involved, and the actions the workflow is intended to take.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="security-design">
              <h2 id="security-design" className="worktree-type-card-title">Workflow-specific control design</h2>
              <p className="worktree-type-body mt-4">Before a workflow is deployed, Worktree works with the customer to map the process, identify the systems involved, define the workflow&apos;s intended scope, and determine where human approval belongs. A deployment is not a claim that every business process should be automated.</p>
            </section>

            <section aria-labelledby="security-approvals">
              <h2 id="security-approvals" className="worktree-type-card-title">Human review</h2>
              <p className="worktree-type-body mt-4">Where a workflow needs human judgment or authority, approval points can be defined as part of the deployment. The appropriate review process is determined with the customer for the particular workflow.</p>
            </section>

            <section aria-labelledby="security-data">
              <h2 id="security-data" className="worktree-type-card-title">Data handling</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Deployment inquiries submitted through this site are stored in Supabase. Customer workflow data may be processed with OpenAI when that processing is part of the customer workflow.</p>
                <p>Worktree does not train models on prospect or customer data. Information is retained indefinitely by default and deleted on every verified deletion request.</p>
              </div>
            </section>

            <section aria-labelledby="security-evaluation">
              <h2 id="security-evaluation" className="worktree-type-card-title">Security evaluation</h2>
              <p className="worktree-type-body mt-4">We do not make public claims about certifications, compliance programs, or security guarantees that are not described here. Customers evaluating a deployment can discuss the workflow, connected systems, data handling, and approval design with us directly.</p>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="security-contact">
              <h2 id="security-contact" className="worktree-type-card-title">Questions and requests</h2>
              <p className="worktree-type-body mt-4">Last updated July 13, 2026. For security or data-handling questions, or to submit a verified deletion request, contact Orthogonal Labs Inc. at <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl?subject=Security%20question">hello@orthg.nl</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
