import type { Metadata } from "next";
import Link from "next/link";
import { Fingerprint } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./product-overview.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Agent Infrastructure and Operating Controls",
  description: "See how Worktree defines agent roles, scopes access, records operating evidence, and keeps each deployment understandable after launch.",
  path: "/product",
});

const securityControls = [
  ["Access", "The systems, data, and tools the agent can use are scoped to the job."],
  ["Authority", "Approvals and escalation rules define what the agent may change on its own."],
  ["Execution", "Sensitive context can be authorized for one agent execution rather than left broadly available."],
  ["Removal", "Delegated access can be disconnected and retained customer data removed at verified request."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={styles.deepLink} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function ProductPage() {
  return (
    <WorktreeShell>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="product-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>The Worktree product</Eyebrow>
              <h1 id="product-heading">The complete system for putting agents to work.</h1>
              <p>Worktree brings each agent, its workflow, access boundaries, approvals, and operating evidence into one system your team can understand and review.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
                <SecondaryLink href="#agents">Explore the system</SecondaryLink>
              </div>
            </div>

            <div className={styles.heroSystem} aria-label="The three parts of the Worktree product">
              <div className={styles.heroSystemHeader}>
                <span>Deployment system</span>
                <span><i /> Controls active</span>
              </div>
              <ol>
                <li><Link href="/product/agents"><span>01</span><strong>Agent and workflow</strong><em>Role defined</em><b aria-hidden="true">→</b></Link></li>
                <li><Link href="/product/security"><span>02</span><strong>Access and authority</strong><em>Boundaries visible</em><b aria-hidden="true">→</b></Link></li>
                <li><Link href="#operating-evidence"><span>03</span><strong>Operating evidence</strong><em>Changes recorded</em><b aria-hidden="true">↓</b></Link></li>
              </ol>
              <div className={styles.heroSystemFooter}>
                <span>One reviewable system</span>
                <strong>From instructions to operating history</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="agents" className={styles.agentsSection} aria-labelledby="agents-heading">
          <div className={styles.sectionInner}>
            <div className={styles.splitIntro}>
              <div>
                <Eyebrow>Agents and workflows</Eyebrow>
                <h2 id="agents-heading">Give the agent a real job, not an open-ended prompt.</h2>
              </div>
              <div>
                <p>The workflow defines what starts the work, which context the agent may gather, the routine it should follow, and the moments that need a person. That makes the deployment understandable to the team using it.</p>
                <DeepLink href="/product/agents">See how Worktree Agents work</DeepLink>
              </div>
            </div>

            <div className={styles.agentEvidence} aria-label="An example of a defined agent workflow">
              <header>
                <div><span>WT</span><p><small>Worktree agent</small>Operations coordinator</p></div>
                <strong><i /> Available to the team</strong>
              </header>
              <div className={styles.agentEvidenceBody}>
                <aside>
                  <span>Approved context</span>
                  <ul><li>Customer records</li><li>Project tracker</li><li>Team inbox</li></ul>
                </aside>
                <div className={styles.agentRun}>
                  <div className={styles.agentRequest}><span>New request</span><p>Prepare the client review and flag anything that needs a decision.</p></div>
                  <ol>
                    <li><span>01</span><p>Gather approved context</p><em>Complete</em></li>
                    <li><span>02</span><p>Follow the defined routine</p><em>Complete</em></li>
                    <li><span>03</span><p>Route ambiguity for review</p><em>Human included</em></li>
                    <li><span>04</span><p>Record the accepted outcome</p><em>Ready</em></li>
                  </ol>
                </div>
              </div>
              <footer><span>Defined role</span><span>Connected systems</span><span>Human judgment</span><span>Run record</span></footer>
            </div>
          </div>
        </section>

        <section id="security" className={styles.securitySection} aria-labelledby="security-heading">
          <div className={styles.securityInner}>
            <div className={styles.securityCopy}>
              <p className={styles.darkEyebrow}>Product security</p>
              <h2 id="security-heading">Useful agents need access. That access needs boundaries.</h2>
              <p>Security is designed with the workflow: the systems involved, the information required, the actions permitted, and the decisions that remain with people.</p>
              <DeepLink href="/product/security">Explore security and access controls</DeepLink>
            </div>

            <div className={styles.securityControlPanel}>
              <div className={styles.securityControlCore}>
                <div><Fingerprint strokeWidth={1.25} /></div>
                <span>Client cell</span>
                <strong>Single authorized execution</strong>
              </div>
              <dl>
                {securityControls.map(([term, description]) => (
                  <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="operating-evidence" className={styles.operationsSection} aria-labelledby="operations-heading">
          <div className={styles.operationsInner}>
            <div className={styles.operationsCopy}>
              <Eyebrow>Operating evidence</Eyebrow>
              <h2 id="operations-heading">See what changed and what needs attention next.</h2>
              <p>The Deployment Record keeps accepted criteria, observed limitations, exceptions, material changes, and next actions in one place. Your team can review the current operating picture and understand why a workflow or control changed.</p>
              <DeepLink href="/services/managed-ai">Explore managed AI services</DeepLink>
            </div>

            <div className={styles.operationsEvidence} aria-label="A managed deployment record">
              <header><div><span>WT</span><p><small>Deployment record</small>Operating review</p></div><strong><i /> Evidence current</strong></header>
              <div className={styles.operationsEvidenceGrid}>
                <article><span>Evaluation</span><h3>Representative and live runs reviewed.</h3><p>Acceptance cases, limitations, and observed performance remain visible.</p></article>
                <article><span>Exceptions</span><h3>Decisions have owners.</h3><p>Ambiguity and failures are routed to people with the context to act.</p></article>
                <article><span>Improvement</span><h3>Changes follow evidence.</h3><p>Focused tests are recorded before a workflow or control is changed.</p></article>
              </div>
              <footer><span>Evidence current</span><span>Material changes recorded</span><span>Next review defined</span></footer>
            </div>
          </div>
        </section>

        <section className={styles.compareSection} aria-labelledby="compare-heading">
          <div className={styles.compareInner}>
            <div className={styles.compareCopy}>
              <Eyebrow>Choose the operating model</Eyebrow>
              <h2 id="compare-heading">Software is only part of the investment.</h2>
              <p>Compare packaged agents, self-operated platforms, an internal agent function, and Worktree&apos;s managed approach by the work each model leaves with your team.</p>
              <DeepLink href="/product/compare-ai-agent-approaches">Compare AI agent approaches</DeepLink>
            </div>
            <ol className={styles.compareModels} aria-label="AI agent operating models">
              <li><span>01</span><strong>Packaged agent</strong><em>Vendor-defined workflow</em></li>
              <li><span>02</span><strong>Self-operated platform</strong><em>Your team operates it</em></li>
              <li><span>03</span><strong>Internal agent function</strong><em>Your team builds and owns it</em></li>
              <li className={styles.compareWorktree}><span>04</span><strong>Worktree</strong><em>Shared operating responsibility</em></li>
            </ol>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="product-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Start with one job</Eyebrow>
            <h2 id="product-contact-heading">Begin with a workflow worth operating well.</h2>
            <p>You do not need an AI roadmap. Bring a recurring process, an overloaded handoff, or work that still depends on the same person. A Worktree engineer will help you decide whether an agent belongs there and what it would take to put one into operation.</p>
            <div className={styles.heroActions}>
              <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
              <SecondaryLink href="/use-cases">Explore use cases</SecondaryLink>
            </div>
          </div>
        </section>
      </div>
    </WorktreeShell>
  );
}
