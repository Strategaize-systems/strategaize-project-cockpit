import { NextRequest, NextResponse } from "next/server";
import { readProjectFile, isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface DecisionEntry {
  id: string;
  title: string;
  status: string;
  reason: string;
  consequence: string;
}

export interface ImprovementEntry {
  id: string;
  title: string;
  date: string;
  source: string;
  observation: string;
  suggestedImprovement: string;
  affectedArea: string;
  status: string;
}

type SectionStatus = "ok" | "file_missing" | "file_malformed" | "empty";

export interface DecisionsPageData {
  accessible: boolean;
  decisions: { status: SectionStatus; entries: DecisionEntry[] };
  improvements: { status: SectionStatus; entries: ImprovementEntry[] };
}

function parseDecisions(content: string): DecisionEntry[] | "empty" {
  const lines = content.split("\n").map((l) => l.replace(/\r$/, ""));
  const entries: DecisionEntry[] = [];
  let currentId = "";
  let currentTitle = "";
  let currentFields: Record<string, string> = {};
  let currentFieldKey = "";

  for (const line of lines) {
    // Match ## DEC-XXX — Title (## level, not ###)
    const headingMatch = line.match(/^##\s+(DEC-\d+)\s+.+?\s+(.{2,})$/);
    if (headingMatch) {
      if (currentId) {
        entries.push(buildDecision(currentId, currentTitle, currentFields));
      }
      currentId = headingMatch[1];
      currentTitle = headingMatch[2].trim();
      currentFields = {};
      currentFieldKey = "";
      continue;
    }

    // Stop parsing current entry if we hit another ## heading that isn't a DEC
    if (currentId && line.match(/^##\s/) && !line.match(/^##\s+DEC-/)) {
      entries.push(buildDecision(currentId, currentTitle, currentFields));
      currentId = "";
      currentTitle = "";
      currentFields = {};
      currentFieldKey = "";
      continue;
    }

    if (currentId) {
      const fieldMatch = line.match(/^-\s+(.+?):\s*(.*)$/);
      if (fieldMatch) {
        currentFieldKey = fieldMatch[1].trim().toLowerCase();
        const value = fieldMatch[2].trim();
        if (value) {
          currentFields[currentFieldKey] = value;
        }
      } else if (currentFieldKey && line.match(/^\s+\S/)) {
        // Continuation line (indented) — append to current field
        const existing = currentFields[currentFieldKey] ?? "";
        const continuation = line.trim();
        if (continuation) {
          currentFields[currentFieldKey] = existing
            ? `${existing} ${continuation}`
            : continuation;
        }
      }
    }
  }

  if (currentId) {
    entries.push(buildDecision(currentId, currentTitle, currentFields));
  }

  if (entries.length === 0) return "empty";
  return entries;
}

function buildDecision(
  id: string,
  title: string,
  fields: Record<string, string>
): DecisionEntry {
  return {
    id,
    title,
    status: fields["status"] ?? "",
    reason: fields["reason"] ?? "",
    consequence: fields["consequence"] ?? "",
  };
}

function parseImprovements(content: string): ImprovementEntry[] | "empty" {
  const lines = content.split("\n").map((l) => l.replace(/\r$/, ""));
  const entries: ImprovementEntry[] = [];
  let currentId = "";
  let currentTitle = "";
  let currentFields: Record<string, string> = {};

  for (const line of lines) {
    // Match ### IMP-XXX — Title (### level)
    const headingMatch = line.match(/^###\s+(IMP-\d+)\s+.+?\s+(.{2,})$/);
    if (headingMatch) {
      if (currentId) {
        entries.push(buildImprovement(currentId, currentTitle, currentFields));
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
    entries.push(buildImprovement(currentId, currentTitle, currentFields));
  }

  if (entries.length === 0) return "empty";
  return entries;
}

function buildImprovement(
  id: string,
  title: string,
  fields: Record<string, string>
): ImprovementEntry {
  return {
    id,
    title,
    date: fields["date"] ?? "",
    source: fields["source"] ?? "",
    observation: fields["observation"] ?? "",
    suggestedImprovement: fields["suggested improvement"] ?? "",
    affectedArea: fields["affected area"] ?? "",
    status: fields["status"] ?? "",
  };
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<DecisionsPageData>({
      accessible: false,
      decisions: { status: "file_missing", entries: [] },
      improvements: { status: "file_missing", entries: [] },
    });
  }

  // Parse decisions
  let decisionsResult: { status: SectionStatus; entries: DecisionEntry[] };
  const decContent = readProjectFile(projectPath, "docs/DECISIONS.md");
  if (decContent === null) {
    decisionsResult = { status: "file_missing", entries: [] };
  } else {
    try {
      const parsed = parseDecisions(decContent);
      if (parsed === "empty") {
        decisionsResult = { status: "empty", entries: [] };
      } else {
        decisionsResult = { status: "ok", entries: parsed };
      }
    } catch {
      decisionsResult = { status: "file_malformed", entries: [] };
    }
  }

  // Parse improvements
  let improvementsResult: { status: SectionStatus; entries: ImprovementEntry[] };
  const impContent = readProjectFile(projectPath, "docs/SKILL_IMPROVEMENTS.md");
  if (impContent === null) {
    improvementsResult = { status: "file_missing", entries: [] };
  } else {
    try {
      const parsed = parseImprovements(impContent);
      if (parsed === "empty") {
        improvementsResult = { status: "empty", entries: [] };
      } else {
        improvementsResult = { status: "ok", entries: parsed };
      }
    } catch {
      improvementsResult = { status: "file_malformed", entries: [] };
    }
  }

  return NextResponse.json<DecisionsPageData>({
    accessible: true,
    decisions: decisionsResult,
    improvements: improvementsResult,
  });
}
