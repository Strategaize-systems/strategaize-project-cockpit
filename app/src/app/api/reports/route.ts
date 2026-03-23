import { NextRequest, NextResponse } from "next/server";
import { isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";
import {
  readReports,
  hasReportsDir,
  writeReport,
  generateReportId,
  validateReportCreate,
} from "@/lib/reports";
import type { Report, ReportCreateInput } from "@/lib/reports";

// ─── GET — Read all reports ────────────────────────────────────────────────

export interface ReportsResponse {
  status: "ok" | "not_accessible" | "dir_missing" | "empty";
  reports: Report[];
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<ReportsResponse>({
      status: "not_accessible",
      reports: [],
    });
  }

  if (!hasReportsDir(projectPath)) {
    return NextResponse.json<ReportsResponse>({
      status: "dir_missing",
      reports: [],
    });
  }

  const reports = readReports(projectPath);

  if (reports.length === 0) {
    return NextResponse.json<ReportsResponse>({
      status: "empty",
      reports: [],
    });
  }

  return NextResponse.json<ReportsResponse>({
    status: "ok",
    reports,
  });
}

// ─── POST — Create new report ──────────────────────────────────────────────

export interface ReportCreateResponse {
  status: "ok" | "validation_error" | "write_error";
  report?: Report;
  errors?: string[];
}

export async function POST(request: NextRequest) {
  let body: { projectPath?: string } & ReportCreateInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ReportCreateResponse>(
      { status: "validation_error", errors: ["Ungültiger Request-Body"] },
      { status: 400 }
    );
  }

  const validationError = validateProjectPath(body.projectPath ?? null);
  if (validationError) return validationError;
  const projectPath = body.projectPath!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<ReportCreateResponse>(
      { status: "validation_error", errors: ["Projekt nicht erreichbar"] },
      { status: 400 }
    );
  }

  const fieldErrors = validateReportCreate(body);
  if (fieldErrors.length > 0) {
    return NextResponse.json<ReportCreateResponse>(
      { status: "validation_error", errors: fieldErrors },
      { status: 400 }
    );
  }

  try {
    const existingReports = readReports(projectPath);
    const newId = generateReportId(existingReports);
    const today = new Date().toISOString().slice(0, 10);

    const newReport: Report = {
      id: newId,
      date: today,
      skill: body.skill.trim(),
      slice: body.slice?.trim() || null,
      feature: body.feature?.trim() || null,
      type: body.type as Report["type"],
      status: "completed",
      reviewOf: body.reviewOf?.trim() || null,
      result: null,
      title: body.title.trim(),
      body: body.body,
    };

    writeReport(projectPath, newReport);

    return NextResponse.json<ReportCreateResponse>({
      status: "ok",
      report: newReport,
    });
  } catch {
    return NextResponse.json<ReportCreateResponse>(
      { status: "write_error", errors: ["Report konnte nicht geschrieben werden"] },
      { status: 500 }
    );
  }
}
