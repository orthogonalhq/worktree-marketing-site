/* eslint-disable @next/next/no-img-element */

import { Logomark } from "@/components/logomark";
import styles from "./engineering-workspace-hero.module.css";

const logo = (slug: string) => `https://logos.composio.dev/api/${slug}`;

const portfolio = [
  ["Sales follow-through", "Operating"],
  ["Customer onboarding", "In build"],
  ["Finance review", "Learning"],
] as const;

const workingNotes = [
  ["Workflow notes", "Mapped with the team"],
  ["Access plan", "Under review"],
  ["Representative cases", "Preparing tests"],
] as const;

function WorktreeMark() {
  return <Logomark className="worktree-apex-replacement" variant="transparent" />;
}

function ManagedChip() {
  return (
    <div className={`worktree-fchip worktree-fchip-1 ${styles.managedChip}`}>
      <span className="worktree-fdot" />
      <b>Worktree managed</b>
    </div>
  );
}

function WorkspaceSurface({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`${styles.surface} ${compact ? styles.surfaceCompact : ""}`} aria-label="Illustrative shared workspace with a Worktree engineer and a growing portfolio of managed agent workflows">
      <header className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.mark}><WorktreeMark /></span>
          <div><span>Shared operating workspace</span><strong>Worktree engineer</strong></div>
        </div>
        <span className={styles.presence}><i /> Alongside your team</span>
      </header>

      <div className={styles.workspaceBody}>
        <section className={styles.workingSession}>
          <span className={styles.sectionLabel}>Current working session</span>
          <h2>Customer onboarding</h2>
          <p>Learning the handoff between Sales, Customer Success, and Operations.</p>
          <div className={styles.teamScope} aria-label="Teams in the working session">
            <span>Sales</span><span>Customer success</span><span>Operations</span>
          </div>
          <div className={styles.workingNotes}>
            {workingNotes.map(([label, status]) => (
              <div key={label}><span>{label}</span><strong>{status}</strong></div>
            ))}
          </div>
        </section>

        <section className={styles.portfolio}>
          <div className={styles.portfolioHeader}>
            <div><span className={styles.sectionLabel}>Managed portfolio</span><h2>Agents, workflows, and runtimes</h2></div>
            <span>Growing over time</span>
          </div>
          <ol>
            {portfolio.map(([name, status], index) => (
              <li key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong>
                <em className={status === "Operating" ? styles.operating : undefined}>{status}</em>
              </li>
            ))}
          </ol>
          <p className={styles.portfolioNote}>Each addition is scoped, connected, tested, and managed as part of the operating relationship.</p>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.systems} aria-label="Illustrative connected business systems">
          <img src={logo("gmail")} alt="" />
          <img src={logo("hubspot")} alt="" />
          <img src={logo("googledrive")} alt="" />
          <img src={logo("slack")} alt="" />
          <span>Selected systems connect as each job requires</span>
        </div>
        <span>Illustrative workspace</span>
      </footer>
    </article>
  );
}

function DesktopWorkspace() {
  return (
    <div className={`worktree-stage worktree-stage-desktop ${styles.desktopStage}`}>
      <ManagedChip />
      <WorkspaceSurface />
    </div>
  );
}

function MobileWorkspace() {
  return (
    <div className={`worktree-mobile-stage ${styles.mobileStage}`}>
      <div className="worktree-mobile-visual">
        <div className="worktree-mobile-perspective">
          <ManagedChip />
          <WorkspaceSurface compact />
        </div>
      </div>
    </div>
  );
}

export function EngineeringWorkspaceHero() {
  return <><DesktopWorkspace /><MobileWorkspace /></>;
}
