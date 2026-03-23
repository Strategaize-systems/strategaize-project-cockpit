import fs from "fs";
import path from "path";

// ─── Types ─────────────────────────────────────────────────────────────────

export type ReportType = "completion" | "review";
export type ReportStatus = "completed" | "reviewed" | "needs-rework";

export interface Report {
  id: string;
  date: string;
  skill: string;
  slice: string | null;
  feature: string | null;
  type: ReportType;
  status: ReportStatus;
  reviewOf: string | null;
  result: string | null;
  title: string;
  body: string;
}

export interface ReportCreateInput {
  skill: string;
  slice?: string | null;
  feature?: string | null;
  type: string;
  title: string;
  body: string;
  reviewOf?: string | null;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const REPORTS_DIR = "reports";
const REPORT_PREFIX = "RPT-";
const VALID_TYPES: ReportType[] = ["completion", "review"];
const VALID_STATUSES: ReportStatus[] = ["completed", "reviewed", "needs-rework"];

// ─── Frontmatter Parsing ───────────────────────────────────────────────────

/**
 * Parse YAML-style frontmatter from a markdown string.
 * Expects content between first `---` and second `---`.
 * Returns key-value pairs and the body after frontmatter.
 */
export function parseFrontmatter(content: string): {
  meta: Record<string, string>;
  body: string;
} | null {
  const trimmed = content.trimStart();
  if (!trimmed.startsWith("---")) {
    return null;
  }

  const secondDash = trimmed.indexOf("---", 3);
  if (secondDash === -1) {
    return null;
  }

  const frontmatterBlock = trimmed.slice(3, secondDash).trim();
  const body = trimmed.slice(secondDash + 3).trim();

  const meta: Record<string, string> = {};
  for (const line of frontmatterBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) {
      meta[key] = value;
    }
  }

  return { meta, body };
}

/**
 * Convert parsed frontmatter meta + body into a Report object.
 * Returns null if required fields are missing.
 */
function metaToReport(
  meta: Record<string, string>,
  body: string
): Report | null {
  const id = meta.id;
  const date = meta.date;
  const skill = meta.skill;
  const title = meta.title;
  const type = meta.type as ReportType;

  if (!id || !date || !skill || !title || !type) {
    return null;
  }

  return {
    id,
    date,
    skill,
    slice: meta.slice && meta.slice !== "null" ? meta.slice : null,
    feature: meta.feature && meta.feature !== "null" ? meta.feature : null,
    type: VALID_TYPES.includes(type) ? type : "completion",
    status: VALID_STATUSES.includes(meta.status as ReportStatus)
      ? (meta.status as ReportStatus)
      : "completed",
    reviewOf:
      meta.reviewOf && meta.reviewOf !== "null" ? meta.reviewOf : null,
    result: meta.result && meta.result !== "null" ? meta.result : null,
    title,
    body,
  };
}

// ─── Frontmatter Serialization ─────────────────────────────────────────────

/**
 * Serialize a Report to a markdown string with YAML frontmatter.
 */
export function reportToMarkdown(report: Report): string {
  const lines = [
    "---",
    `id: ${report.id}`,
    `date: "${report.date}"`,
    `skill: ${report.skill}`,
    `slice: ${report.slice ?? "null"}`,
    `feature: ${report.feature ?? "null"}`,
    `type: ${report.type}`,
    `status: ${report.status}`,
    `reviewOf: ${report.reviewOf ?? "null"}`,
    `result: ${report.result ? `"${report.result}"` : "null"}`,
    `title: "${report.title}"`,
    "---",
    "",
    report.body,
  ];
  return lines.join("\n");
}

// ─── Read Functions ────────────────────────────────────────────────────────

/**
 * Check if a project has a reports/ directory.
 */
export function hasReportsDir(projectPath: string): boolean {
  const dirPath = path.join(projectPath, REPORTS_DIR);
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * Read all reports from a project's reports/ directory.
 * Returns reports sorted by date (newest first).
 * Skips files that can't be parsed (graceful).
 */
export function readReports(projectPath: string): Report[] {
  const dirPath = path.join(projectPath, REPORTS_DIR);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter(
    (f) => f.startsWith(REPORT_PREFIX) && f.endsWith(".md")
  );

  const reports: Report[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const parsed = parseFrontmatter(content);
      if (!parsed) continue;

      const report = metaToReport(parsed.meta, parsed.body);
      if (report) {
        reports.push(report);
      }
    } catch {
      // Skip unreadable files gracefully
      continue;
    }
  }

  // Sort by date descending, then by ID descending
  reports.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.id.localeCompare(a.id);
  });

  return reports;
}

// ─── ID Generation ─────────────────────────────────────────────────────────

/**
 * Generate the next sequential report ID (RPT-001, RPT-002, ...).
 */
export function generateReportId(existingReports: Report[]): string {
  let max = 0;
  for (const report of existingReports) {
    const match = report.id.match(/^RPT-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > max) max = num;
    }
  }
  return `RPT-${String(max + 1).padStart(3, "0")}`;
}

// ─── Write Functions ───────────────────────────────────────────────────────

/**
 * Write a report to the project's reports/ directory.
 * Creates the directory if it doesn't exist.
 */
export function writeReport(projectPath: string, report: Report): void {
  const dirPath = path.join(projectPath, REPORTS_DIR);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, `${report.id}.md`);
  fs.writeFileSync(filePath, reportToMarkdown(report), "utf-8");
}

// ─── Validation ────────────────────────────────────────────────────────────

/**
 * Validate fields for creating a new report.
 * Returns array of error messages, or empty array if valid.
 */
export function validateReportCreate(input: ReportCreateInput): string[] {
  const errors: string[] = [];

  if (!input.skill || input.skill.trim().length === 0) {
    errors.push("Skill ist erforderlich");
  }
  if (!input.type || !VALID_TYPES.includes(input.type as ReportType)) {
    errors.push("Ungültiger Typ (erlaubt: completion, review)");
  }
  if (!input.title || input.title.trim().length === 0) {
    errors.push("Titel ist erforderlich");
  }
  if (!input.body || input.body.trim().length === 0) {
    errors.push("Report-Inhalt ist erforderlich");
  }
  if (input.type === "review" && !input.reviewOf) {
    errors.push("reviewOf ist bei type=review erforderlich");
  }

  return errors;
}
