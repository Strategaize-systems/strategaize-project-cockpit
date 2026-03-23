"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useProject } from "@/components/project-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, ChevronDown, ChevronRight } from "lucide-react";
import {
  badgeBase,
  getReportStatusStyle,
  getReportStatusLabel,
  getReportTypeStyle,
  getReportTypeLabel,
} from "@/lib/status-badges";
import type { ReportsResponse } from "@/app/api/reports/route";
import type { Report } from "@/lib/reports";

const TYPE_OPTIONS = ["completion", "review"] as const;
const STATUS_OPTIONS = ["completed", "reviewed", "needs-rework"] as const;

export default function ReportsPage() {
  const { activeProject } = useProject();
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterSkill, setFilterSkill] = useState("");
  const [filterSlice, setFilterSlice] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Expanded report detail
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadData = useCallback(() => {
    if (!activeProject) return;
    setLoading(true);
    fetch(`/api/reports?projectPath=${encodeURIComponent(activeProject.path)}`)
      .then((res) => res.json())
      .then((result: ReportsResponse) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [activeProject]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Extract unique skills and slices for filters
  const availableSkills = useMemo(() => {
    if (!data || data.status !== "ok") return [];
    const skills = new Set<string>();
    for (const r of data.reports) skills.add(r.skill);
    return Array.from(skills).sort();
  }, [data]);

  const availableSlices = useMemo(() => {
    if (!data || data.status !== "ok") return [];
    const slices = new Set<string>();
    for (const r of data.reports) {
      if (r.slice) slices.add(r.slice);
    }
    return Array.from(slices).sort();
  }, [data]);

  // Filter
  const filteredReports = useMemo(() => {
    if (!data || data.status !== "ok") return [];
    return data.reports.filter((r) => {
      if (filterSkill && r.skill !== filterSkill) return false;
      if (filterSlice && r.slice !== filterSlice) return false;
      if (filterType && r.type !== filterType) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      return true;
    });
  }, [data, filterSkill, filterSlice, filterType, filterStatus]);

  const hasActiveFilters = filterSkill || filterSlice || filterType || filterStatus;

  function clearFilters() {
    setFilterSkill("");
    setFilterSlice("");
    setFilterType("");
    setFilterStatus("");
  }

  // --- Render ---

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <p className="text-sm text-muted-foreground">Reports werden geladen...</p>
      </div>
    );
  }

  if (!data || data.status === "not_accessible") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <EmptyState message="Projektverzeichnis nicht erreichbar." variant="error" />
      </div>
    );
  }

  if (data.status === "dir_missing" || data.status === "empty") {
    return (
      <div className="space-y-6">
        <PageHeader />
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Noch keine Reports vorhanden
              </p>
              <p className="text-xs text-muted-foreground/60 max-w-md">
                Reports werden automatisch gespeichert, wenn Arbeitsschritte
                in Claude Code abgeschlossen werden. Nutze den /review-Skill
                um Reports zu prüfen.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {availableSkills.length > 1 && (
          <FilterSelect
            label="Skill"
            value={filterSkill}
            onChange={setFilterSkill}
            options={availableSkills.map((s) => ({ value: s, label: s }))}
          />
        )}
        {availableSlices.length > 1 && (
          <FilterSelect
            label="Slice"
            value={filterSlice}
            onChange={setFilterSlice}
            options={availableSlices.map((s) => ({ value: s, label: s }))}
          />
        )}
        <FilterSelect
          label="Typ"
          value={filterType}
          onChange={setFilterType}
          options={TYPE_OPTIONS.map((t) => ({ value: t, label: getReportTypeLabel(t) }))}
        />
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={setFilterStatus}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: getReportStatusLabel(s) }))}
        />
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Report list */}
      {filteredReports.length === 0 ? (
        <EmptyState message="Keine Reports für diese Filterauswahl." />
      ) : (
        <div className="space-y-2">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              expanded={expandedId === report.id}
              onToggle={() =>
                setExpandedId(expandedId === report.id ? null : report.id)
              }
            />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filteredReports.length} von {data.reports.length} Reports
        {hasActiveFilters ? " (gefiltert)" : ""}
      </p>
    </div>
  );
}

// ─── Page header ──────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <div className="mb-0">
      <div className="flex items-center gap-2.5 mb-1">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-xl font-semibold tracking-tight">Reports</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Completion Reports und Review-Ergebnisse aus der Projektarbeit.
      </p>
    </div>
  );
}

// ─── Report card with expandable detail ────────────────────────────────────

function ReportCard({
  report,
  expanded,
  onToggle,
}: {
  report: Report;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        {/* Summary row */}
        <button
          onClick={onToggle}
          className="w-full flex items-start gap-3 text-left"
        >
          <div className="mt-0.5 shrink-0 text-muted-foreground/40">
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Top line: ID + title */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] text-muted-foreground/60 shrink-0">
                {report.id}
              </span>
              <span className="text-sm font-medium truncate">
                {report.title}
              </span>
            </div>

            {/* Meta line: date, badges, slice */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground/60">
                {report.date}
              </span>
              <Badge
                variant="outline"
                className={`${badgeBase} ${getReportTypeStyle(report.type)}`}
              >
                {getReportTypeLabel(report.type)}
              </Badge>
              <Badge
                variant="outline"
                className={`${badgeBase} ${getReportStatusStyle(report.status)}`}
              >
                {getReportStatusLabel(report.status)}
              </Badge>
              <span className="text-[11px] text-muted-foreground/50">
                {report.skill}
              </span>
              {report.result && (
                <ResultBadge result={report.result} />
              )}
              {report.slice && (
                <span className="text-[11px] font-mono text-muted-foreground/50">
                  {report.slice}
                </span>
              )}
              {report.reviewOf && (
                <span className="text-[11px] text-muted-foreground/50">
                  → {report.reviewOf}
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-4 ml-7 border-t border-border/40 pt-4">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed max-h-[500px] overflow-y-auto">
              {report.body}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Result badge ─────────────────────────────────────────────────────────

function ResultBadge({ result }: { result: string }) {
  const lower = result.toLowerCase();
  let className = "bg-slate-50 text-slate-500 border-slate-200/60";

  if (lower.startsWith("pass") || lower.startsWith("bestanden")) {
    className = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
  } else if (lower.startsWith("fail") || lower.startsWith("nicht bestanden")) {
    className = "bg-red-50 text-red-700 border-red-200/60";
  } else if (lower.startsWith("mixed") || lower.startsWith("teilweise")) {
    className = "bg-amber-50 text-amber-700 border-amber-200/60";
  }

  return (
    <Badge variant="outline" className={`${badgeBase} ${className}`}>
      {result}
    </Badge>
  );
}

// ─── Filter select ────────────────────────────────────────────────────────

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 rounded-md border bg-card px-2 text-xs transition-colors ${
        value
          ? "border-primary/40 text-foreground"
          : "border-border/60 text-muted-foreground"
      }`}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
