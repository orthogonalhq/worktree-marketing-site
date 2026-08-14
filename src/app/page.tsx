import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { HeroSlackMockup, WatchItWorkMockup, ToolsEcosystemBadge } from "@/components/worktree-demo-mockups";
import { AnalyzeSignalStack, DraftOutputStack, ResearchSourceStack, ReviewQueue } from "@/components/review-queue";
import { WorktreeShell } from "@/components/site-shell";
import heroCardStyles from "./hero-sub-header-cards.module.css";

const workflowFitCriteria = {
  good: [
    "Happens frequently",
    "Has a known playbook",
    "Uses clear inputs",
    "Needs context from several systems",
    "Has clear success criteria",
  ],
  bad: [
    "Happens once or rarely",
    "No one agrees what good looks like",
    "You cannot define the process",
  ],
};

const deploymentSteps = [
  ["01", "Pick the right workflow", "Choose recurring work with clear inputs, business value, and a known way to judge success."],
  ["02", "Map the real process", "Capture the systems, rules, exceptions, approvals, handoffs, and expected outputs behind the work."],
  ["03", "Build it into operations", "Create the agent workflow, connect the tools, define boundaries, test real cases, and launch it where the work already happens."],
  ["04", "Managed quality", "Review real runs against the agreed standard, fix weak spots, and make focused improvements that keep the workflow reliable."],
];

const proofRows = [
  ["01", "Quality standard", "We agree what good looks like before launch, then use that standard to review real workflow runs."],
  ["02", "Approvals supervised", "Sensitive steps stay visible, with human approvals reviewed after launch so the routine keeps the right boundaries."],
  ["03", "Exceptions caught", "Failures, edge cases, missing context, and unclear handoffs are tracked from live runs instead of hidden in chat history."],
  ["04", "Focused improvements", "We ship targeted fixes from evidence, not broad rebuilds, so quality improves without expanding the workflow scope."],
];

const heroChips = ["SECURE", "SANDBOXED", "MANAGED"];

const integrationLogo = (slug: string) => `https://logos.composio.dev/api/${slug}`;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

function PrismLayers() {
  return (
    <>
      <span aria-hidden="true" className="nue-prism-edge-shine">
        <span className="nue-prism-edge-channel nue-prism-edge-channel-red" />
        <span className="nue-prism-edge-channel nue-prism-edge-channel-green" />
        <span className="nue-prism-edge-channel nue-prism-edge-channel-blue" />
      </span>
      <span aria-hidden="true" className="nue-prism-edge-prism" />
      <span aria-hidden="true" className="nue-prism-band" />
      <span aria-hidden="true" className="nue-prism-shadow" />
    </>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">{children}</p>;
}

function PrismLink({ children, href, variant = "primary" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" }) {
  return (
    <span className={variant === "secondary" ? "nue-prism-cta nue-prism-cta-secondary" : "nue-prism-cta nue-prism-cta-primary"}>
      <span aria-hidden="true" className="nue-prism-cta-shadow" />
      <a className="nue-prism-cta-button" href={href}>
        <span>
          {children}
          <ArrowRight aria-hidden="true" className="nue-prism-cta-arrow" strokeWidth={1.7} />
        </span>
      </a>
      <PrismLayers />
    </span>
  );
}

function PrimaryLink({ children, href }: { children: ReactNode; href: string }) {
  return <PrismLink href={href}>{children}</PrismLink>;
}

function SecondaryLink({ children, href }: { children: ReactNode; href: string }) {
  return <PrismLink href={href} variant="secondary">{children}</PrismLink>;
}

function PrismChipList() {
  return (
    <ul className={`${heroCardStyles.list} nous-mono`} aria-label="Worktree control primitives">
      {heroChips.map((label, index) => (
        <li className={`${heroCardStyles.wrap} ${index !== heroChips.length - 1 ? heroCardStyles.highlight : ""}`} key={label}>
          <span className={heroCardStyles.card}>
            <span className={heroCardStyles.label}>{label}</span>
          </span>
          <span aria-hidden="true" className={heroCardStyles.edgeShine}>
            <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelRed}`} />
            <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelGreen}`} />
            <span className={`${heroCardStyles.edgeChannel} ${heroCardStyles.edgeChannelBlue}`} />
          </span>
          <span aria-hidden="true" className={heroCardStyles.edgePrism} />
          <span aria-hidden="true" className={heroCardStyles.prism} />
          <span aria-hidden="true" className={heroCardStyles.shadow} />
        </li>
      ))}
    </ul>
  );
}

function HeroPrismChip({ children }: { children: string }) {
  return (
    <span className={`${heroCardStyles.wrap} ${heroCardStyles.highlight} manual-work-prism-chip nous-mono`}>
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

function SectionIntro({ copy, eyebrow, id, title }: { copy: string; eyebrow: string; id?: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="worktree-type-section-title mt-4">
        {title}
      </h2>
      <p className="worktree-type-body mt-5">{copy}</p>
    </div>
  );
}

type QueueFrame = {
  template: string;
  patterns: Record<string, string>[];
  buckets: Record<string, string[]>;
};

type QueueApp = {
  label: string;
  icon: string;
  frames: QueueFrame[];
};

type QueueRow = {
  app: string;
  icon: string;
  text: string;
  flag: string;
};

const sharedQueueBuckets = {
  account: ["Northstar", "Acme", "Globex", "Initech", "Umbrella", "Wayline", "Orbit", "Nimble"],
  team: ["sales", "support", "finance", "ops", "customer success", "leadership"],
  reviewFlag: ["review", "check", "urgent", "flag"],
  priority: ["low", "medium", "high", "urgent"],
};

const reviewQueueSources: Record<string, QueueApp> = {
  gmail: {
    label: "Gmail",
    icon: "gmail",
    frames: [{
      template: "{subject} — {shortDesc}",
      patterns: [
        { subject: "{account} reply", shortDesc: "{emailIssue}", flag: "{reviewFlag}" },
        { subject: "{team} follow-up", shortDesc: "{followUpIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        emailIssue: ["4 days overdue", "pricing question unanswered", "approval waiting", "needs context"],
        followUpIssue: ["owner missing", "draft needed", "decision pending", "response stale"],
      },
    }],
  },
  outlook: {
    label: "Outlook",
    icon: "outlook",
    frames: [{
      template: "{subject} — {shortDesc}",
      patterns: [
        { subject: "{meetingType} prep", shortDesc: "{prepIssue}", flag: "{reviewFlag}" },
        { subject: "{account} note", shortDesc: "{emailIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        meetingType: ["board", "customer", "partner", "renewal", "weekly"],
        prepIssue: ["numbers missing", "brief needed", "owner unclear", "summary requested"],
        emailIssue: ["policy exception raised", "approval waiting", "context missing", "follow-up needed"],
      },
    }],
  },
  slack: {
    label: "Slack",
    icon: "slack",
    frames: [{
      template: "{channel} — {shortDesc}",
      patterns: [
        { channel: "#{team}", shortDesc: "{threadIssue}", flag: "{reviewFlag}" },
        { channel: "#{projectChannel}", shortDesc: "{projectIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        projectChannel: ["launch", "renewals", "pipeline", "billing", "handoffs"],
        threadIssue: ["approval requested", "owner needed", "exception raised", "decision waiting"],
        projectIssue: ["sign-off requested", "blocker unresolved", "handoff missing", "next step unclear"],
      },
    }],
  },
  teams: {
    label: "Teams",
    icon: "microsoft_teams",
    frames: [{
      template: "{group} — {shortDesc}",
      patterns: [
        { group: "{team} sync", shortDesc: "{messageIssue}", flag: "{reviewFlag}" },
        { group: "{account} room", shortDesc: "{accountIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        messageIssue: ["handoff missing", "approval pending", "update requested", "owner unclear"],
        accountIssue: ["risk raised", "reply needed", "decision blocked", "next step waiting"],
      },
    }],
  },
  stripe: {
    label: "Stripe",
    icon: "stripe",
    frames: [{
      template: "{account} — {shortDesc}",
      patterns: [
        { account: "{account}", shortDesc: "{invoiceIssue}", flag: "{reviewFlag}" },
        { account: "{account}", shortDesc: "{paymentIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        invoiceIssue: ["invoice variance", "amount changed", "approval needed", "discount mismatch"],
        paymentIssue: ["payment failed", "refund outside policy", "dispute opened", "charge needs review"],
      },
    }],
  },
  drive: {
    label: "Drive",
    icon: "googledrive",
    frames: [{
      template: "{file} — {shortDesc}",
      patterns: [
        { file: "{docType} redline", shortDesc: "{docIssue}", flag: "{reviewFlag}" },
        { file: "{businessDoc}", shortDesc: "{docState}", flag: "{reviewFlag}" },
      ],
      buckets: {
        docType: ["MSA", "SOW", "renewal agreement", "security addendum"],
        docIssue: ["new liability clause", "missing signature", "pricing changed", "terms mismatch"],
        businessDoc: ["QBR deck", "launch checklist", "renewal brief", "vendor agreement"],
        docState: ["metrics need refresh", "owner missing", "support data outdated", "approval needed"],
      },
    }],
  },
  document: {
    label: "Document",
    icon: "googledocs",
    frames: [{
      template: "{doc} — {shortDesc}",
      patterns: [
        { doc: "{policyDoc}", shortDesc: "{policyIssue}", flag: "{reviewFlag}" },
        { doc: "{internalDoc}", shortDesc: "{docState}", flag: "{reviewFlag}" },
      ],
      buckets: {
        policyDoc: ["discount policy", "escalation map", "renewal playbook", "support guide"],
        policyIssue: ["exception found", "rule changed", "approval threshold crossed", "missing owner"],
        internalDoc: ["handoff notes", "project brief", "customer summary", "launch plan"],
        docState: ["needs update", "missing context", "stale section", "review requested"],
      },
    }],
  },
  salesforce: {
    label: "Salesforce",
    icon: "salesforce",
    frames: [{
      template: "{account} — {shortDesc}",
      patterns: [
        { account: "{account}", shortDesc: "{crmIssue}", flag: "{reviewFlag}" },
        { account: "{account}", shortDesc: "{renewalIssue}", flag: "{reviewFlag}" },
      ],
      buckets: {
        crmIssue: ["stage mismatch", "owner missing", "next step stale", "amount changed"],
        renewalIssue: ["renewal risk", "usage dropped", "exec sponsor changed", "support issue open"],
      },
    }],
  },
  zendesk: {
    label: "Zendesk",
    icon: "zendesk",
    frames: [{
      template: "{ticket} — {shortDesc}",
      patterns: [
        { ticket: "#{ticketNumber}", shortDesc: "{ticketIssue}", flag: "{priority}" },
        { ticket: "{account} ticket", shortDesc: "{supportSignal}", flag: "{priority}" },
      ],
      buckets: {
        ticketNumber: ["4821", "5174", "6209", "7330", "8142"],
        ticketIssue: ["P1 unresolved", "SLA at risk", "handoff missing", "customer waiting"],
        supportSignal: ["escalation opened", "reply overdue", "owner needed", "severity changed"],
      },
    }],
  },
};

function pickSlot(values: string[], seed: number) {
  return values[Math.abs(seed) % values.length];
}

function resolveQueueTemplate(template: string, buckets: Record<string, string[]>, seed: number): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const values = buckets[key];
    return values ? pickSlot(values, seed + key.length) : "";
  });
}

function renderQueueTemplate(template: string, fields: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => fields[key] ?? "");
}

const titleCasePreserve = new Set(["CRM", "QBR", "MSA", "SOW", "P1", "SLA", "API"]);

function toTitleCase(value: string) {
  return value.replace(/\b[\w#]+\b/g, (word) => {
    const clean = word.replace(/^#/, "");
    const upper = clean.toUpperCase();
    if (titleCasePreserve.has(upper)) return word.startsWith("#") ? `#${upper}` : upper;
    if (/^#/.test(word)) return `#${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  });
}

function toSentenceCase(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
}

function formatQueueText(value: string) {
  const [title, ...descriptionParts] = value.split(" — ");
  if (!descriptionParts.length) return toTitleCase(value);
  return `${toTitleCase(title)} — ${toSentenceCase(descriptionParts.join(" — "))}`;
}

function buildQueueRow(appKey: string, seed: number): QueueRow {
  const app = reviewQueueSources[appKey];
  const frame = app.frames[seed % app.frames.length];
  const pattern = frame.patterns[seed % frame.patterns.length];
  const buckets = { ...sharedQueueBuckets, ...frame.buckets };
  const fields = Object.fromEntries(
    Object.entries(pattern).map(([key, value]) => [key, resolveQueueTemplate(value, buckets, seed + key.length)]),
  );

  return {
    app: app.label,
    icon: integrationLogo(app.icon),
    text: formatQueueText(renderQueueTemplate(frame.template, fields as Record<string, string>)),
    flag: fields.flag ?? "review",
  };
}

const reviewQueueRows = [
  buildQueueRow("stripe", 0),
  buildQueueRow("drive", 1),
  buildQueueRow("salesforce", 2),
  buildQueueRow("zendesk", 3),
  buildQueueRow("gmail", 4),
  buildQueueRow("outlook", 5),
  buildQueueRow("slack", 6),
  buildQueueRow("teams", 7),
  buildQueueRow("document", 8),
  buildQueueRow("stripe", 9),
  buildQueueRow("salesforce", 10),
  buildQueueRow("zendesk", 11),
];

const researchSourceRows = [
  buildQueueRow("gmail", 12),
  buildQueueRow("outlook", 13),
  buildQueueRow("slack", 14),
  buildQueueRow("teams", 15),
  buildQueueRow("document", 16),
  buildQueueRow("drive", 17),
  buildQueueRow("salesforce", 18),
  buildQueueRow("zendesk", 19),
  buildQueueRow("stripe", 20),
  buildQueueRow("gmail", 21),
  buildQueueRow("slack", 22),
  buildQueueRow("document", 23),
];

const analyzeSignalRows = [
  buildQueueRow("salesforce", 24),
  buildQueueRow("zendesk", 25),
  buildQueueRow("stripe", 26),
  buildQueueRow("outlook", 27),
  buildQueueRow("gmail", 28),
  buildQueueRow("slack", 29),
  buildQueueRow("teams", 30),
  buildQueueRow("drive", 31),
  buildQueueRow("document", 32),
  buildQueueRow("salesforce", 33),
  buildQueueRow("zendesk", 34),
  buildQueueRow("stripe", 35),
];

const draftOutputRows = [
  buildQueueRow("gmail", 36),
  buildQueueRow("outlook", 37),
  buildQueueRow("drive", 38),
  buildQueueRow("slack", 39),
  buildQueueRow("teams", 40),
  buildQueueRow("document", 41),
  buildQueueRow("salesforce", 42),
  buildQueueRow("zendesk", 43),
  buildQueueRow("gmail", 44),
  buildQueueRow("outlook", 45),
  buildQueueRow("drive", 46),
  buildQueueRow("slack", 47),
];

const manualWorkCards = [
  {
    title: "Review",
    copy: "Checked before it reaches you.",
    badge: "exceptions surfaced",
    rows: reviewQueueRows,
  },
  {
    title: "Research",
    copy: "Data pulled from every tool.",
    badge: "sources pulled",
    rows: researchSourceRows,
  },
  {
    title: "Analyze",
    copy: "What matters rises to the top.",
    badge: "priority found",
    rows: analyzeSignalRows,
  },
  {
    title: "Draft",
    copy: "Replies and briefs ready to review.",
    badge: "draft ready",
    rows: draftOutputRows,
  },
];

function ContrastPanel() {
  return (
    <div className="manual-work-panel">
      <div className="manual-work-flow" aria-label="Agent work primitives">
        {manualWorkCards.map((card, index) => (
          <article className={`manual-work-flow-row manual-work-flow-row-${index + 1}`} key={card.title}>
            <div className="manual-work-flow-copy">
              <p className="manual-work-title">{card.title}</p>
              <p className="manual-work-copy">{card.copy}</p>
              <HeroPrismChip>{card.badge}</HeroPrismChip>
            </div>
            <div className={`manual-work-mini manual-work-mini-${index + 1}`} aria-hidden="true">
              {index === 0 ? <ReviewQueue rows={card.rows} /> : index === 1 ? <ResearchSourceStack rows={card.rows} /> : index === 2 ? <AnalyzeSignalStack rows={card.rows} /> : index === 3 ? <DraftOutputStack rows={card.rows} /> : card.rows.map((row, rowIndex) => (
                <span className={`manual-work-row manual-work-row-${rowIndex + 1}`} key={`${row.app}-${row.text}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.icon} alt="" title={row.app} />
                  <span className="manual-work-row-text">{row.text}</span>
                  <em>{row.flag}</em>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ImplementationLedger() {
  return (
    <div>
      <div className="managed-quality-list">
        {deploymentSteps.map(([number, title, copy]) => (
          <article className="managed-quality-row" key={number}>
            <span className="managed-quality-index"><span>[</span><strong>{number}</strong><span>]</span></span>
            <div className="managed-quality-row-body">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProofBand() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <Eyebrow>Managed quality</Eyebrow>
          <h2 className="worktree-type-section-title mt-4">Evaluate the workflow, supervise the runs, improve what matters.</h2>
          <p className="worktree-type-body mt-5">After launch, we review real runs against the agreed standard, watch approvals and exceptions, and make focused improvements that keep the workflow reliable.</p>
        </div>
        <div className="managed-quality-list lg:pl-8">
          {proofRows.map(([number, title, copy]) => (
            <article className="managed-quality-row" key={title}>
              <span className="managed-quality-index"><span>[</span><strong>{number}</strong><span>]</span></span>
              <div className="managed-quality-row-body">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="final-cta-section" aria-labelledby="contact-heading">
      <div className="final-cta-inner mx-auto max-w-7xl">
        <Eyebrow>The future of work</Eyebrow>
        <h2 id="contact-heading" className="worktree-type-section-title mt-4">Deploy your first managed agent workflow</h2>
        <div className="final-cta-actions">
          <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <WorktreeShell>
      <section className="hero-section relative px-4 pt-8 sm:px-6 lg:px-10">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div id="top" className="hero-grid mx-auto grid max-w-[92rem] gap-12 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:pt-20">
          <div className="hero-copy-column">
            <Eyebrow>BUILT FOR YOUR BUSINESS</Eyebrow>
            <h1 className="hero-title mt-6 max-w-5xl text-balance text-5xl font-normal leading-[0.95] tracking-[-0.075em] text-[var(--nous-page-hero-title-fg)] sm:text-7xl lg:text-[5.7rem]">
              Managed AI workflow deployments
            </h1>
            <PrismChipList />
            <p className="hero-body mt-7 max-w-2xl text-lg leading-8 text-[var(--nous-page-body-fg)] sm:text-xl sm:leading-9">
              Worktree turns one recurring business process into a managed agent capability, with a Blueprint before launch and a Deployment Record that tracks it over time.
            </p>
            <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
              <SecondaryLink href="/product">See what you receive</SecondaryLink>
            </div>
          </div>
          <div className="hero-mockup-slot">
            <HeroSlackMockup />
          </div>
        </div>

        <ToolsEcosystemBadge />
      </section>

      <section className="section-pad post-hero-section" aria-labelledby="problem-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <Eyebrow>The cost of manual follow-through</Eyebrow>
            <h2 id="problem-heading" className="worktree-type-section-title mt-4">Important busy work is still busy work.</h2>
            <div className="worktree-type-body mt-6 space-y-4">
              <p>Follow-ups, approvals, updates, and handoffs all matter. But when your best people carry them across tools by hand, they lose time for the work that actually transforms the business.</p>
              <p>Worktree turns that follow-through into managed agent routines, so the business keeps moving and your team gets back its best hours.</p>
            </div>
          </div>
          <ContrastPanel />
        </div>
      </section>

      <section id="run" className="section-pad relative" aria-labelledby="run-heading">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Illustrative workflow"
            id="run-heading"
            title="One request becomes a controlled agent run."
            copy="Worktree should not feel like another place to chat with AI. A teammate triggers a known workflow, and the run moves live across systems with scope, approvals, artifacts, and history visible from start to finish."
          />
          <div className="mt-10">
            <WatchItWorkMockup />
          </div>
        </div>
      </section>

      <section id="workflows" className="section-pad workflow-start-section" aria-labelledby="workflows-heading">
        <div className="workflow-start-row mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Where to start</Eyebrow>
            <h2 id="workflows-heading" className="worktree-type-section-title mt-4">Start with the work that already has a playbook.</h2>
            <p className="worktree-type-body mt-5">The best first workflow is recurring work your team already understands, but still handles manually because it needs context, judgment, and access to several systems.</p>
          </div>
          <div className="workflow-fit-frame">
            <article className="workflow-fit-panel workflow-fit-positive">
              <div className="workflow-fit-card-header">
                <div>
                  <p className="mono-label text-[var(--nous-accent-success-fg)]">Ready for a managed routine</p>
                  <h3>Good first workflow</h3>
                </div>
              </div>
                <ul>
                  {workflowFitCriteria.good.map((item) => (
                    <li key={item}><span className="workflow-fit-list-icon"><CheckIcon /></span><span>{item}</span></li>
                  ))}
                </ul>
            </article>
            <article className="workflow-fit-panel workflow-fit-negative">
              <div className="workflow-fit-card-header">
                <div>
                  <p className="mono-label text-[var(--nous-accent-warning)]">Needs more definition first</p>
                  <h3>Bad first workflow</h3>
                </div>
              </div>
                <ul>
                  {workflowFitCriteria.bad.map((item) => (
                    <li key={item}><span className="workflow-fit-list-icon"><MinusIcon /></span><span>{item}</span></li>
                  ))}
                </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="deployment" className="section-pad" aria-labelledby="deployment-heading">
        <div className="mx-auto max-w-7xl">
          <div className="deployment-grid grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="deployment-grid-ledger"><ImplementationLedger /></div>
            <div className="deployment-grid-intro lg:pl-8">
              <SectionIntro
                eyebrow="How it works"
                id="deployment-heading"
                title="We turn real business processes into managed agent workflows."
                copy="We define the workflow in a Consultation Blueprint, build and launch the managed capability, then record evaluations, changes, and limitations in a Deployment Record."
              />
              <a className="mt-6 inline-flex gap-2 text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/product">Explore the complete product model <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <div className="mt-20 lg:mt-24">
            <ProofBand />
          </div>
        </div>
      </section>

      <FinalCta />
    </WorktreeShell>
  );
}
