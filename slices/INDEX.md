# Slices Index

## V1 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-001 | Project Shell | FEAT-001 | done | high | Next.js app, layout, sidebar nav, 6 page routes |
| SLC-002 | Project Selector | FEAT-001 | done | high | Project config, context switch, localStorage persistence |
| SLC-003 | State View | FEAT-001 | done | high | Overview dashboard from STATE.md + PRD.md |
| SLC-004 | Features Table | FEAT-002 | done | high | Data table from features/INDEX.md |
| SLC-005 | Slices Table | FEAT-003 | done | high | Data table from slices/INDEX.md with resume highlighting |
| SLC-006 | Issues View | FEAT-004 | done | medium | Card list from KNOWN_ISSUES.md |
| SLC-007 | Releases & Migrations View | FEAT-005 | done | medium | Two stacked card sections from RELEASES.md + MIGRATIONS.md |
| SLC-008 | Decisions & Improvements View | FEAT-006 | done | medium | Two stacked card sections from DECISIONS.md + SKILL_IMPROVEMENTS.md |

## Build order

### Phase 1 — Foundation (sequential)
1. **SLC-001** — Project Shell (no dependencies)
2. **SLC-002** — Project Selector (depends on SLC-001)
3. **SLC-003** — State View (depends on SLC-001 + SLC-002, establishes markdown parsing pattern)

### Phase 2 — Table views (sequential, reuses table pattern)
4. **SLC-004** — Features Table (establishes data table + badge pattern)
5. **SLC-005** — Slices Table (reuses table + badge pattern from SLC-004)

### Phase 3 — Card list views (sequential, reuses card pattern)
6. **SLC-006** — Issues View (establishes card list pattern)
7. **SLC-007** — Releases & Migrations View (reuses card pattern, adds two-section layout)
8. **SLC-008** — Decisions & Improvements View (reuses card + two-section pattern)

### Parallelization notes
- Phase 2 and Phase 3 are independent of each other (both depend only on Phase 1)
- Within each phase, the second slice reuses patterns from the first — sequential build is recommended
- SLC-004 + SLC-006 could run in parallel if two implementation sessions are available

---

## V2 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-009 | V2 Fundament (Read) | FEAT-007, FEAT-008 | done | high | Backlog-Library (read-only), Backlog-API (GET), Sidebar V2, Platzhalter-Seiten |
| SLC-010 | Roadmap-Backend | FEAT-008 | done | high | Roadmap-Library, Roadmap-API (GET), Fortschrittsberechnung |
| SLC-011 | Backlog-Ansicht | FEAT-007 | done | high | Backlog-Seite mit Tabelle/Karten, Filter, Sortierung |
| SLC-012 | Roadmap-Ansicht | FEAT-008 | done | high | Roadmap-Seite mit Versionskarten und Fortschrittsbalken |
| SLC-013 | Backlog-Eintrag erstellen | FEAT-010 | done | medium | Write-Logik, POST-Route, Erstellen-Dialog |
| SLC-014 | Backlog-Eintrag bearbeiten | FEAT-010 | done | medium | PATCH-Route, Inline-Bearbeitung (Status, Priorität, Version) |
| SLC-015 | Dashboard-Erweiterung | FEAT-009 | done | medium | Übersichtsseite erweitert um Fortschritt, Prioritäten, Blocker |

### V1-Dateien die in V2 modifiziert werden
- `/app/src/components/sidebar.tsx` — Sektions-Labels und neue Nav-Items (SLC-009)
- `/app/src/app/page.tsx` — Planungsfortschritt-Sektion (SLC-015)

## V2 Build order

### Phase 1 — Read Foundation (sequential)
1. **SLC-009** — V2 Fundament Read (keine Abhängigkeiten — Grundlage für alle V2-Slices)
2. **SLC-010** — Roadmap-Backend (abhängig von SLC-009 — nutzt readBacklogItems)

### Phase 2 — Read Views (partially parallel)
3. **SLC-011** — Backlog-Ansicht (abhängig von SLC-009)
4. **SLC-012** — Roadmap-Ansicht (abhängig von SLC-009 + SLC-010)

### Phase 3 — Write (sequential)
5. **SLC-013** — Backlog-Eintrag erstellen (abhängig von SLC-011 — Create-UI integriert in Backlog-Ansicht)
6. **SLC-014** — Backlog-Eintrag bearbeiten (abhängig von SLC-013 — baut auf Write-Logik auf)

### Phase 4 — Dashboard
7. **SLC-015** — Dashboard-Erweiterung (abhängig von SLC-009 + SLC-010)

### Parallelization notes
- Phase 1 ist strikt sequenziell (SLC-010 nutzt backlog.ts aus SLC-009)
- SLC-011 kann starten sobald SLC-009 fertig ist (parallel zu SLC-010)
- SLC-012 braucht beide Phase-1-Slices
- Phase 3 ist strikt sequenziell: erst Create (SLC-013), dann Update (SLC-014)
- SLC-015 ist unabhängig von Phase 3 und kann parallel zu SLC-013/SLC-014 laufen
- SLC-015 braucht nur die Read-APIs (SLC-009 + SLC-010), keine Write-APIs

---

## V3 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-016 | V3 Fundament (Port + Report-Library + Sidebar) | FEAT-011, FEAT-014 | done | high | Port 4400, lib/reports.ts, Sidebar "Workspace", Platzhalter-Seiten |
| SLC-017 | Report-API | FEAT-011 | done | high | GET + POST /api/reports, Validierung, Response-Pattern |
| SLC-018 | Report-Ansicht | FEAT-012 | done | high | Report-Liste mit Filter/Sortierung, Detail-Ansicht, Markdown-Rendering |
| SLC-019 | Nächster-Schritt-Engine | FEAT-013 | done | high | lib/next-step.ts Regelwerk + Prompt-Generierung, GET /api/next-step |
| SLC-020 | Nächster-Schritt-Ansicht | FEAT-013 | done | high | Empfehlungs-Seite mit Prompt-Anzeige + Ein-Klick-Kopieren |
| SLC-021 | /review-Skill + Report-Save | FEAT-015, FEAT-011 | done | high | /review Skill-Prompt, CLAUDE.md Report-Save-Instruktion |

### V1/V2-Dateien die in V3 modifiziert werden
- `/app/src/components/sidebar.tsx` — Dritte Sektion "Workspace" mit 2 neuen Nav-Items (SLC-016)
- `/app/package.json` — Dev-Script Port auf 4400 ändern (SLC-016)
- `/CLAUDE.md` — Report-Save-Instruktion hinzufügen (SLC-021)

## V3 Build order

### Phase 1 — Foundation (sequential)
1. **SLC-016** — V3 Fundament (keine Abhängigkeiten — Grundlage für alle V3-Slices)
2. **SLC-017** — Report-API (abhängig von SLC-016 — nutzt lib/reports.ts)

### Phase 2 — Views + Engine (partially parallel)
3. **SLC-018** — Report-Ansicht (abhängig von SLC-017 — nutzt GET /api/reports)
4. **SLC-019** — Nächster-Schritt-Engine (abhängig von SLC-016 — nutzt lib/reports.ts + lib/markdown.ts)

### Phase 3 — Nächster-Schritt-View
5. **SLC-020** — Nächster-Schritt-Ansicht (abhängig von SLC-019 — nutzt GET /api/next-step)

### Phase 4 — Skill (independent)
6. **SLC-021** — /review-Skill + Report-Save (unabhängig von Cockpit-Code, kann parallel zu jeder Phase laufen)

### Parallelization notes
- Phase 1 ist strikt sequenziell (SLC-017 nutzt reports.ts aus SLC-016)
- SLC-018 und SLC-019 können parallel laufen (beide abhängig von Phase 1, aber nicht voneinander)
- SLC-020 braucht SLC-019 (nutzt die API)
- SLC-021 ist vollständig unabhängig vom Cockpit-Code — kann jederzeit nach SLC-016 gebaut werden
- SLC-021 muss vor dem ersten echten Einsatz fertig sein, sonst fehlt die Report-Save-Logik

---

## V3.1 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-022 | Vitest Setup + Fixtures | FEAT-016 | done | high | Vitest installieren, vitest.config.ts, npm Scripts, Fixture-Dateien |
| SLC-023 | Unit Tests reports.ts | FEAT-016 | done | high | 12 Testfälle: Frontmatter-Parsing, ID-Gen, Read/Write, Fehlertoleranz |
| SLC-024 | Unit Tests next-step.ts | FEAT-016 | done | high | 17 Testfälle: Slice-Parsing, Skill-Erkennung, Regelwerk, Post-Impl |
| SLC-025 | Unit Tests backlog.ts | FEAT-016 | done | high | 13 Testfälle: Validierung, ID-Gen, Read/Write, Edge Cases |
| SLC-026 | Engine: Multi-Version-Empfehlung | BL-021 | done | high | Offene ältere Schritte + aktuelle Version parallel anzeigen |

## V3.1 Build order

### Phase 1 — Foundation
1. **SLC-022** — Vitest Setup + Fixtures (keine Abhängigkeiten)

### Phase 2 — Tests (parallel)
2. **SLC-023** — Unit Tests reports.ts (abhängig von SLC-022)
3. **SLC-024** — Unit Tests next-step.ts (abhängig von SLC-022)
4. **SLC-025** — Unit Tests backlog.ts (abhängig von SLC-022)

### Phase 3 — Engine (independent)
5. **SLC-026** — Engine Multi-Version (unabhängig von Tests, kann parallel laufen)

### Parallelization notes
- SLC-023, SLC-024, SLC-025 sind vollständig voneinander unabhängig
- SLC-026 ist unabhängig von den Test-Slices
- Empfohlen: SLC-022 → SLC-023 → SLC-024 → SLC-025 sequenziell (Pattern-Wiederverwendung)
- SLC-026 kann jederzeit nach SLC-022 eingeschoben werden

---

## V4 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-027 | Design Foundation (Theme + CSS) | FEAT-017 | done | high | theme.ts neu, globals.css aktualisieren, Gradient-Utilities, Spacing-System |
| SLC-028 | Shared Components Upgrade | FEAT-021, FEAT-022 | done | high | status-badges.ts Gradient-Refactor, Card Hover, Button Gradient, Badge Shadow |
| SLC-029 | Sidebar Redesign | FEAT-018 | done | high | Gradient-Background, Active-Glow, Logo-Gradient, Section-Header |
| SLC-030 | Übersichtsseite Premium | FEAT-019, FEAT-023 | done | high | Header-Banner, KPI-Cards Premium, Fortschritts-Upgrade |
| SLC-031 | Tabellen-Seiten Premium | FEAT-020, FEAT-023 | done | high | Features, Slices, Backlog, Reports — Gradient-Top-Border, Row-Hover, Action-Icons |
| SLC-032 | Card/Timeline-Seiten Premium | FEAT-023 | done | medium | Issues, Releases, Decisions, Roadmap — Timeline-Dots, Card-Upgrade |
| SLC-033 | Workspace-Seiten Premium | FEAT-023, FEAT-022 | done | medium | Nächster Schritt: Dunkler Prompt-Block, Aufgaben-Liste. Loading-Spinner |

### V1/V2/V3-Dateien die in V4 modifiziert werden
- `/app/src/lib/theme.ts` — Komplett neu (SLC-027)
- `/app/src/app/globals.css` — Variablen, Gradients, Utilities (SLC-027)
- `/app/src/lib/status-badges.ts` — Gradient-Badges (SLC-028)
- `/app/src/components/ui/card.tsx` — Hover-Transform (SLC-028)
- `/app/src/components/ui/badge.tsx` — Gradient-Support (SLC-028)
- `/app/src/components/ui/button.tsx` — Primary-Gradient (SLC-028)
- `/app/src/components/ui/empty-state.tsx` — Icon-Kreis (SLC-028)
- `/app/src/components/sidebar.tsx` — Gradient, Active-Glow (SLC-029)
- `/app/src/app/page.tsx` — Header-Banner, KPI Premium (SLC-030)
- `/app/src/app/features/page.tsx` — Premium-Tabelle (SLC-031)
- `/app/src/app/slices/page.tsx` — Premium-Tabelle, Fortschrittsbalken (SLC-031)
- `/app/src/app/backlog/page.tsx` — Premium-Tabelle (SLC-031)
- `/app/src/app/reports/page.tsx` — Premium-Tabelle (SLC-031)
- `/app/src/app/issues/page.tsx` — Card-Upgrade (SLC-032)
- `/app/src/app/releases/page.tsx` — Timeline-Style (SLC-032)
- `/app/src/app/decisions/page.tsx` — Card-Upgrade (SLC-032)
- `/app/src/app/roadmap/page.tsx` — Timeline-Meilensteine (SLC-032)
- `/app/src/app/next-step/page.tsx` — Prompt-Block, Aufgaben-Liste (SLC-033)

## V4 Build order

### Phase 1 — Foundation (sequential, muss zuerst)
1. **SLC-027** — Design Foundation (keine Abhängigkeiten — Basis für alles)
2. **SLC-028** — Shared Components Upgrade (abhängig von SLC-027 — nutzt neue Tokens)

### Phase 2 — Shell + Übersicht (parallel möglich)
3. **SLC-029** — Sidebar Redesign (abhängig von SLC-027)
4. **SLC-030** — Übersichtsseite Premium (abhängig von SLC-027 + SLC-028)

### Phase 3 — Restliche Seiten (parallel möglich)
5. **SLC-031** — Tabellen-Seiten Premium (abhängig von SLC-028)
6. **SLC-032** — Card/Timeline-Seiten Premium (abhängig von SLC-028)
7. **SLC-033** — Workspace-Seiten Premium (abhängig von SLC-028)

### Parallelization notes
- Phase 1 ist strikt sequenziell (SLC-028 braucht die neuen Tokens aus SLC-027)
- SLC-029 und SLC-030 können parallel laufen (beide brauchen nur Foundation)
- SLC-031, SLC-032, SLC-033 sind voneinander unabhängig
- Empfohlen: SLC-031 vor SLC-032 (Tabellen-Pattern etabliert das wiederverwendbare Muster)

## Status values
- planned
- ready
- in_progress
- blocked
- qa_pending
- done

## Slice rule
Slices should remain small enough to:
- fit within manageable implementation context
- be testable in isolation
- support reliable resume after interruption
- reduce accidental breakage during AI-assisted coding
