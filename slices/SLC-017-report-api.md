# SLC-017 — Report-API

## Related Features
- FEAT-011 (Report-Speicherung)

## Status
planned

## Priority
high

## Purpose
API-Endpoints für Reports bereitstellen: GET zum Lesen aller Reports und POST zum Speichern neuer Reports. Folgt dem bestehenden API-Pattern aus V1/V2.

## Scope

### Included
1. **GET /api/reports**: projectPath validieren, `reports/` scannen, Frontmatter parsen, sortiert nach Datum zurückgeben.
2. **POST /api/reports**: Validierung, ID generieren, Frontmatter + Body zusammensetzen, Datei schreiben, `reports/` on-demand erstellen.
3. **Response-Pattern**: Konsistent mit bestehenden Routes (`status: "ok" | "not_accessible" | "dir_missing" | "empty" | "validation_error"`).

### Excluded
- Report-Ansicht/UI (SLC-018)
- Report-Status-Update-Endpoint (nicht in V3.0 Scope — Status-Änderung passiert durch neuen Report)

## Key Files

### Neue Dateien
- `/app/src/app/api/reports/route.ts`

### Genutzte bestehende Dateien
- `/app/src/lib/reports.ts` (aus SLC-016)
- `/app/src/lib/validate-project.ts`

## Dependencies
- SLC-016 (nutzt lib/reports.ts)

## Technical Notes

### GET Response
```json
{
  "status": "ok",
  "reports": [
    {
      "id": "RPT-001",
      "date": "2026-03-21",
      "skill": "frontend",
      "slice": "SLC-016",
      "feature": "FEAT-011",
      "type": "completion",
      "status": "completed",
      "reviewOf": null,
      "title": "Frontend SLC-016",
      "body": "# Completion Report\n\n..."
    }
  ]
}
```

### POST Body
```json
{
  "projectPath": "/path/to/project",
  "skill": "frontend",
  "slice": "SLC-016",
  "feature": "FEAT-011",
  "type": "completion",
  "title": "Frontend SLC-016",
  "body": "# Report\n\n..."
}
```

### Validierung (POST)
- `projectPath` — Pflicht, validiert gegen Projekt-Registry
- `skill` — Pflicht, Freitext
- `type` — Pflicht, Enum: completion, review
- `title` — Pflicht, Freitext
- `body` — Pflicht, Freitext (Markdown)
- `slice`, `feature` — Optional
- `reviewOf` — Optional, nur bei type=review

## Acceptance Criteria
- [ ] GET /api/reports gibt alle Reports eines Projekts zurück (sortiert nach Datum, neueste zuerst)
- [ ] GET gibt `dir_missing` wenn `reports/` nicht existiert
- [ ] GET gibt `empty` wenn Verzeichnis existiert aber keine RPT-Dateien enthält
- [ ] POST erstellt einen neuen Report mit korrekter ID und Frontmatter
- [ ] POST erstellt `reports/` Verzeichnis on-demand
- [ ] POST validiert Pflichtfelder und gibt `validation_error` bei fehlenden Feldern
- [ ] POST gibt den erstellten Report als Response zurück
- [ ] projectPath-Validierung funktioniert auf beiden Routes
- [ ] Malformed Frontmatter in bestehenden Reports verursacht keinen Crash (graceful skip)
