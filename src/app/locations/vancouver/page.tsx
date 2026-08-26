import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import styles from "./vancouver.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Automation Services in Vancouver",
  description: "Worktree helps Vancouver and Lower Mainland businesses design, implement, and manage AI workflows, with in-person collaboration available by arrangement.",
  path: "/locations/vancouver",
});

const servicePaths = [
  {
    number: "01",
    label: "Find the workflow",
    title: "Improve recurring work",
    copy: "Examine the routine and decide what should be eliminated, simplified, kept human, or automated.",
    href: "/services/ai-automation",
    link: "Explore AI automation services",
  },
  {
    number: "02",
    label: "Put it into production",
    title: "Implement the workflow",
    copy: "Map the process, define the boundaries, connect selected systems, test representative cases, and coordinate launch.",
    href: "/services/ai-implementation",
    link: "Explore AI implementation services",
  },
  {
    number: "03",
    label: "Keep it useful",
    title: "Manage it after launch",
    copy: "Review relevant evidence, evaluate performance, support the team, document material changes, and make focused improvements.",
    href: "/services/managed-ai",
    link: "Explore managed AI services",
  },
] as const;

const workingSessionItems = [
  "What begins the workflow and who owns its result",
  "Which context and systems the work depends on",
  "Which steps repeat and which require judgment",
  "Where approvals, ambiguity, and exceptions belong",
  "What a useful result looks like",
  "What must be true before implementation begins",
] as const;

const faqItems = [
  [
    "Where does Worktree provide local service?",
    "Worktree provides local collaboration for businesses in Vancouver and the Lower Mainland. Worktree is operated by Orthogonal Labs Inc., a company based in British Columbia, Canada.",
  ],
  [
    "Can we meet in person?",
    "Yes. Worktree can arrange in-person workflow and implementation sessions with Vancouver and Lower Mainland teams when they are useful to the engagement. The location and format are confirmed during scheduling; Worktree does not operate a public, visitable office.",
  ],
  [
    "Does Worktree serve businesses outside Vancouver?",
    "Yes. Worktree serves established businesses across the United States and Canada. This page is for teams that specifically value Lower Mainland proximity or in-person collaboration.",
  ],
  [
    "Is this a separate local service package?",
    "No. Local clients receive the same automation, implementation, and managed-operation model. The deployment review determines the workflow, requirements, scope, and commercial proposal.",
  ],
] as const;

const localServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": new URL("/locations/vancouver#service", siteUrl).toString(),
      name: "AI automation services in Vancouver",
      serviceType: ["AI workflow automation", "AI implementation", "Managed AI workflows"],
      provider: { "@id": `${siteUrl}#organization` },
      areaServed: [
        { "@type": "City", name: "Vancouver" },
        { "@type": "AdministrativeArea", name: "Lower Mainland, British Columbia" },
      ],
      url: new URL("/locations/vancouver", siteUrl).toString(),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl.toString() },
        { "@type": "ListItem", position: 2, name: "Vancouver", item: new URL("/locations/vancouver", siteUrl).toString() },
      ],
    },
  ],
} as const;

function LocalWorkflowMap() {
  return (
    <div className={styles.workflowMap} aria-label="Illustrative local workflow review">
      <header>
        <div><span>WT</span><p><small>Local workflow review</small>Vancouver · By arrangement</p></div>
        <strong><i /> Working session</strong>
      </header>
      <div className={styles.workflowBody}>
        <div className={styles.workflowSources}>
          <article><span>01</span><p>Current process</p><em>Mapped</em></article>
          <article><span>02</span><p>Systems and context</p><em>Selected</em></article>
          <article><span>03</span><p>Human decisions</p><em>Defined</em></article>
        </div>
        <div className={styles.workflowRoute} aria-hidden="true"><span /><i /><span /></div>
        <div className={styles.workflowOutcome}>
          <span>Proposed operating path</span>
          <strong>One workflow, ready for an implementation decision.</strong>
          <div><em>Scope visible</em><em>Approval retained</em></div>
        </div>
      </div>
      <footer><span>Remote or in person</span><strong>No public office visits</strong></footer>
    </div>
  );
}

export default function VancouverPage() {
  return (
    <WorktreeShell headerOverlay>
      <StructuredData data={localServiceSchema} />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="vancouver-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>Vancouver and the Lower Mainland</Eyebrow>
              <h1 id="vancouver-heading">AI automation services for Vancouver businesses.</h1>
              <p>Worktree helps established teams turn one recurring process into a managed AI workflow. We map the real work, connect the selected systems, define where people remain in control, launch the workflow, and stay involved after it enters operation.</p>
              <p className={styles.localNote}>Workflow review and implementation collaboration can happen remotely or in person by arrangement.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Start a local deployment review</PrimaryLink>
                <SecondaryLink href="/services/ai-automation">Explore AI automation services</SecondaryLink>
              </div>
              <span className={styles.trustLine}>Operated by Orthogonal Labs Inc. · British Columbia, Canada</span>
            </div>
            <LocalWorkflowMap />
          </div>
        </section>

        <section className={styles.relationshipSection} aria-labelledby="relationship-heading">
          <div className={styles.splitSection}>
            <div>
              <Eyebrow>Nearby when the work benefits from it</Eyebrow>
              <h2 id="relationship-heading">Map the workflow with the people who know it.</h2>
            </div>
            <div className={styles.prose}>
              <p>The difference between a process diagram and the real operation often appears in conversation: the extra source someone checks, the exception handled from memory, or the handoff only one person knows how to complete.</p>
              <p>For Lower Mainland teams, working sessions can happen in person by arrangement when being in the room makes the process easier to understand. Local access does not change the offer: the same workflow analysis, implementation engineering, controls, evaluation, and ongoing support remain in place.</p>
              <Link className={styles.textLink} href="/about">About Worktree and Orthogonal Labs Inc. <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.pathsSection} aria-labelledby="paths-heading">
          <div className={styles.sectionHeader}>
            <div><Eyebrow>One relationship from opportunity to operation</Eyebrow><h2 id="paths-heading">Start with the part of the problem you already understand.</h2></div>
            <p>Worktree can enter at workflow selection, implementation, or ongoing operation without turning local delivery into a separate service package.</p>
          </div>
          <div className={styles.pathGrid}>
            {servicePaths.map((path) => (
              <article key={path.href}>
                <header><span>{path.number}</span><em>{path.label}</em></header>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <Link href={path.href}>{path.link}<span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.sessionSection} aria-labelledby="session-heading">
          <div className={styles.sessionInner}>
            <div className={styles.sessionCopy}>
              <p className={styles.darkEyebrow}>Begin with the current process</p>
              <h2 id="session-heading">Put the real workflow on the table.</h2>
              <p>Bring a recent example, the people who touched it, the systems they consulted, the decisions they made, and the result the business needed. The review turns that understanding into the next practical decision.</p>
            </div>
            <div className={styles.sessionBoard}>
              <header><span>Working-session scope</span><strong>Six questions</strong></header>
              <ol>{workingSessionItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><em>Discuss</em></li>)}</ol>
              <footer>Clarify the process · assess feasibility · define an implementation</footer>
            </div>
          </div>
        </section>

        <section className={styles.fitSection} aria-labelledby="fit-heading">
          <div className={styles.splitSection}>
            <div><Eyebrow>A focused place to start</Eyebrow><h2 id="fit-heading">Choose work important enough to improve and clear enough to evaluate.</h2></div>
            <div className={styles.prose}>
              <p>The first workflow should recur, have an owner, use identifiable information, and produce a result the team can judge. It may cross systems and include difficult exceptions; those details are useful when they can be made explicit.</p>
              <p>Useful starting shapes include preparing a customer handoff, assembling an exception review, keeping an operating follow-up moving, or preparing a recurring brief.</p>
              <Link className={styles.textLink} href="/use-cases">Explore illustrative workflow use cases <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.trustSection} aria-labelledby="trust-heading">
          <div className={styles.trustInner}>
            <div><Eyebrow>A British Columbia company</Eyebrow><h2 id="trust-heading">Know who is responsible for the engagement.</h2></div>
            <div>
              <p>Worktree is operated by Orthogonal Labs Inc., based in British Columbia, Canada. Worktree’s public policies explain how deployment inquiries and customer workflow data are handled.</p>
              <nav aria-label="Company and data information">
                <Link href="/about">About</Link><Link href="/product/security">Security</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/data-use">Data use</Link>
              </nav>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.faqInner}>
            <div><Eyebrow>Working with Worktree locally</Eyebrow><h2 id="faq-heading">Common Vancouver questions.</h2></div>
            <div className={styles.faqList}>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="local-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Start locally with one workflow</Eyebrow>
            <h2 id="local-contact-heading">Bring us the recurring work that deserves a better operating path.</h2>
            <p>Share how the process runs today, who owns it, the systems involved, a recent example, and the change you want. A Worktree engineer will help clarify the workflow, implementation requirements, controls, scope, and next step.</p>
            <div className={styles.heroActions}><PrimaryLink href="/deploy">Start a local deployment review</PrimaryLink><SecondaryLink href="/services/ai-implementation">Explore AI implementation services</SecondaryLink></div>
          </div>
        </section>
      </div>
    </WorktreeShell>
  );
}
