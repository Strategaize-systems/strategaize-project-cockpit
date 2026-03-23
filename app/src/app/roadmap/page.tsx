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
        <p className="text-sm text-muted-foreground">Roadmap wird geladen...</p>
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

  if (data.status === "file_missing") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <EmptyState message="Noch keine Roadmap-Daten vorhanden. Die Datei planning/roadmap.json kann manuell im Projektverzeichnis angelegt werden." />
      </div>
    );
  }

  if (data.status === "file_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>
        <EmptyState message="Roadmap-Datei konnte nicht gelesen werden." variant="error" />
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Roadmap</h1>

      <div className="space-y-4">
        {sorted.map((version) => (
          <VersionCard key={version.id} version={version} />
        ))}
      </div>
    </div>
  );
}

function VersionCard({ version }: { version: RoadmapVersionWithProgress }) {
  const isActive = version.status === "active";
  const isReleased = version.status === "released";
  const { total, done, percentage } = version.progress;

  return (
    <Card className={isActive ? "ring-1 ring-indigo-300/50" : isReleased ? "opacity-75" : ""}>
      <CardContent className="pt-5 pb-5 space-y-3">
        {/* Header: Name + Badge */}
        <div className="flex items-center justify-between gap-3">
          <h3 className={`text-sm font-semibold ${isReleased ? "text-muted-foreground" : ""}`}>
            {version.name}
          </h3>
          <Badge
            variant="outline"
            className={`${badgeBase} ${getRoadmapStatusStyle(version.status)}`}
          >
            {getRoadmapStatusLabel(version.status)}
          </Badge>
        </div>

        {/* Summary */}
        <p className={`text-sm leading-relaxed ${isReleased ? "text-muted-foreground" : ""}`}>
          {version.summary}
        </p>

        {/* Progress */}
        <div className="border-t border-border/40 pt-3">
          {total === 0 ? (
            <p className="text-xs text-muted-foreground">Keine zugeordneten Einträge</p>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {done} von {total} erledigt
                </span>
                <span className="font-medium">{percentage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    percentage === 100
                      ? "bg-emerald-500"
                      : isActive
                        ? "bg-indigo-500"
                        : "bg-slate-400"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
