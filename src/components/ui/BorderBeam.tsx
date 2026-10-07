"use client";

import { motion, useReducedMotion } from "motion/react";

interface BorderBeamProps {
  /** Seconds per full lap around the border. */
  duration?: number;
  /** Length of the beam in px. */
  size?: number;
  /** Tailwind gradient stops for the beam (from-… via-…). */
  colorClassName?: string;
}

/** A light that travels around the border of its (relative, rounded) parent. */
export function BorderBeam({
  duration = 8,
  size = 100,
  colorClassName = "from-gold via-nebula",
}: BorderBeamProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={`absolute aspect-square bg-gradient-to-l to-transparent ${colorClassName}`}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        initial={{ offsetDistance: "0%" }}
        animate={reduceMotion ? undefined : { offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </div>
  );
}
