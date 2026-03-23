# SLC-026 — Engine: Multi-Version-Empfehlung

## Related Features
- BL-021 (Engine: Offene Schritte + aktuelle Version parallel)

## Status
planned

## Priority
high

## Purpose
Die Nächster-Schritt-Engine so erweitern, dass sie gleichzeitig den aktuellen Arbeitsschritt (z.B. /slice-planning für V3.1) UND offene ältere Schritte (z.B. Deploy für V3) anzeigen kann. Aktuell blockiert ein offener Post-Implementation-Schritt die Anzeige des echten nächsten Arbeitsschritts.

## Scope

### Included
1. **Engine-Logik erweitern**: Aktive Version (roadmap.json: status=active) priorisieren, auch wenn ältere Schritte offen sind.
2. **Sekundäre Empfehlung**: Offene Post-Implementation-Schritte (Deploy etc.) als sekundäre Info neben der Haupt-Empfehlung anzeigen.
3. **API-Response erweitern**: `pendingSteps` Array neben `recommendation`.
4. **UI anpassen**: Nächster-Schritt-Seite zeigt Haupt-Empfehlung + optionalen "Offene Schritte"-Hinweis.

### Excluded
- Mehrere gleichzeitige Haupt-Empfehlungen
- Versions-Management UI

## Key Files

### Modifizierte Dateien
- `/app/src/lib/next-step.ts` — Logik für Multi-Version
- `/app/src/app/api/next-step/route.ts` — Response um pendingSteps erweitern
- `/app/src/app/next-step/page.tsx` — UI für offene Schritte

## Dependencies
- Keine harte Abhängigkeit auf Test-Slices

## Acceptance Criteria
- [ ] Engine zeigt aktuellen Arbeitsschritt (z.B. /backend SLC-022) als Haupt-Empfehlung
- [ ] Offene ältere Schritte (Deploy V3) werden als sekundäre Info angezeigt
- [ ] Wenn keine offenen älteren Schritte existieren, wird nur die Haupt-Empfehlung gezeigt
- [ ] API-Response enthält pendingSteps Array
