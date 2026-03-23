import { NextRequest, NextResponse } from "next/server";
import { readProjectFile, isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface IssueEntry {
  id: string;
  title: string;
  status: string;
  severity: string;
  area: string;
  summary: string;
  impact?: string;
  workaround?: string;
  nextAction?: string;
}

export interface IssuesData {
  status: "ok" | "not_accessible" | "file_missing" | "file_malformed" | "empty";
  issues: IssueEntry[];
}

function parseIssues(content: string): IssueEntry[] | "empty" | null {
  const lines = content.split("\n").map((l) => l.replace(/\r$/, ""));
  const issues: IssueEntry[] = [];
  let current: Partial<IssueEntry> | null = null;

  for (const line of lines) {
    // Match ### ISSUE-XXX — Title
    const headingMatch = line.match(/^###\s+(ISSUE-\d+)\s+.+?\s+(.{2,})$/);
    if (headingMatch) {
      if (current && current.id) {
        issues.push(buildIssue(current));
      }
      current = { id: headingMatch[1], title: headingMatch[2].trim() };
      continue;
    }

    // Parse "- FieldName: value" lines within an issue
    if (current) {
      const fieldMatch = line.match(/^-\s+(.+?):\s*(.*)$/);
      if (fieldMatch) {
        const key = fieldMatch[1].trim().toLowerCase();
        const value = fieldMatch[2].trim();
        if (value) {
          switch (key) {
            case "status": current.status = value; break;
            case "severity": current.severity = value; break;
            case "area": current.area = value; break;
            case "summary": current.summary = value; break;
            case "impact": current.impact = value; break;
            case "workaround": current.workaround = value; break;
            case "next action": current.nextAction = value; break;
          }
        }
      }
    }
  }

  // Push last issue
  if (current && current.id) {
    issues.push(buildIssue(current));
  }

  // Check if file has no real issues (e.g., "- none yet")
  if (issues.length === 0) {
    // Check if the file is just empty/placeholder vs malformed
    const hasIssueHeadings = lines.some((l) => l.match(/^###\s+ISSUE-/));
    if (!hasIssueHeadings) return "empty";
  }

  return issues;
}

function buildIssue(partial: Partial<IssueEntry>): IssueEntry {
  return {
    id: partial.id ?? "",
    title: partial.title ?? "",
    status: partial.status ?? "",
    severity: partial.severity ?? "",
    area: partial.area ?? "",
    summary: partial.summary ?? "",
    impact: partial.impact,
    workaround: partial.workaround,
    nextAction: partial.nextAction,
  };
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<IssuesData>({ status: "not_accessible", issues: [] });
  }

  const content = readProjectFile(projectPath, "docs/KNOWN_ISSUES.md");

  if (content === null) {
    return NextResponse.json<IssuesData>({ status: "file_missing", issues: [] });
  }

  const result = parseIssues(content);

  if (result === null) {
    return NextResponse.json<IssuesData>({ status: "file_malformed", issues: [] });
  }

  if (result === "empty") {
    return NextResponse.json<IssuesData>({ status: "empty", issues: [] });
  }

  return NextResponse.json<IssuesData>({ status: "ok", issues: result });
}
