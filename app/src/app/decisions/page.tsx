"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LabeledField } from "@/components/ui/labeled-field";
import { EmptyState } from "@/components/ui/empty-state";
import {
  badgeBase,
  getDecisionStatusStyle,
  getDecisionStatusLabel,
} from "@/lib/status-badges";
import type { DecisionsPageData } from "@/app/api/decisions/route";

export default function DecisionsPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<DecisionsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/decisions?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: DecisionsPageData) => {
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
        <h1 className="text-2xl font-bold tracking-tight">Entscheidungen & Verbesserungen</h1>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Daten werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.accessible) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Entscheidungen & Verbesserungen</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Entscheidungen & Verbesserungen</h1>

      {/* Decisions Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Entscheidungen</h2>

        {data.decisions.status === "file_missing" && (
          <EmptyState message="Keine Entscheidungen für dieses Projekt gefunden." />
        )}
        {data.decisions.status === "file_malformed" && (
          <EmptyState message="Entscheidungen konnten nicht gelesen werden." variant="error" />
        )}
        {data.decisions.status === "empty" && (
          <EmptyState message="Noch keine Entscheidungen dokumentiert." />
        )}

        {data.decisions.status === "ok" &&
          data.decisions.entries.map((dec, i) => (
            <Card key={dec.id || i}>
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-muted-foreground/60 mb-0.5">
                      {dec.id}
                    </p>
                    <p className="text-sm font-semibold leading-snug">
                      {dec.title || "—"}
                    </p>
                  </div>
                  {dec.status && (
                    <Badge
                      variant="outline"
                      className={`${badgeBase} shrink-0 ${getDecisionStatusStyle(dec.status)}`}
                    >
                      {getDecisionStatusLabel(dec.status)}
                    </Badge>
                  )}
                </div>
                <div className="border-t border-border/40 pt-3 space-y-3">
                  <LabeledField label="Begründung" value={dec.reason || "—"} />
                  <LabeledField label="Auswirkung" value={dec.consequence || "—"} />
                </div>
              </CardContent>
            </Card>
          ))}
      </section>

      {/* Skill Improvements Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Skill-Verbesserungen</h2>

        {data.improvements.status === "file_missing" && (
          <EmptyState message="Keine Verbesserungen für dieses Projekt gefunden." />
        )}
        {data.improvements.status === "file_malformed" && (
          <EmptyState message="Verbesserungen konnten nicht gelesen werden." variant="error" />
        )}
        {data.improvements.status === "empty" && (
          <EmptyState message="Noch keine Verbesserungen dokumentiert." />
        )}

        {data.improvements.status === "ok" &&
          data.improvements.entries.map((imp, i) => (
            <Card key={imp.id || i}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  {imp.id} — {imp.title || "—"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <LabeledField label="Datum" value={imp.date || "—"} />
                <LabeledField label="Quelle" value={imp.source || "—"} />
                <LabeledField label="Beobachtung" value={imp.observation || "—"} />
                <LabeledField label="Vorgeschlagene Verbesserung" value={imp.suggestedImprovement || "—"} />
                <LabeledField label="Betroffener Bereich" value={imp.affectedArea || "—"} />
                <LabeledField label="Status" value={imp.status || "—"} />
              </CardContent>
            </Card>
          ))}
      </section>
    </div>
  );
}
