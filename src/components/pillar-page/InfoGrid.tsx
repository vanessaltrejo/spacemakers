import { toneStyles } from "@/components/pillars/toneStyles";
import { Section } from "@/components/ui/Section";
import type { AccentTone, InfoSectionContent } from "@/types/content";

interface InfoGridProps {
  content: InfoSectionContent;
  id: string;
  tone: AccentTone;
}

/** Cards of titled entries (missions, subsystems, people...). */
export function InfoGrid({ content, id, tone }: InfoGridProps) {
  const toneStyle = toneStyles[tone];

  return (
    <Section id={id} title={content.heading} description={content.intro} tone={tone}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {content.items.map((item) => (
          <div key={item.title} className="relative border border-line bg-hull-soft p-5">
            <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${toneStyle.background}`} />
            <h3 className={`text-h2 ${toneStyle.text}`}>{item.title}</h3>
            <p className="mt-3 text-caption text-starlight/85">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
