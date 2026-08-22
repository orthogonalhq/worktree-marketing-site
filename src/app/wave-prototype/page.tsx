import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Wave Prototype | Worktree",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WavePrototypePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Wave prototype</h1>
      <iframe
        className={styles.frame}
        src="/vendor/wave-prototype/index.html"
        title="Animated wave prototype"
      />
    </main>
  );
}
