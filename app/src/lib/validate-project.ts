import { NextResponse } from "next/server";
import { isRegisteredProject } from "@/lib/projects";

/**
 * Validate that a projectPath is registered in projects.config.json.
 * Returns an error response if invalid, or null if valid.
 */
export function validateProjectPath(
  projectPath: string | null
): NextResponse | null {
  if (!projectPath) {
    return NextResponse.json(
      { error: "projectPath required" },
      { status: 400 }
    );
  }

  if (!isRegisteredProject(projectPath)) {
    return NextResponse.json(
      { error: "project not registered" },
      { status: 403 }
    );
  }

  return null;
}
