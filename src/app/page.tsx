import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, FinalCta, NumberedList, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Worktree | Managed AI Agent Operations",
  description: "Your managed AI agent team, designed, secured, deployed, and operated by experts. Engagements start around $25K per year.",
};

const serviceSteps = [
  ["01", "Design", "Define the Agent's role, workflow, standards, and operating boundaries."],
  ["02", "Deploy", "Build the system, connect the agreed tools, and test it in real conditions."],
  ["03", "Control", "Configure permissions, approvals, escalation paths, and run evidence."],
  ["04", "Operate", "Monitor performance, evaluate real runs, and make focused improvements."],
] as const;

const startingScope = [
  "One role-based Agent",
  "One defined production workflow",
  "Consultation Blueprint",
  "Agreed integrations and permissions",
  "Approval and escalation rules",
  "Deployment testing and acceptance",
  "Monitoring and incident controls",
  "Monthly evaluation and improvement",
  "Maintained Deployment Record",
];

function ManagedDeploymentOverview() {
  const rows = [
    ["Agent", "Revenue operations", "Operating"],
    ["Workflow", "Account follow-through", "Live"],
    ["Authority", "Scoped credentials", "Controlled"],
    ["Approvals", "2 human checkpoints", "Supervised"],
    ["Evaluation", "Current standard", "Passing"],
  ];

  return (
    <div className="managed-overview" aria-label="Illustrative managed deployment overview">
      <div className="managed-overview-header">
        <div>
          <p>Managed deployment</p>
          <h2>Revenue operations Agent</h2>
        </div>
        <span><i /> Worktree managed</span>
      </div>
      <div className="managed-overview-score">
        <div>
          <span>Production status</span>
          <strong>Healthy</strong>
        </div>
        <div className="managed-overview-pulse" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>
      <div className="managed-overview-rows">
        {rows.map(([label, value, status]) => (
          <div className="managed-overview-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <em>{status}</em>
          </div>
        ))}
      </div>
      <div className="managed-overview-footer">
        <span>Last operational review</span>
        <strong>Today · Evidence current</strong>
      </div>
    </div>
  );
}

function ProductCard({ eyebrow, href, title, copy, items }: { eyebrow: string; href: string; title: string; copy: string; items: string[] }) {
  return (
    <article className="service-product-card">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3>{title}</h3>
      <p>{copy}</p>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <Link href={href}>Explore {title} <span aria-hidden="true">-&gt;</span></Link>
    </article>
  );
}

export default function Home() {
  return (
    <WorktreeShell>
      <section className="hero-section relative px-4 pt-8 sm:px-6 lg:px-10">
        <div aria-hidden="true" className="hero-bottom-light" />
        <div className="hero-grid mx-auto grid max-w-[92rem] gap-12 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pt-20">
          <div className="hero-copy-column">
            <Eyebrow>Managed AI agent operations</Eyebrow>
            <h1 className="hero-title mt-6 max-w-5xl text-balance text-5xl font-normal leading-[0.95] tracking-[-0.075em] text-[var(--nous-page-hero-title-fg)] sm:text-7xl lg:text-[5.7rem]">
              Your managed AI agent team.
            </h1>
            <p className="hero-body mt-7 max-w-2xl text-lg leading-8 text-[var(--nous-page-body-fg)] sm:text-xl sm:leading-9">
              Worktree designs, secures, deploys, and operates AI agent systems for your business—without requiring you to build an internal agent-operations team.
            </p>
            <div className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
              <SecondaryLink href="/product/managed-operations">Explore managed operations</SecondaryLink>
            </div>
            <p className="worktree-type-meta mt-6">Engagements start around $25K per year</p>
          </div>
          <div className="hero-mockup-slot managed-overview-slot">
            <ManagedDeploymentOverview />
          </div>
        </div>
      </section>

      <section className="section-pad post-hero-section" aria-labelledby="hard-part-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>The operating problem</Eyebrow>
            <h2 id="hard-part-heading" className="worktree-type-section-title mt-4">Anyone can give an AI agent access. Making it dependable is the hard part.</h2>
          </div>
          <div className="worktree-type-body space-y-5 lg:pt-12">
            <p>Agents can already use browsers, call tools, and work across business applications. But access alone does not create a reliable business operation.</p>
            <p>Someone still has to define the role, connect the right systems, constrain its authority, test its behavior, supervise its work, respond when it fails, and keep improving it.</p>
            <p className="text-[var(--nous-page-title-fg)]">That is the capability Worktree provides.</p>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="responsibility-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <Eyebrow>End-to-end responsibility</Eyebrow>
            <h2 id="responsibility-heading" className="worktree-type-section-title mt-4">We build the capability. We stay to operate it.</h2>
            <p className="worktree-type-body mt-6 max-w-2xl">Your team retains authority over business policy and sensitive decisions. Worktree manages the technical and operational system around them.</p>
          </div>
          <NumberedList items={serviceSteps} />
        </div>
      </section>

      <section className="section-pad" aria-labelledby="two-parts-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Eyebrow>The Worktree service</Eyebrow>
            <h2 id="two-parts-heading" className="worktree-type-section-title mt-4">One managed capability, delivered in two parts.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ProductCard
              eyebrow="The deployed system"
              href="/product/agents"
              title="Worktree Agents"
              copy="A durable, role-based Agent that performs recurring work across your existing systems within defined authority."
              items={["Persistent business responsibility", "Connected execution", "Human approvals", "Visible run evidence"]}
            />
            <ProductCard
              eyebrow="The operating service"
              href="/product/managed-operations"
              title="Managed Operations"
              copy="The expert service that makes the Agent production-ready and keeps it reliable after launch."
              items={["Workflow and role design", "Integrations and controls", "Production supervision", "Evaluation and improvement"]}
            />
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="internal-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Eyebrow>Build or partner</Eyebrow>
            <h2 id="internal-heading" className="worktree-type-section-title mt-4">Build an internal function—or start with Worktree.</h2>
            <p className="worktree-type-body mt-6 max-w-3xl">Operating business agents requires workflow design, integrations, security, evaluations, monitoring, incident response, and continuous improvement. Building that capability can require a six-figure annual investment before the first production workflow proves its value.</p>
          </div>
          <div className="build-compare mt-12 grid lg:grid-cols-2">
            <article>
              <p className="worktree-type-eyebrow">Build internally</p>
              <h3>Assemble the function</h3>
              <ul>
                <li>Recruit specialist expertise</li>
                <li>Assemble the infrastructure</li>
                <li>Develop controls and evaluations</li>
                <li>Own every incident and improvement</li>
              </ul>
            </article>
            <article>
              <p className="worktree-type-eyebrow">Partner with Worktree</p>
              <h3>Start with an operating team</h3>
              <ul>
                <li>Begin with established expertise</li>
                <li>Deploy through proven operating patterns</li>
                <li>Build controls and evaluation in from the start</li>
                <li>Keep Worktree accountable after launch</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="starting-heading">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <Eyebrow>Starting engagement</Eyebrow>
            <h2 id="starting-heading" className="worktree-type-section-title mt-4">Start with one business role.</h2>
            <p className="worktree-type-body mt-6">Engagements start around <strong className="font-medium text-[var(--nous-page-title-fg)]">$25K per year</strong> for a focused managed deployment. Additional Agents, workflows, integrations, volume, infrastructure, and service levels are scoped separately.</p>
          </div>
          <div className="scope-manifest">
            <div className="scope-manifest-header">
              <span>Base deployment</span>
              <strong>One Agent · One workflow</strong>
            </div>
            <ul>
              {startingScope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="control-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Designed for control</Eyebrow>
            <h2 id="control-heading" className="worktree-type-section-title mt-4">Controlled from the beginning.</h2>
          </div>
          <div>
            <p className="worktree-type-body">Every deployment begins with explicit authority. The Agent receives only the access needed for its role. Sensitive actions require approval. Exceptions are escalated. Runs retain evidence so behavior can be reviewed and evaluated.</p>
            <Link className="mt-7 inline-block text-[var(--nous-page-title-fg)] underline decoration-[var(--nous-stroke-strong)] underline-offset-4" href="/security">Explore Worktree security</Link>
          </div>
        </div>
      </section>

      <FinalCta eyebrow="A managed path to production" title="Get the capability without building the department." secondary={{ href: "/product/managed-operations", label: "See how we operate Agents" }} />
    </WorktreeShell>
  );
}
