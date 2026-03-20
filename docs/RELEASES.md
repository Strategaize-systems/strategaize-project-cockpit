# RELEASES

## Purpose

Dieses Dokument dokumentiert bedeutsame Release-Punkte des Projekts.

Jeder Release-Eintrag soll verständlich machen:
- was sich geändert hat
- wann es sich geändert hat
- welche Risiken verblieben sind
- welches Rollback-Bewusstsein bestand

## Current releases

### REL-001 — V1.0.0 (Lokal)
- Date: 2026-03-19
- Scope: Vollständige V1-Umsetzung — alle 8 Slices (SLC-001 bis SLC-008)
- Summary: Internes Projektcockpit mit Projektselektor, Übersichts-Dashboard, Feature-Tabelle, Slice-Tabelle mit Resume-Hervorhebung, Probleme-Kartenliste, Releases- & Migrationen-Ansicht, Entscheidungen- & Verbesserungen-Ansicht. UI auf Deutsch (DEC-011). Nur Leseansicht, keine Bearbeitung. projectPath-Validierung auf allen API-Routes.
- Risks: Keine automatisierten Tests. Kein Dockerfile für Server-Deployment vorhanden.
- Rollback notes: Erster Release, kein vorheriger Zustand zum Zurückrollen. `npm run dev` beenden zum Deaktivieren.

### REL-002 — V1.1.0 Design-Polish (Lokal)
- Date: 2026-03-20
- Scope: Design-Polish über 8 Pakete — Theme, Shell, Cards, Tabellen, Badges, Copy, Responsive
- Summary: Visuelles Fundament mit Slate/Indigo-Farbschema, dunkle Sidebar mit Branding-Header, Card-System mit Shadow und Hierarchie, Tabellen mit Uppercase-Headern und horizontalem Scroll, konsolidiertes Badge-System (5 Kategorien), UI-Copy und source-derived Inhalte auf Deutsch, Responsive-Fixes (Mobile-Hamburger, Tabellen-Scroll, Content-Padding). Browser-Test bestanden.
- Risks: Keine automatisierten Tests. DECISIONS.md Reason/Consequence bleibt englisch. Kein Dockerfile.
- Rollback notes: Git-Zustand vor Design-Polish wiederherstellen falls nötig.

## Standard structure for future entries

### REL-XXX — Version or release name
- Date:
- Scope:
- Summary:
- Risks:
- Rollback notes:
