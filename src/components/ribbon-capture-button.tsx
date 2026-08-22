"use client";

import { useState } from "react";
import styles from "./ribbon-capture-button.module.css";

type RibbonCaptureButtonProps = {
  frameName: string;
  outputHeight?: number;
  outputWidth?: number;
};

type CaptureState = "idle" | "capturing" | "saved" | "error";

type CanvasPoint = { x: number; y: number };
type CanvasQuad = { p1: CanvasPoint; p2: CanvasPoint; p4: CanvasPoint };

function measureTransformedCanvas(source: HTMLCanvasElement): CanvasQuad | null {
  const parent = source.parentElement;
  if (!parent || source.offsetWidth <= 0 || source.offsetHeight <= 0) return null;

  const points = [
    [source.offsetLeft, source.offsetTop],
    [source.offsetLeft + source.offsetWidth, source.offsetTop],
    [source.offsetLeft, source.offsetTop + source.offsetHeight],
  ] as const;
  const probes = points.map(([left, top]) => {
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:0;height:0;pointer-events:none;`;
    parent.appendChild(probe);
    return probe;
  });

  const measured = probes.map((probe) => {
    const bounds = probe.getBoundingClientRect();
    return { x: bounds.left, y: bounds.top };
  });
  probes.forEach((probe) => probe.remove());

  return { p1: measured[0], p2: measured[1], p4: measured[2] };
}

function waitForRenderedFrame(frameDocument: Document) {
  return new Promise<Document>((resolve, reject) => {
    const startedAt = performance.now();

    const inspect = () => {
      const canvas = frameDocument.querySelector("canvas");
      const ready = frameDocument.documentElement.dataset.ribbonRenderReady === "true";

      if (canvas && ready && canvas.width > 0 && canvas.height > 0) {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(frameDocument)));
        return;
      }

      if (performance.now() - startedAt > 15_000) {
        reject(new Error("The ribbon renderer did not become ready in time."));
        return;
      }

      requestAnimationFrame(inspect);
    };

    inspect();
  });
}

function renderFrameToPng(frameDocument: Document, width: number, height: number) {
  return new Promise<Blob>((resolve, reject) => {
    const source = frameDocument.querySelector("canvas");
    const stage = frameDocument.querySelector<HTMLElement>("[data-ribbon-shape]");

    if (!source || !stage) {
      reject(new Error("The clean ribbon frame is incomplete."));
      return;
    }

    const output = document.createElement("canvas");
    output.width = width;
    output.height = height;
    const context = output.getContext("2d");

    if (!context) {
      reject(new Error("Canvas capture is unavailable."));
      return;
    }

    const stageBounds = stage.getBoundingClientRect();
    const sourceQuad = measureTransformedCanvas(source);

    if (!sourceQuad || stageBounds.width <= 0 || stageBounds.height <= 0) {
      reject(new Error("The browser could not resolve the transformed ribbon frame."));
      return;
    }

    const outputScaleX = width / stageBounds.width;
    const outputScaleY = height / stageBounds.height;
    const transformA = ((sourceQuad.p2.x - sourceQuad.p1.x) / source.width) * outputScaleX;
    const transformB = ((sourceQuad.p2.y - sourceQuad.p1.y) / source.width) * outputScaleY;
    const transformC = ((sourceQuad.p4.x - sourceQuad.p1.x) / source.height) * outputScaleX;
    const transformD = ((sourceQuad.p4.y - sourceQuad.p1.y) / source.height) * outputScaleY;
    const transformE = (sourceQuad.p1.x - stageBounds.left) * outputScaleX;
    const transformF = (sourceQuad.p1.y - stageBounds.top) * outputScaleY;

    context.clearRect(0, 0, width, height);
    context.setTransform(transformA, transformB, transformC, transformD, transformE, transformF);
    context.drawImage(source, 0, 0);
    context.resetTransform();

    const pixels = context.getImageData(0, 0, width, height).data;
    let visiblePixels = 0;
    for (let index = 3; index < pixels.length; index += 4) {
      if (pixels[index] > 4) visiblePixels += 1;
    }

    if (visiblePixels < width * height * 0.002) {
      reject(new Error("The renderer returned an empty capture. Nothing was saved."));
      return;
    }

    output.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("The browser could not encode the capture."));
    }, "image/png");
  });
}

export function RibbonCaptureButton({
  frameName,
  outputHeight = 1200,
  outputWidth = 960,
}: RibbonCaptureButtonProps) {
  const [state, setState] = useState<CaptureState>("idle");
  const [savedSequence, setSavedSequence] = useState<string | null>(null);

  async function capture() {
    setState("capturing");

    try {
      const frameDocument = await waitForRenderedFrame(document);
      const image = await renderFrameToPng(frameDocument, outputWidth, outputHeight);
      const body = new FormData();
      body.append("frame", frameName);
      body.append("image", image, `${frameName}.png`);
      const response = await fetch("/api/ribbon-capture", { body, method: "POST" });

      if (!response.ok) {
        throw new Error("The captured frame could not be saved.");
      }

      const result = await response.json() as { path: string };
      const savedFilename = result.path.split("/").at(-1) ?? "";
      setSavedSequence(savedFilename.split("-")[0] ?? null);
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  const label = state === "capturing"
    ? "Capturing…"
    : state === "saved"
      ? `Saved ${savedSequence ?? "WebP"}`
      : state === "error"
        ? "Capture failed · Retry"
        : "Capture WebP";

  return (
    <button
      className={`${styles.button} ${state === "saved" ? styles.saved : ""} ${state === "error" ? styles.error : ""}`}
      disabled={state === "capturing"}
      onClick={capture}
      type="button"
    >
      {label}
    </button>
  );
}
