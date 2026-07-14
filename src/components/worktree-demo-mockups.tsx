/* eslint-disable @next/next/no-img-element */
"use client";

import { type CSSProperties, type ReactNode, useEffect, useId, useState } from "react";
import { Logomark } from "@/components/logomark";
import heroCardStyles from "../app/hero-sub-header-cards.module.css";

const logo = (slug: string) => `https://logos.composio.dev/api/${slug}`;
const cx = (...classNames: Array<string | false | null | undefined>) => classNames.filter(Boolean).join(" ");

function RunLedgerPrismChip({ children }: { children: string }) {
  return (
    <span className={`${heroCardStyles.wrap} ${heroCardStyles.highlight} manual-work-prism-chip run-ledger-prism-chip nous-mono`}>
      <span className={heroCardStyles.card}>
        <span className={heroCardStyles.label}>{children.toUpperCase()}</span>
      </span>
      <span aria-hidden="true" className={heroCardStyles.edgeShine}>
        <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelRed}`} />
        <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelGreen}`} />
        <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelBlue}`} />
      </span>
      <span aria-hidden="true" className={heroCardStyles.edgePrism} />
      <span aria-hidden="true" className={heroCardStyles.prism} />
      <span aria-hidden="true" className={heroCardStyles.shadow} />
    </span>
  );
}

const touchedTools = [
  { name: "Slack", slug: "slack" },
  { name: "Gmail", slug: "gmail" },
  { name: "Outlook", slug: "outlook" },
  { name: "Linear", slug: "linear" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Notion", slug: "notion" },
  { name: "Google Drive", slug: "googledrive" },
  { name: "Google Sheets", slug: "googlesheets" },
  { name: "Stripe", slug: "stripe" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Zendesk", slug: "zendesk", needsLightBg: true },
  { name: "Airtable", slug: "airtable" },
  { name: "Asana", slug: "asana" },
  { name: "Shopify", slug: "shopify" },
  { name: "QuickBooks", slug: "quickbooks" },
  { name: "DocuSign", slug: "docusign" },
  { name: "Jira", slug: "jira" },
  { name: "GitHub", slug: "github", needsLightBg: true },
  { name: "Calendar", slug: "googlecalendar" },
  { name: "Intercom", slug: "intercom", needsLightBg: true },
];

function WorktreeMark() {
  return <Logomark className="worktree-apex-replacement" variant="transparent" />;
}

function TouchedToolsChip() {
  return (
    <div className="worktree-touched-tools-chip">
      <span className="worktree-fdot" />
      <img src={logo("gmail")} alt="" />
      <img src={logo("slack")} alt="" />
      <img src={logo("notion")} alt="" />
      <img src={logo("linear")} alt="" />
      <b>Email, Slack, projects & calendar</b>
    </div>
  );
}

export function ToolsEcosystemBadge() {
  return (
    <div className="tools-ecosystem-badge" aria-label="Worktree connects to thousands of business tools">
      <div className="tools-ecosystem-icons" aria-hidden="true">
        {touchedTools.map((tool) => (
          <img
            className={tool.needsLightBg ? "tools-ecosystem-logo tools-ecosystem-logo-light-bg" : "tools-ecosystem-logo"}
            src={logo(tool.slug)}
            alt=""
            key={tool.slug}
            title={tool.name}
          />
        ))}
      </div>
      <div className="tools-ecosystem-copy">
        <span>Connects across</span>
        <strong>1,000+ tools</strong>
      </div>
    </div>
  );
}

function SlackSurface({ compact = false }: { compact?: boolean }) {
  const [visibleStep, setVisibleStep] = useState(compact ? 6 : -1);
  const [typedMessage, setTypedMessage] = useState("");
  const userPrepMessage = "Perfect. Let’s get everything we need prepped.";
  const isTyping = !compact && (visibleStep === 0 || visibleStep === 5);
  const isUserTyping = !compact && (visibleStep === 2 || visibleStep === 3);
  const isSending = !compact && visibleStep === 3;
  const showSendButton = isUserTyping && (typedMessage.length > 0 || isSending);

  useEffect(() => {
    if (compact) return;

    let cancelled = false;

    function sleep(ms: number) {
      return new Promise((resolve) => window.setTimeout(resolve, ms));
    }

    async function typeMessage(message: string) {
      setTypedMessage("");

      for (let index = 0; index < message.length; index += 1) {
        if (cancelled) return false;

        const previousCharacter = message[index - 1] ?? "";
        const delay = previousCharacter === "." ? 150 : previousCharacter === " " ? 34 : 42 + ((index * 17) % 36);

        await sleep(delay);
        if (cancelled) return false;

        setTypedMessage(message.slice(0, index + 1));
      }

      return true;
    }

    async function playScene() {
      while (!cancelled) {
        await sleep(500);
        if (cancelled) return;
        setTypedMessage("");
        setVisibleStep(-1);

        await sleep(700);
        if (cancelled) return;
        setVisibleStep(0);

        await sleep(1100);
        if (cancelled) return;
        setVisibleStep(1);

        await sleep(3300);
        if (cancelled) return;
        setVisibleStep(2);

        const typed = await typeMessage(userPrepMessage);
        if (!typed || cancelled) return;

        await sleep(500);
        if (cancelled) return;
        setVisibleStep(3);

        await sleep(350);
        if (cancelled) return;
        setVisibleStep(4);

        await sleep(1200);
        if (cancelled) return;
        setVisibleStep(5);

        await sleep(1800);
        if (cancelled) return;
        setVisibleStep(6);

        await sleep(6000);
      }
    }

    void playScene();

    return () => {
      cancelled = true;
    };
  }, [compact, userPrepMessage]);

  return (
    <div className="worktree-slack">
      <div className="worktree-slack-side">
        <div className="worktree-ws">
          <img className="worktree-slk" src={logo("slack")} alt="Slack" /> Slack
        </div>
        <div className="worktree-ch-grp">Channels</div>
        <div className="worktree-ch">#general</div>
        <div className="worktree-ch">#sales</div>
        <div className="worktree-ch">#projects</div>
        <div className="worktree-ch worktree-dm worktree-on"><span className="worktree-pres" /> Agent</div>
      </div>
      <div className="worktree-slack-main">
        <div className="worktree-slack-head"><b>Agent</b><span className="worktree-topic">Today’s priorities, prepared for review</span></div>
        <div className="worktree-slack-msgs">
          <div className="worktree-slack-day-divider"><span>Yesterday</span></div>
          {visibleStep >= 1 ? (
            <div className="worktree-smsg worktree-agent worktree-in">
              <div className="worktree-av"><WorktreeMark /></div>
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">Agent</span><span className="worktree-app">App</span><span className="worktree-tm">9:00 AM</span></div>
                <div className="worktree-tx">
                  <p>Morning — I ran your daily check.</p>
                  <p>Here’s what needs you:</p>
                  <ul className="worktree-slack-list">
                    <li><b>Northstar</b> — reply is 4 days overdue.</li>
                    <li><b>Acme</b> — invoice is waiting for approval.</li>
                    <li><b>Launch</b> — blocked on your final sign-off.</li>
                    <li><b>11:30 call</b> — needs updated project notes.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
          {visibleStep >= 4 ? (
            <div className="worktree-smsg worktree-in">
              <img className="worktree-av" src="/portraits/you.png" alt="" />
              <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">9:05 AM</span></div><div className="worktree-tx">{userPrepMessage}</div></div>
            </div>
          ) : null}
          {visibleStep >= 6 ? (
            <div className="worktree-smsg worktree-agent worktree-in">
              <div className="worktree-av"><WorktreeMark /></div>
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">Agent</span><span className="worktree-app">App</span><span className="worktree-tm">9:06 AM</span></div>
                <div className="worktree-tx">
                  <p>Done. You can review everything here:</p>
                  <ul className="worktree-slack-list">
                    <li><b>Northstar reply</b> — in <span className="worktree-slack-link">email drafts</span>.</li>
                    <li><b>Acme note</b> — in <span className="worktree-slack-link">approvals</span>.</li>
                    <li><b>Launch item</b> — in <span className="worktree-slack-link">the project checklist</span>.</li>
                    <li><b>11:30 notes</b> — in <span className="worktree-slack-link">today’s brief</span>.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {isTyping ? <div className="worktree-slack-typing">Agent is typing<span className="worktree-typing-dots"><i /><i /><i /></span></div> : null}
        <div className={isUserTyping ? "worktree-slack-composer worktree-slack-composer-active" : "worktree-slack-composer"}>
          <span className={isUserTyping ? `worktree-composer-text ${visibleStep === 2 ? "worktree-composer-text-writing" : ""}` : "worktree-composer-placeholder"}>
            {isUserTyping ? typedMessage : "Message Agent"}
          </span>
          {showSendButton ? <span className={isSending ? "worktree-composer-send worktree-composer-send-click" : "worktree-composer-send"} aria-hidden="true">↑</span> : null}
        </div>
      </div>
    </div>
  );
}

function MobileSlackSurface() {
  const [visibleStep, setVisibleStep] = useState(-1);
  const [typedMessage, setTypedMessage] = useState("");
  const userPrepMessage = "Perfect. Let’s get everything we need prepped.";
  const isTyping = visibleStep === 0 || visibleStep === 5;
  const isUserTyping = visibleStep === 2 || visibleStep === 3;
  const isSending = visibleStep === 3;
  const showSendButton = isUserTyping && (typedMessage.length > 0 || isSending);

  useEffect(() => {
    let cancelled = false;

    function sleep(ms: number) {
      return new Promise((resolve) => window.setTimeout(resolve, ms));
    }

    async function typeMessage(message: string) {
      setTypedMessage("");

      for (let index = 0; index < message.length; index += 1) {
        if (cancelled) return false;

        const previousCharacter = message[index - 1] ?? "";
        const delay = previousCharacter === "." ? 150 : previousCharacter === " " ? 34 : 42 + ((index * 17) % 36);

        await sleep(delay);
        if (cancelled) return false;

        setTypedMessage(message.slice(0, index + 1));
      }

      return true;
    }

    async function playScene() {
      while (!cancelled) {
        await sleep(500);
        if (cancelled) return;
        setTypedMessage("");
        setVisibleStep(-1);

        await sleep(700);
        if (cancelled) return;
        setVisibleStep(0);

        await sleep(1100);
        if (cancelled) return;
        setVisibleStep(1);

        await sleep(3300);
        if (cancelled) return;
        setVisibleStep(2);

        const typed = await typeMessage(userPrepMessage);
        if (!typed || cancelled) return;

        await sleep(500);
        if (cancelled) return;
        setVisibleStep(3);

        await sleep(350);
        if (cancelled) return;
        setVisibleStep(4);

        await sleep(1200);
        if (cancelled) return;
        setVisibleStep(5);

        await sleep(1800);
        if (cancelled) return;
        setVisibleStep(6);

        await sleep(6000);
      }
    }

    void playScene();

    return () => {
      cancelled = true;
    };
  }, [userPrepMessage]);

  return (
    <div className="worktree-mobile-slack" aria-label="Mobile Slack mockup showing an agent conversation">
      <div className="worktree-mobile-slack-head">
        <span aria-hidden="true" className="worktree-mobile-slack-back">‹</span>
        <div className="worktree-mobile-slack-title">
          <span className="worktree-mobile-slack-title-icon"><WorktreeMark /></span>
          <span className="worktree-mobile-slack-title-copy">
            <b>Agent</b>
            <span>Active now</span>
          </span>
        </div>
        <span aria-hidden="true" className="worktree-mobile-slack-more">•••</span>
      </div>
      <div className="worktree-mobile-slack-msgs">
        <div className="worktree-slack-day-divider"><span>Yesterday</span></div>
        {visibleStep >= 1 ? (
          <div className="worktree-smsg worktree-agent worktree-in">
            <div className="worktree-av"><WorktreeMark /></div>
            <div className="worktree-bd">
              <div className="worktree-hd"><span className="worktree-nm">Agent</span><span className="worktree-app">App</span><span className="worktree-tm">9:00 AM</span></div>
              <div className="worktree-tx">
                <p>Morning — I ran your daily check.</p>
                <ul className="worktree-slack-list">
                  <li><b>Northstar</b> — reply is 4 days overdue.</li>
                  <li><b>Acme</b> — invoice is waiting for approval.</li>
                  <li><b>Launch</b> — blocked on your final sign-off.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
        {visibleStep >= 4 ? (
          <div className="worktree-smsg worktree-in">
            <img className="worktree-av" src="/portraits/you.png" alt="" />
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">9:05 AM</span></div><div className="worktree-tx">{userPrepMessage}</div></div>
          </div>
        ) : null}
        {visibleStep >= 6 ? (
          <div className="worktree-smsg worktree-agent worktree-in">
            <div className="worktree-av"><WorktreeMark /></div>
            <div className="worktree-bd">
              <div className="worktree-hd"><span className="worktree-nm">Agent</span><span className="worktree-app">App</span><span className="worktree-tm">9:06 AM</span></div>
              <div className="worktree-tx">
                <p>Done. You can review the drafts, approvals, checklist, and brief.</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {isTyping ? <div className="worktree-slack-typing">Agent is typing<span className="worktree-typing-dots"><i /><i /><i /></span></div> : null}
      <div className={isUserTyping ? "worktree-slack-composer worktree-slack-composer-active" : "worktree-slack-composer"}>
        <span className={isUserTyping ? `worktree-composer-text ${visibleStep === 2 ? "worktree-composer-text-writing" : ""}` : "worktree-composer-placeholder"}>
          {isUserTyping ? typedMessage : "Message Agent"}
        </span>
        {showSendButton ? <span className={isSending ? "worktree-composer-send worktree-composer-send-click" : "worktree-composer-send"} aria-hidden="true">↑</span> : null}
      </div>
    </div>
  );
}

export function HeroSlackMockup() {
  return (
    <>
      <div className="worktree-stage worktree-stage-desktop">
        <div className="worktree-glow" />
        <div className="worktree-fchip worktree-fchip-1"><span className="worktree-fdot" /> <b>Personal Agent</b></div>
        <TouchedToolsChip />
        <SlackSurface />
      </div>
      <div className="worktree-mobile-stage">
        <div className="worktree-mobile-visual">
          <div className="worktree-mobile-perspective">
            <div className="worktree-fchip worktree-fchip-1"><span className="worktree-fdot" /> <b>Personal Agent</b></div>
            <MobileSlackSurface />
            <TouchedToolsChip />
          </div>
        </div>
      </div>
    </>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 6.5C5 4.57 8.13 3 12 3s7 1.57 7 3.5v11C19 19.43 15.87 21 12 21s-7-1.57-7-3.5v-11Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M19 6.5C19 8.43 15.87 10 12 10S5 8.43 5 6.5M19 12c0 1.93-3.13 3.5-7 3.5S5 13.93 5 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FileAttachmentIcon({ type }: { type: string }) {
  switch (type) {
    case "ICS":
      return <img src={logo("googlecalendar")} alt="" />;
    case "DOC":
      return <img src={logo("googledocs")} alt="" />;
    case "EML":
      return <img src={logo("gmail")} alt="" />;
    case "CRM":
      return <img src={logo("salesforce")} alt="" />;
    default:
      return <DatabaseIcon />;
  }
}

function MoveLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7 3 12l5 5M3 12h18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function MoveRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 7l5 5-5 5M3 12h18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function WorkflowWindowChrome({ icon = "worktree", title }: { icon?: "database" | "worktree"; title: string }) {
  return (
    <div className="worktree-workflow-window-bar" aria-hidden="true">
      <div className="worktree-workflow-nav-controls">
        <span><MoveLeftIcon /></span>
        <span><MoveRightIcon /></span>
      </div>
      <div className="worktree-workflow-window-title">
        <span className="worktree-run-tab-mark">{icon === "database" ? <DatabaseIcon /> : <WorktreeMark />}</span>
        <b>{title}</b>
      </div>
      <div className="worktree-workflow-window-controls">
        <span><MinimizeIcon /></span>
        <span><SquareIcon /></span>
        <span><CloseIcon /></span>
      </div>
    </div>
  );
}

const runScenes = [
  {
    key: "slack-request",
    label: "Request",
    app: "Slack",
    logo: "slack",
    tag: "01 · Slack request",
    headline: "The rep triggers a known workflow.",
    copy: "Work starts where the team already works. The rep invokes an installed customer follow-up routine instead of asking a manager to route the task.",
    bullets: ["Named routine, not a blank prompt", "Account and contact inferred", "Run begins in the deal channel"],
    durationMs: 6700,
  },
  {
    key: "run-confirmation",
    label: "Workflow",
    app: "Run card",
    logo: "worktree",
    tag: "02 · Controlled run",
    headline: "Worktree confirms the scope before it acts.",
    copy: "The workflow announces its goal, allowed tools, approval rules, and run history so the team can see the boundaries before work moves across systems.",
    bullets: ["Allowed tools are explicit", "Approval rules are visible", "Run history is enabled"],
    durationMs: 5200,
  },
  {
    key: "gmail-thread",
    label: "Email",
    app: "Gmail",
    logo: "gmail",
    tag: "03 · Gmail thread",
    headline: "The agent finds the source message.",
    copy: "Worktree locates Sofia Patel’s latest reply, extracts intent, and identifies the details the customer follow-up routine needs next.",
    bullets: ["Pricing question detected", "Follow-up requested this week", "Decision maker copied"],
    durationMs: 5200,
  },
  {
    key: "context-retrieval",
    label: "Context",
    app: "Retrieval",
    logo: "database",
    tag: "04 · Context retrieval",
    headline: "The installed checklist runs live.",
    copy: "The routine gathers the same context your operators would check manually: CRM, email, pricing notes, contract terms, meeting history, and calendar availability.",
    bullets: ["Sources checked in order", "Policy and templates applied", "Missing context stays visible"],
    durationMs: 5200,
  },
  {
    key: "calendar-booking",
    label: "Booking",
    app: "Calendar",
    logo: "googlecalendar",
    tag: "05 · Calendar booking",
    headline: "Worktree executes the next step.",
    copy: "The agent finds a valid slot, creates the meeting, and adds the agenda and links required for the rep to show up prepared.",
    bullets: ["Meeting created", "Agenda attached", "Source thread linked"],
    durationMs: 5200,
  },
  {
    key: "slack-complete",
    label: "Complete",
    app: "Slack",
    logo: "slack",
    tag: "06 · Complete",
    headline: "The run returns with clickable artifacts.",
    copy: "Worktree closes the loop in Slack with the result, the systems updated, and links to every artifact created or touched during the run.",
    bullets: ["Calendar invite linked", "Account brief created", "Run record saved"],
    durationMs: 5200,
  },
] as const;

type RunSceneKey = (typeof runScenes)[number]["key"];

function RunSlackRequestSurface() {
  const [visibleStep, setVisibleStep] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const requestMessage = "@Worktree run customer follow-up for Sofia Patel at Evergreen Supply.";
  const isTypingRequest = visibleStep === 2;
  const isSendingRequest = visibleStep === 3;
  const showWorktreeReply = visibleStep >= 4;

  useEffect(() => {
    let cancelled = false;

    function sleep(ms: number) {
      return new Promise((resolve) => window.setTimeout(resolve, ms));
    }

    async function playScene() {
      setVisibleStep(0);
      setTypedMessage("");

      await sleep(520);
      if (cancelled) return;
      setVisibleStep(1);

      await sleep(820);
      if (cancelled) return;
      setVisibleStep(2);

      for (let index = 0; index < requestMessage.length; index += 1) {
        const previousCharacter = requestMessage[index - 1] ?? "";
        const delay = previousCharacter === " " ? 28 : 34 + ((index * 13) % 24);
        await sleep(delay);
        if (cancelled) return;
        setTypedMessage(requestMessage.slice(0, index + 1));
      }

      await sleep(280);
      if (cancelled) return;
      setVisibleStep(3);

      await sleep(360);
      if (cancelled) return;
      setVisibleStep(4);
    }

    void playScene();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="worktree-slack">
      <div className="worktree-slack-side">
        <div className="worktree-ws">
          <img className="worktree-slk" src={logo("slack")} alt="Slack" /> Slack
        </div>
        <div className="worktree-ch-grp">Channels</div>
        <div className="worktree-ch">#general</div>
        <div className="worktree-ch worktree-on">#sales</div>
        <div className="worktree-ch">#customer-success</div>
        <div className="worktree-ch worktree-dm"><span className="worktree-pres" /> Worktree</div>
      </div>
      <div className="worktree-slack-main">
        <div className="worktree-slack-head"><b>#sales</b><span className="worktree-topic">Pipeline, pricing & deals</span></div>
        <div className="worktree-slack-msgs">
          {visibleStep >= 1 ? <div className="worktree-smsg worktree-in">
            <img className="worktree-av" src="/portraits/you.png" alt="" />
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:02</span></div><div className="worktree-tx">Sofia Patel at Evergreen Supply replied about pricing and wants to talk this week.</div></div>
          </div> : null}
          {visibleStep >= 3 ? <div className="worktree-smsg worktree-in">
            <img className="worktree-av" src="/portraits/you.png" alt="" />
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:03</span></div><div className="worktree-tx"><span className="worktree-slack-link">@Worktree</span> run customer follow-up for Sofia Patel at Evergreen Supply.</div></div>
          </div> : null}
          {showWorktreeReply ? <div className="worktree-smsg worktree-agent worktree-in">
            <div className="worktree-av"><WorktreeMark /></div>
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">Worktree</span><span className="worktree-app">App</span><span className="worktree-tm">10:03</span></div><div className="worktree-tx">Starting controlled run: <b>Customer follow-up</b>.</div></div>
          </div> : null}
        </div>
        {visibleStep === 4 ? <div className="worktree-slack-typing">Worktree is typing<span className="worktree-typing-dots"><i /><i /><i /></span></div> : null}
        <div className={isTypingRequest || isSendingRequest ? "worktree-slack-composer worktree-slack-composer-active" : "worktree-slack-composer"}>
          <span className={isTypingRequest ? "worktree-composer-text worktree-composer-text-writing" : "worktree-composer-placeholder"}>{isTypingRequest || isSendingRequest ? typedMessage : "Message #sales"}</span>
          {isTypingRequest || isSendingRequest ? <span className={isSendingRequest ? "worktree-composer-send worktree-composer-send-click" : "worktree-composer-send"} aria-hidden="true">↑</span> : null}
        </div>
      </div>
    </div>
  );
}

function RunConfirmationSurface() {
  const headerInfo = [
    ["Run #", "1842"],
    ["Triggered by", "Andrew Nelson"],
    ["Trigger", "Slack mention"],
    ["Account", "Evergreen Supply"],
    ["Contact", "Sofia Patel"],
  ];
  const accessRows = [
    ["gmail", "Gmail", "Read, Draft emails"],
    ["salesforce", "Salesforce", "Read only"],
    ["googlecalendar", "Calendar", "Read, Create invites"],
    ["slack", "Slack", "Read, Post messages"],
  ];

  return (
    <div className="worktree-run-card-surface worktree-workflow-card worktree-workflow-card-storyboard">
      <WorkflowWindowChrome title="Workflow" />
      <div className="worktree-workflow-compact-summary">
        <div className="worktree-workflow-title-block">
          <div className="worktree-workflow-title-row">
            <h4>Customer follow-up</h4>
            <span className="worktree-run-live"><span /> Live</span>
          </div>
        </div>
        <div className="worktree-workflow-overview-grid">
          <div className="worktree-workflow-summary-cell">
            <span className="worktree-workflow-compact-label flex-none font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]">Summary</span>
            <p className="worktree-workflow-description-copy">Known routine triggered by Andrew Nelson in #sales. Scope, access, tools, and history are visible before work moves across systems.</p>
          </div>
          <div className="worktree-workflow-event-data">
            <span className="worktree-workflow-compact-label flex-none font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]">Event Data</span>
            <div className="worktree-workflow-event-table">
              {headerInfo.map(([label, value]) => (
                <div className="worktree-workflow-event-row" key={label}>
                  <span className="worktree-workflow-row-title">{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="worktree-workflow-access-block worktree-workflow-access-block-paired">
            <div className="worktree-workflow-access-head">
              <span className="worktree-workflow-compact-label flex-none font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]">Tools</span>
              <span className="worktree-workflow-compact-label flex-none font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]">Permissions</span>
            </div>
            <div className="worktree-workflow-access-table">
              {accessRows.map(([slug, tool, permission]) => (
                <div className="worktree-workflow-access-row" key={tool}>
                  <span className="worktree-workflow-tool-chip"><img src={logo(slug)} alt="" />{tool}</span>
                  <span className="worktree-workflow-permission-text">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="worktree-workflow-graph-divider" />

      <div className="worktree-workflow-graph-card">
        <WorktreeWorkflowGraph />
      </div>
    </div>
  );
}
type WorkflowNodeStatus = "active" | "complete" | "done" | "queued";
type WorkflowNodePortItem = { label: string; left: string };
type WorkflowNodeItem = {
  badges?: readonly string[];
  detail: string;
  id: string;
  kind?: "primary" | "tool";
  placeholder?: boolean;
  placeholderSize?: "node" | "subnode";
  placeholderState?: "idle" | "pressed";
  ports?: readonly WorkflowNodePortItem[];
  positionStyle?: CSSProperties;
  shape?: "event" | "gate";
  showCompletionCheck?: boolean;
  stackId?: string;
  stackPosition?: "first" | "last" | "middle" | "only";
  status: WorkflowNodeStatus;
  title: string;
};
type WorkflowConnectorItem = {
  active?: boolean;
  id: string;
  path: {
    arrowD?: string;
    bidirectional?: boolean;
    d: string;
    label?: string;
    labelPositionStyle?: CSSProperties;
    positionStyle?: CSSProperties;
    variant?: "primary" | "tool";
    viewBox: string;
  };
};
type WorkflowLayoutNode = { height: number; width: number; x: number; y: number };

const workflowGridSizePx = 25;
const workflowGridDotRadiusPx = 0.9375;
const workflowGridDotCenterPx = workflowGridSizePx / 2;
const workflowControlNodeSize = 76;
const workflowAgentNodeHeight = 94;
const workflowAgentNodeWidth = 142;
const workflowPrimaryNodeGap = 38;
const workflowToolNodeHeight = 75;
const workflowToolNodeWidth = 118;
const workflowPorts = [
  { label: "Memory", left: "33.333%" },
  { label: "Tool", left: "66.667%" },
] as const satisfies readonly WorkflowNodePortItem[];

const worktreeWorkflowLayout = {
  approval: { height: workflowControlNodeSize, width: workflowControlNodeSize, x: 318, y: 48 },
  followupAgent: { height: workflowAgentNodeHeight, width: workflowAgentNodeWidth, x: 442, y: 39 },
  calendar: { height: workflowToolNodeHeight, width: workflowToolNodeWidth, x: 442, y: 160 },
  gmail: { height: workflowToolNodeHeight, width: workflowToolNodeWidth, x: 120, y: 160 },
  intakeAgent: { height: workflowAgentNodeHeight, width: workflowAgentNodeWidth, x: 148, y: 39 },
  salesforce: { height: workflowToolNodeHeight, width: workflowToolNodeWidth, x: 258, y: 160 },
  slackTool: { height: workflowToolNodeHeight, width: workflowToolNodeWidth, x: 564, y: 160 },
  trigger: { height: workflowControlNodeSize, width: workflowControlNodeSize, x: 34, y: 48 },
} satisfies Record<string, WorkflowLayoutNode>;

function WorktreeWorkflowGraph() {
  const placeholderPosition = getAfterNodePlaceholderPosition(worktreeWorkflowLayout.followupAgent);
  const nodes = createWorktreeWorkflowNodes(placeholderPosition);
  const connectors = createWorktreeWorkflowConnectors(placeholderPosition);

  return (
    <section aria-label="Customer follow-up workflow graph" className="worktree-workflow-graph relative isolate h-full overflow-hidden rounded-[var(--nous-home-chat-canvas-radius)] ring-1 ring-inset ring-[color:var(--nous-stroke-default)] [background:var(--nous-workflow-run-bg)] [background-size:var(--nous-home-chat-canvas-bg-size)] shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]">
      <WorkflowPanelRadial />
      <WorkflowGraphGrid />
      <div className="worktree-workflow-graph-viewport relative z-10 h-full overflow-hidden lg:opacity-[var(--nous-workflow-unfocused-opacity)]">
        <div className="worktree-workflow-graph-canvas relative h-full min-h-[var(--nous-workflow-graph-canvas-height)] w-full min-w-[var(--nous-workflow-graph-canvas-min-width)]">
          {connectors.map((connector) => <WorkflowConnector key={connector.id} {...connector} />)}
          {nodes.map((node) => <WorkflowNode key={node.id} {...node} />)}
        </div>
      </div>
    </section>
  );
}

function createWorktreeWorkflowNodes(placeholderPosition: CSSProperties): WorkflowNodeItem[] {
  return [
    { detail: "#sales mention", id: "trigger", positionStyle: toPosition(worktreeWorkflowLayout.trigger), shape: "event", status: "queued", title: "Slack" },
    { detail: "Find email, gather context.", id: "intake-agent", ports: workflowPorts, positionStyle: toPosition(worktreeWorkflowLayout.intakeAgent), status: "queued", title: "Agent" },
    { detail: "Pricing rules", id: "approval", positionStyle: toPosition(worktreeWorkflowLayout.approval), shape: "gate", status: "queued", title: "Approval" },
    { detail: "Book meeting and post update.", id: "followup-agent", ports: workflowPorts, positionStyle: toPosition(worktreeWorkflowLayout.followupAgent), status: "queued", title: "Agent" },
    { detail: "", id: "next-placeholder", placeholder: true, positionStyle: placeholderPosition, status: "queued", title: "" },
    { badges: ["Read", "Draft"], detail: "Thread", id: "gmail", kind: "tool", positionStyle: toPosition(worktreeWorkflowLayout.gmail), status: "queued", title: "Gmail" },
    { badges: ["Read"], detail: "Account", id: "salesforce", kind: "tool", positionStyle: toPosition(worktreeWorkflowLayout.salesforce), status: "queued", title: "Salesforce" },
    { badges: ["Create"], detail: "Meeting", id: "calendar", kind: "tool", positionStyle: toPosition(worktreeWorkflowLayout.calendar), status: "queued", title: "Calendar" },
    { badges: ["Post"], detail: "Update", id: "slack-tool", kind: "tool", positionStyle: toPosition(worktreeWorkflowLayout.slackTool), status: "queued", title: "Slack" },
  ];
}

function createWorktreeWorkflowConnectors(placeholderPosition: CSSProperties): WorkflowConnectorItem[] {
  return [
    createPrimaryHorizontalConnector("trigger-to-agent", worktreeWorkflowLayout.trigger, worktreeWorkflowLayout.intakeAgent),
    createPrimaryHorizontalConnector("agent-to-approval", worktreeWorkflowLayout.intakeAgent, worktreeWorkflowLayout.approval),
    createPrimaryHorizontalConnector("approval-to-agent", worktreeWorkflowLayout.approval, worktreeWorkflowLayout.followupAgent),
    createPrimaryHorizontalConnectorToPoint("agent-to-next-placeholder", worktreeWorkflowLayout.followupAgent, placeholderPosition),
    createToolConnector("agent-to-gmail", worktreeWorkflowLayout.intakeAgent, worktreeWorkflowLayout.gmail, { port: "memory" }),
    createToolConnector("agent-to-salesforce", worktreeWorkflowLayout.intakeAgent, worktreeWorkflowLayout.salesforce, { port: "tool" }),
    createToolConnector("agent-to-calendar", worktreeWorkflowLayout.followupAgent, worktreeWorkflowLayout.calendar, { port: "memory" }),
    createToolConnector("agent-to-slack", worktreeWorkflowLayout.followupAgent, worktreeWorkflowLayout.slackTool, { port: "tool" }),
  ];
}

function toPosition(node: WorkflowLayoutNode): CSSProperties {
  return { height: node.height, left: node.x, minHeight: node.height, top: node.y, width: node.width };
}

function WorkflowPanelRadial() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background:var(--nous-workflow-panel-radial-bg)]" />;
}

function WorkflowGraphGrid() {
  const gridPatternId = `workflow-dot-grid-${useId().replaceAll(":", "")}`;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute"
      data-workflow-dot-grid="true"
      height="100%"
      preserveAspectRatio="none"
      style={{
        height: `calc(100% + ${workflowGridSizePx * 2}px)`,
        transform: `translate(${-workflowGridSizePx}px, ${-workflowGridSizePx}px)`,
        width: `calc(100% + ${workflowGridSizePx * 2}px)`,
      }}
      width="100%"
    >
      <defs>
        <pattern height={workflowGridSizePx} id={gridPatternId} patternUnits="userSpaceOnUse" width={workflowGridSizePx}>
          <circle cx={workflowGridDotCenterPx} cy={workflowGridDotCenterPx} fill="var(--nous-workflow-graph-grid-dot)" r={workflowGridDotRadiusPx} />
        </pattern>
      </defs>
      <rect fill={`url(#${gridPatternId})`} height="100%" width="100%" />
    </svg>
  );
}

function WorkflowNode({ badges, detail, id, isStacked = false, kind = "primary", placeholder, placeholderSize = "node", placeholderState = "idle", ports, positionStyle, shape, showCompletionCheck = false, stackPosition, status, title }: WorkflowNodeItem & { isStacked?: boolean }) {
  const isTool = kind === "tool";
  const hasBadges = Boolean(badges?.length);
  const hasDetail = detail.length > 0;
  const shouldShowCompletionCheck = showCompletionCheck && (status === "done" || status === "complete");

  if (placeholder) {
    return (
      <span
        aria-hidden="true"
        className={cx("nous-workflow-node-placeholder", placeholderSize === "subnode" ? "nous-workflow-node-placeholder-subnode" : "nous-workflow-node-placeholder-node", isStacked ? "relative mx-auto" : "absolute")}
        data-workflow-node-id={id}
        data-workflow-node-kind={kind}
        data-workflow-node-placeholder="true"
        data-workflow-node-placeholder-size={placeholderSize}
        data-workflow-node-placeholder-state={placeholderState}
        data-workflow-node-status={status}
        style={isStacked ? undefined : positionStyle}
      >
        <SquarePlusIcon className="nous-workflow-node-placeholder-icon" />
      </span>
    );
  }

  return (
    <div
      className={cx(
        "nous-workflow-node flex flex-col [background:var(--nous-workflow-node-bg)]",
        isStacked ? "relative w-full" : "absolute",
        !isStacked && !isTool && "min-h-[var(--nous-workflow-node-min-height)]",
        "border border-[color:var(--nous-workflow-node-border)]",
        isTool ? "nous-workflow-node-tool px-[var(--nous-workflow-tool-node-padding-x)] py-[var(--nous-workflow-tool-node-padding-y)]" : "px-[var(--nous-workflow-node-padding-x)] py-[var(--nous-workflow-node-padding-y)]",
        "justify-start text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-workflow-node-detail-fg)]",
        status === "active" && "nous-workflow-node-active",
        status === "complete" && "nous-workflow-node-complete",
        status === "done" && "nous-workflow-node-done",
        shape === "event" && "nous-workflow-node-shape-event",
        shape === "gate" && "nous-workflow-node-shape-gate",
        stackPosition && "nous-workflow-node-stack-item",
        stackPosition === "first" && "nous-workflow-node-stack-first",
        stackPosition === "middle" && "nous-workflow-node-stack-middle",
        stackPosition === "last" && "nous-workflow-node-stack-last",
        stackPosition === "only" && "nous-workflow-node-stack-only",
      )}
      data-workflow-node-id={id}
      data-workflow-node-kind={kind}
      data-workflow-node-shape={shape ?? "default"}
      data-workflow-node-stack-id="none"
      data-workflow-node-stack-position={stackPosition ?? "none"}
      data-workflow-node-status={status}
      style={isStacked ? undefined : positionStyle}
    >
      <span aria-hidden="true" className="nous-workflow-node-active-prism-border"><span className="nous-workflow-node-active-prism-gradient" /></span>
      {shouldShowCompletionCheck ? <WorkflowNodeDoneCheck /> : null}
      <h4 className="nous-mono relative z-10 truncate pr-[var(--nous-workflow-node-title-padding-right)] text-[length:var(--nous-workflow-node-title-size)] uppercase leading-tight tracking-[var(--nous-workflow-node-title-tracking)] text-[var(--nous-workflow-node-title-fg)] [font-weight:var(--nous-workflow-node-title-weight)]" data-workflow-node-title="true">{title}</h4>
      {hasDetail ? <p className="relative z-10 mt-[var(--nous-workflow-node-detail-margin-top)] overflow-hidden text-[length:var(--nous-workflow-node-detail-size)] font-[var(--nous-workflow-node-detail-weight)] leading-[var(--nous-workflow-node-detail-leading)] tracking-[var(--nous-workflow-node-detail-tracking)] text-[var(--nous-workflow-node-detail-fg)]" data-workflow-node-detail="true">{detail}</p> : null}
      {hasBadges ? (
        <div className={cx("relative z-10 flex flex-wrap", isTool ? "nous-workflow-node-metadata" : "mt-auto gap-[var(--nous-workflow-node-badge-row-gap)] pt-[var(--nous-workflow-node-badge-row-padding-top)]")} data-workflow-node-badges="true" data-workflow-node-badges-variant={isTool ? "metadata" : "chip"}>
          {badges?.map((badge) => <span className={isTool ? "nous-workflow-node-metadata-item" : "nous-workflow-node-badge"} data-workflow-node-badge={badge} key={badge}>{badge}</span>)}
        </div>
      ) : null}
      {ports?.map((port) => <span aria-hidden="true" className="nous-workflow-connector-chip nous-workflow-node-port-chip absolute z-20" data-workflow-node-port-chip={port.label} key={port.label} style={{ left: port.left, top: "100%" }}>{port.label}</span>)}
    </div>
  );
}

function WorkflowNodeDoneCheck() {
  return (
    <span aria-hidden="true" className="nous-workflow-node-done-check" data-workflow-node-done-check="true">
      <svg fill="none" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.15 5.1 8.25 9.25 3.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>
    </span>
  );
}

function SquarePlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WorkflowConnector({ active, id, path }: WorkflowConnectorItem) {
  const activeMarkerId = `nous-workflow-connector-arrow-${id}`;
  const baseMarkerId = `nous-workflow-connector-arrow-base-${id}`;
  const usesInlineArrow = Boolean(path.arrowD);
  const usesBidirectionalArrows = Boolean(path.bidirectional);
  const isToolConnector = path.variant === "tool";

  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute overflow-visible"
        data-workflow-connector={id}
        data-workflow-connector-active={active ? "true" : "false"}
        data-workflow-connector-bidirectional={usesBidirectionalArrows ? "true" : "false"}
        data-workflow-connector-kind="path"
        data-workflow-connector-terminal="true"
        data-workflow-connector-variant={path.variant ?? "primary"}
        preserveAspectRatio="none"
        style={path.positionStyle}
        viewBox={path.viewBox}
      >
        {!usesInlineArrow ? (
          <defs>
            {usesBidirectionalArrows ? (
              <marker id={baseMarkerId} markerHeight="5" markerUnits="strokeWidth" markerWidth="5" orient="auto-start-reverse" refX="7" refY="4" viewBox="0 0 8 8">
                <path d="M1 1 7 4 1 7Z" fill="var(--nous-workflow-connector-stroke)" />
              </marker>
            ) : null}
            <marker id={activeMarkerId} markerHeight="5" markerUnits="strokeWidth" markerWidth="5" orient={usesBidirectionalArrows ? "auto-start-reverse" : "auto"} refX="7" refY="4" viewBox="0 0 8 8">
              <path d="M1 1 7 4 1 7Z" fill="var(--nous-workflow-connector-active-stroke)" />
            </marker>
          </defs>
        ) : null}
        <path className={cx("fill-none stroke-[var(--nous-workflow-connector-stroke)]", isToolConnector && "nous-workflow-connector-path-tool")} d={path.d} markerEnd={usesBidirectionalArrows ? `url(#${baseMarkerId})` : undefined} markerStart={usesBidirectionalArrows ? `url(#${baseMarkerId})` : undefined} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {active ? <path className={cx("fill-none stroke-[var(--nous-workflow-connector-active-stroke)]", isToolConnector ? "nous-workflow-connector-path-tool-active" : "nous-workflow-connector-path-active")} d={path.d} markerEnd={!usesInlineArrow ? `url(#${activeMarkerId})` : undefined} markerStart={usesBidirectionalArrows ? `url(#${activeMarkerId})` : undefined} pathLength={isToolConnector ? undefined : 1} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /> : null}
        {path.arrowD ? <path className={cx("nous-workflow-connector-path-arrow", active && "nous-workflow-connector-path-arrow-active")} d={path.arrowD} data-workflow-connector-arrow="true" /> : null}
      </svg>
      {path.label ? <span aria-hidden="true" className="nous-workflow-connector-chip absolute z-20" data-workflow-connector-chip={path.label} style={path.labelPositionStyle}>{path.label}</span> : null}
    </>
  );
}

function createPrimaryHorizontalConnector(id: string, sourceNode: WorkflowLayoutNode, targetNode: WorkflowLayoutNode): WorkflowConnectorItem {
  const sourceX = sourceNode.x + sourceNode.width;
  const sourceY = sourceNode.y + (sourceNode.height / 2);
  const targetX = targetNode.x;
  const targetY = targetNode.y + (targetNode.height / 2);
  const top = Math.min(sourceY, targetY) - 4;
  const width = targetX - sourceX;
  const height = Math.abs(targetY - sourceY) + 8;
  const startY = sourceY - top;
  const endY = targetY - top;
  const arrowBaseX = width - 7.75;
  const arrowTipX = width - 2;

  return { id, path: { arrowD: `M${arrowTipX} ${endY} L${arrowBaseX} ${endY - 3.5} L${arrowBaseX} ${endY + 3.5} Z`, d: `M1.5 ${startY} C${Math.max(width * 0.45, 12)} ${startY} ${Math.max(width * 0.55, 18)} ${endY} ${arrowBaseX} ${endY}`, positionStyle: { height, left: sourceX, top, width }, viewBox: `0 0 ${width} ${height}` } };
}

function createPrimaryHorizontalConnectorToPoint(id: string, sourceNode: WorkflowLayoutNode, targetPosition: CSSProperties): WorkflowConnectorItem {
  const targetLeft = Number(targetPosition.left ?? 0);
  const targetTop = Number(targetPosition.top ?? 0);
  const targetHeight = Number(targetPosition.height ?? 0);
  return createPrimaryHorizontalConnector(id, sourceNode, { height: targetHeight, width: 0, x: targetLeft, y: targetTop });
}

function createToolConnector(id: string, sourceNode: WorkflowLayoutNode, targetNode: WorkflowLayoutNode, options: { label?: string; port?: "center" | "memory" | "tool" } = {}): WorkflowConnectorItem {
  const targetCenterX = targetNode.x + (targetNode.width / 2);
  const sourceX = getWorkflowToolConnectorSourceX(sourceNode, options.port ?? "center");
  const sourceY = sourceNode.y + sourceNode.height;
  const targetX = targetCenterX;
  const targetY = targetNode.y;
  const left = Math.min(sourceX, targetX);
  const width = Math.max(Math.abs(targetX - sourceX), 1);
  const height = targetY - sourceY;
  const sourceLocalX = sourceX - left;
  const targetLocalX = targetX - left;

  return { id, path: { bidirectional: true, d: `M${sourceLocalX} 0 C${sourceLocalX} ${height * 0.38} ${targetLocalX} ${height * 0.62} ${targetLocalX} ${height}`, label: options.label, labelPositionStyle: options.label ? { left: Math.round(sourceX), top: Math.round(sourceY) } : undefined, positionStyle: { height, left, top: sourceY, width }, variant: "tool", viewBox: `0 0 ${width} ${height}` } };
}

function getWorkflowToolConnectorSourceX(sourceNode: WorkflowLayoutNode, port: "center" | "memory" | "tool") {
  switch (port) {
    case "memory": return sourceNode.x + (sourceNode.width / 3);
    case "tool": return sourceNode.x + ((sourceNode.width / 3) * 2);
    case "center": return sourceNode.x + (sourceNode.width / 2);
  }
}

function getAfterNodePlaceholderPosition(node: WorkflowLayoutNode): CSSProperties {
  const placeholderSize = 32;
  return { height: placeholderSize, left: node.x + node.width + workflowPrimaryNodeGap, top: node.y + (node.height / 2) - (placeholderSize / 2), width: placeholderSize };
}

function RunGmailThreadSurface() {
  const rows = [
    ["/portraits/sofia-patel.png", "Sofia Patel", "Re: Evergreen Supply pricing — can we talk this week?", "Run input", "worktree-lb-u", "worktree-selected"],
    ["/portraits/patricia-gomez.png", "Patricia Gomez", "Updated procurement timeline", "Context", "worktree-lb-r", ""],
    ["/portraits/avery-chen.png", "Avery Chen", "Intro to legal team", "Archive", "worktree-lb-a", "worktree-archived"],
    ["/portraits/evergreen-logo.png", "Evergreen Ops", "Contract terms attached", "Context", "worktree-lb-r", ""],
    ["/portraits/taylor-reid.png", "Taylor Reed", "Out of office next week", "Archive", "worktree-lb-a", "worktree-archived"],
  ];

  return (
    <div className="worktree-gmail">
      <div className="worktree-gmail-top"><div className="worktree-gl">
        <img src={logo("gmail")} alt="" /> Inbox</div><div className="worktree-gs worktree-gmail-search-story"><span className="worktree-gmail-search-placeholder">Search mail</span><span className="worktree-gmail-search-query">Evergreen Supply Sofia pricing</span></div><img className="worktree-gav" src="/portraits/you.png" alt="" /></div>
      <div className="worktree-gmail-tabs"><div className="worktree-t worktree-on">Primary</div><div className="worktree-t">Promotions</div><div className="worktree-t">Social</div></div>
      <div className="worktree-g-list">
        {rows.map(([img, who, subject, label, tone, state], index) => (
          <div className={`worktree-g-row worktree-in ${label === "Archive" ? "worktree-read" : "worktree-unread"} ${state}`} key={who}>
            <img className={`worktree-av ${who === "Evergreen Ops" ? "worktree-evergreen-avatar" : ""}`} src={img} alt="" />
            <span className="worktree-who">{who}</span>
            <span className="worktree-subj"><b>{subject}</b></span>
            <span className={`worktree-label worktree-in ${tone}`}>{label}</span>
            <span className="worktree-time">9:4{index}</span>
          </div>
        ))}
      </div>
      <div className="worktree-g-detection-card worktree-in context-source-panel manual-work-mini email-read-card">
        <strong>Read from thread</strong>
        {[
          ["gmail", "Pricing clarification requested"],
          ["googlecalendar", "Follow-up requested this week"],
          ["salesforce", "Evergreen Supply account matched"],
          ["googledrive", "Pricing deck referenced"],
        ].map(([slug, label], index) => (
          <span className="manual-work-row email-read-row" style={{ "--row-index": index } as CSSProperties} key={label}>
            <img src={logo(slug)} alt="" />
            <span className="manual-work-row-text">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function RunRetrievalSurface() {
  const contextGroups = [
    {
      title: "Review",
      tone: "blue",
      rows: [
        ["notion", "Installed workflow"],
        ["slack", "Allowed tools"],
        ["salesforce", "Approval rules"],
        ["googledrive", "Run history"],
      ],
    },
    {
      title: "Research",
      tone: "green",
      rows: [
        ["salesforce", "CRM account record"],
        ["gmail", "Past email thread"],
        ["googledrive", "Approved pricing notes"],
        ["googledocs", "Contract terms"],
        ["googlecalendar", "Rep calendar"],
      ],
    },
    {
      title: "Analyze",
      tone: "amber",
      rows: [
        ["gmail", "Meeting intent confirmed"],
        ["googledrive", "Pricing clarification identified"],
        ["salesforce", "Account history matched"],
        ["googlecalendar", "Availability window found"],
        ["notion", "Policy boundary checked"],
      ],
    },
  ];

  return (
    <div className="worktree-run-card-surface worktree-retrieval worktree-workflow-card worktree-context-card">
      <WorkflowWindowChrome icon="database" title="Context" />
      <div className="worktree-workflow-compact-summary worktree-context-compact-summary">
        <div className="worktree-workflow-title-block">
          <div className="worktree-workflow-title-row">
            <h4>Gathering Evergreen Supply context</h4>
          </div>
        </div>
        <div className="worktree-context-thinking">
          <span className="worktree-workflow-compact-label flex-none font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--nous-fg-muted)]">Thinking</span>
          <p>Worktree reviews the installed routine, pulls the customer records, and resolves the signals needed before anything is booked.</p>
        </div>
      </div>
      <div className="worktree-retrieval-grid">
        {contextGroups.map((group, groupIndex) => (
          <div className="context-source-panel manual-work-mini" key={group.title}>
            <strong>{group.title}</strong>
            {group.rows.map(([slug, label], index) => (
              <span className="context-source-row manual-work-row" data-tag-tone={group.tone} style={{ "--row-index": (groupIndex * 5) + index } as CSSProperties} key={label}>
                <img src={logo(slug)} alt="" />
                <span className="manual-work-row-text">{label}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RunCalendarBookingSurface() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const nums = ["9", "10", "11", "12", "13"];
  const events = [
    [["9:00", "Standup", "worktree-gray"]],
    [["10:00", "Design sync", "worktree-blue"], ["2:00–4:00", "🎯 Deep work", "worktree-focus"]],
    [["10:30", "Pipeline review", "worktree-gray"], ["1:00", "Discovery", "worktree-blue"]],
    [["2:00", "Vendor", "worktree-gray"]],
    [["9:00", "Review", "worktree-blue"], ["10–12", "🎯 Deep work", "worktree-focus"]],
  ];

  return (
    <div className="worktree-gcal">
      <div className="worktree-gcal-top"><img src={logo("googlecalendar")} alt="" /><span className="worktree-ti">This week · June 2026</span></div>
      <div className="worktree-gcal-agent-status" aria-hidden="true">
        <span><WorktreeMark /> Searching availability</span>
        <span><WorktreeMark /> Checking policy + context</span>
        <span><WorktreeMark /> Booking best block</span>
      </div>
      <div className="worktree-gcal-grid">
        <span className="worktree-gcal-search-sweep" aria-hidden="true" />
        {days.map((day, index) => (
          <div className="worktree-gcal-col" key={day}>
            <div className={`worktree-gcal-dh ${index === 2 ? "worktree-today" : ""}`}><div className="worktree-dn">{day}</div><div className="worktree-dd">{nums[index]}</div></div>
            {events[index].map(([time, name, tone]) => <div className={`worktree-gev ${tone}`} key={`${day}-${time}-${name}`}><span className="worktree-et">{time}</span>{name}</div>)}
            {index === 1 ? <span className="worktree-gcal-window worktree-gcal-window-busy"><em>11:00</em>conflict</span> : null}
            {index === 2 ? <span className="worktree-gcal-window worktree-gcal-window-tentative"><em>11:30</em>maybe</span> : null}
            {index === 3 ? <span className="worktree-gcal-window worktree-gcal-window-best"><em>11:00</em>best fit</span> : null}
            {index === 3 ? <div className="worktree-gcal-booking-block"><span className="worktree-et">11:00</span>Customer follow-up · Evergreen Supply</div> : null}
          </div>
        ))}
      </div>
      <div className="worktree-gcal-agenda-card worktree-in">
        <strong>Customer follow-up — Evergreen Supply / Sofia Patel</strong>
        <span>Thu 11:00 AM · agenda, email thread, account notes attached</span>
      </div>
      <div className="worktree-gcal-toast worktree-in"><span className="worktree-ck">✓</span> Meeting created · invite sent to Sofia Patel and Andrew</div>
    </div>
  );
}

function RunCompletionSurface() {
  const files = [
    ["Account brief", "Evergreen Supply pricing context", "DOC"],
  ];

  return (
    <div className="worktree-slack worktree-slack-complete">
      <div className="worktree-slack-side">
        <div className="worktree-ws"><img className="worktree-slk" src={logo("slack")} alt="Slack" /> Slack</div>
        <div className="worktree-ch-grp">Channels</div>
        <div className="worktree-ch">#general</div>
        <div className="worktree-ch worktree-on">#sales</div>
        <div className="worktree-ch worktree-dm"><span className="worktree-pres" /> Worktree</div>
      </div>
      <div className="worktree-slack-main">
        <div className="worktree-slack-head"><b>#sales</b><span className="worktree-topic">Pipeline, pricing & deals</span></div>
        <div className="worktree-slack-msgs">
          <div className="worktree-smsg worktree-in worktree-smsg-muted">
            <img className="worktree-av" src="/portraits/you.png" alt="" />
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:02</span></div><div className="worktree-tx">Sofia Patel at Evergreen Supply replied about pricing and wants to talk this week.</div></div>
          </div>
          <div className="worktree-smsg worktree-in worktree-smsg-muted">
            <img className="worktree-av" src="/portraits/you.png" alt="" />
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:03</span></div><div className="worktree-tx"><span className="worktree-slack-link">@Worktree</span> run customer follow-up for Sofia Patel at Evergreen Supply.</div></div>
          </div>
          <div className="worktree-smsg worktree-agent worktree-in worktree-smsg-muted">
            <div className="worktree-av"><WorktreeMark /></div>
            <div className="worktree-bd"><div className="worktree-hd"><span className="worktree-nm">Worktree</span><span className="worktree-app">App</span><span className="worktree-tm">10:03</span></div><div className="worktree-tx">Starting controlled run: <b>Customer follow-up</b>.</div></div>
          </div>
          <div className="worktree-smsg worktree-agent worktree-complete-final-message">
            <div className="worktree-av"><WorktreeMark /></div>
            <div className="worktree-bd">
              <div className="worktree-hd"><span className="worktree-nm">Worktree</span><span className="worktree-app">App</span><span className="worktree-tm">10:08</span></div>
              <div className="worktree-tx">
                <p>Done — Sofia Patel is booked for <b>Thursday at 11:00 AM</b>. I added the pricing agenda, linked the <span className="worktree-slack-link">calendar invite</span>, <span className="worktree-slack-link">email thread</span>, <span className="worktree-slack-link">CRM opportunity</span>, and <span className="worktree-slack-link">run record</span>.</p>
                <div className="worktree-slack-file-list" aria-label="Files attached to completion update">
                  {files.map(([label, value, type]) => (
                    <span className="worktree-slack-file-card" key={label}>
                      <em aria-label={`${type} file`} title={`${type} file`}><FileAttachmentIcon type={type} /></em>
                      <span><b>{label}</b><small>{value}</small></span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="worktree-slack-typing worktree-complete-typing">Worktree is typing<span className="worktree-typing-dots"><i /><i /><i /></span></div>
        <div className="worktree-slack-composer worktree-slack-composer-active worktree-complete-composer">
          <span className="worktree-composer-text worktree-complete-composer-text">Posting completion update to #sales…</span>
          <span className="worktree-composer-send worktree-composer-send-click" aria-hidden="true">↑</span>
        </div>
      </div>
    </div>
  );
}

function RunSceneSurface({ sceneKey }: { sceneKey: RunSceneKey }) {
  switch (sceneKey) {
    case "slack-request":
      return <RunSlackRequestSurface />;
    case "run-confirmation":
      return <RunConfirmationSurface />;
    case "gmail-thread":
      return <RunGmailThreadSurface />;
    case "context-retrieval":
      return <RunRetrievalSurface />;
    case "calendar-booking":
      return <RunCalendarBookingSurface />;
    case "slack-complete":
      return <RunCompletionSurface />;
    default:
      return null;
  }
}

function MobileRunShell({ app = "worktree", children, ledger, status, subtitle, title }: { app?: "gmail" | "googlecalendar" | "slack" | "worktree"; children: ReactNode; ledger?: string; status?: string; subtitle?: string; title: string }) {
  return (
    <div className={`worktree-mobile-run-shell worktree-mobile-run-shell-${app}`}>
      <div className="worktree-mobile-run-topbar">
        <span className="worktree-mobile-run-back" aria-hidden="true">‹</span>
        <span className="worktree-mobile-run-app-icon">{app === "worktree" ? <WorktreeMark /> : <img src={logo(app)} alt="" />}</span>
        <span className="worktree-mobile-run-heading"><b>{title}</b>{subtitle ? <small>{subtitle}</small> : null}</span>
        {status ? <span className="worktree-mobile-run-status">{status}</span> : <span className="worktree-mobile-run-more" aria-hidden="true">•••</span>}
      </div>
      <div className="worktree-mobile-run-content">{children}{ledger ? <div className="worktree-mobile-run-ledger">{ledger}</div> : null}</div>
    </div>
  );
}

function MobileSlackRunSurface({ complete = false }: { complete?: boolean }) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");
  const requestCommand = "@Worktree run customer follow-up for Sofia Patel at Evergreen Supply.";
  const isTypingRequest = !complete && visibleStep === 2;
  const isAgentTyping = (!complete && visibleStep === 4) || (complete && visibleStep === 3);

  useEffect(() => {
    let cancelled = false;

    function sleep(ms: number) {
      return new Promise((resolve) => window.setTimeout(resolve, ms));
    }

    async function typeMessage(message: string) {
      setTypedMessage("");

      for (let index = 0; index < message.length; index += 1) {
        const previousCharacter = message[index - 1] ?? "";
        const delay = previousCharacter === " " ? 26 : 30 + ((index * 11) % 20);

        await sleep(delay);
        if (cancelled) return false;

        setTypedMessage(message.slice(0, index + 1));
      }

      return true;
    }

    async function playScene() {
      setVisibleStep(0);
      setTypedMessage("");

      if (complete) {
        await sleep(840);
        if (cancelled) return;
        setVisibleStep(3);

        await sleep(880);
        if (cancelled) return;
        setVisibleStep(4);

        await sleep(540);
        if (cancelled) return;
        setVisibleStep(5);
        return;
      }

      await sleep(420);
      if (cancelled) return;
      setVisibleStep(1);

      await sleep(780);
      if (cancelled) return;

      setVisibleStep(2);
      const typed = await typeMessage(requestCommand);
      if (!typed || cancelled) return;

      await sleep(260);
      if (cancelled) return;
      setVisibleStep(3);
      setTypedMessage("");

      await sleep(420);
      if (cancelled) return;
      setVisibleStep(4);

      await sleep(820);
      if (cancelled) return;
      setVisibleStep(5);
    }

    void playScene();

    return () => {
      cancelled = true;
    };
  }, [complete, requestCommand]);

  return (
    <div className="worktree-mobile-slack worktree-mobile-run-slack" aria-label={complete ? "Mobile Slack completion update" : "Mobile Slack request mockup"}>
      <div className="worktree-mobile-slack-head">
        <span aria-hidden="true" className="worktree-mobile-slack-back">‹</span>
        <div className="worktree-mobile-slack-title">
          <span className="worktree-mobile-slack-title-icon worktree-mobile-slack-title-icon-app"><img src={logo("slack")} alt="" /></span>
          <span className="worktree-mobile-slack-title-copy">
            <b>#sales</b>
            <span>Pipeline, pricing & deals</span>
          </span>
        </div>
        <span aria-hidden="true" className="worktree-mobile-slack-more">•••</span>
      </div>
      <div className="worktree-mobile-slack-msgs">
        <div className="worktree-slack-day-divider"><span>Today</span></div>
        {(complete || visibleStep >= 1) ? <div className={complete ? "worktree-smsg worktree-mobile-thread-history" : "worktree-smsg worktree-in"} style={complete ? undefined : { "--row-index": 0 } as CSSProperties}>
          <img className="worktree-av" src="/portraits/patricia-gomez.png" alt="" />
          <div className="worktree-bd">
            <div className="worktree-hd"><span className="worktree-nm">Patricia Gomez</span><span className="worktree-tm">10:02 AM</span></div>
            <div className="worktree-tx">Sofia Patel at Evergreen Supply replied about pricing and wants to talk this week.</div>
          </div>
        </div> : null}
        {complete ? (
          <>
            {(complete || visibleStep >= 2) ? <div className="worktree-smsg worktree-mobile-thread-history">
              <img className="worktree-av" src="/portraits/you.png" alt="" />
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:03 AM</span></div>
                <div className="worktree-tx"><span className="worktree-slack-link">@Worktree</span> run customer follow-up for Sofia Patel at Evergreen Supply.</div>
              </div>
            </div> : null}
            {visibleStep >= 4 ? <div className="worktree-smsg worktree-agent worktree-in" style={{ "--row-index": 2 } as CSSProperties}>
              <div className="worktree-av"><WorktreeMark /></div>
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">Worktree</span><span className="worktree-app">App</span><span className="worktree-tm">10:08 AM</span></div>
                <div className="worktree-tx">
                  <div className="worktree-mobile-slack-block-kit">
                    <p><b>Run complete: Customer follow-up</b></p>
                    <div className="worktree-mobile-slack-block-fields">
                      <span><b>Result</b>Sofia Patel booked for Thu 11:00 AM</span>
                      <span><b>Linked</b>Email thread<br />CRM opportunity</span>
                      <span><b>Run record</b>#1842 · history saved</span>
                    </div>
                    {visibleStep >= 5 ? <><div className="worktree-mobile-artifact-list worktree-mobile-complete-artifacts"><span className="worktree-mobile-artifact-row"><img src={logo("googlecalendar")} alt="" /><b>Calendar invite</b><em>Created</em></span><span className="worktree-mobile-artifact-row"><img src={logo("googledocs")} alt="" /><b>Account brief</b><em>Created</em></span></div><div className="worktree-mobile-run-footer">5 systems touched · evaluation logged</div></> : null}
                  </div>
                </div>
              </div>
            </div> : null}
          </>
        ) : (
          <>
            {visibleStep >= 3 ? <div className="worktree-smsg worktree-in" style={{ "--row-index": 1 } as CSSProperties}>
              <img className="worktree-av" src="/portraits/you.png" alt="" />
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">You</span><span className="worktree-tm">10:03 AM</span></div>
                <div className="worktree-tx"><span className="worktree-slack-link">@Worktree</span> run customer follow-up for Sofia Patel at Evergreen Supply.</div>
              </div>
            </div> : null}
            {visibleStep >= 5 ? <div className="worktree-smsg worktree-agent worktree-in" style={{ "--row-index": 2 } as CSSProperties}>
              <div className="worktree-av"><WorktreeMark /></div>
              <div className="worktree-bd">
                <div className="worktree-hd"><span className="worktree-nm">Worktree</span><span className="worktree-app">App</span><span className="worktree-tm">10:03 AM</span></div>
                <div className="worktree-tx">
                  <div className="worktree-mobile-slack-block-kit">
                    <p><b>Starting managed workflow: Customer follow-up</b></p>
                    <div className="worktree-mobile-slack-block-fields">
                      <span><b>Account</b>Evergreen Supply</span>
                      <span><b>Contact</b>Sofia Patel</span>
                    </div>
                    <div className="worktree-mobile-run-chip-row"><span>Run #1842</span><span>Scope review</span><span>Approval required</span></div>
                  </div>
                </div>
              </div>
            </div> : null}
          </>
        )}
      </div>
      {isAgentTyping ? <div className="worktree-mobile-agent-typing"><span>Worktree is typing</span><i /><i /><i /></div> : null}
      <div className={isTypingRequest ? "worktree-slack-composer worktree-slack-composer-active" : "worktree-slack-composer"}>
        <span className={isTypingRequest ? "worktree-composer-text worktree-composer-text-writing" : "worktree-composer-placeholder"}>{isTypingRequest ? typedMessage : "Message #sales"}</span>
        {isTypingRequest ? <span className="worktree-composer-send" aria-hidden="true">↑</span> : null}
      </div>
    </div>
  );
}

function MobileRunConfirmationSurface() {
  const [activeStep, setActiveStep] = useState(0);
  const tools = [["gmail", "Gmail", "Read + draft"], ["salesforce", "Salesforce", "Read"], ["googlecalendar", "Calendar", "Create invite"], ["slack", "Slack", "Post update"]];
  const steps = [["Slack request", "Received"], ["Source email", "Found"], ["Context checks", "3 sources read"], ["Approval gate", "Pricing policy passed"], ["Book meeting", "Queued"], ["Post update", "Queued"]];

  useEffect(() => {
    const timers = [1, 2, 3, 4].map((step, index) => window.setTimeout(() => setActiveStep(step), 640 + (index * 680)));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <MobileRunShell ledger={`Run #1842 · Step ${Math.min(activeStep + 1, 6)} of 6 · History enabled`} status="Live" subtitle="Controlled run" title="Run #1842">
      <div className="worktree-mobile-workflow-hero" style={{ "--row-index": 0 } as CSSProperties}><span>Customer follow-up</span><p>Evergreen Supply · Sofia Patel</p></div>
      <div className="worktree-mobile-step-list">
        {steps.map(([step, result], index) => <div className={index < activeStep ? "worktree-mobile-step worktree-mobile-step-done" : index === activeStep ? "worktree-mobile-step worktree-mobile-step-active" : "worktree-mobile-step"} key={step} style={{ "--row-index": index + 1 } as CSSProperties}><i>{index < activeStep ? "✓" : String(index + 1).padStart(2, "0")}</i><span>{step}</span>{index <= activeStep ? <em>{result}</em> : null}</div>)}
      </div>
      <div className="worktree-mobile-run-section" style={{ "--row-index": 7 } as CSSProperties}><b>Scope</b><p>Account: Evergreen Supply<br />Contact: Sofia Patel<br />Goal: book qualified follow-up</p></div>
      <div className="worktree-mobile-run-section" style={{ "--row-index": 8 } as CSSProperties}><b>Allowed tools</b>{tools.map(([slug, name, permission], index) => <span className="worktree-mobile-tool-row" key={name} style={{ "--row-index": index + 9 } as CSSProperties}><img src={logo(slug)} alt="" /><strong>{name}</strong><em>{permission}</em></span>)}</div>
      <div className="worktree-mobile-policy" style={{ "--row-index": 13 } as CSSProperties}>Evaluation active · pricing policy + approval gate checked</div>
    </MobileRunShell>
  );
}

function MobileRunRetrievalSurface() {
  const [checkedCount, setCheckedCount] = useState(0);
  const sources = [["notion", "Installed workflow", "Checked"], ["salesforce", "CRM account matched", "Matched"], ["gmail", "Latest customer thread", "Read"], ["googledrive", "Approved pricing notes", "Applied"], ["googlecalendar", "Calendar availability", "Available"]];

  useEffect(() => {
    const timers = [1, 2, 3, 4, 5].map((count, index) => window.setTimeout(() => setCheckedCount(count), 520 + (index * 620)));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <MobileRunShell ledger={`Run #1842 · ${checkedCount}/5 sources checked · History enabled`} status={`${checkedCount}/5 checked`} subtitle="Controlled retrieval" title="Context review">
      <div className="worktree-mobile-context-summary" style={{ "--row-index": 0 } as CSSProperties}><b>Checking sources before booking</b><span>{checkedCount < 5 ? "Every source is linked to run history." : "Context resolved and saved to the run."}</span></div>
      <div className="worktree-mobile-source-list">
        {sources.map(([slug, label, state], index) => <span className={`worktree-mobile-source-row ${index === checkedCount && checkedCount < sources.length ? "worktree-mobile-source-row-active" : ""}`} key={label} style={{ "--row-index": index + 1 } as CSSProperties}><img src={logo(slug)} alt="" /><b>{label}</b><em>{index < checkedCount ? state : index === checkedCount ? "Checking" : "Queued"}</em></span>)}
      </div>
      {checkedCount >= 5 ? <div className="worktree-mobile-policy" style={{ "--row-index": 7 } as CSSProperties}><b>Policy boundary checked</b><span>No pricing commitments without approval.</span></div> : null}
    </MobileRunShell>
  );
}

function MobileRunCalendarBookingSurface() {
  const [bookingStep, setBookingStep] = useState(0);
  const days = ["Tue 10", "Wed 11", "Thu 12", "Fri 13"];
  const timeLabels = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];
  const activeDayIndex = Math.min(bookingStep, 2);
  const schedules = [
    [
      { height: 11, label: "Daily standup", tone: "gray", top: 2 },
      { height: 16, label: "Customer call", tone: "blue", top: 25 },
      { height: 13, label: "Pipeline review", tone: "gray", top: 43 },
      { height: 17, label: "Deep work", tone: "purple", top: 69 },
    ],
    [
      { height: 13, label: "Team planning", tone: "gray", top: 4 },
      { height: 20, label: "Discovery workshop", tone: "blue", top: 22 },
      { height: 15, label: "Contract review", tone: "gray", top: 45 },
      { height: 18, label: "Customer onboarding", tone: "blue", top: 67 },
    ],
    [
      { height: 11, label: "Daily standup", tone: "gray", top: 2 },
      { height: 14, label: "Pipeline review", tone: "blue", top: 19 },
      { height: 16, label: "Vendor review", tone: "gray", top: 63 },
    ],
  ];

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setBookingStep(1), 650),
      window.setTimeout(() => setBookingStep(2), 1500),
      window.setTimeout(() => setBookingStep(3), 2500),
      window.setTimeout(() => setBookingStep(4), 3300),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const status = bookingStep === 0 ? "Scanning Tue" : bookingStep === 1 ? "Scanning Wed" : bookingStep === 2 ? "Scanning Thu" : bookingStep === 3 ? "Eligible" : "Created";
  const scanMessage = bookingStep === 0 ? "Checking Tuesday availability" : bookingStep === 1 ? "Tuesday · 11:00 conflict" : bookingStep === 2 ? "Wednesday · no eligible slot" : bookingStep === 3 ? "Thursday · 11:00 policy eligible" : "Thursday · invite created";

  return (
    <MobileRunShell app="googlecalendar" ledger={`Run #1842 · ${status === "Created" ? "Invite sent · history saved" : "Checking availability + policy"}`} status={status} subtitle="Thu, Jun 12" title="Calendar">
      <div className="worktree-mobile-calendar-days" style={{ "--row-index": 0 } as CSSProperties}><i className={bookingStep >= 3 ? "worktree-mobile-calendar-scan-indicator worktree-mobile-calendar-scan-indicator-selected" : "worktree-mobile-calendar-scan-indicator"} style={{ "--scan-index": activeDayIndex } as CSSProperties} />{days.map((day, index) => <span className={`${index === activeDayIndex ? "worktree-mobile-calendar-day-scanning" : ""} ${index < bookingStep && index < 2 ? "worktree-mobile-calendar-day-rejected" : ""} ${index === 2 && bookingStep >= 3 ? "worktree-mobile-calendar-day-selected" : ""}`} key={day}>{day}</span>)}</div>
      <div className="worktree-mobile-calendar-scan" aria-label="Availability scan">
        <span className={bookingStep === 1 || bookingStep === 2 ? "worktree-mobile-calendar-scan-conflict" : bookingStep >= 3 ? "worktree-mobile-calendar-scan-eligible" : ""} key={bookingStep}>{scanMessage}</span>
      </div>
      <div className="worktree-mobile-calendar-time-grid" key={activeDayIndex}>
        <div className="worktree-mobile-calendar-times">{timeLabels.map((time) => <span key={time}>{time}</span>)}</div>
        <div className="worktree-mobile-calendar-track">
          {timeLabels.map((time) => <span className="worktree-mobile-calendar-hour-line" key={time} />)}
          {schedules[activeDayIndex].map((event, index) => <span className={`worktree-mobile-calendar-grid-event worktree-mobile-calendar-grid-event-${event.tone}`} key={`${activeDayIndex}-${event.label}`} style={{ "--event-height": `${event.height}%`, "--event-index": index, "--event-top": `${event.top}%` } as CSSProperties}><b>{event.label}</b></span>)}
          {activeDayIndex < 2 ? <span className="worktree-mobile-calendar-candidate worktree-mobile-calendar-candidate-conflict"><em>11:00</em><b>{activeDayIndex === 0 ? "Conflict" : "No eligible slot"}</b></span> : <span className={`worktree-mobile-calendar-candidate ${bookingStep >= 4 ? "worktree-mobile-calendar-candidate-created" : bookingStep >= 3 ? "worktree-mobile-calendar-candidate-eligible" : ""}`}><em>11:00</em><b>{bookingStep >= 4 ? "Customer follow-up" : bookingStep >= 3 ? "Best fit" : "Checking slot"}</b></span>}
        </div>
      </div>
      {bookingStep >= 4 ? <div className="worktree-mobile-event-sheet" style={{ "--row-index": 6 } as CSSProperties}><b>Customer follow-up · Evergreen Supply</b><span>Thu 11:00 AM · no conflicts</span><p>Agenda attached · email thread linked · invite sent</p></div> : null}
    </MobileRunShell>
  );
}

function MobileRunSceneSurface({ sceneKey }: { sceneKey: RunSceneKey }) {
  switch (sceneKey) {
    case "slack-request": return <MobileSlackRunSurface />;
    case "run-confirmation": return <MobileRunConfirmationSurface />;
    case "gmail-thread": return <div className="worktree-mobile-run-email"><RunGmailThreadSurface /><div className="worktree-mobile-email-status"><span>Reading Sofia Patel’s latest reply</span><span>4 signals added to run</span></div></div>;
    case "context-retrieval": return <MobileRunRetrievalSurface />;
    case "calendar-booking": return <MobileRunCalendarBookingSurface />;
    case "slack-complete": return <MobileSlackRunSurface complete />;
    default: return null;
  }
}

export function WatchItWorkMockup() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setTimeout(() => setActive((value) => (value + 1) % runScenes.length), runScenes[active].durationMs);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const current = runScenes[active];

  return (
    <div className={`worktree-showcase worktree-run-showcase ${paused ? "worktree-run-paused" : ""}`} style={{ "--run-scene-duration": `${current.durationMs}ms` } as CSSProperties}>
      <div className="worktree-run-nav">
        <div className="worktree-run-tabs" aria-label="Controlled run scenes">
          {runScenes.map((scene, index) => (
            <button className={`worktree-run-tab ${index === active ? "worktree-on" : ""}`} key={scene.key} onClick={() => setActive(index)} type="button">
              <span aria-hidden="true" className="worktree-run-tab-prism-border"><span className="worktree-run-tab-prism-gradient" /></span>
              <span className="worktree-run-tab-index">{String(index + 1).padStart(2, "0")}</span>
              <b>{scene.label}</b>
              {scene.logo === "worktree" ? <span className="worktree-run-tab-mark"><WorktreeMark /></span> : scene.logo === "database" ? <span className="worktree-run-tab-mark"><DatabaseIcon /></span> : <img src={logo(scene.logo)} alt="" />}
              <span aria-hidden="true" className="worktree-run-tab-timer"><span /></span>
            </button>
          ))}
        </div>
        <button className="worktree-run-pause" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className={`worktree-run-stage ${current.key === "context-retrieval" ? "worktree-run-stage-context" : ""}`}>
        <div className={`worktree-run-device ${current.key === "context-retrieval" ? "worktree-run-device-context" : ""}`} key={current.key}>
          <div className="worktree-run-desktop-surface"><RunSceneSurface sceneKey={current.key} /></div>
          <div className="worktree-run-mobile-surface"><MobileRunSceneSurface sceneKey={current.key} /></div>
        </div>
        <aside className="worktree-run-explain">
          <div className="worktree-tag">{current.tag}</div>
          <h3>{current.headline}</h3>
          <p>{current.copy}</p>
          <ul>{current.bullets.map((bullet) => <li key={bullet}><span className="worktree-ck">✓</span><span>{bullet}</span></li>)}</ul>
          <div className="worktree-run-mini-ledger">
            <RunLedgerPrismChip>Run #1842</RunLedgerPrismChip>
            <RunLedgerPrismChip>Customer follow-up</RunLedgerPrismChip>
            <RunLedgerPrismChip>History enabled</RunLedgerPrismChip>
          </div>
        </aside>
      </div>
    </div>
  );
}
