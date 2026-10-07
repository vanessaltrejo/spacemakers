import ExcelJS from 'exceljs';
import { TaskEdit, markEditsAsSynced } from './taskSyncService';

export interface SyncResult {
  success: boolean;
  message: string;
  updatedCount: number;
  filename?: string;
  appliedTaskIds?: string[];
  detectedAreaName?: string;
}

export interface WorkbookApplyResult {
  buffer: ArrayBuffer;
  updatedCount: number;
  appliedTaskIds: string[];
  detectedAreaId: string;
  detectedAreaName: string;
}

export interface AreaFileInfo {
  areaId: string;
  name: string;
  filename: string;
  folderPath: string;
}

export const AREA_EXCEL_MAP: Record<string, AreaFileInfo> = {
  '00_pm': {
    areaId: '00_pm',
    name: 'Project Management & SE',
    filename: 'PM_CoPM_Tracking_Maestro.xlsx',
    folderPath: 'Space Makers - 00_PROJECT_MANAGEMENT \\ 04_Final_Documents',
  },
  '01_mecanica': {
    areaId: '01_mecanica',
    name: 'Mecánica — Chasis y Estructura',
    filename: '00_Tasks_Mecanica.xlsx',
    folderPath: 'Space Makers - 01_MECANICA \\ 00_LEER_IMPORTANTE',
  },
  '02_brazo': {
    areaId: '02_brazo',
    name: 'Brazo Robótico y Manipulador',
    filename: '00_Tasks_Brazo_Manipulador.xlsx',
    folderPath: 'Space Makers - 02_BRAZO_MANIPULADOR \\ 00_LEER_IMPORTANTE',
  },
  '03_ciencia': {
    areaId: '03_ciencia',
    name: 'Ciencia e Instrumentación',
    filename: '00_Tasks_Ciencia.xlsx',
    folderPath: 'Space Makers - 03_CIENCIA \\ 00_LEER_IMPORTANTE',
  },
  '04_electrica': {
    areaId: '04_electrica',
    name: 'Eléctrica, Energía y Potencia',
    filename: '00_Tasks_Electrica.xlsx',
    folderPath: 'Space Makers - 04_ELECTRICA \\ 00_LEER_IMPORTANTE',
  },
  '05_comunicaciones': {
    areaId: '05_comunicaciones',
    name: 'Comunicaciones y RF',
    filename: '00_Tasks_Comunicaciones.xlsx',
    folderPath: 'Space Makers - 05_COMUNICACIONES \\ 00_LEER_IMPORTANTE',
  },
  '06_software': {
    areaId: '06_software',
    name: 'Software, Autonomía y C2',
    filename: '00_Tasks_Software_Autonomia.xlsx',
    folderPath: 'Space Makers - 06_SOFTWARE_AUTONOMIA \\ 00_LEER_IMPORTANTE',
  },
  '07_dron': {
    areaId: '07_dron',
    name: 'Dron (Delivery Mission)',
    filename: '00_Tasks_Dron.xlsx',
    folderPath: 'Space Makers - 07_DRON \\ 00_LEER_IMPORTANTE',
  },
  '08_integracion': {
    areaId: '08_integracion',
    name: 'Integración de Sistemas y Pruebas',
    filename: '00_Tasks_Integracion_y_Pruebas.xlsx',
    folderPath: 'Space Makers - 08_INTEGRACION_Y_PRUEBAS \\ 00_LEER_IMPORTANTE',
  },
  '09_seguridad': {
    areaId: '09_seguridad',
    name: 'Seguridad y Aseguramiento (S&MA)',
    filename: '00_Tasks_Seguridad_SMA.xlsx',
    folderPath: 'Space Makers - 09_SEGURIDAD_SMA \\ 00_LEER_IMPORTANTE',
  },
};

export function getAreaExcelFileInfo(areaId: string): AreaFileInfo {
  return (
    AREA_EXCEL_MAP[areaId] || {
      areaId,
      name: 'Área Técnica Space Makers',
      filename: 'Libro_Tareas.xlsx',
      folderPath: 'OneDrive Space Makers',
    }
  );
}

/**
 * Updates an Excel workbook buffer with the given task edits across all 10 engineering areas.
 */
export async function applyEditsToWorkbookBuffer(
  arrayBuffer: ArrayBuffer,
  edits: TaskEdit[],
  filename?: string
): Promise<WorkbookApplyResult> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  // 1. Identify target worksheet (TASKs, Backlog General, or Tareas)
  const worksheet =
    workbook.getWorksheet('TASKs') ||
    workbook.getWorksheet('Backlog General') ||
    workbook.getWorksheet('Tareas') ||
    workbook.getWorksheet('Tasks') ||
    workbook.worksheets.find((w) => {
      const n = w.name.toLowerCase();
      return n.includes('task') || n.includes('backlog') || n.includes('tarea');
    }) ||
    workbook.worksheets[0];

  if (!worksheet) {
    throw new Error('No se encontró una hoja válida de tareas (TASKs / Backlog General / Tareas) en este archivo de Excel.');
  }

  // 2. Identify area of this workbook by filename and header text
  const sheetHeader = String(
    worksheet.getCell(1, 2).value ||
    worksheet.getCell(1, 1).value ||
    worksheet.getCell(2, 2).value ||
    ''
  ).toLowerCase();
  const lowerFilename = (filename || '').toLowerCase();

  let detectedAreaId = '';
  let detectedAreaName = 'Área Técnica Space Makers';

  if (
    lowerFilename.includes('mecanica') ||
    sheetHeader.includes('mecánica') ||
    sheetHeader.includes('mecanica') ||
    sheetHeader.includes('chasis')
  ) {
    detectedAreaId = '01_mecanica';
    detectedAreaName = 'Mecánica — Chasis y Estructura';
  } else if (
    lowerFilename.includes('brazo') ||
    sheetHeader.includes('brazo') ||
    sheetHeader.includes('manipulador')
  ) {
    detectedAreaId = '02_brazo';
    detectedAreaName = 'Brazo Robótico y Manipulador';
  } else if (
    lowerFilename.includes('ciencia') ||
    sheetHeader.includes('ciencia')
  ) {
    detectedAreaId = '03_ciencia';
    detectedAreaName = 'Ciencia e Instrumentación';
  } else if (
    lowerFilename.includes('electrica') ||
    sheetHeader.includes('eléctrica') ||
    sheetHeader.includes('electrica') ||
    sheetHeader.includes('potencia')
  ) {
    detectedAreaId = '04_electrica';
    detectedAreaName = 'Eléctrica, Energía y Potencia';
  } else if (
    lowerFilename.includes('comunicaciones') ||
    lowerFilename.includes('comms') ||
    sheetHeader.includes('comunicaciones')
  ) {
    detectedAreaId = '05_comunicaciones';
    detectedAreaName = 'Comunicaciones y RF';
  } else if (
    lowerFilename.includes('software') ||
    sheetHeader.includes('software') ||
    sheetHeader.includes('autonomía') ||
    sheetHeader.includes('autonomia')
  ) {
    detectedAreaId = '06_software';
    detectedAreaName = 'Software, Autonomía y C2';
  } else if (
    lowerFilename.includes('dron') ||
    sheetHeader.includes('dron')
  ) {
    detectedAreaId = '07_dron';
    detectedAreaName = 'Dron (Delivery Mission)';
  } else if (
    lowerFilename.includes('integracion') ||
    sheetHeader.includes('integración') ||
    sheetHeader.includes('integracion')
  ) {
    detectedAreaId = '08_integracion';
    detectedAreaName = 'Integración de Sistemas y Pruebas';
  } else if (
    lowerFilename.includes('seguridad') ||
    lowerFilename.includes('sma') ||
    sheetHeader.includes('seguridad')
  ) {
    detectedAreaId = '09_seguridad';
    detectedAreaName = 'Seguridad y Aseguramiento (S&MA)';
  } else if (
    lowerFilename.includes('pm') ||
    lowerFilename.includes('tracking') ||
    worksheet.name.toLowerCase().includes('backlog general')
  ) {
    detectedAreaId = '00_pm';
    detectedAreaName = 'Project Management & SE';
  }

  // 3. Find Header Row dynamically (rows 1 to 6)
  let headerRowIdx = 2;
  let idCol = 2;
  let titleCol = 3;
  let respCol = 6;
  let progCol = 8;
  let notesCol = 9;
  let statusCol = -1;
  let aplicabilidadCol = -1;

  for (let r = 1; r <= 6; r++) {
    const row = worksheet.getRow(r);
    let isHeader = false;
    row.eachCell({ includeEmpty: false }, (cell) => {
      const val = String(cell.value || '').trim().toLowerCase();
      if (val === 'no.' || val === 'id' || val === 'task' || val === 'tarea') {
        isHeader = true;
      }
    });

    if (isHeader) {
      headerRowIdx = r;
      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        const val = String(cell.value || '').trim().toLowerCase();
        if (val === 'no.' || val === 'id') idCol = colNumber;
        else if (val === 'task' || val === 'tarea') titleCol = colNumber;
        else if (val.includes('respons')) respCol = colNumber;
        else if (val.includes('avance') || val.includes('completion') || val.includes('%')) progCol = colNumber;
        else if (val.includes('nota') || val.includes('bloqueo')) notesCol = colNumber;
        else if (val.includes('status') || val.includes('estado')) statusCol = colNumber;
        else if (val.includes('aplicabilidad')) aplicabilidadCol = colNumber;
      });
      break;
    }
  }

  // 4. Filter edits that belong to this detected area (or allow all if unknown)
  const relevantEdits = edits.filter((e) => {
    if (!detectedAreaId) return true;
    if (e.areaId && e.areaId === detectedAreaId) return true;
    const prefix = String(e.taskId).split('-')[0];
    if (prefix === detectedAreaId) return true;
    // Legacy fallback for edits created without areaId
    if (!e.areaId && !String(e.taskId).includes('-')) return true;
    return false;
  });

  if (relevantEdits.length === 0 && edits.length > 0) {
    const pendingAreas = [...new Set(edits.map((e) => e.areaName || e.areaId || 'otra área'))].join(', ');
    throw new Error(
      `El archivo seleccionado corresponde a "${detectedAreaName}" (${filename || 'archivo actual'}), pero los cambios pendientes corresponden a: ${pendingAreas}. Por favor selecciona el archivo de Excel correspondiente al área que deseas actualizar.`
    );
  }

  let updatedCount = 0;
  const appliedTaskIds: string[] = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber <= headerRowIdx) return;

    // Check if it's a section header row
    const c2 = row.getCell(2).value;
    const c3 = row.getCell(3).value;
    if (c2 && typeof c2 === 'string' && (!c3 || String(c2).trim() === String(c3).trim())) {
      return;
    }

    // Determine row numeric ID or code
    let rowId: number | string | null = null;
    const idVal = row.getCell(idCol).value;
    if (idVal != null) {
      if (typeof idVal === 'number') {
        rowId = idVal;
      } else {
        const cleaned = String(idVal).trim();
        if (/^\d+$/.test(cleaned)) {
          rowId = Number(cleaned);
        } else if (cleaned.length > 0) {
          rowId = cleaned;
        }
      }
    }

    const rowTitle = String(row.getCell(titleCol).value || '').trim().toLowerCase();
    const cleanRowTitle = rowTitle.replace(/\s+/g, ' ');

    // Match edit using robust multi-key matching
    const edit = relevantEdits.find((e) => {
      // 1. Direct match with taskId (e.g. number 4 or "4" or "BL-001")
      if (rowId != null && (String(e.taskId) === String(rowId) || e.taskId === rowId)) {
        return true;
      }
      // 2. Extracted numeric ID from prefixed string (e.g. "01_mecanica-4" -> 4)
      const extractedNum = Number(String(e.taskId).replace(/^[a-z0-9_]+-/, ''));
      if (!isNaN(extractedNum) && rowId != null && Number(rowId) === extractedNum) {
        return true;
      }
      // 2b. String code with prefix stripped (e.g. "00_pm-BL-001" -> "BL-001")
      const strippedPrefix = String(e.taskId).replace(/^[a-z0-9_]+-/, '');
      if (rowId != null && String(rowId).toLowerCase() === strippedPrefix.toLowerCase()) {
        return true;
      }
      // 3. Match via taskNumber property if present
      if (e.taskNumber != null && rowId != null && e.taskNumber === Number(rowId)) {
        return true;
      }
      // 4. Fallback match by task title
      const cleanTaskTitle = (e.taskTitle || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (cleanTaskTitle && cleanRowTitle) {
        if (cleanTaskTitle === cleanRowTitle) return true;
        if (cleanRowTitle.includes(cleanTaskTitle) || cleanTaskTitle.includes(cleanRowTitle)) return true;
      }
      return false;
    });

    if (!edit) return;

    // Apply Avance / Progress
    if (edit.progress !== undefined) {
      const prog = Number(edit.progress);
      row.getCell(progCol).value = prog > 1 ? prog / 100 : prog;
    }

    // Apply Responsable
    if (edit.responsible && respCol > 0) {
      row.getCell(respCol).value = edit.responsible;
    }

    // Apply Notas
    if (edit.notes !== undefined && notesCol > 0) {
      row.getCell(notesCol).value = edit.notes;
    }

    // Apply Status (for PM or sheets with a status column)
    if (statusCol > 0) {
      row.getCell(statusCol).value = edit.status;
    }

    // Apply Aplicabilidad (for Mecánica or sheets with an aplicabilidad column)
    if (aplicabilidadCol > 0) {
      if (edit.status === 'No aplica') {
        row.getCell(aplicabilidadCol).value = 'No aplica';
      } else if (edit.status === 'Por decidir') {
        row.getCell(aplicabilidadCol).value = 'Por decidir';
      } else {
        const currentApp = row.getCell(aplicabilidadCol).value;
        if (currentApp === 'No aplica' || currentApp === 'Por decidir') {
          row.getCell(aplicabilidadCol).value = 'Aplica';
        }
      }
    }

    if (typeof (row as { commit?: () => void }).commit === 'function') {
      (row as { commit: () => void }).commit();
    }

    updatedCount++;
    appliedTaskIds.push(String(edit.taskId));
  });

  const outputUint8 = await workbook.xlsx.writeBuffer();
  return {
    buffer: outputUint8 as ArrayBuffer,
    updatedCount,
    appliedTaskIds,
    detectedAreaId,
    detectedAreaName,
  };
}

/**
 * Direct File System Access sync: Prompts the user for their Excel workbook
 * and overwrites it directly in OneDrive without re-downloading.
 */
export async function syncDirectToExcelFile(edits: TaskEdit[]): Promise<SyncResult> {
  if (edits.length === 0) {
    return { success: true, message: 'No hay cambios pendientes por sincronizar.', updatedCount: 0 };
  }

  // Check if File System Access API is supported (Chrome, Edge on Windows)
  const windowWithFSA = window as unknown as {
    showOpenFilePicker?: (options?: Record<string, unknown>) => Promise<FileSystemFileHandle[]>;
  };

  if (!windowWithFSA.showOpenFilePicker) {
    throw new Error('FILE_SYSTEM_API_NOT_SUPPORTED');
  }

  try {
    const [fileHandle] = await windowWithFSA.showOpenFilePicker({
      types: [
        {
          description: 'Libro de Excel de Tareas (*.xlsx)',
          accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          },
        },
      ],
      multiple: false,
    });

    const file = await fileHandle.getFile();
    const inputBuffer = await file.arrayBuffer();

    const { buffer: outputBuffer, updatedCount, appliedTaskIds, detectedAreaName } =
      await applyEditsToWorkbookBuffer(inputBuffer, edits, file.name);

    if (updatedCount === 0) {
      return {
        success: false,
        message: `No se encontraron tareas modificadas que coincidan con "${file.name}". Verifica que el archivo corresponda al área de las tareas editadas.`,
        updatedCount: 0,
        filename: file.name,
      };
    }

    // Save back to the same file handle in OneDrive
    const writable = await fileHandle.createWritable();
    await writable.write(outputBuffer);
    await writable.close();

    // Mark ONLY the applied edits as synced in local store
    markEditsAsSynced(appliedTaskIds);

    const remainingPending = edits.length - appliedTaskIds.length;
    let successMsg = `¡Excel actualizado con éxito! Se sincronizaron ${updatedCount} tareas en "${file.name}" (${detectedAreaName}).`;
    if (remainingPending > 0) {
      successMsg += ` Quedan ${remainingPending} tareas pendientes de sincronizar en otras áreas.`;
    }

    return {
      success: true,
      message: successMsg,
      updatedCount,
      filename: file.name,
      appliedTaskIds,
      detectedAreaName,
    };
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      return { success: false, message: 'Operación cancelada por el usuario.', updatedCount: 0 };
    }
    throw err;
  }
}

/**
 * Fallback: Allows user to choose file through standard input and triggers updated download.
 */
export async function syncViaDownload(file: File, edits: TaskEdit[]): Promise<SyncResult> {
  const inputBuffer = await file.arrayBuffer();
  const { buffer: outputBuffer, updatedCount, appliedTaskIds, detectedAreaName } =
    await applyEditsToWorkbookBuffer(inputBuffer, edits, file.name);

  if (updatedCount === 0) {
    return {
      success: false,
      message: `No se encontraron tareas para actualizar en "${file.name}". Verifica que el archivo corresponda al área de las tareas editadas.`,
      updatedCount: 0,
      filename: file.name,
    };
  }

  const blob = new Blob([outputBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name || 'Tareas_Actualizadas.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  markEditsAsSynced(appliedTaskIds);

  const remainingPending = edits.length - appliedTaskIds.length;
  let msg = `Archivo descargado con éxito con ${updatedCount} tareas actualizadas (${detectedAreaName}).`;
  if (remainingPending > 0) {
    msg += ` Quedan ${remainingPending} tareas pendientes en otras áreas.`;
  }

  return {
    success: true,
    message: msg,
    updatedCount,
    filename: a.download,
    appliedTaskIds,
    detectedAreaName,
  };
}
