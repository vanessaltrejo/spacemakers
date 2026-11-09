'use client';

import { useMemo } from 'react';
import { GroupProgressList, type GroupRow } from '@/features/rover-dashboard/components/overview/GroupProgressList';
import { KpiCard } from '@/features/rover-dashboard/components/overview/KpiCard';
import { MonthlyLoadChart } from '@/features/rover-dashboard/components/overview/MonthlyLoadChart';
import { Panel } from '@/features/rover-dashboard/components/overview/Panel';
import { StageBreakdown } from '@/features/rover-dashboard/components/overview/StageBreakdown';
import { TaskRows } from '@/features/rover-dashboard/components/overview/TaskRows';
import {
  computeOverview,
  groupProgress,
  priorityOrder,
} from '@/features/rover-dashboard/lib/overviewMetrics';
import type { AreaData, Row } from '@/features/rover-dashboard/types';

interface OverviewDashboardProps {
  /** Area being viewed, or null for the whole rover. */
  scopeArea: AreaData | null;
  areas: AreaData[];
  /** Tasks in scope, with the web edits already merged in. */
  tasks: Row[];
  isLoading: boolean;
  onOpenArea: (areaId: string) => void;
  onOpenPhase: (phase: string) => void;
  onOpenTask: (taskId: string) => void;
}

function cleanLabel(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function taskPhase(task: Row): string {
  return String(task.phase ?? task.Fase ?? '');
}

/** At-a-glance picture of the rover, or of a single area: workload, delays, priorities, risks. */
export function OverviewDashboard({
  scopeArea,
  areas,
  tasks,
  isLoading,
  onOpenArea,
  onOpenPhase,
  onOpenTask,
}: OverviewDashboardProps) {
  const metrics = useMemo(() => computeOverview(tasks, new Date()), [tasks]);

  const groupRows = useMemo<GroupRow[]>(() => {
    const now = new Date();
    if (scopeArea) {
      return groupProgress(tasks, taskPhase, scopeArea.phases, now).map((group) => ({
        ...group,
        label: cleanLabel(group.key),
      }));
    }
    const byId = new Map(areas.map((area) => [area.id, area]));
    return groupProgress(tasks, (task) => String(task.areaId ?? ''), areas.map((area) => area.id), now).map((group) => ({
      ...group,
      label: byId.get(group.key)?.shortName ?? group.key,
      tag: byId.get(group.key)?.code,
    }));
  }, [areas, scopeArea, tasks]);

  const maxPriority = Math.max(1, ...priorityOrder.map((priority) => metrics.priorityCounts[priority] ?? 0));
  const share = (count: number) => (metrics.total > 0 ? Math.round((count / metrics.total) * 100) : 0);

  if (metrics.total === 0) {
    return (
      <p className="rounded-xl border border-line bg-hull p-6 text-sm text-mist">
        {isLoading ? 'Cargando datos…' : 'No hay tareas para mostrar en esta vista.'}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label={scopeArea ? 'Avance del área' : 'Avance global'}
          value={`${metrics.progress}%`}
          progress={metrics.progress}
          hint={`${metrics.done} de ${metrics.total} terminadas`}
          tone="gold"
        />
        <KpiCard
          label="Tareas"
          value={String(metrics.total)}
          hint={scopeArea ? `${scopeArea.phases.length} fases` : `${areas.length} áreas`}
        />
        <KpiCard label="En progreso" value={String(metrics.inProgress)} hint={`${share(metrics.inProgress)}% del total`} tone="info" />
        <KpiCard label="Terminadas" value={String(metrics.done)} hint={`${share(metrics.done)}% del total`} tone="good" />
        <KpiCard
          label="Vencidas"
          value={String(metrics.overdue)}
          hint={`${metrics.dueSoon} vencen en 30 días`}
          tone={metrics.overdue > 0 ? 'warn' : 'default'}
        />
        <KpiCard label="Por decidir" value={String(metrics.toDecide)} hint="Esperan una decisión" tone="gold" />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title={scopeArea ? 'Avance por fase' : 'Avance por área'}
          subtitle={scopeArea ? 'Haz clic en una fase para ver sus tareas.' : 'Haz clic en un área para ver su backlog.'}
        >
          <GroupProgressList rows={groupRows} onSelect={scopeArea ? onOpenPhase : onOpenArea} />
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Estado de las tareas">
            <StageBreakdown counts={metrics} total={metrics.total} />
          </Panel>
          <Panel title="Prioridad de lo pendiente" subtitle="Tareas abiertas por nivel de prioridad.">
            <ul className="flex flex-col gap-3">
              {priorityOrder.map((priority) => {
                const count = metrics.priorityCounts[priority] ?? 0;
                return (
                  <li key={priority} className="grid grid-cols-[4rem_1fr_2.5rem] items-center gap-3 text-sm">
                    <span className="text-mist">{priority}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-gold" style={{ width: `${(count / maxPriority) * 100}%` }} />
                    </span>
                    <span className="text-right font-bold text-cream tabular-nums">{count}</span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel title="Carga por mes" subtitle="Tareas abiertas según su fecha de entrega.">
          <MonthlyLoadChart months={metrics.monthlyLoad} />
        </Panel>
        <Panel title="Atención inmediata" subtitle="Vencidas, de mayor prioridad primero.">
          <TaskRows
            tasks={metrics.attention}
            showArea={!scopeArea}
            emptyMessage="No hay tareas vencidas."
            onSelect={onOpenTask}
          />
        </Panel>
        <Panel title="Próximas entregas" subtitle="Lo que sigue, por fecha.">
          <TaskRows
            tasks={metrics.upcoming}
            showArea={!scopeArea}
            emptyMessage="No hay entregas próximas."
            onSelect={onOpenTask}
          />
        </Panel>
      </div>

      {scopeArea ? (
        <Panel title="Equipo" subtitle="Responsables del área.">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex justify-between gap-3">
              <span className="text-mist">Líder</span>
              <span className="text-right text-cream">{scopeArea.lead}</span>
            </li>
            {scopeArea.responsibles.map((person) => (
              <li key={person} className="flex justify-between gap-3">
                <span className="text-mist">Responsable</span>
                <span className="text-right text-cream">{person}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </div>
  );
}
