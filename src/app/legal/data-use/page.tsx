import type { Metadata } from "next";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Data Use | Worktree",
  description: "How Worktree uses deployment inquiry and customer workflow data.",
};

export default function DataUsePage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="data-use-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">Data use</p>
            <h1 id="data-use-heading" className="worktree-type-page-title mt-5">Data is used for the workflow it supports.</h1>
            <p className="worktree-type-lead mt-6">Worktree uses information to assess deployment inquiries and to provide customer workflow deployments. This page explains those uses in direct terms.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="data-use-inquiries">
              <h2 id="data-use-inquiries" className="worktree-type-card-title">Deployment inquiries</h2>
              <p className="worktree-type-body mt-4">Information submitted through the deployment form is used to understand the workflow you describe, assess whether Worktree may be a fit, and follow up with you. Those inquiries are stored in Supabase.</p>
            </section>

            <section aria-labelledby="data-use-workflow">
              <h2 id="data-use-workflow" className="worktree-type-card-title">Customer workflow data</h2>
              <p className="worktree-type-body mt-4">Customer workflow data is used to configure, test, operate, and support the customer&apos;s requested workflow. The data processed depends on the workflow and the systems the customer chooses to connect.</p>
            </section>

            <section aria-labelledby="data-use-models">
              <h2 id="data-use-models" className="worktree-type-card-title">Model processing</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Customer workflow data may be processed with OpenAI when that processing is part of the workflow. Worktree does not train models on prospect or customer data.</p>
              </div>
            </section>

            <section aria-labelledby="data-use-retention">
              <h2 id="data-use-retention" className="worktree-type-card-title">Customer control and offboarding</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Unless a customer agreement sets a specific retention period, information remains available until a verified deletion request is completed. Worktree deletes information on every verified deletion request.</p>
                <p>When a managed deployment ends, the customer receives the final Deployment Record and agreed customer-owned exports. Worktree revokes or deletes its delegated credentials, disconnects managed integrations and runtime access, and handles retained customer data under the agreed export, deletion, retention, and backup policy.</p>
                <p>Send requests or questions to <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl?subject=Data%20use%20request">hello@orthg.nl</a>.</p>
              </div>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="data-use-context">
              <h2 id="data-use-context" className="worktree-type-card-title">Context for this page</h2>
              <p className="worktree-type-body mt-4">Last updated August 12, 2026. This is a factual summary of current data use, not contractual or legal advice. A customer deployment may have additional written terms that apply to that engagement.</p>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
