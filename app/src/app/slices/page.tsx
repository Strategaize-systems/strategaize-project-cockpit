"use client";

import { useEffect, useState, useMemo } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { GitBranch, CheckCircle2, Clock } from "lucide-react";
import { FilterSelect, FilterResetButton } from "@/components/ui/filter-select";
import {
  badgeBase,
  getStatusStyle,
  getStatusLabel,
  getPriorityStyle,
  getPriorityLabel,
} from "@/lib/status-badges";
import type { SlicesData, SliceRow } from "@/app/api/slices/route";

export default function SlicesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<SlicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/slices?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: SlicesData) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [activeProject]);

  const slices = data?.status === "ok" ? data.slices : [];
  const hasActiveFilters = filterStatus || filterPriority;

  const filteredSlices = useMemo(() => {
    return slices.filter((s) => {
      if (filterStatus && s.status?.toLowerCase() !== filterStatus) return false;
      if (filterPriority && s.priority?.toLowerCase() !== filterPriority) return false;
      return true;
    });
  }, [slices, filterStatus, filterPriority]);

  const doneCount = slices.filter((s) => s.status?.toLowerCase() === "done").length;
  const activeCount = slices.filter((s) => s.status?.toLowerCase() === "in_progress").length;
  const percentage = slices.length > 0 ? Math.round((doneCount / slices.length) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Slices werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "index_missing" || data.status === "index_malformed") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Slice-Index nicht gefunden oder nicht lesbar." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.slices.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Noch keine Slices definiert." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader subtitle="Vertikale Schnitte durch die Anwendung für iterative Entwicklung" />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiMini label="Gesamt" value={String(slices.length)} icon={GitBranch} color="primary" />
        <KpiMini label="Abgeschlossen" value={String(doneCount)} icon={CheckCircle2} color="success" />
        <KpiMini label="In Arbeit" value={String(activeCount)} icon={Clock} color="warning" />
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #4454b8, #6366f1)" }} />
          <CardContent className="pt-5 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Fortschritt</p>
            <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #4454b8, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{percentage}%</p>
            <div className="h-1.5 w-full rounded-full bg-slate-100 mt-2 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, background: percentage === 100 ? "linear-gradient(to right, #00a84f, #4dcb8b)" : "linear-gradient(to right, #120774, #4454b8)" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { value: "done", label: "Fertig" },
            { value: "in_progress", label: "In Arbeit" },
            { value: "planned", label: "Geplant" },
            { value: "blocked", label: "Blockiert" },
          ]}
        />
        <FilterSelect
          label="Priorität"
          value={filterPriority}
          onChange={setFilterPriority}
          options={[
            { value: "high", label: "Hoch" },
            { value: "medium", label: "Mittel" },
            { value: "low", label: "Niedrig" },
          ]}
        />
        {hasActiveFilters && (
          <FilterResetButton onClick={() => { setFilterStatus(""); setFilterPriority(""); }} />
        )}
      </div>

      {/* Premium table */}
      <div className="relative rounded-xl border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-hidden">
        <div className="h-1" style={{ background: "linear-gradient(to right, #120774, #4454b8, #00a84f)" }} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border/60" style={{ background: "linear-gradient(to bottom, #f8fafc, rgba(248, 250, 252, 0.5))" }}>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Slice Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Priorität</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700 hidden lg:table-cell">Notizen</th>
              </tr>
            </thead>
            <tbody>
              {filteredSlices.map((slice, i) => (
                <SliceTableRow key={slice.id || i} slice={slice} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border/40 px-6 py-3 text-xs text-muted-foreground flex justify-between">
          <span>Zeige {filteredSlices.length} von {slices.length} Slices{hasActiveFilters ? " (gefiltert)" : ""}</span>
          <span>{doneCount} abgeschlossen · {activeCount} in Arbeit · {slices.length - doneCount - activeCount} offen</span>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ subtitle }: { subtitle?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function SliceTableRow({ slice }: { slice: SliceRow }) {
  const isDone = slice.status?.toLowerCase() === "done";
  const isActive = slice.status?.toLowerCase() === "in_progress";

  return (
    <tr className={`border-b border-border/30 last:border-b-0 transition-all duration-200 group ${
      isActive
        ? "bg-amber-50/40 border-l-4 border-l-amber-400"
        : "hover:bg-[linear-gradient(to_right,rgba(239,246,255,0.5),transparent)] hover:border-l-4 hover:border-l-[var(--brand-primary-main)]"
    }`}>
      <td className="px-6 py-4 font-mono text-xs text-[var(--brand-primary-main)] group-hover:font-semibold">
        {slice.id}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {isDone && (
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: "linear-gradient(to bottom right, #00a84f, #4dcb8b)", boxShadow: "0 0 8px rgba(0, 168, 79, 0.3)" }} />
          )}
          {isActive && (
            <span className="h-2 w-2 rounded-full shrink-0 animate-pulse" style={{ background: "linear-gradient(to bottom right, #f2b705, #ffd54f)", boxShadow: "0 0 8px rgba(242, 183, 5, 0.3)" }} />
          )}
          <span className={`font-medium ${isActive ? "font-semibold text-slate-900" : "text-slate-900 group-hover:text-[var(--brand-primary-dark)]"}`}>
            {slice.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 font-mono text-xs text-muted-foreground/60">
        {slice.relatedFeature}
      </td>
      <td className="px-6 py-4">
        {slice.status && (
          <Badge variant="outline" className={`${badgeBase} ${getStatusStyle(slice.status)}`}>
            {getStatusLabel(slice.status)}
          </Badge>
        )}
      </td>
      <td className="px-6 py-4">
        {slice.priority && (
          <Badge variant="outline" className={`${badgeBase} ${getPriorityStyle(slice.priority)}`}>
            {getPriorityLabel(slice.priority)}
          </Badge>
        )}
      </td>
      <td className="px-6 py-4 text-muted-foreground text-xs max-w-xs truncate hidden lg:table-cell">
        {slice.notes}
      </td>
    </tr>
  );
}

const kpiColors = {
  primary: { gradient: "linear-gradient(to right, #120774, #4454b8)", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  success: { gradient: "linear-gradient(to right, #00a84f, #4dcb8b)", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  warning: { gradient: "linear-gradient(to right, #f2b705, #ffd54f)", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
};

function KpiMini({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof GitBranch; color: keyof typeof kpiColors }) {
  const c = kpiColors[color];
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: c.gradient }} />
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">{label}</p>
            <p className="text-2xl font-bold" style={{ background: c.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</p>
          </div>
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.iconBg}`}>
            <Icon className={`h-4.5 w-4.5 ${c.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
