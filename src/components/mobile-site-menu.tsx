"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  companyNavigationLinks,
  comparisonNavigationLink,
  primaryNavigationLinks,
  productNavigationLinks,
} from "@/components/site-navigation-data";

type MobileMenuSectionId = "product" | "explore" | "company";

const mobileMenuSections = [
  {
    id: "product",
    label: "Product",
    links: [...productNavigationLinks, comparisonNavigationLink],
  },
  {
    id: "explore",
    label: "Explore",
    links: [
      { href: "/", label: "Home", description: "Managed AI agent operations for recurring business work." },
      primaryNavigationLinks[0],
      primaryNavigationLinks[1],
    ],
  },
  {
    id: "company",
    label: "Company",
    links: companyNavigationLinks,
  },
] satisfies ReadonlyArray<{
  id: MobileMenuSectionId;
  label: string;
  links: ReadonlyArray<{ href: string; label: string; description: string }>;
}>;

export function MobileSiteMenu({ theme }: { theme: "dark" | "light" }) {
  const pathname = usePathname();

  return <MobileSiteMenuState key={pathname} theme={theme} />;
}

function MobileSiteMenuState({ theme }: { theme: "dark" | "light" }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const closeForDesktop = () => {
      if (mediaQuery.matches) setIsOpen(false);
    };

    closeForDesktop();
    mediaQuery.addEventListener("change", closeForDesktop);

    return () => mediaQuery.removeEventListener("change", closeForDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="mobile-site-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="worktree-mobile-menu-trigger"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <MobileMenuToggleIcon open={isOpen} />
      </button>
      <MobileMenu isOpen={isOpen} onNavigate={() => setIsOpen(false)} theme={theme} />
    </>
  );
}

function MobileMenuToggleIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="worktree-mobile-menu-trigger-icon" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M9.35719 3H14.6428C15.7266 2.99999 16.6007 2.99998 17.3086 3.05782C18.0375 3.11737 18.6777 3.24318 19.27 3.54497C20.2108 4.02433 20.9757 4.78924 21.455 5.73005C21.7568 6.32234 21.8826 6.96253 21.9422 7.69138C22 8.39925 22 9.27339 22 10.3572V13.6428C22 14.7266 22 15.6008 21.9422 16.3086C21.8826 17.0375 21.7568 17.6777 21.455 18.27C20.9757 19.2108 20.2108 19.9757 19.27 20.455C18.6777 20.7568 18.0375 20.8826 17.3086 20.9422C16.6008 21 15.7266 21 14.6428 21H9.35717C8.27339 21 7.39925 21 6.69138 20.9422C5.96253 20.8826 5.32234 20.7568 4.73005 20.455C3.78924 19.9757 3.02433 19.2108 2.54497 18.27C2.24318 17.6777 2.11737 17.0375 2.05782 16.3086C1.99998 15.6007 1.99999 14.7266 2 13.6428V10.3572C1.99999 9.27341 1.99998 8.39926 2.05782 7.69138C2.11737 6.96253 2.24318 6.32234 2.54497 5.73005C3.02433 4.78924 3.78924 4.02433 4.73005 3.54497C5.32234 3.24318 5.96253 3.11737 6.69138 3.05782C7.39926 2.99998 8.27341 2.99999 9.35719 3ZM6.85424 5.05118C6.24907 5.10062 5.90138 5.19279 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4.19279 6.90138 4.10062 7.24907 4.05118 7.85424C4.00078 8.47108 4 9.26339 4 10.4V13.6C4 14.7366 4.00078 15.5289 4.05118 16.1458C4.10062 16.7509 4.19279 17.0986 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C5.90138 18.8072 6.24907 18.8994 6.85424 18.9488C7.17922 18.9754 7.55292 18.9882 8 18.9943V5.0057C7.55292 5.01184 7.17922 5.02462 6.85424 5.05118ZM10 5V19H14.6C15.7366 19 16.5289 18.9992 17.1458 18.9488C17.7509 18.8994 18.0986 18.8072 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C19.8072 17.0986 19.8994 16.7509 19.9488 16.1458C19.9992 15.5289 20 14.7366 20 13.6V10.4C20 9.26339 19.9992 8.47108 19.9488 7.85424C19.8994 7.24907 19.8072 6.90138 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C18.0986 5.19279 17.7509 5.10062 17.1458 5.05118C16.5289 5.00078 15.7366 5 14.6 5H10Z"
        fill="currentColor"
        fillRule="evenodd"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path
        clipRule="evenodd"
        d="M9.35719 3H14.6428C15.7266 2.99999 16.6007 2.99998 17.3086 3.05782C18.0375 3.11737 18.6777 3.24318 19.27 3.54497C20.2108 4.02433 20.9757 4.78924 21.455 5.73005C21.7568 6.32234 21.8826 6.96253 21.9422 7.69138C22 8.39925 22 9.27339 22 10.3572V13.6428C22 14.7266 22 15.6008 21.9422 16.3086C21.8826 17.0375 21.7568 17.6777 21.455 18.27C20.9757 19.2108 20.2108 19.9757 19.27 20.455C18.6777 20.7568 18.0375 20.8826 17.3086 20.9422C16.6008 21 15.7266 21 14.6428 21H9.35717C8.27339 21 7.39925 21 6.69138 20.9422C5.96253 20.8826 5.32234 20.7568 4.73005 20.455C3.78924 19.9757 3.02433 19.2108 2.54497 18.27C2.24318 17.6777 2.11737 17.0375 2.05782 16.3086C1.99998 15.6007 1.99999 14.7266 2 13.6428V10.3572C1.99999 9.27341 1.99998 8.39926 2.05782 7.69138C2.11737 6.96253 2.24318 6.32234 2.54497 5.73005C3.02433 4.78924 3.78924 4.02433 4.73005 3.54497C5.32234 3.24318 5.96253 3.11737 6.69138 3.05782C7.39926 2.99998 8.27341 2.99999 9.35719 3ZM6.85424 5.05118C6.24907 5.10062 5.90138 5.19279 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4.19279 6.90138 4.10062 7.24907 4.05118 7.85424C4.00078 8.47108 4 9.26339 4 10.4V13.6C4 14.7366 4.00078 15.5289 4.05118 16.1458C4.10062 16.7509 4.19279 17.0986 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C5.90138 18.8072 6.24907 18.8994 6.85424 18.9488C7.47108 18.9992 8.26339 19 9.4 19H14.6C15.7366 19 16.5289 18.9992 17.1458 18.9488C17.7509 18.8994 18.0986 18.8072 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C19.8072 17.0986 19.8994 16.7509 19.9488 16.1458C19.9992 15.5289 20 14.7366 20 13.6V10.4C20 9.26339 19.9992 8.47108 19.9488 7.85424C19.8994 7.24907 19.8072 6.90138 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C18.0986 5.19279 17.7509 5.10062 17.1458 5.05118C16.5289 5.00078 15.7366 5 14.6 5H9.4C8.26339 5 7.47108 5.00078 6.85424 5.05118ZM7 7C7.55229 7 8 7.44772 8 8V16C8 16.5523 7.55229 17 7 17C6.44772 17 6 16.5523 6 16V8C6 7.44772 6.44772 7 7 7Z"
        fill="currentColor"
        fillRule="evenodd"
        style={{ opacity: open ? 1 : 0 }}
      />
    </svg>
  );
}

function MobileMenu({ isOpen, onNavigate, theme }: { isOpen: boolean; onNavigate: () => void; theme: "dark" | "light" }) {
  const [openSectionId, setOpenSectionId] = useState<MobileMenuSectionId | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const portalTarget = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      frame = window.requestAnimationFrame(() => {
        setShouldRender(true);
        setIsClosing(false);
      });
    } else if (shouldRender) {
      frame = window.requestAnimationFrame(() => {
        setIsClosing(true);
        timeout = setTimeout(() => {
          setShouldRender(false);
          setIsClosing(false);
          setOpenSectionId(null);
        }, 320);
      });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender || isClosing) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [shouldRender, isClosing]);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".worktree-shell");

    if (!shell) return;

    if (isOpen) {
      shell.dataset.mobileMenuOpen = "true";
    } else {
      delete shell.dataset.mobileMenuOpen;
    }

    return () => {
      delete shell.dataset.mobileMenuOpen;
    };
  }, [isOpen]);

  if (!shouldRender || !portalTarget) return null;

  return createPortal(
    <div className="nous-design-system worktree-mobile-menu-portal" data-nous-theme={theme}>
      <div className={`worktree-mobile-menu ${isClosing ? "nous-mobile-menu-bg-out" : "nous-mobile-menu-bg-in"}`} id="mobile-site-menu">
        <div aria-hidden="true" className="worktree-mobile-menu-grain" />
        <div aria-hidden="true" className="worktree-mobile-menu-glow" />
        <nav aria-label="Mobile navigation" className="worktree-mobile-menu-nav">
          <div aria-hidden="true" />
          <div className="worktree-mobile-menu-scroll nous-mobile-scrollbar">
            <div className="worktree-mobile-menu-section-list">
              {mobileMenuSections.map((section, index) => (
                <div className="will-change-transform" key={section.id} style={mobileMenuItemAnimationStyle(80 + (index * 60), isClosing)}>
                  <MobileMenuAccordionSection id={section.id} isOpen={openSectionId === section.id} label={section.label} onToggle={(sectionId) => setOpenSectionId((currentSectionId) => currentSectionId === sectionId ? null : sectionId)}>
                    {section.links.map((link) => (
                      <MobileMenuLink description={link.description} href={link.href} key={`${section.id}-${link.label}`} label={link.label} onNavigate={onNavigate} />
                    ))}
                  </MobileMenuAccordionSection>
                </div>
              ))}
            </div>
            <div className="worktree-mobile-menu-footer" style={mobileMenuItemAnimationStyle(340, isClosing)}>
              <span className="nue-prism-cta nue-prism-cta-secondary worktree-mobile-menu-cta">
                <span aria-hidden="true" className="nue-prism-cta-shadow" />
                <Link className="nue-prism-cta-button" href="/deploy" onClick={onNavigate}>
                  <span>
                    Start a review
                    <ArrowRight aria-hidden="true" className="nue-prism-cta-arrow" strokeWidth={1.7} />
                  </span>
                </Link>
                <MobilePrismLayers />
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>,
    portalTarget,
  );
}

function mobileMenuItemAnimationStyle(delayMs: number, isClosing: boolean): CSSProperties {
  if (isClosing) {
    return { animation: "nous-mobile-menu-item-out 140ms ease-out 0ms both" };
  }

  return { animation: `nous-mobile-menu-item-in 180ms ease-out ${delayMs}ms both` };
}

function MobileMenuAccordionSection({ children, id, isOpen, label, onToggle }: { children: ReactNode; id: MobileMenuSectionId; isOpen: boolean; label: string; onToggle: (id: MobileMenuSectionId) => void }) {
  const panelId = `mobile-menu-section-${id}`;

  return (
    <section>
      <button aria-controls={panelId} aria-expanded={isOpen} className="worktree-mobile-menu-accordion-trigger" onClick={() => onToggle(id)} type="button">
        <span>{label}</span>
        <span aria-hidden="true" className={`worktree-mobile-menu-caret ${isOpen ? "worktree-mobile-menu-caret-open" : ""}`}>
          <svg fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8L0.669873 0.5L9.33013 0.500001L5 8Z" fill="currentColor" />
          </svg>
        </span>
      </button>
      <div className={`worktree-mobile-menu-accordion-panel ${isOpen ? "worktree-mobile-menu-accordion-panel-open" : ""}`} id={panelId}>
        <div>
          <div className="worktree-mobile-menu-link-list">{children}</div>
        </div>
      </div>
    </section>
  );
}

function MobileMenuLink({ description, href, label, onNavigate }: { description?: string; href: string; label: string; onNavigate: () => void }) {
  const className = "worktree-mobile-menu-link";
  const content = (
    <span>
      <span>{label}</span>
      {description ? <span>{description}</span> : null}
    </span>
  );

  if (href.startsWith("/")) {
    return <Link className={className} href={href} onClick={onNavigate}>{content}</Link>;
  }

  return <a className={className} href={href} onClick={onNavigate}>{content}</a>;
}

function MobilePrismLayers() {
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
