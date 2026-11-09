import type { Metadata } from "next";
import Image from "next/image";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { StatCards } from "@/components/about/StatCards";
import { JoinCta } from "@/components/sections/JoinCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { getAboutContent } from "@/services/contentService";

export const metadata: Metadata = {
  title: "Nosotros | Space Makers",
  description: "La historia, la misión y el equipo de Space Makers, grupo estudiantil de innovación espacial del Tec de Monterrey.",
};

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <PageHeader title="Nosotros" tone="nebula" />

      <section aria-labelledby="who" className="container-page pt-12 lg:pt-16">
        <h2 id="who" className="sr-only">
          Quiénes somos
        </h2>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] leading-[1.15] font-light tracking-tight text-starlight">{about.statement}</p>
            <div className="mt-8 space-y-4 border-l border-nebula/70 pl-6">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-3xl text-body text-mist">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden lg:col-span-4 lg:aspect-auto lg:min-h-64">
            <Image src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-nebula/25 via-transparent to-cobalt/30" />
          </div>
        </div>

        <div className="mt-10">
          <StatCards stats={about.stats} />
        </div>
      </section>

      <HistoryTimeline entries={about.timeline} />

      <Section plain id="mission" title="Misión y visión" tone="orbit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-l-2 border-orbit-bright pl-5">
            <h3 className="label-mono text-orbit-bright">Misión</h3>
            <p className="mt-3 text-h2 leading-snug text-starlight">{about.mission}</p>
          </div>
          <div className="border-l-2 border-ember pl-5">
            <h3 className="label-mono text-ember">Visión</h3>
            <p className="mt-3 text-h2 leading-snug text-starlight">{about.vision}</p>
          </div>
        </div>
      </Section>

      <JoinCta content={about.recruitment} />
      <div className="pb-14" />
    </>
  );
}
