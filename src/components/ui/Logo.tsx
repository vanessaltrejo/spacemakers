interface LogoProps {
  className?: string;
}

/** Vector version of the SpaceMakers wordmark (swoosh + SPACE / MAKERS). */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 72"
      className={className}
      role="img"
      aria-label="SpaceMakers"
      fill="currentColor"
    >
      <text
        x="120"
        y="38"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="38"
        letterSpacing="-2"
      >
        SPACE
      </text>
      <path d="M4 60 C 60 34, 180 30, 236 58 C 180 40, 70 42, 4 60 Z" />
      <text
        x="132"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="1"
      >
        MAKERS
      </text>
    </svg>
  );
}
