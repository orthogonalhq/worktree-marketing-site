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
  serviceNavigationLinks,
} from "@/components/site-navigation-data";
import { FooterThemeToggle } from "@/components/theme-toggle";

const footerColumns = [
  {
    label: "Services",
    links: serviceNavigationLinks.map((link) => ({
      ...link,
      label: `${link.label} services`,
    })),
  },
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
    links: [
      ...companyNavigationLinks,
      { href: "/locations/vancouver", label: "Vancouver", description: "Local service across Vancouver and the Lower Mainland." },
    ],
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
  className,
}: {
  children: ReactNode;
  theme?: "dark" | "light";
  headerOverlay?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`nous-design-system nous-marketing-shell worktree-shell${className ? ` ${className}` : ""}`}
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
          <Link className="worktree-footer-ai-link" href="/llm-info">
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="M3.53519 7.67315L5.42158 6.73005C5.98761 6.44701 6.44658 5.98804 6.72961 5.42202L7.67317 3.5354C7.70353 3.47468 7.75021 3.42361 7.80797 3.38791C7.86572 3.35222 7.93228 3.33331 8.00018 3.33331C8.06807 3.33331 8.13463 3.35222 8.19239 3.38791C8.25014 3.42361 8.29682 3.47468 8.32719 3.5354L9.27041 5.42168C9.55344 5.9877 10.0124 6.44667 10.5784 6.72971L12.4645 7.67315C12.5252 7.7035 12.5763 7.75017 12.612 7.80792C12.6478 7.86568 12.6667 7.93224 12.6667 8.00015C12.6667 8.06805 12.6478 8.13461 12.612 8.19237C12.5763 8.25012 12.5252 8.29679 12.4645 8.32714L10.5781 9.27031C10.0121 9.55331 9.55309 10.0123 9.27008 10.5783L8.32685 12.4646C8.29649 12.5253 8.24981 12.5764 8.19205 12.612C8.1343 12.6477 8.06774 12.6666 7.99984 12.6666C7.93195 12.6666 7.86539 12.6477 7.80763 12.612C7.74988 12.5764 7.7032 12.5253 7.67283 12.4646L6.72961 10.5783C6.4466 10.0123 5.98762 9.55331 5.42158 9.27031L3.53519 8.3268C3.47453 8.29642 3.42352 8.24976 3.38787 8.19204C3.35222 8.13432 3.33334 8.06782 3.33334 7.99998C3.33334 7.93214 3.35222 7.86564 3.38787 7.80792C3.42352 7.7502 3.47453 7.70353 3.53519 7.67315Z" />
            </svg>
            <span>Hey AI, learn about us</span>
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
