import { toneStyles } from "@/components/pillars/toneStyles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AccentTone, RoadmapStatus, RoadmapStep } from "@/types/content";

interface RoadmapProps {
  heading: string;
  steps: RoadmapStep[];
  tone: AccentTone;
}

const statusLabels: Record<RoadmapStatus, string> = {
  done: "Completado",
  active: "En curso",
  upcoming: "Próximo",
  tbc: "Por confirmar",
};

export function Roadmap({ heading, steps, tone }: RoadmapProps) {
  const toneStyle = toneStyles[tone];

  return (
    <section aria-labelledby="roadmap-title" className="container-page pt-20 lg:pt-28">
      <SectionHeader title={heading} titleId="roadmap-title" withRule={false} />

      <ol className="mt-8 border-l border-line lg:mt-10">
        {steps.map((step, index) => {
          const isMuted = step.status === "tbc" || step.status === "upcoming";
          return (
            <Reveal key={step.title} delay={index * 0.1}>
              <li className="relative grid gap-2 pb-10 pl-8 last:pb-0 lg:grid-cols-12 lg:gap-8">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-4 ring-void ${
                    isMuted ? "border border-line-strong bg-void" : toneStyle.background
                  }`}
                />
                <p className="label-mono text-mist lg:col-span-3">{step.when}</p>
                <div className="lg:col-span-9">
                  <h3 className="text-xl font-normal tracking-tight text-starlight">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{step.description}</p>
                  <p className={`label-mono mt-3 ${isMuted ? "text-mist" : toneStyle.text}`}>
                    {statusLabels[step.status]}
                  </p>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
