import type { Metadata } from "next";
import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Workflow Received | Worktree",
  description: "Your Worktree deployment questionnaire has been received.",
  robots: { index: false, follow: false },
};

export default function DeployThanksPage() {
  return (
    <WorktreeShell>
      <section className="coming-soon-section" aria-labelledby="deploy-thanks-heading">
        <div className="coming-soon-inner deploy-thanks-inner mx-auto max-w-7xl">
          <div className="deploy-thanks-copy">
            <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">Workflow received</p>
            <h1 id="deploy-thanks-heading">We’ll follow up by email.</h1>
            <p>Your deployment questionnaire has been received. We review the process, systems, frequency, and timing so we can follow up with the right next step.</p>
          </div>

          <div className="deploy-thanks-steps" aria-label="What happens next">
            {[
              ["01", "Review the workflow", "We look at the process you described, how often it runs, and where it fits in the business."],
              ["02", "Prepare the context", "We organize the systems, timing, and deployment signals so follow-up is specific."],
              ["03", "Email the next step", "We follow up with the right path forward instead of sending a generic sales reply."],
            ].map(([number, title, copy]) => (
              <div className="deploy-thanks-step" key={number}>
                <span className="managed-quality-index"><span>[</span><strong>{number}</strong><span>]</span></span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="coming-soon-actions">
            <Link href="/">Back to homepage</Link>
            <a href="mailto:hello@orthg.nl?subject=Workflow%20context">Send more context</a>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
