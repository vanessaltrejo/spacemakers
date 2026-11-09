import { Section } from "@/components/ui/Section";
import type { AccentTone, SourceLink } from "@/types/content";

interface SourcesListProps {
  sources: SourceLink[];
  tone: AccentTone;
}

export function SourcesList({ sources, tone }: SourcesListProps) {
  if (sources.length === 0) return null;

  return (
    <Section id="sources-title" title="Fuentes" tone={tone}>
      <ul className="space-y-2 text-caption">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-starlight/80 underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold"
            >
              {source.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
