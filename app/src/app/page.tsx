"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
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
        <p className="text-sm text-muted-foreground">Projektstatus wird geladen...</p>
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
      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          {data.project?.name ?? "Übersicht"}
        </h1>
        {data.project?.deliveryMode && (
          <Badge variant="secondary" className="text-[11px]">
            {translateLabel(data.project.deliveryMode, deliveryModeLabels)}
          </Badge>
        )}
      </div>

      {/* Zweck — full-width content card */}
      {data.purposeSummary && (
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1.5">
              Zweck
            </p>
            <p className="text-sm leading-relaxed">{data.purposeSummary}</p>
          </CardContent>
        </Card>
      )}

      {/* KPI-Karten — compact metric cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
              Status
            </p>
            <p className="text-xl font-semibold tracking-tight">
              {data.state?.highLevelState
                ? translateLabel(data.state.highLevelState, stateLabels)
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
              Phase
            </p>
            <p className="text-xl font-semibold tracking-tight">
              {data.state?.currentPhase
                ? translateLabel(data.state.currentPhase, stateLabels)
                : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
              Letzte stabile Version
            </p>
            <p className="text-xl font-semibold tracking-tight">
              {data.lastStableVersion ?? "Noch keine"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aktueller Fokus */}
      {data.state?.currentFocus && (
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1.5">
              Aktueller Fokus
            </p>
            <p className="text-sm leading-relaxed">{data.state.currentFocus}</p>
          </CardContent>
        </Card>
      )}

      {/* Nächste Schritte + Blocker */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-2">
              Nächste Schritte
            </p>
            {data.nextSteps.length > 0 ? (
              <ol className="list-decimal list-inside space-y-1.5">
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
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-2">
              Blocker
            </p>
            {data.blockers.length > 0 ? (
              <ul className="list-disc list-inside space-y-1.5">
                {data.blockers.map((blocker, i) => (
                  <li key={i} className="text-sm text-destructive leading-relaxed">
                    {blocker}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Keine Blocker</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* V2 Planungsfortschritt */}
      {activeProject && (
        <PlanningProgress projectPath={activeProject.path} />
      )}
    </div>
  );
}

// ─── V2 Planning Progress Section ───────────────────────────────────────────

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
        <h2 className="text-lg font-semibold">Planung</h2>
        <EmptyState message="Noch keine Planungsdaten vorhanden." />
      </section>
    );
  }

  const openItems = hasBacklog ? backlog.items.filter((i) => i.status !== "done") : [];
  const blockedCount = hasBacklog ? backlog.items.filter((i) => i.status === "blocked").length : 0;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Planung</h2>

      {/* KPI row: Blocker + Offen + Erledigt */}
      {hasBacklog && (
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
                Blocker
              </p>
              <p className={`text-xl font-semibold tracking-tight ${blockedCount > 0 ? "text-red-600" : "text-muted-foreground"}`}>
                {blockedCount}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
                Offen
              </p>
              <p className="text-xl font-semibold tracking-tight">
                {openItems.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-1">
                Erledigt
              </p>
              <p className="text-xl font-semibold tracking-tight text-emerald-600">
                {hasBacklog ? backlog.items.filter((i) => i.status === "done").length : 0}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Version progress */}
      {hasRoadmap && (
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-3">
              Fortschritt pro Version
            </p>
            <div className="space-y-3">
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
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-2">
                Nach Priorität
              </p>
              <div className="space-y-1.5">
                {(["high", "medium", "low"] as const).map((p) => {
                  const count = openItems.filter((i) => i.priority === p).length;
                  if (count === 0) return null;
                  return (
                    <div key={p} className="flex items-center justify-between">
                      <Badge variant="outline" className={`${badgeBase} ${getPriorityStyle(p)}`}>
                        {getPriorityLabel(p)}
                      </Badge>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-2">
                Nach Typ
              </p>
              <div className="space-y-1.5">
                {(["bug", "fix", "feature", "improvement", "idea", "later"] as const).map((t) => {
                  const count = openItems.filter((i) => i.type === t).length;
                  if (count === 0) return null;
                  return (
                    <div key={t} className="flex items-center justify-between">
                      <Badge variant="outline" className={`${badgeBase} ${getBacklogTypeStyle(t)}`}>
                        {getBacklogTypeLabel(t)}
                      </Badge>
                      <span className="text-sm font-medium">{count}</span>
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
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{version.name}</span>
        <span className="text-muted-foreground">
          {total === 0 ? "—" : `${done}/${total} (${percentage}%)`}
        </span>
      </div>
      {total > 0 && (
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className={`h-1.5 rounded-full transition-all ${
              percentage === 100 ? "bg-emerald-500" : "bg-indigo-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
