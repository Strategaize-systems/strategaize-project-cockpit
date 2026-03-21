# FEAT-008 — Versionen-/Roadmap-Sicht

## Status
planned

## Priority
high

## Version
V2

## Beschreibung
Übersicht aller Projektstufen und Versionen mit Scope, Status und Fortschrittsindikator.

## Problemkontext
Projektstufen wie V1, V1.1, V2, V3 existieren als Konzept, sind aber nicht als strukturierte Übersicht im Cockpit sichtbar. Es fehlt eine Sicht, die zeigt: welche Versionen gibt es, was gehört wohin, wie weit ist eine Version, und was ist der aktuelle Stand.

## In Scope
- Anzeige aller definierten Projektstufen/Versionen
- Pro Version: Name, Status, Scope-Zusammenfassung, zugeordnete Item-Anzahl, Fortschrittsindikator
- Chronologische oder logische Reihenfolge
- Datenquelle: strukturierte Versions-/Roadmap-Datei im Repo (Format-Entscheidung in Architecture)

## Out of Scope
- Drag-and-Drop-Umorganisation von Versionen
- Versions-Editing (Anlegen, Löschen, Umbenennen)
- Cross-Project-Roadmap-Aggregation
- Gantt-Chart oder Timeline-Visualisierung
- Automatische Fortschrittsberechnung aus Git-History

## Erfolgskriterien
- Nutzer kann alle Projektstufen auf einen Blick sehen
- Nutzer kann pro Version erkennen: Status, Umfang, Fortschritt
- Nutzer kann nachvollziehen, welche Items zu welcher Version gehören

## Offene Punkte
- Datenformat für Versions-/Roadmap-Datei (Architecture-Entscheidung)
- Wie wird Fortschritt berechnet? Anzahl erledigter Items / Gesamtanzahl? (Architecture-Entscheidung)
- UI-Pattern: Kartenliste, gestapelte Sektionen, oder eigenes Layout? (Architecture-Entscheidung)
