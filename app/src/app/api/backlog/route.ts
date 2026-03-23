import { NextRequest, NextResponse } from "next/server";
import { isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";
import {
  readBacklogItems,
  hasBacklogFile,
  writeBacklogItems,
  generateBacklogId,
  validateBacklogCreate,
} from "@/lib/backlog";
import type { BacklogItem, BacklogCreateInput } from "@/lib/backlog";

export interface BacklogResponse {
  status: "ok" | "not_accessible" | "file_missing" | "file_malformed" | "empty";
  items: BacklogItem[];
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<BacklogResponse>({
      status: "not_accessible",
      items: [],
    });
  }

  if (!hasBacklogFile(projectPath)) {
    return NextResponse.json<BacklogResponse>({
      status: "file_missing",
      items: [],
    });
  }

  const items = readBacklogItems(projectPath);

  if (items === null) {
    return NextResponse.json<BacklogResponse>({
      status: "file_malformed",
      items: [],
    });
  }

  if (items.length === 0) {
    return NextResponse.json<BacklogResponse>({
      status: "empty",
      items: [],
    });
  }

  return NextResponse.json<BacklogResponse>({
    status: "ok",
    items,
  });
}

// ─── POST — Create new backlog item ─────────────────────────────────────────

export interface BacklogCreateResponse {
  status: "ok" | "validation_error" | "write_error";
  item?: BacklogItem;
  errors?: string[];
}

export async function POST(request: NextRequest) {
  let body: { projectPath?: string } & BacklogCreateInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<BacklogCreateResponse>(
      { status: "validation_error", errors: ["Ungültiger Request-Body"] },
      { status: 400 }
    );
  }

  const validationError = validateProjectPath(body.projectPath ?? null);
  if (validationError) return validationError;
  const projectPath = body.projectPath!;

  const fieldErrors = validateBacklogCreate(body);
  if (fieldErrors.length > 0) {
    return NextResponse.json<BacklogCreateResponse>(
      { status: "validation_error", errors: fieldErrors },
      { status: 400 }
    );
  }

  try {
    const existingItems = readBacklogItems(projectPath) ?? [];
    const newId = generateBacklogId(existingItems);
    const today = new Date().toISOString().slice(0, 10);

    const newItem: BacklogItem = {
      id: newId,
      title: body.title.trim(),
      type: body.type as BacklogItem["type"],
      priority: body.priority as BacklogItem["priority"],
      status: "open",
      version: body.version?.trim() || null,
      description: body.description?.trim() ?? "",
      createdAt: today,
    };

    const updatedItems = [...existingItems, newItem];
    writeBacklogItems(projectPath, updatedItems);

    return NextResponse.json<BacklogCreateResponse>({
      status: "ok",
      item: newItem,
    });
  } catch {
    return NextResponse.json<BacklogCreateResponse>(
      { status: "write_error", errors: ["Backlog konnte nicht geschrieben werden"] },
      { status: 500 }
    );
  }
}
