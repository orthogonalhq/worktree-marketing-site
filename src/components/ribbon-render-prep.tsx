"use client";

import { useEffect } from "react";

export function RibbonRenderPrep() {
  useEffect(() => {
    const hideDevelopmentChrome = () => {
      document.querySelectorAll("nextjs-portal").forEach((portal) => {
        (portal as HTMLElement).style.display = "none";
      });
    };

    hideDevelopmentChrome();
    const observer = new MutationObserver(hideDevelopmentChrome);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
