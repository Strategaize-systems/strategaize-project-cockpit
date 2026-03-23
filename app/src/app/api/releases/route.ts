import { NextRequest, NextResponse } from "next/server";
import { readProjectFile, isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface ReleaseEntry {
  id: string;
  title: string;
  date: string;
  scope: string;
  summary: string;
  risks?: string;
  rollbackNotes?: string;
}

export interface MigrationEntry {
  id: string;
  title: string;
  date: string;
  scope: string;
  reason?: string;
  affectedAreas: string;
  risk?: string;
  rollbackNotes?: string;
}

type SectionStatus = "ok" | "file_missing" | "file_malformed" | "empty";

export interface ReleasesData {
  accessible: boolean;
  releases: { status: SectionStatus; entries: ReleaseEntry[] };
  migrations: { status: SectionStatus; entries: MigrationEntry[] };
}

function parseEntries<T>(
  content: string,
  headingPattern: RegExp,
  mapFields: (id: string, title: string, fields: Record<string, string>) => T
): T[] | "empty" {
  const lines = content.split("\n").map((l) => l.replace(/\r$/, ""));
  const entries: T[] = [];
  let currentId = "";
  let currentTitle = "";
  let currentFields: Record<string, string> = {};

  for (const line of lines) {
    const headingMatch = line.match(headingPattern);
    if (headingMatch) {
      if (currentId) {
        entries.push(mapFields(currentId, currentTitle, currentFields));
      }
      currentId = headingMatch[1];
      currentTitle = headingMatch[2].trim();
      currentFields = {};
      continue;
    }

    if (currentId) {
      const fieldMatch = line.match(/^-\s+(.+?):\s*(.+)$/);
      if (fieldMatch) {
        currentFields[fieldMatch[1].trim().toLowerCase()] = fieldMatch[2].trim();
      }
    }
  }

  if (currentId) {
    entries.push(mapFields(currentId, currentTitle, currentFields));
  }

  if (entries.length === 0) return "empty";
  return entries;
}

function parseSection<T>(
  projectPath: string,
  filePath: string,
  headingPattern: RegExp,
  mapFields: (id: string, title: string, fields: Record<string, string>) => T
): { status: SectionStatus; entries: T[] } {
  const content = readProjectFile(projectPath, filePath);

  if (content === null) {
    return { status: "file_missing", entries: [] };
  }

  try {
    const result = parseEntries(content, headingPattern, mapFields);
    if (result === "empty") {
      return { status: "empty", entries: [] };
    }
    return { status: "ok", entries: result };
  } catch {
    return { status: "file_malformed", entries: [] };
  }
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<ReleasesData>({
      accessible: false,
      releases: { status: "file_missing", entries: [] },
      migrations: { status: "file_missing", entries: [] },
    });
  }

  const releases = parseSection<ReleaseEntry>(
    projectPath,
    "docs/RELEASES.md",
    /^###\s+(REL-\d+)\s+.+?\s+(.{2,})$/,
    (id, title, f) => ({
      id,
      title,
      date: f["date"] ?? "",
      scope: f["scope"] ?? "",
      summary: f["summary"] ?? "",
      risks: f["risks"],
      rollbackNotes: f["rollback notes"],
    })
  );

  const migrations = parseSection<MigrationEntry>(
    projectPath,
    "docs/MIGRATIONS.md",
    /^###\s+(MIG-\d+)\s+.+?\s+(.{2,})$/,
    (id, title, f) => ({
      id,
      title,
      date: f["date"] ?? "",
      scope: f["scope"] ?? "",
      reason: f["reason"],
      affectedAreas: f["affected areas"] ?? "",
      risk: f["risk"],
      rollbackNotes: f["rollback notes"],
    })
  );

  return NextResponse.json<ReleasesData>({
    accessible: true,
    releases,
    migrations,
  });
}
