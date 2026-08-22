"use client";

import { Canvas } from "@react-three/fiber";
import type { ComponentType } from "react";
import { GlasswakeLungScene } from "@/components/prism-wave/scenes/prism-wave-scene-glasswake-lung";
import { PrismWaveSceneV1 } from "@/components/prism-wave/scenes/prism-wave-scene-v1";
import { PrismWaveSceneV2 } from "@/components/prism-wave/scenes/prism-wave-scene-v2";
import styles from "./prism-wave-hero.module.css";

export type PrismWaveSceneVersion = "glasswake-lung" | "v1" | "v2";

const scenes = {
  "glasswake-lung": GlasswakeLungScene,
  v1: PrismWaveSceneV1,
  v2: PrismWaveSceneV2,
} satisfies Record<PrismWaveSceneVersion, ComponentType>;

type PrismWaveHeroProps = {
  version?: PrismWaveSceneVersion;
};

export function PrismWaveHero({ version = "glasswake-lung" }: PrismWaveHeroProps) {
  const Scene = scenes[version];

  return (
    <div aria-hidden="true" className={styles.root} data-wave-surface={`prism-r3f-${version}`}>
      <div className={styles.canvasShell}>
        <div className={styles.canvas}>
          <Canvas
            camera={{ fov: 38, near: 0.1, far: 80, position: [0, 1.1, 12.5] }}
            dpr={[1, 1.6]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <Scene />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
