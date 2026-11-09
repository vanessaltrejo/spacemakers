import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import type { AccentTone, Partner } from "@/types/content";

interface ProjectPartnersProps {
  partners: Partner[];
  tone: AccentTone;
}

/** Logos of the partners involved in the project; leads to Colaboraciones. */
export function ProjectPartners({ partners, tone }: ProjectPartnersProps) {
  if (partners.length === 0) return null;

  return (
    <Section id="project-partners" title="Aliados" tone={tone}>
      <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner) => (
          <li key={partner.id} className="flex h-28 items-center justify-center border border-line bg-hull-soft p-5">
            {partner.logo ? (
              <Image src={partner.logo.src} alt={partner.logo.alt} width={partner.logo.width} height={partner.logo.height} className="max-h-14 w-auto max-w-full" />
            ) : (
              <span className="text-center text-caption text-starlight">{partner.name}</span>
            )}
          </li>
        ))}
      </ul>
      <Link href="/ciencia#colaboraciones" className="mt-4 inline-block text-caption text-mist transition-colors hover:text-gold">
        Todas las colaboraciones →
      </Link>
    </Section>
  );
}
