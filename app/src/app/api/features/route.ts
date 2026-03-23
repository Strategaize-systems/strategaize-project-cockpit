import { NextRequest, NextResponse } from "next/server";
import { readProjectFile, isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface FeatureRow {
  id: string;
  name: string;
  status: string;
  priority: string;
  notes: string;
}

export interface FeaturesData {
  status: "ok" | "not_accessible" | "index_missing" | "index_malformed" | "empty";
  features: FeatureRow[];
}

function parseMarkdownTable(content: string): FeatureRow[] | null {
  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  // Find lines that look like table rows (start with |)
  const tableLines = lines.filter((l) => l.startsWith("|"));
  if (tableLines.length < 2) return null; // need at least header + separator

  const rows: FeatureRow[] = [];
  for (const line of tableLines) {
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length);

    // Skip header rows, separator rows, and non-FEAT rows
    const id = cells[0] ?? "";
    if (!id.startsWith("FEAT-")) continue;

    rows.push({
      id,
      name: cells[1] ?? "",
      status: cells[2] ?? "",
      priority: cells[3] ?? "",
      notes: cells[4] ?? "",
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
    return NextResponse.json<FeaturesData>({
      status: "not_accessible",
      features: [],
    });
  }

  const content = readProjectFile(projectPath, "features/INDEX.md");

  if (content === null) {
    return NextResponse.json<FeaturesData>({
      status: "index_missing",
      features: [],
    });
  }

  const rows = parseMarkdownTable(content);

  if (rows === null) {
    return NextResponse.json<FeaturesData>({
      status: "index_malformed",
      features: [],
    });
  }

  if (rows.length === 0) {
    return NextResponse.json<FeaturesData>({
      status: "empty",
      features: [],
    });
  }

  return NextResponse.json<FeaturesData>({
    status: "ok",
    features: rows,
  });
}
