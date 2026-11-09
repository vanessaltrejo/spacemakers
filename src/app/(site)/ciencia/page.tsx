import type { Metadata } from "next";
import Image from "next/image";
import { ResearchList } from "@/components/science/ResearchList";
import { toneCycle, toneStyles } from "@/components/pillars/toneStyles";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { getCollaborations, getResearch, getSiteInfo } from "@/services/contentService";

export const metadata: Metadata = {
  title: "Ciencia y Colabs | Space Makers",
  description: "Lo que investigamos en Space Makers y las universidades, agencias y empresas con las que lo hacemos posible.",
};

export default async function ScienceAndCollabsPage() {
  const [items, collabs, site] = await Promise.all([getResearch(), getCollaborations(), getSiteInfo()]);
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Colaboración con Space Makers")}`;
  const partnerCount = collabs.tiers.reduce((total, tier) => total + tier.partners.length, 0);

  return (
    <>
      <PageHeader
        title="Ciencia y Colabs"
        lead="Lo que investigamos y las personas e instituciones con quienes lo hacemos posible."
        tone="orbit"
        facts={[
          { value: String(items.length), label: "Estudios" },
          { value: String(partnerCount), label: "Aliados" },
          { value: String(collabs.cases.length), label: "En marcha" },
        ]}
      />

      <nav aria-label="En esta página" className="container-page mt-6 flex gap-6 text-caption">
        <a href="#ciencia" className="text-mist transition-colors hover:text-gold">
          Ciencia ↓
        </a>
        <a href="#colaboraciones" className="text-mist transition-colors hover:text-gold">
          Colaboraciones ↓
        </a>
      </nav>

      <Section plain id="ciencia" title="Ciencia" tone="orbit" description="Filtra por categoría.">
        <ResearchList items={items} />
      </Section>

      <Section plain id="colaboraciones" title="Colaboraciones" tone="lime" description={collabs.intro}>
        <div className="space-y-8">
          {collabs.tiers.map((tier) => (
            <div key={tier.id}>
              <p className="label-mono text-mist">{tier.title}</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-12 gap-y-6">
                {tier.partners.map((partner) => (
                  <li key={partner.id} className="flex h-16 items-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo.src}
                        alt={partner.logo.alt}
                        width={partner.logo.width}
                        height={partner.logo.height}
                        className="h-12 w-auto"
                      />
                    ) : (
                      <span className={`text-h2 ${partner.dummy ? "text-mist" : "text-starlight"}`}>{partner.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {collabs.cases.map((item, index) => {
            const tone = toneStyles[toneCycle[index % toneCycle.length]];
            return (
              <article key={item.id}>
                <div className="relative aspect-[16/10] overflow-hidden bg-cobalt">
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 28vw, 100vw" className="object-cover" />
                  <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t ${tone.wash} via-transparent to-transparent`} />
                </div>
                <p className={`label-mono mt-4 ${tone.text}`}>{item.partnerName}</p>
                <h3 className="mt-2 text-h2 leading-snug text-starlight">{item.title}</h3>
                <p className="mt-2 text-caption text-mist">{item.summary}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <h3 className="text-h2 text-starlight">Cómo colaborar</h3>
          <ul className="mt-5 grid gap-6 md:grid-cols-3">
            {collabs.howTo.modes.map((mode, index) => (
              <li key={mode.title} className={`border-l-2 pl-4 ${toneStyles[toneCycle[index % toneCycle.length]].border}`}>
                <p className="text-body text-starlight">{mode.title}</p>
                <p className="mt-1 text-caption text-mist">{mode.description}</p>
              </li>
            ))}
          </ul>
          <a
            href={mailto}
            className="mt-6 inline-flex h-10 items-center justify-center bg-cobalt px-6 text-caption font-medium text-white transition-colors hover:bg-[#1426c8]"
          >
            {collabs.howTo.ctaLabel}: {site.email}
          </a>
        </div>
      </Section>
      <div className="pb-14" />
    </>
  );
}
