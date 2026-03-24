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

### REL-003 — V2.0.0 Planungs- und Fortschrittscockpit (Lokal)
- Date: 2026-03-20
- Scope: V2-Erweiterung — alle 7 Slices (SLC-009 bis SLC-015), 4 neue Features (FEAT-007 bis FEAT-010)
- Summary: Cockpit erweitert um Backlog-Sicht (Tabelle mit Filter/Sortierung, Inline-Editing für Status/Priorität/Version, Erstellen-Dialog), Roadmap-Ansicht (Versionskarten mit Fortschrittsbalken), erweitertes Übersichts-Dashboard (Blocker/Offen/Erledigt-KPIs, Versionsfortschritt, Prioritäts- und Typverteilung). Sidebar mit Sektions-Gruppierung (Projekt/Planung). JSON-basierte Datenschicht in planning/ (DEC-015). Keine Datenbank (DEC-012). Write-Scope auf Backlog-Einträge begrenzt (DEC-013). Issues und Backlog koexistieren (DEC-014).
- Risks: Keine automatisierten Tests. Kein Dockerfile. Browser-Verification durch Nutzer vor Release.
- Rollback notes: Git-Zustand vor V2-Implementierung wiederherstellen. planning/ Verzeichnis in Zielprojekten manuell entfernen falls nötig.

### REL-004 — V3.0.0 Workspace Foundation (Lokal)
- Date: 2026-03-21
- Scope: V3-Erweiterung — alle 6 Slices (SLC-016 bis SLC-021), 5 neue Features (FEAT-011 bis FEAT-015)
- Summary: Cockpit erweitert zum aktiven Arbeitsplatz. Report-Speicherung als Markdown mit YAML-Frontmatter in reports/ (Library + API + Viewer mit Filter/Sortierung und expandierbarer Detail-Ansicht). Regelbasierte Nächster-Schritt-Engine mit Prompt-Generierung und Ein-Klick-Kopieren. /review-Skill für Claude Code (Report-Prüfung gegen Projektkriterien). CLAUDE.md Report-Save-Instruktion. Sidebar mit dritter Sektion "Workspace" (Reports, Nächster Schritt). Fester Port 4400 (DEC-025). Post-Implementation-Workflow in Engine (QA → Final-Check → Go-Live → Deploy). Keine API-Kosten (DEC-017), keine Datenbank (DEC-018), keine externe LLM-Integration. Zusätzlich: Multi-Table-Parser-Fix für Slices/Features-API, Rule-Härtungen (Project Record Updates, QA nach jedem Schritt, Gesamt-QA vor Final-Check).
- Risks: Keine automatisierten Tests. Kein Dockerfile. Report Auto-Save via CLAUDE.md-Instruktion noch nicht im Echteinsatz validiert. Silent Error-Catching in Libraries.
- Rollback notes: Git-Zustand vor V3-Implementierung wiederherstellen. reports/ Verzeichnis in Zielprojekten manuell entfernen falls nötig. .claude/skills/review/ Verzeichnis entfernen. Port in package.json zurück auf Standard ändern.

### REL-005 — V3.1.0 Testing Foundation (Lokal)
- Date: 2026-03-23
- Scope: V3.1-Erweiterung — alle 5 Slices (SLC-022 bis SLC-026), 1 Feature (FEAT-016), 2 Backlog-Items (BL-020, BL-021)
- Summary: Testing-Infrastruktur mit Vitest. 45 Unit Tests für drei Kern-Libraries (reports.ts 12 Tests, next-step.ts 17 Tests, backlog.ts 13 Tests, Smoke 3 Tests). On-demand via `npm run test` (< 500ms). Nächster-Schritt-Engine um Multi-Version-Unterstützung erweitert: aktuelle Version priorisiert, offene ältere Schritte (Deploy etc.) als sekundäre Info in pendingSteps-Array. PendingSteps-UI in Nächster-Schritt-Seite. Engine Version-Detection via RPT-ID-Vergleich. QA-Pflicht präzisiert (nur nach /frontend, /backend, /slice-planning). Workflow-Reihenfolge als mandatory in CLAUDE.md verankert. Keyword-Erweiterung für Skill-Typ-Erkennung (Testing/Tooling → /backend). Slices-Parser Multi-Table-Fix tautologischer Confidence-Fix.
- Risks: Kein Multi-Version Unit Test für isCurrentVersion(). Kein Dockerfile. RPT-ID-Vergleich setzt chronologische Report-Erstellung voraus.
- Rollback notes: Vitest und Tests entfernen: `npm uninstall vitest`, `app/vitest.config.ts` löschen, `app/src/lib/__tests__/` löschen, test/test:watch Scripts aus package.json entfernen. Engine-Änderungen in next-step.ts revertieren.

### REL-006 — V4.0.0 Premium Design System (Lokal)
- Date: 2026-03-24
- Scope: V4-Upgrade — alle 7 Slices (SLC-027 bis SLC-033), 7 Features (FEAT-017 bis FEAT-023), 7 Backlog-Items (BL-022 bis BL-028)
- Summary: Komplettes visuelles Upgrade basierend auf Figma Style Guide. Neue Brand-Farben (#120774, #4454B8) mit Gradient-System. Premium KPI-Cards mit Gradient-Top-Border und Gradient-Zahlen auf allen Seiten. Premium-Tabellen mit Gradient-Border, Row-Hover, Status-Dots und Filter auf Features/Slices. Sidebar-Redesign mit echtem Logo (Kompass + StrategAIze), Gradient-Background und Active-Glow. Header-Banner auf Übersichtsseite. Timeline-Style für Releases und Roadmap mit expandierbaren Details. Dunkler Prompt-Block auf Nächster-Schritt-Seite. Shared FilterSelect-Komponente. Loading-Spinner mit Brand-Color. 8px-Spacing-System. Keine neuen APIs, keine neuen Dependencies, keine Datenmodell-Änderungen.
- Risks: Kein Dockerfile. Logo-Kontrast auf dunkler Sidebar könnte variieren. Keine E2E Browser-Tests.
- Rollback notes: Git-Zustand vor V4 wiederherstellen. Logo-Dateien in public/ entfernen. theme.ts und globals.css auf V3-Stand zurücksetzen.

## Standard structure for future entries

### REL-XXX — Version or release name
- Date:
- Scope:
- Summary:
- Risks:
- Rollback notes:
