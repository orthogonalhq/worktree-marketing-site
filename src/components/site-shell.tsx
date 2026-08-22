import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DesktopSiteNavigation } from "@/components/desktop-site-navigation";
import { Logomark } from "@/components/logomark";
import { MobileSiteMenu } from "@/components/mobile-site-menu";
import {
  blogNavigationLink,
  companyNavigationLinks,
  comparisonNavigationLink,
  primaryNavigationLinks,
  productNavigationLinks,
} from "@/components/site-navigation-data";
import { FooterThemeToggle } from "@/components/theme-toggle";

const footerColumns = [
  {
    label: "Product",
    links: [...productNavigationLinks, comparisonNavigationLink],
  },
  {
    label: "Explore",
    links: [
      { href: "/", label: "Home" },
      primaryNavigationLinks[0],
      primaryNavigationLinks[1],
      blogNavigationLink,
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
    links: companyNavigationLinks,
  },
];

const footerBottomLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/data-use", label: "Data use" },
  { href: "/legal/terms", label: "Terms" },
];

export function WorktreeShell({
  children,
  theme = "dark",
  headerOverlay = false,
}: {
  children: ReactNode;
  theme?: "dark" | "light";
  headerOverlay?: boolean;
}) {
  return (
    <div
      className="nous-design-system nous-marketing-shell worktree-shell"
      data-header-overlay={headerOverlay ? "true" : undefined}
      data-nous-theme={theme}
    >
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

export function SiteHeader({
  theme,
  action,
}: {
  theme: "dark" | "light";
  action?: ReactNode;
}) {
  return (
    <header className="worktree-site-header">
      <FamilyBrandLockup theme={theme} />
      <DesktopSiteNavigation />
      {action === undefined ? (
        <span className="nue-prism-cta nue-prism-cta-secondary worktree-header-cta">
          <span aria-hidden="true" className="nue-prism-cta-shadow" />
          <Link className="nue-prism-cta-button" href="/deploy">
            <span>
              Start a review
              <ArrowRight aria-hidden="true" className="nue-prism-cta-arrow" strokeWidth={1.7} />
            </span>
          </Link>
          <PrismLayers />
        </span>
      ) : action}
      <MobileSiteMenu theme={theme} />
    </header>
  );
}

function FamilyBrandLockup({ theme }: { theme: "dark" | "light" }) {
  return (
    <Link className="worktree-family-brand" href="/" aria-label="Worktree, a product of Orthogonal, home">
      <span aria-hidden="true" className="worktree-parent-mark">O°</span>
      <span aria-hidden="true" className="worktree-family-divider">/</span>
      <span aria-hidden="true" className="worktree-family-product">
        <Logomark initialTheme={theme} />
        <span>Worktree</span>
      </span>
    </Link>
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
