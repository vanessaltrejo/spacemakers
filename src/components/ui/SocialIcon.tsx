import type { SocialNetwork } from "@/types/content";

interface SocialIconProps {
  network: SocialNetwork;
  className?: string;
}

const iconPaths: Record<SocialNetwork, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  facebook:
    "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
};

/** Brand-colored logos: Instagram gradient, Facebook blue, YouTube red. */
export function SocialIcon({ network, className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {network === "instagram" && (
        <>
          <defs>
            <linearGradient id="instagram-gradient" x1="3" y1="22" x2="21" y2="2" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#feda75" />
              <stop offset="0.25" stopColor="#fa7e1e" />
              <stop offset="0.5" stopColor="#d62976" />
              <stop offset="0.75" stopColor="#962fbf" />
              <stop offset="1" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <path d={iconPaths.instagram} fill="url(#instagram-gradient)" />
        </>
      )}
      {network === "facebook" && (
        <>
          <circle cx="12" cy="12" r="11" fill="#fff" />
          <path d={iconPaths.facebook} fill="#1877f2" />
        </>
      )}
      {network === "youtube" && (
        <>
          <path d="M9.6 8.4v7.2l6.2-3.6z" fill="#fff" />
          <path d={iconPaths.youtube} fill="#ff0000" />
        </>
      )}
    </svg>
  );
}
