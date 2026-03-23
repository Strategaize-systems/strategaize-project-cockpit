import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import {
  parseSlicesFromIndex,
  detectSliceType,
  determineNextStep,
} from "../next-step";
import type { SliceInfo } from "../next-step";

const FIXTURES_DIR = path.resolve(__dirname, "fixtures");

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cockpit-test-nextstep-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// ─── Helper ───────────────────────────────────────────────────────────────

function readFixture(name: string): string {
  return fs.readFileSync(path.join(FIXTURES_DIR, name), "utf-8");
}

function writeProjectFile(relativePath: string, content: string) {
  const fullPath = path.join(tmpDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
}

function writeReport(id: string, overrides: Record<string, string> = {}) {
  const defaults: Record<string, string> = {
    skill: "frontend",
    slice: "SLC-005",
    feature: "FEAT-004",
    type: "completion",
    status: "completed",
    reviewOf: "null",
    result: "null",
    title: `Report ${id}`,
  };
  const merged = { ...defaults, ...overrides };
  const content = [
    "---",
    `id: ${id}`,
    `date: "2026-03-23"`,
    `skill: ${merged.skill}`,
    `slice: ${merged.slice}`,
    `feature: ${merged.feature}`,
    `type: ${merged.type}`,
    `status: ${merged.status}`,
    `reviewOf: ${merged.reviewOf}`,
    `result: ${merged.result}`,
    `title: "${merged.title}"`,
    "---",
    "",
    "# Report body",
  ].join("\n");

  const reportsDir = path.join(tmpDir, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(path.join(reportsDir, `${id}.md`), content, "utf-8");
}

// ─── parseSlicesFromIndex ─────────────────────────────────────────────────

describe("parseSlicesFromIndex", () => {
  it("parst Single-Table korrekt", () => {
    const content = [
      "# Slices",
      "",
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-001 | Project Shell | FEAT-001 | done | high | Layout |",
      "| SLC-002 | Selector | FEAT-001 | planned | high | Config |",
    ].join("\n");

    const slices = parseSlicesFromIndex(content);
    expect(slices).toHaveLength(2);
    expect(slices[0].id).toBe("SLC-001");
    expect(slices[0].status).toBe("done");
    expect(slices[1].id).toBe("SLC-002");
    expect(slices[1].status).toBe("planned");
  });

  it("parst Multi-Table (V1+V2+V3) korrekt", () => {
    const content = readFixture("sample-index-v3.md");
    const slices = parseSlicesFromIndex(content);

    // 2 V1 + 2 V2 + 3 V3 = 7 Slices
    expect(slices).toHaveLength(7);
    expect(slices.every((s) => s.id.startsWith("SLC-"))).toBe(true);

    // Check first and last
    expect(slices[0].id).toBe("SLC-001");
    expect(slices[6].id).toBe("SLC-007");
  });

  it("gibt leeres Array bei leerem Content", () => {
    expect(parseSlicesFromIndex("")).toHaveLength(0);
    expect(parseSlicesFromIndex("# No tables here")).toHaveLength(0);
  });
});

// ─── detectSliceType ──────────────────────────────────────────────────────

describe("detectSliceType", () => {
  it("erkennt Frontend-Keywords", () => {
    const slice: SliceInfo = {
      id: "SLC-001", name: "Report-Ansicht", relatedFeature: "FEAT-012",
      status: "planned", notes: "Report-Seite mit Filter",
    };
    expect(detectSliceType(slice)).toBe("/frontend");
  });

  it("erkennt Backend-Keywords", () => {
    const slice: SliceInfo = {
      id: "SLC-002", name: "Report-API", relatedFeature: "FEAT-011",
      status: "planned", notes: "GET + POST /api/reports, Validierung",
    };
    expect(detectSliceType(slice)).toBe("/backend");
  });

  it("gibt /frontend als Default bei unklarer Beschreibung", () => {
    const slice: SliceInfo = {
      id: "SLC-003", name: "Irgendwas", relatedFeature: "FEAT-001",
      status: "planned", notes: "Keine klaren Keywords",
    };
    expect(detectSliceType(slice)).toBe("/frontend");
  });

  it("erkennt Testing/Tooling als Backend", () => {
    const slice: SliceInfo = {
      id: "SLC-022", name: "Vitest Setup + Fixtures", relatedFeature: "FEAT-016",
      status: "planned", notes: "Vitest installieren, Config, Fixtures",
    };
    expect(detectSliceType(slice)).toBe("/backend");
  });
});

// ─── determineNextStep — Regelwerk ────────────────────────────────────────

describe("determineNextStep", () => {
  it("empfiehlt Implementation wenn kein Report existiert", () => {
    writeProjectFile("slices/INDEX.md", [
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-005 | Report-API | FEAT-004 | planned | high | GET + POST /api/reports |",
    ].join("\n"));

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/backend");
    expect(result.recommendation!.slice).toBe("SLC-005");
  });

  it("empfiehlt /review wenn Completion ohne Review existiert", () => {
    writeProjectFile("slices/INDEX.md", [
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-005 | Report-API | FEAT-004 | in_progress | high | API Route |",
    ].join("\n"));
    writeReport("RPT-001", { skill: "backend", slice: "SLC-005", type: "completion" });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/review");
  });

  it("empfiehlt Rework wenn Review needs-rework sagt", () => {
    writeProjectFile("slices/INDEX.md", [
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-005 | Report-API | FEAT-004 | in_progress | high | API Route |",
    ].join("\n"));
    writeReport("RPT-001", { skill: "backend", slice: "SLC-005", type: "completion" });
    writeReport("RPT-002", {
      skill: "review", slice: "SLC-005", type: "review",
      status: "needs-rework", reviewOf: "RPT-001",
    });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/backend");
    expect(result.recommendation!.reason).toContain("Nacharbeit");
  });

  it("empfiehlt /qa wenn Review bestanden", () => {
    writeProjectFile("slices/INDEX.md", [
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-005 | Report-Ansicht | FEAT-005 | in_progress | high | Seite |",
    ].join("\n"));
    writeReport("RPT-001", { skill: "frontend", slice: "SLC-005", type: "completion" });
    writeReport("RPT-002", {
      skill: "review", slice: "SLC-005", type: "review",
      status: "reviewed", reviewOf: "RPT-001",
    });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/qa");
  });

  it("gibt recommendation null wenn keine Slices existieren", () => {
    writeProjectFile("slices/INDEX.md", "# Empty index\n\nNo tables here.");

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).toBeNull();
    expect(result.reason).toContain("Keine Slices");
  });

  it("gibt recommendation null wenn INDEX.md fehlt", () => {
    // tmpDir has no slices/INDEX.md
    const result = determineNextStep(tmpDir);
    expect(result.recommendation).toBeNull();
    expect(result.reason).toContain("nicht gefunden");
  });
});

// ─── Post-Implementation Workflow ─────────────────────────────────────────

describe("determineNextStep — Post-Implementation", () => {
  function setupAllDone() {
    writeProjectFile("slices/INDEX.md", [
      "| ID | Slice | Related Feature | Status | Priority | Notes |",
      "|---|---|---|---:|---:|---|",
      "| SLC-001 | Done Slice | FEAT-001 | done | high | Fertig |",
    ].join("\n"));
  }

  it("empfiehlt Gesamt-QA wenn alle Slices done", () => {
    setupAllDone();

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/qa");
    expect(result.reason).toContain("Gesamt-QA");
  });

  it("empfiehlt /final-check nach Gesamt-QA", () => {
    setupAllDone();
    writeReport("RPT-001", { skill: "qa", slice: "null", type: "completion" });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/final-check");
  });

  it("empfiehlt /go-live nach Final-Check", () => {
    setupAllDone();
    writeReport("RPT-001", { skill: "qa", slice: "null", type: "completion" });
    writeReport("RPT-002", { skill: "final-check", slice: "null", type: "completion" });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).not.toBeNull();
    expect(result.recommendation!.skill).toBe("/go-live");
  });

  it("meldet Projekt abgeschlossen nach Deploy", () => {
    setupAllDone();
    writeReport("RPT-001", { skill: "qa", slice: "null", type: "completion" });
    writeReport("RPT-002", { skill: "final-check", slice: "null", type: "completion" });
    writeReport("RPT-003", { skill: "go-live", slice: "null", type: "completion" });
    writeReport("RPT-004", { skill: "deploy", slice: "null", type: "completion" });

    const result = determineNextStep(tmpDir);
    expect(result.recommendation).toBeNull();
    expect(result.reason).toContain("vollständig");
  });
});
