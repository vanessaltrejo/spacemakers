import { toneStyles } from "@/components/pillars/toneStyles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <section aria-labelledby={id} className="container-page pt-20 lg:pt-28">
      <SectionHeader title={content.heading} titleId={id} withRule={false} />

      <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-5 lg:col-span-7">
          {content.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.1}>
              <p className={index === 0 ? "text-lg leading-relaxed text-starlight/90" : "leading-relaxed text-mist"}>
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <dl className="grid grid-cols-2 border-t border-l border-line lg:col-span-5">
          {content.figures.map((figure, index) => (
            <Reveal key={figure.label} delay={index * 0.08} className="relative overflow-hidden border-r border-b border-line bg-void p-5 lg:p-6">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneStyle.tint} via-transparent to-transparent`}
              />
              <dd className="relative text-5xl font-extralight tracking-[-0.05em] text-starlight lg:text-6xl">
                {figure.value}
              </dd>
              <dt className={`label-mono relative mt-3 ${toneStyle.text}`}>{figure.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
