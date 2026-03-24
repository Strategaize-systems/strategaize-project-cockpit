"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LabeledField } from "@/components/ui/labeled-field";
import { EmptyState } from "@/components/ui/empty-state";
import {
  badgeBase,
  getSeverityStyle,
  getSeverityLabel,
  getIssueStatusStyle,
  getIssueStatusLabel,
} from "@/lib/status-badges";
import type { IssuesData } from "@/app/api/issues/route";

export default function IssuesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<IssuesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/issues?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: IssuesData) => {
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
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Probleme werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  if (data.status === "file_missing") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <EmptyState message="Keine bekannten Probleme für dieses Projekt gefunden." />
      </div>
    );
  }

  if (data.status === "file_malformed") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <EmptyState message="Bekannte Probleme konnten nicht gelesen werden." variant="error" />
      </div>
    );
  }

  if (data.status === "empty" || data.issues.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <EmptyState message="Keine bekannten Probleme vorhanden." />
      </div>
    );
  }

  const openCount = data.issues.filter((i) => i.status?.toLowerCase() === "open").length;
  const resolvedCount = data.issues.filter((i) => i.status?.toLowerCase() === "resolved").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Probleme</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {data.issues.length} Einträge · {openCount} offen · {resolvedCount} behoben
        </p>
      </div>
      <div className="space-y-3">
        {data.issues.map((issue, i) => {
          const isResolved =
            issue.status.toLowerCase() === "resolved" ||
            issue.status.toLowerCase() === "wontfix";
          const isOpen = issue.status.toLowerCase() === "open";

          return (
            <Card
              key={issue.id || i}
              className={isResolved ? "opacity-50" : ""}
            >
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          background: isOpen
                            ? "linear-gradient(to bottom right, #dc2626, #f87171)"
                            : isResolved
                              ? "linear-gradient(to bottom right, #00a84f, #4dcb8b)"
                              : "#94a3b8",
                          boxShadow: isOpen
                            ? "0 0 8px rgba(220, 38, 38, 0.3)"
                            : isResolved
                              ? "0 0 8px rgba(0, 168, 79, 0.3)"
                              : "none",
                        }}
                      />
                      <p className="text-[11px] font-mono text-[var(--brand-primary-main)]">
                        {issue.id}
                      </p>
                    </div>
                    <p className="text-sm font-semibold leading-snug">
                      {issue.title || "—"}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {issue.severity && (
                      <Badge
                        variant="outline"
                        className={`${badgeBase} ${getSeverityStyle(issue.severity)}`}
                      >
                        {getSeverityLabel(issue.severity)}
                      </Badge>
                    )}
                    {issue.status && (
                      <Badge
                        variant="outline"
                        className={`${badgeBase} ${getIssueStatusStyle(issue.status)}`}
                      >
                        {getIssueStatusLabel(issue.status)}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="border-t border-border/40 pt-3 space-y-3">
                  <LabeledField label="Bereich" value={issue.area || "—"} />
                  <LabeledField label="Zusammenfassung" value={issue.summary || "—"} />
                  <LabeledField label="Auswirkung" value={issue.impact} />
                  <LabeledField label="Behelfslösung" value={issue.workaround} />
                  <LabeledField label="Nächster Schritt" value={issue.nextAction} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
