"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
type LogoVariant = "solid" | "transparent";

const logoSources: Record<LogoVariant, Record<Theme, string>> = {
  solid: {
    dark: "/logo/Logomark-darkmode.png",
    light: "/logo/Logomark-lightmode.png",
  },
  transparent: {
    dark: "/logo/Logomark-darkmode-transparent.png",
    light: "/logo/Logomark-lightmode-transparent.png",
  },
};

function getPageTheme(fallback: Theme): Theme {
  const shell = document.querySelector<HTMLElement>(".worktree-shell");

  return shell?.dataset.nousTheme === "light" ? "light" : fallback;
}

export function Logomark({
  className,
  initialTheme = "dark",
  variant = "transparent",
}: {
  className?: string;
  initialTheme?: Theme;
  variant?: LogoVariant;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".worktree-shell");
    const updateTheme = () => setTheme(getPageTheme(initialTheme));

    updateTheme();

    if (!shell) return undefined;

    const observer = new MutationObserver(updateTheme);
    observer.observe(shell, { attributeFilter: ["data-nous-theme"], attributes: true });

    return () => observer.disconnect();
  }, [initialTheme]);

  return (
    <span className={className ? `worktree-logo ${className}` : "worktree-logo"} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="worktree-logo-image"
        src={logoSources[variant][theme]}
        alt=""
        width="48"
        height="48"
      />
    </span>
  );
}
