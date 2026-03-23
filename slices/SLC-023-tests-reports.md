# SLC-023 — Unit Tests reports.ts

## Related Features
- FEAT-016 (Unit Test Suite)

## Status
planned

## Priority
high

## Purpose
Unit Tests für die Report-Library. Prüft Frontmatter-Parsing, ID-Generierung, Read/Write und Fehlertoleranz.

## Scope

### Included
9 Testfälle:
1. Frontmatter parsen (vollständig) — alle Felder korrekt
2. Frontmatter parsen (optionale Felder leer) — null-Werte
3. Frontmatter parsen (malformed) — graceful skip
4. ID-Generierung (leeres Verzeichnis) — RPT-001
5. ID-Generierung (bestehende Reports) — max + 1
6. Report schreiben + zurücklesen (Round-Trip)
7. Verzeichnis-Scan — nur RPT-*.md
8. Leeres Verzeichnis — leeres Array
9. Fehlendes Verzeichnis — hasReportsDir() = false

### Excluded
- API Route Tests
- UI-Tests

## Key Files

### Neue Dateien
- `/app/src/lib/__tests__/reports.test.ts`

### Genutzte Dateien
- `/app/src/lib/reports.ts` (zu testende Library)
- `/app/src/lib/__tests__/fixtures/sample-report.md`
- `/app/src/lib/__tests__/fixtures/sample-report-malformed.md`

## Dependencies
- SLC-022 (Vitest Setup + Fixtures)

## Acceptance Criteria
- [ ] Alle 9 Testfälle bestehen
- [ ] Round-Trip (write → read) liefert identische Daten
- [ ] Malformed Frontmatter verursacht keinen Crash
- [ ] Temp-Verzeichnisse werden nach jedem Test aufgeräumt
