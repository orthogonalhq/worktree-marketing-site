"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef } from "react";
import styles from "@/app/home.module.css";

type InfrastructureProofItem = readonly [number: string, title: string, copy: string];

type InfrastructureFocusCardsProps = {
  items: readonly InfrastructureProofItem[];
};

type FocusCardStyle = CSSProperties & {
  "--card-index": number;
  "--focus-blur": string;
  "--focus-opacity": number;
  "--scene-delay": string;
};

const MAX_BLUR_PX = 16;
const FOCUS_RANGE_PX = 240;
const FOCUS_LERP = 0.14;
const DESKTOP_FOCUS_INPUT_SCALE = 2;
const SCENE_DURATION_MS = 1700;
const FOCUS_TOUR_END_MS = 6500;

function focusValues(distance: number) {
  const amount = Math.min(1, distance / FOCUS_RANGE_PX);

  return {
    blur: amount * MAX_BLUR_PX,
    opacity: 0.94 - amount * 0.61,
  };
}

export function InfrastructureFocusCards({ items }: InfrastructureFocusCardsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const cardCentersRef = useRef<number[]>([]);
  const currentFocusRef = useRef<number | null>(null);
  const targetFocusRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const focusTourTimeoutsRef = useRef<number[]>([]);
  const sceneTimeoutRef = useRef<number | null>(null);
  const sceneStartedRef = useRef(false);
  const sceneReadyRef = useRef(false);
  const sceneViewportActiveRef = useRef(false);
  const focusTourActiveRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const applyFocus = useCallback((focusX: number) => {
    const list = listRef.current;
    const firstCenter = cardCentersRef.current[0];
    const lastCenter = cardCentersRef.current[cardCentersRef.current.length - 1];
    const firstCard = cardRefs.current[0];
    const lastCard = cardRefs.current[cardRefs.current.length - 1];

    if (
      list
      && firstCenter !== undefined
      && lastCenter !== undefined
      && firstCard
      && lastCard
      && lastCenter > firstCenter
    ) {
      const progress = Math.min(1, Math.max(0, (focusX - firstCenter) / (lastCenter - firstCenter)));
      const originStart = firstCard.offsetLeft;
      const originEnd = lastCard.offsetLeft;
      const origin = originStart + (originEnd - originStart) * progress;
      list.style.setProperty("--perspective-origin-x", `${origin.toFixed(2)}px`);
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const center = cardCentersRef.current[index];
      if (center === undefined) return;

      const { blur, opacity } = focusValues(Math.abs(center - focusX));
      card.style.setProperty("--focus-blur", `${blur.toFixed(2)}px`);
      card.style.setProperty("--focus-opacity", opacity.toFixed(3));
    });
  }, []);

  const startFocusAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    function animate() {
      const current = currentFocusRef.current;
      const target = targetFocusRef.current;

      if (current === null || target === null) {
        animationFrameRef.current = null;
        return;
      }

      const delta = target - current;
      const next = Math.abs(delta) < 0.1 ? target : current + delta * FOCUS_LERP;

      currentFocusRef.current = next;
      applyFocus(next);

      if (next === target) {
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    }

    animationFrameRef.current = window.requestAnimationFrame(animate);
  }, [applyFocus]);

  const moveFocusTo = useCallback((focusX: number) => {
    targetFocusRef.current = focusX;

    if (reducedMotionRef.current) {
      currentFocusRef.current = focusX;
      applyFocus(focusX);
      return;
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    startFocusAnimation();
  }, [startFocusAnimation, applyFocus]);

  const cancelFocusTour = useCallback(() => {
    focusTourTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    focusTourTimeoutsRef.current = [];
    focusTourActiveRef.current = false;
  }, []);

  const startFocusTour = useCallback(() => {
    cancelFocusTour();
    if (reducedMotionRef.current) return;

    focusTourActiveRef.current = true;

    const centers = cardCentersRef.current;
    const tourStops = [
      { cardIndex: 1, delay: 1400 },
      { cardIndex: 2, delay: 3100 },
      { cardIndex: 3, delay: 4800 },
    ];

    focusTourTimeoutsRef.current = tourStops.flatMap(({ cardIndex, delay }) => {
      const center = centers[cardIndex];
      if (center === undefined) return [];

      return [window.setTimeout(() => moveFocusTo(center), delay)];
    });

    focusTourTimeoutsRef.current.push(window.setTimeout(() => {
      focusTourActiveRef.current = false;
      focusTourTimeoutsRef.current = [];
    }, FOCUS_TOUR_END_MS));
  }, [cancelFocusTour, moveFocusTo]);

  const measureCards = useCallback(() => {
    const centers = cardRefs.current.flatMap((card) => {
      if (!card) return [];
      const bounds = card.getBoundingClientRect();
      return [bounds.left + bounds.width / 2];
    });

    cardCentersRef.current = centers;

    if (centers.length > 0) {
      const body = listRef.current?.parentElement;
      if (body) {
        const bodyBounds = body.getBoundingClientRect();
        body.style.setProperty("--beam-origin-x", `${centers[0] - bodyBounds.left}px`);
      }

      currentFocusRef.current = centers[0];
      targetFocusRef.current = centers[0];
      applyFocus(centers[0]);
    }
  }, [applyFocus]);

  const completeScene = useCallback(() => {
    const list = listRef.current;
    const body = list?.parentElement;

    if (!list || !body) return;

    list.classList.remove(styles.infrastructureScenePending, styles.infrastructureScenePlaying);
    list.classList.add(styles.infrastructureSceneReady);
    body.classList.remove(styles.infrastructureScenePlaying);
    body.classList.add(styles.infrastructureSceneReady);
    sceneReadyRef.current = true;
    sceneTimeoutRef.current = null;

    const firstCenter = cardCentersRef.current[0];
    if (firstCenter !== undefined) {
      currentFocusRef.current = firstCenter;
      targetFocusRef.current = firstCenter;
      applyFocus(firstCenter);
    }

    if (window.matchMedia("(min-width: 1024px)").matches) {
      startFocusTour();
    }
  }, [applyFocus, startFocusTour]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;

      if (mediaQuery.matches && sceneStartedRef.current && !sceneReadyRef.current) {
        if (sceneTimeoutRef.current !== null) {
          window.clearTimeout(sceneTimeoutRef.current);
        }
        completeScene();
      }
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    const resizeObserver = new ResizeObserver(measureCards);
    resizeObserver.observe(list);
    measureCards();

    const playScene = () => {
      if (sceneStartedRef.current) return;
      sceneStartedRef.current = true;

      if (reducedMotionRef.current) {
        completeScene();
        return;
      }

      const body = list.parentElement;
      list.classList.remove(styles.infrastructureScenePending);
      list.classList.add(styles.infrastructureScenePlaying);
      body?.classList.add(styles.infrastructureScenePlaying);
      sceneTimeoutRef.current = window.setTimeout(completeScene, SCENE_DURATION_MS);
    };

    const sceneObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        playScene();
        sceneObserver.disconnect();
      },
      { threshold: 0.35 },
    );

    sceneObserver.observe(list);

    const focusViewportObserver = new IntersectionObserver(
      ([entry]) => {
        sceneViewportActiveRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (!sceneViewportActiveRef.current) {
          list.classList.remove(styles.rackFocusActive);
        }
      },
      { threshold: [0, 0.35, 0.7] },
    );

    focusViewportObserver.observe(list);

    const handleWindowPointerMove = (event: PointerEvent) => {
      const centers = cardCentersRef.current;
      if (
        !sceneReadyRef.current
        || !sceneViewportActiveRef.current
        || focusTourActiveRef.current
        || event.pointerType === "touch"
        || centers.length === 0
      ) return;

      cancelFocusTour();
      list.classList.add(styles.rackFocusActive);
      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const liveCenters = cardRefs.current.flatMap((card) => {
        if (!card) return [];
        const bounds = card.getBoundingClientRect();
        return [bounds.left + bounds.width / 2];
      });
      const firstLiveCenter = liveCenters[0];
      const lastLiveCenter = liveCenters[liveCenters.length - 1];

      if (
        firstLiveCenter === undefined
        || lastLiveCenter === undefined
        || lastLiveCenter <= firstLiveCenter
      ) return;

      const liveMidpoint = (firstLiveCenter + lastLiveCenter) / 2;
      const interactionSpan = (lastLiveCenter - firstLiveCenter) * DESKTOP_FOCUS_INPUT_SCALE;
      const interactionStart = liveMidpoint - interactionSpan / 2;
      const interactionEnd = liveMidpoint + interactionSpan / 2;
      const pointerX = Math.min(interactionEnd, Math.max(interactionStart, event.clientX));
      const progress = (pointerX - interactionStart) / interactionSpan;

      moveFocusTo(firstCenter + (lastCenter - firstCenter) * progress);
    };

    const handleMobileScroll = () => {
      if (
        window.matchMedia("(min-width: 641px)").matches
        || !sceneReadyRef.current
        || !sceneViewportActiveRef.current
      ) return;

      const centers = cardCentersRef.current;
      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const maxScroll = list.scrollWidth - list.clientWidth;

      if (
        firstCenter === undefined
        || lastCenter === undefined
        || maxScroll <= 0
      ) return;

      cancelFocusTour();
      list.classList.add(styles.rackFocusActive);
      const progress = Math.min(1, Math.max(0, list.scrollLeft / maxScroll));
      moveFocusTo(firstCenter + (lastCenter - firstCenter) * progress);
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    list.addEventListener("scroll", handleMobileScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      resizeObserver.disconnect();
      sceneObserver.disconnect();
      focusViewportObserver.disconnect();
      window.removeEventListener("pointermove", handleWindowPointerMove);
      list.removeEventListener("scroll", handleMobileScroll);
      cancelFocusTour();
      if (sceneTimeoutRef.current !== null) {
        window.clearTimeout(sceneTimeoutRef.current);
        sceneTimeoutRef.current = null;
      }
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [cancelFocusTour, completeScene, measureCards, moveFocusTo]);

  return (
    <ol
      ref={listRef}
      className={`${styles.infrastructureProof} ${styles.infrastructureScenePending}`}
    >
      {items.map(([number, title, copy], index) => {
        const initialFocus = focusValues(index * 96);
        const cardStyle: FocusCardStyle = {
          "--card-index": index,
          "--focus-blur": `${initialFocus.blur.toFixed(2)}px`,
          "--focus-opacity": initialFocus.opacity,
          "--scene-delay": `${260 + index * 150}ms`,
        };

        return (
          <li
            ref={(card) => {
              cardRefs.current[index] = card;
            }}
            key={number}
            style={cardStyle}
            tabIndex={0}
            onFocus={() => {
              if (!sceneReadyRef.current) return;
              cancelFocusTour();
              const center = cardCentersRef.current[index];
              if (center !== undefined) moveFocusTo(center);
            }}
          >
            <span>{number}</span>
            <div><h3>{title}</h3><p className="worktree-type-body">{copy}</p></div>
          </li>
        );
      })}
    </ol>
  );
}
