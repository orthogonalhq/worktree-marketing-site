"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
type FooterTheme = "system" | Theme;
const themeStorageKey = "worktree-theme";

const footerThemes = [
  { label: "System", value: "system" },
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
] satisfies ReadonlyArray<{ label: string; value: FooterTheme }>;

function getShellTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const shell = document.querySelector<HTMLElement>(".worktree-shell");
  return shell?.dataset.nousTheme === "light" ? "light" : "dark";
}

function getStoredFooterTheme(): FooterTheme {
  if (typeof window === "undefined") return "system";

  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
    return storedTheme;
  }

  return "system";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getShellTheme());

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const shell = document.querySelector<HTMLElement>(".worktree-shell");

    if (shell) {
      shell.dataset.nousTheme = nextTheme;
    }

    document.documentElement.style.colorScheme = nextTheme;
    setTheme(nextTheme);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === "light"}>
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

function applyShellTheme(theme: Theme) {
  const shell = document.querySelector<HTMLElement>(".worktree-shell");

  if (shell) {
    shell.dataset.nousTheme = theme;
  }

  document.documentElement.style.colorScheme = theme;
}

export function FooterThemeToggle() {
  const [theme, setTheme] = useState<FooterTheme>(() => getStoredFooterTheme());
  const [systemTheme, setSystemTheme] = useState<Theme>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = () => setSystemTheme(mediaQuery.matches ? "light" : "dark");

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    applyShellTheme(theme === "system" ? systemTheme : theme);
  }, [systemTheme, theme]);

  function selectTheme(nextTheme: FooterTheme) {
    window.localStorage.setItem(themeStorageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="footer-theme-switcher" role="group" aria-label="Theme options">
      <span>Theme</span>
      <div className="footer-theme-options">
        {footerThemes.map(({ label, value }) => (
          <button
            aria-label={`Use ${label} theme`}
            aria-pressed={theme === value}
            className="footer-theme-option"
            key={value}
            onClick={() => selectTheme(value)}
            type="button"
          >
            <ThemeOptionIcon value={value} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeOptionIcon({ value }: { value: FooterTheme }) {
  if (value === "system") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect height="8.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" width="11.5" x="2.25" y="2.75" />
        <path d="M6.25 13.25h3.5M8 11.25v2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      </svg>
    );
  }

  if (value === "light") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 1.9v1.2M8 12.9v1.2M1.9 8h1.2M12.9 8h1.2M3.7 3.7l.85.85M11.45 11.45l.85.85M12.3 3.7l-.85.85M4.55 11.45l-.85.85" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8 10.25A5.4 5.4 0 0 1 5.75 3.2 5.75 5.75 0 1 0 12.8 10.25Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}
