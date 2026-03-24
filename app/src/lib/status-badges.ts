/**
 * Shared badge styling system for the entire cockpit. (V4 Premium)
 * All status, priority, severity, and context badges are defined here.
 *
 * V4: Gradient-fills for active states (Success, Warning),
 * premium borders and shadows for emphasis badges.
 * Based on: /docs/strategaize_styleguide.md
 */

// ─── Slice/Feature Status ───────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  done: "gradient-bg-success text-white shadow-sm",
  in_progress: "gradient-bg-warning text-slate-900 shadow-sm",
  blocked: "bg-red-500 text-white shadow-sm",
  planned: "bg-slate-100 text-slate-600 border border-slate-200",
  ready: "bg-blue-50 text-blue-700 border border-blue-200/60",
  deferred: "bg-slate-100 text-slate-400 border border-slate-200",
  qa_pending: "bg-orange-50 text-orange-700 border border-orange-200/60",
};

const statusLabels: Record<string, string> = {
  done: "Fertig",
  in_progress: "In Arbeit",
  blocked: "Blockiert",
  planned: "Geplant",
  ready: "Bereit",
  deferred: "Zurückgestellt",
  qa_pending: "QA ausstehend",
};

// ─── Priority ───────────────────────────────────────────────────────────────

const priorityStyles: Record<string, string> = {
  high: "bg-red-50 text-red-700 border border-red-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low: "bg-slate-100 text-slate-400 border border-slate-200",
};

const priorityLabels: Record<string, string> = {
  high: "Hoch",
  medium: "Mittel",
  low: "Niedrig",
};

// ─── Backlog Type ───────────────────────────────────────────────────────────

const backlogTypeStyles: Record<string, string> = {
  bug: "bg-red-50 text-red-700 border border-red-200",
  fix: "bg-orange-50 text-orange-700 border border-orange-200",
  feature: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  improvement: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  idea: "bg-violet-50 text-violet-700 border border-violet-200",
  later: "bg-slate-100 text-slate-400 border border-slate-200",
};

const backlogTypeLabels: Record<string, string> = {
  bug: "Bug",
  fix: "Fix",
  feature: "Feature",
  improvement: "Verbesserung",
  idea: "Idee",
  later: "Später",
};

// ─── Backlog Status ─────────────────────────────────────────────────────────

const backlogStatusStyles: Record<string, string> = {
  open: "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress: "gradient-bg-warning text-slate-900 shadow-sm",
  done: "gradient-bg-success text-white shadow-sm",
  deferred: "bg-slate-100 text-slate-400 border border-slate-200",
  blocked: "bg-red-500 text-white shadow-sm",
};

const backlogStatusLabels: Record<string, string> = {
  open: "Offen",
  in_progress: "In Arbeit",
  done: "Fertig",
  deferred: "Zurückgestellt",
  blocked: "Blockiert",
};

// ─── Issue Severity ─────────────────────────────────────────────────────────

const severityStyles: Record<string, string> = {
  blocker: "bg-red-500 text-white shadow-sm",
  high: "bg-orange-50 text-orange-700 border border-orange-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low: "bg-slate-100 text-slate-400 border border-slate-200",
};

const severityLabels: Record<string, string> = {
  blocker: "Blocker",
  high: "Hoch",
  medium: "Mittel",
  low: "Niedrig",
};

// ─── Issue Status ───────────────────────────────────────────────────────────

const issueStatusStyles: Record<string, string> = {
  open: "bg-blue-50 text-blue-700 border border-blue-200",
  resolved: "gradient-bg-success text-white shadow-sm",
  wontfix: "bg-slate-100 text-slate-400 border border-slate-200",
};

const issueStatusLabels: Record<string, string> = {
  open: "Offen",
  resolved: "Behoben",
  wontfix: "Kein Fix",
};

// ─── Roadmap Version Status ─────────────────────────────────────────────────

const roadmapStatusStyles: Record<string, string> = {
  released: "gradient-bg-success text-white shadow-sm",
  active: "gradient-bg-primary text-white shadow-sm",
  planned: "bg-slate-100 text-slate-600 border border-slate-200",
  deferred: "bg-amber-50 text-amber-700 border border-amber-200",
};

const roadmapStatusLabels: Record<string, string> = {
  released: "Veröffentlicht",
  active: "Aktiv",
  planned: "Geplant",
  deferred: "Zurückgestellt",
};

// ─── Report Status ─────────────────────────────────────────────────────────

const reportStatusStyles: Record<string, string> = {
  completed: "gradient-bg-warning text-slate-900 shadow-sm",
  reviewed: "gradient-bg-success text-white shadow-sm",
  "needs-rework": "bg-red-500 text-white shadow-sm",
};

const reportStatusLabels: Record<string, string> = {
  completed: "Abgeschlossen",
  reviewed: "Geprüft",
  "needs-rework": "Nacharbeit",
};

// ─── Report Type ───────────────────────────────────────────────────────────

const reportTypeStyles: Record<string, string> = {
  completion: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  review: "bg-violet-50 text-violet-700 border border-violet-200",
};

const reportTypeLabels: Record<string, string> = {
  completion: "Completion",
  review: "Review",
};

// ─── Decision Status ────────────────────────────────────────────────────────

const decisionStatusStyles: Record<string, string> = {
  accepted: "gradient-bg-success text-white shadow-sm",
  superseded: "bg-slate-100 text-slate-400 border border-slate-200",
  deprecated: "bg-red-50 text-red-600 border border-red-200",
};

const decisionStatusLabels: Record<string, string> = {
  accepted: "Akzeptiert",
  superseded: "Ersetzt",
  deprecated: "Veraltet",
};

// ─── Shared badge class (applied to all badges) ────────────────────────────

export const badgeBase = "text-[11px] font-semibold px-2.5 py-0.5 rounded-md";

// ─── Getters ────────────────────────────────────────────────────────────────

const fallback = "bg-slate-100 text-slate-500 border border-slate-200";

export function getStatusStyle(status: string): string {
  return statusStyles[status.toLowerCase()] ?? fallback;
}
export function getStatusLabel(status: string): string {
  return statusLabels[status.toLowerCase()] ?? status;
}

export function getPriorityStyle(priority: string): string {
  return priorityStyles[priority.toLowerCase()] ?? fallback;
}
export function getPriorityLabel(priority: string): string {
  return priorityLabels[priority.toLowerCase()] ?? priority;
}

export function getSeverityStyle(severity: string): string {
  return severityStyles[severity.toLowerCase()] ?? fallback;
}
export function getSeverityLabel(severity: string): string {
  return severityLabels[severity.toLowerCase()] ?? severity;
}

export function getIssueStatusStyle(status: string): string {
  return issueStatusStyles[status.toLowerCase()] ?? fallback;
}
export function getIssueStatusLabel(status: string): string {
  return issueStatusLabels[status.toLowerCase()] ?? status;
}

export function getDecisionStatusStyle(status: string): string {
  return decisionStatusStyles[status.toLowerCase()] ?? fallback;
}
export function getDecisionStatusLabel(status: string): string {
  return decisionStatusLabels[status.toLowerCase()] ?? status;
}

export function getRoadmapStatusStyle(status: string): string {
  return roadmapStatusStyles[status.toLowerCase()] ?? fallback;
}
export function getRoadmapStatusLabel(status: string): string {
  return roadmapStatusLabels[status.toLowerCase()] ?? status;
}

export function getBacklogTypeStyle(type: string): string {
  return backlogTypeStyles[type.toLowerCase()] ?? fallback;
}
export function getBacklogTypeLabel(type: string): string {
  return backlogTypeLabels[type.toLowerCase()] ?? type;
}

export function getBacklogStatusStyle(status: string): string {
  return backlogStatusStyles[status.toLowerCase()] ?? fallback;
}
export function getBacklogStatusLabel(status: string): string {
  return backlogStatusLabels[status.toLowerCase()] ?? status;
}

export function getReportStatusStyle(status: string): string {
  return reportStatusStyles[status.toLowerCase()] ?? fallback;
}
export function getReportStatusLabel(status: string): string {
  return reportStatusLabels[status.toLowerCase()] ?? status;
}

export function getReportTypeStyle(type: string): string {
  return reportTypeStyles[type.toLowerCase()] ?? fallback;
}
export function getReportTypeLabel(type: string): string {
  return reportTypeLabels[type.toLowerCase()] ?? type;
}
