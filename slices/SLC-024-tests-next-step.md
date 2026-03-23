# SLC-024 — Unit Tests next-step.ts

## Related Features
- FEAT-016 (Unit Test Suite)

## Status
planned

## Priority
high

## Purpose
Unit Tests für die Nächster-Schritt-Engine. Prüft Slice-Parsing, Skill-Erkennung, Regelwerk und Post-Implementation-Workflow.

## Scope

### Included
13 Testfälle:
1. Slice-Parsing (Single-Table) — Slices korrekt extrahiert
2. Slice-Parsing (Multi-Table V1+V2+V3) — nur SLC-Zeilen
3. Skill-Typ Frontend-Keywords — "Ansicht", "Seite" → /frontend
4. Skill-Typ Backend-Keywords — "API", "Route" → /backend
5. Skill-Typ Default — Unklare Beschreibung → /frontend
6. Regelwerk: kein Report → implement
7. Regelwerk: completion ohne review → /review
8. Regelwerk: review needs-rework → rework
9. Regelwerk: reviewed → /qa
10. Post-Impl: alle done → /qa Gesamt
11. Post-Impl: nach QA → /final-check
12. Edge: keine Slices → recommendation null
13. Edge: alle done + released → Projekt abgeschlossen

### Excluded
- API Route Tests
- Integration mit echten Projekt-Repos

## Key Files

### Neue Dateien
- `/app/src/lib/__tests__/next-step.test.ts`

### Genutzte Dateien
- `/app/src/lib/next-step.ts` (zu testende Library)
- `/app/src/lib/__tests__/fixtures/sample-index-v3.md`
- `/app/src/lib/__tests__/fixtures/sample-roadmap.json`

## Dependencies
- SLC-022 (Vitest Setup + Fixtures)

## Acceptance Criteria
- [ ] Alle 13 Testfälle bestehen
- [ ] Skill-Typ-Erkennung für Frontend/Backend/Default korrekt
- [ ] Post-Implementation-Workflow korrekt (QA → Final-Check → Go-Live)
- [ ] Edge Cases (leere INDEX, keine Slices) produzieren keinen Crash
