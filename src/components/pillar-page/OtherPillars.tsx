import Link from "next/link";
import { toneStyles } from "@/components/pillars/toneStyles";
import { Reveal } from "@/components/ui/Reveal";
import type { Pillar } from "@/types/content";

interface OtherPillarsProps {
  pillars: Pillar[];
}

/** Links to the remaining pillar pages, so the three stay one click apart. */
export function OtherPillars({ pillars }: OtherPillarsProps) {
  return (
    <section aria-labelledby="other-pillars-title" className="container-page pt-20 pb-24 lg:pt-28 lg:pb-32">
      <h2 id="other-pillars-title" className="label-mono text-mist">
        Sigue explorando
      </h2>

      <div className="mt-6 grid border-t border-l border-line sm:grid-cols-2">
        {pillars.map((pillar, index) => {
          const tone = toneStyles[pillar.tone];
          return (
            <Reveal key={pillar.id} delay={index * 0.1} className="border-r border-b border-line bg-void">
              <Link href={`/${pillar.slug}`} className="group flex items-center justify-between gap-6 p-6 lg:p-8">
                <span>
                  <span className={`label-mono flex items-center gap-2 ${tone.text}`}>
                    <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.background}`} />
                    {pillar.category}
                  </span>
                  <span className={`mt-3 block text-2xl font-normal tracking-tight ${tone.text}`}>{pillar.title}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-current/50 transition-transform duration-300 group-hover:translate-x-1 ${tone.text}`}
                >
                  →
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
