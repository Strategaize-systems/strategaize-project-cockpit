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
 */
export function calculateProgress(
  versions: RoadmapVersion[],
  backlogItems: BacklogItem[]
): RoadmapVersionWithProgress[] {
  return versions.map((version) => {
    const assigned = backlogItems.filter(
      (item) => item.version !== null && item.version.toLowerCase() === version.name.toLowerCase()
    );
    const total = assigned.length;
    const done = assigned.filter((item) => item.status === "done").length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

    return {
      ...version,
      progress: { total, done, percentage },
    };
  });
}
