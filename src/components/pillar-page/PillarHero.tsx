import Image from "next/image";
import { toneStyles } from "@/components/pillars/toneStyles";
import { OrbitMark } from "@/components/ui/OrbitMark";
import type { Pillar, PillarSpec, ProjectStatus } from "@/types/content";

interface PillarHeroProps {
  pillar: Pillar;
  tagline: string;
  status: ProjectStatus;
  facts: PillarSpec[];
}

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Activo",
  development: "En desarrollo",
  planned: "En planeación",
};

/** Project opener: text and status on the left, photo on the right, key data as colored cells below. */
export function PillarHero({ pillar, tagline, status, facts }: PillarHeroProps) {
  const tone = toneStyles[pillar.tone];

  return (
    <section className="container-page pt-4 lg:pt-6">
      <div className={`relative overflow-hidden border border-line bg-gradient-to-br ${tone.tint} to-transparent`}>
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 z-10 h-1 ${tone.background}`} />
        <OrbitMark className={`pointer-events-none absolute -bottom-20 -left-20 size-80 opacity-25 ${tone.text}`} />
        <div className="relative grid lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-5 p-6 lg:col-span-5 lg:p-10">
            <p className={`label-mono ${tone.text}`}>{pillar.category}</p>
            <h1 className="font-headline text-h1 text-gold">{pillar.title}</h1>
            <p className="text-h2 leading-snug font-normal text-starlight">{tagline}</p>
            <p className={`label-mono inline-block self-start border px-3 py-1.5 ${tone.border} ${tone.text}`}>{statusLabels[status]}</p>
          </div>
          <div className="relative aspect-[16/10] bg-cobalt lg:col-span-7 lg:aspect-auto lg:min-h-[22rem]">
            <Image
              src={pillar.image.src}
              alt={pillar.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t ${tone.wash} via-transparent to-transparent`} />
          </div>
        </div>
        <dl className="relative grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-line p-5 sm:border-r sm:last:border-r-0 lg:border-b-0">
              <dt className="label-mono text-mist">{fact.label}</dt>
              <dd className={`mt-2 text-h2 ${tone.text}`}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
