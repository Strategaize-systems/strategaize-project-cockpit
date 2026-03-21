# SLC-018 — Report-Ansicht

## Related Features
- FEAT-012 (Report-Ansicht)

## Status
planned

## Priority
high

## Purpose
Cockpit-Seite zum Anzeigen, Filtern und Lesen gespeicherter Reports. Ersetzt die Platzhalter-Seite aus SLC-016.

## Scope

### Included
1. **Report-Liste**: Tabelle oder Kartenliste aller Reports mit ID, Datum, Skill, Slice, Typ, Status, Titel.
2. **Filter/Sortierung**: Filter nach Skill, Slice, Typ (completion/review), Status. Sortierung nach Datum.
3. **Detail-Ansicht**: Klick auf Report zeigt den vollständigen Markdown-Inhalt. Kann als Inline-Expand oder eigener Bereich implementiert werden.
4. **Review-Status-Anzeige**: Badges für completed/reviewed/needs-rework.
5. **Leerzustand**: Wenn keine Reports vorhanden oder `reports/` nicht existiert.
6. **Execution-Log-Perspektive**: Chronologische Sortierung dient gleichzeitig als Execution-Log.

### Excluded
- Report-Erstellung über UI (Reports werden durch Claude Code oder POST API erstellt)
- Report-Bearbeitung oder -Löschung
- Markdown-Rendering mit externen Libraries (einfache Darstellung genügt)

## Key Files

### Modifizierte Dateien
- `/app/src/app/reports/page.tsx` (Platzhalter aus SLC-016 ersetzen)

### Genutzte bestehende Dateien
- `/app/src/app/api/reports/route.ts` (aus SLC-017)
- `/app/src/lib/status-badges.ts` (Badge-Styles erweitern)
- `/app/src/components/ui/*` (Card, Badge, EmptyState, etc.)

## Dependencies
- SLC-017 (nutzt GET /api/reports)

## Technical Notes

### UI-Pattern
Empfohlen: Tabelle (wie Backlog) mit expandierbarer Detail-Zeile oder Split-View.

Filter-Bar analog zur Backlog-Ansicht mit Dropdown-Filtern.

### Badge-Erweiterung
`status-badges.ts` muss um Report-Statuswerte erweitert werden:
- `completed` → Gelb/Amber (noch nicht geprüft)
- `reviewed` → Grün/Emerald (geprüft, OK)
- `needs-rework` → Rot/Red (Nacharbeit nötig)

### Markdown-Rendering
Einfache Darstellung: `<pre>` oder `whitespace-pre-wrap` für den Body.
Kein vollständiges Markdown-Rendering nötig in V3.0 — der Report-Body ist primär für Referenz.

## Acceptance Criteria
- [ ] Report-Liste zeigt alle Reports mit korrekten Metadaten
- [ ] Filter nach Skill, Slice, Typ und Status funktioniert
- [ ] Sortierung nach Datum (neueste zuerst, Standard)
- [ ] Detail-Ansicht zeigt den vollständigen Report-Body
- [ ] Review-Status-Badges sind farblich unterscheidbar
- [ ] Leerzustand wird korrekt angezeigt wenn keine Reports existieren
- [ ] Seite lädt korrekt mit Loading-State
- [ ] Responsive: Auf kleinem Bildschirm benutzbar
