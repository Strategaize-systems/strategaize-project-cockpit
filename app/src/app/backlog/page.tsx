"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useProject } from "@/components/project-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, X } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <PageHeader onCreateClick={() => setShowCreate(true)} />

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
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Table or empty filter result */}
      {filteredItems.length === 0 ? (
        <EmptyState message="Keine Einträge für diese Filterauswahl." />
      ) : (
        <div className="rounded-lg border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">ID</th>
                <SortHeader label="Titel" field="title" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Typ" field="type" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Priorität" field="priority" current={sortField} asc={sortAsc} onSort={handleSort} />
                <SortHeader label="Status" field="status" current={sortField} asc={sortAsc} onSort={handleSort} />
                <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 hidden lg:table-cell">Version</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 hidden xl:table-cell">Beschreibung</th>
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
      )}

      {/* Item count */}
      <p className="text-xs text-muted-foreground">
        {filteredItems.length} von {data.items.length} Einträgen
        {hasActiveFilters ? " (gefiltert)" : ""}
      </p>

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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 rounded-md border bg-card px-2 text-xs transition-colors ${
        value
          ? "border-primary/40 text-foreground"
          : "border-border/60 text-muted-foreground"
      }`}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

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
      className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 cursor-pointer hover:text-foreground transition-colors select-none"
      onClick={() => onSort(field)}
    >
      {label}
      {isActive && (
        <span className="ml-1">{asc ? "↑" : "↓"}</span>
      )}
    </th>
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
    <tr className={`border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors ${updating ? "opacity-50" : ""}`}>
      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/60 whitespace-nowrap">
        {item.id}
      </td>
      <td className="px-4 py-3 font-medium">
        {item.title}
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline" className={`${badgeBase} ${getBacklogTypeStyle(item.type)}`}>
          {getBacklogTypeLabel(item.type)}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <InlineSelect
          value={item.priority}
          options={PRIORITY_OPTIONS.map((p) => ({ value: p, label: getPriorityLabel(p) }))}
          onChange={(v) => handleUpdate({ priority: v })}
          disabled={updating}
        />
      </td>
      <td className="px-4 py-3">
        <InlineSelect
          value={item.status}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: getBacklogStatusLabel(s) }))}
          onChange={(v) => handleUpdate({ status: v })}
          disabled={updating}
        />
      </td>
      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap hidden lg:table-cell">
        <InlineVersionEdit
          value={item.version}
          onChange={(v) => handleUpdate({ version: v })}
          disabled={updating}
        />
      </td>
      <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate hidden xl:table-cell">
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
