# FEAT-012 — Report-Ansicht

## Status
planned

## Priority
high

## Version
V3

## Beschreibung
Cockpit-Seite zum Anzeigen, Filtern und Durchsuchen gespeicherter Reports und Review-Ergebnisse.

## Problemkontext
Auch wenn Reports gespeichert werden (FEAT-011), fehlt ohne eine dedizierte Ansicht die Möglichkeit, Reports schnell zu finden, zu filtern und nachzulesen. Die Report-Ansicht macht die Execution-Historie im Cockpit sichtbar.

## In Scope
- Report-Liste mit Metadaten (Datum, Skill, Slice, Status, Review-Status)
- Filter nach: Datum, Skill-Typ, Slice, Review-Status
- Sortierung nach Datum (neueste zuerst als Standard)
- Report-Detailansicht mit gerendertem Markdown-Inhalt
- Leerzustand wenn keine Reports vorhanden
- Badge-Anzeige für Review-Status (geprüft / nicht geprüft / Nacharbeit)

## Out of Scope
- Report-Bearbeitung in der UI
- Report-Vergleich (Diff zwischen zwei Reports)
- Report-Export (PDF, etc.)
- Volltextsuche über Report-Inhalte
- Paginierung (akzeptabel für V3.0 — Report-Anzahl überschaubar)

## Erfolgskriterien
- Nutzer kann alle gespeicherten Reports auf einer Seite sehen
- Nutzer kann nach Skill, Slice oder Status filtern
- Nutzer kann einen Report öffnen und den vollständigen Inhalt lesen
- Review-Status ist auf einen Blick erkennbar

## Offene Punkte
- UI-Pattern: Tabelle oder Kartenliste? (Architecture/Slice-Entscheidung)
- URL-Struktur: /reports und /reports/[id]? (Architecture-Entscheidung)
