"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useProject } from "@/components/project-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, X } from "lucide-react";
import { FilterSelect, FilterResetButton } from "@/components/ui/filter-select";
import {
  badgeBase,
  getBacklogTypeStyle,
  getBacklogTypeLabel,
  getBacklogStatusLabel,
  getPriorityLabel,
} from "@/lib/status-badges";
import type { BacklogResponse } from "@/app/api/backlog/route";
import type { BacklogItem } from "@/lib/backlog";

const TYPE_OPTIONS = ["bug", "fix", "feature", "improvement", "idea", "later"] as const;
const PRIORITY_OPTIONS = ["high", "medium", "low"] as const;
const STATUS_OPTIONS = ["open", "in_progress", "done", "deferred", "blocked"] as const;

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
const STATUS_ORDER: Record<string, number> = { blocked: 0, open: 1, in_progress: 2, deferred: 3, done: 4 };

export default function BacklogPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<BacklogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterType, setFilterType] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVersion, setFilterVersion] = useState("");

  // Sort state
  const [sortField, setSortField] = useState<"priority" | "status" | "type" | "title">("priority");
  const [sortAsc, setSortAsc] = useState(true);

  // Create dialog state
  const [showCreate, setShowCreate] = useState(false);

  const loadData = useCallback(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/backlog?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: BacklogResponse) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [activeProject]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Extract unique versions from data for version filter
  const availableVersions = useMemo(() => {
    if (!data || data.status !== "ok") return [];
    const versions = new Set<string>();
    for (const item of data.items) {
      if (item.version) versions.add(item.version);
    }
    return Array.from(versions).sort();
  }, [data]);

  // Filter + sort
  const filteredItems = useMemo(() => {
    if (!data || data.status !== "ok") return [];

    let items = data.items.filter((item) => {
      if (filterType && item.type !== filterType) return false;
      if (filterPriority && item.priority !== filterPriority) return false;
      if (filterStatus && item.status !== filterStatus) return false;
      if (filterVersion && (item.version ?? "") !== filterVersion) return false;
      return true;
    });

    items = [...items].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "priority":
          cmp = (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
          if (cmp === 0) cmp = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
          break;
        case "status":
          cmp = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
          if (cmp === 0) cmp = (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
          break;
        case "type":
          cmp = a.type.localeCompare(b.type);
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return items;
  }, [data, filterType, filterPriority, filterStatus, filterVersion, sortField, sortAsc]);

  const hasActiveFilters = filterType || filterPriority || filterStatus || filterVersion;

  function handleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  }

  function clearFilters() {
    setFilterType("");
    setFilterPriority("");
    setFilterStatus("");
    setFilterVersion("");
  }

  // --- Render ---

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
        <p className="text-sm text-muted-foreground">Backlog wird geladen...</p>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "file_missing") {
    return (
      <div className="space-y-6">
        <PageHeader onCreateClick={() => setShowCreate(true)} />
        <EmptyState message="Noch keine Planungsdaten vorhanden. Erstellen Sie den ersten Eintrag über den Button oben." />
        {showCreate && activeProject && (
          <CreateBacklogDialog
            projectPath={activeProject.path}
            onClose={() => setShowCreate(false)}
            onCreated={() => { setShowCreate(false); loadData(); }}
          />
        )}
      </div>
    );
  }

  if (data.status === "file_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
        <EmptyState message="Backlog-Datei konnte nicht gelesen werden." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.items.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader onCreateClick={() => setShowCreate(true)} />
        <EmptyState message="Keine Backlog-Einträge vorhanden. Erstellen Sie den ersten Eintrag über den Button oben." />
        {showCreate && activeProject && (
          <CreateBacklogDialog
            projectPath={activeProject.path}
            onClose={() => setShowCreate(false)}
            onCreated={() => { setShowCreate(false); loadData(); }}
          />
        )}
      </div>
    );
  }

  const totalItems = data.items.length;
  const doneItems = data.items.filter((i) => i.status === "done").length;
  const activeItems = data.items.filter((i) => i.status === "in_progress").length;

  return (
    <div className="space-y-6">
      <PageHeader onCreateClick={() => setShowCreate(true)} />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniKpi label="Total Items" value={String(totalItems)} />
        <MiniKpi label="Fertig" value={String(doneItems)} color="success" />
        <MiniKpi label="In Arbeit" value={String(activeItems)} color="warning" />
        <MiniKpi label="Offen" value={String(totalItems - doneItems)} color="info" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Typ"
          value={filterType}
          onChange={setFilterType}
          options={TYPE_OPTIONS.map((t) => ({ value: t, label: getBacklogTypeLabel(t) }))}
        />
        <FilterSelect
          label="Priorität"
          value={filterPriority}
          onChange={setFilterPriority}
          options={PRIORITY_OPTIONS.map((p) => ({ value: p, label: getPriorityLabel(p) }))}
        />
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={setFilterStatus}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: getBacklogStatusLabel(s) }))}
        />
        {availableVersions.length > 0 && (
          <FilterSelect
            label="Version"
            value={filterVersion}
            onChange={setFilterVersion}
            options={availableVersions.map((v) => ({ value: v, label: v }))}
          />
        )}
        {hasActiveFilters && (
          <FilterResetButton onClick={clearFilters} />
        )}
      </div>

      {/* Table or empty filter result */}
      {filteredItems.length === 0 ? (
        <EmptyState message="Keine Einträge für diese Filterauswahl." />
      ) : (
        <div className="relative rounded-xl border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div className="h-1" style={{ background: "linear-gradient(to right, #120774, #4454b8, #00a84f)" }} />
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border/60" style={{ background: "linear-gradient(to bottom, #f8fafc, rgba(248, 250, 252, 0.5))" }}>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">ID</th>
                <SortHeader label="Titel" field="title" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Typ" field="type" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Priorität" field="priority" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Status" field="status" current={sortField} asc={sortAsc} onSort={handleSort} />
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700 hidden lg:table-cell">Version</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700 hidden xl:table-cell">Beschreibung</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <BacklogRow
                  key={item.id}
                  item={item}
                  projectPath={activeProject?.path ?? ""}
                  onUpdated={loadData}
                />
              ))}
            </tbody>
          </table>
          </div>

          {/* Table footer */}
          <div className="border-t border-border/40 px-6 py-3 text-xs text-muted-foreground flex justify-between">
            <span>Zeige {filteredItems.length} von {data.items.length} Einträgen{hasActiveFilters ? " (gefiltert)" : ""}</span>
            <span>{doneItems} fertig · {activeItems} in Arbeit · {totalItems - doneItems - activeItems} offen</span>
          </div>
        </div>
      )}

      {/* Item count moved to table footer */}

      {/* Create dialog */}
      {showCreate && activeProject && (
        <CreateBacklogDialog
          projectPath={activeProject.path}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); loadData(); }}
        />
      )}
    </div>
  );
}

// ─── Page header ────────────────────────────────────────────────────────────

function PageHeader({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
      <Button size="sm" onClick={onCreateClick} className="gap-1.5">
        <Plus className="h-4 w-4" />
        Neuer Eintrag
      </Button>
    </div>
  );
}

// ─── Create dialog ──────────────────────────────────────────────────────────

function CreateBacklogDialog({
  projectPath,
  onClose,
  onCreated,
}: {
  projectPath: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("feature");
  const [priority, setPriority] = useState("medium");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      const res = await fetch("/api/backlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectPath,
          title,
          type,
          priority,
          version: version || null,
          description,
        }),
      });

      const result = await res.json();

      if (result.status === "ok") {
        setSuccess(true);
        setTimeout(() => onCreated(), 600);
      } else {
        setErrors(result.errors ?? ["Unbekannter Fehler"]);
        setSubmitting(false);
      }
    } catch {
      setErrors(["Netzwerkfehler — bitte erneut versuchen"]);
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-5 pb-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Neuer Backlog-Eintrag</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {success ? (
            <p className="text-sm text-emerald-600 font-medium">Eintrag erstellt.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {errors.length > 0 && (
                <div className="text-xs text-destructive space-y-1">
                  {errors.map((err, i) => (
                    <p key={i}>{err}</p>
                  ))}
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-muted-foreground">Titel *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full h-8 rounded-md border border-border/60 bg-card px-2 text-sm"
                  placeholder="Kurzer Titel des Eintrags"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Typ *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 w-full h-8 rounded-md border border-border/60 bg-card px-2 text-sm"
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{getBacklogTypeLabel(t)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Priorität *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 w-full h-8 rounded-md border border-border/60 bg-card px-2 text-sm"
                  >
                    {PRIORITY_OPTIONS.map((p) => (
                      <option key={p} value={p}>{getPriorityLabel(p)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Version</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="mt-1 w-full h-8 rounded-md border border-border/60 bg-card px-2 text-sm"
                  placeholder="z.B. V2, V3 (optional)"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Beschreibung</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border/60 bg-card px-2 py-1.5 text-sm min-h-[60px] resize-y"
                  placeholder="Optionale Beschreibung"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button type="submit" size="sm" disabled={submitting}>
                  {submitting ? "Wird erstellt..." : "Erstellen"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

// FilterSelect imported from @/components/ui/filter-select

function SortHeader({
  label,
  field,
  current,
  asc,
  onSort,
}: {
  label: string;
  field: "priority" | "status" | "type" | "title";
  current: string;
  asc: boolean;
  onSort: (f: "priority" | "status" | "type" | "title") => void;
}) {
  const isActive = current === field;
  return (
    <th
      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700 cursor-pointer hover:text-[var(--brand-primary-main)] transition-colors select-none"
      onClick={() => onSort(field)}
    >
      {label}
      {isActive && (
        <span className="ml-1">{asc ? "↑" : "↓"}</span>
      )}
    </th>
  );
}

// ─── Mini KPI Card ────────────────────────────────────────────────────────

function MiniKpi({ label, value, color = "primary" }: { label: string; value: string; color?: "primary" | "success" | "warning" | "info" }) {
  const colors = {
    primary: "linear-gradient(to right, #120774, #4454b8)",
    success: "linear-gradient(to right, #00a84f, #4dcb8b)",
    warning: "linear-gradient(to right, #f2b705, #ffd54f)",
    info: "linear-gradient(to right, #4454b8, #6366f1)",
  };
  const g = colors[color];
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: g }} />
      <CardContent className="pt-5 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">{label}</p>
        <p className="text-2xl font-bold" style={{ background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</p>
      </CardContent>
    </Card>
  );
}

function BacklogRow({
  item,
  projectPath,
  onUpdated,
}: {
  item: BacklogItem;
  projectPath: string;
  onUpdated: () => void;
}) {
  const [updating, setUpdating] = useState(false);

  async function handleUpdate(changes: Record<string, string | null>) {
    setUpdating(true);
    try {
      const res = await fetch("/api/backlog/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectPath, id: item.id, changes }),
      });
      const result = await res.json();
      if (result.status === "ok") {
        onUpdated();
      }
    } catch {
      // silent — data unchanged on error
    } finally {
      setUpdating(false);
    }
  }

  return (
    <tr className={`border-b border-border/30 last:border-b-0 transition-all duration-200 group hover:bg-[linear-gradient(to_right,rgba(239,246,255,0.5),transparent)] hover:border-l-4 hover:border-l-[var(--brand-primary-main)] ${updating ? "opacity-50" : ""}`}>
      <td className="px-6 py-4 font-mono text-xs text-[var(--brand-primary-main)] whitespace-nowrap group-hover:font-semibold">
        {item.id}
      </td>
      <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-[var(--brand-primary-dark)]">
        {item.title}
      </td>
      <td className="px-6 py-4">
        <Badge variant="outline" className={`${badgeBase} ${getBacklogTypeStyle(item.type)}`}>
          {getBacklogTypeLabel(item.type)}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <InlineSelect
          value={item.priority}
          options={PRIORITY_OPTIONS.map((p) => ({ value: p, label: getPriorityLabel(p) }))}
          onChange={(v) => handleUpdate({ priority: v })}
          disabled={updating}
        />
      </td>
      <td className="px-6 py-4">
        <InlineSelect
          value={item.status}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: getBacklogStatusLabel(s) }))}
          onChange={(v) => handleUpdate({ status: v })}
          disabled={updating}
        />
      </td>
      <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap hidden lg:table-cell">
        <InlineVersionEdit
          value={item.version}
          onChange={(v) => handleUpdate({ version: v })}
          disabled={updating}
        />
      </td>
      <td className="px-6 py-4 text-muted-foreground text-xs max-w-xs truncate hidden xl:table-cell">
        {item.description || "—"}
      </td>
    </tr>
  );
}

function InlineSelect({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (e.target.value !== value) onChange(e.target.value);
      }}
      disabled={disabled}
      className="h-7 rounded border border-border/40 bg-transparent px-1.5 text-[11px] font-medium cursor-pointer hover:border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function InlineVersionEdit({
  value,
  onChange,
  disabled,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(value ?? ""); setEditing(true); }}
        disabled={disabled}
        className="text-left hover:text-foreground transition-colors disabled:opacity-50"
        title="Version bearbeiten"
      >
        {value ?? "—"}
      </button>
    );
  }

  return (
    <input
      type="text"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const newVal = draft.trim() || null;
        if (newVal !== value) onChange(newVal);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const newVal = draft.trim() || null;
          if (newVal !== value) onChange(newVal);
          setEditing(false);
        }
        if (e.key === "Escape") setEditing(false);
      }}
      autoFocus
      className="h-6 w-16 rounded border border-primary/40 bg-card px-1 text-xs"
      placeholder="z.B. V2"
    />
  );
}
