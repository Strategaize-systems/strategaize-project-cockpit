"use client";

import { useEffect, useState, useCallback } from "react";
import { useProject } from "@/components/project-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Compass,
  Copy,
  Check,
  CircleDot,
  CircleAlert,
  CircleHelp,
  CheckCircle2,
  FileText,
  AlertTriangle,
} from "lucide-react";
import type { PendingStep } from "@/lib/next-step";
import {
  badgeBase,
  getReportStatusStyle,
  getReportStatusLabel,
  getReportTypeStyle,
  getReportTypeLabel,
} from "@/lib/status-badges";
import type { NextStepResponse } from "@/app/api/next-step/route";
import type { ReportsResponse } from "@/app/api/reports/route";
import type { Report } from "@/lib/reports";

export default function NextStepPage() {
  const { activeProject } = useProject();
  const [stepData, setStepData] = useState<NextStepResponse | null>(null);
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const loadData = useCallback(() => {
    if (!activeProject) return;
    setLoading(true);

    const stepPromise = fetch(
      `/api/next-step?projectPath=${encodeURIComponent(activeProject.path)}`
    )
      .then((res) => res.json())
      .then((result: NextStepResponse) => setStepData(result))
      .catch(() => setStepData(null));

    const reportsPromise = fetch(
      `/api/reports?projectPath=${encodeURIComponent(activeProject.path)}`
    )
      .then((res) => res.json())
      .then((result: ReportsResponse) => {
        if (result.status === "ok") {
          setRecentReports(result.reports.slice(0, 3));
        } else {
          setRecentReports([]);
        }
      })
      .catch(() => setRecentReports([]));

    Promise.all([stepPromise, reportsPromise]).then(() => setLoading(false));
  }, [activeProject]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCopy(prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text for manual copy
    }
  }

  // --- Render ---

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 border-2 border-[var(--brand-primary-main)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Engine analysiert Projektstatus...</p>
        </div>
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Kein Projekt ausgewählt. Bitte wähle ein Projekt in der Sidebar." />
      </div>
    );
  }

  if (!stepData || stepData.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState
          message="Projektverzeichnis nicht erreichbar."
          variant="error"
        />
      </div>
    );
  }

  if (stepData.status === "error") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState
          message={`Fehler: ${stepData.reason}`}
          variant="error"
        />
      </div>
    );
  }

  // No recommendation — all done
  if (!stepData.recommendation) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500/60 mb-3" />
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Alle Schritte abgeschlossen
              </p>
              <p className="text-xs text-muted-foreground/60 max-w-md">
                {stepData.reason}
              </p>
            </div>
          </CardContent>
        </Card>
        {stepData.pendingSteps && stepData.pendingSteps.length > 0 && (
          <PendingStepsSection steps={stepData.pendingSteps} />
        )}
        {recentReports.length > 0 && (
          <RecentReportsSection reports={recentReports} />
        )}
      </div>
    );
  }

  const rec = stepData.recommendation;

  return (
    <div className="space-y-6">
      <PageHeader />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #120774, #4454b8)" }} />
          <CardContent className="pt-5 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Total Steps</p>
              <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #120774, #4454b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {recentReports.length > 0 ? recentReports.length : "—"}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
              <Compass className="h-4.5 w-4.5 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #00a84f, #4dcb8b)" }} />
          <CardContent className="pt-5 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Erledigt</p>
              <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #00a84f, #4dcb8b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {recentReports.filter(r => r.status === "reviewed" || r.status === "completed").length}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #dc2626, #f87171)" }} />
          <CardContent className="pt-5 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Hohe Priorität</p>
            <p className="text-2xl font-bold text-red-600">
              {stepData.pendingSteps?.length ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #f2b705, #ffd54f)" }} />
          <CardContent className="pt-5 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Mittlere Priorität</p>
            <p className="text-2xl font-bold" style={{ background: "linear-gradient(to right, #f2b705, #ffd54f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {recentReports.length > 0 ? Math.max(0, recentReports.length - 1) : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation — gradient card like Figma */}
      <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)" }}>
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Compass className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Empfohlener Nächster Schritt</h2>
              <p className="text-xs text-white/60">Intelligente Priorisierung basierend auf deinem Backlog</p>
            </div>
          </div>

          {/* Prompt content */}
          <div className="rounded-lg bg-white/5 border border-white/10 px-5 py-4 mb-4">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-slate-200 max-h-[300px] overflow-y-auto">
              {rec.prompt}
            </pre>
          </div>

          <p className="text-xs text-white/50 mb-1">
            <ConfidenceBadge level={rec.confidence} /> {rec.reason}
          </p>
        </div>

        {/* Copy button */}
        <div className="px-6 pb-5">
          <button
            onClick={() => handleCopy(rec.prompt)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-px border border-white/20"
            style={{
              background: copied
                ? "linear-gradient(to right, #00a84f, #4dcb8b)"
                : "rgba(255,255,255,0.08)",
              color: "white",
              boxShadow: copied ? "0 4px 6px rgba(0, 168, 79, 0.3)" : "none",
            }}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Kopiert!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Prompt kopieren
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pending older steps */}
      {stepData.pendingSteps && stepData.pendingSteps.length > 0 && (
        <PendingStepsSection steps={stepData.pendingSteps} />
      )}

      {/* Recent reports as "Alle Next Steps" */}
      {recentReports.length > 0 && (
        <RecentReportsSection reports={recentReports} />
      )}
    </div>
  );
}

// ─── Page header ──────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <div className="mb-0">
      <div className="flex items-center gap-2.5 mb-1">
        <Compass className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-xl font-semibold tracking-tight">
          Nächster Schritt
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Empfohlener nächster Arbeitsschritt basierend auf dem aktuellen
        Projektstatus.
      </p>
    </div>
  );
}

// ─── Confidence badge ─────────────────────────────────────────────────────

function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const config = {
    high: {
      icon: CircleDot,
      label: "Hohe Konfidenz",
      className: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    },
    medium: {
      icon: CircleAlert,
      label: "Mittlere Konfidenz",
      className: "text-amber-600 bg-amber-50 border-amber-200/60",
    },
    low: {
      icon: CircleHelp,
      label: "Niedrige Konfidenz",
      className: "text-slate-500 bg-slate-50 border-slate-200/60",
    },
  };

  const c = config[level];
  const Icon = c.icon;

  return (
    <Badge variant="outline" className={`${badgeBase} ${c.className} gap-1`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </Badge>
  );
}

// ─── Pending steps section — Premium Cards ───────────────────────────────

function PendingStepsSection({ steps }: { steps: PendingStep[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold mb-3">Offene Schritte</h2>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <Card key={`${step.version}-${step.skill}-${i}`} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, #f2b705, #ffd54f)" }} />
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{step.skill}</span>
                    <Badge variant="outline" className={`${badgeBase} gradient-bg-warning text-slate-900 shadow-sm`}>
                      {step.version}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{step.reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Recent reports section — Premium Cards ──────────────────────────────

function RecentReportsSection({ reports }: { reports: Report[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold mb-3">Letzte Reports</h2>
      <div className="space-y-2">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <FileText className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-[var(--brand-primary-main)]">{report.id}</span>
                    <span className="text-sm font-medium truncate">{report.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{report.date}</span>
                    <Badge variant="outline" className={`${badgeBase} ${getReportTypeStyle(report.type)}`}>
                      {getReportTypeLabel(report.type)}
                    </Badge>
                    <Badge variant="outline" className={`${badgeBase} ${getReportStatusStyle(report.status)}`}>
                      {getReportStatusLabel(report.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
