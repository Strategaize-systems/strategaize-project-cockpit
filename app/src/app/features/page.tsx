"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  badgeBase,
  getStatusStyle,
  getStatusLabel,
  getPriorityStyle,
  getPriorityLabel,
} from "@/lib/status-badges";
import type { FeaturesData } from "@/app/api/features/route";

export default function FeaturesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<FeaturesData | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Features</h1>
        <p className="text-sm text-muted-foreground">Features werden geladen...</p>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Features</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "index_missing") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Features</h1>
        <EmptyState message="Kein Feature-Index für dieses Projekt gefunden." />
      </div>
    );
  }

  if (data.status === "index_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Features</h1>
        <EmptyState message="Feature-Index konnte nicht gelesen werden." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.features.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Features</h1>
        <EmptyState message="Noch keine Features definiert." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Features</h1>
      <div className="rounded-lg border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">ID</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Feature</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Priorität</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 hidden sm:table-cell">Notizen</th>
            </tr>
          </thead>
          <tbody>
            {data.features.map((feature, i) => (
              <tr
                key={feature.id || i}
                className="border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/60">{feature.id}</td>
                <td className="px-4 py-3 font-medium">{feature.name}</td>
                <td className="px-4 py-3">
                  {feature.status && (
                    <Badge
                      variant="outline"
                      className={`${badgeBase} ${getStatusStyle(feature.status)}`}
                    >
                      {getStatusLabel(feature.status)}
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {feature.priority && (
                    <Badge
                      variant="outline"
                      className={`${badgeBase} ${getPriorityStyle(feature.priority)}`}
                    >
                      {getPriorityLabel(feature.priority)}
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate hidden sm:table-cell">
                  {feature.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
