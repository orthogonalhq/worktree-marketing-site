import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./managed-ai.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Managed AI Services for Business",
  description: "Worktree reviews, evaluates, supports, and improves deployed AI workflows with visible evidence and documented change.",
  path: "/services/managed-ai",
});

const responsibilities = [
  ["Quality and exceptions", "Compare live operation with the standard accepted before launch. Give failures, unusual cases, and missing context a path to an owner."],
  ["Focused improvements", "Test changes against representative cases before they alter the live workflow. Keep the approval boundary intact while the system improves."],
  ["A current deployment record", "Keep the workflow's role, controls, limitations, material changes, and next actions understandable to the people responsible for it."],
] as const;

const managedScope = [
  "Current workflow role and expected output",
  "Selected integrations and permission boundaries",
  "Approval, escalation, and exception paths",
  "Representative cases and accepted measures",
  "Relevant operating evidence and incidents",
  "Material changes, limitations, and next actions",
] as const;

const faqItems = [
  ["What are managed AI services?", "Worktree's managed AI services cover the ongoing operation around one defined workflow: reviewing relevant evidence, evaluating performance, following up on failures and exceptions, supporting the team within the agreed model, testing focused changes, and maintaining the Deployment Record."],
  ["Is this the same as MLOps or managed cloud infrastructure?", "No. Worktree manages the business workflow and its operating responsibilities. Generic hosting and cloud administration are not the service being described here."],
  ["Does Worktree monitor every run around the clock?", "No. The deployment establishes relevant operating evidence, a review process, and an agreed support model. Worktree does not imply continuous human observation or 24/7 service."],
  ["Who approves business decisions?", "The customer retains final business authority. Worktree configures the agreed approval and escalation paths so consequential or ambiguous actions reach the appropriate person."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return <Link className={styles.deepLink} href={href}><span>{children}</span><span aria-hidden="true">→</span></Link>;
}

function OperatingReview() {
  return (
    <div className={styles.operatingReview} aria-label="Illustrative managed operating review">
      <header><div><span>WT</span><p><small>Illustrative operating review</small>Customer intake workflow</p></div><strong><i /> Evidence current</strong></header>
      <div className={styles.reviewSummary}>
        <article><span>Accepted standard</span><strong>Representative cases remain the reference point.</strong><em>Current</em></article>
        <article><span>Recent exception</span><strong>Missing account context routed to workflow owner.</strong><em>Reviewed</em></article>
        <article><span>Material change</span><strong>Source field updated after focused evaluation.</strong><em>Recorded</em></article>
      </div>
      <div className={styles.reviewFooter}><span>Known limitation</span><p>Unstructured attachments still require human review.</p><strong>Next action defined</strong></div>
    </div>
  );
}

function ManagedOperationWorkspace() {
  return (
    <div className={styles.workspace} aria-label="Illustrative managed AI operating workspace">
      <header className={styles.workspaceHeader}>
        <div><span className={styles.workspaceMark}>WT</span><p><small>Illustrative managed deployment</small>Customer intake workflow</p></div>
        <div className={styles.workspaceStatus}><i />Operating evidence current</div>
      </header>
      <div className={styles.workspaceMetrics}>
        <article><span>Evidence scope</span><strong>In review</strong><em>Relevant activity</em></article>
        <article><span>Evaluation set</span><strong>Current</strong><em>Reference retained</em></article>
        <article><span>Owner decision</span><strong>Resolved</strong><em>No open decision</em></article>
        <article><span>Deployment record</span><strong>Updated</strong><em>Change recorded</em></article>
      </div>
      <div className={styles.workspaceBody}>
        <section className={styles.activityPanel} aria-labelledby="activity-heading">
          <header><div><span>Review timeline</span><h3 id="activity-heading">One exception, followed through.</h3></div><em>Illustrative review</em></header>
          <ol className={styles.activityTimeline}>
            <li><span>01</span><i /><div><small>Observed</small><p>A new intake arrived without the policy field required to prepare account context.</p></div><em>Exception</em></li>
            <li><span>02</span><i /><div><small>Routed</small><p>The workflow stopped before action and sent the missing decision to the process owner.</p></div><em>Boundary held</em></li>
            <li><span>03</span><i /><div><small>Improved</small><p>A focused source check was added and tested against the accepted evaluation set.</p></div><em>Test passed</em></li>
            <li><span>04</span><i /><div><small>Recorded</small><p>The remaining attachment limitation and next action were added to the Deployment Record.</p></div><em>Record current</em></li>
          </ol>
        </section>
        <aside className={styles.workspaceRail}>
          <section className={styles.evidenceCard}>
            <header><span>Evaluation evidence</span><em>Current</em></header>
            <strong>Within standard</strong><p>Representative cases meeting the accepted standard.</p>
            <div aria-hidden="true"><i /></div>
            <ul><li><span>Approval boundary</span><em>Passed</em></li><li><span>Required context</span><em>1 exception</em></li><li><span>Expected output</span><em>Passed</em></li></ul>
          </section>
          <section className={styles.changeCard}>
            <header><span>Deployment record</span><em>Updated</em></header>
            <div><span>Material change</span><p>Required source-field check added before context preparation.</p></div>
            <div><span>Known limitation</span><p>Unstructured attachments still require human review.</p></div>
            <footer><span>Next review</span><strong>Owner validation · Agreed cadence</strong></footer>
          </section>
        </aside>
      </div>
      <footer className={styles.workspaceFooter}>
        <p><span>Operating owner</span><strong>Worktree managed</strong></p>
        <div><span>CRM</span><span>Shared inbox</span><span>Approval queue</span></div>
      </footer>
    </div>
  );
}

export default function ManagedAiPage() {
  return (
    <WorktreeShell headerOverlay>
      <main className={`${styles.page} worktree-service-page`}>
        <section className={`${styles.hero} worktree-service-hero`} aria-labelledby="managed-ai-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>Managed AI services</Eyebrow>
              <h1 id="managed-ai-heading">Keep the workflow useful after launch.</h1>
              <p>Worktree remains involved as your AI workflow meets real requests, changing systems, missing context, and unexpected cases. We review operation, evaluate performance, document material changes, and improve the deployment against an agreed standard.</p>
              <div className={styles.heroActions}><PrimaryLink href="/deploy">Review a managed deployment</PrimaryLink><SecondaryLink href="#operating-loop">See the operating loop</SecondaryLink></div>
            </div>
            <OperatingReview />
          </div>
        </section>

        <section id="operating-loop" className={styles.operationSection} aria-labelledby="operation-heading">
          <div className={styles.operationInner}>
            <div className={styles.operationIntro}>
              <div><Eyebrow>One deployment under management</Eyebrow><h2 id="operation-heading">Every review should leave the workflow clearer than we found it.</h2></div>
              <p>Evidence is only useful when it leads somewhere. Worktree connects what happened in production to an owner decision, a tested response, and a current account of the deployment.</p>
            </div>
            <ManagedOperationWorkspace />
            <ol className={styles.operationPrinciples}>
              <li><span>01</span><div><h3>Observe the work</h3><p>Review the evidence that matters: completed work, exceptions, approvals, failures, and team questions.</p></div></li>
              <li><span>02</span><div><h3>Make a focused decision</h3><p>Compare what happened with the accepted standard and route ambiguity to the person who has authority.</p></div></li>
              <li><span>03</span><div><h3>Improve without losing control</h3><p>Test the smallest useful change, record what moved, and keep known limits visible.</p></div></li>
            </ol>
          </div>
        </section>

        <section className={styles.responsibilitySection} aria-labelledby="responsibility-heading">
          <div className={styles.responsibilityInner}>
            <div className={styles.responsibilityIntro}>
              <div><Eyebrow>Production changes the work</Eyebrow><h2 id="responsibility-heading">Launch creates an operating responsibility.</h2></div>
              <p>A workflow that passed its test cases will still meet changed policies, missing information, new language, and exceptions no one predicted. Managed operation gives those signals somewhere to go.</p>
            </div>
            <div className={styles.responsibilityCards}>{responsibilities.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className={styles.authoritySection} aria-labelledby="authority-heading">
          <div className={styles.authorityInner}>
            <div className={styles.authorityCopy}>
              <p className={`${styles.darkEyebrow} worktree-service-eyebrow`}>A managed workflow, not outsourced authority</p>
              <h2 id="authority-heading">Your team keeps the decisions. Worktree keeps the operating work moving.</h2>
              <p>Your process owner remains responsible for policy and final business decisions. Worktree turns those decisions into controls, evaluations, focused changes, and operating follow-through.</p>
              <DeepLink href="/product/security">Review security and access controls</DeepLink>
            </div>
            <div className={styles.scopeCard}>
              <header><span>Managed deployment</span><strong>Responsibilities in scope</strong></header>
              <ul>{managedScope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><em>Defined</em></li>)}</ul>
              <footer>The exact responsibility follows the workflow and commercial scope established during the deployment review.</footer>
            </div>
          </div>
        </section>

        <section className={styles.productBridge} aria-labelledby="product-bridge-heading">
          <div className={styles.productBridgeInner}>
            <div><Eyebrow>The machinery behind the service</Eyebrow><h2 id="product-bridge-heading">See how the managed workflow stays inspectable.</h2><p>The product keeps the role, selected systems, authority, evaluations, material changes, and next actions visible. It supports the relationship; it is not a platform your team must operate alone.</p></div>
            <div className={styles.productLinks}><Link href="/product"><span>Product overview</span><em>→</em></Link><Link href="/product/compare-ai-agent-approaches"><span>Compare operating approaches</span><em>→</em></Link><Link href="/services/ai-implementation"><span>See how workflows reach launch</span><em>→</em></Link><Link href="/blog/monitor-ai-agents-in-production"><span>Read how to monitor AI agents in production</span><em>→</em></Link></div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="managed-faq-heading">
          <div className={styles.faqInner}>
            <div><Eyebrow>Before the managed-deployment review</Eyebrow><h2 id="managed-faq-heading">Common operating questions.</h2></div>
            <div className={styles.faqList}>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="managed-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Give the operating responsibility a home</Eyebrow>
            <h2 id="managed-contact-heading">Bring us the workflow that needs an owner after launch.</h2>
            <p>Share what the workflow does, who owns its result, how quality is judged, which systems can change, and what happens when something fails today.</p>
            <div className={styles.heroActions}><PrimaryLink href="/deploy">Review a managed deployment</PrimaryLink><SecondaryLink href="/services/ai-implementation">Explore AI implementation</SecondaryLink></div>
          </div>
        </section>
      </main>
    </WorktreeShell>
  );
}
