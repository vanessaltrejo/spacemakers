import { shortDate } from "@/features/rover-dashboard/lib/format";
import {
  getTaskDeadline,
  getTaskId,
  getTaskPriority,
  getTaskResponsible,
  getTaskTitle,
} from "@/features/rover-dashboard/lib/overviewMetrics";
import type { Row } from "@/features/rover-dashboard/types";

const priorityClasses: Record<string, string> = {
  Crítica: "border-nebula/60 text-nebula",
  Alta: "border-ember/60 text-ember",
  Media: "border-gold/50 text-gold",
  Baja: "border-line-strong text-mist",
};

interface TaskRowsProps {
  tasks: Row[];
  emptyMessage: string;
  /** Show the area name under each title (useful when the list mixes areas). */
  showArea?: boolean;
  onSelect: (taskId: string) => void;
}

/** Compact clickable list of tasks with priority, due date and owner. */
export function TaskRows({ tasks, emptyMessage, showArea = false, onSelect }: TaskRowsProps) {
  if (tasks.length === 0) {
    return <p className="text-sm text-mist">{emptyMessage}</p>;
  }

  return (
    <ul className="flex flex-col divide-y divide-line">
      {tasks.map((task) => {
        const id = getTaskId(task);
        const priority = getTaskPriority(task);
        const deadline = getTaskDeadline(task);
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onSelect(id)}
              className="group flex w-full cursor-pointer items-start justify-between gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm text-starlight transition-colors group-hover:text-gold">{getTaskTitle(task)}</span>
                <span className="mt-0.5 block truncate text-xs text-mist">
                  {showArea && task.areaName ? `${String(task.areaName).split("—")[0].trim()} · ` : ""}
                  {getTaskResponsible(task)}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-full border px-2 py-0.5 text-xs ${priorityClasses[priority] ?? priorityClasses.Baja}`}>{priority}</span>
                <span className="text-xs text-mist tabular-nums">{deadline ? shortDate(deadline) : "Sin fecha"}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
