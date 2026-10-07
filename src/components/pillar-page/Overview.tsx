import { Reveal } from "@/components/ui/Reveal";

interface OverviewProps {
  paragraphs: string[];
}

export function Overview({ paragraphs }: OverviewProps) {
  return (
    <section aria-label="Resumen" className="container-page pt-16 lg:pt-24">
      <div className="max-w-3xl space-y-5">
        {paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} delay={index * 0.1}>
            <p className={index === 0 ? "text-2xl leading-snug font-light tracking-[-0.02em] text-starlight sm:text-3xl" : "leading-relaxed text-mist"}>
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
