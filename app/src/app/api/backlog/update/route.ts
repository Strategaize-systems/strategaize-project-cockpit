import { NextRequest, NextResponse } from "next/server";
import { validateProjectPath } from "@/lib/validate-project";
import {
  readBacklogItems,
  writeBacklogItems,
  validateBacklogUpdate,
} from "@/lib/backlog";
import type { BacklogItem, BacklogUpdateChanges } from "@/lib/backlog";

export interface BacklogUpdateResponse {
  status: "ok" | "not_found" | "validation_error" | "write_error";
  item?: BacklogItem;
  errors?: string[];
}

export async function PATCH(request: NextRequest) {
  let body: { projectPath?: string; id?: string; changes?: BacklogUpdateChanges };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<BacklogUpdateResponse>(
      { status: "validation_error", errors: ["Ungültiger Request-Body"] },
      { status: 400 }
    );
  }

  const validationError = validateProjectPath(body.projectPath ?? null);
  if (validationError) return validationError;
  const projectPath = body.projectPath!;

  if (!body.id) {
    return NextResponse.json<BacklogUpdateResponse>(
      { status: "validation_error", errors: ["ID ist erforderlich"] },
      { status: 400 }
    );
  }

  if (!body.changes || Object.keys(body.changes).length === 0) {
    return NextResponse.json<BacklogUpdateResponse>(
      { status: "validation_error", errors: ["Keine Änderungen angegeben"] },
      { status: 400 }
    );
  }

  const fieldErrors = validateBacklogUpdate(body.changes);
  if (fieldErrors.length > 0) {
    return NextResponse.json<BacklogUpdateResponse>(
      { status: "validation_error", errors: fieldErrors },
      { status: 400 }
    );
  }

  try {
    const items = readBacklogItems(projectPath);
    if (items === null || items.length === 0) {
      return NextResponse.json<BacklogUpdateResponse>(
        { status: "not_found", errors: ["Backlog-Eintrag nicht gefunden"] },
        { status: 404 }
      );
    }

    const index = items.findIndex((item) => item.id === body.id);
    if (index === -1) {
      return NextResponse.json<BacklogUpdateResponse>(
        { status: "not_found", errors: ["Backlog-Eintrag nicht gefunden"] },
        { status: 404 }
      );
    }

    const updated = { ...items[index] };
    if (body.changes.status !== undefined) {
      updated.status = body.changes.status as BacklogItem["status"];
    }
    if (body.changes.priority !== undefined) {
      updated.priority = body.changes.priority as BacklogItem["priority"];
    }
    if (body.changes.version !== undefined) {
      updated.version = body.changes.version?.trim() || null;
    }

    items[index] = updated;
    writeBacklogItems(projectPath, items);

    return NextResponse.json<BacklogUpdateResponse>({
      status: "ok",
      item: updated,
    });
  } catch {
    return NextResponse.json<BacklogUpdateResponse>(
      { status: "write_error", errors: ["Backlog konnte nicht aktualisiert werden"] },
      { status: 500 }
    );
  }
}
