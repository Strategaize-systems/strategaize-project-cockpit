import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import {
  readBacklogItems,
  hasBacklogFile,
  writeBacklogItems,
  generateBacklogId,
  validateBacklogCreate,
} from "../backlog";
import type { BacklogItem } from "../backlog";

const FIXTURES_DIR = path.resolve(__dirname, "fixtures");

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cockpit-test-backlog-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// ─── Helper ───────────────────────────────────────────────────────────────

function setupBacklogFile(content?: string) {
  const planningDir = path.join(tmpDir, "planning");
  fs.mkdirSync(planningDir, { recursive: true });
  if (content !== undefined) {
    fs.writeFileSync(path.join(planningDir, "backlog.json"), content, "utf-8");
  }
}

function readFixtureJson(name: string): string {
  return fs.readFileSync(path.join(FIXTURES_DIR, name), "utf-8");
}

// ─── validateBacklogCreate ────────────────────────────────────────────────

describe("validateBacklogCreate", () => {
  it("gibt keine Fehler bei gültiger Eingabe", () => {
    const errors = validateBacklogCreate({
      title: "Test Item",
      type: "feature",
      priority: "high",
    });
    expect(errors).toHaveLength(0);
  });

  it("meldet fehlenden Titel", () => {
    const errors = validateBacklogCreate({
      title: "",
      type: "feature",
      priority: "high",
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.includes("Titel"))).toBe(true);
  });

  it("meldet ungültigen Typ", () => {
    const errors = validateBacklogCreate({
      title: "Test",
      type: "invalid-type",
      priority: "high",
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.includes("Typ"))).toBe(true);
  });

  it("meldet ungültige Priorität", () => {
    const errors = validateBacklogCreate({
      title: "Test",
      type: "bug",
      priority: "super-urgent",
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.includes("Priorität"))).toBe(true);
  });
});

// ─── generateBacklogId ────────────────────────────────────────────────────

describe("generateBacklogId", () => {
  it("generiert BL-001 bei leerem Array", () => {
    expect(generateBacklogId([])).toBe("BL-001");
  });

  it("generiert max + 1 bei bestehenden Items", () => {
    const existing = [
      { id: "BL-001" },
      { id: "BL-005" },
      { id: "BL-003" },
    ] as BacklogItem[];
    expect(generateBacklogId(existing)).toBe("BL-006");
  });
});

// ─── readBacklogItems + writeBacklogItems ─────────────────────────────────

describe("readBacklogItems", () => {
  it("gibt leeres Array wenn Datei nicht existiert", () => {
    const items = readBacklogItems(tmpDir);
    expect(items).toEqual([]);
  });

  it("gibt null bei malformed JSON", () => {
    setupBacklogFile("{ this is not valid json }}}");
    const items = readBacklogItems(tmpDir);
    expect(items).toBeNull();
  });

  it("liest gültige Backlog-Datei korrekt", () => {
    const fixtureContent = readFixtureJson("sample-backlog.json");
    setupBacklogFile(fixtureContent);

    const items = readBacklogItems(tmpDir);
    expect(items).not.toBeNull();
    expect(items!).toHaveLength(2);
    expect(items![0].id).toBe("BL-001");
    expect(items![1].id).toBe("BL-002");
  });
});

describe("hasBacklogFile", () => {
  it("gibt false wenn Datei nicht existiert", () => {
    expect(hasBacklogFile(tmpDir)).toBe(false);
  });

  it("gibt true wenn Datei existiert", () => {
    setupBacklogFile('{"items":[]}');
    expect(hasBacklogFile(tmpDir)).toBe(true);
  });
});

describe("writeBacklogItems + readBacklogItems (Round-Trip)", () => {
  it("schreibt und liest Items identisch zurück", () => {
    const items: BacklogItem[] = [
      {
        id: "BL-001",
        title: "Test Item",
        type: "feature",
        priority: "high",
        status: "open",
        version: "V1",
        description: "Beschreibung",
        createdAt: "2026-03-23",
      },
      {
        id: "BL-002",
        title: "Zweiter Eintrag",
        type: "bug",
        priority: "medium",
        status: "done",
        version: null,
        description: "",
        createdAt: "2026-03-23",
      },
    ];

    writeBacklogItems(tmpDir, items);

    const read = readBacklogItems(tmpDir);
    expect(read).not.toBeNull();
    expect(read!).toHaveLength(2);
    expect(read![0].id).toBe("BL-001");
    expect(read![0].title).toBe("Test Item");
    expect(read![0].type).toBe("feature");
    expect(read![0].version).toBe("V1");
    expect(read![1].id).toBe("BL-002");
    expect(read![1].version).toBeNull();
  });

  it("erstellt planning/ Verzeichnis on-demand", () => {
    const planningDir = path.join(tmpDir, "planning");
    expect(fs.existsSync(planningDir)).toBe(false);

    writeBacklogItems(tmpDir, []);

    expect(fs.existsSync(planningDir)).toBe(true);
    expect(hasBacklogFile(tmpDir)).toBe(true);
  });
});
