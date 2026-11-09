import { Section } from "@/components/ui/Section";
import type { AccentTone } from "@/types/content";

interface OverviewProps {
  paragraphs: string[];
  tone: AccentTone;
}

/** "Qué es": the first paragraph is the lead, the rest is supporting text. */
export function Overview({ paragraphs, tone }: OverviewProps) {
  return (
    <Section id="overview" title="Qué es" tone={tone}>
      <div className="max-w-3xl space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph} className={index === 0 ? "text-h2 leading-snug font-normal text-starlight" : "text-body text-mist"}>
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
