"use client";

import { useEffect, useMemo, useState } from "react";

type ReviewQueueRow = {
  app: string;
  icon: string;
  text: string;
  flag: string;
};

function reviewPriority(flag: string) {
  if (flag === "urgent") return "urgent";
  if (["high", "flag"].includes(flag)) return "high";
  if (["medium", "review"].includes(flag)) return "medium";
  return "low";
}

function reviewTone(priority: string) {
  return ["urgent", "high"].includes(priority) ? "amber" : "muted";
}

function pickCycleRows(rows: ReviewQueueRow[], cycle: number, count: number) {
  if (rows.length <= count) return rows;

  return Array.from({ length: count }, (_, index) => {
    const itemIndex = (cycle * 3 + index * 5) % rows.length;
    return rows[itemIndex];
  });
}

export function ReviewQueue({ rows }: { rows: ReviewQueueRow[] }) {
  const items = useMemo(() => rows.filter(Boolean), [rows]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (items.length <= 4) return;

    const interval = window.setInterval(() => {
      setCursor((value) => (value + 1) % items.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const visibleRows = useMemo(() => {
    if (!items.length) return [];

    return Array.from({ length: Math.min(4, items.length) }, (_, index) => {
      const itemIndex = (cursor - index + items.length) % items.length;
      return items[itemIndex];
    });
  }, [cursor, items]);

  return (
    <>
      {visibleRows.map((row, rowIndex) => (
        (() => {
          const tag = reviewPriority(row.flag);
          const tone = reviewTone(tag);

          return (
        <span
          className={`manual-work-row manual-work-row-${rowIndex + 1}${rowIndex === 0 ? " manual-work-row-entering" : ""}`}
          key={rowIndex === 0 ? `${cursor}-${row.app}-${row.text}-${row.flag}` : `${row.app}-${row.text}-${row.flag}`}
          data-tag-tone={tone}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={row.icon} alt="" title={row.app} />
          <span className="manual-work-row-text">{row.text}</span>
          <em>{tag}</em>
        </span>
          );
        })()
      ))}
    </>
  );
}

export function ResearchSourceStack({ rows }: { rows: ReviewQueueRow[] }) {
  const items = useMemo(() => rows.filter(Boolean), [rows]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (items.length <= 4) return;

    const interval = window.setInterval(() => {
      setCycle((value) => value + 1);
    }, 7200);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const visibleRows = useMemo(() => pickCycleRows(items, cycle, 4), [cycle, items]);

  return (
    <>
      {visibleRows.map((row, rowIndex) => (
        <span className={`manual-work-row manual-work-row-${rowIndex + 1}`} key={`${cycle}-${row.app}-${row.text}-${row.flag}`} data-tag-tone="muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={row.icon} alt="" title={row.app} />
          <span className="manual-work-row-text">{row.text}</span>
          <em>api</em>
        </span>
      ))}
    </>
  );
}

export function AnalyzeSignalStack({ rows }: { rows: ReviewQueueRow[] }) {
  const items = useMemo(() => rows.filter(Boolean), [rows]);
  const [cursor, setCursor] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (items.length <= 4) return;

    const interval = window.setInterval(() => {
      setIsAnalyzing(true);

      window.setTimeout(() => {
        setCursor((value) => (value + 1) % items.length);
        setIsAnalyzing(false);
      }, 2300);
    }, 4600);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const visibleRows = useMemo(() => {
    if (!items.length) return [];

    return Array.from({ length: Math.min(4, items.length) }, (_, index) => {
      const itemIndex = (cursor + index) % items.length;
      return items[itemIndex];
    });
  }, [cursor, items]);

  return (
    <>
      {visibleRows.map((row, rowIndex) => (
        (() => {
          const isActive = rowIndex === 0 && isAnalyzing;
          const tag = isActive ? "analyzing" : "queue";
          const tone = isActive ? "blue" : "muted";

          return (
        <span
          className={`manual-work-row manual-work-row-${rowIndex + 1}${rowIndex === 0 && isAnalyzing ? " manual-work-row-analyzing" : ""}${rowIndex === visibleRows.length - 1 ? " manual-work-row-bottom-entering" : ""}`}
          key={rowIndex === visibleRows.length - 1 ? `${cursor}-${row.app}-${row.text}-${row.flag}` : `${row.app}-${row.text}-${row.flag}`}
          data-tag-tone={tone}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={row.icon} alt="" title={row.app} />
          <span className="manual-work-row-text">{row.text}</span>
          <em>{tag}</em>
        </span>
          );
        })()
      ))}
    </>
  );
}

export function DraftOutputStack({ rows }: { rows: ReviewQueueRow[] }) {
  const items = useMemo(() => rows.filter(Boolean), [rows]);
  const [batchStart, setBatchStart] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    if (items.length <= 4) return;

    const interval = window.setInterval(() => {
      setActiveIndex((value) => {
        if (value < 4) return value + 1;

        setIsReloading(true);

        window.setTimeout(() => {
          setBatchStart((start) => (start + 4) % items.length);
          setIsReloading(false);
        }, 320);

        return 0;
      });
    }, 2100);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const visibleRows = useMemo(() => {
    if (!items.length) return [];

    return Array.from({ length: Math.min(4, items.length) }, (_, index) => {
      const itemIndex = (batchStart + index) % items.length;
      return items[itemIndex];
    });
  }, [batchStart, items]);

  return (
    <div className={`manual-draft-batch${isReloading ? " manual-draft-batch-reloading" : ""}`} key={batchStart}>
      {visibleRows.map((row, rowIndex) => {
        const isReady = rowIndex < activeIndex;
        const isDrafting = rowIndex === activeIndex && activeIndex < visibleRows.length;
        const stateClass = isReady ? " manual-work-row-ready" : isDrafting ? " manual-work-row-drafting" : "";
        const status = isReady ? "ready" : isDrafting ? "drafting" : "queued";

        return (
          <span
            className={`manual-work-row manual-work-row-${rowIndex + 1}${stateClass}`}
            key={`${row.app}-${row.text}-${row.flag}`}
            data-tag-tone={isReady || isDrafting ? "green" : "muted"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={row.icon} alt="" title={row.app} />
            <span className="manual-work-row-text">{row.text}</span>
            <em>{status}</em>
          </span>
        );
      })}
    </div>
  );
}
