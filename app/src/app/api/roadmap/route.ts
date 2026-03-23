import { NextRequest, NextResponse } from "next/server";
import { isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";
import { readBacklogItems } from "@/lib/backlog";
import {
  readRoadmap,
  hasRoadmapFile,
  calculateProgress,
} from "@/lib/roadmap";
import type { RoadmapVersionWithProgress } from "@/lib/roadmap";

export interface RoadmapResponse {
  status: "ok" | "not_accessible" | "file_missing" | "file_malformed" | "empty";
  versions: RoadmapVersionWithProgress[];
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<RoadmapResponse>({
      status: "not_accessible",
      versions: [],
    });
  }

  if (!hasRoadmapFile(projectPath)) {
    return NextResponse.json<RoadmapResponse>({
      status: "file_missing",
      versions: [],
    });
  }

  const versions = readRoadmap(projectPath);

  if (versions === null) {
    return NextResponse.json<RoadmapResponse>({
      status: "file_malformed",
      versions: [],
    });
  }

  if (versions.length === 0) {
    return NextResponse.json<RoadmapResponse>({
      status: "empty",
      versions: [],
    });
  }

  // Read backlog for progress calculation — missing backlog = zero progress, not error
  const backlogItems = readBacklogItems(projectPath) ?? [];

  const versionsWithProgress = calculateProgress(versions, backlogItems);

  return NextResponse.json<RoadmapResponse>({
    status: "ok",
    versions: versionsWithProgress,
  });
}
