import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./agents.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Worktree Agents: Durable AI Business Roles",
  description: "See how a Worktree Agent receives defined work, uses approved context and tools, includes people in consequential decisions, and leaves an understandable run record.",
  path: "/product/agents",
});

const agentDefinition = [
  ["Responsibility", "Prepare customer reviews and surface decisions"],
  ["Starts when", "A review is requested or reaches its scheduled date"],
  ["Approved context", "Customer records, project status, and team notes"],
  ["Human authority", "Commercial changes and unresolved exceptions"],
] as const;

const runSteps = [
  ["01", "Request received", "A known request starts the defined routine.", "Received"],
  ["02", "Context gathered", "Only the sources approved for the role are checked.", "Complete"],
  ["03", "Work prepared", "The agent follows the accepted operating standard.", "Complete"],
  ["04", "Decision routed", "An exception pauses for the person with authority.", "Human included"],
  ["05", "Outcome recorded", "The accepted result and material context remain reviewable.", "Ready"],
] as const;

const productSurfaces = [
  {
    number: "01",
    label: "Request",
    title: "A familiar way to ask for work.",
    copy: "The team starts a known job from the interface agreed for the workflow. The agent does not need a new prompt that reconstructs the process every time.",
  },
  {
    number: "02",
    label: "Context",
    title: "Sources tied to the role.",
    copy: "The agent gathers the records, documents, and messages its assigned responsibility requires, without treating every connected system as open context.",
  },
  {
    number: "03",
    label: "Review",
    title: "Judgment stays with people.",
    copy: "Ambiguity and consequential actions can pause with the supporting context, proposed action, and reason a decision is required.",
  },
  {
    number: "04",
    label: "Record",
    title: "A run can be understood later.",
    copy: "Relevant sources, actions, approvals, outputs, exceptions, and status form the operating evidence for review and focused improvement.",
  },
] as const;

const roleControls = [
  ["Systems", "Which applications and data sources belong to the job."],
  ["Actions", "What the agent may read, prepare, update, or submit."],
  ["Approvals", "Which steps require an authorized person before they continue."],
  ["Exceptions", "Where the workflow stops instead of improvising beyond its role."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={styles.deepLink} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function RoleManifest() {
  return (
    <div className={styles.roleManifest} aria-label="Illustrative Worktree Agent role manifest">
      <header>
        <div className={styles.agentIdentity}>
          <span>WT</span>
          <p><small>Illustrative agent role</small>Customer review coordinator</p>
        </div>
        <strong><i /> Role active</strong>
      </header>
      <dl>
        {agentDefinition.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.manifestRun}>
        <div>
          <span>Current request</span>
          <p>Prepare the Northstar review and flag decisions.</p>
        </div>
        <ol>
          <li><span>Context</span><strong>Gathered</strong></li>
          <li><span>Draft</span><strong>Prepared</strong></li>
          <li className={styles.awaiting}><span>Pricing exception</span><strong>Approval required</strong></li>
        </ol>
      </div>
      <footer><span>Role v1.4</span><strong>Last accepted standard applied</strong></footer>
    </div>
  );
}

export default function WorktreeAgentsPage() {
  return (
    <WorktreeShell>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="agents-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>Worktree Agents</Eyebrow>
              <h1 id="agents-heading">One business role. A defined agent behind it.</h1>
              <p>A Worktree Agent is a durable, connected working role, not a blank chat. It receives known work, uses approved systems, follows a defined routine, includes people when judgment is required, and records what happened.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
                <SecondaryLink href="#agent-run">Follow an agent run</SecondaryLink>
              </div>
            </div>
            <RoleManifest />
          </div>
        </section>

        <section className={styles.definitionSection} aria-labelledby="definition-heading">
          <div className={styles.sectionInner}>
            <div className={styles.splitIntro}>
              <div>
                <Eyebrow>A durable business role</Eyebrow>
                <h2 id="definition-heading">The job exists before the conversation starts.</h2>
              </div>
              <div>
                <p>The agent&apos;s responsibility, working context, operating standard, and authority are defined with the workflow. A teammate can ask for the job by name because the process does not live inside their prompt.</p>
                <DeepLink href="/services/ai-automation">See how Worktree finds the right workflow</DeepLink>
              </div>
            </div>

            <div className={styles.definitionBoard} aria-label="The parts of a durable agent role">
              <article><span>01</span><p>Persistent responsibility</p><strong>A named job the team can rely on.</strong></article>
              <article><span>02</span><p>Approved context</p><strong>Known sources connected to that job.</strong></article>
              <article><span>03</span><p>Operating standard</p><strong>A routine and acceptance criteria.</strong></article>
              <article><span>04</span><p>Visible history</p><strong>Evidence from completed work and exceptions.</strong></article>
            </div>
          </div>
        </section>

        <section id="agent-run" className={styles.runSection} aria-labelledby="run-heading">
          <div className={styles.runInner}>
            <div className={styles.runIntro}>
              <p className={styles.darkEyebrow}>A reviewable agent run</p>
              <h2 id="run-heading">One request moves through a controlled routine.</h2>
              <p>The workflow gives each step a purpose and each decision an owner. The agent can move routine work forward without hiding where human judgment entered the result.</p>
            </div>
            <ol className={styles.runPath}>
              {runSteps.map(([number, title, copy, status], index) => (
                <li className={index === 3 ? styles.humanStep : undefined} key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <em>{status}</em>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.surfacesSection} aria-labelledby="surfaces-heading">
          <div className={styles.sectionInner}>
            <div className={styles.surfacesIntro}>
              <Eyebrow>Product surfaces</Eyebrow>
              <h2 id="surfaces-heading">The agent is more than its answer.</h2>
              <p>The useful product is the complete operating surface around the work: how it starts, what it can use, where people decide, and what remains available for review.</p>
            </div>
            <div className={styles.surfaceGrid}>
              {productSurfaces.map((surface) => (
                <article key={surface.number}>
                  <header><span>{surface.number}</span><em>{surface.label}</em></header>
                  <h3>{surface.title}</h3>
                  <p>{surface.copy}</p>
                  <div className={styles.surfaceArtifact} aria-hidden="true">
                    <i /><i /><i />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.controlSection} aria-labelledby="controls-heading">
          <div className={styles.controlInner}>
            <div className={styles.controlCopy}>
              <p className={styles.darkEyebrow}>Role-based control</p>
              <h2 id="controls-heading">Access follows the job.</h2>
              <p>An agent does not receive unrestricted access to the business. The deployment defines the systems, information, actions, approvals, and exception paths appropriate to its assigned responsibility.</p>
              <DeepLink href="/product/security">Explore Product Security</DeepLink>
            </div>
            <dl className={styles.controlLedger}>
              {roleControls.map(([term, description], index) => (
                <div key={term}><span>{String(index + 1).padStart(2, "0")}</span><dt>{term}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className={styles.deliverySection} aria-labelledby="delivery-heading">
          <div className={styles.deliveryInner}>
            <div>
              <Eyebrow>From role to production</Eyebrow>
              <h2 id="delivery-heading">The product begins with a workflow your team can define.</h2>
            </div>
            <div>
              <p>Worktree maps the current work, configures the role and its controls, connects the required systems, tests representative cases, and launches the workflow with an agreed operating standard.</p>
              <DeepLink href="/services/ai-implementation">See how Worktree implements the agent</DeepLink>
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="agents-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Start with one responsibility</Eyebrow>
            <h2 id="agents-contact-heading">Bring the work that still depends on the same person.</h2>
            <p>A Worktree engineer will help determine whether it can become a defined, controlled agent role and what the deployment would require.</p>
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
