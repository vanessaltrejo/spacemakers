import type { Partner } from "@/types/content";

interface PartnersMarqueeProps {
  partners: Partner[];
}

/** Infinite, edge-faded ticker of allied institutions. Pauses on hover. */
export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...partners, ...partners];
  const separatorColors = ["text-nebula", "text-ember", "text-orbit-bright", "text-lime"] as const;

  return (
    <section aria-labelledby="partners-title" className="border-y border-line">
      <div className="container-page flex items-center gap-8 py-6">
        <h2 id="partners-title" className="label-mono hidden shrink-0 items-center gap-2 text-mist md:flex">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-nebula" />
          Aliados &amp; competencias
        </h2>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {loop.map((partner, index) => (
              <li
                key={`${partner.id}-${index}`}
                aria-hidden={index >= partners.length}
                className="flex items-center text-lg font-light tracking-tight whitespace-nowrap text-starlight/40 transition-colors duration-300 hover:text-gold sm:text-xl"
              >
                {partner.name}
                <span
                  aria-hidden="true"
                  className={`mx-10 font-mono text-xs ${separatorColors[index % separatorColors.length]}`}
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
