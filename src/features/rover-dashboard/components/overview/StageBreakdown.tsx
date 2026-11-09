import { stageOrder, type StageCounts, type TaskStage } from "@/features/rover-dashboard/lib/overviewMetrics";

export const stageMeta: Record<TaskStage, { label: string; barClass: string }> = {
  done: { label: "Terminadas", barClass: "bg-lime" },
  inProgress: { label: "En progreso", barClass: "bg-orbit-bright" },
  toDecide: { label: "Por decidir", barClass: "bg-gold" },
  notStarted: { label: "Por iniciar", barClass: "bg-white/25" },
};

interface StageBarProps {
  counts: StageCounts;
  total: number;
  className?: string;
}

/** Stacked horizontal bar: one segment per task stage, sized by share of the total. */
export function StageBar({ counts, total, className = "h-2" }: StageBarProps) {
  return (
    <div className={`flex w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      {stageOrder.map((stage) =>
        counts[stage] > 0 && total > 0 ? (
          <div
            key={stage}
            className={stageMeta[stage].barClass}
            style={{ width: `${(counts[stage] / total) * 100}%` }}
            title={`${stageMeta[stage].label}: ${counts[stage]}`}
          />
        ) : null,
      )}
    </div>
  );
}

interface StageBreakdownProps {
  counts: StageCounts;
  total: number;
}

/** Overall stage split: a stacked bar plus a legend with the exact counts. */
export function StageBreakdown({ counts, total }: StageBreakdownProps) {
  return (
    <div>
      <StageBar counts={counts} total={total} className="h-3" />
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {stageOrder.map((stage) => (
          <li key={stage} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 text-mist">
              <span aria-hidden="true" className={`size-2.5 rounded-full ${stageMeta[stage].barClass}`} />
              {stageMeta[stage].label}
            </span>
            <span className="font-bold text-cream tabular-nums">{counts[stage]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
