# FEAT-014 — Workspace-Navigation und Infrastruktur

## Status
planned

## Priority
medium

## Version
V3

## Beschreibung
Sidebar-Erweiterung um "Workspace"-Sektion und Infrastruktur-Anpassungen (fester Port).

## Problemkontext
V3.0 fügt neue Seiten hinzu (Reports, Nächster Schritt). Diese müssen in der Navigation sichtbar und von den bestehenden Sektionen (Projekt, Planung) klar getrennt sein. Zusätzlich muss der Cockpit-Port fest konfiguriert werden, um Kollisionen mit Entwicklungsprojekten zu vermeiden.

## In Scope
- Neue Sidebar-Sektion "Workspace" unterhalb von "Planung"
- Navigationseinträge: Reports, Nächster Schritt
- Fester Cockpit-Port (z.B. 4400) konfiguriert in package.json/env
- Routing für neue Seiten (/reports, /next-step oder ähnlich)

## Out of Scope
- Sidebar-Redesign oder Umstrukturierung bestehender Sektionen
- Dynamische Sidebar-Konfiguration
- Responsive Navigation-Änderungen über das bestehende Pattern hinaus
- Port-Konfiguration über die UI

## Erfolgskriterien
- Sidebar zeigt drei klar getrennte Sektionen: Projekt, Planung, Workspace
- Neue Seiten sind über die Navigation erreichbar
- Cockpit startet zuverlässig auf dem konfigurierten festen Port
- Kein Konflikt mit `npm run dev` anderer Projekte auf Port 3000

## Offene Punkte
- Exakter Port-Wert: 4400 oder anderer? (Architecture-Entscheidung)
- Route-Pfade: /reports, /next-step, oder andere Benennung? (Architecture-Entscheidung)
