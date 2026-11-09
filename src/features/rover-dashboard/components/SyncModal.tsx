'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Download, FileSpreadsheet, RefreshCw, UploadCloud, X } from 'lucide-react';
import { Button } from '@/features/rover-dashboard/components/ui/button';
import { getAreaExcelFileInfo, syncDirectToExcelFile, syncViaDownload } from '@/features/rover-dashboard/lib/browserExcelSync';
import type { TaskEdit } from '@/features/rover-dashboard/lib/taskSyncService';
import type { AreaData } from '@/features/rover-dashboard/types';

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

interface SyncModalProps {
  /** Edits made in the web that are not in the Excel files yet. */
  pendingEdits: TaskEdit[];
  areas: Record<string, AreaData> | undefined;
  onClose: () => void;
  /** Called after the Excel files were updated, so the data can be reloaded. */
  onSynced: () => void;
}

interface PendingArea {
  areaId: string;
  areaName: string;
  filename: string;
  folderPath: string;
  count: number;
}

/** Writes the web edits back into the area's Excel workbook (directly, or as a downloaded copy). */
export function SyncModal({ pendingEdits, areas, onClose, onSynced }: SyncModalProps) {
  const [status, setStatus] = useState<SyncStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const pendingAreas = useMemo<PendingArea[]>(() => {
    const byArea = new Map<string, PendingArea>();
    for (const edit of pendingEdits) {
      const areaId = edit.areaId || '01_mecanica';
      const fileInfo = getAreaExcelFileInfo(areaId);
      const existing = byArea.get(areaId);
      if (existing) {
        existing.count += 1;
      } else {
        byArea.set(areaId, {
          areaId,
          areaName: edit.areaName || areas?.[areaId]?.name || fileInfo.name,
          filename: fileInfo.filename,
          folderPath: fileInfo.folderPath,
          count: 1,
        });
      }
    }
    return [...byArea.values()];
  }, [pendingEdits, areas]);

  const finish = (text: string) => {
    setStatus('success');
    setMessage(text);
    setTimeout(onSynced, 1200);
  };

  const handleDirectSync = async () => {
    setStatus('syncing');
    setMessage('Selecciona el archivo Excel del área que quieres actualizar…');
    try {
      const result = await syncDirectToExcelFile(pendingEdits);
      if (result.success) {
        finish(result.message);
      } else {
        setStatus('idle');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        (error as Error).message === 'FILE_SYSTEM_API_NOT_SUPPORTED'
          ? 'Tu navegador no permite escribir archivos directamente. Usa "Descargar copia .xlsx".'
          : `Error: ${(error as Error).message}`,
      );
    }
  };

  const handleDownloadSync = async (file: File) => {
    setStatus('syncing');
    setMessage('Generando el archivo con los cambios…');
    try {
      const result = await syncViaDownload(file, pendingEdits);
      finish(result.message);
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="sync-modal-overlay" onClick={onClose}>
      <div
        className="sync-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sync-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-cluster">
            <UploadCloud className="modal-icon" />
            <div>
              <h4 id="sync-modal-title">Sincronizar con Excel</h4>
              <small>Guarda en los archivos de OneDrive los cambios hechos aquí.</small>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            <X className="size-5" />
          </button>
        </div>

        <div className="modal-body">
          {pendingEdits.length > 0 ? (
            <>
              <p className="modal-intro">
                {pendingEdits.length === 1 ? 'Hay 1 tarea modificada' : `Hay ${pendingEdits.length} tareas modificadas`} sin guardar en Excel.
                Al actualizar, elige el archivo de cada área indicado abajo:
              </p>

              <ul className="my-3 space-y-2">
                {pendingAreas.map((area) => (
                  <li key={area.areaId} className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-white">
                        <FileSpreadsheet className="size-4 shrink-0 text-amber-300" />
                        {area.areaName}
                      </span>
                      <span className="shrink-0 text-xs text-zinc-400">
                        {area.count} {area.count === 1 ? 'tarea' : 'tareas'}
                      </span>
                    </div>
                    <p className="mt-1 pl-6 text-xs text-zinc-400">{area.filename}</p>
                  </li>
                ))}
              </ul>

              <div className="pending-diff-list">
                {pendingEdits.map((edit) => (
                  <div key={String(edit.taskId)} className="pending-diff-item">
                    <div className="diff-header">
                      <span className="diff-id">#{edit.taskId}</span>
                      <strong className="diff-title">{edit.taskTitle}</strong>
                    </div>
                    <div className="diff-changes">
                      <span className="diff-tag">Avance: <strong>{Math.round(edit.progress * 100)}%</strong></span>
                      <span className="diff-tag">Estado: <strong>{edit.status}</strong></span>
                      {edit.responsible ? <span className="diff-tag">Responsable: <strong>{edit.responsible}</strong></span> : null}
                    </div>
                    {edit.notes ? <p className="diff-notes-preview">&quot;{edit.notes}&quot;</p> : null}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-diff-state">
              <CheckCircle2 className="size-10 text-emerald-400" />
              <h5>Todo está al día</h5>
              <p>No hay cambios pendientes por guardar en Excel.</p>
            </div>
          )}

          {message ? (
            <div className={`sync-feedback-banner ${status}`} role="status">
              {status === 'syncing' ? <RefreshCw className="size-4 animate-spin" /> : null}
              {status === 'success' ? <CheckCircle2 className="size-4" /> : null}
              {status === 'error' ? <AlertTriangle className="size-4" /> : null}
              <span>{message}</span>
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {pendingEdits.length > 0 ? (
            <>
              <label className="download-fallback-btn">
                <Download className="size-3.5" />
                <span>Descargar copia .xlsx</span>
                <input
                  type="file"
                  accept=".xlsx"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleDownloadSync(file);
                  }}
                />
              </label>
              <Button className="sync-action-btn" disabled={status === 'syncing'} onClick={() => void handleDirectSync()}>
                {status === 'syncing' ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" /> Guardando…
                  </>
                ) : (
                  <>
                    <UploadCloud className="size-4" /> Actualizar en OneDrive
                  </>
                )}
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
