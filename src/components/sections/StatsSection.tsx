import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Stat } from "@/types/content";

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section aria-labelledby="stats-heading" className="container-page py-16 lg:py-20">
      <SectionHeading id="stats-heading">Misión en Números</SectionHeading>

      <dl className="mt-10 grid grid-cols-1 border-y border-white/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.id}
            delay={index * 0.12}
            className="flex flex-col gap-3 border-white/10 px-2 py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
          >
            <dt className="order-2 font-mono text-xs tracking-[0.2em] text-gold uppercase">{stat.label}</dt>
            <dd className="order-1 font-display text-6xl font-extralight text-white">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
            <dd className="order-3 text-sm leading-relaxed text-mist">{stat.description}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
