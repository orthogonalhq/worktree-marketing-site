"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "@/app/partners/portal.module.css";

const subscribeToPageLifecycle = () => () => {};
const browserPageRevision = () => String(performance.timeOrigin);
const serverPageRevision = () => null;

function normalizedEmbedUrl(src: string) {
  const url = new URL(src);
  url.pathname = url.pathname.replace(/^\/ebd\/+/, "/ebd/");
  return url;
}

export function ResilientNotionFrame({
  src,
}: {
  src: string;
}) {
  const pageRevision = useSyncExternalStore<string | null>(
    subscribeToPageLifecycle,
    browserPageRevision,
    serverPageRevision,
  );
  const [manualRevision, setManualRevision] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRecovery, setShowRecovery] = useState(false);
  const revision = manualRevision === null ? pageRevision : String(manualRevision);
  const directUrl = useMemo(() => normalizedEmbedUrl(src).toString(), [src]);
  const frameUrl = useMemo(() => {
    if (revision === null) return null;
    const url = normalizedEmbedUrl(src);
    url.searchParams.set("worktree_reload", String(revision));
    return url.toString();
  }, [revision, src]);
  const reloadDocument = useCallback(() => {
    setLoading(true);
    setShowRecovery(false);
    setManualRevision((current) => Math.max(Date.now(), (current ?? 0) + 1));
  }, []);

  useEffect(() => {
    if (!frameUrl || !loading) return;

    const recoveryTimer = window.setTimeout(() => {
      setShowRecovery(true);
    }, 8000);

    return () => window.clearTimeout(recoveryTimer);
  }, [frameUrl, loading]);

  useEffect(() => {
    const restoreFrame = (event: PageTransitionEvent) => {
      if (event.persisted) reloadDocument();
    };

    window.addEventListener("pageshow", restoreFrame);
    return () => window.removeEventListener("pageshow", restoreFrame);
  }, [reloadDocument]);

  return (
    <div className={styles.embedFrameShell}>
      <div className={styles.embedViewport}>
        {frameUrl ? (
          <iframe
            key={revision}
            className={styles.embedFrame}
            src={frameUrl}
            title="Worktree partner playbook"
            allow="clipboard-write; fullscreen"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setShowRecovery(true)}
            onLoad={() => {
              setLoading(false);
              setShowRecovery(false);
            }}
          />
        ) : null}
        {loading ? <div className={styles.embedLoading}>Loading partner playbook…</div> : null}
        {showRecovery ? (
          <div className={styles.embedRecovery} role="status">
            <span>Document is taking longer than expected.</span>
            <div className={styles.embedRecoveryActions}>
              <button type="button" onClick={reloadDocument}>
                Try again
              </button>
              <a href={directUrl} target="_blank" rel="noreferrer">
                Open directly ↗
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
