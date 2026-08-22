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

const launchSignals = [
  ["Quality", "Compare operation with the standard accepted before launch."],
  ["Exceptions", "Give failures and unusual cases a path to an owner."],
  ["Changes", "Test and record material updates instead of editing in place."],
  ["Support", "Resolve team questions and operating issues within the agreed scope."],
  ["Visibility", "Keep limitations, risks, and next actions understandable."],
] as const;

const operatingLoop = [
  ["01", "Observe", "Use relevant operating evidence to understand completed work, exceptions, approvals, and failures."],
  ["02", "Evaluate", "Compare representative and live evidence with the accepted measures and control boundaries."],
  ["03", "Respond", "Follow up on failures, exceptions, team questions, and operational issues within the agreed model."],
  ["04", "Improve", "Test focused changes when evidence shows the workflow, instructions, or integration needs attention."],
  ["05", "Record", "Update the Deployment Record when material controls, limitations, risks, or next actions change."],
  ["06", "Review", "Decide what is working, what remains true, and what should happen next."],
] as const;

const managedScope = [
  "The workflow's current role, instructions, and expected output",
  "Selected integrations, permissions, and approval paths",
  "Accepted success measures and representative cases",
  "Relevant evidence, exceptions, and incidents",
  "Focused changes to the agreed workflow",
  "A current Deployment Record and review of next actions",
] as const;

const ownershipRows = [
  ["Business purpose and policy", "Workflow and operating implementation"],
  ["Final authority and approval owners", "Configured approval and escalation paths"],
  ["Current guidance and source information", "Instructions, evaluation cases, and focused changes"],
  ["Timely decisions for exceptions", "Support for agreed workflow issues"],
  ["Direction when the operation changes", "Testing, documentation, and operating follow-through"],
] as const;

const recordQuestions = [
  "What changed since acceptance or the last review?",
  "Which controls and assumptions remain current?",
  "What did evaluation or real operation reveal?",
  "Which limitations or risks need attention?",
  "What is the next agreed action?",
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

export default function ManagedAiPage() {
  return (
    <WorktreeShell headerOverlay>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="managed-ai-heading">
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

        <section className={styles.responsibilitySection} aria-labelledby="responsibility-heading">
          <div className={styles.responsibilityInner}>
            <div className={styles.responsibilityCopy}>
              <Eyebrow>Production changes the work</Eyebrow>
              <h2 id="responsibility-heading">Launch creates an operating responsibility.</h2>
              <p>A workflow that passed its test cases can still meet new language, changed policies, missing information, altered system behavior, and exceptions no one predicted. The business needs a way to notice those signals and decide what happens next.</p>
            </div>
            <ol className={styles.signalList}>{launchSignals.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
          </div>
        </section>

        <section id="operating-loop" className={styles.loopSection} aria-labelledby="loop-heading">
          <div className={styles.loopInner}>
            <div className={styles.loopIntro}>
              <p className={styles.darkEyebrow}>Evidence becomes improvement</p>
              <h2 id="loop-heading">Review what happened. Decide what changes.</h2>
              <p>Worktree manages the workflow through a repeatable operating loop rather than a stream of untracked prompt edits.</p>
            </div>
            <div className={styles.loopWorkspace} aria-label="Illustrative managed AI operating loop">
              <header><span>Illustrative operating loop</span><strong>Evidence → Decision → Documented change</strong></header>
              <ol>{operatingLoop.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><em>{number === "06" ? "Next cycle" : "Continue"}</em></li>)}</ol>
            </div>
          </div>
        </section>

        <section className={styles.scopeSection} aria-labelledby="scope-heading">
          <div className={styles.scopeInner}>
            <div className={styles.scopeCopy}>
              <Eyebrow>One defined production workflow</Eyebrow>
              <h2 id="scope-heading">Manage the responsibility, not just the runtime.</h2>
              <p>Worktree focuses on the business workflow and the operating responsibilities around it. The service is not generic model hosting, cloud administration, or an outsourced cybersecurity function.</p>
            </div>
            <div className={styles.scopeManifest}>
              <header><span>Managed deployment</span><strong>Responsibilities in scope</strong></header>
              <ul>{managedScope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><em>Defined</em></li>)}</ul>
              <footer>The exact responsibility follows the workflow and commercial scope established during the deployment review.</footer>
            </div>
          </div>
        </section>

        <section className={styles.ownershipSection} aria-labelledby="ownership-heading">
          <div className={styles.ownershipInner}>
            <div className={styles.ownershipIntro}>
              <Eyebrow>Clear responsibility on both sides</Eyebrow>
              <h2 id="ownership-heading">Your team keeps the authority. Worktree keeps the operating work moving.</h2>
              <p>Your process owner remains responsible for policy and final decisions. Worktree translates those decisions into the managed deployment and follows the evidence after launch.</p>
            </div>
            <div className={styles.ownershipTable}>
              <header><span>Your team provides</span><span>Worktree provides</span></header>
              {ownershipRows.map(([customer, worktree], index) => <div key={customer}><span>{String(index + 1).padStart(2, "0")}</span><p>{customer}</p><p>{worktree}</p></div>)}
            </div>
          </div>
        </section>

        <section className={styles.evaluationSection} aria-labelledby="evaluation-heading">
          <div className={styles.evaluationInner}>
            <div className={styles.evaluationCopy}>
              <Eyebrow>Quality needs a reference point</Eyebrow>
              <h2 id="evaluation-heading">Judge the workflow against an agreed standard.</h2>
              <p>Evaluation begins before launch, when the team defines representative cases, expected behavior, approval requirements, and acceptance criteria. Those decisions remain the reference point for real operation and proposed changes.</p>
              <DeepLink href="/product/security">Review security and access controls</DeepLink>
            </div>
            <div className={styles.evaluationPanel} aria-label="Illustrative exception evaluation">
              <header><span>Representative case</span><strong>Exception review</strong></header>
              <div className={styles.caseExpected}><span>Expected behavior</span><p>Prepare the account context and route policy ambiguity to the owner.</p><em>Accepted</em></div>
              <div className={styles.caseObserved}><span>Observed exception</span><p>The source record did not include the required policy field.</p><em>Needs decision</em></div>
              <div className={styles.caseDecision}><span>Focused response</span><p>Keep the approval boundary. Test an additional context check.</p><strong>Evaluation set updated</strong></div>
            </div>
          </div>
        </section>

        <section className={styles.recordSection} aria-labelledby="record-heading">
          <div className={styles.recordInner}>
            <div className={styles.recordIntro}>
              <p className={styles.darkEyebrow}>A current account of the deployment</p>
              <h2 id="record-heading">Keep material changes and next actions visible.</h2>
              <p>The Deployment Record captures the current role, instructions, controls, evaluation standard, material changes, limitations, risks, and next actions.</p>
              <DeepLink href="/product">Explore the Worktree product</DeepLink>
            </div>
            <ol className={styles.recordQuestions}>{recordQuestions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p><em>Answerable</em></li>)}</ol>
          </div>
        </section>

        <section className={styles.productBridge} aria-labelledby="product-bridge-heading">
          <div className={styles.productBridgeInner}>
            <div><Eyebrow>The machinery behind the service</Eyebrow><h2 id="product-bridge-heading">See how the managed workflow stays inspectable.</h2><p>The product makes the role, selected systems, authority, evaluations, material changes, and next actions visible. It supports the relationship; it is not a platform your team must operate alone.</p></div>
            <div className={styles.productLinks}><Link href="/product"><span>Product overview</span><em>→</em></Link><Link href="/product/compare-ai-agent-approaches"><span>Compare operating approaches</span><em>→</em></Link><Link href="/services/ai-implementation"><span>See how workflows reach launch</span><em>→</em></Link></div>
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
