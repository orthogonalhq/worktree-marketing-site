import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { HomepageWorkflowGallery } from "@/components/homepage-workflow-gallery";
import { InfrastructureFocusCards } from "@/components/infrastructure-focus-cards";
import { WorktreeShell } from "@/components/site-shell";
import { StripeWaveHero } from "@/components/stripe-wave-hero";
import { getPublishedArticles } from "@/lib/blog/content";
import { createPageMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Implementation Partner for Managed Workflows",
  description: "Worktree works alongside established US and Canadian businesses to implement and manage AI workflows with clear controls and ongoing engineering support.",
  path: "/",
  absoluteTitle: true,
});

const infrastructureProof = [
  ["01", "Defined boundaries", "The systems an agent can use, the actions it can take, and the decisions that stay with a person are designed with the workflow."],
  ["02", "Tested behaviour", "Representative cases give the team a concrete standard for useful work before launch and after meaningful changes."],
  ["03", "Reviewable evidence", "Runs, sources, decisions, outputs, and exceptions give the team something inspectable when the work needs attention."],
  ["04", "Managed after launch", "A Worktree engineer remains involved to review performance, improve the workflow, and adapt it as the operation changes."],
] as const;

function formatArticleDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

type HomePageProps = {
  searchParams: Promise<{
    prototype?: string | string[];
    scene?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const usePrismPrototype = resolvedSearchParams?.prototype === "prism";
  const requestedScene = resolvedSearchParams?.scene;
  const prismSceneVersion = requestedScene === "v1" || requestedScene === "v2" ? requestedScene : "glasswake-lung";
  const latestArticle = getPublishedArticles()[0];

  if (usePrismPrototype) {
    redirect(`/prism-wave-prototype?scene=${prismSceneVersion}`);
  }

  return (
    <WorktreeShell className={styles.homeShell}>
      <section className={`hero-section ${styles.hero} relative px-4 pt-8 sm:px-6 lg:px-10`}>
        <StripeWaveHero />
        <div aria-hidden="true" className="hero-bottom-light" />
        <div className={`${styles.heroGrid} mx-auto grid max-w-[92rem] gap-12 pt-10 lg:items-center lg:pt-20`}>
          <div className="hero-copy-column">
            <Eyebrow>AI implementation partner</Eyebrow>
            <h1 className={`${styles.heroTitle} worktree-type-display hero-title mt-6 max-w-5xl`}>
              Put AI workflows into operation. With engineers who stay involved.
            </h1>
            <p className="worktree-type-lead hero-body mt-7 max-w-2xl">
              Worktree works alongside established teams to identify valuable workflows, connect the systems involved, and define approvals and operating boundaries. We launch them together, then monitor, evaluate, and improve their performance as the business grows.
            </p>
            <div className="hero-actions home-hero-actions mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
              <SecondaryLink href="/product">See how Worktree works</SecondaryLink>
            </div>
          </div>
        </div>
      </section>

      <HomepageWorkflowGallery />

      <section id="what-worktree-builds" className={styles.infrastructureSection} aria-labelledby="infrastructure-heading">
        <div className={styles.infrastructureInner}>
          <header className={styles.infrastructureIntro}>
            <div>
              <Eyebrow>Infrastructure for the work</Eyebrow>
              <h2 id="infrastructure-heading" className="worktree-type-section-title mt-4">A useful agent needs more than a good first answer.</h2>
            </div>
            <div>
              <p className="worktree-type-body">Worktree brings the workflow, access boundaries, evaluation, operating evidence, and ongoing engineering together. The result is a system your team can put into operation and continue improving.</p>
              <div className={styles.infrastructureAction}>
                <SecondaryLink href="/product">Explore the Worktree Product</SecondaryLink>
              </div>
            </div>
          </header>

          <div className={styles.infrastructureBody}>
            <InfrastructureFocusCards items={infrastructureProof} />
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} aria-labelledby="worktree-services-heading">
        <div className={styles.servicesInner}>
          <div className={styles.servicesLayout}>
            <article className={styles.consultationCard}>
              <div className={styles.consultationCopy}>
                <p className="worktree-type-eyebrow">Free workflow consultation</p>
                <h2 id="worktree-services-heading" className="worktree-type-section-title">Where could an agent give your team more capacity?</h2>
                <p className="worktree-type-body">Bring us a recurring process, overloaded handoff, or piece of work that still depends on one person. We&apos;ll help determine whether an agent belongs there and what a responsible path forward would require.</p>
              </div>
              <div className={styles.consultationAction}>
                <PrimaryLink href="/deploy">Book a free consultation</PrimaryLink>
                <span className="worktree-type-meta">30 minutes · No preparation required</span>
              </div>
            </article>

            <div className={styles.productColumnGroup}>
              <nav className={styles.productColumn} aria-label="Explore the Worktree product">
                <Link className={styles.productCard} href="/product">
                  <div>
                    <h3 className="worktree-type-card-title">The Worktree product</h3>
                    <p className="worktree-type-card-body">See how agents, controls, and operating evidence fit together.</p>
                  </div>
                  <span className={styles.productCardArrow} aria-hidden="true">→</span>
                </Link>
                <Link className={styles.productCard} href="/product/agents">
                  <div>
                    <h3 className="worktree-type-card-title">Worktree Agents</h3>
                    <p className="worktree-type-card-body">A durable agent configured for one defined business role.</p>
                  </div>
                  <span className={styles.productCardArrow} aria-hidden="true">→</span>
                </Link>
                <Link className={styles.productCard} href="/product/security">
                  <div>
                    <h3 className="worktree-type-card-title">Product Security</h3>
                    <p className="worktree-type-card-body">Access boundaries, human review, data handling, and removal.</p>
                  </div>
                  <span className={styles.productCardArrow} aria-hidden="true">→</span>
                </Link>
              </nav>
              <Link className={styles.comparisonLink} href="/product/compare-ai-agent-approaches">
                <span>Compare AI agent approaches</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className={`${styles.servicesLayout} ${styles.servicesLayoutReversed}`}>
            <article className={`${styles.consultationCard} ${styles.serviceFeatureCard}`}>
              <div className={styles.consultationCopy}>
                <p className="worktree-type-eyebrow">AI implementation services</p>
                <h2 className="worktree-type-section-title">Put one valuable AI workflow into operation.</h2>
                <p className="worktree-type-body">Work alongside an engineer to map the work, connect the systems involved, define approvals and operating boundaries, test the workflow, and launch it with a clear owner.</p>
              </div>
              <div className={styles.consultationAction}>
                <PrimaryLink href="/services/ai-implementation">Explore AI implementation</PrimaryLink>
                <span className="worktree-type-meta">From workflow selection through launch</span>
              </div>
            </article>

            <nav className={`${styles.productColumn} ${styles.serviceColumn}`} aria-label="Explore Worktree services and use cases">
              <Link className={styles.productCard} href="/services/ai-automation">
                <div>
                  <h3 className="worktree-type-card-title">AI Automation Services</h3>
                  <p className="worktree-type-card-body">Turn recurring work into a workflow that keeps moving.</p>
                </div>
                <span className={styles.productCardArrow} aria-hidden="true">→</span>
              </Link>
              <Link className={styles.productCard} href="/services/managed-ai">
                <div>
                  <h3 className="worktree-type-card-title">Managed AI Services</h3>
                  <p className="worktree-type-card-body">Keep the workflow useful as the work and systems change.</p>
                </div>
                <span className={styles.productCardArrow} aria-hidden="true">→</span>
              </Link>
              <Link className={styles.productCard} href="/use-cases">
                <div>
                  <h3 className="worktree-type-card-title">AI Workflow Use Cases</h3>
                  <p className="worktree-type-card-body">Find recurring work that could support a useful first deployment.</p>
                </div>
                <span className={styles.productCardArrow} aria-hidden="true">→</span>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      {latestArticle ? (
        <section className={styles.insightSection} aria-labelledby="latest-insight-heading">
          <div className={styles.insightInner}>
            <div className={styles.insightLead}>
              <p className={styles.insightKicker}>Latest from Worktree</p>
              <p className="worktree-type-editorial-body">Field notes on redesigning work, choosing useful boundaries, and keeping agent systems operating after launch.</p>
            </div>
            <article className={styles.insightFeature}>
              <div className={styles.insightMeta}>
                <span>{latestArticle.topic ?? "Worktree field note"}</span>
                <time dateTime={latestArticle.publishedAt}>{formatArticleDate(latestArticle.publishedAt)}</time>
              </div>
              <h2 id="latest-insight-heading" className="worktree-type-editorial-title">{latestArticle.title}</h2>
              <p className="worktree-type-editorial-body">{latestArticle.summary}</p>
              <div className={styles.insightAction}>
                <Link className={styles.insightTextLink} href={`/blog/${latestArticle.slug}`}>Read the latest note <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className={styles.finalCta} aria-labelledby="contact-heading">
        <div className={styles.finalCtaInner}>
          <Eyebrow>Start with the work</Eyebrow>
          <h2 id="contact-heading" className="worktree-type-section-title mt-4">Where does your team need more capacity?</h2>
          <p className="worktree-type-body mt-6">Bring a recurring process, an overloaded handoff, or work that still depends on the same person. A Worktree engineer will help you decide whether an agent belongs there and what it would take to put one into operation.</p>
          <div className={styles.finalActions}>
            <PrimaryLink href="/deploy">Talk to a Worktree engineer</PrimaryLink>
            <SecondaryLink href="/product">See how Worktree works</SecondaryLink>
          </div>
          <Link className={styles.localServiceLink} href="/locations/vancouver">
            Vancouver and Lower Mainland AI services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </WorktreeShell>
  );
}
