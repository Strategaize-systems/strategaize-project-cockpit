"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabeledField } from "@/components/ui/labeled-field";
import { EmptyState } from "@/components/ui/empty-state";
import type { ReleasesData } from "@/app/api/releases/route";

export default function ReleasesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<ReleasesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/releases?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: ReleasesData) => {
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
        <h1 className="text-2xl font-bold tracking-tight">Releases & Migrationen</h1>
        <p className="text-sm text-muted-foreground">Daten werden geladen...</p>
      </div>
    );
  }

  if (!data || !data.accessible) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Releases & Migrationen</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Releases & Migrationen</h1>

      {/* Releases Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Releases</h2>

        {data.releases.status === "file_missing" && (
          <EmptyState message="Keine Releases für dieses Projekt gefunden." />
        )}
        {data.releases.status === "file_malformed" && (
          <EmptyState message="Releases konnten nicht gelesen werden." variant="error" />
        )}
        {data.releases.status === "empty" && (
          <EmptyState message="Noch keine Releases vorhanden." />
        )}

        {data.releases.status === "ok" &&
          [...data.releases.entries].reverse().map((rel, i) => (
            <Card key={rel.id || i}>
              <CardContent className="pt-5 pb-5 space-y-3">
                <div>
                  <p className="text-[11px] font-mono text-muted-foreground/60 mb-0.5">
                    {rel.id}
                  </p>
                  <p className="text-sm font-semibold leading-snug">
                    {rel.title || "—"}
                  </p>
                </div>
                <div className="border-t border-border/40 pt-3 space-y-3">
                  <LabeledField label="Datum" value={rel.date || "—"} />
                  <LabeledField label="Umfang" value={rel.scope || "—"} />
                  <LabeledField label="Zusammenfassung" value={rel.summary || "—"} />
                  <LabeledField label="Risiken" value={rel.risks} />
                  <LabeledField label="Rollback-Hinweise" value={rel.rollbackNotes} />
                </div>
              </CardContent>
            </Card>
          ))}
      </section>

      {/* Migrations Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Migrationen</h2>

        {data.migrations.status === "file_missing" && (
          <EmptyState message="Keine Migrationen für dieses Projekt gefunden." />
        )}
        {data.migrations.status === "file_malformed" && (
          <EmptyState message="Migrationen konnten nicht gelesen werden." variant="error" />
        )}
        {data.migrations.status === "empty" && (
          <EmptyState message="Noch keine Migrationen vorhanden." />
        )}

        {data.migrations.status === "ok" &&
          [...data.migrations.entries].reverse().map((mig, i) => (
            <Card key={mig.id || i}>
              <CardContent className="pt-5 pb-5 space-y-3">
                <div>
                  <p className="text-[11px] font-mono text-muted-foreground/60 mb-0.5">
                    {mig.id}
                  </p>
                  <p className="text-sm font-semibold leading-snug">
                    {mig.title || "—"}
                  </p>
                </div>
                <div className="border-t border-border/40 pt-3 space-y-3">
                  <LabeledField label="Datum" value={mig.date || "—"} />
                  <LabeledField label="Umfang / Grund" value={mig.scope || mig.reason || "—"} />
                  <LabeledField label="Betroffene Bereiche" value={mig.affectedAreas || "—"} />
                  <LabeledField label="Risiko" value={mig.risk} />
                  <LabeledField label="Rollback-Hinweise" value={mig.rollbackNotes} />
                </div>
              </CardContent>
            </Card>
          ))}
      </section>
    </div>
  );
}
