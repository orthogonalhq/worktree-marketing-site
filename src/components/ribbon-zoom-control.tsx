"use client";

import { useState, type CSSProperties } from "react";
import styles from "./ribbon-zoom-control.module.css";

type RibbonZoomControlProps = {
  initialZoom: number;
};

export const ribbonZoomEvent = "worktree:ribbon-zoom";

export function RibbonZoomControl({ initialZoom }: RibbonZoomControlProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const progress = ((zoom - 1) / 2) * 100;
  const sliderStyle = { "--zoom-progress": `${progress}%` } as CSSProperties;

  function updateZoom(value: number) {
    const nextZoom = Math.min(3, Math.max(1, value));
    setZoom(nextZoom);

    const parameters = new URLSearchParams(window.location.search);
    parameters.set("zoom", nextZoom.toFixed(2));
    window.history.replaceState(null, "", `${window.location.pathname}?${parameters.toString()}`);
    window.dispatchEvent(new CustomEvent(ribbonZoomEvent, { detail: nextZoom }));
  }

  return (
    <div className={styles.control}>
      <div className={styles.valueRow}>
        <span>1×</span>
        <output htmlFor="ribbon-zoom">{zoom.toFixed(2)}×</output>
        <span>3×</span>
      </div>
      <input
        aria-label="Ribbon zoom"
        className={styles.slider}
        id="ribbon-zoom"
        max="3"
        min="1"
        onChange={(event) => updateZoom(Number(event.currentTarget.value))}
        step="0.01"
        style={sliderStyle}
        type="range"
        value={zoom}
      />
    </div>
  );
}
