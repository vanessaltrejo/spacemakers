/** Shared types for the rover dashboard data (shape of rover-control-data.json). */

// `boolean` covers the `_isModifiedInWeb` / `_syncedToExcel` flags merged in by `effectiveBacklog`.
export type Row = Record<string, string | number | boolean | null>;
export type AreaData = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  icon: string;
  lead: string;
  color: string;
  isProjectManagement: boolean;
  source: string;
  sourcePath: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  blockedTasks: number;
  overallProgress: number;
  phases: string[];
  subsystems: string[];
  responsibles: string[];
  tasks: Row[];
};

export type RoverControlData = {
  generatedAt: string;
  globalMetrics: {
    roverReadiness: number;
    totalEngineeringTasks: number;
    totalCompletedTasks: number;
    totalInProgressTasks: number;
    areasCount: number;
  };
  areas: Record<string, AreaData>;
  secondary: {
    requirements: Row[];
    interfaces: Row[];
    risks: Row[];
    milestones: Row[];
  };
};
