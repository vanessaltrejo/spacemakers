interface OrbitMarkProps {
  className?: string;
}

/** Static orbit drawing (ellipses and a satellite dot). Takes its color from `currentColor`. */
export function OrbitMark({ className }: OrbitMarkProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="34" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="62" strokeWidth="0.8" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="96" ry="36" strokeWidth="1" transform="rotate(-24 100 100)" />
      <ellipse cx="100" cy="100" rx="96" ry="52" strokeWidth="0.7" opacity="0.5" transform="rotate(32 100 100)" />
      <circle cx="172" cy="68" r="5" fill="currentColor" stroke="none" />
      <circle cx="44" cy="136" r="3" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}
