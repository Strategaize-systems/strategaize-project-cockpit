# PRD

## Project Name
Strategaize Project Cockpit

## Purpose

Strategaize Project Cockpit ist ein internes operatives Dashboard für die Sichtbarkeit über Softwareprojekte, die mit dem Strategaize Dev System verwaltet werden.

Ziel ist es, verstreutes Projektwissen durch eine klare, strukturierte Übersicht zu ersetzen:

- aktueller Projektstatus
- aktive und abgeschlossene Features
- aktive und abgeschlossene Slices
- bekannte Probleme und Fehlerberichte
- Releases und Migrationen
- technische und prozessuale Entscheidungen
- Skill-Verbesserungen

## Problem

Current project work depends too heavily on:
- chat memory
- manually opening markdown files
- scattered notes
- fragmented visibility over progress and next steps

This creates friction when:
- resuming work after interruptions
- reviewing what has been completed
- seeing what remains open
- tracking bugs, releases, and migrations
- coordinating future contributors

## Target Outcome

The cockpit should provide a structured internal interface that gives a fast and reliable answer to questions like:

- Where does this project currently stand?
- What features are planned, active, done, blocked, or deferred?
- Which implementation slices are currently active?
- Which issues exist?
- What was released and what changed?
- Which migrations happened and why?
- Which decisions shaped the project?
- Which repeated findings should improve the dev system itself?

## Users

### Primary user
- Richard / internal project owner

### Secondary future users
- internal developer
- technical collaborator
- future freelancer or contractor
- later internal operations support

## V1 Scope

V1 should focus on read-oriented project visibility, not full editing or workflow automation.

### Included in V1
- project selector — simple context switch between registered projects
- project overview / dashboard page (default landing page)
- current state display
- features view (data table)
- slices view (data table with resume orientation)
- issues / bugs view (card list)
- releases / migrations view (two stacked card list sections)
- decisions / skill improvements view (two stacked card list sections)
- left sidebar navigation with fixed structure:
  1. Overview (default/home)
  2. Features
  3. Slices
  4. Issues
  5. Releases & Migrations
  6. Decisions & Improvements

### Multi-project in V1
Multi-project support is intentionally part of V1, but only as a lightweight project context selector.

V1 multi-project means:
- a simple list of registered project directories
- switching between projects changes the active data context
- each project is a local directory path containing the expected Strategaize project structure
- no complex project management, no cross-project analytics, no roles/permissions

### Explicitly not included in V1
- full project management tool behavior
- drag-and-drop boards
- team permissions
- workflow automation
- Dify integration
- n8n integration
- Cloud Code remote control
- direct writeback editing for all project files
- advanced analytics
- multi-tenant SaaS architecture
- cross-project analytics or aggregation
- project creation wizard
- role-based access control

## Functional goals

### Goal 1 — Project overview
Provide a clear overview of the selected project:
- current state
- current phase
- current focus
- next steps
- blockers
- last stable version

### Goal 2 — Features visibility
Display project features in a usable structured way.

### Goal 3 — Slices visibility
Display smaller execution units so active work is visible and resumable.

### Goal 4 — Issue visibility
Display known problems, bug reports, and open issue status.

### Goal 5 — Release and migration visibility
Show release history and migration records so technical change history is visible.

### Goal 6 — Decisions and improvements visibility
Show technical decisions and recurring lessons that should improve the broader dev system.

## Non-functional goals

- simple and fast internal usability
- low operational friction
- clear information structure
- extensible architecture for future growth
- compatible with preferred default stack
- suitable for internal hosting and controlled environments

## Delivery Mode
Internal Tool

## Preferred Stack
- Next.js
- Supabase if needed later
- Tailwind CSS
- shadcn/ui
- Docker
- Hetzner
- Coolify

## Initial success criteria

V1 is successful if it allows the user to:
- open the cockpit
- select a project
- see current state clearly
- review features and slices clearly
- review issues, releases, migrations, decisions, and improvements clearly
- resume project work faster than before

## V1 data source strategy

The cockpit reads structured markdown files from local project directories.

### How projects are represented
Each project is a local directory containing the standard Strategaize project structure:
- `docs/STATE.md`
- `docs/PRD.md`
- `docs/KNOWN_ISSUES.md`
- `docs/RELEASES.md`
- `docs/MIGRATIONS.md`
- `docs/DECISIONS.md`
- `docs/SKILL_IMPROVEMENTS.md`
- `features/INDEX.md`
- `slices/INDEX.md`

### V1 data reading rules
- V1 reads markdown files from disk (server-side, via Next.js server components or API routes)
- V1 reads Index files (`features/INDEX.md`, `slices/INDEX.md`) as the primary structured source for list views
- V1 reads single-document records (`docs/STATE.md`, `docs/DECISIONS.md`, etc.) as-is
- Individual feature files (`features/FEAT-*.md`) and slice files (`slices/SLC-*.md`) are **not** read in V1 — only the Index files
- V1 does not include individual detail pages for features or slices — the table view from INDEX.md is the complete visibility layer
- No database is needed in V1 — all data comes from the filesystem
- Parsing assumes the documented markdown structure — malformed files should produce a visible error state, not a crash

### Project registration in V1
V1 uses a simple configuration (e.g., a JSON config file or environment variable) listing project directory paths.
No dynamic project creation, no database-backed project registry.

## Risks

- overbuilding V1 into a full PM platform
- introducing unnecessary complexity too early
- building too much editing logic too soon
- unclear mapping between markdown records and UI views
- scope creep from future ideas before the read-oriented core is stable
- markdown parsing edge cases if project files deviate from expected structure

## Guiding constraint

V1 must stay small, practical, and fast to deliver.
The purpose is to make project visibility operationally useful first.

---

## Produktentwicklung — Stufenmodell

| Stufe | Bezeichnung | Fokus |
|---|---|---|
| V1 | Read-orientiertes Cockpit | Projektsichtbarkeit — Status, Features, Slices, Issues, Releases, Decisions |
| V1.1 | Design-Anpassung | Branding, Theme, visuelle Polish für internes oder kundennahes Erscheinungsbild |
| V2 | Planungs- und Fortschrittscockpit | Backlog-Sicht, Versionen/Roadmap, Fortschritts-Dashboard, minimale Datenpflege |
| V3 | Workspace Foundation | Report-Layer, Nächster-Schritt-Engine, /review-Skill, fester Port |
| V3.1 | Testing Foundation | Unit Test Suite (Vitest) für Kern-Libraries, on-demand Test-Runner |
| V3.2+ | Erweiterte Integration | VS Code Extension, WebSocket-Bridge, LLM-gestützte Empfehlungen |
| V4 | Zentrale Arbeitsoberfläche | Execution Loop, Live-Steuerung, erweiterte Integrationen |

## V2 Problem

V1 zeigt den aktuellen Zustand eines Projekts, aber nicht:
- welche Arbeit offen, geplant oder zurückgestellt ist
- wie Arbeit auf Versionen/Stufen verteilt ist
- wie der Fortschritt über Versionen hinweg aussieht
- welche Prioritäten und Blocker existieren

Projektplanung bleibt damit in Markdown-Dateien und Chatverläufen verborgen.

## V2 Ziel

V2 erweitert das Cockpit um eine Planungs- und Fortschrittsschicht:
- Backlog-Sichtbarkeit: alle offenen Arbeitspakete strukturiert sichtbar
- Versions-/Roadmap-Sicht: Projektstufen und ihr Scope sichtbar
- Fortschritts-Dashboard: aggregierte Fortschritts- und Prioritätsübersicht
- Minimale Datenpflege: grundlegende Möglichkeit, Backlog-Einträge anzulegen und zu pflegen

## V2 Scope — eingeschlossen

### Backlog-Sicht
- Strukturierte Übersicht aller Arbeitspakete
- Kategorien: Bug, Fix, Feature, Improvement, Idea, Later
- Felder pro Eintrag: ID, Titel, Typ, Priorität, Status, Versionszuordnung, Kurzbeschreibung
- Filter-/Sortiermöglichkeiten nach Typ, Priorität, Status, Versionszuordnung
- Datenquelle: strukturierte Backlog-Datei(en) im Repo

### Versionen-/Roadmap-Sicht
- Übersicht der Projektstufen/Versionen (V1, V1.1, V2, V3 etc.)
- Pro Version: Name, Status, Scope-Zusammenfassung, zugeordnete Item-Anzahl, Fortschrittsindikator
- Datenquelle: strukturierte Versions-/Roadmap-Datei im Repo

### Erweitertes Fortschritts-Dashboard
- Erweiterung der bestehenden Übersichtsseite
- Fortschrittsanzeige pro Version
- Prioritätsverteilung über offene Items
- Blocker-Sichtbarkeit
- Zusammenfassung offener Items nach Typ

### Backlog-Datenpflege (minimal)
- Neue Backlog-Einträge anlegen (Typ, Titel, Priorität, Version, Beschreibung)
- Status, Priorität, Versionszuordnung ändern
- Schreibt in strukturierte Repo-Dateien (kein DB-Layer)
- Kein vollständiges Editing-Interface
- Keine Drag-and-Drop-Umorganisation
- Keine Massenoperationen

## V2 Scope — ausdrücklich ausgeschlossen

- Execution-Oberfläche oder Live-Loop
- Claude Code / VS Code Output-Integration
- Approval-Workflows
- QA-/Completion-Berichte als Arbeitsoberfläche
- Datenbank-Einführung
- Multi-User-Editing oder Permissions
- Drag-and-Drop-Board-Logik
- Cross-Project-Aggregation oder -Analytik
- Projekt-Erstellungs-Wizard
- Dify/n8n-Integration
- Erweiterte Automatisierung
- V3-Funktionalität (Execution Loop, Live-Steuerung)

## V2 Datenquelle

- Keine Datenbank
- Repo-nahe strukturierte Dateien
- Konkretes Datenformat wird im Architecture-Schritt entschieden
- Nur minimal notwendige Struktur für V2
- Keine V3-Datenmodellierung vorwegnehmen
- Schreibzugriff beschränkt auf Backlog-Einträge (nicht auf alle Projektdateien)

## V2 Erfolgskriterien

V2 ist erfolgreich, wenn der Nutzer:
- alle offenen Arbeitspakete auf einen Blick sehen kann
- Arbeit nach Typ, Priorität und Version filtern kann
- den Fortschritt pro Version nachvollziehen kann
- Blocker und Prioritäten schnell erkennen kann
- neue Arbeitspakete anlegen kann, ohne Markdown-Dateien manuell bearbeiten zu müssen
- die Planungssicht direkt neben der bestehenden V1-Projektsicht nutzen kann

## V2 Risiken

- Scope-Creep in Richtung vollständiges PM-Tool
- Backlog-Datenformat wird zu komplex oder zu starr
- Schreibzugriff-Scope weitet sich unkontrolliert aus
- Abgrenzung zwischen V2 (Planung) und V3 (Execution) verwischt
- Strukturierte Dateien werden inkonsistent ohne DB-Validierung
- Bestehende V1-Sichten werden durch V2-Erweiterungen destabilisiert

## V2 Offene Punkte (Architecture-Entscheidungen)

1. Backlog-Datenformat: eine Datei oder viele kleine? Markdown, JSON, oder Hybrid?
2. Versions-/Roadmap-Datenformat: Wie werden Versionen und Scope-Zuordnungen abgebildet?
3. Schreibzugriff-Scope: Wie weit geht Write-Capability in V2? Wo beginnt V3?
4. Verhältnis Issues (KNOWN_ISSUES.md) zu Backlog: Koexistenz oder Migration?
5. API-Erweiterung: Neue Routes oder Erweiterung bestehender?
6. Datenvalidierung ohne DB
7. Sidebar-Navigation: Neue Einträge oder Umstrukturierung?
8. Backlog-ID-Vergabe ohne DB-Autoincrement

---

## V3 Problem

V2 macht Planung und Fortschritt sichtbar, aber der eigentliche Arbeitsablauf bleibt fragmentiert:
- Completion Reports existieren nur im Chatverlauf und gehen verloren
- Der Nutzer muss selbst entscheiden, welcher Schritt als nächstes kommt
- Prompts für Claude Code müssen manuell formuliert werden
- Review-Ergebnisse sind nicht persistent und nicht nachvollziehbar
- Der Wechsel zwischen Cockpit (Browser) und Claude Code (VS Code) erfordert viel manuelles Copy-Paste

Projektarbeit bleibt damit in getrennten Tools verstreut, obwohl die Daten für eine bessere Steuerung bereits vorhanden sind.

## V3 Ziel

V3.0 erweitert das Cockpit zum aktiven Arbeitsplatz:
- Reports persistent speichern und im Cockpit anzeigen
- Den nächsten logischen Arbeitsschritt automatisch vorschlagen
- Fertige Prompts generieren und per Ein-Klick-Kopieren bereitstellen
- Review als integrierten Prüfschritt innerhalb von Claude Code ermöglichen
- Eine nachvollziehbare Execution-Historie aufbauen

V3.0 ersetzt Claude Code/VS Code nicht — es macht die Steuerung und Dokumentation der Arbeit besser.

## V3.0 Scope — eingeschlossen

### Report-Speicherung
- Completion Reports als Markdown-Dateien mit YAML-Frontmatter
- Speicherort: `reports/` Verzeichnis im Zielprojekt-Repo
- Felder: ID, Datum, Skill, Slice, Feature, Status, Review-Ergebnis
- Auto-Save: Reports werden am Ende jedes Skill-Durchlaufs automatisch gespeichert
- Datenquelle: Dateisystem (kein DB-Layer)

### Report-Ansicht
- Neue Cockpit-Seite mit Report-Liste
- Filter/Sortierung nach Datum, Skill, Slice, Status
- Report-Detailansicht (Markdown-Rendering)
- Review-Status sichtbar (geprüft/nicht geprüft/Nacharbeit nötig)

### Nächster-Schritt-Engine
- Regelbasierte Empfehlung basierend auf Slice-/Feature-Status
- Berücksichtigt: aktueller Slice-Status, Feature-Reihenfolge, offene Reviews
- Gibt den empfohlenen Skill aus (z.B. `/qa für SLC-005`)
- Generiert einen vollständigen, kontextreichen Prompt
- Ein-Klick-Kopieren des Prompts in die Zwischenablage
- Anzeige auf einer dedizierten Cockpit-Seite

### Execution-Log
- Chronologische Ansicht aller gespeicherten Reports und Reviews
- Sichtbar als Teil der Report-Ansicht (Filterung nach Datum)
- Kein separates Tracking-System — basiert auf gespeicherten Report-Dateien

### /review-Skill
- Neuer Claude Code Skill unter `.claude/skills/`
- Prüft den letzten Completion Report gegen:
  - Slice-Definition und Akzeptanzkriterien
  - Architektur-Vorgaben
  - Relevante Decisions
- Speichert Review-Ergebnis als eigenen Report (Typ: review)
- Gibt strukturiertes Feedback: bestanden / nicht bestanden / offene Punkte

### Workspace-Navigation und Infrastruktur
- Neue Sidebar-Sektion "Workspace" mit:
  - Reports
  - Nächster Schritt
- Fester Cockpit-Port (z.B. 4400) statt Standard 3000
- Port konfiguriert in package.json und/oder .env

## V3.0 Scope — ausdrücklich ausgeschlossen

- API-basierte Execution (keine Anthropic API, keine OpenAI API) (DEC-017)
- Datenbank (DEC-018)
- ChatGPT-Integration (DEC-020)
- VS Code Extension für Prompt-Injection (geparkt für V3.1+)
- WebSocket-Bridge zwischen Cockpit und Claude Code
- Echtzeit-Output-Streaming von Claude Code
- Bash-Bestätigung in der Cockpit-UI
- Vollautonomer Loop ohne menschliche Bestätigung
- Speech-to-Text im Cockpit
- Multi-User / Team-Funktionalität
- /onboard-Skill (separater Arbeitsstrang, eigene Requirements)

## V3.0 Datenquelle

- Keine Datenbank (DEC-018)
- Reports als Markdown-Dateien mit YAML-Frontmatter in `reports/`
- Bestehende V1/V2-Datenquellen bleiben unverändert
- Report-IDs sequenziell generiert (RPT-001, RPT-002, ...) — gleiches Pattern wie Backlog-IDs
- Cockpit liest Reports durch Verzeichnis-Scan, kein separater Index nötig

## V3.0 Erfolgskriterien

V3.0 ist erfolgreich, wenn der Nutzer:
- nach jedem Skill-Durchlauf einen persistent gespeicherten Report im Cockpit sehen kann
- den empfohlenen nächsten Schritt mit fertigem Prompt angezeigt bekommt
- den Prompt mit einem Klick kopieren und in Claude Code einfügen kann
- mit `/review` eine unabhängige Prüfung des Reports durchführen kann
- die Execution-Historie chronologisch nachvollziehen kann
- das Cockpit auf einem festen Port starten kann ohne Konflikte mit Entwicklungsprojekten

## V3.0 Risiken

- Report-Format könnte sich als zu starr oder zu lose herausstellen
- Nächster-Schritt-Logik könnte bei komplexen Projektzuständen falsche Empfehlungen geben
- Auto-Save von Reports erfordert Anpassung der bestehenden Skills (Hooks oder Skill-Erweiterung)
- Fester Port könnte mit anderen Services kollidieren (mitigiert durch ungewöhnlichen Port wie 4400)
- Report-Verzeichnis könnte bei vielen Reports unübersichtlich werden (akzeptabel für V3.0, Archivierung in V3.1+)

## V3.0 Offene Punkte (Architecture-Entscheidungen)

1. Report-Frontmatter-Schema: Exakte Felder und Wertebereiche
2. Report-Dateinamen-Konvention: z.B. `RPT-001-frontend-slc-011.md` oder `RPT-001.md`
3. Auto-Save-Mechanismus: Skill-Erweiterung, Hook, oder manueller Trigger?
4. Nächster-Schritt-Regelwerk: Exakte Logik für Skill-Empfehlung
5. Port-Festlegung: 4400 oder anderer Wert
6. Review-Skill Prüftiefe: Wie detailliert prüft der /review-Skill?
7. Bestehende Sidebar: Dritte Sektion oder Erweiterung der "Planung"-Sektion?

---

## V3.1 Problem

V3.0 hat eine wachsende Codebasis mit drei Kern-Libraries (reports.ts, next-step.ts, backlog.ts) die kritische Logik enthalten: Parsing, ID-Generierung, Regelwerk, Validierung. Es gibt null automatisierte Tests. Regressionen bei zukünftigen Änderungen werden erst im Browser oder durch manuelle Prüfung entdeckt.

## V3.1 Ziel

Automatisierte Unit Tests für die drei Kern-Libraries, die Regressionen auffangen. On-demand ausführbar mit `npm run test`, kein CI/CD-Overhead für ein internes Tool.

## V3.1 Scope — eingeschlossen

### Unit Test Suite
- Vitest als Test-Runner (Dev-Dependency)
- `npm run test` Script (on-demand, kein Watch-Mode als Default)
- Vitest-Konfiguration für Next.js/TypeScript-Kompatibilität

### Test-Abdeckung
- `lib/reports.ts` — Frontmatter-Parsing, ID-Generierung, Read/Write, Fehlertoleranz
- `lib/next-step.ts` — Slice-Parsing, Skill-Erkennung, Regelwerk, Post-Implementation-Workflow, Edge Cases
- `lib/backlog.ts` — Validierung, ID-Generierung, Read/Write

### Test-Fixtures
- Beispiel-Markdown (INDEX.md Varianten, Report-Dateien)
- Beispiel-JSON (backlog.json, roadmap.json)

## V3.1 Scope — ausdrücklich ausgeschlossen

- API Route Tests (Phase 2, bei V4)
- E2E Browser Tests / Playwright (erst bei externen Nutzern)
- CI/CD Pipeline / GitHub Actions (erst bei Hetzner-Deployment)
- Snapshot Tests
- Performance Tests / Security Tests
- Test-Coverage-Reporting
- Watch-Mode als Default

## V3.1 Datenquelle

Keine neuen Datenquellen. Tests lesen/schreiben temporäre Fixture-Dateien, keine Produktionsdaten.

## V3.1 Erfolgskriterien

V3.1 ist erfolgreich, wenn:
- `npm run test` läuft ohne Fehler
- Alle drei Libraries haben die definierten Testfälle
- Tests laufen in unter 5 Sekunden
- Ein absichtlich eingebauter Bug wird vom Test erkannt

## V3.1 Risiken

- Vitest-Konfiguration mit Next.js 16 / TypeScript könnte Anpassung brauchen
- File-System-Tests brauchen temporäre Verzeichnisse (Cleanup-Logik nötig)
- Path-Handling Windows vs. Unix könnte in Tests abweichen

## V3.1 Offene Punkte (Architecture-Entscheidungen)

1. Vitest-Konfiguration: `vitest.config.ts` oder in `package.json`?
2. Test-Fixtures: Inline im Test oder separate Fixture-Dateien?
3. File-System-Tests: Echte temp-Verzeichnisse oder Mocks?

## V3.1 Delivery-Mode-Steuerung

Test-Tiefe richtet sich nach dem Delivery Mode des jeweiligen Projekts:
- `internal-tool`: Unit Tests on-demand (V3.1-Scope)
- `client-app`: Unit + API Tests, E2E empfohlen, bei jedem Build
- `saas`: Alles + CI/CD + Security + Performance

Das Cockpit ist `internal-tool` — V3.1-Scope ist dafür ausreichend.
