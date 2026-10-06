"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

/** Makes every motion component honor the user's "reduce motion" OS setting. */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
