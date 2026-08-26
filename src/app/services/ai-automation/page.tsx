import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./ai-automation.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Automation Services for Business",
  description: "Worktree helps businesses redesign recurring work and put controlled AI workflows into operation without hiding decisions or exceptions.",
  path: "/services/ai-automation",
});

const frictionSignals = [
  ["Context gathering", "The same information is collected from several places for every case."],
  ["Waiting handoff", "Work pauses because ownership or the next action is unclear."],
  ["Repeated preparation", "Someone rebuilds the same update, brief, or packet each time."],
  ["Invisible exception", "An unusual case disappears into an inbox, chat, or private note."],
] as const;

const fitSignals = [
  "A recurring event or request",
  "A process owner and people who know the work",
  "Identifiable inputs and systems",
  "A repeatable path with known exceptions",
  "Judgment that can be separated from preparation",
  "A practical standard for a useful result",
] as const;

const redesignSteps = [
  ["01", "Eliminate", "Remove work that no longer needs to exist."],
  ["02", "Simplify", "Reduce unnecessary steps and handoffs."],
  ["03", "Clarify", "Name the owner, source information, and expected result."],
  ["04", "Automate", "Put the repeatable work that remains into motion."],
  ["05", "Include people", "Keep judgment and authority where they belong."],
] as const;

const workflowStages = [
  ["01", "Signal", "A request, schedule, message, or selected system event starts the routine."],
  ["02", "Context", "The workflow gathers the permitted information needed for the case."],
  ["03", "Action", "It follows the agreed instructions to prepare or perform the next step."],
  ["04", "Judgment", "An approval, exception, or ambiguous case reaches the right person."],
  ["05", "Output", "The result appears where the team expects it, with evidence for review."],
] as const;

const workflowPatterns = [
  ["Prepare a customer handoff", "Gather selected account context, prepare the next action, and route consequential decisions to the account owner.", "Account review"],
  ["Assemble an exception review", "Collect the relevant records, highlight what changed, and prepare a review packet for the person with authority.", "Exception packet"],
  ["Keep a follow-up moving", "Check selected sources when a recurring checkpoint is due and make missing information or overdue ownership visible.", "Operating follow-up"],
  ["Prepare a recurring brief", "Assemble agreed inputs, identify gaps, and prepare a draft for the team to evaluate before a scheduled review.", "Review brief"],
] as const;

const faqItems = [
  ["What are AI automation services?", "For Worktree, AI automation starts with recurring business work and continues through process design, implementation, testing, launch, and managed operation. The goal is useful capacity, not automation for its own sake."],
  ["Do we need to know whether the workflow requires an AI agent?", "No. Bring the work as it happens today. Worktree assesses the routine, systems, decisions, and exceptions before recommending an agent, deterministic automation, integration, process change, or combination."],
  ["What kinds of workflows are a good starting point?", "Look for work that recurs, has an owner, uses identifiable information, follows a known path, and has a practical standard for a useful result."],
  ["Will automation remove people from the process?", "Not where their judgment or authority is needed. Routine preparation can advance while approvals, ambiguity, and exceptions reach the appropriate person."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return <Link className={styles.deepLink} href={href}><span>{children}</span><span aria-hidden="true">→</span></Link>;
}

function HandoffPreview() {
  return (
    <div className={styles.handoffPreview} aria-label="Illustrative handoff moving into one visible routine">
      <header><span>Illustrative workflow</span><strong><i /> Routine active</strong></header>
      <div className={styles.scatteredWork}>
        <article><span>Inbox</span><p>Can someone confirm the latest account status?</p><em>Waiting</em></article>
        <article><span>Project tracker</span><p>Owner and next action are missing.</p><em>Incomplete</em></article>
        <article><span>Team note</span><p>Exception recorded outside the workflow.</p><em>Unassigned</em></article>
      </div>
      <div className={styles.handoffArrow}><span>Workflow receives the case</span><b aria-hidden="true">↓</b></div>
      <div className={styles.visibleRoutine}>
        <div><span>01</span><strong>Gather context</strong><em>Complete</em></div>
        <div><span>02</span><strong>Prepare next action</strong><em>Complete</em></div>
        <div><span>03</span><strong>Route exception</strong><em>Human owner</em></div>
      </div>
    </div>
  );
}

export default function AiAutomationPage() {
  return (
    <WorktreeShell headerOverlay>
      <main className={`${styles.page} worktree-service-page`}>
        <section className={`${styles.hero} worktree-service-hero`} aria-labelledby="automation-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>AI automation services</Eyebrow>
              <h1 id="automation-heading">Turn recurring work into a workflow that keeps moving.</h1>
              <p>Worktree helps your team find the work worth improving, redesign the routine around the people and systems involved, and put the right automation into operation without hiding decisions or exceptions.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Review a workflow</PrimaryLink>
                <SecondaryLink href="#workflow-fit">See what makes a strong first workflow</SecondaryLink>
              </div>
            </div>
            <HandoffPreview />
          </div>
        </section>

        <section className={styles.frictionSection} aria-labelledby="friction-heading">
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <Eyebrow>Work that keeps asking for attention</Eyebrow>
              <h2 id="friction-heading">The task is familiar. Reassembling it every time is the problem.</h2>
              <p>Many bottlenecks are the same context gathering, follow-up, re-entry, preparation, and handoff repeated across a week. The work moves only when someone remembers what to check and who needs to act next.</p>
            </div>
            <div className={styles.frictionLedger}>
              {frictionSignals.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div><em>Recurring</em></article>)}
            </div>
          </div>
        </section>

        <section id="workflow-fit" className={styles.fitSection} aria-labelledby="fit-heading">
          <div className={styles.fitInner}>
            <div className={styles.fitCopy}>
              <p className={`${styles.darkEyebrow} worktree-service-eyebrow`}>Choose the work before the technology</p>
              <h2 id="fit-heading">Start where the work already has a rhythm.</h2>
              <p>A strong first workflow does not need to be simple. It does need to be understandable: what begins the work, which information matters, what usually happens, where judgment belongs, and how the team knows it is complete.</p>
              <DeepLink href="/use-cases">Explore illustrative workflow use cases</DeepLink>
            </div>
            <div className={styles.fitChecklist}>
              <header><span>First-workflow review</span><strong>Useful starting signals</strong></header>
              <ol>{fitSignals.map((signal, index) => <li key={signal}><span>{String(index + 1).padStart(2, "0")}</span><p>{signal}</p><em>Visible</em></li>)}</ol>
              <footer>When the process is unclear, improve the process before automating it.</footer>
            </div>
          </div>
        </section>

        <section className={styles.redesignSection} aria-labelledby="redesign-heading">
          <div className={styles.redesignInner}>
            <div className={styles.redesignIntro}>
              <Eyebrow>Better work before more technology</Eyebrow>
              <h2 id="redesign-heading">Remove what should not be repeated.</h2>
              <p>A duplicate approval, conflicting status field, unnecessary report, or unclear handoff should not become faster simply because a system can perform it. The technology follows the job.</p>
              <DeepLink href="/blog/ibm-ai-transformation-work-redesign">Read the note on redesigning work first</DeepLink>
            </div>
            <ol className={styles.redesignPath}>
              {redesignSteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className={styles.anatomySection} aria-labelledby="anatomy-heading">
          <div className={styles.anatomyInner}>
            <div className={styles.anatomyIntro}>
              <p className={`${styles.darkEyebrow} worktree-service-eyebrow`}>A complete operating path</p>
              <h2 id="anatomy-heading">Give every case a clear next step.</h2>
              <p>The normal work can advance while unusual work reaches a person with the context needed to decide.</p>
            </div>
            <div className={styles.workflowPath} aria-label="Illustrative managed workflow">
              <header><span>Illustrative workflow</span><strong>System work → Human judgment → Visible output</strong></header>
              <ol>{workflowStages.map(([number, title, copy]) => <li className={title === "Judgment" ? styles.judgmentStage : undefined} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
            </div>
          </div>
        </section>

        <section className={styles.patternSection} aria-labelledby="patterns-heading">
          <div className={styles.patternInner}>
            <div className={styles.patternHeader}>
              <div><Eyebrow>Recurring work worth examining</Eyebrow><h2 id="patterns-heading">Recognize the pattern before choosing the solution.</h2></div>
              <p>These examples are illustrative. They show the shape of work Worktree can assess, not completed customer deployments or promised results.</p>
            </div>
            <div className={styles.patternGrid}>
              {workflowPatterns.map(([title, copy, artifact], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p><footer><em>Illustrative artifact</em><strong>{artifact}</strong></footer></article>)}
            </div>
            <DeepLink href="/use-cases">See more workflow examples</DeepLink>
          </div>
        </section>

        <section className={styles.deliverySection} aria-labelledby="delivery-heading">
          <div className={styles.deliveryInner}>
            <div className={styles.deliveryCopy}>
              <Eyebrow>From workflow review to production</Eyebrow>
              <h2 id="delivery-heading">Worktree carries the idea through implementation.</h2>
              <p>Identifying the workflow is only the first decision. Worktree maps the real process, defines its boundaries, connects selected systems, tests difficult cases, and supports acceptance and launch.</p>
            </div>
            <div className={styles.deliveryRoutes}>
              <Link href="/services/ai-implementation"><span>Build and launch</span><strong>AI implementation services</strong><em>→</em></Link>
              <Link href="/services/managed-ai"><span>Operate and improve</span><strong>Managed AI services</strong><em>→</em></Link>
              <Link href="/product/security"><span>Keep authority visible</span><strong>Security and access controls</strong><em>→</em></Link>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="automation-faq-heading">
          <div className={styles.faqInner}>
            <div><Eyebrow>Before the workflow review</Eyebrow><h2 id="automation-faq-heading">Common automation questions.</h2></div>
            <div className={styles.faqList}>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="automation-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Start with one recurring workflow</Eyebrow>
            <h2 id="automation-contact-heading">Show us where the work keeps slowing down.</h2>
            <p>Bring the current process, its owner, the systems it touches, and a recent example. A Worktree engineer will help determine what should change, what should remain human, and what it would take to put the improved workflow into operation.</p>
            <div className={styles.heroActions}><PrimaryLink href="/deploy">Review a workflow</PrimaryLink><SecondaryLink href="/services/ai-implementation">Explore AI implementation</SecondaryLink></div>
          </div>
        </section>
      </main>
    </WorktreeShell>
  );
}
