import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, FinalCta, NumberedList, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Managed AI Agent Operations | Worktree",
  description: "Worktree designs, deploys, secures, evaluates, and operates production AI agent systems so you do not have to build the function internally.",
};

const workflowFitCriteria = {
  good: [
    "Happens frequently",
    "Has a known playbook",
    "Uses identifiable inputs",
    "Needs context from defined systems",
    "Has measurable success criteria",
    "Has clear approval points",
  ],
  bad: [
    "Happens once or rarely",
    "No one agrees what good looks like",
    "The process cannot yet be described",
    "Ownership and authority are unclear",
  ],
};

const deploymentSteps = [
  ["01", "Map the work", "Document the process, systems, rules, exceptions, approvals, handoffs, and expected outputs behind the selected role."],
  ["02", "Build the deployment", "Configure the Agent, connect the agreed systems, implement its routine, and establish its operating boundaries."],
  ["03", "Test and accept", "Evaluate representative cases, exceptions, and failure conditions against an agreed quality standard."],
  ["04", "Launch and operate", "Move the bounded workflow into production, supervise real runs, and improve the system using operational evidence."],
] as const;

const qualityRows = [
  ["01", "Quality standard", "We agree what successful performance looks like before launch, then use that standard to evaluate real runs."],
  ["02", "Approvals supervised", "Sensitive steps stay visible so the routine continues to respect the authority designed around it."],
  ["03", "Exceptions caught", "Failures, edge cases, missing context, and unclear handoffs are tracked instead of hidden in chat history."],
  ["04", "Focused improvements", "We make targeted changes from evidence so quality improves without quietly expanding the deployment scope."],
] as const;

const startingScope = [
  "One role-based Agent",
  "One defined production workflow",
  "Consultation Blueprint",
  "Agreed integrations and permissions",
  "Approval and escalation design",
  "Deployment testing and acceptance",
  "Monitoring and incident controls",
  "Monthly evaluation and focused improvement",
  "Maintained Deployment Record",
];

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5" /></svg>;
}

function MinusIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /></svg>;
}

function OperationsHeroBoard() {
  const steps = [
    ["Blueprint", "Complete"],
    ["Controls", "Approved"],
    ["Acceptance", "Passing"],
    ["Operations", "Managed"],
  ];

  return (
    <div className="operations-hero-board" aria-label="Illustrative managed operations lifecycle">
      <div className="operations-hero-header">
        <div><p>Deployment record</p><h2>Account operations</h2></div>
        <span>Production</span>
      </div>
      <div className="operations-hero-role">
        <span>Assigned role</span>
        <strong>Revenue operations Agent</strong>
        <p>One bounded role · One production workflow</p>
      </div>
      <div className="operations-hero-steps">
        {steps.map(([label, status], index) => (
          <div key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <em>{status}</em>
          </div>
        ))}
      </div>
      <div className="operations-hero-footer">
        <span><i /> Worktree oversight active</span>
        <strong>Evaluation current</strong>
      </div>
    </div>
  );
}

export default function ManagedOperationsPage() {
  return (
    <WorktreeShell>
      <section className="hero-section relative px-4 pt-8 sm:px-6 lg:px-10">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div className="hero-grid mx-auto grid max-w-[92rem] gap-12 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pt-20">
          <div className="hero-copy-column">
            <Eyebrow>Managed Operations</Eyebrow>
            <h1 className="hero-title mt-6 max-w-5xl text-balance text-5xl font-normal leading-[0.95] tracking-[-0.075em] text-[var(--nous-page-hero-title-fg)] sm:text-7xl lg:text-[5.7rem]">
              Agent operations without building the team internally.
            </h1>
            <p className="hero-body mt-7 max-w-2xl text-lg leading-8 text-[var(--nous-page-body-fg)] sm:text-xl sm:leading-9">
              Worktree designs, deploys, secures, evaluates, and operates your Agent system. You get a production capability without recruiting the specialists or establishing the operating function yourself.
            </p>
            <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
              <SecondaryLink href="#included">See what is included</SecondaryLink>
            </div>
          </div>
          <div className="hero-mockup-slot managed-overview-slot">
            <OperationsHeroBoard />
          </div>
        </div>
      </section>

      <section className="section-pad post-hero-section" aria-labelledby="fit-heading">
        <div className="workflow-start-row mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Where to start</Eyebrow>
            <h2 id="fit-heading" className="worktree-type-section-title mt-4">Start with a role that can prove itself.</h2>
            <p className="worktree-type-body mt-5">The best first deployment is recurring work your team understands and the business values. Work that lacks an agreed standard should be clarified before it becomes an Agent deployment.</p>
          </div>
          <div className="workflow-fit-frame">
            <article className="workflow-fit-panel workflow-fit-positive">
              <div className="workflow-fit-card-header"><p className="mono-label text-[var(--nous-accent-success-fg)]">Ready for deployment</p><h3>Strong first role</h3></div>
              <ul>{workflowFitCriteria.good.map((item) => <li key={item}><span className="workflow-fit-list-icon"><CheckIcon /></span><span>{item}</span></li>)}</ul>
            </article>
            <article className="workflow-fit-panel workflow-fit-negative">
              <div className="workflow-fit-card-header"><p className="mono-label text-[var(--nous-accent-warning)]">Define it first</p><h3>Not ready yet</h3></div>
              <ul>{workflowFitCriteria.bad.map((item) => <li key={item}><span className="workflow-fit-list-icon"><MinusIcon /></span><span>{item}</span></li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="blueprint-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>Consultation Blueprint</Eyebrow>
            <h2 id="blueprint-heading" className="worktree-type-section-title mt-4">Blueprint before build.</h2>
            <p className="worktree-type-body mt-6">Every engagement begins by giving the Agent a defined operating role before implementation begins.</p>
          </div>
          <div className="blueprint-grid">
            {["Business role and outcome", "Workflow triggers", "Systems and context", "Permitted decisions", "Approval requirements", "Expected exceptions", "Evidence requirements", "Acceptance standard"].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="production-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
          <NumberedList items={deploymentSteps} />
          <div className="lg:pl-10">
            <Eyebrow>Deployment lifecycle</Eyebrow>
            <h2 id="production-heading" className="worktree-type-section-title mt-4">From real process to production operation.</h2>
            <p className="worktree-type-body mt-6">We move a bounded responsibility through design, implementation, acceptance, and ongoing operation. Launch is a controlled transition—not the end of the engagement.</p>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="control-design-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Eyebrow>Operating boundaries</Eyebrow>
            <h2 id="control-design-heading" className="worktree-type-section-title mt-4">Control is part of the operating design.</h2>
            <p className="worktree-type-body mt-6">Your business defines its policies and final authority. Worktree translates those requirements into the deployed system and its operating controls.</p>
          </div>
          <div className="agent-control-grid mt-12">
            {[
              ["Scoped credentials", "Application and data access limited to the assigned role."],
              ["Action boundaries", "Permitted, prohibited, and approval-gated operations."],
              ["Escalation routes", "Named paths for ambiguity, exceptions, and failures."],
              ["Change control", "Acceptance and evidence requirements for material updates."],
            ].map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="operations-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>After launch</Eyebrow>
            <h2 id="operations-heading" className="worktree-type-section-title mt-4">Launch is when operations begin.</h2>
            <p className="worktree-type-body mt-6">Production introduces missing context, unusual cases, changed systems, and ambiguous requests. Worktree reviews the signals produced by real operation so problems can be surfaced and addressed.</p>
          </div>
          <NumberedList items={qualityRows} />
        </div>
      </section>

      <section className="section-pad" aria-labelledby="record-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Deployment Record</Eyebrow>
            <h2 id="record-heading" className="worktree-type-section-title mt-4">A living record of the deployment.</h2>
            <p className="worktree-type-body mt-6">Worktree maintains an inspectable record of the Agent&apos;s assigned role, connected systems, authority, approval rules, acceptance criteria, evaluations, incidents, and material changes.</p>
          </div>
          <div className="deployment-record">
            {["Role and production scope", "Systems and credentials", "Authority and approvals", "Acceptance criteria", "Evaluation history", "Incidents and changes"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><em>Current</em></div>)}
          </div>
        </div>
      </section>

      <section id="included" className="section-pad" aria-labelledby="included-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <Eyebrow>Starting engagement</Eyebrow>
            <h2 id="included-heading" className="worktree-type-section-title mt-4">One role, operated well.</h2>
            <p className="worktree-type-body mt-6">Engagements start around <strong className="font-medium text-[var(--nous-page-title-fg)]">$25K per year</strong>. The bounded scope keeps the first deployment measurable.</p>
            <p className="worktree-type-body mt-5">Additional Agents, workflows, integrations, volume, dedicated infrastructure, and enhanced service levels are scoped separately.</p>
          </div>
          <div className="scope-manifest">
            <div className="scope-manifest-header"><span>Included</span><strong>Base managed deployment</strong></div>
            <ul>{startingScope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="agents-link-heading">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-[var(--nous-stroke-subtle)] pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>The deployed system</Eyebrow>
            <h2 id="agents-link-heading" className="worktree-type-section-title mt-4">See what Worktree operates.</h2>
            <p className="worktree-type-body mt-5 max-w-2xl">Explore the durable, connected Agent system that performs the role inside your business.</p>
          </div>
          <Link className="text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/product/agents">Explore Worktree Agents</Link>
        </div>
      </section>

      <FinalCta eyebrow="A focused first deployment" title="Start with one role worth operating well." secondary={{ href: "/product/agents", label: "Explore Worktree Agents" }} />
    </WorktreeShell>
  );
}
