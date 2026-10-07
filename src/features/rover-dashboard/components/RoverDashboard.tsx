'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, ChevronDown, ChevronRight,
  Clock3, Download, Edit3, FileSpreadsheet, FileText, FilterX, Flag,
  FlaskConical, Home as HomeIcon, Key, Layers3, LayoutDashboard, ListChecks,
  ListTodo, Lock, Plane, Radio, RefreshCw, Rocket, Save, Search, ShieldAlert,
  ShieldCheck, Target, UploadCloud, UserCheck, Users, Wrench, X, Zap, Cpu
} from 'lucide-react';
import { Badge } from '@/features/rover-dashboard/components/ui/badge';
import { Button } from '@/features/rover-dashboard/components/ui/button';
import { Input } from '@/features/rover-dashboard/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/features/rover-dashboard/components/ui/native-select';
import { Progress } from '@/features/rover-dashboard/components/ui/progress';
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/features/rover-dashboard/components/ui/tabs';
import {
  getStoredEdits, saveTaskEdit, subscribeToEdits, removeEdit, type TaskEdit,
} from '@/features/rover-dashboard/lib/taskSyncService';
import {
  syncDirectToExcelFile, syncViaDownload, getAreaExcelFileInfo,
} from '@/features/rover-dashboard/lib/browserExcelSync';

// `boolean` covers the `_isModifiedInWeb` / `_syncedToExcel` flags merged in by `effectiveBacklog`.
type Row = Record<string, string | number | boolean | null>;
type ViewName = 'inicio' | 'resumen' | 'backlog' | 'requisitos' | 'interfaces' | 'riesgos' | 'hitos';

type AreaData = {
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

type RoverControlData = {
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

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void>;
    };
  }
}

const views: ViewName[] = ['inicio', 'resumen', 'backlog', 'requisitos', 'interfaces', 'riesgos', 'hitos'];
const priorityRank: Record<string, number> = { Crítica: 0, Alta: 1, Media: 2, Baja: 3 };
const matrixProbabilities = [5, 4, 3, 2, 1];
const matrixConsequences = [1, 2, 3, 4, 5];

function textValue(value: unknown, fallback = 'Sin definir') {
  return value === null || value === undefined || value === '' ? fallback : String(value);
}

function shortDate(value: unknown) {
  if (!value) return 'Sin fecha';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function asPercent(value: unknown) {
  const number = Number(value ?? 0);
  return Math.round(number <= 1 ? number * 100 : number);
}

function priorityClass(priority: string) {
  return priority === 'Crítica' ? 'priority-critical' : priority === 'Alta' ? 'priority-high' : 'priority-normal';
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes('termin') || normalized.includes('cerrad') || normalized.includes('aprobad')) return 'status-done';
  if (normalized.includes('bloque') || normalized.includes('crític')) return 'status-alert';
  if (normalized.includes('progreso') || normalized.includes('activ')) return 'status-active';
  if (normalized.includes('decidir')) return 'status-warning';
  if (normalized.includes('no aplica')) return 'status-muted';
  return 'status-neutral';
}

function riskMatrixClass(score: number) {
  if (score >= 15) return 'matrix-critical';
  if (score >= 10) return 'matrix-high';
  if (score >= 5) return 'matrix-medium';
  return 'matrix-low';
}

function getAreaIcon(id: string) {
  switch (id) {
    case '00_pm': return <LayoutDashboard className="size-3.5" />;
    case '01_mecanica': return <Layers3 className="size-3.5" />;
    case '02_brazo': return <Target className="size-3.5" />;
    case '03_ciencia': return <FlaskConical className="size-3.5" />;
    case '04_electrica': return <Zap className="size-3.5" />;
    case '05_comunicaciones': return <Radio className="size-3.5" />;
    case '06_software': return <Cpu className="size-3.5" />;
    case '07_dron': return <Plane className="size-3.5" />;
    case '08_integracion': return <Wrench className="size-3.5" />;
    case '09_seguridad': return <ShieldAlert className="size-3.5" />;
    default: return <Rocket className="size-3.5" />;
  }
}

export function RoverDashboard() {
  const [roverData, setRoverData] = useState<RoverControlData | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState<ViewName>('inicio');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('Todas');
  const [status, setStatus] = useState('Todos');
  const [workstream, setWorkstream] = useState('Todos');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, TaskEdit>>({});
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ progress: number; status: string; responsible: string; notes: string }>({
    progress: 0,
    status: 'Por iniciar',
    responsible: '',
    notes: '',
  });

  // Ported as-is: hydrates from localStorage/sessionStorage after mount. Revisit in the redesign.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEdits(getStoredEdits());
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('spacemakers_admin_auth') === 'true';
      setIsAdminAuthenticated(isAuth);
    }
    return subscribeToEdits(() => {
      setEdits(getStoredEdits());
    });
  }, []);

  const pendingEditsList = useMemo(() => {
    return Object.values(edits).filter((e) => !e.syncedToExcel);
  }, [edits]);

  const pendingByArea = useMemo(() => {
    const map: Record<string, { areaId: string; areaName: string; filename: string; folderPath: string; count: number }> = {};
    for (const edit of pendingEditsList) {
      const aId = edit.areaId || '01_mecanica';
      const fileInfo = getAreaExcelFileInfo(aId);
      const aName = edit.areaName || roverData?.areas[aId]?.name || fileInfo.name;
      if (!map[aId]) {
        map[aId] = {
          areaId: aId,
          areaName: aName,
          filename: fileInfo.filename,
          folderPath: fileInfo.folderPath,
          count: 0,
        };
      }
      map[aId].count++;
    }
    return Object.values(map);
  }, [pendingEditsList, roverData]);

  // Current focused area
  const currentArea = useMemo<AreaData | null>(() => {
    if (selectedAreaId === 'all' || !roverData) return null;
    return roverData.areas[selectedAreaId] || null;
  }, [selectedAreaId, roverData]);

  // Current tasks pool (either scoped to area or default all engineering tasks)
  const currentTasks = useMemo<Row[]>(() => {
    if (!roverData) return [];
    if (currentArea) return currentArea.tasks;
    // When 'all', combine tasks from all 10 areas so user can see/search everything
    const allList: Row[] = [];
    Object.values(roverData.areas).forEach((area) => {
      allList.push(...area.tasks);
    });
    return allList;
  }, [currentArea, roverData]);

  // Effective backlog merging static excel rows with reactive web edits
  const effectiveBacklog = useMemo(() => {
    return currentTasks.map((task): Row => {
      const rawId = task.id ?? task.ID ?? task['No.'];
      const edit = edits[String(rawId)] || edits[String(task.taskId ?? task.ID ?? task['No.'])];
      if (!edit) return { ...task, _isModifiedInWeb: false };
      return {
        ...task,
        Avance: edit.progress,
        progress: edit.progress,
        Estado: edit.status,
        status: edit.status,
        Responsable: edit.responsible || task.Responsable || task.responsible,
        responsible: edit.responsible || task.Responsable || task.responsible,
        Notas: edit.notes || task.Notas || task.notes,
        notes: edit.notes || task.Notas || task.notes,
        'Notas de planificación': edit.notes || task['Notas de planificación'],
        _isModifiedInWeb: true,
        _syncedToExcel: edit.syncedToExcel,
      };
    });
  }, [currentTasks, edits]);

  // Dynamic filter options based on current area
  const dynamicSubsystems = useMemo(() => {
    const set = new Set<string>();
    effectiveBacklog.forEach((t) => {
      const sub = t.Subsistema || t.subsystem || t.Workstream || t.Fase || t.phase;
      if (sub) set.add(String(sub));
    });
    return Array.from(set);
  }, [effectiveBacklog]);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return effectiveBacklog
      .filter((task) => {
        const taskTitle = String(task.title || task.Tarea || task['Tarea / entregable'] || '').toLowerCase();
        const taskDesc = String(task.description || task['Criterio de aceptación / salida esperada'] || '').toLowerCase();
        const taskResp = String(task.responsible || task.Responsable || '').toLowerCase();
        const taskNotes = String(task.notes || task.Notas || '').toLowerCase();
        const taskId = String(task.taskId || task.ID || task['No.'] || '').toLowerCase();
        const matchesQuery = !q || taskTitle.includes(q) || taskDesc.includes(q) || taskResp.includes(q) || taskNotes.includes(q) || taskId.includes(q);

        const taskPri = String(task.priority || task.Prioridad || 'Media');
        const matchesPriority = priority === 'Todas' || taskPri === priority;

        const taskStat = String(task.status || task.Estado || 'Por iniciar');
        const matchesStatus = status === 'Todos' || taskStat === status;

        const taskSub = String(task.subsystem || task.Subsistema || task.Workstream || task.phase || task.Fase || '');
        const matchesWorkstream = workstream === 'Todos' || taskSub === workstream;

        return matchesQuery && matchesPriority && matchesStatus && matchesWorkstream;
      })
      .sort((a, b) => {
        const aPri = priorityRank[String(a.priority || a.Prioridad || 'Media')] ?? 99;
        const bPri = priorityRank[String(b.priority || b.Prioridad || 'Media')] ?? 99;
        if (aPri !== bPri) return aPri - bPri;
        const aId = Number(a.taskId || a.ID || a['No.'] || 0);
        const bId = Number(b.taskId || b.ID || b['No.'] || 0);
        return aId - bId;
      });
  }, [effectiveBacklog, priority, query, status, workstream]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/dashboard/rover-control-data?t=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) throw new Error('No se pudo leer el control de rover');
      const loaded: RoverControlData = await response.json();
      setRoverData(loaded);
    } catch {
      // Fallback to legacy backlog
      try {
        const fallbackRes = await fetch('/api/dashboard/backlog-data?t=' + Date.now(), { cache: 'no-store' });
        if (fallbackRes.ok) {
          const legacy = await fallbackRes.json();
          setRoverData({
            generatedAt: legacy.generatedAt,
            globalMetrics: {
              roverReadiness: 0,
              totalEngineeringTasks: legacy.sheets.backlog?.length || 0,
              totalCompletedTasks: 0,
              totalInProgressTasks: 0,
              areasCount: 1,
            },
            areas: {
              '01_mecanica': {
                id: '01_mecanica',
                code: 'MEC',
                name: 'Mecánica — Chasis y Estructura',
                shortName: 'Mecánica',
                icon: 'Layers3',
                lead: 'José Alberto Galván Portales',
                color: '#f5d061',
                isProjectManagement: false,
                source: legacy.source,
                sourcePath: '',
                totalTasks: legacy.sheets.backlog?.length || 0,
                completedTasks: 0,
                inProgressTasks: 0,
                notStartedTasks: legacy.sheets.backlog?.length || 0,
                blockedTasks: 0,
                overallProgress: 0,
                phases: [],
                subsystems: [],
                responsibles: [],
                tasks: legacy.sheets.backlog || [],
              },
            },
            secondary: {
              requirements: legacy.sheets.requirements || [],
              interfaces: legacy.sheets.interfaces || [],
              risks: legacy.sheets.risks || [],
              milestones: legacy.sheets.milestones || [],
            },
          });
        }
      } catch {
        setError('No pude conectar con el almacenamiento del Rover. Confirma que los archivos estén sincronizados.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Ported as-is: initial data load. Revisit in the redesign.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void refresh(); }, [refresh]);

  const navigateToView = useCallback((targetView: ViewName) => {
    const currentIndex = views.indexOf(view);
    const targetIndex = views.indexOf(targetView);
    setDirection(targetIndex >= currentIndex ? 'right' : 'left');
    setView(targetView);
  }, [view]);

  const toggleTaskExpand = useCallback((taskId: string) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  }, []);

  // Editing drawer actions
  const handleOpenEdit = useCallback((task: Row) => {
    const rawId = task.id ?? task.ID ?? task['No.'];
    const taskId = String(rawId);
    setEditingTaskId(taskId);
    const rawProgress = task.Avance != null ? Number(task.Avance) : (task.progress != null ? Number(task.progress) : 0);
    const pct = rawProgress <= 1 ? Math.round(rawProgress * 100) : Math.round(rawProgress);
    setEditDraft({
      progress: pct,
      status: String(task.Estado || task.status || 'Por iniciar'),
      responsible: String(task.Responsable || task.responsible || ''),
      notes: String(task.Notas || task.notes || ''),
    });
  }, []);

  const handleSaveEdit = useCallback((task: Row) => {
    if (!editingTaskId) return;
    const title = String(task.title || task.Tarea || task['Tarea / entregable'] || `Tarea #${editingTaskId}`);
    const taskAreaId = String(task.areaId || currentArea?.id || '01_mecanica');
    const taskAreaName = String(task.areaName || currentArea?.name || 'Mecánica — Chasis y Estructura');
    const rawNumber = task.taskId ?? task.ID ?? task['No.'];
    const taskNumber = rawNumber != null && !isNaN(Number(rawNumber)) ? Number(rawNumber) : undefined;

    saveTaskEdit({
      taskId: editingTaskId,
      taskNumber,
      taskTitle: title,
      areaId: taskAreaId,
      areaName: taskAreaName,
      progress: editDraft.progress / 100,
      status: editDraft.status,
      responsible: editDraft.responsible,
      notes: editDraft.notes,
    });
    setEditingTaskId(null);
  }, [editingTaskId, currentArea, editDraft]);

  const handleRevertEdit = useCallback((taskId: string) => {
    removeEdit(taskId);
    setEditingTaskId(null);
  }, []);

  const handleVerifyAdminPassword = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminAuthError('');
      setAdminPasswordInput('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('spacemakers_admin_auth', 'true');
      }
    } else {
      setAdminAuthError('Contraseña incorrecta. Solo el administrador puede autorizar la sincronización.');
    }
  }, [adminPasswordInput]);

  const handleAdminLogout = useCallback(() => {
    setIsAdminAuthenticated(false);
    setAdminPasswordInput('');
    setAdminAuthError('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('spacemakers_admin_auth');
    }
  }, []);

  const handleExecuteDirectSync = useCallback(async () => {
    if (!isAdminAuthenticated) {
      setSyncStatus('error');
      setSyncMessage('Acceso no autorizado. Se requiere contraseña de administrador.');
      return;
    }
    setSyncStatus('syncing');
    setSyncMessage('Selecciona el archivo Excel del área que deseas actualizar en tu OneDrive...');
    try {
      const res = await syncDirectToExcelFile(pendingEditsList);
      if (res.success) {
        setSyncStatus('success');
        setSyncMessage(res.message);
        setTimeout(() => {
          void refresh();
        }, 1200);
      } else {
        setSyncStatus('idle');
        setSyncMessage(res.message);
      }
    } catch (err) {
      const errorObj = err as Error;
      if (errorObj.message === 'FILE_SYSTEM_API_NOT_SUPPORTED') {
        setSyncStatus('error');
        setSyncMessage('Tu navegador actual no soporta acceso directo a archivos. Usa el botón de abajo para descargar la copia modificada.');
      } else {
        setSyncStatus('error');
        setSyncMessage(`Error: ${errorObj.message}`);
      }
    }
  }, [isAdminAuthenticated, pendingEditsList, refresh]);

  const handleExecuteDownloadSync = useCallback(async (file: File) => {
    if (!isAdminAuthenticated) {
      setSyncStatus('error');
      setSyncMessage('Acceso no autorizado. Se requiere contraseña de administrador.');
      return;
    }
    setSyncStatus('syncing');
    setSyncMessage('Generando archivo con las celdas actualizadas...');
    try {
      const res = await syncViaDownload(file, pendingEditsList);
      setSyncStatus('success');
      setSyncMessage(res.message);
      setTimeout(() => {
        void refresh();
      }, 1200);
    } catch (err) {
      setSyncStatus('error');
      setSyncMessage(`Error: ${(err as Error).message}`);
    }
  }, [isAdminAuthenticated, pendingEditsList, refresh]);

  const focusRisk = useCallback((riskId: string) => {
    setSelectedRiskId(riskId);
    requestAnimationFrame(() => {
      document.getElementById(`risk-${riskId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const resetFilters = useCallback(() => {
    setQuery('');
    setPriority('Todas');
    setStatus('Todos');
    setWorkstream('Todos');
  }, []);

  const summary = useMemo(() => {
    const total = effectiveBacklog.length;
    const complete = effectiveBacklog.filter((t) => {
      const s = String(t.status || t.Estado || '');
      const p = Number(t.progress || t.Avance || 0);
      return s === 'Terminado' || p >= 1;
    }).length;
    const inProgress = effectiveBacklog.filter((t) => {
      const s = String(t.status || t.Estado || '');
      const p = Number(t.progress || t.Avance || 0);
      return s === 'En progreso' || (p > 0 && p < 1);
    }).length;
    const sum = effectiveBacklog.reduce((acc, t) => acc + Number(t.progress || t.Avance || 0), 0);
    const avg = total > 0 ? (sum / total) * 100 : 0;
    const urgent = effectiveBacklog.filter((t) => String(t.priority || t.Prioridad) === 'Crítica' || String(t.priority || t.Prioridad) === 'Alta').slice(0, 5);
    return { total, complete, inProgress, avg, urgent };
  }, [effectiveBacklog]);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <header className="topbar">
        <h1>{currentArea ? `${currentArea.shortName} · Telemetría` : 'Control de Rover'}</h1>
        <div className="sync-cluster">
          <div className="sync-copy">
            <span className="connection-dot" />
            <div>
              <strong>{currentArea ? currentArea.name : 'Rover Completo (10 Áreas)'}</strong>
              <small>{roverData ? 'Actualizado ' + shortDate(roverData.generatedAt) : 'Conectando…'}</small>
            </div>
          </div>
          <Button
            onClick={() => {
              setSyncStatus('idle');
              setSyncMessage('');
              setSyncModalOpen(true);
            }}
            variant="outline"
            className={`sync-excel-btn ${pendingEditsList.length > 0 ? 'has-pending' : ''}`}
            title="Sincronizar cambios de la web con OneDrive"
          >
            <UploadCloud className="size-4" />
            <span>Sincronizar a Excel</span>
            {pendingEditsList.length > 0 ? (
              <span className="pending-counter">{pendingEditsList.length}</span>
            ) : null}
          </Button>
          <Button onClick={() => void refresh()} disabled={loading} variant="outline" className="refresh-button">
            <RefreshCw className={loading ? 'animate-spin' : ''} /> Actualizar
          </Button>
        </div>
      </header>

      {/* Cyber Ribbon: Multi-Area Navigation */}
      <nav className="area-nav-strip" aria-label="Navegación de Áreas de Ingeniería">
        <div className="area-nav-scroll">
          <button
            type="button"
            className={`area-chip ${selectedAreaId === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedAreaId('all');
              setView('inicio');
            }}
          >
            <Rocket className="size-3.5" />
            <span>General</span>
            <span className="area-chip-badge">
              {Math.round((roverData?.globalMetrics.roverReadiness ?? 0) * 100)}%
            </span>
          </button>

          {roverData && Object.values(roverData.areas).map((area) => (
            <button
              key={area.id}
              type="button"
              className={`area-chip ${selectedAreaId === area.id ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedAreaId(area.id);
                setView('backlog');
                setWorkstream('Todos');
                setQuery('');
              }}
            >
              {getAreaIcon(area.id)}
              <span>{area.shortName}</span>
              <span className="area-chip-badge">{Math.round((area.overallProgress ?? 0) * 100)}%</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="workspace">
        {error ? <div className="error-banner"><AlertTriangle />{error}</div> : null}

        <Tabs
          value={view}
          onValueChange={(value) => navigateToView(value as ViewName)}
          data-slide-direction={direction}
          className="w-full tabs-slide-container"
        >
          <div className="section-heading">
            <TabsList className="view-tabs">
              <TabsIndicator className="view-tab-indicator" />
              <TabsTrigger value="inicio"><HomeIcon className="size-3.5" /> {selectedAreaId === 'all' ? 'Control de Rover' : 'Resumen'}</TabsTrigger>
              <TabsTrigger value="backlog"><ListTodo className="size-3.5" /> Backlog ({filteredTasks.length})</TabsTrigger>
              <TabsTrigger value="resumen"><LayoutDashboard className="size-3.5" /> Métricas</TabsTrigger>
              {(selectedAreaId === 'all' || selectedAreaId === '01_mecanica') ? (
                <>
                  <TabsTrigger value="requisitos"><FileText className="size-3.5" /> Requisitos</TabsTrigger>
                  <TabsTrigger value="interfaces"><Layers3 className="size-3.5" /> Interfaces</TabsTrigger>
                  <TabsTrigger value="riesgos"><ShieldAlert className="size-3.5" /> Riesgos</TabsTrigger>
                  <TabsTrigger value="hitos"><Flag className="size-3.5" /> Hitos</TabsTrigger>
                </>
              ) : null}
            </TabsList>
          </div>

          {/* TAB 1: INICIO (Control de Rover Global o Hero de Área) */}
          <TabsContent value="inicio" className="view-slide-pane">
            {selectedAreaId === 'all' ? (
              <div className="space-y-6">
                {/* Mission Control Master Hero */}
                <div className="mission-control-hero">
                  <div className="mission-control-header">
                    <div className="mission-hero-title">
                      <span className="mission-hero-tag">
                        <Rocket className="size-3.5" /> Centro de Telemetría e Ingeniería · URC 2027
                      </span>
                      <h2>Control de Rover Space Makers</h2>
                      <p>
                        Monitoreo integral y sincronización bidireccional en tiempo real de las 10 divisiones de ingeniería para el University Rover Challenge 2027.
                      </p>
                    </div>
                    <div className="global-readiness-card">
                      <div className="readiness-number">
                        {Math.round((roverData?.globalMetrics.roverReadiness ?? 0) * 100)}%
                      </div>
                      <div className="readiness-meta">
                        <strong>Preparación Global del Rover</strong>
                        <small>Promedio ponderado de 9 áreas técnicas</small>
                      </div>
                    </div>
                  </div>

                  <div className="mission-stats-grid">
                    <div className="mission-stat-box">
                      <span className="stat-label">Total Tareas Rover</span>
                      <div className="stat-val">{roverData?.globalMetrics.totalEngineeringTasks ?? 511}</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">Áreas Activas</span>
                      <div className="stat-val">10 / 10</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">Tareas en Progreso</span>
                      <div className="stat-val text-amber-400">{roverData?.globalMetrics.totalInProgressTasks ?? 0}</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">Entregables Listos</span>
                      <div className="stat-val text-emerald-400">{roverData?.globalMetrics.totalCompletedTasks ?? 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Scoped Area Overview Dashboard (Balanced Full-Width Layout) */
              <div className="space-y-6">
                {/* Area Hero Banner (Full width) */}
                <div className="mission-control-hero">
                  <div className="mission-control-header">
                    <div className="mission-hero-title">
                      <span className="mission-hero-tag">
                        {getAreaIcon(currentArea?.id || '')} Subsistema {currentArea?.code} · URC 2027
                      </span>
                      <h2>{currentArea?.name}</h2>
                      <p>
                        Líder de división: <strong className="text-white">{currentArea?.lead}</strong> · {currentArea?.source} ({summary.total} entregables programados).
                      </p>
                      <div className="hero-actions-bar">
                        <Button size="default" className="hero-primary-btn" onClick={() => navigateToView('backlog')}>
                          Ver backlog de {currentArea?.shortName} ({summary.total} tareas) <ArrowRight className="size-4" />
                        </Button>
                        <Button size="default" variant="outline" className="hero-secondary-btn" onClick={() => setSelectedAreaId('all')}>
                          ← Volver a Control de Rover
                        </Button>
                      </div>
                    </div>

                    <div className="global-readiness-card">
                      <div className="readiness-number">
                        {Math.round(summary.avg)}%
                      </div>
                      <div className="readiness-meta">
                        <strong>Avance del Subsistema</strong>
                        <small>{summary.complete} de {summary.total} entregables listos</small>
                      </div>
                    </div>
                  </div>

                  <div className="mission-stats-grid">
                    <div className="mission-stat-box">
                      <span className="stat-label">Total Tareas</span>
                      <div className="stat-val">{summary.total}</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">Fases de Ingeniería</span>
                      <div className="stat-val text-amber-400">{currentArea?.phases.length ?? 0}</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">En Progreso</span>
                      <div className="stat-val text-amber-400">{summary.inProgress}</div>
                    </div>
                    <div className="mission-stat-box">
                      <span className="stat-label">Terminadas</span>
                      <div className="stat-val text-emerald-400">{summary.complete}</div>
                    </div>
                  </div>
                </div>

                {/* Balanced 2-Column Dashboard Grid */}
                <div className="area-dashboard-grid">
                  {/* Columna Izquierda: Fases de Ingeniería */}
                  <div className="area-phases-card">
                    <div className="panel-title-cluster">
                      <div>
                        <p className="eyebrow">Fases y líneas de trabajo</p>
                        <h3>Desglose de Ingeniería ({currentArea?.phases.length ?? 0} fases)</h3>
                      </div>
                      <Layers3 className="size-5 text-amber-400" />
                    </div>
                    <p className="panel-subtitle">Haz clic en cualquier fase para explorar directamente sus tareas en el backlog:</p>

                    <div className="area-phases-list">
                      {currentArea?.phases.map((phase, idx) => {
                        const phaseTasks = effectiveBacklog.filter((t) => String(t.workstream || t.Workstream) === phase);
                        const phaseTotal = phaseTasks.length;
                        const phaseDone = phaseTasks.filter((t) => {
                          const s = String(t.status || t.Estado || '');
                          const p = Number(t.progress || t.Avance || 0);
                          return s === 'Terminado' || p >= 1;
                        }).length;
                        const phaseProgress = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;
                        return (
                          <div
                            key={phase}
                            className="area-phase-row"
                            onClick={() => {
                              setWorkstream(phase);
                              setView('backlog');
                            }}
                          >
                            <div className="phase-row-left">
                              <span className="phase-index-badge">{String(idx + 1).padStart(2, '0')}</span>
                              <div className="min-w-0">
                                <strong className="phase-name">{phase}</strong>
                                <span className="phase-meta">{phaseTotal} tareas · {phaseDone} completadas</span>
                              </div>
                            </div>
                            <div className="phase-row-right">
                              <div className="phase-prog-wrap">
                                <span className="phase-prog-num">{phaseProgress}%</span>
                                <Progress value={phaseProgress} className="h-1.5 w-16" />
                              </div>
                              <ChevronRight className="size-4 text-muted-foreground" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Columna Derecha: Tareas Prioritarias y Equipo */}
                  <div className="area-right-column">
                    {/* Tareas Clave / Prioridad */}
                    <div className="area-tasks-card">
                      <div className="panel-title-cluster">
                        <div>
                          <p className="eyebrow">Prioridad actual</p>
                          <h3>Entregables Clave de {currentArea?.shortName}</h3>
                        </div>
                        <Target className="size-5 text-amber-400" />
                      </div>
                      <p className="panel-subtitle">Entregables de mayor criticidad para las metas URC 2027:</p>

                      <div className="area-tasks-stack">
                        {summary.urgent.length > 0 ? (
                          summary.urgent.slice(0, 4).map((task, idx) => (
                            <div
                              key={String(task.id || task.ID || idx)}
                              className="area-focus-task-card"
                              onClick={() => {
                                setView('backlog');
                                setExpandedTaskId(String(task.id || task.ID));
                              }}
                            >
                              <div className="task-card-top">
                                <span className="task-id-badge">#{String(task.id || task.ID)}</span>
                                <Badge className={priorityClass(String(task.priority || task.Prioridad))}>
                                  {String(task.priority || task.Prioridad || 'Media')}
                                </Badge>
                              </div>
                              <strong className="task-card-title">{String(task.title || task['Tarea / entregable'])}</strong>
                              <div className="task-card-footer">
                                <span className="task-ws-tag">{String(task.workstream || task.Workstream || currentArea?.name)}</span>
                                <span className="task-resp">
                                  <UserCheck className="size-3" /> {String(task.responsible || task.Responsable || 'Sin asignar')}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty-priority-box">
                            <CheckCircle2 className="size-6 text-emerald-400" />
                            <p>No hay tareas críticas pendientes reportadas en este subsistema.</p>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full mt-3 text-xs text-amber-400 hover:text-amber-300"
                        onClick={() => navigateToView('backlog')}
                      >
                        Ver todas las {summary.total} tareas en el backlog <ArrowRight className="size-3.5 ml-1" />
                      </Button>
                    </div>

                    {/* Equipo Técnico */}
                    {currentArea?.responsibles && currentArea.responsibles.length > 0 ? (
                      <div className="area-team-card">
                        <div className="team-card-header">
                          <Users className="size-4 text-amber-400" />
                          <h4>Equipo Técnico Asignado ({currentArea.responsibles.length})</h4>
                        </div>
                        <div className="team-badges-wrap">
                          {currentArea.responsibles.map((person) => (
                            <span key={person} className="team-member-pill">
                              <UserCheck className="size-3" /> {person}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Si es Mecánica: Topología Estructural del Chasis */}
                {currentArea?.id === '01_mecanica' ? (
                  <div className="rover-anatomy-card mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="eyebrow">Arquitectura de chasis</p>
                        <h4>Topología Estructural del Chasis & Suspensión</h4>
                      </div>
                      <Badge variant="outline">MEC / CHS</Badge>
                    </div>
                    <p>Navega a los subsistemas estructurales y módulos de integración mecánica:</p>
                    <div className="hotspots-grid">
                      <div
                        className="hotspot-card"
                        onClick={() => {
                          setWorkstream('3. Chasis y estructura');
                          setView('backlog');
                        }}
                      >
                        <div className="hotspot-icon-wrap"><Layers3 className="size-5" /></div>
                        <div className="hotspot-info"><strong>Chasis y Estructura</strong><small>Tubos, placas y soporte de cargas</small></div>
                      </div>
                      <div
                        className="hotspot-card"
                        onClick={() => {
                          setWorkstream('4. Suspensión y tracción');
                          setView('backlog');
                        }}
                      >
                        <div className="hotspot-icon-wrap"><Target className="size-5" /></div>
                        <div className="hotspot-info"><strong>Suspensión Rocker-Bogie</strong><small>Bogie, diferencial y ruedas</small></div>
                      </div>
                      <div
                        className="hotspot-card"
                        onClick={() => {
                          setWorkstream('7. Interfaces y montajes');
                          setView('backlog');
                        }}
                      >
                        <div className="hotspot-icon-wrap"><Wrench className="size-5" /></div>
                        <div className="hotspot-info"><strong>Interfaces Mecánicas</strong><small>Montajes de brazo, ciencia y mástil</small></div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: BACKLOG (Con la estructura clásica y probada de globals.css) */}
          <TabsContent value="backlog" className="data-panel view-slide-pane">
            <div className="data-panel-header">
              <div>
                <p className="eyebrow">
                  {currentArea ? `${currentArea.code} · ${currentArea.shortName}` : 'Rover completo · 10 áreas'}
                </p>
                <h3>Backlog de Tareas</h3>
                <p>
                  {currentArea
                    ? `Gestionando ${currentArea.name} (Líder: ${currentArea.lead}). Selecciona una tarea para editar su avance o ver detalles.`
                    : 'Consolidado general de ingeniería. Selecciona un área específica arriba para filtrar con mayor precisión.'}
                </p>
              </div>
              <strong className="result-count">
                {filteredTasks.length}
                <small>tareas</small>
              </strong>
            </div>

            {/* Filter Bar Grid */}
            <div className="filter-bar">
              <label className="search-field">
                <Search />
                <span className="sr-only">Buscar</span>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por ID, tarea, descripción o responsable…"
                />
              </label>

              <NativeSelect
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                aria-label="Filtrar por área"
              >
                <NativeSelectOption value="all">Todas las áreas</NativeSelectOption>
                {roverData && Object.values(roverData.areas).map((a) => (
                  <NativeSelectOption key={a.id} value={a.id}>{a.shortName}</NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                aria-label="Filtrar por prioridad"
              >
                <NativeSelectOption value="Todas">Todas las prioridades</NativeSelectOption>
                <NativeSelectOption value="Crítica">Crítica</NativeSelectOption>
                <NativeSelectOption value="Alta">Alta</NativeSelectOption>
                <NativeSelectOption value="Media">Media</NativeSelectOption>
                <NativeSelectOption value="Baja">Baja</NativeSelectOption>
              </NativeSelect>

              <NativeSelect
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filtrar por estado"
              >
                <NativeSelectOption value="Todos">Todos los estados</NativeSelectOption>
                <NativeSelectOption value="Por iniciar">Por iniciar</NativeSelectOption>
                <NativeSelectOption value="En progreso">En progreso</NativeSelectOption>
                <NativeSelectOption value="Terminado">Terminado</NativeSelectOption>
                <NativeSelectOption value="Bloqueado">Bloqueado</NativeSelectOption>
                <NativeSelectOption value="Por decidir">Por decidir</NativeSelectOption>
              </NativeSelect>

              <NativeSelect
                value={workstream}
                onChange={(e) => setWorkstream(e.target.value)}
                aria-label="Filtrar por fase o subárea"
              >
                <NativeSelectOption value="Todos">Todas las fases / subáreas</NativeSelectOption>
                {dynamicSubsystems.map((sub) => (
                  <NativeSelectOption key={sub} value={sub}>{sub}</NativeSelectOption>
                ))}
              </NativeSelect>

              <Button variant="ghost" onClick={resetFilters}>
                <FilterX className="size-3.5" /> Limpiar
              </Button>
            </div>

            {/* Backlog List with classic rows */}
            <div className="backlog-list">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No se encontraron tareas con los filtros seleccionados.
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const rawId = task.id ?? task.ID ?? task['No.'];
                  const taskId = String(rawId);
                  const isExpanded = expandedTaskId === taskId;
                  const title = textValue(task.title || task.Tarea || task['Tarea / entregable']);
                  const sub = textValue(task.subsystem || task.Subsistema || task.Workstream || task.phase || task.Fase);
                  const resp = textValue(task.responsible || task.Responsable, 'Por asignar');
                  const pri = textValue(task.priority || task.Prioridad, 'Media');
                  const stat = textValue(task.status || task.Estado, 'Por iniciar');
                  const prog = asPercent(task.progress ?? task.Avance);
                  const deadline = task.deadline || task['Fecha objetivo'] || task['Fecha propuesta'];

                  return (
                    <div
                      key={taskId}
                      className={`backlog-item-group ${isExpanded ? 'is-expanded' : ''}`}
                    >
                      <button
                        type="button"
                        className={`backlog-row ${isExpanded ? 'is-active' : ''}`}
                        onClick={() => toggleTaskExpand(taskId)}
                        aria-expanded={isExpanded}
                        aria-controls={`task-inline-${taskId}`}
                      >
                        <span className="row-id">
                          {task.taskId ? `#${task.taskId}` : `#${taskId.replace(/^[a-z0-9_]+-/, '')}`}
                        </span>
                        <span className="row-main">
                          <strong>{title}</strong>
                          <small>
                            {task.areaName ? `${String(task.areaName).split('—')[0].trim()} · ` : ''}{sub}
                          </small>
                        </span>
                        <span className="row-owner">
                          <Users className="size-3.5 shrink-0" />
                          <span>{resp}</span>
                        </span>
                        <Badge className={priorityClass(pri)}>{pri}</Badge>
                        <span className="row-date">
                          <CalendarDays className="size-3.5 shrink-0" />
                          <span>{shortDate(deadline)}</span>
                        </span>
                        <span className={`state-pill ${statusClass(stat)}`}>{stat}</span>
                        {task._isModifiedInWeb ? (
                          <span
                            className="web-edit-pill"
                            title={task._syncedToExcel ? 'Sincronizado a Excel' : 'Cambio pendiente de sincronizar a Excel'}
                          >
                            {task._syncedToExcel ? '✓ Sync' : '✎ Web'}
                          </span>
                        ) : null}
                        <ChevronDown className={`row-chevron ${isExpanded ? 'open' : ''}`} />
                      </button>

                      {isExpanded ? (
                        <div className="backlog-inline-detail" id={`task-inline-${taskId}`}>
                          <div className="detail-banner">
                            <div className="detail-meta-tags">
                              {task.areaName ? (
                                <span className="detail-section">{String(task.areaName)}</span>
                              ) : null}
                              <span className="detail-workstream">{sub}</span>
                              <Badge className={priorityClass(pri)}>{pri}</Badge>
                              <span className={`state-pill ${statusClass(stat)}`}>{stat}</span>
                              {task.Aplicabilidad && task.Aplicabilidad !== 'Aplica' ? (
                                <span className={`detail-applicability ${task.Aplicabilidad === 'Por decidir' ? 'warn' : ''}`}>
                                  {String(task.Aplicabilidad)}
                                </span>
                              ) : null}
                            </div>
                            <div className="detail-progress-cluster">
                              <div className="detail-progress-label">
                                <span>Avance</span>
                                <strong>{prog}%</strong>
                              </div>
                              <Progress value={prog} className="detail-progress-bar" />
                            </div>
                          </div>

                          {task.description || task['Criterio de aceptación / salida esperada'] || task['Trabajo y criterio de cierre'] ? (
                            <div className="detail-acceptance-card">
                              <div className="acceptance-label">
                                <ListChecks />
                                <span>Descripción / criterio de aceptación</span>
                              </div>
                              <p className="acceptance-text">
                                {textValue(task.description || task['Criterio de aceptación / salida esperada'] || task['Trabajo y criterio de cierre'])}
                              </p>
                            </div>
                          ) : null}

                          <div className="detail-fields-grid">
                            <div className="detail-field">
                              <dt><Users /> Responsable</dt>
                              <dd>{resp}</dd>
                            </div>
                            <div className="detail-field">
                              <dt><CalendarDays /> Fecha objetivo</dt>
                              <dd>{shortDate(deadline)}</dd>
                            </div>
                            <div className="detail-field">
                              <dt><Layers3 /> Dependencias</dt>
                              <dd>{textValue(task.dependencies || task.Dependencia || task['Dependencias (No.)'], 'Ninguna')}</dd>
                            </div>
                            {task.hours ? (
                              <div className="detail-field">
                                <dt><Clock3 /> Horas Estimadas</dt>
                                <dd>{task.hours} hrs</dd>
                              </div>
                            ) : null}
                            {task['Notas de planificación'] || task.Notas || task.notes ? (
                              <div className="detail-field full-width">
                                <dt><FileText /> Notas técnicas / Bitácora</dt>
                                <dd className="detail-notes">
                                  {String(task['Notas de planificación'] || task.Notas || task.notes)}
                                </dd>
                              </div>
                            ) : null}
                          </div>

                          {/* Inline 24/7 Editor Controls */}
                          <div className="detail-edit-container">
                            {editingTaskId === taskId ? (
                              <div className="task-edit-panel">
                                <div className="edit-panel-header">
                                  <h5>
                                    <Edit3 className="size-4" /> Editando tarea #{task.taskId ?? taskId}
                                  </h5>
                                  <span className="edit-hint">Cambios guardados 24/7 en la nube</span>
                                </div>

                                <div className="edit-grid">
                                  <div className="edit-field">
                                    <label>Avance: <strong>{editDraft.progress}%</strong></label>
                                    <div className="edit-progress-controls">
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={editDraft.progress}
                                        onChange={(e) => {
                                          const val = Number(e.target.value);
                                          setEditDraft((prev) => ({
                                            ...prev,
                                            progress: val,
                                            status: val === 100 ? 'Terminado' : val > 0 && prev.status === 'Por iniciar' ? 'En progreso' : prev.status,
                                          }));
                                        }}
                                        className="progress-range-slider"
                                      />
                                      <div className="quick-progress-buttons">
                                        {[0, 25, 50, 75, 100].map((pct) => (
                                          <button
                                            key={pct}
                                            type="button"
                                            className={`quick-pct-btn ${editDraft.progress === pct ? 'active' : ''}`}
                                            onClick={() => {
                                              setEditDraft((prev) => ({
                                                ...prev,
                                                progress: pct,
                                                status: pct === 100 ? 'Terminado' : pct > 0 && prev.status === 'Por iniciar' ? 'En progreso' : prev.status,
                                              }));
                                            }}
                                          >
                                            {pct}%
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="edit-field">
                                    <label>Estado</label>
                                    <NativeSelect
                                      value={editDraft.status}
                                      onChange={(e) => setEditDraft((prev) => ({ ...prev, status: e.target.value }))}
                                    >
                                      <NativeSelectOption value="Por iniciar">Por iniciar</NativeSelectOption>
                                      <NativeSelectOption value="En progreso">En progreso</NativeSelectOption>
                                      <NativeSelectOption value="Terminado">Terminado</NativeSelectOption>
                                      <NativeSelectOption value="Por decidir">Por decidir</NativeSelectOption>
                                      <NativeSelectOption value="Bloqueado">Bloqueado</NativeSelectOption>
                                      <NativeSelectOption value="No aplica">No aplica</NativeSelectOption>
                                    </NativeSelect>
                                  </div>

                                  <div className="edit-field">
                                    <label>Responsable</label>
                                    <Input
                                      value={editDraft.responsible}
                                      onChange={(e) => setEditDraft((prev) => ({ ...prev, responsible: e.target.value }))}
                                      placeholder="Nombre o área responsable"
                                    />
                                  </div>

                                  <div className="edit-field full-width">
                                    <label>Notas de planificación / bitácora</label>
                                    <textarea
                                      value={editDraft.notes}
                                      onChange={(e) => setEditDraft((prev) => ({ ...prev, notes: e.target.value }))}
                                      placeholder="Detalles del avance técnico, acuerdos o bloqueos..."
                                      rows={3}
                                      className="edit-notes-textarea"
                                    />
                                  </div>
                                </div>

                                <div className="edit-actions">
                                  <Button
                                    type="button"
                                    size="sm"
                                    className="save-edit-btn"
                                    onClick={() => handleSaveEdit(task)}
                                  >
                                    <Save className="size-3.5" /> Guardar cambios
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingTaskId(null)}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="task-drawer-actions">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="edit-task-btn"
                                  onClick={() => handleOpenEdit(task)}
                                >
                                  <Edit3 className="size-3.5" /> Editar tarea
                                </Button>
                                {task._isModifiedInWeb ? (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="revert-edit-btn"
                                    onClick={() => handleRevertEdit(taskId)}
                                  >
                                    Descartar cambios web
                                  </Button>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* TAB 3: RESUMEN / MÉTRICAS */}
          <TabsContent value="resumen" className="summary-grid view-slide-pane">
            <section className="focus-panel">
              <div className="panel-title">
                <div><p className="eyebrow">Prioridad actual</p><h3>Próximas tareas críticas</h3></div>
                <Target />
              </div>
              <div className="task-stack">
                {summary.urgent.map((task, index) => {
                  const rawId = task.id ?? task.ID ?? task['No.'];
                  const taskId = String(rawId);
                  return (
                    <button
                      className="focus-task"
                      key={taskId}
                      onClick={() => {
                        navigateToView('backlog');
                        setExpandedTaskId(taskId);
                      }}
                    >
                      <span className="task-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="task-main">
                        <strong>{textValue(task.title || task.Tarea || task['Tarea / entregable'])}</strong>
                        <small>{textValue(task.subsystem || task.Subsistema || task.Workstream)}</small>
                      </span>
                      <Badge className={priorityClass(textValue(task.priority || task.Prioridad))}>
                        {textValue(task.priority || task.Prioridad)}
                      </Badge>
                      <time>{shortDate(task.deadline || task['Fecha objetivo'])}</time>
                    </button>
                  );
                })}
              </div>
            </section>
          </TabsContent>

          {/* TAB 4: REQUISITOS */}
          <TabsContent value="requisitos" className="view-slide-pane">
            <div className="table-card">
              <div className="card-heading">
                <div><p className="eyebrow">Sistemas · requisitos</p><h3>Requisitos y trazabilidad técnica</h3></div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr><th>ID</th><th>Requisito</th><th>Tipo</th><th>Autoridad / Fuente</th><th>Criterio de verificación</th></tr>
                  </thead>
                  <tbody>
                    {(roverData?.secondary.requirements ?? []).map((req) => (
                      <tr key={String(req.ID)}>
                        <td><strong>{textValue(req.ID)}</strong></td>
                        <td>{textValue(req.Requisito)}</td>
                        <td><Badge variant="outline">{textValue(req.Tipo)}</Badge></td>
                        <td>{textValue(req['Fuente / autoridad'])}</td>
                        <td>{textValue(req['Criterio de verificación'])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: INTERFACES */}
          <TabsContent value="interfaces" className="view-slide-pane">
            <div className="table-card">
              <div className="card-heading">
                <div><p className="eyebrow">Control de interfaces</p><h3>Matriz de Interfaces entre Subsistemas</h3></div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr><th>ID</th><th>Subsistema A</th><th>Subsistema B</th><th>Tipo</th><th>Parámetros críticos</th></tr>
                  </thead>
                  <tbody>
                    {(roverData?.secondary.interfaces ?? []).map((inter) => (
                      <tr key={String(inter.ID)}>
                        <td><strong>{textValue(inter.ID)}</strong></td>
                        <td>{textValue(inter['Subsistema A'])}</td>
                        <td>{textValue(inter['Subsistema B'])}</td>
                        <td><Badge variant="outline">{textValue(inter.Tipo)}</Badge></td>
                        <td>{textValue(inter['Parámetros / Requisitos clave'])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: RIESGOS */}
          <TabsContent value="riesgos" className="view-slide-pane">
            <div className="risk-workspace">
              <div className="risk-matrix-panel">
                <div className="panel-title"><div><p className="eyebrow">Matriz 5×5</p><h3>Severidad y Mitigación</h3></div></div>
                <div className="matrix-grid">
                  {matrixProbabilities.map((prob) => (
                    <div key={prob} className="matrix-row">
                      <span className="matrix-y-axis">P{prob}</span>
                      {matrixConsequences.map((cons) => {
                        const score = prob * cons;
                        const matching = (roverData?.secondary.risks ?? []).filter((r) => Number(r.Probabilidad) === prob && Number(r.Impacto) === cons);
                        return (
                          <div key={cons} className={`matrix-cell ${riskMatrixClass(score)} ${matching.length > 0 ? 'has-risks' : ''}`}>
                            {matching.map((r) => (
                              <button key={String(r.ID)} className="matrix-risk-chip" onClick={() => focusRisk(String(r.ID))}>
                                #{r.ID}
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="risk-list">
                {(roverData?.secondary.risks ?? []).map((risk) => (
                  <article key={String(risk.ID)} id={`risk-${risk.ID}`} className={`risk-card ${selectedRiskId === String(risk.ID) ? 'is-selected' : ''}`}>
                    <div className="risk-score">
                      <strong>{Number(risk.Probabilidad || 0) * Number(risk.Impacto || 0)}</strong>
                      <small>Severidad</small>
                    </div>
                    <div className="risk-main">
                      <h4>{textValue(risk.Riesgo)}</h4>
                      <p>{textValue(risk['Estrategia de mitigación'])}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 7: HITOS */}
          <TabsContent value="hitos" className="view-slide-pane">
            <div className="timeline">
              {(roverData?.secondary.milestones ?? []).map((milestone, index) => (
                <article key={`${String(milestone.Hito)}-${index}`} className="timeline-item">
                  <div className="timeline-date">{shortDate(milestone['Fecha objetivo'])}</div>
                  <div className="timeline-marker"><div className="timeline-dot" /><div className="timeline-line" /></div>
                  <div className="timeline-card">
                    <div className="card-top">
                      <Badge variant="outline">{textValue(milestone.Tipo)}</Badge>
                      <span className={`state-pill ${statusClass(textValue(milestone.Estado))}`}>{textValue(milestone.Estado)}</span>
                    </div>
                    <h4>{textValue(milestone.Hito)}</h4>
                    <p>{textValue(milestone['Criterio de salida para el área'])}</p>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* MODAL DE SINCRONIZACIÓN CON PROTECCIÓN ADMIN123 */}
      {syncModalOpen ? (
        <div className="sync-modal-overlay" onClick={() => setSyncModalOpen(false)}>
          <div className="sync-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-cluster">
                <UploadCloud className="modal-icon" />
                <div>
                  <h4>Sincronizar con Excel</h4>
                  <small>OneDrive · Archivos Oficiales Space Makers</small>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSyncModalOpen(false)}
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>

            {!isAdminAuthenticated ? (
              <div className="modal-body">
                <div className="admin-lock-card">
                  <div className="lock-icon-wrapper">
                    <Lock className="size-8" />
                  </div>
                  <h5>Acceso de Administrador Requerido</h5>
                  <p className="admin-lock-desc">
                    La sincronización modifica directamente las celdas en los archivos maestros de OneDrive. Ingresa la clave de administrador para desbloquear.
                  </p>
                  <form onSubmit={handleVerifyAdminPassword} className="admin-password-form">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminPasswordInput}
                      onChange={(e) => {
                        setAdminPasswordInput(e.target.value);
                        setAdminAuthError('');
                      }}
                      className="admin-pwd-input"
                      autoFocus
                    />
                    {adminAuthError ? (
                      <div className="admin-error-banner">
                        <AlertTriangle className="size-4 shrink-0" />
                        <span>{adminAuthError}</span>
                      </div>
                    ) : null}
                    <Button type="submit" className="sync-action-btn">
                      <Key className="size-4" />
                      <span>Desbloquear Sincronización</span>
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <div className="admin-status-bar">
                  <span className="admin-active-badge">
                    <ShieldCheck className="size-4" /> Administrador autenticado
                  </span>
                  <button type="button" onClick={handleAdminLogout} className="admin-logout-link">
                    Bloquear sesión
                  </button>
                </div>

                {pendingEditsList.length > 0 ? (
                  <>
                    <p className="modal-intro">
                      Hay <strong>{pendingEditsList.length}</strong> tareas modificadas desde la web listas para actualizarse en OneDrive:
                    </p>

                    {/* Pending areas breakdown with clear file & folder guidance */}
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-2.5 my-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-normal text-amber-300 flex items-center gap-1.5">
                          <FileSpreadsheet className="size-4" />
                          Archivos Excel a seleccionar ({pendingByArea.length} {pendingByArea.length === 1 ? 'área' : 'áreas'} con cambios)
                        </span>
                        <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-300">
                          1 archivo a la vez
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {pendingByArea.map((grp) => (
                          <div
                            key={grp.areaId}
                            className="rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs transition-colors hover:border-amber-400/40"
                          >
                            <div className="flex items-center justify-between font-normal text-white mb-1">
                              <span className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-amber-400 inline-block" />
                                {grp.areaName}
                              </span>
                              <Badge variant="secondary" className="text-[10px] bg-amber-400/15 text-amber-300 border-none">
                                {grp.count} {grp.count === 1 ? 'tarea' : 'tareas'}
                              </Badge>
                            </div>
                            <div className="flex flex-col gap-0.5 text-[11px] font-mono pl-3.5">
                              <div className="flex items-center gap-1 text-amber-300 font-normal">
                                <span>📄 Archivo:</span>
                                <span className="underline decoration-amber-400/50 underline-offset-2">{grp.filename}</span>
                              </div>
                              <div className="text-zinc-400 text-[10px] truncate" title={grp.folderPath}>
                                📂 Carpeta: {grp.folderPath}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-zinc-300/80 leading-relaxed pt-1">
                        💡 Al pulsar <strong>&quot;Actualizar en OneDrive&quot;</strong>, selecciona el archivo indicado arriba. Solo se sincronizarán las tareas de ese archivo, conservando las demás pendientes si hay cambios en otras áreas.
                      </p>
                    </div>

                    <div className="pending-diff-list">
                      {pendingEditsList.map((edit) => (
                        <div key={String(edit.taskId)} className="pending-diff-item">
                          <div className="diff-header">
                            <span className="diff-id">#{edit.taskId}</span>
                            <strong className="diff-title">{edit.taskTitle}</strong>
                            {edit.areaName ? (
                              <Badge variant="outline" className="text-[10px] ml-auto">
                                {edit.areaName}
                              </Badge>
                            ) : null}
                          </div>
                          <div className="diff-changes">
                            <span className="diff-tag">Avance: <strong>{Math.round(edit.progress * 100)}%</strong></span>
                            <span className="diff-tag">Estado: <strong>{edit.status}</strong></span>
                            {edit.responsible ? <span className="diff-tag">Resp: <strong>{edit.responsible}</strong></span> : null}
                          </div>
                          {edit.notes ? (
                            <p className="diff-notes-preview">&quot;{edit.notes}&quot;</p>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="modal-info-box">
                      <CheckCircle2 className="size-4" />
                      <span>Esta operación modifica directamente las celdas correspondientes conservando intacto todo el formato, fuentes y fórmulas del archivo.</span>
                    </div>
                  </>
                ) : (
                  <div className="empty-diff-state">
                    <CheckCircle2 className="size-10 text-emerald-400" />
                    <h5>¡Todo está al día!</h5>
                    <p>No hay cambios nuevos pendientes por guardar en los libros de Excel.</p>
                  </div>
                )}

                {syncMessage ? (
                  <div className={`sync-feedback-banner ${syncStatus}`}>
                    {syncStatus === 'syncing' ? <RefreshCw className="animate-spin size-4" /> : null}
                    {syncStatus === 'success' ? <CheckCircle2 className="size-4" /> : null}
                    {syncStatus === 'error' ? <AlertTriangle className="size-4" /> : null}
                    <span>{syncMessage}</span>
                  </div>
                ) : null}
              </div>
            )}

            <div className="modal-footer">
              <Button
                variant="outline"
                onClick={() => setSyncModalOpen(false)}
              >
                Cerrar
              </Button>
              {isAdminAuthenticated && pendingEditsList.length > 0 ? (
                <>
                  <Button
                    className="sync-action-btn"
                    disabled={syncStatus === 'syncing'}
                    onClick={() => void handleExecuteDirectSync()}
                  >
                    {syncStatus === 'syncing' ? (
                      <>
                        <RefreshCw className="animate-spin size-4" />
                        Escribiendo en Excel…
                      </>
                    ) : (
                      <>
                        <UploadCloud className="size-4" />
                        Actualizar en OneDrive
                      </>
                    )}
                  </Button>
                  <label className="download-fallback-btn">
                    <Download className="size-3.5" />
                    <span>Descargar copia .xlsx</span>
                    <input
                      type="file"
                      accept=".xlsx"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleExecuteDownloadSync(file);
                      }}
                    />
                  </label>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
