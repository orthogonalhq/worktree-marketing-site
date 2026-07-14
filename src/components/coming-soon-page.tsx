import Link from "next/link";
import { WorktreeShell } from "@/components/site-shell";

export function ComingSoonPage({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <WorktreeShell>
      <section className="coming-soon-section" aria-labelledby="coming-soon-heading">
        <div className="coming-soon-inner mx-auto max-w-7xl">
          <p className="hero-eyebrow text-[var(--nous-page-preheader-fg)]">{eyebrow}</p>
          <h1 id="coming-soon-heading">{title}</h1>
          <p>{copy}</p>
          <div className="coming-soon-actions">
            <Link href="/deploy">Start a deployment review</Link>
            <Link href="/">Back to homepage</Link>
          </div>
        </div>
      </section>
    </WorktreeShell>
  );
}
