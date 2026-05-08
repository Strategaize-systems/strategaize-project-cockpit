import fs from "fs";
import path from "path";
import type { BacklogItem } from "@/lib/backlog";

export interface RoadmapVersion {
  id: string;
  name: string;
  status: "released" | "active" | "planned" | "deferred";
  summary: string;
  order: number;
}

export interface VersionProgress {
  total: number;
  done: number;
  percentage: number;
}

export interface RoadmapVersionWithProgress extends RoadmapVersion {
  progress: VersionProgress;
}

interface RoadmapData {
  versions: RoadmapVersion[];
}

const PLANNING_DIR = "planning";
const ROADMAP_FILE = "roadmap.json";

/**
 * Read all roadmap versions from a project's planning/roadmap.json.
 * Returns empty array if file is missing. Returns null if file is malformed.
 */
export function readRoadmap(
  projectPath: string
): RoadmapVersion[] | null {
  try {
    const filePath = path.join(projectPath, PLANNING_DIR, ROADMAP_FILE);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: RoadmapData = JSON.parse(raw);
    if (!parsed.versions || !Array.isArray(parsed.versions)) {
      return null;
    }
    return parsed.versions;
  } catch {
    return null;
  }
}

/**
 * Check if a project has a planning/roadmap.json file.
 */
export function hasRoadmapFile(projectPath: string): boolean {
  const filePath = path.join(projectPath, PLANNING_DIR, ROADMAP_FILE);
  return fs.existsSync(filePath);
}

/**
 * Calculate progress for each version based on backlog items.
 * Progress = done items / total items assigned to that version.
 *
 * Items with status `deferred` or `superseded` are excluded from the total —
 * they are decisions to NOT implement (e.g. via a DEC), not pending work, and
 * should not pull the progress percentage down. A version with 6 done + 1
 * superseded therefore shows 6/6 = 100%, not 6/7 = 86%.
 *
 * `done` and `deployed` both count as completed (deployed > done after a
 * version is released).
 */
const COUNTED_DONE_STATUSES = new Set(["done", "deployed"]);
const EXCLUDED_FROM_TOTAL_STATUSES = new Set(["deferred", "superseded"]);

export function calculateProgress(
  versions: RoadmapVersion[],
  backlogItems: BacklogItem[]
): RoadmapVersionWithProgress[] {
  return versions.map((version) => {
    const assigned = backlogItems.filter(
      (item) => item.version !== null && item.version.toLowerCase() === version.name.toLowerCase()
    );
    const counted = assigned.filter(
      (item) => !EXCLUDED_FROM_TOTAL_STATUSES.has(item.status)
    );
    const total = counted.length;
    const done = counted.filter((item) => COUNTED_DONE_STATUSES.has(item.status)).length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

    return {
      ...version,
      progress: { total, done, percentage },
    };
  });
}
