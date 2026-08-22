/* eslint-disable @next/next/no-img-element */

import { Logomark } from "@/components/logomark";
import styles from "./operating-review-hero.module.css";

const logo = (slug: string) => `https://logos.composio.dev/api/${slug}`;

const workProgress = [
  { value: "38", detail: "CRM records updated", context: "Records current" },
  { value: "31", detail: "follow-ups prepared", context: "Ready to send" },
  { value: "12", detail: "next-step tasks assigned", context: "Owners assigned" },
] as const;

function WorktreeMark() {
  return <Logomark className="worktree-apex-replacement" variant="transparent" />;
}

function ConnectedSystemsChip() {
  return (
    <div className={`worktree-touched-tools-chip ${styles.systemsChip}`} aria-label="CRM, email, and task systems connected to this illustrative workflow">
      <span className="worktree-fdot" />
      <img src={logo("hubspot")} alt="" />
      <img src={logo("salesforce")} alt="" />
      <img src={logo("gmail")} alt="" />
      <img src={logo("asana")} alt="" />
      <b>CRM, email &amp; tasks connected</b>
    </div>
  );
}

function ManagedStatusChip() {
  return (
    <div className={`worktree-fchip worktree-fchip-1 ${styles.managedChip}`}>
      <span className="worktree-fdot" />
      <b>Worktree managed</b>
    </div>
  );
}

function OperatingBrief({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`${styles.briefFrame} ${compact ? styles.briefFrameCompact : ""}`} aria-label="Illustrative Worktree-managed post-meeting sales follow-through operating brief">
      <header className={styles.briefHeader}>
        <div className={styles.briefIdentity}>
          <span className={styles.mark}><WorktreeMark /></span>
          <div>
            <span>Worktree</span>
            <strong>Operating review</strong>
          </div>
        </div>
      </header>

      <section className={styles.outcome}>
        <span>Post-meeting sales follow-through</span>
        <h2>38 meetings. 38 documented next steps.</h2>
        <p>CRM records updated, follow-ups prepared, tasks assigned, and four commercial decisions routed to account owners.</p>
      </section>

      <ol className={styles.progress} aria-label="Work performed">
        {workProgress.map((step, index) => (
          <li key={step.detail}>
            <span className={styles.progressIndex}>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.value}</strong>
            <p>{step.detail}</p>
            <span className={styles.progressContext}>{step.context}</span>
          </li>
        ))}
      </ol>

      <section className={styles.decisionBand}>
        <div>
          <span>Commercial decisions</span>
          <p><strong>4 commercial decisions</strong> routed to account owners.</p>
        </div>
        <span className={styles.decisionStatus}>Routed</span>
      </section>

      <section className={styles.evidenceBand} aria-label="Evaluation and estimated value evidence">
        <div className={styles.evaluationEvidence}>
          <span>Evaluation evidence</span>
          <div>
            <strong>52 / 53</strong>
            <p>cases met the record, follow-up, and handoff standard</p>
          </div>
        </div>
        <div className={styles.valueEvidence}>
          <span>Estimated capacity</span>
          <strong>≈9.4</strong>
          <p>team hours returned</p>
        </div>
      </section>

      <section className={styles.improvementNote}>
        <span className={styles.improvementMark} aria-hidden="true" />
        <div>
          <span>Managed improvement</span>
          <p><strong>One next step lacked an assigned owner.</strong> Owner validation has been added to the next evaluation.</p>
        </div>
      </section>

      <footer className={styles.briefFooter}>
        <span>Illustrative deployment · customer-baseline estimate</span>
        <p>Average manual handling time × work completed, less review time.</p>
      </footer>
    </article>
  );
}

function DesktopOperatingBrief() {
  return (
    <div className={`worktree-stage worktree-stage-desktop ${styles.desktopStage}`}>
      <div className="worktree-glow" />
      <ManagedStatusChip />
      <ConnectedSystemsChip />
      <OperatingBrief />
    </div>
  );
}

function MobileOperatingBrief() {
  return (
    <div className={`worktree-mobile-stage ${styles.mobileStage}`}>
      <div className="worktree-mobile-visual">
        <div className="worktree-mobile-perspective">
          <ManagedStatusChip />
          <OperatingBrief compact />
          <ConnectedSystemsChip />
        </div>
      </div>
    </div>
  );
}

export function OperatingReviewHero() {
  return (
    <>
      <DesktopOperatingBrief />
      <MobileOperatingBrief />
    </>
  );
}
