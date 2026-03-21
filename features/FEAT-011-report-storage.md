# FEAT-011 — Report-Speicherung

## Status
planned

## Priority
high

## Version
V3

## Beschreibung
Completion Reports und Review-Ergebnisse als Markdown-Dateien mit YAML-Frontmatter persistent im Projekt-Repo speichern.

## Problemkontext
Reports existieren aktuell nur im Chatverlauf von Claude Code und gehen nach der Session verloren. Es gibt keine persistente, durchsuchbare Dokumentation der durchgeführten Arbeitsschritte und ihrer Ergebnisse.

## In Scope
- Report-Format: Markdown-Body mit YAML-Frontmatter (ID, Datum, Skill, Slice, Feature, Status)
- Speicherort: `reports/` Verzeichnis im Zielprojekt-Repo
- ID-Generierung: sequenziell (RPT-001, RPT-002, ...) — gleiches Pattern wie Backlog
- Report-Typen: completion (Skill-Ergebnis) und review (Prüf-Ergebnis)
- Read-API für Reports (GET)
- Verzeichnis-Scan statt separatem Index
- Verzeichnis on-demand erstellen wenn erster Report gespeichert wird

## Out of Scope
- Report-Bearbeitung über die UI
- Report-Löschung über die UI
- Report-Archivierung oder -Komprimierung
- Automatische Report-Zusammenfassungen
- Cross-Projekt-Report-Aggregation

## Erfolgskriterien
- Reports werden als lesbare Markdown-Dateien im Repo gespeichert
- Reports haben ein konsistentes Frontmatter-Schema
- Die Read-API liefert alle Reports mit Metadaten und Inhalt
- Leerer Zustand (kein reports/ Verzeichnis) wird graceful behandelt

## Offene Punkte (gelöst)
- ~~Exaktes Frontmatter-Schema~~ → DEC-021: YAML-Frontmatter mit id, date, skill, slice, feature, type, status, reviewOf, title
- ~~Dateinamen-Konvention~~ → RPT-XXX.md (sequenziell, DEC-022)
- ~~Auto-Save-Mechanismus~~ → DEC-024: Claude Code schreibt Reports direkt als Datei
