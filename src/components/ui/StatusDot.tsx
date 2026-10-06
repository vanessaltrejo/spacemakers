interface StatusDotProps {
  /** Tailwind background class, e.g. "bg-nebula". */
  colorClassName?: string;
}

/** Small pulsing "live" indicator. */
export function StatusDot({ colorClassName = "bg-lime" }: StatusDotProps) {
  return (
    <span aria-hidden="true" className="relative inline-flex size-1.5">
      <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${colorClassName}`} />
      <span className={`relative size-1.5 rounded-full ${colorClassName}`} />
    </span>
  );
}
