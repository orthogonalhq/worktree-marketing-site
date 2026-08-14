import type { Metadata } from "next";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy | Worktree",
  description: "How Worktree handles deployment inquiries and customer workflow data.",
};

export default function PrivacyPage() {
  return (
    <WorktreeShell>
      <section className="section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="privacy-heading">
        <div className="mx-auto max-w-4xl">
          <header className="max-w-3xl border-b border-[var(--nous-stroke-subtle)] pb-12">
            <p className="worktree-type-eyebrow">Privacy</p>
            <h1 id="privacy-heading" className="worktree-type-page-title mt-5">A clear view of the data we handle.</h1>
            <p className="worktree-type-lead mt-6">This notice describes how Worktree, operated by Orthogonal Labs Inc., handles information submitted through this site and data used in customer workflow deployments.</p>
          </header>

          <div className="mt-12 space-y-12">
            <section aria-labelledby="privacy-controller">
              <h2 id="privacy-controller" className="worktree-type-card-title">Who is responsible</h2>
              <p className="worktree-type-body mt-4">Orthogonal Labs Inc. operates Worktree. We are based in British Columbia, Canada. For privacy questions or requests, contact us at <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl">hello@orthg.nl</a>.</p>
            </section>

            <section aria-labelledby="privacy-collect">
              <h2 id="privacy-collect" className="worktree-type-card-title">Information we handle</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>When you submit a deployment inquiry, we handle the contact details and workflow information you provide, such as your name, work email, company, process description, systems involved, and timing. Deployment inquiries are stored in Supabase.</p>
                <p>When we work with a customer, we may process workflow data needed to configure, test, operate, or support the agreed workflow. The data involved depends on the systems and workflow the customer chooses to connect.</p>
              </div>
            </section>

            <section aria-labelledby="privacy-use">
              <h2 id="privacy-use" className="worktree-type-card-title">How we use it</h2>
              <p className="worktree-type-body mt-4">We use deployment inquiry information to evaluate the workflow, respond to the inquiry, and prepare relevant follow-up. We use customer workflow data to provide the customer&apos;s requested workflow deployment and related support.</p>
            </section>

            <section aria-labelledby="privacy-processors">
              <h2 id="privacy-processors" className="worktree-type-card-title">Service providers and model processing</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Supabase stores deployment inquiries submitted through this site. Customer workflow data may be processed with OpenAI when that processing is part of the customer workflow.</p>
                <p>Worktree does not train models on prospect or customer data.</p>
              </div>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2 id="privacy-retention" className="worktree-type-card-title">Your information and access stay under your control</h2>
              <div className="worktree-type-body mt-4 space-y-4">
                <p>Unless a customer agreement sets a specific retention period, information remains available until a verified deletion request is completed. We delete information on every verified deletion request.</p>
                <p>When a managed deployment ends, Worktree provides the final Deployment Record and agreed customer-owned exports, revokes or deletes its delegated credentials, and disconnects managed integrations and runtime access. Retained customer data is handled under the agreed export, deletion, retention, and backup policy.</p>
                <p>To make a request, email <a className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="mailto:hello@orthg.nl?subject=Privacy%20request">hello@orthg.nl</a> from an address that lets us verify the request.</p>
              </div>
            </section>

            <section className="border-t border-[var(--nous-stroke-subtle)] pt-8" aria-labelledby="privacy-scope">
              <h2 id="privacy-scope" className="worktree-type-card-title">Scope of this notice</h2>
              <p className="worktree-type-body mt-4">Last updated August 12, 2026. This notice describes our current public-site and workflow data practices. It is informational and does not replace any separate written agreement that applies to a customer deployment.</p>
            </section>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
