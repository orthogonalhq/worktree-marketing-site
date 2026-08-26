"use client";

import Link from "next/link";
import { useState } from "react";
import { RibbonCaptureButton } from "@/components/ribbon-capture-button";
import { RibbonRenderPrep } from "@/components/ribbon-render-prep";
import { RibbonTransformStage } from "@/components/ribbon-transform-stage";
import { RibbonZoomControl } from "@/components/ribbon-zoom-control";
import { StripeWaveHero, type StripeWaveShape } from "@/components/stripe-wave-hero";
import styles from "./page.module.css";

type RibbonShape = StripeWaveShape;
type CaptureMode = "hero-fallback" | "ribbon";
type HeroOrientation = "landscape" | "portrait";

type RibbonRendererStudioProps = {
  capture: boolean;
  captureMode: CaptureMode;
  initialRotation: number;
  initialSeed: number;
  initialShape: RibbonShape;
  initialX: number;
  initialY: number;
  initialZoom: number;
  orientation: HeroOrientation;
  variant: "closeup" | "closeup-strong" | "original";
};

const shapeOptions: Array<{ label: string; value: RibbonShape }> = [
  { label: "Header ribbon", value: "header" },
  { label: "Twist", value: "twist" },
  { label: "Canopy", value: "canopy" },
  { label: "Open halo", value: "halo" },
  { label: "Pleated sheet", value: "pleat" },
  { label: "Orbital system", value: "orbit" },
];

function updateStudioUrl(
  shape: RibbonShape,
  seed: number,
  variant: RibbonRendererStudioProps["variant"],
  captureMode: CaptureMode,
  orientation: HeroOrientation,
) {
  const parameters = new URLSearchParams();
  parameters.set("shape", shape);
  parameters.set("seed", String(seed));
  if (captureMode === "hero-fallback") {
    parameters.set("mode", captureMode);
    parameters.set("orientation", orientation);
  }
  if (variant !== "original") parameters.set("variant", variant);
  window.history.replaceState(null, "", `${window.location.pathname}?${parameters.toString()}`);
}

export function RibbonRendererStudio({
  capture,
  captureMode: initialCaptureMode,
  initialRotation,
  initialSeed,
  initialShape,
  initialX,
  initialY,
  initialZoom,
  orientation: initialOrientation,
  variant,
}: RibbonRendererStudioProps) {
  const [captureMode, setCaptureMode] = useState<CaptureMode>(initialCaptureMode);
  const [orientation, setOrientation] = useState<HeroOrientation>(initialOrientation);
  const [seed, setSeed] = useState(initialSeed);
  const [shape, setShape] = useState<RibbonShape>(initialShape);
  const isHeroFallback = captureMode === "hero-fallback";
  const activeShape: RibbonShape = isHeroFallback ? "header" : shape;
  const outputWidth = isHeroFallback ? (orientation === "landscape" ? 1600 : 900) : 960;
  const outputHeight = isHeroFallback ? (orientation === "landscape" ? 900 : 1876) : 1200;
  const frameSuffix = variant === "closeup" ? "B" : variant === "closeup-strong" ? "C" : "";
  const variantQuery = !isHeroFallback && variant !== "original" ? `&variant=${variant}` : "";
  const modeQuery = isHeroFallback ? `&mode=hero-fallback&orientation=${orientation}` : "";
  const cleanFrameUrl = `/ribbon-renderer?capture=1&shape=${activeShape}&seed=${seed}${variantQuery}${modeQuery}`;
  const frameName = isHeroFallback
    ? `hero-fallback-${orientation}`
    : `${shape}-${String(seed).padStart(3, "0")}${frameSuffix.toLowerCase()}`;
  const stageMode: "capture" | "hero-fallback-landscape" | "hero-fallback-portrait" = isHeroFallback
    ? orientation === "landscape"
      ? "hero-fallback-landscape"
      : "hero-fallback-portrait"
    : "capture";
  const stageClassName = `${styles.stage} ${styles[activeShape]} ${isHeroFallback ? styles.heroFallbackStage : ""} ${isHeroFallback ? styles[orientation] : ""}`;

  function selectShape(nextShape: RibbonShape) {
    setShape(nextShape);
    updateStudioUrl(nextShape, seed, variant, captureMode, orientation);
  }

  function selectSeed(nextSeed: number) {
    const normalizedSeed = Math.max(1, nextSeed);
    setSeed(normalizedSeed);
    updateStudioUrl(shape, normalizedSeed, variant, captureMode, orientation);
  }

  function selectCaptureMode(nextMode: CaptureMode) {
    setCaptureMode(nextMode);
    updateStudioUrl(shape, seed, variant, nextMode, orientation);
  }

  function selectOrientation(nextOrientation: HeroOrientation) {
    setOrientation(nextOrientation);
    updateStudioUrl(shape, seed, variant, captureMode, nextOrientation);
  }

  const stage = (
    <RibbonTransformStage
      artworkClassName={styles.artwork}
      className={stageClassName}
      grainClassName={styles.grain}
      initialRotation={initialRotation}
      initialX={initialX}
      initialY={initialY}
      interactive={!capture}
      scale={initialZoom}
      seed={seed}
      shape={activeShape}
      variant={variant}
    >
      <StripeWaveHero
        freezeOnReady={isHeroFallback}
        captureSeed={seed}
        initialZoom={initialZoom}
        mode={stageMode}
        shape={activeShape}
      />
    </RibbonTransformStage>
  );

  if (capture) {
    return (
      <main className={`${styles.capturePage} ${isHeroFallback ? styles[`capturePage${orientation === "landscape" ? "Landscape" : "Portrait"}`] : ""}`}>
        <RibbonRenderPrep />
        <h1 className={styles.visuallyHidden}>Workflow ribbon capture</h1>
        {stage}
      </main>
    );
  }

  return (
    <main className={styles.studioPage}>
      <RibbonRenderPrep />
      <header className={styles.studioHeader}>
        <div>
          <p>Worktree material study</p>
          <h1>Ribbon capture studio</h1>
        </div>
        <p className={styles.instructions}>One frame at a time. Capture only after approval.</p>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <div className={styles.controlGroup}>
            <p>Capture type</p>
            <nav aria-label="Capture type">
              <button
                aria-pressed={captureMode === "ribbon"}
                className={captureMode === "ribbon" ? styles.activeControl : undefined}
                onClick={() => selectCaptureMode("ribbon")}
                type="button"
              >
                Card artwork
              </button>
              <button
                aria-pressed={captureMode === "hero-fallback"}
                className={captureMode === "hero-fallback" ? styles.activeControl : undefined}
                onClick={() => selectCaptureMode("hero-fallback")}
                type="button"
              >
                Hero fallback
              </button>
            </nav>
          </div>

          {isHeroFallback ? (
            <div className={styles.controlGroup}>
              <p>Orientation</p>
              <nav aria-label="Hero fallback orientation">
                <button
                  aria-pressed={orientation === "landscape"}
                  className={orientation === "landscape" ? styles.activeControl : undefined}
                  onClick={() => selectOrientation("landscape")}
                  type="button"
                >
                  Landscape · 16:9
                </button>
                <button
                  aria-pressed={orientation === "portrait"}
                  className={orientation === "portrait" ? styles.activeControl : undefined}
                  onClick={() => selectOrientation("portrait")}
                  type="button"
                >
                  Portrait · mobile hero
                </button>
              </nav>
            </div>
          ) : (
          <div className={styles.controlGroup}>
            <p>Shape</p>
            <nav aria-label="Ribbon shape">
              {shapeOptions.map((option) => (
                <button
                  aria-pressed={shape === option.value}
                  className={shape === option.value ? styles.activeControl : undefined}
                  key={option.value}
                  onClick={() => selectShape(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </nav>
          </div>
          )}

          {!isHeroFallback && (
          <div className={styles.controlGroup}>
            <p>Seed</p>
            <div className={styles.seedControl}>
              <button aria-label="Previous seed" onClick={() => selectSeed(seed - 1)} type="button">−</button>
              <strong>{String(seed).padStart(3, "0")}{frameSuffix}</strong>
              <button aria-label="Next seed" onClick={() => selectSeed(seed + 1)} type="button">+</button>
            </div>
          </div>
          )}

          <div className={styles.controlGroup}>
            <p>Zoom</p>
            <RibbonZoomControl
              initialZoom={initialZoom}
              key={`${captureMode}-${orientation}-${shape}-${seed}-${variant}`}
            />
          </div>

          <dl className={styles.metadata}>
            <div><dt>Frame</dt><dd>{isHeroFallback ? `hero/${orientation}` : `${shape}/${String(seed).padStart(3, "0")}${frameSuffix}`}</dd></div>
            <div><dt>Master</dt><dd>{outputWidth} × {outputHeight}</dd></div>
            <div><dt>Ratio</dt><dd>{isHeroFallback ? (orientation === "landscape" ? "16:9" : "390:813") : "4:5"}</dd></div>
            {isHeroFallback && <div><dt>Motion</dt><dd>First frame · paused</dd></div>}
          </dl>
        </aside>

        <section className={`${styles.previewColumn} ${isHeroFallback ? styles.heroPreviewColumn : ""}`} aria-label="Ribbon preview">
          <div className={`${styles.previewFrame} ${isHeroFallback ? styles[`heroPreview${orientation === "landscape" ? "Landscape" : "Portrait"}`] : ""}`}>{stage}</div>
          <div className={styles.previewFooter}>
            <span>Drag to reposition · drag a corner to rotate</span>
            <div className={styles.previewActions}>
              <RibbonCaptureButton
                frameName={frameName}
                key={frameName}
                outputHeight={outputHeight}
                outputWidth={outputWidth}
              />
              <Link href={cleanFrameUrl}>Open clean frame</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
