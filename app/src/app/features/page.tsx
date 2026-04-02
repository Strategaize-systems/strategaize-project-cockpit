"use client";

import { useEffect, useState, useMemo } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Layers, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { FilterSelect, FilterResetButton } from "@/components/ui/filter-select";
import {
  badgeBase,
  getStatusStyle,
  getStatusLabel,
  getPriorityStyle,
  getPriorityLabel,
} from "@/lib/status-badges";
import type { FeaturesData, FeatureRow } from "@/app/api/features/route";

export default function FeaturesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<FeaturesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/features?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: FeaturesData) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [activeProject]);

  const features = data?.status === "ok" ? data.features : [];
  const hasActiveFilters = filterStatus || filterPriority;

  const filteredFeatures = useMemo(() => {
    return features.filter((f) => {
      if (filterStatus && f.status?.toLowerCase() !== filterStatus) return false;
      if (filterPriority && f.priority?.toLowerCase() !== filterPriority) return false;
      return true;
    });
  }, [features, filterStatus, filterPriority]);

  const doneCount = features.filter((f) => ["done", "deployed"].includes(f.status?.toLowerCase() ?? "")).length;
  const activeCount = features.filter((f) => f.status?.toLowerCase() === "in_progress").length;
  const highPriority = features.filter((f) => f.priority?.toLowerCase() === "high").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Features werden geladen...</p>
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
        <EmptyState message="Feature-Index nicht gefunden oder nicht lesbar." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.features.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Noch keine Features definiert." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader subtitle={`Übersicht aller Features mit Status und Priorität`} />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiMini label="Total Features" value={String(features.length)} icon={Layers} color="primary" />
        <KpiMini label="Abgeschlossen" value={String(doneCount)} icon={CheckCircle2} color="success" />
        <KpiMini label="In Entwicklung" value={String(activeCount)} icon={Clock} color="warning" />
        <KpiMini label="Hohe Priorität" value={String(highPriority)} icon={TrendingUp} color="info" />
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
        {/* Gradient top border */}
        <div className="h-1" style={{ background: "linear-gradient(to right, #120774, #4454b8, #00a84f)" }} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border/60" style={{ background: "linear-gradient(to bottom, #f8fafc, rgba(248, 250, 252, 0.5))" }}>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Feature Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700">Priorität</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700 hidden lg:table-cell">Notizen</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((feature, i) => (
                <FeatureTableRow key={feature.id || i} feature={feature} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 px-6 py-3 text-xs text-muted-foreground flex justify-between">
          <span>Zeige {filteredFeatures.length} von {features.length} Features{hasActiveFilters ? " (gefiltert)" : ""}</span>
          <span>{doneCount} abgeschlossen · {activeCount > 0 ? `${activeCount} in Entwicklung` : "0 in Entwicklung"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────

function PageHeader({ subtitle }: { subtitle?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Features</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Feature Table Row ────────────────────────────────────────────────────

function FeatureTableRow({ feature }: { feature: FeatureRow }) {
  const isDone = ["done", "deployed"].includes(feature.status?.toLowerCase() ?? "");

  return (
    <tr className="border-b border-border/30 last:border-b-0 transition-all duration-200 hover:bg-[linear-gradient(to_right,rgba(239,246,255,0.5),transparent)] hover:border-l-4 hover:border-l-[var(--brand-primary-main)] group">
      <td className="px-6 py-4 font-mono text-xs text-[var(--brand-primary-main)] group-hover:font-semibold">
        {feature.id}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {isDone && (
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: "linear-gradient(to bottom right, #00a84f, #4dcb8b)", boxShadow: "0 0 8px rgba(0, 168, 79, 0.3)" }} />
          )}
          <span className="font-medium text-slate-900 group-hover:text-[var(--brand-primary-dark)]">
            {feature.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        {feature.status && (
          <Badge variant="outline" className={`${badgeBase} ${getStatusStyle(feature.status)}`}>
            {getStatusLabel(feature.status)}
          </Badge>
        )}
      </td>
      <td className="px-6 py-4">
        {feature.priority && (
          <Badge variant="outline" className={`${badgeBase} ${getPriorityStyle(feature.priority)}`}>
            {getPriorityLabel(feature.priority)}
          </Badge>
        )}
      </td>
      <td className="px-6 py-4 text-muted-foreground text-xs max-w-xs truncate hidden lg:table-cell">
        {feature.notes}
      </td>
    </tr>
  );
}

// ─── KPI Mini Card ────────────────────────────────────────────────────────

const kpiColors = {
  primary: { gradient: "linear-gradient(to right, #120774, #4454b8)", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  success: { gradient: "linear-gradient(to right, #00a84f, #4dcb8b)", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  warning: { gradient: "linear-gradient(to right, #f2b705, #ffd54f)", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  info: { gradient: "linear-gradient(to right, #4454b8, #6366f1)", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
};

function KpiMini({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Layers; color: keyof typeof kpiColors }) {
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
