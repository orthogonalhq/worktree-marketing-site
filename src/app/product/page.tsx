import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ProductPrismObserver } from "@/components/product-prism-observer";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Managed Agent Deployment | Worktree",
  description: "Turn one recurring process into a managed agent workflow through an in-depth consultation, managed deployment, and monthly Deployment Record.",
};

const deliverables = [
  {
    index: "01",
    role: "Defines",
    title: "Consultation Blueprint",
    copy: "Worktree examines the objective, workflow, systems, controls, success measures, dependencies, risks, and boundaries—then turns that understanding into the Consultation Blueprint and deployment plan.",
    note: "The foundation for build, testing, acceptance, and launch",
  },
  {
    index: "02",
    role: "Performs",
    title: "Managed Agent and Workflow Deployment",
    copy: "One selected business process becomes a working agent workflow inside the selected tools. Worktree builds, deploys, operates, evaluates, supports, and improves it.",
    note: "Routine work moves; exceptions route to people",
  },
  {
    index: "03",
    role: "Records",
    title: "Deployment Record",
    copy: "See how the workflow is instructed, controlled, evaluated, performing, and changing. Beginning at acceptance, the Record is updated monthly with material changes, limitations, risks, and next actions.",
    note: "A current account of what changed and what comes next",
  },
];

const blueprintInputs = [
  "Workflow owner",
  "People who run the work",
  "Current guidance and examples",
  "Selected systems, permissions, and constraints",
];

const blueprintCoverage = [
  ["Purpose and success", "The business objective, success measures, representative cases, and acceptance criteria the deployment should support."],
  ["Operating design", "The workflow, systems, instructions, handoffs, exceptions, and human controls that shape how the work runs."],
  ["Deployment plan", "The dependencies, risks, boundaries, required access, testing, acceptance, and path to launch."],
];

const workflowStages = [
  ["Signal", "A request, message, schedule, or system event starts the routine."],
  ["Context", "The workflow gathers the information it needs from the selected sources."],
  ["Routine", "The agent follows the defined instructions and prepares the required output."],
  ["Judgment", "Approvals, ambiguity, and exceptions route to the right person."],
  ["Record", "Outputs and run history remain visible for review and evaluation."],
];

const managementLayers = [
  ["Operate", "Review workflow operation and follow up on observed failures and exceptions within the agreed support model."],
  ["Evaluate", "Review representative and live runs against the accepted success measures and controls."],
  ["Support", "Respond during business hours to team questions, exceptions, and operational issues."],
  ["Improve", "Test and apply focused changes when evaluation evidence supports them."],
];

const lifecycle = [
  ["Consultation", "Worktree turns the consultation findings into the proposed deployment Blueprint."],
  ["Build", "Worktree configures, connects, and tests the workflow in the selected systems."],
  ["Acceptance", "Accepted instructions, controls, and evaluation criteria start the Deployment Record."],
  ["Monthly", "The Record captures evaluations, performance, material changes, limitations, risks, and next actions."],
];

const deploymentAnatomy = [
  {
    index: "01",
    label: "Agent",
    title: "A managed agent built for the job.",
    copy: "Worktree configures the agent around its role, instructions, tools, and the moments where human judgment is required.",
    note: "Managed and improved by Worktree",
  },
  {
    index: "02",
    label: "Workflow",
    title: "The workflow gives the agent a job to do.",
    copy: "It defines what starts the work, the context to gather, the routine to follow, the exceptions to route, and the output to produce.",
    note: "One workflow for one defined business job",
  },
  {
    index: "03",
    label: "Secured environment",
    title: "A secured environment for the work.",
    copy: "The agent and workflow operate with the selected systems, permissions, controls, and operating boundaries configured around the job.",
    note: "Configured and managed as part of the deployment",
  },
];

const deploymentService = [
  ["Consultation and Blueprint", "Understand the operation and define what the deployment should accomplish."],
  ["Connect, test, and launch", "Configure the agent, workflow, tools, controls, and acceptance cases."],
  ["Operate, evaluate, and support", "Keep the deployment working and review how it performs in practice."],
  ["Record and improve", "Make evidence, material changes, limitations, and next actions visible each month."],
];

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

function PrismLink({ children, href, variant = "primary" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" }) {
  return (
    <span className={variant === "secondary" ? "nue-prism-cta nue-prism-cta-secondary" : "nue-prism-cta nue-prism-cta-primary"}>
      <span aria-hidden="true" className="nue-prism-cta-shadow" />
      <Link className="nue-prism-cta-button" href={href}>
        <span>
          {children}
          <ArrowRight aria-hidden="true" className="nue-prism-cta-arrow" strokeWidth={1.7} />
        </span>
      </Link>
      <PrismLayers />
    </span>
  );
}

function SectionIntro({ copy, eyebrow, id, title }: { copy: string; eyebrow: string; id: string; title: string }) {
  return (
    <div className="product-section-intro">
      <p className="worktree-type-eyebrow">{eyebrow}</p>
      <h2 id={id} className="worktree-type-section-title mt-4">{title}</h2>
      <p className="product-section-copy worktree-type-body mt-5">{copy}</p>
    </div>
  );
}

export default function ProductPage() {
  return (
    <WorktreeShell>
      <div className="product-page">
        <ProductPrismObserver />
        <section className="product-hero section-pad px-4 pt-16 sm:px-6 lg:px-10" aria-labelledby="product-heading">
          <div className="mx-auto max-w-7xl">
            <header className="max-w-4xl">
              <p className="worktree-type-eyebrow">Product</p>
              <h1 id="product-heading" className="worktree-type-page-title mt-5">Managed Agent Deployment</h1>
              <p className="worktree-type-lead mt-7 max-w-3xl">Routine work advances through your selected tools, exceptions reach the right people, and operating evidence remains reviewable. An in-depth agentic workflow consultation produces the Blueprint; Worktree then deploys and manages one defined workflow, with monthly Record updates after acceptance.</p>
              <div className="product-hero-actions mt-10">
                <PrismLink href="/deploy">Review your workflow</PrismLink>
                <PrismLink href="#deliverables" variant="secondary">See what you receive</PrismLink>
              </div>
            </header>

            <section id="deliverables" className="product-deliverables" aria-labelledby="deliverables-heading">
              <div className="max-w-3xl">
                <p className="worktree-type-eyebrow">Three connected deliverables</p>
                <h2 id="deliverables-heading" className="product-subsection-title mt-4">What you receive.</h2>
                <p className="product-section-copy worktree-type-body mt-5">An in-depth agentic workflow consultation that produces the Blueprint for a managed deployment. A working agent workflow inside the selected tools. A monthly operating record of performance, changes, risks, and next actions.</p>
              </div>
              <div className="product-artifact-grid" data-product-prism>
                {deliverables.map((deliverable) => (
                  <article
                    className={deliverable.role === "Performs" ? "product-artifact-card product-artifact-card-managed" : "product-artifact-card"}
                    key={deliverable.title}
                  >
                    <div className="product-artifact-meta">
                      <span>{deliverable.index}</span>
                      <span>{deliverable.role}</span>
                    </div>
                    <h3>{deliverable.title}</h3>
                    <p>{deliverable.copy}</p>
                    <span className="product-artifact-note">{deliverable.note}</span>
                  </article>
                ))}
              </div>
            </section>

            <nav className="product-section-nav" aria-label="Product page sections">
              <PrismLink href="#blueprint" variant="secondary">Blueprint</PrismLink>
              <PrismLink href="#managed-deployment" variant="secondary">Managed deployment</PrismLink>
              <PrismLink href="#deployment-record" variant="secondary">Deployment Record</PrismLink>
              <PrismLink href="#scope" variant="secondary">Scope</PrismLink>
              <PrismLink href="#continuity" variant="secondary">Commitment</PrismLink>
            </nav>
          </div>
        </section>

        <section id="blueprint" className="product-major-section section-pad px-4 sm:px-6 lg:px-10" aria-labelledby="blueprint-heading">
          <div className="product-blueprint-layout mx-auto max-w-7xl">
            <div>
              <SectionIntro
                eyebrow="We begin with an in-depth agentic consultation."
                id="blueprint-heading"
                title="See the whole workflow before deciding what to deploy."
                copy="Worktree examines how the operation functions across people, systems, instructions, handoffs, controls, exceptions, success measures, dependencies, and risks. That in-depth consultation becomes a Blueprint your team can refine and accept before anything is built."
              />
              <div className="product-input-block">
                <p className="worktree-type-meta">The consultation brings together</p>
                <ul>
                  {blueprintInputs.map((input) => <li key={input}>{input}</li>)}
                </ul>
              </div>
            </div>

            <div className="product-blueprint-artifact">
              <div className="product-blueprint-panel">
                <div className="product-panel-heading">
                  <p className="worktree-type-meta">Consultation Blueprint</p>
                  <p>A documented proposal for how the agent, workflow, and secured environment should work together.</p>
                </div>
                <dl className="product-definition-grid">
                  {blueprintCoverage.map(([term, description]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{description}</dd>
                    </div>
                  ))}
                </dl>
                <div className="product-blueprint-outcome">
                  <span className="worktree-type-meta">Ready for review</span>
                  <strong>A documented workflow proposal, ready for your team to review.</strong>
                  <p>Refine it with Worktree before anything is built, then use it to guide testing, acceptance, and launch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="managed-deployment" className="product-major-section product-surface-section product-managed-section section-pad px-4 sm:px-6 lg:px-10" aria-labelledby="managed-deployment-heading">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="In operation"
              id="managed-deployment-heading"
              title="Routine cases move. Exceptions reach the right person. Operating evidence remains reviewable."
              copy="The workflow follows accepted instructions, gathers selected context, and routes approvals, ambiguity, and exceptions to the right people. Worktree reviews operating evidence, provides support during the agreed business-hours window, and applies focused improvements."
            />

            <ol className="product-pipeline" aria-label="Anatomy of the managed workflow" data-product-prism>
              {workflowStages.map(([title, copy], index) => (
                <li key={title}>
                  <div className="product-pipeline-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>

            <div className="product-management-strip" aria-label="Ongoing managed service">
              {managementLayers.map(([title, copy]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="deployment-record" className="product-major-section section-pad px-4 sm:px-6 lg:px-10" aria-labelledby="record-heading">
          <div className="product-record-layout mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Evidence becomes improvement"
              id="record-heading"
              title="Make monthly decisions from a current operating record."
              copy="The team can see what changed, what remains true, where limitations or risks persist, and what should happen next. The Deployment Record begins at acceptance and is updated monthly with instructions, controls, evaluations, performance, material changes, limitations, risks, and next actions."
            />

            <div className="product-record-example" aria-label="Illustrative example of operating evidence being evaluated, acted on, and scheduled for reevaluation" data-product-prism>
              <div className="product-evaluation-signal">
                <span className="worktree-type-meta">Routing control evaluation</span>
                <div className="product-evaluation-score">
                  <strong>53</strong>
                  <span>representative cases reviewed</span>
                  <div className="product-evaluation-summary">
                    <p><b>52</b> passed</p>
                    <p><b>1</b> exposed an unresolved-ownership edge case</p>
                  </div>
                </div>
              </div>
              <div className="product-evaluation-transform">
                <svg viewBox="0 0 176 112" aria-hidden="true">
                  <path className="product-evaluation-path product-evaluation-path-red" d="M2 30 C42 30 55 42 76 54" />
                  <path className="product-evaluation-path product-evaluation-path-green" d="M2 56 H76" />
                  <path className="product-evaluation-path product-evaluation-path-blue" d="M2 82 C42 82 55 70 76 58" />
                  <path className="product-evaluation-output" d="M100 56 H174" />
                  <path className="product-evaluation-prism" d="M88 35 L105 56 L88 77 L71 56 Z" />
                </svg>
                <span className="worktree-type-meta">Evaluated against the accepted routing control</span>
              </div>
              <article className="product-record-card">
                <div className="product-record-card-header">
                  <span>July evaluation</span>
                  <span>Deployment Record</span>
                </div>
                <dl>
                  <div><dt>Finding</dt><dd>One exception could not resolve the required account owner</dd></div>
                  <div className="product-record-change"><dt>Focused change</dt><dd>Added fallback owner resolution before completion</dd></div>
                  <div><dt>Next evaluation</dt><dd>Re-run the 53-case suite and monitor live exceptions</dd></div>
                </dl>
                <p className="product-record-control"><span>Control preserved</span> Account-owner approval remains required</p>
              </article>
            </div>
          </div>

          <div className="product-lifecycle mx-auto max-w-7xl" aria-labelledby="lifecycle-heading">
            <div>
              <p className="worktree-type-eyebrow">When each piece arrives</p>
              <h2 id="lifecycle-heading" className="product-subsection-title mt-4">From proposal to operating record.</h2>
            </div>
            <ol>
              {lifecycle.map(([title, copy], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="scope" className="product-major-section product-surface-section section-pad px-4 sm:px-6 lg:px-10" aria-labelledby="scope-heading">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="What one deployment covers"
              id="scope-heading"
              title="One agent. One workflow. One secured environment."
              copy="Worktree builds the agent for a defined business job, gives it the workflow to carry that job forward, and configures the environment around the systems, permissions, controls, and operating boundaries the work requires."
            />

            <div className="product-deployment-anatomy" aria-label="The three parts of one managed deployment">
              {deploymentAnatomy.map(({ copy, index, label, note, title }) => (
                <article
                  className={label === "Secured environment" ? "product-deployment-part product-deployment-part-environment" : "product-deployment-part"}
                  key={label}
                >
                  <div className="product-deployment-part-meta">
                    <span>{index}</span>
                    <span>{label}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <p className="product-deployment-part-note">{note}</p>
                </article>
              ))}
            </div>

            <div className="product-scope-service">
              <div className="product-scope-service-heading">
                <p className="worktree-type-eyebrow">From consultation through monthly improvement</p>
                <h3>Worktree manages the deployment as a complete service.</h3>
              </div>
              <ol>
                {deploymentService.map(([title, copy], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="product-scope-expansion">
              <p className="worktree-type-eyebrow">When the operation needs more</p>
              <div>
                <h3>We expand the deployment deliberately.</h3>
                <p>One deployment begins with one agent, one workflow, and one secured environment. When more capability would help—additional agents or workflows, custom applications, dedicated infrastructure, 24/7 support, or customer-cloud and on-premises environments—we assess it with you and design the next step around the operation.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="continuity" className="product-major-section section-pad px-4 sm:px-6 lg:px-10" aria-labelledby="continuity-heading">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Our satisfaction guarantee"
              id="continuity-heading"
              title="We earn your business every month."
              copy="Monthly evaluation and a current Deployment Record show what is working, what changed, and what comes next. If the service is no longer earning its place, cancel at any time."
            />

            <div className="product-assurance-strip" aria-label="How Worktree supports its satisfaction guarantee">
              <article>
                <p className="worktree-type-meta">01</p>
                <h3>Evaluated every month</h3>
                <p>Worktree reviews representative and live runs against the accepted success measures and controls.</p>
              </article>
              <article>
                <p className="worktree-type-meta">02</p>
                <h3>Changes stay visible</h3>
                <p>The Deployment Record shows what changed, what remains true, where limitations or risks persist, and what happens next.</p>
              </article>
              <article>
                <p className="worktree-type-meta">03</p>
                <h3>Cancel at any time</h3>
                <p>Stay because the service is valuable—not because of a long commitment. If you leave, Worktree provides the final Deployment Record and agreed exports.</p>
              </article>
            </div>

            <div className="product-data-trust">
              <p className="worktree-type-eyebrow">Your information stays under your control</p>
              <div>
                <h3>Your work stays with you.</h3>
                <p>You receive the final Deployment Record and agreed customer-owned exports. Worktree removes its delegated access, disconnects the managed deployment, and deletes retained customer data at your verified request.</p>
              </div>
            </div>

            <div className="product-inline-cta">
              <div>
                <p className="worktree-type-eyebrow">Bring us one recurring workflow</p>
                <h2 className="product-subsection-title mt-4">See how one workflow becomes a managed deployment.</h2>
                <p className="product-section-copy worktree-type-body mt-5">Bring the workflow as it runs today, the people and tools it touches, and a recent example. The review will clarify fit, controls, dependencies, scope, pricing, and the path to launch.</p>
              </div>
              <div className="product-inline-cta-action">
                <PrismLink href="/deploy">Review your workflow</PrismLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </WorktreeShell>
  );
}
