import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./ai-implementation.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Implementation Services",
  description:
    "Work with a Worktree engineer to define, build, test, and launch one valuable AI workflow with clear access, approvals, and operating evidence.",
  path: "/services/ai-implementation",
});

const productionRequirements = [
  ["Purpose", "A named owner and a job the team can explain."],
  ["Context", "Selected systems and information the workflow may use."],
  ["Authority", "Actions it may take and decisions that remain with people."],
  ["Exceptions", "A route for missing context, unusual cases, and failures."],
  ["Acceptance", "Representative cases and an agreed standard for launch."],
  ["Evidence", "Visible outputs, decisions, and material changes."],
] as const;

const implementationStages = [
  {
    number: "01",
    title: "Understand the work",
    copy: "We follow the process as it actually happens, including the handoffs, workarounds, exceptions, and decisions that rarely make it into a procedure document.",
    artifact: "Current process map",
    decision: "Workflow owner confirmed",
  },
  {
    number: "02",
    title: "Define success and authority",
    copy: "Your team defines what a useful result looks like. Together, we separate routine actions from decisions that still require human judgment.",
    artifact: "Acceptance cases",
    decision: "Authority agreed",
  },
  {
    number: "03",
    title: "Design the workflow",
    copy: "We specify the trigger, required context, operating routine, approval points, exception paths, and record the workflow should leave behind.",
    artifact: "Workflow specification",
    decision: "Path approved",
  },
  {
    number: "04",
    title: "Connect and build",
    copy: "A Worktree engineer configures the agent, connects the selected systems, and implements the access boundaries and controls around the job.",
    artifact: "Systems and access matrix",
    decision: "Connections verified",
  },
  {
    number: "05",
    title: "Test the usual and difficult cases",
    copy: "We evaluate representative work, incomplete inputs, edge cases, and failure conditions before asking the team to rely on the workflow.",
    artifact: "Evaluation set",
    decision: "Criteria met",
  },
  {
    number: "06",
    title: "Accept and launch",
    copy: "The team reviews the operating boundaries, accepted behavior, known limitations, and escalation path before the workflow moves into production.",
    artifact: "Launch record",
    decision: "Release accepted",
  },
] as const;

const evidenceItems = [
  ["Consultation Blueprint", "The role, workflow, systems, decisions, exceptions, and expected outcome."],
  ["Acceptance set", "Representative and difficult cases used to decide whether the workflow is ready."],
  ["Launch checklist", "Connections, permissions, approvals, escalation routes, and owner sign-off."],
  ["Initial Deployment Record", "The accepted scope, current controls, limitations, and first operating review."],
] as const;

const faqItems = [
  ["What is included in an AI implementation?", "Worktree maps the selected process, defines the workflow and controls, connects the agreed systems, builds and tests the deployment, and prepares the operating evidence needed for a controlled launch."],
  ["Do we need a technical specification before we start?", "No. Bring the recurring work, the people who understand it, and examples of what good and difficult cases look like. The specification is an output of the implementation process."],
  ["Can the workflow use our existing systems?", "Where a suitable connection and access path exists, the implementation can use selected business systems. The exact connections and permissions are defined during scoping."],
  ["Can people approve sensitive actions?", "Yes. Approval and escalation points are designed around the workflow so decisions can stay with the people who hold the authority and context."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={styles.deepLink} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function WorkflowPreview() {
  const steps = [
    ["01", "Request received", "New"],
    ["02", "Systems checked", "Ready"],
    ["03", "Approval required", "Human"],
    ["04", "Result recorded", "Pending"],
  ] as const;

  return (
    <div className={styles.workflowPreview} aria-label="Illustrative workflow from request to recorded result">
      <header>
        <div><span>WT</span><p><small>Illustrative workflow</small>Client onboarding review</p></div>
        <strong><i /> Implementation</strong>
      </header>
      <ol>
        {steps.map(([number, label, status], index) => (
          <li className={index === 2 ? styles.approvalStep : undefined} key={number}>
            <span>{number}</span>
            <strong>{label}</strong>
            <em>{status}</em>
          </li>
        ))}
      </ol>
      <footer><span>Workflow owner</span><strong>Operations</strong><span>Acceptance path</span><strong>Defined</strong></footer>
    </div>
  );
}

export default function AiImplementationPage() {
  return (
    <WorktreeShell headerOverlay>
      <main className={`${styles.page} worktree-service-page`}>
        <section className={`${styles.hero} worktree-service-hero`} aria-labelledby="implementation-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>AI implementation services</Eyebrow>
              <h1 id="implementation-heading">Put one valuable AI workflow into operation.</h1>
              <p>Worktree works alongside your team to map the real process, connect selected systems, define human control, test difficult cases, and launch a managed workflow.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
                <SecondaryLink href="#implementation-path">See the implementation path</SecondaryLink>
              </div>
            </div>
            <WorkflowPreview />
          </div>
        </section>

        <section className={styles.productionGap} aria-labelledby="production-gap-heading">
          <div className={styles.sectionInner}>
            <div className={styles.productionStatement}>
              <Eyebrow>From prototype to operation</Eyebrow>
              <h2 id="production-gap-heading">The first demo is only the beginning.</h2>
              <p>A useful prototype proves that a model can produce an answer. A working deployment defines how the job starts, what the system may use and change, when a person decides, and how the result is reviewed.</p>
            </div>
            <div className={styles.requirementLedger}>
              {productionRequirements.map(([title, copy], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.anatomySection} aria-labelledby="anatomy-heading">
          <div className={styles.anatomyInner}>
            <div className={styles.anatomyIntro}>
              <p className={`${styles.darkEyebrow} worktree-service-eyebrow`}>Workflow anatomy</p>
              <h2 id="anatomy-heading">Give the system a job your team can explain.</h2>
              <p>A defined workflow makes the deployment easier to test, control, and improve. Each part answers a practical operating question. If the opportunity is still broader, our <Link className={styles.inlineLink} href="/services/ai-automation">AI automation services</Link> help identify the right recurring work before implementation.</p>
              <DeepLink href="/use-cases">Explore workflow examples</DeepLink>
            </div>
            <div className={styles.anatomyPath} aria-label="Illustrative workflow anatomy">
              <p>Illustrative workflow</p>
              <ol>
                <li><span>01</span><strong>Signal</strong><em>What starts the work?</em></li>
                <li><span>02</span><strong>Context</strong><em>What may the agent use?</em></li>
                <li><span>03</span><strong>Routine</strong><em>What path should it follow?</em></li>
                <li><span>04</span><strong>Judgment</strong><em>Where must a person decide?</em></li>
                <li><span>05</span><strong>Record</strong><em>What evidence should remain?</em></li>
              </ol>
            </div>
          </div>
        </section>

        <section id="implementation-path" className={styles.pathSection} aria-labelledby="path-heading">
          <div className={styles.pathInner}>
            <div className={styles.pathIntro}>
              <Eyebrow>The implementation path</Eyebrow>
              <h2 id="path-heading">Move from the current process to a controlled launch.</h2>
              <p>Each stage resolves a different operating question and leaves behind something the team can inspect. If budget is part of the decision, review <Link className={styles.inlineLink} href="/blog/ai-automation-cost">what determines AI automation cost</Link>.</p>
              <DeepLink href="/blog/ai-implementation-roadmap">Read the AI implementation roadmap</DeepLink>
            </div>
            <ol className={styles.stageList}>
              {implementationStages.map((stage) => (
                <li key={stage.number}>
                  <span className={styles.stageNumber}>{stage.number}</span>
                  <div className={styles.stageCopy}><h3>{stage.title}</h3><p>{stage.copy}</p></div>
                  <dl>
                    <div><dt>Artifact</dt><dd>{stage.artifact}</dd></div>
                    <div><dt>Decision</dt><dd>{stage.decision}</dd></div>
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.controlSection} aria-labelledby="control-heading">
          <div className={styles.controlInner}>
            <div className={styles.controlCopy}>
              <Eyebrow>Connections and control</Eyebrow>
              <h2 id="control-heading">Connect the work, not just the software.</h2>
              <p>Implementation is the relationship between the trigger, the information the job needs, the actions the workflow may take, and the moments where a person must remain involved.</p>
              <DeepLink href="/product/security">Explore security and access controls</DeepLink>
            </div>
            <div className={styles.controlMatrix} aria-label="Illustrative systems and authority matrix">
              <header><span>Illustrative systems and authority matrix</span><strong>Workflow 01</strong></header>
              <div className={styles.matrixHeader}><span>Function</span><span>Access</span><span>Authority</span></div>
              <div><strong>Customer records</strong><span>Selected fields</span><em>Read</em></div>
              <div><strong>Team inbox</strong><span>Assigned requests</span><em>Draft</em></div>
              <div><strong>Project tracker</strong><span>Relevant workspace</span><em>Update</em></div>
              <div className={styles.approvalRow}><strong>External action</strong><span>Approved destination</span><em>Approval</em></div>
              <footer><span>Exceptions route to</span><strong>Named workflow owner</strong></footer>
            </div>
          </div>
        </section>

        <section className={styles.evidenceSection} aria-labelledby="evidence-heading">
          <div className={styles.evidenceInner}>
            <div className={styles.evidenceIntro}>
              <Eyebrow>Implementation evidence</Eyebrow>
              <h2 id="evidence-heading">Know what has been decided before the workflow goes live.</h2>
              <p>Implementation should leave your team with more than a configured agent. The operating role, boundaries, test cases, and launch decisions remain visible.</p>
              <DeepLink href="/product">Explore the Worktree product</DeepLink>
            </div>
            <ol className={styles.evidenceRail}>
              {evidenceItems.map(([title, copy], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <em>Prepared</em>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.relationshipSection} aria-labelledby="relationship-heading">
          <div className={styles.relationshipInner}>
            <div className={styles.relationshipIntro}>
              <Eyebrow>A hands-on working relationship</Eyebrow>
              <h2 id="relationship-heading">Your team supplies the operating truth. Worktree carries the implementation.</h2>
            </div>
            <div className={styles.responsibilityLedger}>
              <article>
                <span>Your team brings</span>
                <ul><li>A process owner</li><li>People who know the work</li><li>Real examples and exceptions</li><li>Access to selected systems</li><li>A clear reason to improve the job</li></ul>
              </article>
              <article>
                <span>Worktree brings</span>
                <ul><li>Workflow analysis and engineering</li><li>Integration and control design</li><li>Testing and acceptance</li><li>A controlled launch path</li><li>Documented operating boundaries</li></ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.faqInner}>
            <div><Eyebrow>Common questions</Eyebrow><h2 id="faq-heading">Before the work begins.</h2></div>
            <div className={styles.faqList}>
              {faqItems.map(([question, answer]) => (
                <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="implementation-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Start with the real work</Eyebrow>
            <h2 id="implementation-contact-heading">Bring us the workflow. We will help define the path to production.</h2>
            <p>Start with recurring work that is delayed, repeated, or still depends on the same overloaded person.</p>
            <div className={styles.heroActions}>
              <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
              <SecondaryLink href="/services/managed-ai">Explore managed AI services</SecondaryLink>
            </div>
          </div>
        </section>
      </main>
    </WorktreeShell>
  );
}
