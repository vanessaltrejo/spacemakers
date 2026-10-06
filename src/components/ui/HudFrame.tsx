import type { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
  className?: string;
  /** Tailwind border-color class for the corner brackets. */
  cornerClassName?: string;
}

const corners = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

/** Wraps content with four "targeting" corner brackets, like a HUD viewfinder. */
export function HudFrame({ children, className = "", cornerClassName = "border-gold/70" }: HudFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 size-4 ${position} ${cornerClassName}`}
        />
      ))}
    </div>
  );
}
