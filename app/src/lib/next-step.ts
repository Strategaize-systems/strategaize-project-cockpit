import { readProjectFile } from "@/lib/markdown";
import { readReports } from "@/lib/reports";
import type { Report } from "@/lib/reports";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface SliceInfo {
  id: string;
  name: string;
  relatedFeature: string;
  status: string;
  notes: string;
}

export interface NextStepRecommendation {
  skill: string;
  slice: string;
  feature: string;
  reason: string;
  prompt: string;
  confidence: "high" | "medium" | "low";
}

export interface PendingStep {
  skill: string;
  reason: string;
  version: string;
}

export interface NextStepResult {
  recommendation: NextStepRecommendation | null;
  reason: string;
  pendingSteps: PendingStep[];
}

// ─── Slice Parsing ─────────────────────────────────────────────────────────

/**
 * Parse all slice tables from slices/INDEX.md.
 * Handles multiple version tables (V1, V2, V3, etc.).
 */
export function parseSlicesFromIndex(content: string): SliceInfo[] {
  const lines = content.split("\n").map((l) => l.replace(/\r$/, ""));
  const slices: SliceInfo[] = [];

  const tableLines = lines.filter((l) => l.trim().startsWith("|"));

  let i = 0;
  while (i < tableLines.length) {
    // Find header row (contains "ID")
    if (tableLines[i].includes("ID") && tableLines[i].includes("Slice")) {
      // Skip header + separator
      i += 2;
      // Read data rows
      while (i < tableLines.length && tableLines[i].trim().startsWith("|")) {
        const cells = tableLines[i]
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length);

        if (cells.length >= 4 && cells[0].startsWith("SLC-")) {
          slices.push({
            id: cells[0],
            name: cells[1] ?? "",
            relatedFeature: cells[2] ?? "",
            status: cells[3] ?? "",
            notes: cells[5] ?? "",
          });
        }
        i++;
      }
    } else {
      i++;
    }
  }

  return slices;
}

// ─── Slice Type Detection ──────────────────────────────────────────────────

const DOCS_KEYWORDS = [
  "documentation", "dokumentation", "docs", "accuracy",
  "architecture", "architektur", "releases", "migrations",
  "known issues", "decisions", "readme", "playbook",
  "production-docs", "prod-docs",
];
const DEPLOY_KEYWORDS = [
  "deploy", "deployment", "pipeline", "ci/cd", "ci-cd",
  "docker", "compose", "coolify", "hetzner", "container",
  "staging", "production", "rollback", "infrastructure",
  "infra", "devops",
];
const BACKEND_KEYWORDS = [
  "api", "route", "backend", "library", "migration", "lib/",
  "endpoint", "server", "daten", "schema",
  "test", "vitest", "setup", "config", "fixture", "infrastruktur",
  "engine", "regelwerk", "logik",
  "security", "hardening", "rls", "policy", "policies", "grant", "role",
  "rate-limit", "rate limit", "auth", "permission", "access",
  "database", "db", "sql", "trigger", "function",
  "monitoring", "sentry", "logging", "error-tracking",
  "integrity", "append-only", "tenant",
  "email", "e-mail", "template", "cron", "job", "cleanup",
  "webhook", "integration", "import", "export",
  "queue", "worker", "storage", "upload", "download",
  "notification", "benachrichtigung", "smtp",
];
const FRONTEND_KEYWORDS = [
  "seite", "ansicht", "view", "ui", "dashboard", "sidebar",
  "page", "navigation", "komponente", "component",
  "form", "formular", "layout", "responsive", "style", "css",
  "modal", "dialog", "button", "table", "tabelle", "liste",
  "onboarding", "wizard", "flow", "screen",
];

/**
 * Detect whether a slice is frontend, backend, docs, or deploy work
 * based on name + notes keywords.
 *
 * All scores are computed first, then the highest wins.
 * Default is /frontend only as last resort.
 */
export function detectSliceType(slice: SliceInfo): "/frontend" | "/backend" | "/docs" | "/deploy" {
  const text = `${slice.name} ${slice.notes}`.toLowerCase();

  let docsScore = 0;
  let deployScore = 0;
  let backendScore = 0;
  let frontendScore = 0;

  for (const kw of DOCS_KEYWORDS) {
    if (text.includes(kw)) docsScore++;
  }
  for (const kw of DEPLOY_KEYWORDS) {
    if (text.includes(kw)) deployScore++;
  }
  for (const kw of BACKEND_KEYWORDS) {
    if (text.includes(kw)) backendScore++;
  }
  for (const kw of FRONTEND_KEYWORDS) {
    if (text.includes(kw)) frontendScore++;
  }

  // Highest score wins
  const max = Math.max(docsScore, deployScore, backendScore, frontendScore);
  if (max === 0) return "/frontend"; // No keywords matched — default
  if (docsScore === max) return "/docs";
  if (deployScore === max) return "/deploy";
  if (backendScore >= frontendScore) return "/backend";
  return "/frontend";
}

// ─── Report Analysis ───────────────────────────────────────────────────────

interface SliceReportStatus {
  hasCompletion: boolean;
  hasReview: boolean;
  hasQa: boolean;
  reviewResult: "reviewed" | "needs-rework" | null;
  lastCompletionSkill: string | null;
}

/**
 * Analyze reports for a specific slice.
 */
function analyzeSliceReports(
  reports: Report[],
  sliceId: string
): SliceReportStatus {
  const sliceReports = reports.filter((r) => r.slice === sliceId);

  const completionReports = sliceReports.filter((r) => r.type === "completion");
  const reviewReports = sliceReports.filter((r) => r.type === "review");
  const qaReports = sliceReports.filter((r) => r.skill === "qa");

  // Find the latest review result
  let reviewResult: "reviewed" | "needs-rework" | null = null;
  if (reviewReports.length > 0) {
    const latestReview = reviewReports[0]; // Already sorted by date desc
    if (latestReview.status === "reviewed" || latestReview.status === "needs-rework") {
      reviewResult = latestReview.status;
    }
  }

  // Find the skill of the last completion report
  let lastCompletionSkill: string | null = null;
  if (completionReports.length > 0) {
    lastCompletionSkill = completionReports[0].skill;
  }

  return {
    hasCompletion: completionReports.length > 0,
    hasReview: reviewReports.length > 0,
    hasQa: qaReports.length > 0,
    reviewResult,
    lastCompletionSkill,
  };
}

// ─── Version Helpers ──────────────────────────────────────────────────────

/**
 * Get the name of the active version from roadmap.json.
 */
function getActiveVersionName(projectPath: string): string | null {
  const roadmapContent = readProjectFile(projectPath, "planning/roadmap.json");
  if (!roadmapContent) return null;

  try {
    const roadmap = JSON.parse(roadmapContent);
    const active = roadmap.versions?.find(
      (v: { status: string; name: string }) => v.status === "active"
    );
    return active?.name ?? null;
  } catch {
    return null;
  }
}

// ─── Pre-Implementation Phase Detection ───────────────────────────────────

/**
 * Detect which pre-implementation step is next for a version without slices.
 * Checks: PRD → ARCHITECTURE → suggest /slice-planning.
 * Workflow: /requirements → /architecture → /slice-planning
 */
function detectPreImplementationStep(
  projectPath: string,
  versionName: string
): { skill: string; reason: string } {
  const vLower = versionName.toLowerCase();

  // Check if requirements exist (version section in PRD.md)
  const prdContent = readProjectFile(projectPath, "docs/PRD.md");
  const hasRequirements = prdContent
    ? prdContent.toLowerCase().includes(`## ${vLower} problem`) ||
      prdContent.toLowerCase().includes(`## ${vLower} ziel`) ||
      prdContent.toLowerCase().includes(`## ${vLower} scope`)
    : false;

  if (!hasRequirements) {
    return {
      skill: "/requirements",
      reason: `${versionName} hat noch keine Requirements in PRD.md. Starte mit /requirements.`,
    };
  }

  // Check if architecture exists (version section in ARCHITECTURE.md)
  const archContent = readProjectFile(projectPath, "docs/ARCHITECTURE.md");
  const hasArchitecture = archContent
    ? archContent.toLowerCase().includes(`## ${vLower} architecture`) ||
      archContent.toLowerCase().includes(`## ${vLower} arch`)
    : false;

  if (!hasArchitecture) {
    return {
      skill: "/architecture",
      reason: `${versionName} hat Requirements aber noch keine Architecture. Weiter mit /architecture.`,
    };
  }

  // Both exist but no slices → slice-planning
  return {
    skill: "/slice-planning",
    reason: `${versionName} hat Requirements und Architecture aber noch keine Slices. Weiter mit /slice-planning.`,
  };
}

// ─── Prompt Generation ─────────────────────────────────────────────────────

/**
 * Generate a short, copy-ready prompt.
 * Keeps it minimal — the skill reads slice files and architecture itself.
 */
function generatePrompt(
  skill: string,
  slice: SliceInfo,
  context?: string
): string {
  let prompt = `${skill} ${slice.id}`;

  if (context) {
    prompt += `\n${context}`;
  }

  return prompt;
}

// ─── Main Engine ───────────────────────────────────────────────────────────

/**
 * Determine the next recommended step for a project.
 *
 * 4-step process:
 * 1. Find the next non-done slice from INDEX.md
 * 2. Check report history for that slice
 * 3. Derive the appropriate skill
 * 4. Generate a ready-to-use prompt
 */
export function determineNextStep(projectPath: string): NextStepResult {
  // Step 1: Read and parse slices
  const indexContent = readProjectFile(projectPath, "slices/INDEX.md");
  if (!indexContent) {
    return {
      recommendation: null,
      reason: "slices/INDEX.md nicht gefunden oder nicht lesbar.",
      pendingSteps: [],
    };
  }

  const allSlices = parseSlicesFromIndex(indexContent);
  if (allSlices.length === 0) {
    return {
      recommendation: null,
      reason: "Keine Slices in slices/INDEX.md gefunden.",
      pendingSteps: [],
    };
  }

  // Find first non-done slice
  const activeSlice = allSlices.find(
    (s) => s.status.toLowerCase() !== "done"
  );

  if (!activeSlice) {
    // All existing slices done — check if active version has slices or is still in planning
    const activeVersion = getActiveVersionName(projectPath);
    if (activeVersion) {
      const hasVersionSlices = indexContent.toLowerCase().includes(
        `## ${activeVersion.toLowerCase()} slice plan`
      );
      if (!hasVersionSlices) {
        // Active version exists but has no slices yet → detect pre-implementation phase
        const pendingSteps = detectPendingOlderSteps(projectPath, allSlices);
        const preImplStep = detectPreImplementationStep(projectPath, activeVersion);
        return {
          recommendation: {
            skill: preImplStep.skill,
            slice: "—",
            feature: "—",
            reason: preImplStep.reason,
            prompt: `${preImplStep.skill} für ${activeVersion}`,
            confidence: "high",
          },
          reason: `${activeVersion} ist in der Planungsphase.`,
          pendingSteps,
        };
      }
    }

    // All slices done for current version — check for post-implementation workflow steps
    return determinePostImplementationStep(projectPath);
  }

  // Step 2: Check report history
  const reports = readReports(projectPath);
  const reportStatus = analyzeSliceReports(reports, activeSlice.id);

  // Step 3: Derive skill
  let skill: string;
  let reason: string;
  let confidence: "high" | "medium" | "low" = "high";
  let promptContext: string | undefined;

  const sliceStatus = activeSlice.status.toLowerCase();

  if (!reportStatus.hasCompletion) {
    // No completion report yet → implement
    skill = detectSliceType(activeSlice);
    reason = `${activeSlice.id} ist der nächste offene Slice. Kein Completion Report vorhanden.`;
  } else if (!reportStatus.hasReview) {
    // Has completion but no review → review
    skill = "/review";
    reason = `${activeSlice.id} hat einen Completion Report, aber noch kein Review.`;
  } else if (reportStatus.reviewResult === "needs-rework") {
    // Review says rework needed → redo implementation
    skill = reportStatus.lastCompletionSkill
      ? `/${reportStatus.lastCompletionSkill}`
      : detectSliceType(activeSlice);
    reason = `${activeSlice.id} Review: Nacharbeit nötig. Letzter Skill: ${reportStatus.lastCompletionSkill ?? "unbekannt"}.`;
    promptContext = "Hinweis: Dies ist eine Nacharbeit basierend auf Review-Feedback.";
  } else if (reportStatus.reviewResult === "reviewed" && !reportStatus.hasQa) {
    // Reviewed but no QA → qa
    skill = "/qa";
    reason = `${activeSlice.id} ist reviewed, QA steht noch aus.`;
  } else if (reportStatus.hasQa) {
    // QA done → slice should be marked as done
    skill = "/docs";
    reason = `${activeSlice.id} hat QA bestanden. Slice-Status auf 'done' setzen und Dokumentation aktualisieren.`;
    confidence = "medium";
  } else {
    // Fallback
    skill = detectSliceType(activeSlice);
    reason = `${activeSlice.id} Status unklar. Empfehle Implementierung.`;
    confidence = "low";
  }

  // Adjust confidence based on slice status alignment
  if (
    (sliceStatus === "planned" || sliceStatus === "ready") &&
    !reportStatus.hasCompletion
  ) {
    confidence = "high";
  } else if (sliceStatus === "in_progress") {
    confidence = reportStatus.hasCompletion ? "high" : "medium";
  } else if (sliceStatus === "qa_pending" && reportStatus.hasQa) {
    confidence = "medium";
  }

  // Step 4: Generate prompt
  const prompt = generatePrompt(skill, activeSlice, promptContext);

  // Step 5: Check for pending older steps (e.g., Deploy for a previous version)
  const pendingSteps = detectPendingOlderSteps(projectPath, allSlices);

  return {
    recommendation: {
      skill,
      slice: activeSlice.id,
      feature: activeSlice.relatedFeature,
      reason,
      prompt,
      confidence,
    },
    reason,
    pendingSteps,
  };
}

// ─── Pending Older Steps Detection ────────────────────────────────────────

/**
 * Detect pending workflow steps from older versions (e.g., Deploy for V3
 * while V3.1 is already in progress).
 *
 * Checks released versions in roadmap that still have missing post-impl reports.
 */
function detectPendingOlderSteps(
  projectPath: string,
  allSlices: SliceInfo[]
): PendingStep[] {
  const reports = readReports(projectPath);
  const roadmapContent = readProjectFile(projectPath, "planning/roadmap.json");
  if (!roadmapContent) return [];

  let versions: { name: string; status: string }[] = [];
  try {
    const roadmap = JSON.parse(roadmapContent);
    versions = roadmap.versions ?? [];
  } catch {
    return [];
  }

  const pending: PendingStep[] = [];

  // Check released versions that might still miss deploy
  for (const v of versions) {
    if (v.status !== "released") continue;

    const hasDeploy = reports.some(
      (r) => r.skill === "deploy" && r.body?.includes(v.name)
    );
    if (!hasDeploy) {
      pending.push({
        skill: "/deploy",
        reason: `${v.name} ist released aber noch nicht deployed.`,
        version: v.name,
      });
    }
  }

  return pending;
}

// ─── Post-Implementation Workflow ──────────────────────────────────────────

/**
 * When all slices are done, determine the next workflow step:
 * /qa (gesamt) → /final-check → /go-live → /deploy → "Alles abgeschlossen"
 */
function determinePostImplementationStep(
  projectPath: string
): NextStepResult {
  const reports = readReports(projectPath);

  // Find the ID threshold: post-impl reports must be NEWER than the latest
  // slice completion report to count for the current version.
  // This prevents V3.0 reports from being counted for V3.1.
  const latestSliceReport = reports.find(
    (r) => r.type === "completion" && r.slice && r.slice !== "null" && r.slice !== "—"
  );
  const thresholdId = latestSliceReport
    ? parseInt(latestSliceReport.id.replace("RPT-", ""), 10)
    : 0;

  function isCurrentVersion(r: Report): boolean {
    const rptNum = parseInt(r.id.replace("RPT-", ""), 10);
    return rptNum > thresholdId;
  }

  // Check what post-implementation reports exist FOR THE CURRENT VERSION
  const hasGesamtQa = reports.some((r) => r.skill === "qa" && (!r.slice || r.slice === "null" || r.slice === "—") && isCurrentVersion(r));
  const hasFinalCheck = reports.some((r) => r.skill === "final-check" && isCurrentVersion(r));
  const hasGoLive = reports.some((r) => r.skill === "go-live" && isCurrentVersion(r));
  const hasDeploy = reports.some((r) => r.skill === "deploy" && isCurrentVersion(r));

  // Find the active version from roadmap
  const roadmapContent = readProjectFile(projectPath, "planning/roadmap.json");
  let activeVersion = "";
  if (roadmapContent) {
    try {
      const roadmap = JSON.parse(roadmapContent);
      const active = roadmap.versions?.find(
        (v: { status: string; name: string }) => v.status === "active"
      );
      if (active) activeVersion = active.name;
    } catch {
      // ignore parse errors
    }
  }

  const versionLabel = activeVersion || "aktuelle Version";

  // Detect pending steps from older versions
  const pendingSteps = detectPendingOlderSteps(projectPath, []);

  if (!hasGesamtQa) {
    return {
      recommendation: {
        skill: "/qa",
        slice: "—",
        feature: "—",
        reason: `Alle Slices sind implementiert. Gesamt-QA über ${versionLabel} vor dem Final-Check durchführen.`,
        prompt: `/qa ${versionLabel} gesamt`,
        confidence: "high",
      },
      reason: `Alle Slices done. Nächster Workflow-Schritt: Gesamt-QA für ${versionLabel}.`,
      pendingSteps,
    };
  }

  if (!hasFinalCheck) {
    return {
      recommendation: {
        skill: "/final-check",
        slice: "—",
        feature: "—",
        reason: `Alle Slices sind implementiert. ${versionLabel} braucht ein Pre-Release-Audit.`,
        prompt: `/final-check`,
        confidence: "high",
      },
      reason: `Alle Slices done. Nächster Workflow-Schritt: /final-check für ${versionLabel}.`,
      pendingSteps,
    };
  }

  if (!hasGoLive) {
    return {
      recommendation: {
        skill: "/go-live",
        slice: "—",
        feature: "—",
        reason: `Final-Check abgeschlossen. ${versionLabel} Release-Bereitschaft prüfen.`,
        prompt: `/go-live`,
        confidence: "high",
      },
      reason: `Final-Check done. Nächster Workflow-Schritt: /go-live für ${versionLabel}.`,
      pendingSteps,
    };
  }

  if (!hasDeploy) {
    return {
      recommendation: {
        skill: "/deploy",
        slice: "—",
        feature: "—",
        reason: `Go-Live bestätigt. ${versionLabel} kann deployed werden.`,
        prompt: `/deploy`,
        confidence: "medium",
      },
      reason: `Go-Live done. Nächster Workflow-Schritt: /deploy für ${versionLabel}.`,
      pendingSteps,
    };
  }

  // Everything done
  return {
    recommendation: null,
    reason: `${versionLabel} ist vollständig implementiert, geprüft und deployed. Keine offenen Schritte.`,
    pendingSteps: [],
  };
}
