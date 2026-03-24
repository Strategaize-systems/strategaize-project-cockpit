"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  badgeBase,
  getRoadmapStatusStyle,
  getRoadmapStatusLabel,
} from "@/lib/status-badges";
import { Milestone, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import type { RoadmapResponse } from "@/app/api/roadmap/route";
import type { RoadmapVersionWithProgress } from "@/lib/roadmap";

export default function RoadmapPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/roadmap?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: RoadmapResponse) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [activeProject]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Roadmap wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "file_missing" || data.status === "file_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <EmptyState message="Roadmap-Daten nicht verfügbar." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.versions.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <EmptyState message="Keine Versionen definiert." />
      </div>
    );
  }

  const sorted = [...data.versions].sort((a, b) => a.order - b.order);
  const releasedCount = sorted.filter((v) => v.status === "released").length;
  const activeCount = sorted.filter((v) => v.status === "active").length;
  const totalProgress = sorted.length > 0
    ? Math.round(sorted.reduce((sum, v) => sum + v.progress.percentage, 0) / sorted.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Strategische Planung und Entwicklungs-Timeline</p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiMini label="Versionen" value={String(sorted.length)} icon={Milestone} color="primary" />
        <KpiMini label="Abgeschlossen" value={String(releasedCount)} icon={CheckCircle2} color="success" />
        <KpiMini label="In Arbeit" value={String(activeCount)} icon={Clock} color="warning" />
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #4454b8, #6366f1)" }} />
          <CardContent className="pt-5 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Gesamt-Fortschritt</p>
            <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #4454b8, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{totalProgress}%</p>
            <div className="h-1.5 w-full rounded-full bg-slate-100 mt-2 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${totalProgress}%`, background: "linear-gradient(to right, #120774, #4454b8)" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="relative ml-4 border-l-2 border-border/40 pl-8 space-y-6">
        {sorted.map((version) => (
          <VersionTimelineItem key={version.id} version={version} />
        ))}
      </div>
    </div>
  );
}

function VersionTimelineItem({ version }: { version: RoadmapVersionWithProgress }) {
  const isActive = version.status === "active";
  const isReleased = version.status === "released";
  const { total, done, percentage } = version.progress;

  const dotColor = isReleased
    ? "linear-gradient(to bottom right, #00a84f, #4dcb8b)"
    : isActive
      ? "linear-gradient(to bottom right, #120774, #4454b8)"
      : "#cbd5e1";

  const dotGlow = isReleased
    ? "0 0 8px rgba(0, 168, 79, 0.3)"
    : isActive
      ? "0 0 8px rgba(68, 84, 184, 0.3)"
      : "none";

  const barColor = percentage === 100
    ? "linear-gradient(to right, #00a84f, #4dcb8b)"
    : "linear-gradient(to right, #120774, #4454b8)";

  return (
    <div className={`relative ${isReleased ? "opacity-75" : ""}`}>
      {/* Timeline dot */}
      <div
        className={`absolute -left-[2.55rem] top-1 rounded-full border-2 border-white ${isActive ? "h-5 w-5 -left-[2.7rem] animate-pulse" : "h-4 w-4"}`}
        style={{ background: dotColor, boxShadow: dotGlow }}
      />

      <Card className={isActive ? "ring-1 ring-[var(--brand-primary-main)]/30" : ""}>
        <CardContent className="pt-5 pb-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold">{version.name}</h3>
            <Badge variant="outline" className={`${badgeBase} ${getRoadmapStatusStyle(version.status)}`}>
              {getRoadmapStatusLabel(version.status)}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{version.summary}</p>

          <div className="border-t border-border/40 pt-3">
            {total === 0 ? (
              <p className="text-xs text-muted-foreground">Keine zugeordneten Einträge</p>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{done} von {total} erledigt</span>
                  <span className="font-bold">{percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: barColor,
                      boxShadow: percentage === 100 ? "0 0 8px rgba(0, 168, 79, 0.2)" : undefined,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── KPI Mini ─────────────────────────────────────────────────────────────

const kpiColors = {
  primary: { gradient: "linear-gradient(to right, #120774, #4454b8)", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  success: { gradient: "linear-gradient(to right, #00a84f, #4dcb8b)", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  warning: { gradient: "linear-gradient(to right, #f2b705, #ffd54f)", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
};

function KpiMini({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Milestone; color: keyof typeof kpiColors }) {
  const c = kpiColors[color];
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: c.gradient }} />
      <CardContent className="pt-5 pb-4 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">{label}</p>
          <p className="text-2xl font-bold" style={{ background: c.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</p>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.iconBg}`}>
          <Icon className={`h-4.5 w-4.5 ${c.iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}
