import Image from "next/image";
import { toneCycle, toneStyles } from "@/components/pillars/toneStyles";
import type { TimelineEntry } from "@/types/content";

interface HistoryTimelineProps {
  entries: TimelineEntry[];
}

/** Story of the group: one row per milestone, with the photo alternating sides. */
export function HistoryTimeline({ entries }: HistoryTimelineProps) {
  return (
    <section aria-labelledby="history" className="container-page pt-12 lg:pt-16">
      <h2 id="history" className="font-headline flex items-center gap-3 text-h2 text-gold">
        <span aria-hidden="true" className="size-2 shrink-0 bg-ember" />
        Historia
      </h2>
      <ol className="mt-8 space-y-12 lg:space-y-16">
        {entries.map((entry, index) => {
          const tone = toneStyles[toneCycle[index % toneCycle.length]];
          return (
            <li key={entry.title} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
              {entry.image && (
                <div className={`relative aspect-[16/10] overflow-hidden bg-cobalt lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={entry.image.src} alt={entry.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  <span aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${tone.wash} via-transparent to-transparent`} />
                </div>
              )}
              <div className="lg:col-span-6">
                <p className={`font-headline text-h1 ${tone.text}`}>{entry.when}</p>
                <h3 className="mt-3 text-h2 leading-snug text-starlight">{entry.title}</h3>
                <p className="mt-3 max-w-xl text-body text-mist">{entry.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
