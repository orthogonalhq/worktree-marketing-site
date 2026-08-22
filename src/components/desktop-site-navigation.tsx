"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, ChevronDown, RefreshCw, ShieldCheck, Waypoints, Workflow } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  blogNavigationLink,
  comparisonNavigationLink,
  primaryNavigationLinks,
  productNavigationLinks,
  serviceNavigationLinks,
} from "@/components/site-navigation-data";

const productIconByHref = {
  "/product": Boxes,
  "/product/agents": Bot,
  "/product/security": ShieldCheck,
} as const;

const serviceIconByHref = {
  "/services/ai-automation": Waypoints,
  "/services/ai-implementation": Workflow,
  "/services/managed-ai": RefreshCw,
} as const;

type DesktopMenuId = "services" | "product";

export function DesktopSiteNavigation() {
  const pathname = usePathname();

  return <DesktopSiteNavigationState key={pathname} pathname={pathname} />;
}

function DesktopSiteNavigationState({ pathname }: { pathname: string }) {
  const [openMenuId, setOpenMenuId] = useState<DesktopMenuId | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const servicesIsActive = pathname.startsWith("/services/");
  const productIsActive = pathname.startsWith("/product") || pathname === comparisonNavigationLink.href;

  const cancelScheduledClose = () => {
    if (closeTimeoutRef.current === null) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  const openMenu = (menuId: DesktopMenuId) => {
    cancelScheduledClose();
    setOpenMenuId(menuId);
  };

  const scheduleMenuClose = (menuRef: RefObject<HTMLDivElement | null>) => {
    if (menuRef.current?.contains(document.activeElement)) return;

    cancelScheduledClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenMenuId(null);
      closeTimeoutRef.current = null;
    }, 250);
  };

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (openMenuId === null) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!productMenuRef.current?.contains(target) && !servicesMenuRef.current?.contains(target)) setOpenMenuId(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenuId(null);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openMenuId]);

  return (
    <nav className="worktree-nav" aria-label="Main navigation">
      <div
        className="worktree-nav-group"
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenuId(null);
        }}
        onFocusCapture={() => openMenu("services")}
        onMouseEnter={() => openMenu("services")}
        onMouseLeave={() => scheduleMenuClose(servicesMenuRef)}
        ref={servicesMenuRef}
      >
        <button
          aria-controls="worktree-services-navigation"
          aria-expanded={openMenuId === "services"}
          className={`nav-link worktree-nav-trigger ${servicesIsActive ? "nav-link-active" : ""}`}
          onClick={() => openMenu("services")}
          type="button"
        >
          <span>Services</span>
          <ChevronDown aria-hidden="true" className={`worktree-nav-trigger-icon ${openMenuId === "services" ? "worktree-nav-trigger-icon-open" : ""}`} strokeWidth={1.8} />
        </button>

        {openMenuId === "services" ? (
          <div className="worktree-product-navigation worktree-services-navigation" id="worktree-services-navigation">
            <section className="worktree-product-navigation-main" aria-label="Services">
              <div className="worktree-product-navigation-links">
                {serviceNavigationLinks.map((link) => {
                  const Icon = serviceIconByHref[link.href];

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

            <Link className="worktree-product-navigation-footer" href="/use-cases">
              <span className="worktree-product-navigation-footer-copy">
                <strong>Where can AI help first?</strong>
                <span>Explore practical workflows for growing teams.</span>
              </span>
              <span className="worktree-product-navigation-footer-action">
                Explore use cases
                <ArrowRight aria-hidden="true" strokeWidth={1.7} />
              </span>
            </Link>
          </div>
        ) : null}
      </div>

      <div
        className="worktree-nav-group"
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenuId(null);
        }}
        onFocusCapture={() => openMenu("product")}
        onMouseEnter={() => openMenu("product")}
        onMouseLeave={() => scheduleMenuClose(productMenuRef)}
        ref={productMenuRef}
      >
        <button
          aria-controls="worktree-product-navigation"
          aria-expanded={openMenuId === "product"}
          className={`nav-link worktree-nav-trigger ${productIsActive ? "nav-link-active" : ""}`}
          onClick={() => openMenu("product")}
          type="button"
        >
          <span>Product</span>
          <ChevronDown aria-hidden="true" className={`worktree-nav-trigger-icon ${openMenuId === "product" ? "worktree-nav-trigger-icon-open" : ""}`} strokeWidth={1.8} />
        </button>

        {openMenuId === "product" ? (
          <div className="worktree-product-navigation" id="worktree-product-navigation">
            <section className="worktree-product-navigation-main" aria-label="Product">
              <div className="worktree-product-navigation-links">
                {productNavigationLinks.map((link) => {
                  const Icon = productIconByHref[link.href];

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
      <Link className={`nav-link ${pathname === blogNavigationLink.href || pathname.startsWith(`${blogNavigationLink.href}/`) ? "nav-link-active" : ""}`} href={blogNavigationLink.href}>
        {blogNavigationLink.label}
      </Link>
    </nav>
  );
}
