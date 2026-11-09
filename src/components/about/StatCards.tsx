import { toneStyles } from "@/components/pillars/toneStyles";
import type { Stat } from "@/types/content";

interface StatCardsProps {
  stats: Stat[];
}

/** Grid of large figures, each tinted with its own accent color. */
export function StatCards({ stats }: StatCardsProps) {
  return (
    <dl className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const tone = toneStyles[stat.tone];
        return (
          <div key={stat.id} className="relative flex flex-col overflow-hidden border-r border-b border-line p-5 lg:p-6">
            <span aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.tint} via-transparent to-transparent`} />
            <span aria-hidden="true" className={`absolute top-0 left-0 h-0.5 w-12 ${tone.background}`} />
            <dt className={`label-mono relative order-1 ${tone.text}`}>{stat.label}</dt>
            <dd className="relative order-2 mt-6 text-6xl font-light tracking-[-0.04em] text-starlight lg:text-7xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </dd>
            <dd className="relative order-3 mt-4 max-w-[30ch] text-caption text-mist">{stat.description}</dd>
          </div>
        );
      })}
    </dl>
  );
}
