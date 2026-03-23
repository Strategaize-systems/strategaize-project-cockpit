import fs from "fs";
import path from "path";

export interface BacklogItem {
  id: string;
  title: string;
  type: "bug" | "fix" | "feature" | "improvement" | "idea" | "later";
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "done" | "deferred" | "blocked";
  version: string | null;
  description: string;
  createdAt: string;
}

export interface BacklogData {
  items: BacklogItem[];
}

const PLANNING_DIR = "planning";
const BACKLOG_FILE = "backlog.json";

/**
 * Read all backlog items from a project's planning/backlog.json.
 * Returns empty array if file is missing. Returns null if file is malformed.
 */
export function readBacklogItems(
  projectPath: string
): BacklogItem[] | null {
  try {
    const filePath = path.join(projectPath, PLANNING_DIR, BACKLOG_FILE);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: BacklogData = JSON.parse(raw);
    if (!parsed.items || !Array.isArray(parsed.items)) {
      return null;
    }
    return parsed.items;
  } catch {
    return null;
  }
}

/**
 * Check if a project has a planning/backlog.json file.
 */
export function hasBacklogFile(projectPath: string): boolean {
  const filePath = path.join(projectPath, PLANNING_DIR, BACKLOG_FILE);
  return fs.existsSync(filePath);
}

// ─── Write functions (SLC-013) ──────────────────────────────────────────────

const VALID_TYPES = ["bug", "fix", "feature", "improvement", "idea", "later"] as const;
const VALID_PRIORITIES = ["high", "medium", "low"] as const;

export type BacklogCreateInput = {
  title: string;
  type: string;
  priority: string;
  version?: string | null;
  description?: string;
};

/**
 * Validate fields for creating a new backlog item.
 * Returns array of error messages, or empty array if valid.
 */
export function validateBacklogCreate(input: BacklogCreateInput): string[] {
  const errors: string[] = [];
  if (!input.title || input.title.trim().length === 0) {
    errors.push("Titel ist erforderlich");
  }
  if (!input.type || !(VALID_TYPES as readonly string[]).includes(input.type)) {
    errors.push("Ungültiger Typ");
  }
  if (!input.priority || !(VALID_PRIORITIES as readonly string[]).includes(input.priority)) {
    errors.push("Ungültige Priorität");
  }
  return errors;
}

/**
 * Generate the next sequential backlog ID (BL-001, BL-002, ...).
 */
export function generateBacklogId(existingItems: BacklogItem[]): string {
  let max = 0;
  for (const item of existingItems) {
    const match = item.id.match(/^BL-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > max) max = num;
    }
  }
  return `BL-${String(max + 1).padStart(3, "0")}`;
}

// ─── Update functions (SLC-014) ─────────────────────────────────────────────

const VALID_STATUSES = ["open", "in_progress", "done", "deferred", "blocked"] as const;

export type BacklogUpdateChanges = {
  status?: string;
  priority?: string;
  version?: string | null;
};

/**
 * Validate fields for updating an existing backlog item.
 * Only validates fields that are present in changes.
 * Returns array of error messages, or empty array if valid.
 */
export function validateBacklogUpdate(changes: BacklogUpdateChanges): string[] {
  const errors: string[] = [];
  if (changes.status !== undefined && !(VALID_STATUSES as readonly string[]).includes(changes.status)) {
    errors.push("Ungültiger Status");
  }
  if (changes.priority !== undefined && !(VALID_PRIORITIES as readonly string[]).includes(changes.priority)) {
    errors.push("Ungültige Priorität");
  }
  return errors;
}

/**
 * Write the full backlog items array to planning/backlog.json.
 * Creates the planning/ directory if it doesn't exist.
 */
export function writeBacklogItems(
  projectPath: string,
  items: BacklogItem[]
): void {
  const dirPath = path.join(projectPath, PLANNING_DIR);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, BACKLOG_FILE);
  const data: BacklogData = { items };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
