# FEAT-009 — Erweitertes Fortschritts-Dashboard

## Status
planned

## Priority
medium

## Version
V2

## Beschreibung
Erweiterung der bestehenden Übersichtsseite um Fortschritts-, Prioritäts- und Blocker-Sichtbarkeit aus Backlog- und Roadmap-Daten.

## Problemkontext
Die bestehende Übersichtsseite (FEAT-001) zeigt den Projektstatus aus STATE.md. V2 bringt mit Backlog und Roadmap neue Datenquellen, deren Aggregation auf der Übersichtsseite sichtbar sein sollte: Fortschritt pro Version, Prioritätsverteilung, Blocker-Zähler.

## In Scope
- Fortschrittsanzeige pro Version (z.B. Fortschrittsbalken oder Zahlenwerte)
- Prioritätsverteilung über offene Items
- Blocker-Zähler / Blocker-Hervorhebung
- Zusammenfassung offener Items nach Typ
- Integration in bestehende Übersichtsseite (kein separater Nav-Eintrag)

## Out of Scope
- Eigene Dashboard-Seite separat von der bestehenden Übersicht
- Charts, Grafiken oder erweiterte Visualisierungen
- Historische Fortschrittskurven
- Cross-Project-Dashboard
- Automatisierte Benachrichtigungen oder Alerts

## Erfolgskriterien
- Nutzer sieht auf der Übersichtsseite sofort den V2-relevanten Fortschritt
- Blocker sind auf der Übersicht erkennbar
- Prioritätsverteilung gibt einen schnellen Eindruck der Lage

## Offene Punkte
- Welche V2-Daten werden aggregiert? Nur Backlog, oder auch Roadmap? (Architecture-Entscheidung)
- Layout: bestehende Übersichtskarten erweitern oder neue Sektion hinzufügen? (Architecture-Entscheidung)
- Berechnung: wie wird "Fortschritt" definiert? (Architecture-Entscheidung)
