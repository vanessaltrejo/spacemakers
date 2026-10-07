import { toneStyles } from "@/components/pillars/toneStyles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AccentTone, InfoSectionContent } from "@/types/content";

interface InfoGridProps {
  content: InfoSectionContent;
  tone: AccentTone;
  id: string;
}

/** Hairline grid of titled entries (missions, subsystems, people...). */
export function InfoGrid({ content, tone, id }: InfoGridProps) {
  const toneStyle = toneStyles[tone];

  return (
    <section aria-labelledby={id} className="container-page pt-20 lg:pt-28">
      <SectionHeader title={content.heading} titleId={id} description={content.intro} withRule={false} />

      {/* Borders live on the cells (not a gap-px trick) so an incomplete last row stays empty, not grey */}
      <div className="mt-8 grid border-t border-l border-line sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {content.items.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 0.08} className="relative border-r border-b border-line bg-void p-6 lg:p-8">
            <span aria-hidden="true" className={`absolute top-0 left-0 h-0.5 w-10 ${toneStyle.background}`} />
            {content.showIndex && (
              <p className={`label-mono ${toneStyle.text}`}>{String(index + 1).padStart(2, "0")}</p>
            )}
            <h3 className={`text-xl font-normal tracking-tight text-starlight ${content.showIndex ? "mt-4" : ""}`}>
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
