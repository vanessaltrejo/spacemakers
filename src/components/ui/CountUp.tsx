"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Animates a number from 0 to `value` once it scrolls into view.
 * Uses a motion value so the count updates the DOM without re-rendering React.
 */
export function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const formattedCount = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: prefersReducedMotion ? 0 : 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [count, isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span aria-hidden="true">{formattedCount}</motion.span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
