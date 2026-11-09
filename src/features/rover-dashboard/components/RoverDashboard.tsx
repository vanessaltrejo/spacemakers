'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle, CalendarDays, ChevronDown,
  Clock3, Edit3, FileText, FilterX,
  FlaskConical, Layers3, LayoutDashboard, ListChecks,
  Plane, Radio, RefreshCw, Rocket, Save, Search, ShieldAlert,
  Target, UploadCloud, Users, Wrench, Zap, Cpu
} from 'lucide-react';
import { asPercent, shortDate, shortDayMonth, textValue } from '@/features/rover-dashboard/lib/format';
import type { AreaData, Row, RoverControlData } from '@/features/rover-dashboard/types';
import { SyncModal } from '@/features/rover-dashboard/components/SyncModal';
import { OverviewDashboard } from '@/features/rover-dashboard/components/overview/OverviewDashboard';
import { Badge } from '@/features/rover-dashboard/components/ui/badge';
import { Button } from '@/features/rover-dashboard/components/ui/button';
import { Input } from '@/features/rover-dashboard/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/features/rover-dashboard/components/ui/native-select';
import { Progress } from '@/features/rover-dashboard/components/ui/progress';
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/features/rover-dashboard/components/ui/tabs';
import {
  getStoredEdits, saveTaskEdit, subscribeToEdits, removeEdit, type TaskEdit,
} from '@/features/rover-dashboard/lib/taskSyncService';

type ViewName = 'inicio' | 'backlog';

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void>;
    };
  }
}

const views: ViewName[] = ['inicio', 'backlog'];
const priorityRank: Record<string, number> = { Crítica: 0, Alta: 1, Media: 2, Baja: 3 };

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
  const [edits, setEdits] = useState<Record<string, TaskEdit>>({});
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ progress: number; status: string; responsible: string; notes: string }>({
    progress: 0,
    status: 'Por iniciar',
    responsible: '',
    notes: '',
  });

  // Hydrates the saved web edits from localStorage after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEdits(getStoredEdits());
    return subscribeToEdits(() => {
      setEdits(getStoredEdits());
    });
  }, []);

  const pendingEditsList = useMemo(() => {
    return Object.values(edits).filter((e) => !e.syncedToExcel);
  }, [edits]);

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
    // Keep a filter picked from the overview (e.g. a phase) visible in the dropdown.
    if (workstream !== 'Todos') set.add(workstream);
    return Array.from(set);
  }, [effectiveBacklog, workstream]);

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

        // A workstream filter can be a subsystem or an engineering phase (the overview links to phases).
        const matchesWorkstream = workstream === 'Todos'
          || [task.subsystem, task.Subsistema, task.Workstream, task.phase, task.Fase].some((value) => String(value ?? '') === workstream);

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

  /** Picks an area and stays on the current tab. */
  const selectArea = useCallback((areaId: string) => {
    setSelectedAreaId(areaId);
    setWorkstream('Todos');
    setQuery('');
  }, []);

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

  /** Short, unique task label such as "MEC-4" (task numbers alone repeat in every area). */
  const taskLabel = useCallback((task: Row) => {
    const number = task.taskId ?? String(task.id ?? '').replace(/^[a-z0-9_]+-/, '');
    const code = roverData?.areas[String(task.areaId ?? '')]?.code;
    return code ? `${code}-${number}` : `#${number}`;
  }, [roverData]);

  const hasActiveFilters = query.trim() !== '' || priority !== 'Todas' || status !== 'Todos' || workstream !== 'Todos';

  const resetFilters = useCallback(() => {
    setQuery('');
    setPriority('Todas');
    setStatus('Todos');
    setWorkstream('Todos');
  }, []);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">


    <Tabs
      value={view}
      onValueChange={(value) => navigateToView(value as ViewName)}
      data-slide-direction={direction}
      className="w-full gap-0 tabs-slide-container"
    >
      <header className="topbar">
        <h1>{currentArea ? currentArea.name : 'Control de Rover'}</h1>
        <TabsList className="view-tabs">
          <TabsIndicator className="view-tab-indicator" />
          <TabsTrigger value="inicio">Resumen</TabsTrigger>
          <TabsTrigger value="backlog">Backlog ({filteredTasks.length})</TabsTrigger>
        </TabsList>
        <div className="sync-cluster">
          <span className="sync-updated" title={roverData ? 'Datos actualizados el ' + shortDate(roverData.generatedAt) : undefined}>
            <span className="connection-dot" />
            {roverData ? (
              <>
                <span className="max-sm:hidden">Actualizado</span> {shortDayMonth(roverData.generatedAt)}
              </>
            ) : (
              'Conectando…'
            )}
          </span>
          {pendingEditsList.length > 0 ? (
            <Button
              onClick={() => setSyncModalOpen(true)}
              variant="outline"
              className="sync-excel-btn has-pending"
              title="Guardar en Excel los cambios hechos aquí"
            >
              <UploadCloud className="size-4" />
              <span>Guardar en Excel</span>
              <span className="pending-counter">{pendingEditsList.length}</span>
            </Button>
          ) : null}
          <Button
            onClick={() => void refresh()}
            disabled={loading}
            variant="outline"
            size="icon"
            className="refresh-button"
            aria-label="Actualizar datos"
            title="Actualizar datos"
          >
            <RefreshCw className={loading ? 'animate-spin' : ''} />
          </Button>
        </div>
      </header>

      {/* Cyber Ribbon: Multi-Area Navigation */}
      <nav className="area-nav-strip" aria-label="Navegación de Áreas de Ingeniería">
        <div className="area-select-mobile">
          <NativeSelect value={selectedAreaId} onChange={(event) => selectArea(event.target.value)} aria-label="Área">
            <NativeSelectOption value="all">
              General · {Math.round((roverData?.globalMetrics.roverReadiness ?? 0) * 100)}%
            </NativeSelectOption>
            {roverData && Object.values(roverData.areas).map((area) => (
              <NativeSelectOption key={area.id} value={area.id}>
                {area.shortName} · {Math.round((area.overallProgress ?? 0) * 100)}%
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="area-nav-scroll">
          <button
            type="button"
            className={`area-chip ${selectedAreaId === 'all' ? 'is-active' : ''}`}
            onClick={() => selectArea('all')}
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
              onClick={() => selectArea(area.id)}
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

          {/* TAB 1: INICIO — at-a-glance overview of the whole rover or the selected area */}
          <TabsContent value="inicio" className="view-slide-pane">
            <OverviewDashboard
              scopeArea={currentArea}
              areas={roverData ? Object.values(roverData.areas) : []}
              tasks={effectiveBacklog}
              isLoading={loading}
              onOpenArea={(areaId) => {
                selectArea(areaId);
                setView('backlog');
              }}
              onOpenPhase={(phase) => {
                setWorkstream(phase);
                setView('backlog');
              }}
              onOpenTask={(taskId) => {
                setQuery('');
                setPriority('Todas');
                setStatus('Todos');
                setWorkstream('Todos');
                setView('backlog');
                setExpandedTaskId(taskId);
              }}
            />
          </TabsContent>

          {/* TAB 2: BACKLOG (Con la estructura clásica y probada de globals.css) */}
          <TabsContent value="backlog" className="data-panel view-slide-pane">
            <div className="data-panel-header">
              <div>
                <h3>Backlog de tareas</h3>
                <p>{currentArea ? currentArea.name : 'Todas las áreas'} · toca una tarea para ver su detalle o editarla.</p>
              </div>
              <strong className="result-count">
                {filteredTasks.length}
                <small>tareas</small>
              </strong>
            </div>

            {/* Filters */}
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

              {currentArea ? (
                <NativeSelect
                  value={workstream}
                  onChange={(e) => setWorkstream(e.target.value)}
                  aria-label="Filtrar por fase o subárea"
                >
                  <NativeSelectOption value="Todos">Todas las fases</NativeSelectOption>
                  {dynamicSubsystems.map((sub) => (
                    <NativeSelectOption key={sub} value={sub}>{sub}</NativeSelectOption>
                  ))}
                </NativeSelect>
              ) : null}

              {hasActiveFilters ? (
                <Button variant="ghost" onClick={resetFilters}>
                  <FilterX className="size-3.5" /> Limpiar
                </Button>
              ) : null}
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
                        <span className="row-id">{taskLabel(task)}</span>
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
                                    <Edit3 className="size-4" /> Editando {taskLabel(task)}
                                  </h5>
                                  <span className="edit-hint">Se guarda en este navegador; usa &quot;Guardar en Excel&quot; para pasarlo al archivo.</span>
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
      </section>
    </Tabs>

      {syncModalOpen ? (
        <SyncModal
          pendingEdits={pendingEditsList}
          areas={roverData?.areas}
          onClose={() => setSyncModalOpen(false)}
          onSynced={() => void refresh()}
        />
      ) : null}
    </main>
  );
}
