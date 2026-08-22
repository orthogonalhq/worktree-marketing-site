"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ribbonZoomEvent } from "./ribbon-zoom-control";
import styles from "./ribbon-transform-stage.module.css";

type RibbonTransformStageProps = {
  artworkClassName: string;
  children: ReactNode;
  className: string;
  grainClassName: string;
  initialRotation: number;
  initialX: number;
  initialY: number;
  interactive: boolean;
  scale: number;
  seed: number;
  shape: string;
  variant: string;
};

type Transform = {
  rotation: number;
  x: number;
  y: number;
};

type Gesture = {
  kind: "move" | "rotate";
  pointerId: number;
  startAngle: number;
  startClientX: number;
  startClientY: number;
  startTransform: Transform;
};

const cornerHandles = [
  { className: styles.northWest, label: "Rotate from top left corner" },
  { className: styles.northEast, label: "Rotate from top right corner" },
  { className: styles.southWest, label: "Rotate from bottom left corner" },
  { className: styles.southEast, label: "Rotate from bottom right corner" },
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeRotation(value: number) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function persistTransform(transform: Transform) {
  const parameters = new URLSearchParams(window.location.search);
  const values: Array<[string, number]> = [
    ["x", transform.x],
    ["y", transform.y],
    ["rotation", transform.rotation],
  ];

  for (const [key, value] of values) {
    if (Math.abs(value) < 0.01) parameters.delete(key);
    else parameters.set(key, String(Number(value.toFixed(2))));
  }

  window.history.replaceState(null, "", `${window.location.pathname}?${parameters.toString()}`);
}

export function RibbonTransformStage({
  artworkClassName,
  children,
  className,
  grainClassName,
  initialRotation,
  initialX,
  initialY,
  interactive,
  scale,
  seed,
  shape,
  variant,
}: RibbonTransformStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const initialTransform = {
    rotation: initialRotation,
    x: initialX,
    y: initialY,
  };
  const transformRef = useRef<Transform>(initialTransform);
  const [transform, setTransformState] = useState<Transform>(initialTransform);
  const [dragging, setDragging] = useState(false);
  const [activeScale, setActiveScale] = useState(scale);
  const artworkStyle = {
    transform: `translate3d(${transform.x}%, ${transform.y}%, 0) rotate(${transform.rotation}deg)`,
  } satisfies CSSProperties;

  useEffect(() => {
    const updateZoom = (event: Event) => {
      setActiveScale((event as CustomEvent<number>).detail);
    };
    window.addEventListener(ribbonZoomEvent, updateZoom);
    return () => window.removeEventListener(ribbonZoomEvent, updateZoom);
  }, []);

  function setTransform(nextTransform: Transform) {
    transformRef.current = nextTransform;
    setTransformState(nextTransform);
  }

  function startMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    const stage = stageRef.current;
    if (!stage) return;
    stage.setPointerCapture(event.pointerId);
    gestureRef.current = {
      kind: "move",
      pointerId: event.pointerId,
      startAngle: 0,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startTransform: transform,
    };
    setDragging(true);
  }

  function startRotation(event: ReactPointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const centerX = bounds.left + bounds.width * (0.5 + transform.x / 100);
    const centerY = bounds.top + bounds.height * (0.5 + transform.y / 100);
    stage.setPointerCapture(event.pointerId);
    gestureRef.current = {
      kind: "rotate",
      pointerId: event.pointerId,
      startAngle: Math.atan2(event.clientY - centerY, event.clientX - centerX),
      startClientX: event.clientX,
      startClientY: event.clientY,
      startTransform: transform,
    };
    setDragging(true);
  }

  function move(event: ReactPointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    const stage = stageRef.current;
    if (!gesture || !stage || gesture.pointerId !== event.pointerId) return;
    const bounds = stage.getBoundingClientRect();

    if (gesture.kind === "move") {
      setTransform({
        ...gesture.startTransform,
        x: clamp(gesture.startTransform.x + ((event.clientX - gesture.startClientX) / bounds.width) * 100, -80, 80),
        y: clamp(gesture.startTransform.y + ((event.clientY - gesture.startClientY) / bounds.height) * 100, -80, 80),
      });
      return;
    }

    const centerX = bounds.left + bounds.width * (0.5 + gesture.startTransform.x / 100);
    const centerY = bounds.top + bounds.height * (0.5 + gesture.startTransform.y / 100);
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const delta = (angle - gesture.startAngle) * (180 / Math.PI);
    setTransform({
      ...gesture.startTransform,
      rotation: normalizeRotation(gesture.startTransform.rotation + delta),
    });
  }

  function finish(event: ReactPointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gestureRef.current = null;
    setDragging(false);
    persistTransform(transformRef.current);
  }

  function reset(event: ReactPointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const nextTransform = { rotation: 0, x: 0, y: 0 };
    setTransform(nextTransform);
    persistTransform(nextTransform);
  }

  return (
    <div
      className={`${className} ${interactive ? styles.interactive : ""} ${dragging ? styles.dragging : ""}`}
      data-ribbon-rotation={transform.rotation.toFixed(2)}
      data-ribbon-seed={seed}
      data-ribbon-shape={shape}
      data-ribbon-scale={activeScale.toFixed(2)}
      data-ribbon-variant={variant}
      data-ribbon-x={transform.x.toFixed(2)}
      data-ribbon-y={transform.y.toFixed(2)}
      onPointerCancel={finish}
      onPointerDown={startMove}
      onPointerMove={move}
      onPointerUp={finish}
      ref={stageRef}
    >
      <div className={artworkClassName} style={artworkStyle}>{children}</div>
      <div className={grainClassName} />
      {interactive && (
        <>
          {cornerHandles.map((handle) => (
            <button
              aria-label={handle.label}
              className={`${styles.corner} ${handle.className}`}
              key={handle.label}
              onPointerDown={startRotation}
              type="button"
            />
          ))}
          <div className={styles.hud}>
            <span>{transform.x.toFixed(1)} / {transform.y.toFixed(1)} / {transform.rotation.toFixed(1)}°</span>
            <button className={styles.reset} onPointerDown={reset} type="button">Reset</button>
          </div>
        </>
      )}
    </div>
  );
}
