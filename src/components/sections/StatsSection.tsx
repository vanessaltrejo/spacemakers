import { toneStyles } from "@/components/pillars/toneStyles";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { Stat } from "@/types/content";

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section aria-label="Misión en números" className="container-page pt-8 pb-16 lg:pt-10 lg:pb-20">
      <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const tone = toneStyles[stat.tone];
          return (
            <Reveal key={stat.id} delay={index * 0.1} className="relative flex flex-col overflow-hidden bg-void p-5 lg:p-6">
              {/* Soft colored wash and short accent bar: color without noise */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.tint} via-transparent to-transparent`}
              />
              <span aria-hidden="true" className={`absolute top-0 left-0 h-0.5 w-12 ${tone.background}`} />

              <dt className="label-mono relative order-1 text-mist">
                <span className={tone.text}>{String(index + 1).padStart(2, "0")}</span> — {stat.label}
              </dt>
              <dd className="relative order-2 mt-6 text-6xl font-extralight tracking-[-0.05em] text-starlight lg:mt-8 lg:text-7xl">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
              <dd className="relative order-3 mt-4 max-w-[28ch] text-sm leading-relaxed text-mist">{stat.description}</dd>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}
