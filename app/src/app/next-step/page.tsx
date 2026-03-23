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
        <p className="text-sm text-muted-foreground">
          Engine analysiert Projektstatus...
        </p>
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

      {/* Recommendation card */}
      <Card>
        <CardContent className="pt-5 pb-5 space-y-4">
          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-2">
            <ConfidenceBadge level={rec.confidence} />
            <span className="text-sm font-semibold text-indigo-600">
              {rec.skill}
            </span>
            <span className="text-sm text-muted-foreground">für</span>
            <span className="text-sm font-mono font-medium">
              {rec.slice}
            </span>
            {rec.feature && (
              <>
                <span className="text-xs text-muted-foreground/50">•</span>
                <span className="text-xs text-muted-foreground/60">
                  {rec.feature}
                </span>
              </>
            )}
          </div>

          {/* Reason */}
          <p className="text-sm text-muted-foreground">{rec.reason}</p>

          {/* Prompt block */}
          <div className="relative rounded-lg border border-border/60 bg-muted/30">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Prompt
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 gap-1.5 text-xs"
                onClick={() => handleCopy(rec.prompt)}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Kopieren
                  </>
                )}
              </Button>
            </div>
            <pre className="px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-foreground/80 max-h-[400px] overflow-y-auto">
              {rec.prompt}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Pending older steps */}
      {stepData.pendingSteps && stepData.pendingSteps.length > 0 && (
        <PendingStepsSection steps={stepData.pendingSteps} />
      )}

      {/* Recent reports */}
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

// ─── Pending steps section ────────────────────────────────────────────────

function PendingStepsSection({ steps }: { steps: PendingStep[] }) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-wider text-amber-600/80 mb-2">
        Offene Schritte
      </h2>
      <div className="space-y-1.5">
        {steps.map((step, i) => (
          <div
            key={`${step.version}-${step.skill}-${i}`}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-50/50 border border-amber-200/40"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500/60 shrink-0" />
            <span className="text-xs font-medium text-amber-700">
              {step.skill}
            </span>
            <span className="text-xs text-amber-600/80 truncate">
              {step.reason}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Recent reports section ───────────────────────────────────────────────

function RecentReportsSection({ reports }: { reports: Report[] }) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
        Letzte Reports
      </h2>
      <div className="space-y-1.5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/20 border border-border/30"
          >
            <FileText className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
            <span className="font-mono text-[11px] text-muted-foreground/50 shrink-0">
              {report.id}
            </span>
            <span className="text-xs truncate">{report.title}</span>
            <Badge
              variant="outline"
              className={`${badgeBase} ${getReportTypeStyle(report.type)} ml-auto shrink-0`}
            >
              {getReportTypeLabel(report.type)}
            </Badge>
            <Badge
              variant="outline"
              className={`${badgeBase} ${getReportStatusStyle(report.status)} shrink-0`}
            >
              {getReportStatusLabel(report.status)}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
