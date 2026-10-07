import Image from "next/image";
import type { Partner } from "@/types/content";

interface PartnersMarqueeProps {
  partners: Partner[];
}

/**
 * Infinite, edge-faded ticker of allied institutions. Pauses on hover.
 * Logos sit on the black page. Those whose original colors vanish on black (Kyutech wordmark,
 * AEM greys, URC outline) were recolored in /public/logos; the rest are untouched.
 */
/**
 * The track holds 2 × SETS_PER_HALF copies of the partner list and slides by exactly half of
 * its width, so the loop is seamless. Each half must be wider than the viewport, otherwise a
 * gap shows up before the loop restarts; 4 copies cover screens of several thousand pixels.
 */
const SETS_PER_HALF = 4;

export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const loop = Array.from({ length: SETS_PER_HALF * 2 }, () => partners).flat();
  const separatorColors = ["text-nebula", "text-ember", "text-orbit-bright", "text-lime"] as const;

  return (
    <section aria-labelledby="partners-title" className="border-y border-line">
      <h2 id="partners-title" className="sr-only">
        Aliados y competencias
      </h2>
      <div className="py-6">
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center [animation-duration:150s] group-hover:[animation-play-state:paused]">
            {loop.map((partner, index) => (
              <li key={`${partner.id}-${index}`} aria-hidden={index >= partners.length} className="flex items-center">
                <span className="flex h-20 items-center">
                  {partner.logo ? (
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      className={partner.size === "large" ? "h-20 w-auto" : "h-14 w-auto"}
                    />
                  ) : (
                    <span className={`${partner.size === "large" ? "text-4xl" : "text-2xl"} font-light tracking-tight whitespace-nowrap text-starlight`}>{partner.name}</span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`mx-12 font-mono text-sm ${separatorColors[index % separatorColors.length]}`}
                >
                  ✦
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
