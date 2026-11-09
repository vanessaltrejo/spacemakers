import type { Row } from '@/features/rover-dashboard/types';

/**
 * Pure metric helpers behind the overview dashboard. They only read task rows, so the same code
 * serves the whole rover and any single area.
 */

export type TaskStage = 'done' | 'inProgress' | 'toDecide' | 'notStarted';

export const stageOrder: TaskStage[] = ['done', 'inProgress', 'toDecide', 'notStarted'];

export const priorityOrder = ['Crítica', 'Alta', 'Media', 'Baja'] as const;

const priorityRank: Record<string, number> = { Crítica: 0, Alta: 1, Media: 2, Baja: 3 };

const DAY_MS = 24 * 60 * 60 * 1000;

export interface StageCounts {
  done: number;
  inProgress: number;
  toDecide: number;
  notStarted: number;
}

export interface GroupProgress extends StageCounts {
  key: string;
  total: number;
  overdue: number;
  /** 0–100, average completion of the group's tasks. */
  progress: number;
}

export interface MonthLoad {
  key: string;
  /** Short month name, e.g. "sep". */
  month: string;
  /** Two-digit year, e.g. "26". */
  year: string;
  overdue: number;
  upcoming: number;
}

export interface OverviewMetrics extends StageCounts {
  total: number;
  /** 0–100, average completion across all tasks. */
  progress: number;
  overdue: number;
  dueSoon: number;
  priorityCounts: Record<string, number>;
  monthlyLoad: MonthLoad[];
  attention: Row[];
  upcoming: Row[];
}

export function getTaskId(task: Row): string {
  return String(task.id ?? task.ID ?? task['No.'] ?? '');
}

export function getTaskTitle(task: Row): string {
  return String(task.title || task.Tarea || task['Tarea / entregable'] || 'Sin título');
}

export function getTaskPriority(task: Row): string {
  return String(task.priority || task.Prioridad || 'Media');
}

export function getTaskResponsible(task: Row): string {
  return String(task.responsible || task.Responsable || 'Por asignar');
}

/** Completion as a 0–1 fraction (values above 1 are treated as percentages). */
export function getTaskProgress(task: Row): number {
  const raw = Number(task.progress ?? task.Avance ?? 0);
  if (Number.isNaN(raw)) return 0;
  return Math.min(1, Math.max(0, raw > 1 ? raw / 100 : raw));
}

export function getTaskDeadline(task: Row): Date | null {
  const raw = task.deadline || task['Fecha objetivo'] || task['Fecha propuesta'];
  if (!raw) return null;
  const date = new Date(String(raw));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getTaskStage(task: Row): TaskStage {
  const status = String(task.status || task.Estado || 'Por iniciar').toLowerCase();
  const progress = getTaskProgress(task);
  if (status.includes('termin') || progress >= 1) return 'done';
  if (status.includes('decidir') || status.includes('bloque')) return 'toDecide';
  if (status.includes('progreso') || progress > 0) return 'inProgress';
  return 'notStarted';
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function emptyStageCounts(): StageCounts {
  return { done: 0, inProgress: 0, toDecide: 0, notStarted: 0 };
}

function byPriorityThenDate(a: Row, b: Row): number {
  const priorityDiff = (priorityRank[getTaskPriority(a)] ?? 99) - (priorityRank[getTaskPriority(b)] ?? 99);
  if (priorityDiff !== 0) return priorityDiff;
  return (getTaskDeadline(a)?.getTime() ?? Infinity) - (getTaskDeadline(b)?.getTime() ?? Infinity);
}

function byDate(a: Row, b: Row): number {
  return (getTaskDeadline(a)?.getTime() ?? Infinity) - (getTaskDeadline(b)?.getTime() ?? Infinity);
}

export function computeOverview(tasks: Row[], now: Date, listSize = 6): OverviewMetrics {
  const today = startOfDay(now);
  const soonLimit = today.getTime() + 30 * DAY_MS;
  const stages = emptyStageCounts();
  const priorityCounts: Record<string, number> = {};
  const months = new Map<string, MonthLoad>();
  const overdueTasks: Row[] = [];
  const upcomingTasks: Row[] = [];
  let dueSoon = 0;
  let progressSum = 0;

  for (const task of tasks) {
    const stage = getTaskStage(task);
    stages[stage] += 1;
    progressSum += stage === 'done' ? 1 : getTaskProgress(task);
    if (stage === 'done') continue;

    const priority = getTaskPriority(task);
    priorityCounts[priority] = (priorityCounts[priority] ?? 0) + 1;

    const deadline = getTaskDeadline(task);
    if (!deadline) continue;

    const key = monthKey(deadline);
    const month = months.get(key) ?? {
      key,
      month: new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(deadline).replace('.', ''),
      year: String(deadline.getFullYear()).slice(-2),
      overdue: 0,
      upcoming: 0,
    };

    if (deadline.getTime() < today.getTime()) {
      month.overdue += 1;
      overdueTasks.push(task);
    } else {
      month.upcoming += 1;
      upcomingTasks.push(task);
      if (deadline.getTime() <= soonLimit) dueSoon += 1;
    }
    months.set(key, month);
  }

  return {
    ...stages,
    total: tasks.length,
    progress: tasks.length > 0 ? Math.round((progressSum / tasks.length) * 100) : 0,
    overdue: overdueTasks.length,
    dueSoon,
    priorityCounts,
    monthlyLoad: [...months.values()].sort((a, b) => a.key.localeCompare(b.key)),
    attention: overdueTasks.sort(byPriorityThenDate).slice(0, listSize),
    upcoming: upcomingTasks.sort(byDate).slice(0, listSize),
  };
}

/** Groups tasks by a key (area, phase…) and summarizes each group, keeping `keys` order. */
export function groupProgress(tasks: Row[], keyOf: (task: Row) => string, keys: string[], now: Date): GroupProgress[] {
  const today = startOfDay(now).getTime();
  const groups = new Map<string, GroupProgress & { progressSum: number }>();
  for (const key of keys) {
    groups.set(key, { key, total: 0, overdue: 0, progress: 0, progressSum: 0, ...emptyStageCounts() });
  }

  for (const task of tasks) {
    const group = groups.get(keyOf(task));
    if (!group) continue;
    const stage = getTaskStage(task);
    group.total += 1;
    group[stage] += 1;
    group.progressSum += stage === 'done' ? 1 : getTaskProgress(task);
    const deadline = getTaskDeadline(task);
    if (stage !== 'done' && deadline && deadline.getTime() < today) group.overdue += 1;
  }

  return [...groups.values()].map(({ progressSum, ...group }) => ({
    ...group,
    progress: group.total > 0 ? Math.round((progressSum / group.total) * 100) : 0,
  }));
}
