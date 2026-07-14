import type { ReactNode } from "react";
import Link from "next/link";
import { Logomark } from "@/components/logomark";
import { MobileSiteMenu } from "@/components/mobile-site-menu";
import { FooterThemeToggle } from "@/components/theme-toggle";

const footerColumns = [
  {
    label: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/use-cases", label: "Use cases" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    label: "Deploy",
    links: [
      { href: "/deploy", label: "Start a review" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "mailto:hello@orthg.nl", label: "Contact" },
      { href: "/security", label: "Security" },
    ],
  },
];

const footerBottomLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/data-use", label: "Data use" },
  { href: "/legal/terms", label: "Terms" },
];

export function WorktreeShell({ children, theme = "dark" }: { children: ReactNode; theme?: "dark" | "light" }) {
  return (
    <div className="nous-design-system nous-marketing-shell worktree-shell" data-nous-theme={theme}>
      <div aria-hidden="true" className="worktree-bg-root" data-bg-layer="page-background-root">
        <div className="worktree-bg-grain" data-bg-layer="page-grain-texture" />
        <div className="worktree-bg-vignette" data-bg-layer="page-edge-vignette" />
      </div>
      <SiteHeader theme={theme} />
      <div className="worktree-shell-content relative">
        <main>{children}</main>
        <SiteFooter theme={theme} />
      </div>
    </div>
  );
}

function SiteHeader({ theme }: { theme: "dark" | "light" }) {
  return (
    <header className="worktree-site-header">
      <Link className="worktree-brand" href="/" aria-label="Worktree home">
        <Logomark initialTheme={theme} />
        <span>Worktree</span>
      </Link>
      <nav className="worktree-nav" aria-label="Main navigation">
        <Link className="nav-link" href="/use-cases">Use cases</Link>
        <Link className="nav-link" href="/how-it-works">How it works</Link>
        <Link className="nav-link" href="/security">Security</Link>
      </nav>
      <span className="nue-prism-cta nue-prism-cta-secondary worktree-header-cta">
        <span aria-hidden="true" className="nue-prism-cta-shadow" />
        <Link className="nue-prism-cta-button" href="/deploy">
          <span>
            Start a review
            <span aria-hidden="true" className="nue-prism-cta-arrow">-&gt;</span>
          </span>
        </Link>
        <PrismLayers />
      </span>
      <MobileSiteMenu theme={theme} />
    </header>
  );
}

function SiteFooter({ theme }: { theme: "dark" | "light" }) {
  return (
    <footer className="worktree-site-footer">
      <div className="worktree-footer-main">
        <div className="worktree-footer-brand">
          <Link className="worktree-brand" href="/" aria-label="Worktree home">
            <Logomark initialTheme={theme} />
            <span>Worktree</span>
          </Link>
        </div>
        <nav className="worktree-footer-nav" aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <section className="worktree-footer-column" key={column.label}>
              <h2>{column.label}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? <Link href={link.href}>{link.label}</Link> : <a href={link.href}>{link.label}</a>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
      <div className="worktree-footer-bottom">
        <div className="worktree-footer-legal">
          <span>© 2026 Worktree</span>
          {footerBottomLinks.map((link) => (
            <Link href={link.href} key={link.label}>{link.label}</Link>
          ))}
        </div>
        <FooterThemeToggle />
      </div>
    </footer>
  );
}

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
