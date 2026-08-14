import type { Metadata } from "next";
import { HeroSlackMockup, WatchItWorkMockup, ToolsEcosystemBadge } from "@/components/worktree-demo-mockups";
import { AnalyzeSignalStack, DraftOutputStack, ResearchSourceStack, ReviewQueue } from "@/components/review-queue";
import { Eyebrow, FinalCta, PrimaryLink, SecondaryLink, SectionIntro } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import heroCardStyles from "@/app/hero-sub-header-cards.module.css";

export const metadata: Metadata = {
  title: "Worktree Agents | Durable AI Business Roles",
  description: "Durable, connected AI agents that perform recurring business work within explicit permissions, approvals, and visible run history.",
};

const heroChips = ["DURABLE", "CONNECTED", "CONTROLLED"];

const integrationLogo = (slug: string) => `https://logos.composio.dev/api/${slug}`;

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

export default function WorktreeAgentsPage() {
  return (
    <WorktreeShell>
      <section className="hero-section relative px-4 pt-8 sm:px-6 lg:px-10">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div id="top" className="hero-grid mx-auto grid max-w-[92rem] gap-12 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:pt-20">
          <div className="hero-copy-column">
            <Eyebrow>Worktree Agents</Eyebrow>
            <h1 className="hero-title mt-6 max-w-5xl text-balance text-5xl font-normal leading-[0.95] tracking-[-0.075em] text-[var(--nous-page-hero-title-fg)] sm:text-7xl lg:text-[5.7rem]">
              A durable AI agent built around a real business role.
            </h1>
            <PrismChipList />
            <p className="hero-body mt-7 max-w-2xl text-lg leading-8 text-[var(--nous-page-body-fg)] sm:text-xl sm:leading-9">
              Worktree Agents perform recurring work across the systems your business already uses—with defined responsibilities, scoped access, human approvals, and a visible history of their work.
            </p>
            <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
              <SecondaryLink href="#run">Watch an Agent run</SecondaryLink>
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
            <Eyebrow>Persistent responsibility</Eyebrow>
            <h2 id="problem-heading" className="worktree-type-section-title mt-4">Not another place to chat with AI.</h2>
            <div className="worktree-type-body mt-6 space-y-4">
              <p>A Worktree Agent is designed to hold an ongoing responsibility—not wait for someone to reconstruct the task in a new conversation.</p>
              <p>Work begins from a request, event, schedule, or known business trigger. The Agent gathers context, follows the defined routine, and moves the work forward within its authority.</p>
            </div>
          </div>
          <ContrastPanel />
        </div>
      </section>

      <section id="run" className="section-pad relative" aria-labelledby="run-heading">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Controlled execution"
            id="run-heading"
            title="One request becomes a controlled Agent run."
            copy="A teammate initiates a known request. The Agent retrieves context from permitted systems, performs the defined work, and pauses wherever approval is required—with its scope, sources, artifacts, and history visible from start to finish."
          />
          <div className="mt-10">
            <WatchItWorkMockup />
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="access-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>Role-based access</Eyebrow>
            <h2 id="access-heading" className="worktree-type-section-title mt-4">Access follows the role.</h2>
            <p className="worktree-type-body mt-5">An Agent does not receive unrestricted access to the business. Its credentials, systems, data, and permitted actions are configured around the responsibility it has been assigned.</p>
          </div>
          <div className="agent-control-grid">
            <article><span>01</span><h3>Scoped systems</h3><p>Only the applications and data needed for the assigned responsibility.</p></article>
            <article><span>02</span><h3>Permitted actions</h3><p>Explicit operations the Agent may perform without exceeding its role.</p></article>
            <article><span>03</span><h3>Human approval</h3><p>Sensitive or consequential actions pause for an authorized decision.</p></article>
            <article><span>04</span><h3>Exception handling</h3><p>Ambiguous situations escalate instead of being silently improvised.</p></article>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="evidence-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Inspectable operation</Eyebrow>
            <h2 id="evidence-heading" className="worktree-type-section-title mt-4">Every run leaves evidence.</h2>
          </div>
          <div className="worktree-type-body space-y-4">
            <p>A production Agent must be inspectable. Worktree retains the artifacts needed to understand what happened: sources used, actions taken, approvals received, outputs produced, exceptions encountered, and final run status.</p>
            <p>This evidence allows your team and Worktree to review behavior, investigate failures, and evaluate quality over time.</p>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Eyebrow>Human authority</Eyebrow>
            <h2 id="team-heading" className="worktree-type-section-title mt-4">It works with your team—not around them.</h2>
            <p className="worktree-type-body mt-6">Your team can initiate work from familiar tools, review what the Agent prepares, approve sensitive actions, correct exceptions, and inspect completed runs. The Agent handles recurring operational load while people retain control over policy, judgment, and consequential decisions.</p>
          </div>
        </div>
      </section>

      <FinalCta eyebrow="The operating layer" title="We do not hand you an Agent and leave you to operate it." secondary={{ href: "/product/managed-operations", label: "Explore Managed Operations" }} />
    </WorktreeShell>
  );
}
