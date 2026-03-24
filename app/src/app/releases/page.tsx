"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/components/project-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LabeledField } from "@/components/ui/labeled-field";
import { EmptyState } from "@/components/ui/empty-state";
import { badgeBase } from "@/lib/status-badges";
import { ChevronDown, ChevronRight, Package, GitCommit } from "lucide-react";
import type { ReleasesData } from "@/app/api/releases/route";

export default function ReleasesPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<ReleasesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        <h1 className="text-2xl font-bold tracking-tight">Releases & Migrationen</h1>
        <EmptyState message="Projektverzeichnis nicht erreichbar" variant="error" />
      </div>
    );
  }

  const releaseCount = data.releases.status === "ok" ? data.releases.entries.length : 0;
  const migrationCount = data.migrations.status === "ok" ? data.migrations.entries.length : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Releases & Migrationen</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Übersicht aller Releases, Versionen und Migrationen</p>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #00a84f, #4dcb8b)" }} />
          <CardContent className="pt-5 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Total Releases</p>
              <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #00a84f, #4dcb8b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{releaseCount}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Package className="h-4.5 w-4.5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #120774, #4454b8)" }} />
          <CardContent className="pt-5 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Migrationen</p>
              <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #120774, #4454b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{migrationCount}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
              <GitCommit className="h-4.5 w-4.5 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #f2b705, #ffd54f)" }} />
          <CardContent className="pt-5 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Latest</p>
            <p className="text-lg font-bold" style={{ background: "linear-gradient(to right, #f2b705, #ffd54f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {releaseCount > 0 && data.releases.status === "ok"
                ? data.releases.entries[data.releases.entries.length - 1]?.title ?? "—"
                : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Release Timeline */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Release Timeline</h2>

        {data.releases.status === "file_missing" && <EmptyState message="Keine Releases gefunden." />}
        {data.releases.status === "file_malformed" && <EmptyState message="Releases nicht lesbar." variant="error" />}
        {data.releases.status === "empty" && <EmptyState message="Noch keine Releases." />}

        {data.releases.status === "ok" && (
          <div className="relative ml-4 border-l-2 border-border/40 pl-8 space-y-6">
            {[...data.releases.entries].reverse().map((rel, i) => {
              const isExpanded = expandedId === `rel-${rel.id}`;
              return (
                <div key={rel.id || i} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-white"
                    style={{
                      background: "linear-gradient(to bottom right, #00a84f, #4dcb8b)",
                      boxShadow: "0 0 8px rgba(0, 168, 79, 0.3)",
                    }}
                  />
                  <button onClick={() => setExpandedId(isExpanded ? null : `rel-${rel.id}`)} className="w-full text-left group">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 text-muted-foreground/40">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold group-hover:text-[var(--brand-primary-main)] transition-colors">{rel.title || rel.id}</span>
                          <Badge variant="outline" className={`${badgeBase} gradient-bg-success text-white shadow-sm`}>Veröffentlicht</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{rel.date ? `📅 ${rel.date}` : ""}</p>
                      </div>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="mt-3 ml-7 border-t border-border/40 pt-3 space-y-2">
                      <LabeledField label="Umfang" value={rel.scope || "—"} />
                      <LabeledField label="Zusammenfassung" value={rel.summary || "—"} />
                      <LabeledField label="Risiken" value={rel.risks} />
                      <LabeledField label="Rollback" value={rel.rollbackNotes} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Migrations Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Migrationen</h2>

        {data.migrations.status === "file_missing" && <EmptyState message="Keine Migrationen gefunden." />}
        {data.migrations.status === "file_malformed" && <EmptyState message="Migrationen nicht lesbar." variant="error" />}
        {data.migrations.status === "empty" && <EmptyState message="Noch keine Migrationen." />}

        {data.migrations.status === "ok" &&
          [...data.migrations.entries].reverse().map((mig, i) => (
            <Card key={mig.id || i}>
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: "linear-gradient(to bottom right, #120774, #4454b8)", boxShadow: "0 0 6px rgba(68, 84, 184, 0.3)" }} />
                  <p className="text-[11px] font-mono text-[var(--brand-primary-main)]">{mig.id}</p>
                </div>
                <p className="text-sm font-semibold">{mig.title || "—"}</p>
                <div className="border-t border-border/40 pt-3 space-y-2">
                  <LabeledField label="Datum" value={mig.date || "—"} />
                  <LabeledField label="Umfang / Grund" value={mig.scope || mig.reason || "—"} />
                  <LabeledField label="Betroffene Bereiche" value={mig.affectedAreas || "—"} />
                  <LabeledField label="Risiko" value={mig.risk} />
                  <LabeledField label="Rollback" value={mig.rollbackNotes} />
                </div>
              </CardContent>
            </Card>
          ))}
      </section>
    </div>
  );
}
