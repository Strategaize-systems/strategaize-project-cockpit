# SLC-019 — Nächster-Schritt-Engine

## Related Features
- FEAT-013 (Nächster-Schritt-Engine)

## Status
planned

## Priority
high

## Purpose
Regelbasierte Engine die den nächsten empfohlenen Arbeitsschritt ableitet und einen fertigen, kontextreichen Prompt generiert. Kern der V3-Workspace-Idee.

## Scope

### Included
1. **lib/next-step.ts**: Regelwerk, Slice-Typ-Erkennung, Prompt-Generierung.
2. **GET /api/next-step**: Endpoint der die Empfehlung + generierten Prompt zurückgibt.
3. **Regelwerk-Logik**: 4-Schritt-Ablauf (Slice finden → Reports prüfen → Skill ableiten → Prompt generieren).
4. **Slice-Typ-Erkennung**: Heuristik basierend auf Slice-Beschreibung (Backend-Keywords → /backend, Frontend-Keywords → /frontend).
5. **Prompt-Template**: Skill-Name + Slice-Referenz + Akzeptanzkriterien + Kontext-Dateien.
6. **Confidence-Level**: high/medium/low basierend auf Eindeutigkeit der Empfehlung.

### Excluded
- UI/Seite (SLC-020)
- LLM-gestützte Empfehlungen (DEC-023: regelbasiert in V3.0)
- Automatische Ausführung des empfohlenen Schritts

## Key Files

### Neue Dateien
- `/app/src/lib/next-step.ts`
- `/app/src/app/api/next-step/route.ts`

### Genutzte bestehende Dateien
- `/app/src/lib/reports.ts` (aus SLC-016 — Report-Historie pro Slice)
- `/app/src/lib/markdown.ts` (Slice/Feature-Index parsen)
- `/app/src/lib/validate-project.ts`

## Dependencies
- SLC-016 (nutzt lib/reports.ts für Report-Scan)

## Technical Notes

### Regelwerk (4 Schritte)

**Schritt 1 — Aktiven Slice finden:**
1. `slices/INDEX.md` lesen und parsen
2. Build-Reihenfolge aus Index ableiten (Position in Tabelle)
3. Ersten Slice finden der nicht `done` ist

**Schritt 2 — Report-Status prüfen:**
1. Reports für diesen Slice aus `reports/` lesen
2. Prüfen welche Skill-Typen bereits Reports haben

**Schritt 3 — Nächsten Skill ableiten:**

| Slice-Status | Reports vorhanden | Empfohlener Skill |
|---|---|---|
| planned/ready | keine | /frontend oder /backend (je nach Slice-Typ) |
| in_progress | keine completion Reports | /frontend oder /backend |
| in_progress | completion ohne review | /review |
| in_progress | review mit needs-rework | Rework: gleicher Skill wie letzter completion |
| in_progress | review mit reviewed | /qa |
| qa_pending | qa Report vorhanden | Slice als done markieren |

**Schritt 4 — Prompt generieren:**
1. Skill-Name + Slice-Referenz
2. Akzeptanzkriterien aus Slice-Datei (falls `slices/SLC-XXX.md` existiert)
3. Architektur-Hinweis
4. Relevante Dateien

### Slice-Typ-Erkennung
- Keywords "API", "Route", "Backend", "Library", "Migration" → `/backend`
- Keywords "Seite", "Ansicht", "View", "UI", "Dashboard", "Sidebar" → `/frontend`
- Unklar → `/frontend` als Default

### API Response
```json
{
  "status": "ok",
  "recommendation": {
    "skill": "/frontend",
    "slice": "SLC-018",
    "feature": "FEAT-012",
    "reason": "SLC-018 ist der nächste offene Slice. Completion Report fehlt.",
    "prompt": "/frontend — Implementiere SLC-018 (Report-Ansicht)...",
    "confidence": "high"
  }
}
```

Kein nächster Schritt: `{ "status": "ok", "recommendation": null, "reason": "Alle Slices sind abgeschlossen." }`

## Acceptance Criteria
- [ ] Engine findet korrekt den nächsten offenen Slice basierend auf INDEX.md
- [ ] Engine berücksichtigt Report-Historie (kein doppelter Vorschlag nach bestehendem Report)
- [ ] Skill-Typ wird korrekt aus Slice-Beschreibung abgeleitet
- [ ] Prompt enthält Slice-Referenz, Akzeptanzkriterien und Kontext-Dateien
- [ ] Confidence-Level reflektiert die Eindeutigkeit der Empfehlung
- [ ] API gibt `recommendation: null` wenn alle Slices done sind
- [ ] API gibt sinnvolle Empfehlung für typische Projektkonstellationen
- [ ] Graceful Handling wenn slices/INDEX.md nicht existiert oder leer ist
