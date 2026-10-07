import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Dashboard datasets live outside `public/` so they're only reachable through the
 * authenticated API route. Swap these file reads for a DB/API call later.
 */

const DATA_DIRECTORY = path.join(process.cwd(), "src/features/rover-dashboard/data");

const datasetFiles = {
  "rover-control-data": "rover-control-data.json",
  "backlog-data": "backlog-data.json",
} as const;

export type DashboardDataset = keyof typeof datasetFiles;

export function isDashboardDataset(value: string): value is DashboardDataset {
  return Object.hasOwn(datasetFiles, value);
}

/** Returns the raw JSON text so it can be streamed back without re-serializing. */
export async function readDashboardDataset(dataset: DashboardDataset): Promise<string> {
  return readFile(path.join(DATA_DIRECTORY, datasetFiles[dataset]), "utf8");
}
