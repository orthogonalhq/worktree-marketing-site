import type { Metadata } from "next";
import { PrismWaveHero, type PrismWaveSceneVersion } from "@/components/prism-wave-hero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Prism Wave Prototype | Worktree",
  robots: {
    index: false,
    follow: false,
  },
};

type PrismWavePrototypePageProps = {
  searchParams: Promise<{
    scene?: string | string[];
  }>;
};

export default async function PrismWavePrototypePage({ searchParams }: PrismWavePrototypePageProps) {
  const { scene } = await searchParams;
  const version: PrismWaveSceneVersion = scene === "v1" || scene === "v2" ? scene : "glasswake-lung";

  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Prism wave prototype</h1>
      <div className={styles.stage}>
        <PrismWaveHero version={version} />
      </div>
    </main>
  );
}
