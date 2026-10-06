import { PillarCard } from "@/components/pillars/PillarCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Pillar } from "@/types/content";

interface PillarsSectionProps {
  pillars: Pillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  return (
    <section id="programas" aria-labelledby="pillars-title" className="container-page scroll-mt-14 py-24 lg:py-36">
      <SectionHeader title="Ingeniería de Vanguardia" titleId="pillars-title" withRule={false} />

      {/* gap-px over a line-colored background renders hairline dividers between cards */}
      <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-8 lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={pillar} order={index} />
        ))}
      </div>
    </section>
  );
}
