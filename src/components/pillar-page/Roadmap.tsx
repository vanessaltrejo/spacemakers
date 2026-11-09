import { toneStyles } from "@/components/pillars/toneStyles";
import { Section } from "@/components/ui/Section";
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

/** Steps side by side, like stages of a mission. */
export function Roadmap({ heading, steps, tone }: RoadmapProps) {
  const toneStyle = toneStyles[tone];

  return (
    <Section id="roadmap-title" title={heading} tone={tone}>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step) => {
          const isMuted = step.status === "tbc" || step.status === "upcoming";
          return (
            <li key={step.title} className={`relative border bg-hull-soft p-5 ${isMuted ? "border-line" : toneStyle.border}`}>
              <p className="label-mono text-mist">{step.when}</p>
              <h3 className="mt-3 text-h2 text-starlight">{step.title}</h3>
              <p className="mt-2 text-caption text-mist">{step.description}</p>
              <p className={`label-mono mt-4 ${isMuted ? "text-mist" : toneStyle.text}`}>{statusLabels[step.status]}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
