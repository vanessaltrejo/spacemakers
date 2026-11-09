import { ChevronRight } from "lucide-react";
import { StageBar } from "@/features/rover-dashboard/components/overview/StageBreakdown";
import type { GroupProgress } from "@/features/rover-dashboard/lib/overviewMetrics";

export interface GroupRow extends GroupProgress {
  label: string;
  /** Short tag shown before the label, e.g. the area code. */
  tag?: string;
}

interface GroupProgressListProps {
  rows: GroupRow[];
  onSelect: (key: string) => void;
}

/** One clickable row per group (area or phase): label, stage bar, average progress and overdue count. */
export function GroupProgressList({ rows, onSelect }: GroupProgressListProps) {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {rows.map((row) => (
        <li key={row.key}>
          <button
            type="button"
            onClick={() => onSelect(row.key)}
            className="group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3 text-left first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto_auto]"
          >
            <span className="flex min-w-0 items-center gap-2">
              {row.tag ? (
                <span className="shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 text-xs text-mist">{row.tag}</span>
              ) : null}
              <span className="truncate text-sm text-starlight transition-colors group-hover:text-gold">{row.label}</span>
            </span>
            <span className="order-last col-span-2 sm:order-none sm:col-span-1">
              <StageBar counts={row} total={row.total} />
            </span>
            <span className="flex items-baseline gap-3 text-sm tabular-nums">
              <span className="w-10 text-right font-bold text-cream">{row.progress}%</span>
              <span className="hidden w-16 text-right text-mist sm:inline">{row.total} tareas</span>
              <span className={`hidden w-20 text-right sm:inline ${row.overdue > 0 ? "text-mars" : "text-mist"}`}>
                {row.overdue} vencidas
              </span>
            </span>
            <ChevronRight className="size-4 text-mist transition-colors group-hover:text-gold max-sm:hidden" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
