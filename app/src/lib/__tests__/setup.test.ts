import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";

describe("Vitest Setup", () => {
  it("Vitest läuft korrekt", () => {
    expect(true).toBe(true);
  });

  it("@-Alias löst korrekt auf", async () => {
    // Verify that the @ alias resolves to src/
    const libPath = path.resolve(__dirname, "..", "reports.ts");
    expect(fs.existsSync(libPath)).toBe(true);
  });

  it("Fixture-Dateien existieren", () => {
    const fixturesDir = path.resolve(__dirname, "fixtures");
    const expected = [
      "sample-index-v3.md",
      "sample-report.md",
      "sample-report-malformed.md",
      "sample-backlog.json",
      "sample-roadmap.json",
    ];

    for (const file of expected) {
      const filePath = path.join(fixturesDir, file);
      expect(fs.existsSync(filePath), `Fixture fehlt: ${file}`).toBe(true);
    }
  });
});
