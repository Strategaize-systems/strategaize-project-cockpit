# SLC-022 — Vitest Setup + Fixtures

## Related Features
- FEAT-016 (Unit Test Suite)

## Status
planned

## Priority
high

## Purpose
Test-Infrastruktur einrichten: Vitest installieren, konfigurieren, npm Scripts anlegen und Fixture-Dateien erstellen. Grundlage für alle Test-Slices.

## Scope

### Included
1. `npm install -D vitest` im app/-Verzeichnis
2. `app/vitest.config.ts` mit globals, node environment, @-Alias (DEC-028)
3. `npm run test` und `npm run test:watch` Scripts in package.json
4. Verzeichnisstruktur: `app/src/lib/__tests__/` und `__tests__/fixtures/`
5. Fixture-Dateien:
   - `sample-index-v3.md` (slices/INDEX.md mit V1+V2+V3 Tabellen)
   - `sample-report.md` (gültiger Report mit YAML-Frontmatter)
   - `sample-report-malformed.md` (kaputtes Frontmatter)
   - `sample-backlog.json` (gültige Backlog-Datei)
   - `sample-roadmap.json` (gültige Roadmap-Datei)
6. Smoke-Test: leere Test-Datei die nur prüft ob Vitest läuft

### Excluded
- Echte Tests (SLC-023 bis SLC-025)
- CI/CD Integration

## Key Files

### Neue Dateien
- `/app/vitest.config.ts`
- `/app/src/lib/__tests__/setup.test.ts` (Smoke-Test)
- `/app/src/lib/__tests__/fixtures/sample-index-v3.md`
- `/app/src/lib/__tests__/fixtures/sample-report.md`
- `/app/src/lib/__tests__/fixtures/sample-report-malformed.md`
- `/app/src/lib/__tests__/fixtures/sample-backlog.json`
- `/app/src/lib/__tests__/fixtures/sample-roadmap.json`

### Modifizierte Dateien
- `/app/package.json` — test + test:watch Scripts, vitest Dev-Dependency

## Dependencies
- Keine (erster V3.1-Slice)

## Acceptance Criteria
- [ ] `npm run test` startet Vitest und gibt grüne Ausgabe
- [ ] vitest.config.ts löst @-Alias korrekt auf
- [ ] Fixture-Dateien existieren und sind inhaltlich sinnvoll
- [ ] Smoke-Test besteht
