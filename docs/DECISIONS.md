# DECISIONS

## DEC-001 — The cockpit is an internal tool in V1
- Status: accepted
- Reason:
  The first version should stay small, controlled, and useful without carrying the weight of client-app or SaaS-level complexity.
- Consequence:
  V1 follows internal-tool delivery mode and lighter operational rigor than later external-facing products.

## DEC-002 — V1 is read-oriented, not a full editing platform
- Status: accepted
- Reason:
  The main current problem is lack of project visibility, not lack of editing interfaces.
- Consequence:
  V1 focuses on displaying project information clearly. Broad writeback/editing capability is deferred.

## DEC-003 — The cockpit is the first real validation project for Strategaize Dev System
- Status: accepted
- Reason:
  The system should be tested through a real internal project instead of only through theory.
- Consequence:
  This project should follow the dev-system structure with enough discipline to validate it in practice.

## DEC-004 — The cockpit should not become a Jira replacement in V1
- Status: accepted
- Reason:
  Building a full PM platform would create unnecessary scope, delay useful delivery, and distract from the real purpose.
- Consequence:
  No boards, no workflow engine, no permissions system, and no full PM feature set in V1.

## DEC-005 — The preferred V1 stack follows the default Strategaize stack
- Status: accepted
- Reason:
  Consistency with the master system improves reuse, speed, and maintainability.
- Consequence:
  V1 uses Next.js, Tailwind CSS, shadcn/ui, Docker, Hetzner, and Coolify as the main direction.

## DEC-006 — Multi-project is part of V1 as a lightweight project selector
- Status: accepted (updated 2026-03-18)
- Reason:
  The cockpit is intended to support multiple projects. A simple project selector is operationally needed from the start to switch between active projects.
- Consequence:
  V1 includes a simple project selector that reads from a static configuration. No complex multi-project management, no cross-project analytics, no roles/permissions. The selector is a context switch, not a management interface.

## DEC-007 — Visibility first, automation later
- Status: accepted
- Reason:
  The immediate bottleneck is lack of operational visibility and reliable resume capability.
- Consequence:
  Advanced automation, integrations, and editing should remain out of scope until visibility is working well.

## DEC-009 — V1 uses two UI patterns: data tables for index views, card lists for record views
- Status: accepted
- Reason:
  Index files (features/INDEX.md, slices/INDEX.md) produce rows with 5-6 short columns — these fit well in data tables. Record-based views (issues, releases, migrations, decisions, improvements) have 5-8 fields per entry — these are too dense for table columns and read better as stacked card lists with labeled fields.
- Consequence:
  FEAT-002 (Features) and FEAT-003 (Slices) use data tables. FEAT-004, FEAT-005, and FEAT-006 use card lists. This creates two consistent UI patterns across the cockpit.

## DEC-010 — Combined views use stacked sections, not tabs in V1
- Status: accepted
- Reason:
  FEAT-005 (Releases & Migrations) and FEAT-006 (Decisions & Improvements) each combine two record types on one page. Stacked sections with clear headings are simpler to implement and review than a tab component, and both sections are typically short enough to fit on one scroll.
- Consequence:
  V1 uses vertically stacked sections with section headings. Tabs may be reconsidered later if lists grow long.

## DEC-008 — Repeated problems should feed back into system improvement
- Status: accepted
- Reason:
  The dev system should evolve based on real repeated findings, not arbitrary changes.
- Consequence:
  Skill improvement and lessons-learned records are part of the project and system logic.

## DEC-012 — V2 verwendet keine Datenbank
- Status: accepted
- Reason:
  V2 ist ein Planungs- und Fortschrittscockpit, kein datenintensives System. Eine Datenbank würde unnötige Infrastruktur-Komplexität einführen und V3-Entscheidungen vorwegnehmen. Repo-nahe strukturierte Dateien sind für V2 ausreichend.
- Consequence:
  V2 verwendet strukturierte Dateien im Repo als Datenquelle (Format wird im Architecture-Schritt entschieden). Kein Supabase, kein SQLite, kein anderer DB-Layer in V2. Schreibzugriff erfolgt direkt auf Dateien.

## DEC-013 — V2 ist Planungssicht, nicht Execution-Oberfläche
- Status: accepted
- Reason:
  V2 soll die Sichtbarkeit auf Planung und Fortschritt erweitern. Execution-Funktionalität (Live-Loop, Claude Code Integration, Approvals) gehört in V3. Die Grenze muss hart bleiben, damit V2 fokussiert und lieferbar bleibt.
- Consequence:
  V2 beschränkt den Schreibzugriff auf minimale Backlog-Datenpflege (Einträge anlegen, Status/Priorität ändern). Keine Workflow-Automation, keine IDE-Integration, keine Approval-Prozesse, keine QA-Reports als Arbeitsoberfläche.

## DEC-014 — Issues und Backlog koexistieren in V2
- Status: accepted
- Reason:
  KNOWN_ISSUES.md ist Teil der etablierten Strategaize-Projektstruktur und wird von der bestehenden Issues-Ansicht (FEAT-004) gelesen. Der neue Backlog (FEAT-007) ist eine separate Planungsschicht mit eigener Datenquelle (planning/backlog.json). Die Backlog-Kategorie "Bug" überlappt funktional mit Issues, aber eine Migration oder Konsolidierung in V2 würde die V1-Stabilität gefährden und unnötige Komplexität einführen.
- Consequence:
  V2 betreibt zwei parallele Sichten: Issues (Markdown, read-only) und Backlog (JSON, read/write). Konsolidierung wird auf V3 verschoben. Die Trennung muss im UI durch klare Sektions-Labels sichtbar sein.

## DEC-015 — V2 verwendet JSON-Dateien in planning/ für neue Daten
- Status: accepted
- Reason:
  V2 braucht Schreibzugriff auf Backlog-Daten. Markdown ist für Write-Back fragil (Tabellen-Formatierung, Edge Cases). JSON ist trivial serialisierbar/deserialisierbar, strukturell eindeutig und für programmatischen Zugriff geeignet. Die Dateien leben im Projekt-Repo und sind damit "repo-nah" wie gefordert.
- Consequence:
  Neue V2-Daten werden als JSON-Dateien unter `planning/` im Zielprojekt gespeichert: `planning/backlog.json` und `planning/roadmap.json`. Bestehende Markdown-Quellen (V1) bleiben unverändert. V2 führt damit ein zweites Datenformat (JSON) neben dem bestehenden (Markdown) ein.

## DEC-016 — V2 Sidebar verwendet Sektions-Gruppierung
- Status: accepted
- Reason:
  V2 fügt zwei neue Navigationseinträge hinzu (Backlog, Roadmap). Um die bestehende V1-Navigation nicht zu stören und die V2-Planungssicht klar abzugrenzen, wird die Sidebar in zwei Sektionen gruppiert: "Projekt" (V1-Sichten) und "Planung" (V2-Sichten).
- Consequence:
  Die Sidebar erhält Sektions-Labels. Die bestehenden 6 V1-Einträge bleiben unverändert unter "Projekt". Die 2 neuen V2-Einträge (Backlog, Roadmap) erscheinen unter "Planung". Die Reihenfolge der V1-Items ändert sich nicht.

## DEC-017 — V3 verwendet keine externe LLM-API (kein OpenAI, kein Anthropic API)
- Status: accepted
- Reason:
  Der User hat ein bestehendes Claude Max-Abo das Claude Code abdeckt. Eine zusätzliche API-Nutzung (Anthropic oder OpenAI) würde $50-150+/Monat Extra-Kosten verursachen für Funktionalität die Claude Code bereits bietet. Für das Einsatzprofil (interne Tools, kleinere Kundenprojekte) ist der Qualitätsgewinn eines zweiten LLM-Systems nicht gerechtfertigt.
- Consequence:
  V3 baut keine API-basierte Execution-Engine. Execution bleibt in Claude Code/VS Code. Das Cockpit ist Steuerungs- und Sichtbarkeitsschicht. Ein `/review`-Skill ersetzt die ChatGPT-Prüfung. Kann in V3.2+ revidiert werden falls sich Kosten/Nutzen-Verhältnis ändert.

## DEC-018 — V3 verwendet keine Datenbank
- Status: accepted
- Reason:
  V3 erweitert das Cockpit um Reports und Workspace-Funktionalität. Wie V2 bleibt das System dateibasiert (JSON + Markdown). Für ein Single-User internes Tool ist keine DB-Infrastruktur nötig.
- Consequence:
  Reports werden als Markdown-Dateien mit YAML-Frontmatter gespeichert (DEC-021). Keine Supabase, kein SQLite. Gleicher Ansatz wie V2 planning/ Dateien.

## DEC-019 — Cockpit bekommt einen dedizierten festen Port
- Status: accepted
- Reason:
  Das Cockpit läuft auf localhost parallel zu anderen Next.js-Entwicklungsprojekten die typischerweise Port 3000 nutzen. Port-Kollisionen müssen vermieden werden.
- Consequence:
  Cockpit wird auf einen festen Port konfiguriert (z.B. 4400), weit entfernt von Standard-Entwicklungsports. Konfiguration in package.json dev-Script oder .env.

## DEC-020 — ChatGPT als Review-Instanz wird durch internen /review-Skill ersetzt
- Status: accepted
- Reason:
  ChatGPT wurde als unabhängige Prüfinstanz für Completion Reports verwendet. Ein interner /review-Skill hat vollen Projektkontext (Slice-Definition, Akzeptanzkriterien, Architektur, Decisions) und liefert gleichwertige Ergebnisse ohne Extra-Kosten oder Copy-Paste-Aufwand.
- Consequence:
  Kein OpenAI-Account oder -API nötig. Review läuft komplett innerhalb von Claude Code. Reports werden gegen Projektdateien geprüft.

## DEC-021 — Reports verwenden YAML-Frontmatter in Markdown-Dateien
- Status: accepted
- Reason:
  Reports müssen sowohl maschinenlesbar (für Cockpit-API) als auch menschenlesbar (für direktes Öffnen im Editor) sein. YAML-Frontmatter ist der Standard für Markdown-Metadaten (Hugo, Jekyll, MDX). JSON-Frontmatter wäre technisch möglich, aber weniger lesbar. Das einfache Key-Value-Format der Frontmatter ist ohne externe Abhängigkeiten parsebar.
- Consequence:
  Reports werden als `.md`-Dateien mit `---`-delimitiertem YAML-Frontmatter gespeichert. Felder: id, date, skill, slice, feature, type, status. Parser wird als einfache Regex/String-Verarbeitung in `lib/reports.ts` implementiert — kein `gray-matter` oder andere npm-Abhängigkeiten nötig.

## DEC-022 — Reports werden in reports/ im Zielprojekt-Repo gespeichert
- Status: accepted
- Reason:
  Reports gehören zum Projekt, nicht zum Cockpit. Sie dokumentieren die Arbeitsschritte an einem spezifischen Projekt und sollen auch ohne Cockpit lesbar und versionierbar sein. Das `reports/`-Verzeichnis erweitert die Strategaize-Projektstruktur neben `docs/`, `features/`, `slices/`, `planning/`.
- Consequence:
  Jedes Projekt-Repo erhält ein `reports/`-Verzeichnis (on-demand erstellt). Reports werden als einzelne Markdown-Dateien gespeichert (RPT-001.md, RPT-002.md, ...). Der Cockpit liest sie per Verzeichnis-Scan, kein separater Index nötig.

## DEC-023 — Nächster-Schritt-Engine ist regelbasiert in V3.0
- Status: accepted
- Reason:
  Eine LLM-gestützte Empfehlung würde API-Kosten verursachen (DEC-017 verbietet das). Regelbasierte Logik ist für die vorhandene Projektstruktur (Slices mit Status, Features mit Reihenfolge) ausreichend und deterministisch. Die Engine liest Slice-Status, Report-Historie und Feature-Phase und leitet daraus den nächsten Skill ab.
- Consequence:
  Die Nächster-Schritt-Logik wird als serverseitige Funktion in `lib/next-step.ts` implementiert. Keine LLM-Aufrufe. Kann in V3.1+ optional durch LLM-Empfehlungen ergänzt werden.

## DEC-024 — Report-Speicherung erfolgt durch Claude Code Datei-Write
- Status: accepted
- Reason:
  Claude Code hat bereits vollen Dateisystem-Zugriff und schreibt Projektdateien direkt. Ein separater API-Endpunkt zum Speichern wäre redundant. Die CLAUDE.md Completion-Report-Regel kann so erweitert werden, dass Reports automatisch als Datei gespeichert werden.
- Consequence:
  Skills und die CLAUDE.md-Instruktion werden so angepasst, dass Completion Reports nach jedem nicht-trivialen Arbeitsschritt als Markdown-Datei in `reports/` gespeichert werden. Das Cockpit benötigt nur Read-APIs für Reports. Ein POST /api/reports wird für zukünftige Nutzung bereitgestellt, ist aber in V3.0 nicht primärer Speicherweg.

## DEC-025 — Cockpit-Port ist 4400
- Status: accepted
- Reason:
  Port 4400 liegt weit von Standard-Entwicklungsports entfernt (3000, 3001, 5173, 8080). Er ist leicht merkbar und kollidiert nicht mit gängigen Services.
- Consequence:
  `package.json` dev-Script wird auf Port 4400 konfiguriert. `.env` enthält PORT=4400 als Fallback. Dokumentation und Sidebar-Branding können den Port referenzieren.

## DEC-026 — Sidebar erhält dritte Sektion "Workspace"
- Status: accepted
- Reason:
  V3 fügt zwei neue Workspace-bezogene Seiten hinzu (Reports, Nächster Schritt). Diese sind funktional verschieden von den bestehenden Sektionen "Projekt" (V1, Read-Ansichten) und "Planung" (V2, Backlog/Roadmap). Eine dritte Sektion macht die Trennung sichtbar und erhält die bestehende Navigation unverändert.
- Consequence:
  Sidebar zeigt drei Sektionen: "Projekt" (6 Items), "Planung" (2 Items), "Workspace" (2 Items). Bestehende V1/V2-Items werden nicht verschoben oder umbenannt.

## DEC-011 — V1 cockpit UI language is German
- Status: accepted
- Reason:
  The cockpit is intended for internal day-to-day use in a German working context. A mixed-language user interface reduces clarity and makes the product feel inconsistent. The current frontend slices already show that user-facing labels, helper text, empty states, and fallback messages should follow one language consistently.
- Consequence:
  All user-facing UI copy in V1 should be German. This includes sidebar labels, page headings, card titles, section labels, loading states, empty states, error/fallback states, helper text, and user-visible status wording controlled by the UI layer.
  
  Technical internals may remain English where that improves implementation clarity, including route paths, file names, component names, type names, and internal API naming not directly shown to the user.
  
  Content rendered from source project files may remain in the language in which it is authored unless it is deliberately rewritten at source level. V1 does not introduce multilingual support, locale switching, or a full i18n framework.