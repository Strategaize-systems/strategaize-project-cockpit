/**
 * Shared badge styling system for the entire cockpit.
 * All status, priority, severity, and context badges are defined here.
 *
 * Uses CSS custom properties from globals.css where possible.
 * Badge styles are intentionally subtle — tinted backgrounds with matching text.
 */

// ─── Slice/Feature Status ───────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  done: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200/60",
  blocked: "bg-red-50 text-red-700 border-red-200/60",
  planned: "bg-slate-50 text-slate-500 border-slate-200/60",
  ready: "bg-blue-50 text-blue-700 border-blue-200/60",
  deferred: "bg-slate-50 text-slate-400 border-slate-200/60",
  qa_pending: "bg-orange-50 text-orange-700 border-orange-200/60",
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
  high: "bg-red-50 text-red-600 border-red-200/60",
  medium: "bg-amber-50 text-amber-600 border-amber-200/60",
  low: "bg-slate-50 text-slate-400 border-slate-200/60",
};

const priorityLabels: Record<string, string> = {
  high: "Hoch",
  medium: "Mittel",
  low: "Niedrig",
};

// ─── Backlog Type ───────────────────────────────────────────────────────────

const backlogTypeStyles: Record<string, string> = {
  bug: "bg-red-50 text-red-600 border-red-200/60",
  fix: "bg-orange-50 text-orange-600 border-orange-200/60",
  feature: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
  improvement: "bg-cyan-50 text-cyan-600 border-cyan-200/60",
  idea: "bg-violet-50 text-violet-600 border-violet-200/60",
  later: "bg-slate-50 text-slate-400 border-slate-200/60",
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
  open: "bg-blue-50 text-blue-700 border-blue-200/60",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200/60",
  done: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  deferred: "bg-slate-50 text-slate-400 border-slate-200/60",
  blocked: "bg-red-50 text-red-700 border-red-200/60",
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
  blocker: "bg-red-50 text-red-700 border-red-200/60",
  high: "bg-orange-50 text-orange-700 border-orange-200/60",
  medium: "bg-amber-50 text-amber-600 border-amber-200/60",
  low: "bg-slate-50 text-slate-400 border-slate-200/60",
};

const severityLabels: Record<string, string> = {
  blocker: "Blocker",
  high: "Hoch",
  medium: "Mittel",
  low: "Niedrig",
};

// ─── Issue Status ───────────────────────────────────────────────────────────

const issueStatusStyles: Record<string, string> = {
  open: "bg-blue-50 text-blue-700 border-blue-200/60",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  wontfix: "bg-slate-50 text-slate-400 border-slate-200/60",
};

const issueStatusLabels: Record<string, string> = {
  open: "Offen",
  resolved: "Behoben",
  wontfix: "Kein Fix",
};

// ─── Roadmap Version Status ─────────────────────────────────────────────────

const roadmapStatusStyles: Record<string, string> = {
  released: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  active: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  planned: "bg-slate-50 text-slate-500 border-slate-200/60",
  deferred: "bg-amber-50 text-amber-600 border-amber-200/60",
};

const roadmapStatusLabels: Record<string, string> = {
  released: "Veröffentlicht",
  active: "Aktiv",
  planned: "Geplant",
  deferred: "Zurückgestellt",
};

// ─── Report Status ─────────────────────────────────────────────────────────

const reportStatusStyles: Record<string, string> = {
  completed: "bg-amber-50 text-amber-700 border-amber-200/60",
  reviewed: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  "needs-rework": "bg-red-50 text-red-700 border-red-200/60",
};

const reportStatusLabels: Record<string, string> = {
  completed: "Abgeschlossen",
  reviewed: "Geprüft",
  "needs-rework": "Nacharbeit",
};

// ─── Report Type ───────────────────────────────────────────────────────────

const reportTypeStyles: Record<string, string> = {
  completion: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
  review: "bg-violet-50 text-violet-600 border-violet-200/60",
};

const reportTypeLabels: Record<string, string> = {
  completion: "Completion",
  review: "Review",
};

// ─── Decision Status ────────────────────────────────────────────────────────

const decisionStatusStyles: Record<string, string> = {
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  superseded: "bg-slate-50 text-slate-400 border-slate-200/60",
  deprecated: "bg-red-50 text-red-600 border-red-200/60",
};

const decisionStatusLabels: Record<string, string> = {
  accepted: "Akzeptiert",
  superseded: "Ersetzt",
  deprecated: "Veraltet",
};

// ─── Shared badge class (applied to all badges) ────────────────────────────

export const badgeBase = "text-[11px] font-medium px-2 py-0.5 border";

// ─── Getters ────────────────────────────────────────────────────────────────

const fallback = "bg-slate-50 text-slate-500 border-slate-200/60";

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
