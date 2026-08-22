import type { Metadata } from "next";
import type { StripeWaveShape } from "@/components/stripe-wave-hero";
import { RibbonRendererStudio } from "./ribbon-renderer-studio";

export const metadata: Metadata = {
  title: "Workflow Ribbon Renderer | Worktree",
  robots: { follow: false, index: false },
};

type RibbonRendererPageProps = {
  searchParams: Promise<{
    capture?: string | string[];
    mode?: string | string[];
    orientation?: string | string[];
    seed?: string | string[];
    shape?: string | string[];
    rotation?: string | string[];
    variant?: string | string[];
    x?: string | string[];
    y?: string | string[];
    zoom?: string | string[];
  }>;
};

function parseTransformValue(value: string | string[] | undefined, minimum: number, maximum: number) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const numericValue = Number(rawValue);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.min(maximum, Math.max(minimum, numericValue));
}

export default async function RibbonRendererPage({ searchParams }: RibbonRendererPageProps) {
  const parameters = await searchParams;
  const rawSeed = Array.isArray(parameters.seed) ? parameters.seed[0] : parameters.seed;
  const rawShape = Array.isArray(parameters.shape) ? parameters.shape[0] : parameters.shape;
  const rawVariant = Array.isArray(parameters.variant) ? parameters.variant[0] : parameters.variant;
  const rawMode = Array.isArray(parameters.mode) ? parameters.mode[0] : parameters.mode;
  const rawOrientation = Array.isArray(parameters.orientation) ? parameters.orientation[0] : parameters.orientation;
  const capture = (Array.isArray(parameters.capture) ? parameters.capture[0] : parameters.capture) === "1";
  const captureMode = rawMode === "hero-fallback" ? "hero-fallback" : "ribbon";
  const orientation = rawOrientation === "portrait" ? "portrait" : "landscape";
  const seed = Number.isFinite(Number(rawSeed)) ? Math.max(1, Math.round(Number(rawSeed))) : 1;
  const shape: StripeWaveShape = rawShape === "twist"
    || rawShape === "canopy"
    || rawShape === "halo"
    || rawShape === "pleat"
    || rawShape === "orbit"
    ? rawShape
    : "header";
  const variant = rawVariant === "closeup" || rawVariant === "closeup-strong"
    ? rawVariant
    : "original";
  const initialX = parseTransformValue(parameters.x, -80, 80);
  const initialY = parseTransformValue(parameters.y, -80, 80);
  const initialRotation = parseTransformValue(parameters.rotation, -180, 180);
  const presetScale = variant === "closeup" ? 1.1 : variant === "closeup-strong" ? 1.4 : 1;
  const requestedZoom = parseTransformValue(parameters.zoom, 1, 3);
  const scale = requestedZoom || presetScale;
  return (
    <RibbonRendererStudio
      capture={capture}
      captureMode={captureMode}
      initialRotation={initialRotation}
      initialSeed={seed}
      initialShape={shape}
      initialX={initialX}
      initialY={initialY}
      initialZoom={scale}
      orientation={orientation}
      variant={variant}
    />
  );
}
