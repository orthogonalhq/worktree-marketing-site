"use client";

import { useEffect, useRef } from "react";

const DISCORD_SYMBOL_PATH =
  "M40.575 0C39.9562 1.09866 39.4006 2.2352 38.8954 3.397C34.0967 2.67719 29.2096 2.67719 24.3982 3.397C23.9057 2.2352 23.3374 1.09866 22.7186 0C18.2104 0.770324 13.8157 2.12155 9.64839 4.02841C1.38951 16.2652 -0.845688 28.1863 0.265599 39.9432C5.10222 43.517 10.5197 46.2447 16.2909 47.9874C17.5916 46.2447 18.7407 44.3883 19.7257 42.4562C17.8568 41.7616 16.0509 40.8903 14.3208 39.88C14.7755 39.5517 15.2175 39.2107 15.6468 38.8824C25.7873 43.6559 37.5316 43.6559 47.6847 38.8824C48.1141 39.236 48.5561 39.577 49.0107 39.88C47.2806 40.9029 45.4748 41.7616 43.5931 42.4688C44.5781 44.4009 45.7273 46.2573 47.028 48C52.7991 46.2573 58.2167 43.5422 63.0533 39.9684C64.3666 26.3299 60.8055 14.5099 53.6452 4.04104C49.4905 2.13418 45.0959 0.782952 40.5876 0.0252565L40.575 0ZM21.1401 32.7072C18.0209 32.7072 15.4321 29.8785 15.4321 26.3804C15.4321 22.8824 17.9199 20.041 21.1275 20.041C24.3351 20.041 26.886 22.895 26.8354 26.3804C26.7849 29.8658 24.3224 32.7072 21.1401 32.7072ZM42.1788 32.7072C39.047 32.7072 36.4834 29.8785 36.4834 26.3804C36.4834 22.8824 38.9712 20.041 42.1788 20.041C45.3864 20.041 47.9246 22.895 47.8741 26.3804C47.8236 29.8658 45.3611 32.7072 42.1788 32.7072Z";

const DISCORD_GRAIN_PALETTE = [
  [79, 92, 226],
  [88, 101, 242],
  [96, 108, 243],
  [103, 114, 239],
  [110, 121, 246],
] as const;

interface CommunityDensityLogoProps {
  className?: string;
}

export function CommunityDensityLogo({ className }: CommunityDensityLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let imageData: ImageData;
    let pixels: Uint8ClampedArray;
    let densityMap: Float32Array;
    let lastDrawTime = 0;

    const discordPath = new Path2D(DISCORD_SYMBOL_PATH);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frameInterval = 1000 / 15;

    function seedPixel(pixelIndex: number, time = 0) {
      const density = densityMap[pixelIndex] ?? 0;
      const breath = (Math.sin(time / 120000 * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      const popAlphaMin = 92 + 14 * breath;
      const popAlphaMax = 210 + 20 * breath;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      const neighboringPixels = [
        x > 0 ? pixelIndex - 1 : -1,
        x < width - 1 ? pixelIndex + 1 : -1,
        y > 0 ? pixelIndex - width : -1,
        y < height - 1 ? pixelIndex + width : -1,
      ];
      const hasBrightNeighbor = neighboringPixels.some(
        (neighbor) => neighbor >= 0 && pixels[neighbor * 4 + 3] > 64,
      );
      const allowsSmallCluster = hasBrightNeighbor && Math.random() < 0.16;
      const isPop = (!hasBrightNeighbor || allowsSmallCluster)
        && Math.random() < density * density * 0.5;
      const dataIndex = pixelIndex * 4;

      if (isPop) {
        const color = DISCORD_GRAIN_PALETTE[
          Math.floor(Math.random() * DISCORD_GRAIN_PALETTE.length)
        ] ?? DISCORD_GRAIN_PALETTE[1];
        pixels[dataIndex] = color[0];
        pixels[dataIndex + 1] = color[1];
        pixels[dataIndex + 2] = color[2];
        pixels[dataIndex + 3] = popAlphaMin + Math.random() * (popAlphaMax - popAlphaMin);
        return;
      }

      pixels[dataIndex] = 224;
      pixels[dataIndex + 1] = 227;
      pixels[dataIndex + 2] = 255;
      pixels[dataIndex + 3] = 0;
    }

    function resize() {
      width = 80;
      height = 60;
      canvas!.width = width;
      canvas!.height = height;

      imageData = context!.createImageData(width, height);
      pixels = imageData.data;
      densityMap = new Float32Array(width * height);

      const densityCanvas = document.createElement("canvas");
      densityCanvas.width = width;
      densityCanvas.height = height;
      const densityContext = densityCanvas.getContext("2d");
      if (!densityContext) return;

      const scale = Math.min(width / 64, height / 48) * 0.78;
      const offsetX = (width - 64 * scale) / 2;
      const offsetY = (height - 48 * scale) / 2;

      densityContext.save();
      densityContext.translate(offsetX, offsetY);
      densityContext.scale(scale, scale);
      densityContext.fillStyle = "rgba(255,255,255,0.34)";
      densityContext.filter = `blur(${Math.max(1.5, 3 / scale)}px)`;
      densityContext.fill(discordPath);
      densityContext.restore();

      densityContext.save();
      densityContext.translate(offsetX, offsetY);
      densityContext.scale(scale, scale);
      densityContext.fillStyle = "white";
      densityContext.fill(discordPath);
      densityContext.restore();

      const densityPixels = densityContext.getImageData(0, 0, width, height).data;
      for (let index = 0; index < densityMap.length; index += 1) {
        densityMap[index] = densityPixels[index * 4 + 3] / 255;
        seedPixel(index);
      }
      context!.putImageData(imageData, 0, 0);
    }

    function draw(time: number) {
      if (visible && time - lastDrawTime >= frameInterval) {
        lastDrawTime = time;
        const totalPixels = densityMap.length;
        const breath = (Math.sin(time / 120000 * Math.PI * 2 - Math.PI / 2) + 1) / 2;
        const churnRate = 0.08 + 0.1 * breath;
        const pixelsToUpdate = Math.floor(totalPixels * churnRate);

        for (let count = 0; count < pixelsToUpdate; count += 1) {
          seedPixel(Math.floor(Math.random() * totalPixels), time);
        }
        context!.putImageData(imageData, 0, 0);
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);

    resize();
    if (!reducedMotion) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <span className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </span>
  );
}
