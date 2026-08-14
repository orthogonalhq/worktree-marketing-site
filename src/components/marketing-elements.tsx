import type { ReactNode } from "react";

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

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">{children}</p>;
}

export function PrismLink({ children, href, variant = "primary" }: { children: ReactNode; href: string; variant?: "primary" | "secondary" }) {
  return (
    <span className={variant === "secondary" ? "nue-prism-cta nue-prism-cta-secondary" : "nue-prism-cta nue-prism-cta-primary"}>
      <span aria-hidden="true" className="nue-prism-cta-shadow" />
      <a className="nue-prism-cta-button" href={href}>
        <span>
          {children}
          <span aria-hidden="true" className="nue-prism-cta-arrow">-&gt;</span>
        </span>
      </a>
      <PrismLayers />
    </span>
  );
}

export function PrimaryLink({ children, href }: { children: ReactNode; href: string }) {
  return <PrismLink href={href}>{children}</PrismLink>;
}

export function SecondaryLink({ children, href }: { children: ReactNode; href: string }) {
  return <PrismLink href={href} variant="secondary">{children}</PrismLink>;
}

export function SectionIntro({ copy, eyebrow, id, title }: { copy: string; eyebrow: string; id?: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="worktree-type-section-title mt-4">{title}</h2>
      <p className="worktree-type-body mt-5">{copy}</p>
    </div>
  );
}

export function NumberedList({ items }: { items: ReadonlyArray<readonly [string, string, string]> }) {
  return (
    <div className="managed-quality-list">
      {items.map(([number, title, copy]) => (
        <article className="managed-quality-row" key={number}>
          <span className="managed-quality-index"><span>[</span><strong>{number}</strong><span>]</span></span>
          <div className="managed-quality-row-body">
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function FinalCta({ eyebrow, title, secondary }: { eyebrow: string; title: string; secondary?: { href: string; label: string } }) {
  return (
    <section id="contact" className="final-cta-section" aria-labelledby="contact-heading">
      <div className="final-cta-inner mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="contact-heading" className="worktree-type-section-title mt-4">{title}</h2>
        <div className="final-cta-actions">
          <PrimaryLink href="/deploy">Start a deployment review</PrimaryLink>
          {secondary ? <SecondaryLink href={secondary.href}>{secondary.label}</SecondaryLink> : null}
        </div>
      </div>
    </section>
  );
}
