"use client";

import { useSyncExternalStore } from "react";

interface LiveClockProps {
  timeZone: string;
  className?: string;
}

const subscribe = (onTick: () => void) => {
  const intervalId = window.setInterval(onTick, 1000);
  return () => window.clearInterval(intervalId);
};

// Snapshot changes once per second; null on the server avoids hydration mismatches.
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

/** Ticking 24h clock for a given time zone (e.g. mission HQ local time). */
export function LiveClock({ timeZone, className }: LiveClockProps) {
  const epochSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const formatted =
    epochSeconds === null
      ? "--:--:--"
      : new Intl.DateTimeFormat("es-MX", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(epochSeconds * 1000);

  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {formatted}
    </time>
  );
}
