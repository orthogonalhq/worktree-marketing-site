import type { Metadata } from "next";
import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Worktree vs. Grok Bot, Hermes Agent & OpenClaw",
  description:
    "Compare self-service, open-source, self-hosted, and managed AI agent approaches—and decide who should design, secure, evaluate, and operate the workflow.",
  path: "/product/compare-ai-agent-approaches",
});

const executiveAnswers = [
  {
    name: "Grok Bot",
    copy: "Choose a packaged, hosted agent product while your team defines the work, grants access, supervises results, and owns the operating process around it.",
  },
  {
    name: "Nous Research Hermes Agent",
    copy: "Choose a flexible, open-source agent runtime when your technical team wants to install, extend, secure, and operate the system.",
  },
  {
    name: "OpenClaw",
    copy: "Choose a self-hosted agent gateway and platform when your team wants control over infrastructure, channels, models, routing, and configuration.",
  },
  {
    name: "Worktree",
    copy: "Choose a managed path when you want a bounded business workflow designed, deployed, evaluated, and operated without building an internal agent-operations function.",
  },
];

const comparisonRows = [
  ["Primary offering", "Packaged cloud agents", "Open-source agent runtime", "Self-hosted agent gateway and platform", "Managed workflow deployment and operations"],
  ["Deployment model", "Vendor-hosted", "Install locally, on servers, or in cloud environments", "Run on your machine or infrastructure", "Selected and operated around the customer workflow"],
  ["Workflow design", "Your team", "Your team or implementation partner", "Your team or implementation partner", "Worktree with your process owner"],
  ["Access and controls", "Your team within the product", "Your technical team", "Your technical team", "Worktree with customer system owners"],
  ["Evaluation standard", "Your team", "Your team", "Your team", "Worktree with the customer"],
  ["Failure response", "Your team", "Your team", "Your team", "Worktree within the managed engagement"],
  ["Best fit", "Fast self-service adoption", "Teams building a flexible agent stack", "Teams prioritizing self-hosting and platform control", "Teams buying a managed business outcome"],
  ["Commercial model", "Paid product subscription", "Open source plus models, infrastructure, and operations", "Open source plus models, infrastructure, and operations", "Scoped managed engagement defined through a deployment review"],
];

const operatingQuestions = [
  "What event starts the workflow?",
  "Which systems and records may it access?",
  "What actions may it take without approval?",
  "What evidence shows that a run succeeded?",
  "Which errors must stop the workflow?",
  "Where are exceptions recorded and reviewed?",
  "Who responds when credentials expire or an integration changes?",
  "Who decides whether a weak result needs a prompt change, a workflow change, or a human handoff?",
];

const operatingCosts = [
  ["Workflow design", "Turn an informal process into explicit inputs, rules, exceptions, approvals, and success criteria."],
  ["Access and security", "Configure credentials, tool permissions, data boundaries, identity, sandboxing, and approval policies."],
  ["Integration maintenance", "Respond when application interfaces, authentication flows, schemas, and business systems change."],
  ["Evaluation", "Build representative cases, measurable acceptance criteria, regression checks, and review of real runs."],
  ["Monitoring and recovery", "Detect stalled, repeated, incomplete, or plausible-looking work that fails the business standard."],
  ["Continuous improvement", "Use operating evidence to improve the workflow without expanding its scope by default."],
];

const worktreeSteps = [
  ["01", "Pick the right workflow", "Choose recurring work with clear inputs, business value, and a known way to judge success."],
  ["02", "Map the real process", "Capture the systems, rules, exceptions, approvals, handoffs, and expected outputs behind the work."],
  ["03", "Build it into operations", "Create the agent workflow, connect the tools, define boundaries, test representative cases, and launch it where the work already happens."],
  ["04", "Manage quality", "Review real runs against the agreed standard, watch approvals and exceptions, and make focused improvements."],
];

const faqItems = [
  {
    question: "Is Worktree an AI agent platform?",
    answer: "Worktree is a managed deployment and operations service. It may use agent runtimes and platforms as implementation components, but the offering is the designed and managed business workflow rather than access to a proprietary runtime.",
  },
  {
    question: "Could Worktree use Hermes Agent or OpenClaw?",
    answer: "Potentially. The appropriate runtime depends on the workflow, systems, security requirements, and deployment environment. Worktree does not commit to a particular underlying platform before the workflow is assessed.",
  },
  {
    question: "Is Grok Bot a direct Worktree competitor?",
    answer: "Not exactly. Grok Bot is a packaged product that customers operate through a hosted experience. Worktree is an expertise and accountability layer for designing and managing a business deployment. Buyers may reasonably consider both because they represent different ways to put agents to work.",
  },
  {
    question: "Is self-hosting more secure?",
    answer: "Not automatically. Self-hosting provides additional control over infrastructure and data paths, but it also transfers configuration, patching, access control, monitoring, and incident-response responsibility to the operator. Security depends on the complete workflow and operating model.",
  },
  {
    question: "Why not hire an agent engineer?",
    answer: "Hiring internally can be the right choice when the company expects enough sustained agent work to justify a permanent function. A production capability may also need integration, security, evaluation, infrastructure, and operational ownership beyond a single engineering role.",
  },
  {
    question: "How much does Worktree cost?",
    answer: "Pricing is established through a deployment review. The workflow, systems, permissions, evaluation requirements, and operating support determine the scope and commercial proposal.",
  },
  {
    question: "Which option is best?",
    answer: "If your team already understands agent security, workflow design, integrations, and operations, these platforms can be powerful. If you want the outcome without building that function internally, Worktree provides the managed path.",
  },
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

function PrimaryCta({ children, href }: { children: string; href: string }) {
  return (
    <span className="nue-prism-cta nue-prism-cta-primary">
      <span aria-hidden="true" className="nue-prism-cta-shadow" />
      <Link className="nue-prism-cta-button" href={href}>
        <span>{children}<span aria-hidden="true" className="nue-prism-cta-arrow">-&gt;</span></span>
      </Link>
      <PrismLayers />
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.bulletList}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function CompareAiAgentApproachesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <WorktreeShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className={styles.hero} aria-labelledby="compare-heading">
        <div className={styles.contentShell}>
          <div className={styles.heroContent}>
            <p className="worktree-type-eyebrow">Worktree vs. Grok Bot vs. Hermes Agent vs. OpenClaw</p>
            <h1 id="compare-heading" className="worktree-type-page-title mt-5">Which AI agent operating model is right for your business?</h1>
            <p className="worktree-type-lead mt-6">These approaches can all help agents work across tools. They differ most in what your team must design, secure, evaluate, and operate.</p>
            <p className={styles.heroStatement}>The question is not which agent can use a browser or call a tool. The question is who will design the workflow, control its permissions, verify its behavior, respond when it fails, and keep improving it.</p>
            <div className={styles.heroActions}>
              <PrimaryCta href="/deploy">Start a workflow review</PrimaryCta>
              <a className={styles.textLink} href="#comparison">Compare the approaches</a>
            </div>
            <p className={styles.reviewed}>Competitor information last reviewed August 13, 2026. Products change quickly.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="short-answer-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Executive answer</p>
            <h2 id="short-answer-heading" className="worktree-type-section-title mt-4">Choose the responsibility model first.</h2>
            <p className="worktree-type-body mt-5">These are not rankings. They are different allocations of responsibility.</p>
          </div>
          <div className={styles.executiveGrid}>
            {executiveAnswers.map((answer) => (
              <article className={styles.executiveCard} key={answer.name}>
                <h3 className="worktree-type-card-title">{answer.name}</h3>
                <p>{answer.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison" className={styles.section} aria-labelledby="comparison-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Side-by-side</p>
            <h2 id="comparison-heading" className="worktree-type-section-title mt-4">Compare the operating models.</h2>
            <p className="worktree-type-body mt-5">The software layers overlap. The durable difference is who owns the operating work after the technology can call a tool.</p>
          </div>
          <div className={styles.tableFrame} tabIndex={0} role="region" aria-label="Scrollable comparison of AI agent approaches">
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th scope="col">Decision</th>
                  <th scope="col">Grok Bot</th>
                  <th scope="col">Hermes Agent</th>
                  <th scope="col">OpenClaw</th>
                  <th className={styles.worktreeColumn} scope="col">Worktree</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, ...values]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {values.map((value, index) => <td className={index === values.length - 1 ? styles.worktreeColumn : undefined} key={`${label}-${index}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>On smaller screens, scroll the table horizontally to compare all four approaches.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="approaches-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Buyer fit</p>
            <h2 id="approaches-heading" className="worktree-type-section-title mt-4">Four capable approaches, built for different buyers.</h2>
          </div>
          <div className={styles.approachGrid}>
            <article className={styles.approachCard}>
              <p className={styles.approachNumber}>01 / Packaged cloud product</p>
              <h3>Grok Bot</h3>
              <p>Grok Bot provides always-on agents with a cloud computer, the ability to work across applications, and routines learned from demonstrated work.</p>
              <h4>Choose it when</h4>
              <BulletList items={["You want the fastest path to trying a hosted agent.", "A self-service product fits your security requirements.", "Your team is comfortable defining tasks and supervising results."]} />
              <p className={styles.keepInMind}><strong>Keep in mind:</strong> a packaged product reduces setup work. It does not automatically define your business rules, acceptable error rates, or responsibility for failed work.</p>
              <a className={styles.sourceLink} href="https://x.ai/news/introducing-grok-bot">Official Grok Bot announcement <span aria-hidden="true">↗</span></a>
            </article>

            <article className={styles.approachCard}>
              <p className={styles.approachNumber}>02 / Open-source runtime</p>
              <h3>Nous Research Hermes Agent</h3>
              <p>Hermes Agent is an open-source agent runtime with tools, memory, skills, scheduled automation, messaging integrations, model-provider flexibility, and several execution options.</p>
              <h4>Choose it when</h4>
              <BulletList items={["Your team wants to build on an open-source runtime.", "You need flexibility across models and execution environments.", "Agent infrastructure is a capability you want to own."]} />
              <p className={styles.keepInMind}><strong>Keep in mind:</strong> Hermes includes substantial technical machinery. Your team remains responsible for configuring it, testing real cases, and operating it over time.</p>
              <a className={styles.sourceLink} href="https://hermes-agent.nousresearch.com/docs/">Official Hermes Agent documentation <span aria-hidden="true">↗</span></a>
            </article>

            <article className={styles.approachCard}>
              <p className={styles.approachNumber}>03 / Self-hosted platform</p>
              <h3>OpenClaw</h3>
              <p>OpenClaw is a self-hosted gateway for agents across messaging channels, control surfaces, models, plugins, tools, sessions, and multi-agent routing.</p>
              <h4>Choose it when</h4>
              <BulletList items={["Self-hosting and infrastructure control are requirements.", "You want to select models, channels, and deployment patterns.", "Your team owns upgrades, observability, security, and recovery."]} />
              <p className={styles.keepInMind}><strong>Keep in mind:</strong> self-hosting gives your team control and responsibility. Business deployments still need deliberate identity, tenancy, tool-policy, sandboxing, and operating design.</p>
              <a className={styles.sourceLink} href="https://docs.openclaw.ai/">Official OpenClaw documentation <span aria-hidden="true">↗</span></a>
            </article>

            <article className={`${styles.approachCard} ${styles.worktreeCard}`}>
              <p className={styles.approachNumber}>04 / Managed outcome</p>
              <h3>Worktree</h3>
              <p>Worktree is not positioned as a better runtime. It is the expertise and accountability layer for teams that want a business workflow delivered without creating an internal agent-operations function.</p>
              <h4>Choose it when</h4>
              <BulletList items={["You want the outcome without first assembling an agent team.", "The workflow crosses systems, rules, and approvals.", "Someone needs to remain accountable after launch."]} />
              <p className={styles.keepInMind}><strong>Keep in mind:</strong> Worktree does not replace the process owner or business judgment. The customer authorizes access and retains final authority over sensitive decisions.</p>
              <Link className={styles.sourceLink} href="/services/ai-implementation">See how Worktree implements a workflow <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="operating-gap-heading">
        <div className={styles.contentShell}>
          <div className={styles.operatingGap}>
            <div>
              <p className="worktree-type-eyebrow">The operating gap</p>
              <h2 id="operating-gap-heading" className="worktree-type-section-title mt-4">Software capability is only the beginning.</h2>
              <p className="worktree-type-body mt-5">Browser access, tool calling, memory, scheduling, and multi-agent coordination are increasingly available across products. A business deployment still needs someone to answer the operating questions.</p>
            </div>
            <ol className={styles.questionList}>
              {operatingQuestions.map((question, index) => (
                <li key={question}><span>{String(index + 1).padStart(2, "0")}</span>{question}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="cost-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Hidden operating costs</p>
            <h2 id="cost-heading" className="worktree-type-section-title mt-4">The subscription or license is not the full cost.</h2>
            <p className="worktree-type-body mt-5">A useful comparison includes the work required to operate the system, not only the price of the software.</p>
          </div>
          <div className={styles.costGrid}>
            {operatingCosts.map(([title, copy], index) => (
              <article className={styles.costCard} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className={styles.conclusionLine}>Open-source software can reduce license cost. A hosted product can reduce infrastructure work. Neither eliminates operating ownership. For a fuller scope, see <Link className={styles.inlineLink} href="/blog/ai-automation-cost">what determines AI automation cost</Link>.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="build-or-buy-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Internal capability vs. Worktree</p>
            <h2 id="build-or-buy-heading" className="worktree-type-section-title mt-4">Build the function or buy a managed deployment?</h2>
          </div>
          <div className={styles.buildBuyGrid}>
            <article>
              <p className={styles.approachNumber}>Build internally</p>
              <h3>Create a reusable company capability.</h3>
              <p>An internal function can be the right investment when agent systems are strategically central, several teams need a shared platform, and the company wants direct control over architecture and hiring.</p>
              <BulletList items={["You expect a sustained portfolio of agent systems.", "You already have technical and security ownership.", "You want full control and accept the required investment."]} />
            </article>
            <article className={styles.managedChoice}>
              <p className={styles.approachNumber}>Choose Worktree</p>
              <h3>Start with one managed business outcome.</h3>
              <p>Worktree begins with a bounded managed deployment. The deployment review defines the workflow, systems, permissions, evaluation requirements, operating support, and commercial scope before work begins.</p>
              <BulletList items={["You want to improve one important workflow first.", "You do not want to hire a team before proving value.", "You want evaluation and improvement included after launch."]} />
            </article>
          </div>
          <p className={styles.salaryNote}>For context, published U.S. median wages for related software development and information security roles exceed $120,000 before benefits, recruiting, infrastructure, and model usage. This is not a claim that every agent hire costs the same. Sources: <a href="https://www.bls.gov/ooh/Computer-and-Information-Technology/Software-developers.htm">software developers</a> and <a href="https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm">information security analysts</a>.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="worktree-process-heading">
        <div className={styles.contentShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">How Worktree works</p>
            <h2 id="worktree-process-heading" className="worktree-type-section-title mt-4">From one recurring process to a managed workflow.</h2>
          </div>
          <div className={styles.steps}>
            {worktreeSteps.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <p className={styles.conclusionLine}>The runtime is an implementation decision, not the customer outcome. The mapped process, control boundaries, evaluation standard, and operating history remain valuable even when the underlying technology changes. That ongoing ownership is the role of Worktree&apos;s <Link className={styles.inlineLink} href="/services/managed-ai">managed AI services</Link>.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-heading">
        <div className={styles.narrowShell}>
          <div className={styles.sectionIntro}>
            <p className="worktree-type-eyebrow">Frequently asked questions</p>
            <h2 id="faq-heading" className="worktree-type-section-title mt-4">Questions buyers should ask.</h2>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary><span>{item.question}</span><span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-heading">
        <div className={styles.narrowShell}>
          <p className="worktree-type-eyebrow">Choose the operating model</p>
          <h2 id="final-cta-heading" className="worktree-type-section-title mt-4">Decide what to operate before choosing what to deploy.</h2>
          <p className="worktree-type-lead mt-6">Bring one recurring workflow, the systems it touches, and the standard the work must meet. Worktree will help determine whether it is ready for a managed deployment.</p>
          <div className={styles.heroActions}>
            <PrimaryCta href="/deploy">Start a workflow review</PrimaryCta>
            <Link className={styles.textLink} href="/use-cases">See what makes a good first workflow</Link>
          </div>
          <p className={styles.disclaimer}>Grok Bot, Hermes Agent, and OpenClaw are trademarks or product names of their respective owners. Worktree is not affiliated with or endorsed by those projects.</p>
        </div>
      </section>
    </WorktreeShell>
  );
}
