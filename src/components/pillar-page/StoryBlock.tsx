import { toneStyles } from "@/components/pillars/toneStyles";
import { Section } from "@/components/ui/Section";
import type { AccentTone, StorySectionContent } from "@/types/content";

interface StoryBlockProps {
  content: StorySectionContent;
  tone: AccentTone;
  id: string;
}

/** Narrative on the left, headline numbers on the right. */
export function StoryBlock({ content, tone, id }: StoryBlockProps) {
  const toneStyle = toneStyles[tone];

  return (
    <Section id={id} title={content.heading} tone={tone}>
      <div className="grid gap-6 xl:grid-cols-5 xl:gap-10">
        <div className="space-y-4 xl:col-span-3">
          {content.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "text-body text-starlight" : "text-body text-mist"}>
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-4 xl:col-span-2">
          {content.figures.map((figure) => (
            <div key={figure.label} className={`border border-line bg-gradient-to-br ${toneStyle.tint} to-transparent p-5`}>
              <dd className={`font-headline text-h2 ${toneStyle.text}`}>{figure.value}</dd>
              <dt className="label-mono mt-2 text-mist">{figure.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
