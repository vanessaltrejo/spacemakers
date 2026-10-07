export interface TaskEdit {
  taskId: number | string;
  taskNumber?: number;
  taskTitle: string;
  areaId?: string;
  areaName?: string;
  progress: number; // 0.0 to 1.0
  status: string;
  responsible: string;
  notes: string;
  updatedAt: string;
  syncedToExcel: boolean;
}

const STORAGE_KEY = 'spacemakers_chassis_task_edits_v1';
const LISTENERS: Array<() => void> = [];

export function getStoredEdits(): Record<string, TaskEdit> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveTaskEdit(edit: Omit<TaskEdit, 'updatedAt' | 'syncedToExcel'>): TaskEdit {
  const current = getStoredEdits();
  const idStr = String(edit.taskId);
  
  const updated: TaskEdit = {
    ...edit,
    updatedAt: new Date().toISOString(),
    syncedToExcel: false,
  };
  
  current[idStr] = updated;
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      notifyListeners();
      
      void syncToRemoteIfConfigured(updated);
    } catch (err) {
      console.warn('Error saving task edit to localStorage:', err);
    }
  }
  
  return updated;
}

export function markEditsAsSynced(taskIds?: Array<number | string>): void {
  const current = getStoredEdits();
  if (!taskIds || taskIds.length === 0) {
    for (const key of Object.keys(current)) {
      current[key].syncedToExcel = true;
    }
  } else {
    for (const id of taskIds) {
      const idStr = String(id);
      if (current[idStr]) {
        current[idStr].syncedToExcel = true;
      }
    }
  }
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      notifyListeners();
    } catch (err) {
      console.warn('Error updating synced edits:', err);
    }
  }
}

export function removeEdit(taskId: number | string): void {
  const current = getStoredEdits();
  const idStr = String(taskId);
  delete current[idStr];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      notifyListeners();
    } catch (err) {
      console.warn('Error removing task edit:', err);
    }
  }
}

export function getPendingEditsList(): TaskEdit[] {
  const current = getStoredEdits();
  return Object.values(current).filter((edit) => !edit.syncedToExcel);
}

export function subscribeToEdits(callback: () => void): () => void {
  LISTENERS.push(callback);
  return () => {
    const index = LISTENERS.indexOf(callback);
    if (index >= 0) LISTENERS.splice(index, 1);
  };
}

function notifyListeners() {
  for (const listener of LISTENERS) {
    try {
      listener();
    } catch (err) {
      console.error('Error notifying edit listener:', err);
    }
  }
}

async function syncToRemoteIfConfigured(edit: TaskEdit): Promise<void> {
  const remoteUrl = typeof window !== 'undefined' ? (window as unknown as { __REMOTE_SYNC_URL?: string }).__REMOTE_SYNC_URL : null;
  if (!remoteUrl) return;

  try {
    await fetch(remoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edit }),
    });
  } catch (err) {
    console.warn('Could not post to remote cloud sync URL:', err);
  }
}
