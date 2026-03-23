import { NextRequest, NextResponse } from "next/server";
import { isProjectAccessible } from "@/lib/markdown";
import { validateProjectPath } from "@/lib/validate-project";
import { determineNextStep } from "@/lib/next-step";
import type { NextStepRecommendation, PendingStep } from "@/lib/next-step";

// ─── GET — Next step recommendation ───────────────────────────────────────

export interface NextStepResponse {
  status: "ok" | "not_accessible" | "error";
  recommendation: NextStepRecommendation | null;
  reason: string;
  pendingSteps: PendingStep[];
}

export async function GET(request: NextRequest) {
  const projectPathParam = request.nextUrl.searchParams.get("projectPath");
  const validationError = validateProjectPath(projectPathParam);
  if (validationError) return validationError;
  const projectPath = projectPathParam!;

  if (!isProjectAccessible(projectPath)) {
    return NextResponse.json<NextStepResponse>({
      status: "not_accessible",
      recommendation: null,
      reason: "Projektverzeichnis nicht erreichbar.",
      pendingSteps: [],
    });
  }

  try {
    const result = determineNextStep(projectPath);

    return NextResponse.json<NextStepResponse>({
      status: "ok",
      recommendation: result.recommendation,
      reason: result.reason,
      pendingSteps: result.pendingSteps,
    });
  } catch {
    return NextResponse.json<NextStepResponse>(
      {
        status: "error",
        recommendation: null,
        reason: "Fehler bei der Berechnung des nächsten Schritts.",
        pendingSteps: [],
      },
      { status: 500 }
    );
  }
}
