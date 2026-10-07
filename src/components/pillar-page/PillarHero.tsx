import Image from "next/image";
import Link from "next/link";
import { toneStyles } from "@/components/pillars/toneStyles";
import { Reveal } from "@/components/ui/Reveal";
import type { Pillar, PillarSpec } from "@/types/content";

interface PillarHeroProps {
  pillar: Pillar;
  tagline: string;
  facts: PillarSpec[];
}

export function PillarHero({ pillar, tagline, facts }: PillarHeroProps) {
  const tone = toneStyles[pillar.tone];

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Soft wash in the pillar color */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b ${tone.tint} to-transparent`}
      />

      <div className="container-page relative grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label-mono flex flex-wrap items-center gap-x-3 text-mist">
              <Link href="/" className="transition-colors hover:text-gold">
                Inicio
              </Link>
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
              <span className={`flex items-center gap-2 ${tone.text}`}>
                <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.background}`} />
                Pilar {pillar.index} · {pillar.category}
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-light tracking-[-0.045em] text-gold sm:text-6xl lg:text-7xl">
              {pillar.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-starlight/80 sm:text-xl">{tagline}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} offset={40} className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden border border-line">
            <Image
              src={pillar.image.src}
              alt={pillar.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span aria-hidden="true" className={`absolute top-0 left-0 h-0.5 w-16 ${tone.background}`} />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.25} className="container-page relative mt-12 pb-4 lg:mt-16">
        <dl className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-r border-b border-line bg-void p-5">
              <dt className="label-mono text-mist">{fact.label}</dt>
              <dd className="mt-2 text-lg font-light tracking-tight text-starlight">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
