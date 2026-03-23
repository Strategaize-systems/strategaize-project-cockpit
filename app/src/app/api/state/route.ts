import { NextRequest, NextResponse } from "next/server";
import {
  readProjectFile,
  isProjectAccessible,
  extractSection,
  parseKeyValueLines,
  parseListItems,
  extractParagraphs,
} from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";

export interface StateData {
  status: "ok" | "not_accessible" | "state_missing" | "state_malformed";
  projectPath: string;
  project?: {
    name: string;
    repository?: string;
    deliveryMode?: string;
  };
  state?: {
    highLevelState?: string;
    currentFocus?: string;
    currentPhase?: string;
  };
  nextSteps: string[];
  blockers: string[];
  lastStableVersion?: string;
  purposeSummary?: string;
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  // Check directory accessibility
  if (!isProjectAccessible(projectPath)) {
    const result: StateData = {
      status: "not_accessible",
      projectPath,
      nextSteps: [],
      blockers: [],
    };
    return NextResponse.json(result);
  }

  // Read STATE.md
  const stateContent = readProjectFile(projectPath, "docs/STATE.md");

  if (stateContent === null) {
    const result: StateData = {
      status: "state_missing",
      projectPath,
      nextSteps: [],
      blockers: [],
    };
    return NextResponse.json(result);
  }

  // Parse STATE.md
  try {
    const projectSection = extractSection(stateContent, "Project");
    const currentStateSection = extractSection(stateContent, "Current State");
    const nextStepsSection = extractSection(stateContent, "Immediate Next Steps");
    const blockersSection = extractSection(stateContent, "Blockers");
    const lastVersionSection = extractSection(stateContent, "Last Stable Version");

    const projectKV = projectSection
      ? parseKeyValueLines(projectSection)
      : {};
    const stateKV = currentStateSection
      ? parseKeyValueLines(currentStateSection)
      : {};

    const nextSteps = nextStepsSection
      ? parseListItems(nextStepsSection)
      : [];
    const blockers = blockersSection
      ? parseListItems(blockersSection).filter(
          (b) => b.toLowerCase() !== "none at the moment" && b.toLowerCase() !== "none" && b.toLowerCase() !== "aktuell keine"
        )
      : [];

    const lastVersionItems = lastVersionSection
      ? parseListItems(lastVersionSection)
      : [];
    const lastStableVersion =
      lastVersionItems.length > 0 ? lastVersionItems[0] : undefined;

    // Read PRD.md for purpose summary
    const prdContent = readProjectFile(projectPath, "docs/PRD.md");
    let purposeSummary: string | undefined;
    if (prdContent) {
      const purposeSection = extractSection(prdContent, "Purpose");
      if (purposeSection) {
        purposeSummary = extractParagraphs(purposeSection);
        if (purposeSummary && purposeSummary.length > 300) {
          purposeSummary = purposeSummary.slice(0, 297) + "...";
        }
      }
    }

    const result: StateData = {
      status: "ok",
      projectPath,
      project: {
        name: projectKV["Name"] ?? "Unbekanntes Projekt",
        repository: projectKV["Repository"],
        deliveryMode: projectKV["Delivery Mode"],
      },
      state: {
        highLevelState: stateKV["High-Level State"],
        currentFocus: stateKV["Current Focus"],
        currentPhase: stateKV["Current Phase"],
      },
      nextSteps,
      blockers,
      lastStableVersion:
        lastStableVersion?.toLowerCase() === "none yet"
          ? undefined
          : lastStableVersion,
      purposeSummary,
    };

    return NextResponse.json(result);
  } catch {
    const result: StateData = {
      status: "state_malformed",
      projectPath,
      nextSteps: [],
      blockers: [],
    };
    return NextResponse.json(result);
  }
}
