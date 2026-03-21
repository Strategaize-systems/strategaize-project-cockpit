# FEAT-007 — Backlog-Sicht

## Status
planned

## Priority
high

## Version
V2

## Beschreibung
Strukturierte Übersicht aller offenen und geplanten Arbeitspakete eines Projekts.

## Problemkontext
V1 zeigt Features, Slices und Issues aus bestehenden Projektdateien, aber es gibt keine zentrale Sicht auf alle offenen Arbeitspakete — Bugs, Fixes, geplante Features, Improvements, Ideen und zurückgestellte Themen sind nicht als einheitliche Liste sichtbar.

## In Scope
- Anzeige aller Backlog-Einträge in strukturierter Form
- Kategorien: Bug, Fix, Feature, Improvement, Idea, Later
- Felder pro Eintrag: ID, Titel, Typ, Priorität, Status, Versionszuordnung, Kurzbeschreibung
- Filter nach Typ, Priorität, Status, Versionszuordnung
- Sortierung nach Priorität, Status, Typ
- Datenquelle: strukturierte Backlog-Datei(en) im Repo (Format-Entscheidung in Architecture)

## Out of Scope
- Drag-and-Drop-Umorganisation
- Cross-Project-Backlog-Aggregation
- Inline-Editing (gehört zu FEAT-010)
- Automatische Backlog-Generierung aus Code oder Commits
- Kanban-Board-Darstellung

## Erfolgskriterien
- Nutzer kann alle offenen Arbeitspakete auf einen Blick sehen
- Nutzer kann nach Typ und Priorität filtern
- Nutzer kann erkennen, welche Items welcher Version zugeordnet sind
- Leere Zustände und Fehler werden sauber behandelt

## Offene Punkte
- UI-Pattern: Tabelle oder Kartenliste? (Architecture-Entscheidung)
- Datenformat: Markdown-Tabelle, strukturiertes Markdown, JSON? (Architecture-Entscheidung)
- Verhältnis zu bestehender Issues-Sicht (FEAT-004 / KNOWN_ISSUES.md)
