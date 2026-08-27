import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fingerprint } from "lucide-react";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/marketing-elements";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import styles from "./security.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "AI Agent Security and Access Controls",
  description: "See how Worktree defines agent access, authority, approvals, data handling, operating evidence, and removal around a specific business workflow.",
  path: "/product/security",
});

const boundaryQuestions = [
  ["01", "What starts the work?", "The approved request, event, or schedule that opens the workflow."],
  ["02", "What can the agent see?", "The systems and information required for the assigned job."],
  ["03", "What can it change?", "The read, prepare, update, or submit actions included in scope."],
  ["04", "What needs approval?", "The decisions and consequential actions reserved for an authorized person."],
  ["05", "What happens when it is unsure?", "The exception path that stops improvisation and routes the case."],
  ["06", "How is access removed?", "The credential, connection, and retained-data steps at the end of access."],
] as const;

const controlLayers = [
  {
    number: "01",
    title: "Access boundary",
    copy: "The workflow identifies the applications, records, documents, and communication surfaces the agent needs. Connection to one system does not make every part of that system relevant to the role.",
    status: "Systems scoped",
  },
  {
    number: "02",
    title: "Credential boundary",
    copy: "Credentials and delegated connections are configured for the agreed workflow. Their ownership, use, and removal should be understandable before production access is granted.",
    status: "Access defined",
  },
  {
    number: "03",
    title: "Authority boundary",
    copy: "The deployment separates what the agent may read, prepare, update, or submit from the actions that require another person to authorize them.",
    status: "Actions classified",
  },
  {
    number: "04",
    title: "Review boundary",
    copy: "Known approval points and exception paths keep consequential decisions with the people who own the business policy and outcome.",
    status: "Human included",
  },
  {
    number: "05",
    title: "Removal boundary",
    copy: "Delegated access can be disconnected. Retained customer data is deleted following a verified deletion request under Worktree's stated data-handling policy.",
    status: "Removal available",
  },
] as const;

const evidenceRows = [
  ["Request", "A known workflow trigger and initiating identity."],
  ["Context", "Relevant sources used by the workflow."],
  ["Decision", "Approval or exception ownership where applicable."],
  ["Action", "The material operation prepared or completed."],
  ["Change", "A recorded update to the workflow or its controls."],
] as const;

function DeepLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={styles.deepLink} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function AuthorityManifest() {
  return (
    <div className={styles.authorityManifest} aria-label="Illustrative workflow authority manifest">
      <header>
        <div><span>WT</span><p><small>Illustrative control manifest</small>Customer review workflow</p></div>
        <strong><i /> Boundary current</strong>
      </header>
      <div className={styles.manifestScope}>
        <p>Workflow authority</p>
        <dl>
          <div><dt>Read</dt><dd>Customer record · Project status · Approved notes</dd></div>
          <div><dt>Prepare</dt><dd>Review brief · Follow-up · Decision packet</dd></div>
          <div><dt>Change</dt><dd>Project status after acceptance</dd></div>
        </dl>
      </div>
      <div className={styles.approvalGate}>
        <span><Fingerprint strokeWidth={1.5} /></span>
        <div><small>Approval gate</small><strong>Commercial exception requires an authorized person.</strong></div>
        <em>Waiting</em>
      </div>
      <footer><span>Credential removable</span><span>Exception routed</span><span>Material action recorded</span></footer>
    </div>
  );
}

export default function ProductSecurityPage() {
  return (
    <WorktreeShell>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="security-heading">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <Eyebrow>Product security</Eyebrow>
              <h1 id="security-heading">Define the agent&apos;s access and authority.</h1>
              <p>Useful agents need access to real business systems. Worktree designs that access around a specific workflow: its required context, permitted actions, approval points, exception paths, operating evidence, and removal.</p>
              <div className={styles.heroActions}>
                <PrimaryLink href="/deploy">Review a deployment</PrimaryLink>
                <SecondaryLink href="#boundaries">Explore the boundaries</SecondaryLink>
              </div>
            </div>
            <AuthorityManifest />
          </div>
        </section>

        <section id="boundaries" className={styles.questionsSection} aria-labelledby="questions-heading">
          <div className={styles.questionsInner}>
            <div className={styles.questionsIntro}>
              <p className={styles.darkEyebrow}>Security begins with the job</p>
              <h2 id="questions-heading">A secure deployment should answer six plain questions.</h2>
              <p>The control model follows the work. Before a workflow receives access, the team should be able to explain its purpose, scope, authority, review path, and end state without relying on vague claims about the agent.</p>
            </div>
            <ol className={styles.questionGrid}>
              {boundaryQuestions.map(([number, title, copy]) => (
                <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.layersSection} aria-labelledby="layers-heading">
          <div className={styles.sectionInner}>
            <div className={styles.splitIntro}>
              <div><Eyebrow>Five control boundaries</Eyebrow><h2 id="layers-heading">Control is a set of explicit decisions.</h2></div>
              <div><p>Security is not one toggle around the model. The workflow combines access, credentials, authority, human review, and removal into a control design that can be discussed before launch and revisited when the work changes.</p></div>
            </div>
            <ol className={styles.layerList}>
              {controlLayers.map((layer) => (
                <li key={layer.number}>
                  <span>{layer.number}</span>
                  <div><h3>{layer.title}</h3><p>{layer.copy}</p></div>
                  <em>{layer.status}</em>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.executionSection} aria-labelledby="execution-heading">
          <div className={styles.executionInner}>
            <div className={styles.executionCopy}>
              <p className={styles.darkEyebrow}>Sensitive context</p>
              <h2 id="execution-heading">Access can be scoped to one authorized execution.</h2>
              <p>When this control is appropriate to the deployment, sensitive context can be made available for a single authorized agent execution rather than left broadly available to the workflow. The exact design depends on the system, data, and action involved.</p>
            </div>
            <div className={styles.executionDiagram} aria-label="Illustrative single authorized execution">
              <div className={styles.executionNode}><span>01</span><strong>Authorized person</strong><em>Request verified</em></div>
              <div className={styles.executionCore}><Fingerprint strokeWidth={1.3} /><span>Client cell</span><strong>Single agent execution</strong><em>Authorized</em></div>
              <div className={styles.executionNode}><span>02</span><strong>Scoped context</strong><em>Available to this run</em></div>
              <div className={styles.executionNode}><span>03</span><strong>Execution ends</strong><em>Context no longer active</em></div>
            </div>
          </div>
        </section>

        <section className={styles.evidenceSection} aria-labelledby="evidence-heading">
          <div className={styles.evidenceInner}>
            <div className={styles.evidenceCopy}>
              <Eyebrow>Review and recovery</Eyebrow>
              <h2 id="evidence-heading">The operating picture should remain understandable.</h2>
              <p>Relevant evidence makes it possible to review an accepted result, trace an exception, discuss a material change, and decide what needs attention next. The exact evidence retained is defined with the deployment rather than implied as universal surveillance.</p>
              <DeepLink href="/services/managed-ai">See how Worktree manages a launched workflow</DeepLink>
            </div>
            <div className={styles.evidencePanel} aria-label="Illustrative operating evidence ledger">
              <header><span>Deployment record</span><strong><i /> Evidence current</strong></header>
              <dl>{evidenceRows.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd><em>Recorded</em></div>)}</dl>
              <footer><span>Known limitation</span><strong>Unstructured attachments still require human review.</strong></footer>
            </div>
          </div>
        </section>

        <section className={styles.dataSection} aria-labelledby="data-heading">
          <div className={styles.dataInner}>
            <div className={styles.dataHeader}>
              <Eyebrow>Data handling</Eyebrow>
              <h2 id="data-heading">The public posture, stated directly.</h2>
            </div>
            <div className={styles.dataGrid}>
              <article>
                <span>01</span>
                <h3>Website and deployment inquiries</h3>
                <p>Deployment inquiries submitted through this site are stored in Supabase. Worktree does not train models on prospect or customer data.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Customer workflows</h3>
                <p>Customer workflow data may be processed with OpenAI when that processing is part of the customer workflow. The relevant systems and handling should be discussed for the proposed deployment.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Retention and deletion</h3>
                <p>Information is retained indefinitely by default and deleted following every verified deletion request. Delegated workflow access can also be disconnected.</p>
              </article>
              <article className={styles.claimBoundary}>
                <span>04</span>
                <h3>Claims and evaluation</h3>
                <p>Worktree does not claim certifications, compliance programs, or security guarantees that are not documented here. A deployment review examines the actual workflow, systems, data, and authority involved.</p>
              </article>
            </div>
            <div className={styles.legalLinks}>
              <DeepLink href="/legal/privacy">Read the privacy policy</DeepLink>
              <DeepLink href="/legal/data-use">Read the data-use policy</DeepLink>
            </div>
          </div>
        </section>

        <section className={styles.deliverySection} aria-labelledby="security-delivery-heading">
          <div className={styles.deliveryInner}>
            <div><Eyebrow>Controls in practice</Eyebrow><h2 id="security-delivery-heading">Security is designed during implementation and revisited in operation.</h2></div>
            <div className={styles.deliveryLinks}>
              <article><span>Build the boundaries</span><p>Map systems, actions, approvals, test cases, and acceptance criteria before launch.</p><DeepLink href="/services/ai-implementation">Explore AI implementation</DeepLink></article>
              <article><span>Keep them current</span><p>Review exceptions and material change against the agreed deployment standard.</p><DeepLink href="/services/managed-ai">Explore managed AI</DeepLink></article>
              <article><span>Review before launch</span><p>Check the workflow&apos;s purpose, owner, data, tools, authority, approvals, evidence, change process, and removal path.</p><DeepLink href="/blog/ai-agent-governance-checklist">Review the AI agent governance checklist</DeepLink></article>
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="security-contact-heading">
          <div className={styles.finalCtaInner}>
            <Eyebrow>Security review</Eyebrow>
            <h2 id="security-contact-heading">Bring the workflow and the systems it needs to touch.</h2>
            <p>Worktree can help identify the access, authority, approval, data-handling, and removal questions the deployment must resolve. For a security question or verified deletion request, contact <a href="mailto:hello@orthg.nl?subject=Security%20question">hello@orthg.nl</a>.</p>
            <div className={styles.heroActions}>
              <PrimaryLink href="/deploy">Review a deployment</PrimaryLink>
              <SecondaryLink href="/product">Return to Product</SecondaryLink>
            </div>
            <small>Last updated August 21, 2026.</small>
          </div>
        </section>
      </div>
    </WorktreeShell>
  );
}
