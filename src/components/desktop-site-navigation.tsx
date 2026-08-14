"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, ChevronDown, Gauge } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  comparisonNavigationLink,
  primaryNavigationLinks,
  productNavigationLinks,
} from "@/components/site-navigation-data";

const productIcons = [Boxes, Bot, Gauge] as const;

export function DesktopSiteNavigation() {
  const pathname = usePathname();

  return <DesktopSiteNavigationState key={pathname} pathname={pathname} />;
}

function DesktopSiteNavigationState({ pathname }: { pathname: string }) {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const productIsActive = pathname.startsWith("/product") || pathname === comparisonNavigationLink.href;

  const cancelScheduledClose = () => {
    if (closeTimeoutRef.current === null) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  const openProductMenu = () => {
    cancelScheduledClose();
    setIsProductOpen(true);
  };

  const scheduleProductMenuClose = () => {
    if (productMenuRef.current?.contains(document.activeElement)) return;

    cancelScheduledClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsProductOpen(false);
      closeTimeoutRef.current = null;
    }, 250);
  };

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isProductOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!productMenuRef.current?.contains(event.target as Node)) setIsProductOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProductOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProductOpen]);

  return (
    <nav className="worktree-nav" aria-label="Main navigation">
      <div
        className="worktree-nav-group"
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsProductOpen(false);
        }}
        onFocusCapture={openProductMenu}
        onMouseEnter={openProductMenu}
        onMouseLeave={scheduleProductMenuClose}
        ref={productMenuRef}
      >
        <button
          aria-controls="worktree-product-navigation"
          aria-expanded={isProductOpen}
          className={`nav-link worktree-nav-trigger ${productIsActive ? "nav-link-active" : ""}`}
          onClick={openProductMenu}
          type="button"
        >
          <span>Product</span>
          <ChevronDown aria-hidden="true" className={`worktree-nav-trigger-icon ${isProductOpen ? "worktree-nav-trigger-icon-open" : ""}`} strokeWidth={1.8} />
        </button>

        {isProductOpen ? (
          <div className="worktree-product-navigation" id="worktree-product-navigation">
            <section className="worktree-product-navigation-main" aria-label="Product">
              <div className="worktree-product-navigation-links">
                {productNavigationLinks.map((link, index) => {
                  const Icon = productIcons[index];

                  return (
                    <Link className="worktree-product-navigation-link" href={link.href} key={link.href}>
                      <span aria-hidden="true" className="worktree-product-navigation-icon"><Icon strokeWidth={1.55} /></span>
                      <span>
                        <strong>{link.label}</strong>
                        <span>{link.description}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <Link className="worktree-product-navigation-footer" href={comparisonNavigationLink.href}>
              <span className="worktree-product-navigation-footer-copy">
                <strong>{comparisonNavigationLink.label}</strong>
                <span>{comparisonNavigationLink.description}</span>
              </span>
              <span className="worktree-product-navigation-footer-action">
                See the comparison
                <ArrowRight aria-hidden="true" strokeWidth={1.7} />
              </span>
            </Link>
          </div>
        ) : null}
      </div>

      {primaryNavigationLinks.map((link) => (
        <Link className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
