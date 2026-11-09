import type { MonthLoad } from "@/features/rover-dashboard/lib/overviewMetrics";

interface MonthlyLoadChartProps {
  months: MonthLoad[];
}

/** Open tasks by due month. Overdue ones are orange, upcoming ones gold. */
export function MonthlyLoadChart({ months }: MonthlyLoadChartProps) {
  const peak = Math.max(1, ...months.map((month) => month.overdue + month.upcoming));

  if (months.length === 0) {
    return <p className="text-sm text-mist">No hay tareas abiertas con fecha objetivo.</p>;
  }

  return (
    <div>
      <div className="flex h-40 items-end gap-1.5" role="img" aria-label="Tareas abiertas por mes de entrega">
        {months.map((month) => {
          const total = month.overdue + month.upcoming;
          return (
            <div key={month.key} className="flex h-full min-w-0 flex-1 flex-col justify-end" title={`${month.month} ${month.year}: ${total} tareas`}>
              <span className="mb-1 text-center text-xs text-mist tabular-nums">{total}</span>
              <div className="flex flex-col justify-end overflow-hidden rounded-t-md" style={{ height: `${(total / peak) * 100}%` }}>
                <div className="bg-gold" style={{ flexGrow: month.upcoming }} />
                <div className="bg-mars" style={{ flexGrow: month.overdue }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5">
        {months.map((month) => (
          <span key={month.key} className="flex min-w-0 flex-1 flex-col items-center text-xs leading-tight text-mist">
            <span>{month.month}</span>
            <span className="text-[11px] opacity-70">{month.year}</span>
          </span>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-4 text-xs text-mist">
        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2.5 rounded-full bg-mars" /> Vencidas</span>
        <span className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2.5 rounded-full bg-gold" /> Por entregar</span>
      </p>
    </div>
  );
}
