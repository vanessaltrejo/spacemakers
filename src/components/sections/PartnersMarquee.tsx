import type { Partner } from "@/types/content";

interface PartnersMarqueeProps {
  partners: Partner[];
}

/** Infinite, edge-faded ticker of allied institutions. Pauses on hover. */
export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...partners, ...partners];

  return (
    <section aria-label="Aliados" className="py-8">
      <h2 className="sr-only">Aliados y competencias</h2>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-20 group-hover:[animation-play-state:paused]">
          {loop.map((partner, index) => (
            <li
              key={`${partner.id}-${index}`}
              aria-hidden={index >= partners.length}
              className="font-display text-2xl whitespace-nowrap text-white/35 uppercase transition-colors duration-300 hover:text-gold sm:text-3xl"
            >
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
