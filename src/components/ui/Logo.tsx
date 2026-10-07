import Image from "next/image";

interface LogoProps {
  className?: string;
}

/** Official SpaceMakers wordmark (white, transparent background). Size it with `className` (height). */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logos/spacemakers.png"
      alt="SpaceMakers"
      width={1000}
      height={229}
      priority
      className={className}
    />
  );
}
