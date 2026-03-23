import { NextRequest, NextResponse } from "next/server";
import { readProjectFile, isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface SliceRow {
  id: string;
  name: string;
  relatedFeature: string;
  status: string;
  priority: string;
  notes: string;
}

export interface SlicesData {
  status: "ok" | "not_accessible" | "index_missing" | "index_malformed" | "empty";
  slices: SliceRow[];
}

function parseMarkdownTable(content: string): SliceRow[] | null {
  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  const tableLines = lines.filter((l) => l.startsWith("|"));
  if (tableLines.length < 2) return null;

  const rows: SliceRow[] = [];
  for (const line of tableLines) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length);

    // Skip header rows, separator rows, and non-SLC rows
    const id = cells[0] ?? "";
    if (!id.startsWith("SLC-")) continue;

    rows.push({
      id,
      name: cells[1] ?? "",
      relatedFeature: cells[2] ?? "",
      status: cells[3] ?? "",
      priority: cells[4] ?? "",
      notes: cells[5] ?? "",
    });
  }

  return rows;
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<SlicesData>({ status: "not_accessible", slices: [] });
  }

  const content = readProjectFile(projectPath, "slices/INDEX.md");

  if (content === null) {
    return NextResponse.json<SlicesData>({ status: "index_missing", slices: [] });
  }

  const rows = parseMarkdownTable(content);

  if (rows === null) {
    return NextResponse.json<SlicesData>({ status: "index_malformed", slices: [] });
  }

  if (rows.length === 0) {
    return NextResponse.json<SlicesData>({ status: "empty", slices: [] });
  }

  return NextResponse.json<SlicesData>({ status: "ok", slices: rows });
}
