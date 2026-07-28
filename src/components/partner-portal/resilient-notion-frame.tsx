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

type ProbeStatus = "pending" | "succeeded" | "failed";

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
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [frameErrored, setFrameErrored] = useState(false);
  const [probeStatus, setProbeStatus] = useState<ProbeStatus>("pending");
  const [timedOut, setTimedOut] = useState(false);
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
    setFrameLoaded(false);
    setFrameErrored(false);
    setProbeStatus("pending");
    setTimedOut(false);
    setManualRevision((current) => Math.max(Date.now(), (current ?? 0) + 1));
  }, []);
  const frameHealthy =
    frameLoaded && !frameErrored && probeStatus === "succeeded";
  const showRecovery =
    !frameHealthy && (frameErrored || probeStatus === "failed" || timedOut);

  useEffect(() => {
    if (!frameUrl || frameHealthy) return;

    const recoveryTimer = window.setTimeout(() => {
      setTimedOut(true);
    }, 8000);

    return () => window.clearTimeout(recoveryTimer);
  }, [frameHealthy, frameUrl]);

  useEffect(() => {
    if (!frameUrl) return;

    const controller = new AbortController();

    void fetch(frameUrl, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(() => {
        setProbeStatus("succeeded");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setProbeStatus("failed");
        }
      });

    return () => controller.abort();
  }, [frameUrl]);

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
            onError={() => setFrameErrored(true)}
            onLoad={() => {
              setLoading(false);
              setFrameLoaded(true);
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
