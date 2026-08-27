"use client";

import Link from "next/link";
import { type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Fingerprint } from "lucide-react";

import styles from "./homepage-workflow-gallery.module.css";

type ExpansionId = "personal-agent" | "secure-cell" | "inbound" | "community" | "clinical";

function ExpandMark() {
  return (
    <span className={styles.expandMark} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M7.5 4H4v3.5M12.5 16H16v-3.5M4.5 7l3-3M15.5 13l-3 3" />
      </svg>
    </span>
  );
}

function PersonalAgentExpansion({
  closeButtonRef,
  onClose,
}: {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className={styles.expansionBackdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div
        aria-labelledby="personal-agent-expansion-title"
        aria-modal="true"
        className={styles.expansionDialog}
        id="personal-agent-expansion"
        onKeyDown={trapFocus}
        role="dialog"
      >
        <button
          aria-label="Close personal agent story"
          className={styles.expansionClose}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <div className={styles.expansionRibbon} aria-hidden="true" />

        <header className={styles.expansionPromise}>
          <div className={styles.expansionPromiseCopy}>
            <p>Personal agent for owners</p>
            <h2 id="personal-agent-expansion-title">Get your time back without becoming the bottleneck.</h2>
            <span>
              A Worktree engineer builds an agent around the knowledge, tools, and decisions your team already depends on you for.
            </span>
            <div className={styles.expansionActions}>
              <Link className={styles.expansionPrimaryCta} href="/deploy">Talk to a Worktree engineer <i>→</i></Link>
              <Link className={styles.expansionSecondaryCta} href="/product/agents">Explore Worktree Agents <i>→</i></Link>
            </div>
          </div>

          <ul className={styles.expansionBenefits}>
            <li><i />Answers routine team questions from approved sources.</li>
            <li><i />Prepares decisions that still need your judgement.</li>
            <li><i />Gives your team access without giving away unrestricted control.</li>
          </ul>
        </header>

        <section className={styles.expansionStory} aria-label="A personal agent handling team requests">
          <div className={styles.expansionStoryHeader}>
            <div>
              <p>Working story</p>
              <h3>Your team asks. The agent handles what it can and brings you what matters.</h3>
            </div>
            <span><i /> Personal agent available</span>
          </div>

          <div className={styles.ownerAgentWorkspace}>
            <div className={styles.ownerAgentThread}>
              <div className={styles.ownerAgentChannel}>
                <div>
                  <strong>#team-questions</strong>
                  <span>Questions, decisions and follow-through</span>
                </div>
                <em>•••</em>
              </div>

              <div className={styles.ownerAgentMessages}>
                <article>
                  <span className={styles.ownerAvatar}>JL</span>
                  <div>
                    <p><strong>Jordan · Sales</strong><time>9:14 AM</time></p>
                    <span>Which pricing sheet should I use for Northstar?</span>
                  </div>
                </article>
                <article className={styles.ownerAgentReply}>
                  <span className={styles.worktreeAvatar}>WT</span>
                  <div>
                    <p><strong>Worktree agent</strong><em>App</em><time>9:14 AM</time></p>
                    <span>Use the 2026 services pricing sheet. I linked the approved version and noted the client-specific terms.</span>
                    <small><i /> Approved source checked</small>
                  </div>
                </article>
                <article>
                  <span className={styles.ownerAvatar}>AM</span>
                  <div>
                    <p><strong>Avery · Operations</strong><time>9:22 AM</time></p>
                    <span>Can we move tomorrow&apos;s delivery date?</span>
                  </div>
                </article>
              </div>
            </div>

            <div className={styles.ownerAgentLedger}>
              <div className={styles.ownerAgentLedgerHeader}>
                <div>
                  <p>Today</p>
                  <strong>7 team questions handled</strong>
                </div>
                <span>1 needs you</span>
              </div>

              <div className={styles.ownerAgentRunList}>
                <article>
                  <span><i className={styles.runComplete} />Pricing guidance</span>
                  <strong>Answered</strong>
                  <small>Approved sheet linked · source recorded</small>
                </article>
                <article>
                  <span><i className={styles.runComplete} />Project status</span>
                  <strong>Answered</strong>
                  <small>Latest task updates checked</small>
                </article>
                <article className={styles.ownerAgentNeedsReview}>
                  <span><i />Delivery date change</span>
                  <strong>Needs your judgement</strong>
                  <small>Customer impact prepared for review</small>
                  <span className={styles.ownerReviewButton}>Review decision <i>→</i></span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.expansionReality} aria-label="How the personal agent operates">
          <div>
            <p>Connected systems</p>
            <strong>Slack, docs and project tools</strong>
          </div>
          <div>
            <p>Access</p>
            <strong>Approved sources and scoped actions</strong>
          </div>
          <div>
            <p>Human involvement</p>
            <strong>Judgement calls return to the owner</strong>
          </div>
          <div>
            <p>Evidence</p>
            <strong>Answers, sources and decisions recorded</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

function SecureCellExpansion({
  closeButtonRef,
  onClose,
}: {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className={styles.expansionBackdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div
        aria-labelledby="secure-cell-expansion-title"
        aria-modal="true"
        className={`${styles.expansionDialog} ${styles.secureExpansionDialog}`}
        id="secure-cell-expansion"
        onKeyDown={trapFocus}
        role="dialog"
      >
        <button
          aria-label="Close secure cell story"
          className={styles.expansionClose}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <div className={styles.secureEditorialGlow} aria-hidden="true" />

        <article className={styles.secureEditorial}>
          <header className={styles.secureEditorialHeader}>
            <div className={styles.secureEditorialTitle}>
              <p>Secure cell architecture</p>
              <h2 id="secure-cell-expansion-title">
                Sensitive data is decrypted for one authorized agent execution.
              </h2>
              <span>
                Each client and practitioner operates inside an isolated cell. When an agent needs sensitive information, a biometric check opens one authorized session. Only the requested data is decrypted inside that cell, and the working context is destroyed after the response is produced.
              </span>
              <Link
                aria-label="Explore the Worktree Product"
                className={styles.secureDocsLink}
                href="/product"
              >
                Explore the Worktree Product <i>→</i>
              </Link>
            </div>

            <aside className={styles.secureInvariant} aria-label="Architectural invariant">
              <p>Architectural invariant</p>
              <strong>
                Sensitive data is unavailable to the agent until a person authorizes a specific request inside the correct cell.
              </strong>
              <dl>
                <div><dt>Default state</dt><dd>Encrypted and unavailable</dd></div>
                <div><dt>Authorization</dt><dd>One request, one session</dd></div>
                <div><dt>Execution scope</dt><dd>One isolated client cell</dd></div>
              </dl>
            </aside>
          </header>

          <section className={styles.secureLifecycle} aria-labelledby="secure-lifecycle-title">
            <header>
              <p>Execution lifecycle</p>
              <h3 id="secure-lifecycle-title">What happens when an agent requests a sensitive record.</h3>
            </header>

            <ol>
              <li>
                <span>01</span>
                <div>
                  <p>Request</p>
                  <h4>The agent asks for a specific piece of sensitive data.</h4>
                  <strong>The record remains encrypted. Nothing sensitive has entered the agent&apos;s working context.</strong>
                </div>
                <dl><dt>Data state</dt><dd>Encrypted</dd><dt>Agent access</dt><dd>None</dd></dl>
              </li>
              <li>
                <span>02</span>
                <div>
                  <p>Boundary selection</p>
                  <h4>The request is routed to the client and practitioner&apos;s isolated cell.</h4>
                  <strong>The execution boundary is established before any protected information is released.</strong>
                </div>
                <dl><dt>Data state</dt><dd>Encrypted</dd><dt>Agent access</dt><dd>None</dd></dl>
              </li>
              <li>
                <span>03</span>
                <div>
                  <p>Biometric authorization</p>
                  <h4>An authorized person approves this request.</h4>
                  <strong>The biometric check creates one session for this request. It does not grant the agent ongoing access.</strong>
                </div>
                <dl><dt>Session</dt><dd>Authorized</dd><dt>Scope</dt><dd>Single execution</dd></dl>
              </li>
              <li>
                <span>04</span>
                <div>
                  <p>Execution inside the cell</p>
                  <h4>Only the requested data is decrypted inside the isolated boundary.</h4>
                  <strong>The agent can use that context to produce one response without gaining access to another client&apos;s data.</strong>
                </div>
                <dl><dt>Data state</dt><dd>Decrypted in cell</dd><dt>Agent access</dt><dd>This execution</dd></dl>
              </li>
              <li>
                <span>05</span>
                <div>
                  <p>Response and teardown</p>
                  <h4>The result is returned, the session closes, and the working context is destroyed.</h4>
                  <strong>A later request begins from the closed state and requires a new authorization.</strong>
                </div>
                <dl><dt>Session</dt><dd>Closed</dd><dt>Working context</dt><dd>Destroyed</dd></dl>
              </li>
            </ol>
          </section>

          <section className={styles.secureStateModel} aria-labelledby="secure-state-title">
            <header>
              <p>Data state</p>
              <h3 id="secure-state-title">Before, during, and after the execution.</h3>
            </header>
            <div>
              <article>
                <span>Before authorization</span>
                <h4>Closed</h4>
                <p>Sensitive records remain encrypted. The agent has no sensitive client context.</p>
              </article>
              <article>
                <span>During execution</span>
                <h4>Open once</h4>
                <p>The requested data is decrypted inside the selected cell for the authorized execution.</p>
              </article>
              <article>
                <span>After response</span>
                <h4>Closed again</h4>
                <p>The authorization ends and the decrypted working context is destroyed.</p>
              </article>
            </div>
          </section>

          <section className={styles.secureBoundaryPurpose} aria-labelledby="secure-purpose-title">
            <div>
              <p>What the boundary accomplishes</p>
              <h3 id="secure-purpose-title">Isolation is the control, not a promise that the model is infallible.</h3>
            </div>
            <ul>
              <li><span>01</span>One client&apos;s execution does not inherit another client&apos;s decrypted context.</li>
              <li><span>02</span>The agent does not retain standing access to sensitive records between requests.</li>
              <li><span>03</span>An authorization cannot silently carry forward into a later execution.</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}

function WorkflowExpansionFrame({
  children,
  closeButtonRef,
  closeLabel,
  dialogId,
  labelledBy,
  onClose,
  ribbon,
}: {
  children: ReactNode;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  closeLabel: string;
  dialogId: string;
  labelledBy: string;
  onClose: () => void;
  ribbon: string;
}) {
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className={styles.expansionBackdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div
        aria-labelledby={labelledBy}
        aria-modal="true"
        className={`${styles.expansionDialog} ${styles.workflowExpansionDialog}`}
        id={dialogId}
        onKeyDown={trapFocus}
        role="dialog"
      >
        <button
          aria-label={closeLabel}
          className={styles.expansionClose}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" /></svg>
        </button>
        <div
          aria-hidden="true"
          className={`${styles.expansionRibbon} ${styles.workflowExpansionRibbon}`}
          style={{ "--expansion-ribbon-image": `url(${ribbon})` } as CSSProperties}
        />
        {children}
      </div>
    </div>
  );
}

function InboundExpansion({ closeButtonRef, onClose }: {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <WorkflowExpansionFrame
      closeButtonRef={closeButtonRef}
      closeLabel="Close inbound marketing story"
      dialogId="inbound-expansion"
      labelledBy="inbound-expansion-title"
      onClose={onClose}
      ribbon="/images/workflow-ribbons/090-canopy-001-rotated-90.webp"
    >
      <header className={styles.expansionPromise}>
        <div className={styles.expansionPromiseCopy}>
          <p>Inbound marketing support</p>
          <h2 id="inbound-expansion-title">Turn every website inquiry into a prepared human conversation.</h2>
          <span>
            Worktree researches the company, checks the signals your team cares about, and prepares the context and response before a person takes over.
          </span>
          <div className={styles.expansionActions}>
            <Link className={styles.expansionPrimaryCta} href="/deploy">Talk to a Worktree engineer <i>→</i></Link>
            <Link className={styles.expansionSecondaryCta} href="/product/agents">Explore Worktree Agents <i>→</i></Link>
          </div>
        </div>
        <ul className={styles.expansionBenefits}>
          <li><i />Research the company and likely need while the inquiry is fresh.</li>
          <li><i />Check fit, availability, and existing account context.</li>
          <li><i />Prepare the reply and handoff without removing the human relationship.</li>
        </ul>
      </header>

      <section className={`${styles.expansionStory} ${styles.inboundExpansionStory}`} aria-label="A website inquiry becoming a prepared handoff">
        <div className={styles.expansionStoryHeader}>
          <div><p>Working story</p><h3>A lead arrives. The research and first follow-through are already moving.</h3></div>
          <span><i /> Handoff prepared</span>
        </div>
        <div className={styles.inboundExpansionWorkspace}>
          <div className={styles.inboundInquiryPanel}>
            <header><span>New website inquiry</span><em>Now</em></header>
            <h4>Looking for help with client intake and follow-through.</h4>
            <p>Northwind Therapy · 18 people</p>
            <dl>
              <div><dt>Contact</dt><dd>Maya Chen · Practice director</dd></div>
              <div><dt>Source</dt><dd>Operations automation page</dd></div>
              <div><dt>Need</dt><dd>Reduce intake delays across three locations</dd></div>
            </dl>
          </div>

          <div className={styles.inboundResearchPanel}>
            <header><span>Agent research</span><em>4 checks complete</em></header>
            <ol>
              <li><i />Company and team profile established <span>Complete</span></li>
              <li><i />Existing CRM history checked <span>No prior account</span></li>
              <li><i />Service fit summarized <span>Strong match</span></li>
              <li><i />Booking availability checked <span>3 openings</span></li>
            </ol>
            <small>Sources and timestamps attached to the handoff.</small>
          </div>

          <div className={styles.inboundHandoffPanel}>
            <header><span>Human handoff</span><em>Alex · Growth</em></header>
            <div className={styles.inboundBrief}>
              <p>Conversation brief</p>
              <h4>Northwind is growing across three clinics and intake follow-through is falling back to the owner.</h4>
              <ul><li>Ask about current intake volume</li><li>Confirm Jane App workflow</li><li>Explore a first intake deployment</li></ul>
            </div>
            <div className={styles.inboundDraft}><span>Reply drafted</span><p>Thanks for reaching out, Maya. I reviewed the context and prepared a few questions for Alex…</p><strong>Ready for human review <i>→</i></strong></div>
          </div>
        </div>
      </section>

      <section className={styles.expansionReality} aria-label="How inbound marketing support operates">
        <div><p>Trigger</p><strong>New website inquiry</strong></div>
        <div><p>Connected systems</p><strong>Website forms, CRM, calendar, and approved sources</strong></div>
        <div><p>Human involvement</p><strong>A person reviews and owns the relationship</strong></div>
        <div><p>Recorded output</p><strong>Research, brief, draft, and handoff history</strong></div>
      </section>
    </WorkflowExpansionFrame>
  );
}

function CommunityExpansion({ closeButtonRef, onClose }: {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <WorkflowExpansionFrame
      closeButtonRef={closeButtonRef}
      closeLabel="Close community feedback story"
      dialogId="community-expansion"
      labelledBy="community-expansion-title"
      onClose={onClose}
      ribbon="/images/workflow-ribbons/093-halo-001.webp"
    >
      <header className={styles.expansionPromise}>
        <div className={styles.expansionPromiseCopy}>
          <p>Discord community feedback</p>
          <h2 id="community-expansion-title">Turn community feedback into a loop people can see closing.</h2>
          <span>
            Worktree listens in the Discord channels you select, groups repeated requests without losing their sources, creates actionable tickets, and returns progress to the original conversations.
          </span>
          <div className={styles.expansionActions}>
            <Link className={styles.expansionPrimaryCta} href="/deploy">Talk to a Worktree engineer <i>→</i></Link>
            <Link className={styles.expansionSecondaryCta} href="/product/agents">Explore Worktree Agents <i>→</i></Link>
          </div>
        </div>
        <ul className={styles.expansionBenefits}>
          <li><i />Capture useful feedback without asking the community to repeat itself.</li>
          <li><i />Preserve every source while one clean ticket moves forward.</li>
          <li><i />Post release and progress updates back to the people who raised it.</li>
        </ul>
      </header>

      <section className={`${styles.expansionStory} ${styles.communityExpansionStory}`} aria-label="Discord feedback becoming a completed product loop">
        <div className={styles.expansionStoryHeader}>
          <div><p>Working story</p><h3>Many conversations become one actionable issue, then one visible update.</h3></div>
          <span><i /> Loop active</span>
        </div>
        <div className={styles.communityExpansionWorkspace}>
          <div className={styles.communitySourcesPanel}>
            <header><span>Discord sources</span><em>3 matched</em></header>
            <article><b>NF</b><div><p>#build-feedback</p><strong>Could saved builds keep their selected sort?</strong><small>Nightfold · Today 9:12</small></div></article>
            <article><b>SB</b><div><p>#suggestions</p><strong>My build resets to newest after reopening.</strong><small>Soulframe Builder · Today 9:46</small></div></article>
            <article><b>NF</b><div><p>#help</p><strong>Can the library remember how I sorted it?</strong><small>Nightfold · Today 10:03</small></div></article>
          </div>

          <div className={styles.communitySynthesisPanel}>
            <span>Deduplication result</span>
            <strong>Saved build sorting does not persist</strong>
            <p>Three requests describe the same behavior. All source messages remain linked.</p>
            <dl><div><dt>Confidence</dt><dd>High</dd></div><div><dt>Sources</dt><dd>3 conversations</dd></div><div><dt>Projects</dt><dd>2 communities</dd></div></dl>
            <i aria-hidden="true">→</i>
          </div>

          <div className={styles.communityTicketPanel}>
            <header><span>Product ticket</span><em>WT-204</em></header>
            <h4>Persist the selected sort for saved builds</h4>
            <ul><li>Original community context attached</li><li>Acceptance criteria prepared</li><li>Source conversations subscribed</li></ul>
            <div><span>Release update</span><p>Saved build sorting now persists between sessions.</p><strong>Queued for 3 Discord replies</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.expansionReality} aria-label="How community feedback support operates">
        <div><p>Listening scope</p><strong>Only selected Discord channels</strong></div>
        <div><p>Deduplication</p><strong>Similar requests grouped with sources preserved</strong></div>
        <div><p>Human involvement</p><strong>Your team owns prioritization and delivery</strong></div>
        <div><p>Closed loop</p><strong>Progress returned to every source conversation</strong></div>
      </section>
    </WorkflowExpansionFrame>
  );
}

function ClinicalExpansion({ closeButtonRef, onClose }: {
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <WorkflowExpansionFrame
      closeButtonRef={closeButtonRef}
      closeLabel="Close clinical practice story"
      dialogId="clinical-expansion"
      labelledBy="clinical-expansion-title"
      onClose={onClose}
      ribbon="/images/workflow-ribbons/043-header-001.webp"
    >
      <header className={styles.expansionPromise}>
        <div className={styles.expansionPromiseCopy}>
          <p>Clinical practice support</p>
          <h2 id="clinical-expansion-title">Give clinicians approved guidance and keep reporting work moving.</h2>
          <span>
            Worktree connects the practice knowledge your clinicians rely on with the session and reporting workflows that follow, while keeping sensitive access inside the controls you define.
          </span>
          <div className={styles.expansionActions}>
            <Link className={styles.expansionPrimaryCta} href="/deploy">Talk to a Worktree engineer <i>→</i></Link>
            <Link className={styles.expansionSecondaryCta} href="/product/agents">Explore Worktree Agents <i>→</i></Link>
          </div>
        </div>
        <ul className={styles.expansionBenefits}>
          <li><i />Answer practice questions from the clinic&apos;s approved knowledge.</li>
          <li><i />Start reporting work when the recorded session is filed.</li>
          <li><i />Prepare insurer and workers&apos; compensation reports for review.</li>
        </ul>
      </header>

      <section className={`${styles.expansionStory} ${styles.clinicalExpansionStory}`} aria-label="Clinical guidance and reporting workflow">
        <div className={styles.expansionStoryHeader}>
          <div><p>Working story</p><h3>One approved knowledge base supports the question and the work that follows.</h3></div>
          <span><i /> Practice workflow active</span>
        </div>
        <div className={styles.clinicalExpansionWorkspace}>
          <div className={styles.clinicalGuidancePanel}>
            <header><div><b>WT</b><span><strong>#clinical-ops</strong><small>Practice guidance agent</small></span></div><em>•••</em></header>
            <article><b>RP</b><div><p>Riley Park <time>3:42 PM</time></p><span>What needs to be included before this report is filed?</span></div></article>
            <article className={styles.clinicalAgentReply}><b>WT</b><div><p>Practice guidance agent <em>App</em></p><span>I checked the clinic&apos;s approved legal and practice knowledge. The filing guidance is ready.</span><small>3 approved sources checked</small></div></article>
            <div className={styles.clinicalSources}><span>Practice manual §4.2</span><span>Insurer requirements</span><span>Clinic reporting policy</span></div>
          </div>

          <div className={styles.clinicalWorkflowPanel}>
            <header><span>Post-session workflow</span><em>1 review required</em></header>
            <ol>
              <li><span>01</span><div><p>Recorded session filed</p><strong>Jane App AI Scribe</strong></div><em>Received</em></li>
              <li><span>02</span><div><p>Required context checked</p><strong>Approved practice knowledge</strong></div><em>Complete</em></li>
              <li><span>03</span><div><p>Insurance report</p><strong>Prepared from the session record</strong></div><em>Ready</em></li>
              <li><span>04</span><div><p>Workers&apos; compensation report</p><strong>Prepared for clinician review</strong></div><em>Review</em></li>
            </ol>
            <div className={styles.clinicalReview}><span>Clinician review</span><strong>Two prepared reports · source requirements attached</strong><i>Open review →</i></div>
          </div>
        </div>
      </section>

      <section className={styles.expansionReality} aria-label="How clinical practice support operates">
        <div><p>Knowledge</p><strong>Clinic-approved legal and practice sources</strong></div>
        <div><p>Workflow trigger</p><strong>Recorded session filed through Jane App AI Scribe</strong></div>
        <div><p>Human involvement</p><strong>Clinician reviews prepared reporting work</strong></div>
        <div><p>Security</p><strong>Sensitive access follows the clinic&apos;s cell controls</strong></div>
      </section>
    </WorkflowExpansionFrame>
  );
}

function TeamAgentVisual() {
  return (
    <div className={`${styles.visual} ${styles.teamVisual}`} aria-hidden="true">
      <div className={styles.phoneFrame}>
        <div className={styles.phoneChrome}>
          <span>9:41</span>
          <i />
          <em>5G</em>
        </div>
        <div className={styles.phoneAgentBar}>
          <span>WT</span>
          <div>
            <strong>Alex&apos;s agent</strong>
            <small><i /> Answering from approved sources</small>
          </div>
        </div>
        <div className={styles.phoneSummary}>
          <span>Today</span>
          <strong>7 team questions handled</strong>
          <em>1 needs you</em>
        </div>
        <div className={styles.phoneThread}>
          <div className={styles.employeeMessage}>
            <div>
              <b>JL</b>
              <span>Jordan · Sales</span>
              <time>9:14</time>
            </div>
            <p>Which pricing sheet should I use for Northstar?</p>
          </div>
          <div className={styles.agentReply}>
            <div>
              <span>WT</span>
              <strong>Worktree agent</strong>
            </div>
            <p>Use the 2026 services pricing sheet. I linked the approved version.</p>
            <small>Pricing library checked</small>
          </div>
          <div className={`${styles.employeeMessage} ${styles.employeeMessageCompact}`}>
            <div>
              <b>AM</b>
              <span>Avery · Operations</span>
              <time>9:22</time>
            </div>
            <p>Can we move tomorrow&apos;s delivery date?</p>
          </div>
          <div className={styles.ownerEscalation}>
            <div><span>Needs Alex</span><em>1 decision</em></div>
            <p>Client context and delivery options are ready.</p>
            <strong>Review prepared decision <b>→</b></strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellVisual() {
  return (
    <div className={`${styles.visual} ${styles.cellVisual}`} aria-hidden="true">
      <div className={styles.cellOrbit}>
        <div className={styles.cellCore}>
          <div className={styles.fingerprintButton}>
            <Fingerprint stroke="url(#cell-fingerprint-gradient)" strokeWidth={1.15}>
              <defs>
                <linearGradient
                  id="cell-fingerprint-gradient"
                  x1="4"
                  y1="3"
                  x2="20"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#929aa6" />
                  <stop offset="1" stopColor="#d9dde3" />
                </linearGradient>
              </defs>
            </Fingerprint>
          </div>
          <small><i /> Identity verified</small>
          <strong>Single authorized execution</strong>
        </div>
      </div>
    </div>
  );
}

function TherapyVisual() {
  return (
    <div className={`${styles.visual} ${styles.therapyVisual}`} aria-hidden="true">
      <div className={styles.therapySlack}>
        <div className={styles.therapySlackHeader}>
          <span className={styles.slackGlyph}>
            <i /><i /><i /><i />
          </span>
          <div>
            <strong>#clinical-ops</strong>
            <small>Practice guidance and reporting</small>
          </div>
          <em>•••</em>
        </div>

        <div className={styles.therapySlackThread}>
          <div className={styles.therapySlackDivider}><span>Today</span></div>

          <div className={styles.therapySlackMessage}>
            <span className={`${styles.therapySlackAvatar} ${styles.clinicianAvatar}`}>RP</span>
            <div className={styles.therapySlackBody}>
              <div className={styles.therapySlackMeta}>
                <strong>Riley Park</strong>
                <time>3:42 PM</time>
              </div>
              <p>What needs to be included before this report is filed?</p>
            </div>
          </div>

          <div className={styles.therapySlackMessage}>
            <span className={`${styles.therapySlackAvatar} ${styles.agentAvatar}`}>WT</span>
            <div className={styles.therapySlackBody}>
              <div className={styles.therapySlackMeta}>
                <strong>Practice guidance agent</strong>
                <span>App</span>
                <time>3:42 PM</time>
              </div>
              <p>I checked the clinic&apos;s approved legal and practice knowledge. The filing guidance is ready.</p>

              <div className={styles.therapySlackAttachment}>
                <div className={styles.therapySessionEvent}>
                  <span>JA</span>
                  <div>
                    <strong>Recorded session filed</strong>
                    <small>Jane App AI Scribe · workflow started</small>
                  </div>
                </div>
                <div className={styles.therapyReportRows}>
                  <div><span>Insurance report</span><strong>Prepared</strong></div>
                  <div><span>Workers&apos; compensation</span><strong>Prepared</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.therapySlackComposer}>
          <span>Message #clinical-ops</span>
          <em>＋</em>
        </div>
      </div>
    </div>
  );
}

function InboundVisual() {
  return (
    <div className={`${styles.visual} ${styles.inboundVisual}`} aria-hidden="true">
      <div className={styles.researchWindow}>
        <div className={styles.researchWindowChrome}>
          <span className={styles.researchWindowControls}><i /><i /><i /></span>
          <span>Lead intelligence</span>
        </div>
        <div className={styles.researchWindowBody}>
          <div className={styles.leadCard}>
            <div><span>New website inquiry</span><em>Now</em></div>
            <strong>Looking for help with client intake and follow-through.</strong>
            <p>Northwind Therapy · 18 people</p>
          </div>
          <div className={styles.researchTrail}>
            <span><i /> Company researched</span>
            <span><i /> Booking checked</span>
            <span><i /> Brief prepared</span>
          </div>
          <div className={styles.emailPreview}>
            <div><span>Worktree agent</span><em>Human included</em></div>
            <strong>Thanks for reaching out. I&apos;ve prepared the context for Alex...</strong>
            <p>Reply ready · Slack brief delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityResultPanel() {
  return (
    <div className={styles.communityResultPanel}>
      <div className={styles.communityOutcomeSequence}>
        <div><strong>208</strong><span>threads synthesized</span></div>
        <i>→</i>
        <div><strong>8</strong><span>tickets created</span></div>
        <i>→</i>
        <div><strong>208</strong><span>responses sent</span></div>
      </div>
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className={`${styles.visual} ${styles.communityVisual}`} aria-hidden="true">
      <CommunityResultPanel />
    </div>
  );
}

const workflowCards = [
  {
    number: "01",
    label: "Personal agent for owners",
    title: "Get your time back, and power up your team.",
    ribbon: "/images/workflow-ribbons/057-header-001.webp",
    ribbonPosition: "50% 44%",
    visual: <TeamAgentVisual />,
  },
  {
    number: "02",
    label: "Secure Cell architecture",
    title: "Keep sensitive data scoped to one authorized execution.",
    ribbon: null,
    ribbonPosition: "50% 50%",
    visual: <CellVisual />,
    featured: true,
  },
  {
    number: "03",
    label: "Inbound marketing support",
    title: "Research every website lead and prepare the handoff.",
    ribbon: "/images/workflow-ribbons/071-header-001.webp",
    ribbonPosition: "50% 44%",
    visual: <InboundVisual />,
  },
  {
    number: "04",
    label: "Discord community feedback",
    title: "Turn community feedback into tickets, then close the loop.",
    ribbon: "/images/workflow-ribbons/093-halo-001.webp",
    ribbonPosition: "right bottom",
    visual: <CommunityVisual />,
  },
  {
    number: "05",
    label: "Clinical practice support",
    title: "Give clinicians on-demand guidance and automate post-session reporting.",
    ribbon: "/images/workflow-ribbons/085-halo-001.webp",
    ribbonPosition: "50% 48%",
    visual: <TherapyVisual />,
  },
] as const;

export function HomepageWorkflowGallery() {
  const [activeExpansion, setActiveExpansion] = useState<ExpansionId | null>(null);
  const personalAgentTriggerRef = useRef<HTMLButtonElement>(null);
  const secureCellTriggerRef = useRef<HTMLButtonElement>(null);
  const inboundTriggerRef = useRef<HTMLButtonElement>(null);
  const communityTriggerRef = useRef<HTMLButtonElement>(null);
  const clinicalTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const expansionCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const expansionFromHash: Record<string, ExpansionId> = {
        "#personal-agent": "personal-agent",
        "#secure-cell": "secure-cell",
        "#inbound": "inbound",
        "#community": "community",
        "#clinical": "clinical",
      };

      setActiveExpansion(expansionFromHash[window.location.hash] ?? null);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (activeExpansion === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const pageMain = document.querySelector<HTMLElement>("main");

    document.body.style.overflow = "hidden";
    pageMain?.setAttribute("inert", "");

    const focusTimer = window.setTimeout(() => expansionCloseRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      pageMain?.removeAttribute("inert");
    };
  }, [activeExpansion]);

  function openExpansion(expansion: ExpansionId, trigger: RefObject<HTMLButtonElement | null>) {
    activeTriggerRef.current = trigger.current;
    setActiveExpansion(expansion);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${expansion}`);
  }

  function closeExpansion() {
    setActiveExpansion(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => activeTriggerRef.current?.focus(), 0);
  }

  return (
    <>
      <section className={styles.section} aria-labelledby="workflow-gallery-heading">
        <div className={styles.inner}>
          <header className={styles.intro}>
            <p className="worktree-type-eyebrow">What you can build</p>
            <h2 id="workflow-gallery-heading" className="worktree-type-section-title">
              Put AI to work across the parts of your business that need more capacity.
            </h2>
          </header>

          <div className={styles.grid}>
            {workflowCards.map((card) => {
              const expansionConfig = card.number === "01"
                ? { id: "personal-agent" as const, dialogId: "personal-agent-expansion", ref: personalAgentTriggerRef }
                : card.number === "02"
                  ? { id: "secure-cell" as const, dialogId: "secure-cell-expansion", ref: secureCellTriggerRef }
                  : card.number === "03"
                    ? { id: "inbound" as const, dialogId: "inbound-expansion", ref: inboundTriggerRef }
                    : card.number === "04"
                      ? { id: "community" as const, dialogId: "community-expansion", ref: communityTriggerRef }
                      : { id: "clinical" as const, dialogId: "clinical-expansion", ref: clinicalTriggerRef };
              const cardTitleId = `workflow-card-title-${card.number}`;

              return (
                <article
                  className={`${styles.card} ${"featured" in card && card.featured ? styles.featuredCard : ""}`}
                  key={card.number}
                  style={{
                    "--workflow-ribbon": card.ribbon ? `url(${card.ribbon})` : "none",
                    "--workflow-ribbon-position": card.ribbonPosition,
                  } as CSSProperties}
                >
                  <div aria-hidden="true" className={styles.cardGrain} />
                  <div className={styles.cardHeader}>
                    <div>
                      <p>{card.label}</p>
                      <h3 id={cardTitleId}>{card.title}</h3>
                    </div>
                    <ExpandMark />
                  </div>
                  {card.visual}
                  <button
                    aria-controls={expansionConfig.dialogId}
                    aria-expanded={activeExpansion === expansionConfig.id}
                    aria-haspopup="dialog"
                    aria-labelledby={cardTitleId}
                    className={styles.cardAction}
                    onClick={() => openExpansion(expansionConfig.id, expansionConfig.ref)}
                    ref={expansionConfig.ref}
                    type="button"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeExpansion === "personal-agent" && typeof document !== "undefined"
        ? createPortal(
          <PersonalAgentExpansion closeButtonRef={expansionCloseRef} onClose={closeExpansion} />,
          document.body,
        )
        : null}
      {activeExpansion === "secure-cell" && typeof document !== "undefined"
        ? createPortal(
          <SecureCellExpansion closeButtonRef={expansionCloseRef} onClose={closeExpansion} />,
          document.body,
        )
        : null}
      {activeExpansion === "inbound" && typeof document !== "undefined"
        ? createPortal(
          <InboundExpansion closeButtonRef={expansionCloseRef} onClose={closeExpansion} />,
          document.body,
        )
        : null}
      {activeExpansion === "community" && typeof document !== "undefined"
        ? createPortal(
          <CommunityExpansion closeButtonRef={expansionCloseRef} onClose={closeExpansion} />,
          document.body,
        )
        : null}
      {activeExpansion === "clinical" && typeof document !== "undefined"
        ? createPortal(
          <ClinicalExpansion closeButtonRef={expansionCloseRef} onClose={closeExpansion} />,
          document.body,
        )
        : null}
    </>
  );
}
