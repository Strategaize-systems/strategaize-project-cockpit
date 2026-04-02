"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Activity,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  badgeBase,
  getBacklogTypeLabel,
  getBacklogTypeStyle,
  getPriorityStyle,
  getPriorityLabel,
} from "@/lib/status-badges";
import type { StateData } from "@/app/api/state/route";
import type { BacklogResponse } from "@/app/api/backlog/route";
import type { RoadmapResponse } from "@/app/api/roadmap/route";
import type { RoadmapVersionWithProgress } from "@/lib/roadmap";

const deliveryModeLabels: Record<string, string> = {
  "internal-tool": "Internes Tool",
  "client-app": "Kunden-App",
  "saas": "SaaS",
};

const stateLabels: Record<string, string> = {
  "intake": "Aufnahme",
  "requirements": "Anforderungen",
  "architecture": "Architektur",
  "implementation": "Umsetzung",
  "qa": "Qualitätssicherung",
  "deployed": "Ausgeliefert",
  "released": "Veröffentlicht",
  "post-release": "Nach Release",
  "paused": "Pausiert",
};

function translateLabel(value: string, labels: Record<string, string>): string {
  return labels[value.toLowerCase()] ?? value;
}

export default function OverviewPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProject) return;

    setLoading(true);
    fetch(`/api/state?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: StateData) => {
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
        <h1 className="text-2xl font-bold tracking-tight">Übersicht</h1>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Projektstatus wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Übersicht</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "state_missing") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Übersicht</h1>
        <EmptyState message="Projekt-Statusdatei nicht gefunden" variant="error" />
      </div>
    );
  }

  if (data.status === "state_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Übersicht</h1>
        <EmptyState message="Projektstatus konnte nicht gelesen werden" variant="error" />
      </div>
    );
  }

  // Status: ok — render full dashboard
  return (
    <div className="space-y-8">
      {/* ── Header Banner ────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-xl px-8 py-7 text-white"
        style={{ background: "linear-gradient(135deg, #120774 0%, #4454b8 50%, #6366f1 100%)" }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            {data.project?.name ?? "Strategic Project Cockpit"}
          </h1>
          <p className="text-sm text-white/70 max-w-2xl">
            {data.purposeSummary ?? "Zentrale operative Steuerung für alle Schwerpunkte und Unternehmensziele."}
          </p>
        </div>
        {data.project?.deliveryMode && (
          <Badge
            variant="secondary"
            className="absolute top-6 right-8 bg-white/15 text-white border-white/20 text-[11px]"
          >
            {translateLabel(data.project.deliveryMode, deliveryModeLabels)}
          </Badge>
        )}
      </div>

      {/* ── KPI Cards ────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Status"
          value={data.state?.highLevelState ? translateLabel(data.state.highLevelState, stateLabels) : "—"}
          icon={Activity}
          color="primary"
        />
        <KpiCard
          label="Phase"
          value={data.state?.currentPhase ? translateLabel(data.state.currentPhase, stateLabels) : "—"}
          icon={Zap}
          color="success"
        />
        <KpiCard
          label="Letzte Version"
          value={data.lastStableVersion ?? "Noch keine"}
          icon={Shield}
          color="warning"
        />
        <KpiCard
          label="Aktueller Fokus"
          value={data.state?.currentFocus ? (data.state.currentFocus.length > 40 ? data.state.currentFocus.slice(0, 40) + "..." : data.state.currentFocus) : "—"}
          icon={TrendingUp}
          color="info"
          small
        />
      </div>

      {/* ── Nächste Schritte + Blocker ──────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-[var(--brand-primary-main)]" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Nächste Schritte
              </p>
            </div>
            {data.nextSteps.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2">
                {data.nextSteps.map((step, i) => (
                  <li key={i} className="text-sm leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keine nächsten Schritte definiert
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Blocker
              </p>
            </div>
            {data.blockers.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {data.blockers.map((blocker, i) => (
                  <li key={i} className="text-sm text-destructive leading-relaxed">
                    {blocker}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <p className="text-sm text-muted-foreground">Keine Blocker</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Planungsfortschritt ───────────────────────────────── */}
      {activeProject && (
        <PlanningProgress projectPath={activeProject.path} />
      )}
    </div>
  );
}

// ─── KPI Card Component ─────────────────────────────────────────────────────

const kpiColors = {
  primary: {
    gradient: "linear-gradient(to right, #120774, #4454b8)",
    border: "#818cf8",
    glow: "0 8px 16px rgba(68, 84, 184, 0.1)",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  success: {
    gradient: "linear-gradient(to right, #00a84f, #4dcb8b)",
    border: "#6ee7b7",
    glow: "0 8px 16px rgba(0, 168, 79, 0.1)",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  warning: {
    gradient: "linear-gradient(to right, #f2b705, #ffd54f)",
    border: "#fde68a",
    glow: "0 8px 16px rgba(242, 183, 5, 0.1)",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  info: {
    gradient: "linear-gradient(to right, #4454b8, #6366f1)",
    border: "#a5b4fc",
    glow: "0 8px 16px rgba(99, 102, 241, 0.1)",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
};

function KpiCard({
  label,
  value,
  icon: Icon,
  color,
  small,
}: {
  label: string;
  value: string;
  icon: typeof Activity;
  color: keyof typeof kpiColors;
  small?: boolean;
}) {
  const c = kpiColors[color];

  return (
    <Card className="relative overflow-hidden group">
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: c.gradient }}
      />
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
              {label}
            </p>
            <p
              className={`font-bold tracking-tight truncate ${small ? "text-base" : "text-2xl"}`}
              style={{
                background: c.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {value}
            </p>
          </div>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
            <Icon className={`h-5 w-5 ${c.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Planning Progress Section ──────────────────────────────────────────────

function PlanningProgress({ projectPath }: { projectPath: string }) {
  const [backlog, setBacklog] = useState<BacklogResponse | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const pp = encodeURIComponent(projectPath);
    Promise.all([
      fetch(`/api/backlog?projectPath=${pp}`).then((r) => r.json()).catch(() => null),
      fetch(`/api/roadmap?projectPath=${pp}`).then((r) => r.json()).catch(() => null),
    ]).then(([b, r]) => {
      setBacklog(b);
      setRoadmap(r);
      setLoaded(true);
    });
  }, [projectPath]);

  if (!loaded) return null;

  const hasBacklog = backlog?.status === "ok" && backlog.items.length > 0;
  const hasRoadmap = roadmap?.status === "ok" && roadmap.versions.length > 0;

  if (!hasBacklog && !hasRoadmap) {
    return (
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Planung</h2>
        <EmptyState message="Noch keine Planungsdaten vorhanden." />
      </section>
    );
  }

  const openItems = hasBacklog ? backlog.items.filter((i) => !["done", "deployed"].includes(i.status)) : [];
  const doneCount = hasBacklog ? backlog.items.filter((i) => ["done", "deployed"].includes(i.status)).length : 0;
  const blockedCount = hasBacklog ? backlog.items.filter((i) => i.status === "blocked").length : 0;

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-bold">Planung</h2>

      {/* Planning KPI row */}
      {hasBacklog && (
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard
            label="Blocker"
            value={String(blockedCount)}
            icon={AlertTriangle}
            color={blockedCount > 0 ? "warning" : "success"}
          />
          <KpiCard
            label="Offen"
            value={String(openItems.length)}
            icon={Clock}
            color="info"
          />
          <KpiCard
            label="Erledigt"
            value={String(doneCount)}
            icon={CheckCircle2}
            color="success"
          />
        </div>
      )}

      {/* Version progress */}
      {hasRoadmap && (
        <Card className="relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "linear-gradient(to right, #120774, #4454b8, #00a84f)" }}
          />
          <CardContent className="pt-6 pb-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
              Fortschritt pro Version
            </p>
            <div className="space-y-4">
              {roadmap.versions
                .filter((v) => v.status === "active" || v.status === "planned")
                .sort((a, b) => a.order - b.order)
                .map((v) => (
                  <VersionProgressRow key={v.id} version={v} />
                ))}
              {roadmap.versions.filter((v) => v.status === "active" || v.status === "planned").length === 0 && (
                <p className="text-xs text-muted-foreground">Keine aktiven oder geplanten Versionen</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Priority + Type distribution */}
      {hasBacklog && openItems.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
                Nach Priorität
              </p>
              <div className="space-y-2">
                {(["high", "medium", "low"] as const).map((p) => {
                  const count = openItems.filter((i) => i.priority === p).length;
                  if (count === 0) return null;
                  return (
                    <div key={p} className="flex items-center justify-between">
                      <Badge variant="outline" className={`${badgeBase} ${getPriorityStyle(p)}`}>
                        {getPriorityLabel(p)}
                      </Badge>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
                Nach Typ
              </p>
              <div className="space-y-2">
                {(["bug", "fix", "feature", "improvement", "idea", "later"] as const).map((t) => {
                  const count = openItems.filter((i) => i.type === t).length;
                  if (count === 0) return null;
                  return (
                    <div key={t} className="flex items-center justify-between">
                      <Badge variant="outline" className={`${badgeBase} ${getBacklogTypeStyle(t)}`}>
                        {getBacklogTypeLabel(t)}
                      </Badge>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}

function VersionProgressRow({ version }: { version: RoadmapVersionWithProgress }) {
  const { total, done, percentage } = version.progress;

  const barColor = percentage === 100
    ? "linear-gradient(to right, #00a84f, #4dcb8b)"
    : percentage >= 50
      ? "linear-gradient(to right, #120774, #4454b8)"
      : percentage > 0
        ? "linear-gradient(to right, #f2b705, #ffd54f)"
        : "#e2e8f0";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-sm">{version.name}</span>
        <span className="text-muted-foreground font-medium">
          {total === 0 ? "—" : `${done}/${total} (${percentage}%)`}
        </span>
      </div>
      {total > 0 && (
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
      )}
    </div>
  );
}
