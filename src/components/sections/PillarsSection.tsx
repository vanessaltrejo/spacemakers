"use client";

import { useCallback, useState } from "react";
import { PillarCard } from "@/components/pillars/PillarCard";
import { PillarDialog } from "@/components/pillars/PillarDialog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Pillar } from "@/types/content";

interface PillarsSectionProps {
  pillars: Pillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const closeDialog = useCallback(() => setSelectedPillar(null), []);

  return (
    <section aria-labelledby="pillars-heading" className="container-page py-16 lg:py-20">
      <SectionHeading id="pillars-heading">Ingeniería de Vanguardia</SectionHeading>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-10">
        {pillars.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={pillar} order={index} onSelect={setSelectedPillar} />
        ))}
      </div>

      <PillarDialog pillar={selectedPillar} onClose={closeDialog} />
    </section>
  );
}
