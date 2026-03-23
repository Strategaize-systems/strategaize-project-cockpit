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
import type { SlicesData } from "@/app/api/slices/route";

export default function SlicesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<SlicesData | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
        <p className="text-sm text-muted-foreground">Slices werden geladen...</p>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "index_missing") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
        <EmptyState message="Kein Slice-Index für dieses Projekt gefunden." />
      </div>
    );
  }

  if (data.status === "index_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
        <EmptyState message="Slice-Index konnte nicht gelesen werden." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.slices.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
        <EmptyState message="Noch keine Slices definiert." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Slices</h1>
      <div className="rounded-lg border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">ID</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Slice</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Feature</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">Priorität</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 hidden sm:table-cell">Notizen</th>
            </tr>
          </thead>
          <tbody>
            {data.slices.map((slice, i) => {
              const isActive =
                slice.status.toLowerCase() === "in_progress";

              return (
                <tr
                  key={slice.id || i}
                  className={`border-b border-border/30 last:border-b-0 transition-colors ${
                    isActive
                      ? "bg-amber-50/60 border-l-[3px] border-l-amber-400"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/60">{slice.id}</td>
                  <td className={`px-4 py-3 ${isActive ? "font-semibold" : "font-medium"}`}>
                    {slice.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground/60">
                    {slice.relatedFeature}
                  </td>
                  <td className="px-4 py-3">
                    {slice.status && (
                      <Badge
                        variant="outline"
                        className={`${badgeBase} ${getStatusStyle(slice.status)}`}
                      >
                        {getStatusLabel(slice.status)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {slice.priority && (
                      <Badge
                        variant="outline"
                        className={`${badgeBase} ${getPriorityStyle(slice.priority)}`}
                      >
                        {getPriorityLabel(slice.priority)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate hidden sm:table-cell">
                    {slice.notes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
