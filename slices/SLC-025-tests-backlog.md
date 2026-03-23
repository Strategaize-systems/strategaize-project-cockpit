# SLC-025 — Unit Tests backlog.ts

## Related Features
- FEAT-016 (Unit Test Suite)

## Status
planned

## Priority
high

## Purpose
Unit Tests für die Backlog-Library. Prüft Validierung, ID-Generierung und Read/Write.

## Scope

### Included
9 Testfälle:
1. Validierung: gültige Eingabe — keine Fehler
2. Validierung: fehlender Titel — Fehlermeldung
3. Validierung: ungültiger Typ — Fehlermeldung
4. Validierung: ungültige Priorität — Fehlermeldung
5. ID-Generierung (leer) — BL-001
6. ID-Generierung (bestehende) — max + 1
7. Read/Write Round-Trip — identische Daten
8. Fehlende Datei — leeres Array
9. Malformed JSON — null

### Excluded
- Update-Validierung (validateBacklogUpdate)
- API Route Tests

## Key Files

### Neue Dateien
- `/app/src/lib/__tests__/backlog.test.ts`

### Genutzte Dateien
- `/app/src/lib/backlog.ts` (zu testende Library)
- `/app/src/lib/__tests__/fixtures/sample-backlog.json`

## Dependencies
- SLC-022 (Vitest Setup + Fixtures)

## Acceptance Criteria
- [ ] Alle 9 Testfälle bestehen
- [ ] Round-Trip (write → read) liefert identische Daten
- [ ] Malformed JSON gibt null zurück, kein Crash
- [ ] Temp-Verzeichnisse werden aufgeräumt
