# ARCHITECTURE

## Purpose

This document defines the initial architecture for Strategaize Project Cockpit V1.

The goal of V1 is not to create a full project management platform, but a small internal cockpit that reads and displays structured project information in a usable interface.

## Architectural intent

The cockpit should act as a read-oriented internal visibility layer over structured project records.

The system should:

- display project state clearly
- display features clearly
- display slices clearly
- display issues, releases, migrations, decisions, and improvements clearly
- remain small and extensible
- avoid overengineering in V1

## V1 architecture direction

### Application type
- internal web application

### Delivery mode
- internal-tool

### Hosting direction
- local development
- staging and later production deployment on Hetzner via Coolify
- Docker-based deployment path

## Preferred stack

### Frontend
- Next.js

### Styling
- Tailwind CSS

### UI layer
- shadcn/ui

### Backend direction
For V1, backend complexity should remain minimal.

The first implementation direction should prefer a simple read-oriented internal architecture that can later evolve if needed.

### Data source direction
The cockpit is intended to represent structured project records such as:
- state
- PRD
- feature index
- slice index
- issues
- releases
- migrations
- decisions
- skill improvements

V1 should prioritize reading structured project information in a controlled way.

## Initial architectural model

### Layer 1 — UI
User-facing cockpit pages and views.

Main responsibilities:
- layout
- navigation
- project selection
- section views
- clean internal presentation of project records

### Layer 2 — Application logic
Responsible for:
- loading project record sources
- transforming raw records into usable view models
- handling section-level display logic

### Layer 3 — Project data records
Structured project records remain the underlying source of truth.

These include:
- `docs/STATE.md`
- `docs/PRD.md`
- `features/INDEX.md`
- `slices/INDEX.md`
- later issue, release, migration, and decision records

## Key architectural constraints

### 1. V1 remains read-oriented
V1 should not try to become a full editing layer for all project records.

### 2. Scope must stay small
The architecture should support future growth, but V1 must remain operationally small.

### 3. Visibility first, automation later
The cockpit should first solve visibility and resume problems.
Automation and advanced editing can come later if justified.

### 4. Project-first structure
The architecture should support multiple projects over time, even if V1 starts with a simpler project selection model.

### 5. Controlled extensibility
It should be possible later to add:
- richer project views
- writeback functionality
- more automation
- stronger integrations

But these should not complicate V1 unnecessarily.

## Core V1 views

The initial architecture should support these core views:

- Project Overview
- Features View
- Slices View
- Bugs / Issues View
- Releases / Migrations View
- Decisions / Skill Improvements View

## Initial implementation direction

V1 should be implemented as a simple internal application shell with:
- project layout
- project selection pattern
- overview panel
- structured record tables or lists for feature and slice visibility
- additional views for the remaining records

## Risks

### Risk 1 — scope creep
There is a strong risk of turning the cockpit into a full internal project management platform too early.

### Risk 2 — excessive abstraction
There is a risk of designing too much future-proofing before the basic read-oriented cockpit is validated.

### Risk 3 — unclear source mapping
If structured project records are inconsistent, the cockpit UI may become harder to implement cleanly.

### Risk 4 — premature automation
There is a risk of introducing automation, editing, or integration complexity before the visibility layer is stable.

## Architectural conclusion (V1)

The correct architecture for V1 is a small internal web application with a clear UI structure and a controlled read-oriented data flow.

It should solve project visibility first, validate the system structure in practice, and leave room for later growth without trying to do everything at once.

---

## V2 Architecture Direction

### V2 architectural intent

V2 erweitert das Cockpit von einem read-orientierten Sichtbarkeits-Tool zu einem Planungs- und Fortschrittscockpit. Die V1-Architektur bleibt vollständig erhalten — V2 fügt neue Schichten hinzu, ohne bestehende zu ändern.

V2 ergänzt:
- eine neue Datenschicht für Backlog- und Roadmap-Informationen
- Lese- und minimale Schreibfähigkeit für Backlog-Einträge
- aggregierte Fortschrittssichtbarkeit auf dem Übersichts-Dashboard
- zwei neue Ansichten (Backlog, Roadmap) in der Navigation

### V2 application type
- internal web application (unverändert)

### V2 delivery mode
- internal-tool (unverändert)

### V2 stack
- Next.js, Tailwind CSS, shadcn/ui (unverändert)
- Keine Datenbank (DEC-012)
- JSON-Dateien als Datenformat für V2-Daten (DEC-015)

---

## V2 Data Architecture

### Datenort

V2-Daten leben in den Zielprojekt-Repos in einem neuen `planning/`-Verzeichnis:
- `planning/backlog.json` — alle Backlog-Einträge
- `planning/roadmap.json` — Versions-/Roadmap-Definitionen

Dies erweitert die Strategaize-Projektstruktur über `docs/`, `features/`, `slices/` hinaus.

### Warum JSON statt Markdown

V1 liest Markdown-Dateien. Für V2 ist JSON die richtige Wahl:
- V2 braucht Schreibzugriff — JSON ist trivial serialisierbar/deserialisierbar
- Markdown-Parsing ist fragil für Write-Back (Tabellen-Formatierung, Edge Cases)
- Backlog-Daten sind strukturelle Daten, kein Fließtext
- JSON-Dateien im Repo bleiben "repo-nah" wie gefordert
- Bestehende Markdown-Quellen (V1) bleiben unverändert

### Backlog-Schema (`planning/backlog.json`)

```json
{
  "items": [
    {
      "id": "BL-001",
      "title": "Titel des Eintrags",
      "type": "bug | fix | feature | improvement | idea | later",
      "priority": "high | medium | low",
      "status": "open | in_progress | done | deferred | blocked",
      "version": "V2 | null",
      "description": "Kurzbeschreibung",
      "createdAt": "2026-03-20"
    }
  ]
}
```

Felder:
- `id` — Pflicht, generiert (BL-XXX)
- `title` — Pflicht, Freitext
- `type` — Pflicht, Enum: bug, fix, feature, improvement, idea, later
- `priority` — Pflicht, Enum: high, medium, low
- `status` — Pflicht, Enum: open, in_progress, done, deferred, blocked
- `version` — Optional, Freitext (Referenz auf Versions-ID aus roadmap.json)
- `description` — Optional, Freitext
- `createdAt` — Pflicht, generiert (ISO-Datum)

### Roadmap-Schema (`planning/roadmap.json`)

```json
{
  "versions": [
    {
      "id": "v1",
      "name": "V1",
      "status": "released | active | planned | deferred",
      "summary": "Read-orientiertes Cockpit",
      "order": 1
    }
  ]
}
```

Felder:
- `id` — Pflicht, eindeutiger Schlüssel (z.B. "v1", "v1.1", "v2")
- `name` — Pflicht, Anzeigename (z.B. "V1", "V1.1", "V2")
- `status` — Pflicht, Enum: released, active, planned, deferred
- `summary` — Pflicht, kurze Scope-Beschreibung
- `order` — Pflicht, Sortierreihenfolge (aufsteigend)

Roadmap-Dateien werden in V2 manuell gepflegt (kein UI-Editing). Die Roadmap-Ansicht im Cockpit ist read-only.

### Fortschrittsberechnung

Fortschritt pro Version wird zur Laufzeit berechnet:
1. Alle Backlog-Items mit passender `version` zählen
2. Davon Items mit `status: "done"` zählen
3. Fortschritt = done / total (pro Version)

Es werden keine abgeleiteten Daten gespeichert.

### Dateierstellung

- `planning/`-Verzeichnis und Dateien werden on-demand erstellt
- Wenn `planning/backlog.json` nicht existiert: Backlog-Ansicht zeigt Leerzustand
- Wenn der erste Backlog-Eintrag erstellt wird: Verzeichnis und Datei werden angelegt
- Wenn `planning/roadmap.json` nicht existiert: Roadmap-Ansicht zeigt Leerzustand mit Hinweis

### ID-Generierung (Backlog)

Sequenzielle IDs mit Prefix: `BL-001`, `BL-002`, `BL-003`, ...

Logik:
1. Alle bestehenden Items lesen
2. Numerischen Teil aller IDs extrahieren
3. Maximum finden
4. Neue ID = max + 1, zero-padded auf 3 Stellen

Bei leerer oder fehlender Datei: Start bei BL-001.

Begründung: Einfach, lesbar, menschenfreundlich. Kein DB-Autoincrement nötig. Keine Concurrent-Access-Probleme bei Single-User-Tool.

---

## V2 API Architecture

### Neue API Routes

| Route | Methode | Zweck |
|---|---|---|
| `/api/backlog` | GET | Alle Backlog-Items lesen |
| `/api/backlog` | POST | Neuen Backlog-Eintrag erstellen |
| `/api/backlog/update` | PATCH | Backlog-Eintrag aktualisieren (Status, Priorität, Version) |
| `/api/roadmap` | GET | Alle Versions-Definitionen lesen |

### Request-/Response-Pattern

Alle Routes verwenden das bestehende V1-Pattern:
- `projectPath` als Query-Parameter (GET) oder im Body (POST/PATCH)
- Validierung über `validateProjectPath()` (registriertes Projekt)
- Strukturierte Response mit Status-Feld (`ok`, `not_accessible`, `file_missing`, `empty`, `validation_error`)

### Write-Validierung

Schreiboperationen validieren:
- Pflichtfelder vorhanden
- Enum-Werte gültig (type, priority, status)
- ID-Eindeutigkeit bei Create
- Datei-Existenz und -Lesbarkeit vor Write

### Write-Sicherheit

- Vollständige JSON-Datei atomar schreiben (kompletten Inhalt, kein Partial Update)
- `planning/`-Verzeichnis erstellen falls nicht vorhanden
- Keine Concurrent-Write-Protection nötig (Single-User, internes Tool)
- Bei Parse-Fehlern der bestehenden Datei: Error-Response, kein Überschreiben

### Bestehende V1 API Routes

Alle V1 API Routes bleiben **unverändert**:
- `/api/projects` — unverändert
- `/api/state` — unverändert
- `/api/features` — unverändert
- `/api/slices` — unverändert
- `/api/issues` — unverändert
- `/api/releases` — unverändert
- `/api/decisions` — unverändert

---

## V2 Navigation Architecture

### Sidebar-Struktur

Die Sidebar erhält Sektions-Labels zur Gruppierung:

**Projekt** (Sektions-Label)
1. Übersicht (`/`)
2. Features (`/features`)
3. Slices (`/slices`)
4. Probleme (`/issues`)
5. Releases & Migrationen (`/releases`)
6. Entscheidungen & Verbesserungen (`/decisions`)

**Planung** (Sektions-Label)
7. Backlog (`/backlog`)
8. Roadmap (`/roadmap`)

Begründung: V1-Navigation bleibt vollständig erhalten. V2-Ansichten werden in einer klar getrennten Sektion hinzugefügt. Keine Umstrukturierung bestehender Items nötig (DEC-016).

---

## V2 Component Architecture

### Neue Dateien

**Seiten:**
- `/app/src/app/backlog/page.tsx` — Backlog-Ansicht mit Filter/Sortierung
- `/app/src/app/roadmap/page.tsx` — Roadmap-Ansicht

**API Routes:**
- `/app/src/app/api/backlog/route.ts` — GET + POST
- `/app/src/app/api/backlog/update/route.ts` — PATCH
- `/app/src/app/api/roadmap/route.ts` — GET

**Libraries:**
- `/app/src/lib/backlog.ts` — Backlog-Datei lesen/schreiben, ID-Generierung, Validierung
- `/app/src/lib/roadmap.ts` — Roadmap-Datei lesen, Fortschrittsberechnung

**UI-Komponenten (bei Bedarf):**
- Backlog-Filter-Bar (Typ, Priorität, Status, Version)
- Backlog-Erstellen-Dialog oder -Formular
- Fortschrittsbalken-Komponente (für Roadmap und Dashboard)

### Modifizierte V1-Dateien

V2 modifiziert 2 bestehende V1-Dateien:
- `/app/src/components/sidebar.tsx` — Sektions-Labels, neue Nav-Items (kontrollierte Erweiterung)
- `/app/src/app/page.tsx` — Übersichtsseite erweitert um Fortschritts-Dashboard (neue Sektion unterhalb V1-Inhalten)

### Nicht modifizierte V1-Dateien

Alle übrigen V1-Seiten, API Routes, Components und Libraries bleiben unverändert:
- `/app/src/app/features/page.tsx`
- `/app/src/app/slices/page.tsx`
- `/app/src/app/issues/page.tsx`
- `/app/src/app/releases/page.tsx`
- `/app/src/app/decisions/page.tsx`
- Alle V1 API Routes
- `/app/src/lib/markdown.ts`
- `/app/src/lib/projects.ts`
- `/app/src/lib/validate-project.ts`
- Alle UI-Basiskomponenten

---

## V2 Issues/Backlog-Koexistenz (DEC-014)

V2 betreibt zwei separate Datenquellen parallel:
- `docs/KNOWN_ISSUES.md` → Issues-Ansicht (FEAT-004) — Markdown, read-only, V1-Pattern
- `planning/backlog.json` → Backlog-Ansicht (FEAT-007) — JSON, read/write, V2-Pattern

Dies sind unterschiedliche Datenquellen mit unterschiedlichen Zwecken:
- KNOWN_ISSUES.md = projektdokumentierte bekannte Probleme (Teil der Strategaize-Projektstruktur)
- backlog.json = cockpit-verwaltete Arbeitsplanung (Teil der V2-Planungsschicht)

Die Backlog-Kategorie "Bug" überlappt funktional mit Issues. In V2 koexistieren beide bewusst. Konsolidierung oder Migration wird auf V3 verschoben.

---

## V2 Schreibzugriff-Scope

### V2 erlaubt

- Neue Backlog-Einträge erstellen (`planning/backlog.json`)
- Status eines Backlog-Eintrags ändern
- Priorität eines Backlog-Eintrags ändern
- Versionszuordnung eines Backlog-Eintrags ändern

### V2 erlaubt NICHT

- Backlog-Einträge löschen
- Backlog-Typ nach Erstellung ändern
- Roadmap-Einträge über die UI erstellen/bearbeiten/löschen
- Bestehende Projektdateien schreiben (STATE.md, DECISIONS.md, etc.)
- Andere Dateien als `planning/backlog.json` schreiben

---

## V2 Layer-Modell (erweitert)

### Layer 1 — UI (erweitert)
- Bestehende V1-Sichten (unverändert)
- Neue Backlog-Ansicht mit Filter/Sortierung
- Neue Roadmap-Ansicht
- Erweitertes Übersichts-Dashboard mit Fortschritt
- Backlog-Erstell- und Bearbeitungs-UI
- Sidebar mit Sektions-Gruppierung

### Layer 2 — Application Logic (erweitert)
- Bestehende V1-Parser und Transformationen (unverändert)
- Neue Backlog-Read/Write-Logik (JSON)
- Neue Roadmap-Read-Logik (JSON)
- Fortschrittsberechnung (Backlog × Roadmap)
- Validierungslogik für Schreiboperationen

### Layer 3 — Project Data Records (erweitert)
- Bestehende V1-Dateien: `docs/*.md`, `features/INDEX.md`, `slices/INDEX.md` (unverändert)
- Neue V2-Dateien: `planning/backlog.json`, `planning/roadmap.json`

---

## V2 Architektur-Constraints

### 1. Keine Datenbank (DEC-012)
Alle Daten bleiben dateibasiert. Kein Supabase, kein SQLite, kein anderer DB-Layer.

### 2. Single-User-Annahme
Keine Concurrent-Write-Protection. Ein Nutzer, ein internes Tool.

### 3. Schreibzugriff nur auf Backlog (DEC-013)
V2 schreibt ausschließlich in `planning/backlog.json`. Alle anderen Dateien sind read-only.

### 4. V1-Stabilität
Bestehende V1-Sichten, API Routes und Datenquellen werden nicht modifiziert.

### 5. Projektstruktur-Erweiterung
V2 fügt `planning/` als neues Verzeichnis zur Strategaize-Projektstruktur hinzu.

### 6. Roadmap ist read-only in V2
`planning/roadmap.json` wird manuell gepflegt. Kein UI-Editing in V2.

---

## V2 Risiken

### Risk 5 — Dateikorruption bei Schreibfehlern
Mitigierung: Vollständige Datei schreiben, Validierung vor dem Schreiben.

### Risk 6 — Inkonsistenz zwischen backlog.json und roadmap.json
Mitigierung: Keine gespeicherten abgeleiteten Daten. Fortschritt wird zur Laufzeit berechnet. Ungültige Versionsreferenzen werden toleriert (kein Crash).

### Risk 7 — Wachsende Backlog-Dateien
Mitigierung: Für V2 akzeptabel (internes Tool, überschaubare Datenmenge). Splitting-Strategie kann in V3 eingeführt werden.

### Risk 8 — Koexistenz Issues/Backlog erzeugt Verwirrung
Mitigierung: Klare visuelle Trennung im UI. Unterschiedliche Sektions-Labels in der Sidebar. Dokumentation der Abgrenzung.

---

## V2 Architekturelle Zusammenfassung

V2 erweitert das bestehende V1-Cockpit minimal und kontrolliert:
- JSON-Dateien in `planning/` als neue Datenquelle
- 3 neue API Routes (backlog read/create/update, roadmap read)
- 2 neue Seiten (Backlog, Roadmap)
- 1 modifizierte Seite (Übersicht mit Fortschritt)
- Sidebar-Erweiterung mit Sektions-Gruppierung
- Minimaler Schreibzugriff auf eine einzige Datei

Die Architektur bleibt langweilig, verständlich und erweiterbar — genau richtig für ein internes Tool.

---

## V3 Architecture Direction

### V3 Architectural Intent

V3.0 erweitert das Cockpit von einem Sichtbarkeits- und Planungstool zum aktiven Arbeitsplatz. Die V1/V2-Architektur bleibt vollständig erhalten — V3 fügt neue Schichten hinzu, ohne bestehende zu ändern.

V3.0 ergänzt:
- eine neue Datenschicht für Execution-Reports in den Zielprojekt-Repos
- eine regelbasierte Nächster-Schritt-Engine
- zwei neue Cockpit-Ansichten (Reports, Nächster Schritt)
- einen neuen Claude Code `/review`-Skill
- eine dritte Sidebar-Sektion "Workspace"
- feste Port-Konfiguration (4400)

V3.0 baut **keine** API-basierte Execution, keine Datenbank und keine externe LLM-Integration.

### V3 Application Type
- Internal web application (unverändert)

### V3 Delivery Mode
- internal-tool (unverändert)

### V3 Stack
- Next.js, Tailwind CSS, shadcn/ui (unverändert)
- Keine Datenbank (DEC-018)
- Markdown-Dateien mit YAML-Frontmatter als Report-Format (DEC-021)
- Keine externe API-Abhängigkeit (DEC-017)

---

## V3 Data Architecture

### Report-Format

Reports werden als einzelne Markdown-Dateien mit YAML-Frontmatter gespeichert (DEC-021).

#### Report-Schema

```markdown
---
id: RPT-001
date: "2026-03-21"
skill: frontend
slice: SLC-011
feature: FEAT-007
type: completion
status: completed
reviewOf: null
title: "Frontend SLC-011 Backlog-Ansicht"
---

# Completion Report — Frontend SLC-011

[Markdown-Inhalt des Reports]
```

Frontmatter-Felder:
- `id` — Pflicht, generiert (RPT-XXX)
- `date` — Pflicht, generiert (ISO-Datum)
- `skill` — Pflicht, welcher Skill ausgeführt wurde (frontend, backend, qa, review, slice-planning, etc.)
- `slice` — Optional, Referenz auf Slice-ID (SLC-XXX)
- `feature` — Optional, Referenz auf Feature-ID (FEAT-XXX)
- `type` — Pflicht, Enum: completion, review
- `status` — Pflicht, Enum: completed, reviewed, needs-rework
- `reviewOf` — Optional, nur bei type=review: ID des geprüften Reports (RPT-XXX)
- `title` — Pflicht, kurze Beschreibung des Reports

#### Report-Status-Bedeutung:
- `completed` — Skill wurde ausgeführt, Report liegt vor, noch nicht geprüft
- `reviewed` — Report wurde durch /review geprüft und für gut befunden
- `needs-rework` — Report wurde geprüft, Nacharbeit ist nötig

### Report-Speicherort

Reports leben im Zielprojekt-Repo unter `reports/`:
- `reports/RPT-001.md`
- `reports/RPT-002.md`
- ...

Dies erweitert die Strategaize-Projektstruktur:
- `docs/` — Projektdokumentation (V1)
- `features/` — Feature-Definitionen (V1)
- `slices/` — Slice-Definitionen (V1)
- `planning/` — Backlog und Roadmap (V2)
- `reports/` — Execution-Reports (V3)

### Report-ID-Generierung

Gleiches Pattern wie Backlog-IDs (DEC-022):
1. `reports/`-Verzeichnis scannen
2. Alle RPT-XXX IDs extrahieren
3. Numerischen Teil als Maximum nehmen
4. Neue ID = max + 1, zero-padded auf 3 Stellen

Bei leerem oder fehlendem Verzeichnis: Start bei RPT-001.

### Report-Erstellung (DEC-024)

Reports werden **nicht** primär durch die Cockpit-UI erstellt, sondern durch Claude Code:
1. Claude Code führt einen Skill aus (z.B. /frontend)
2. Am Ende des Skills wird der Completion Report als Markdown-Datei in `reports/` geschrieben
3. CLAUDE.md wird um eine Report-Save-Instruktion erweitert
4. Der /review-Skill liest den letzten Report, prüft ihn, und speichert das Review-Ergebnis als eigenen Report

Das Cockpit ist die **Lese-Schicht** für Reports — Claude Code ist die **Schreib-Schicht**.

### Frontmatter-Parsing

Einfaches String-Parsing ohne externe Abhängigkeiten:
1. Text zwischen erstem `---` und zweitem `---` extrahieren
2. Zeilen als `key: value` parsen
3. Quoted Strings entquoten
4. Body = alles nach dem zweiten `---`

Implementiert in `/app/src/lib/reports.ts`.

---

## V3 API Architecture

### Neue API Routes

| Route | Methode | Zweck |
|---|---|---|
| `/api/reports` | GET | Alle Reports eines Projekts lesen (Metadaten + Inhalt) |
| `/api/reports` | POST | Neuen Report speichern (optional, für zukünftige UI-Nutzung) |
| `/api/next-step` | GET | Nächsten empfohlenen Schritt + generierten Prompt abrufen |

### GET /api/reports

**Query-Parameter:** `projectPath` (wie alle bestehenden Routes)

**Verhalten:**
1. `projectPath` validieren
2. `reports/` Verzeichnis scannen
3. Alle `.md`-Dateien mit RPT-Prefix lesen
4. Frontmatter parsen
5. Sortiert nach Datum (neueste zuerst) zurückgeben

**Response:**
```json
{
  "status": "ok",
  "reports": [
    {
      "id": "RPT-003",
      "date": "2026-03-21",
      "skill": "review",
      "slice": "SLC-011",
      "feature": "FEAT-007",
      "type": "review",
      "status": "reviewed",
      "reviewOf": "RPT-002",
      "title": "Review SLC-011 Backend",
      "body": "# Review Report\n\n[Markdown-Inhalt]"
    }
  ]
}
```

Status-Werte: `ok`, `not_accessible`, `dir_missing` (kein reports/), `empty`

### POST /api/reports

**Body:**
```json
{
  "projectPath": "/path/to/project",
  "skill": "frontend",
  "slice": "SLC-011",
  "feature": "FEAT-007",
  "type": "completion",
  "title": "Frontend SLC-011",
  "body": "# Report\n\n[Inhalt]"
}
```

**Verhalten:**
1. Validierung (Pflichtfelder, gültige Werte)
2. ID generieren
3. Datum generieren
4. Frontmatter + Body zu Markdown zusammensetzen
5. `reports/` Verzeichnis erstellen falls nötig
6. Datei schreiben

**Hinweis:** Dieser Endpoint ist in V3.0 sekundär — primärer Speicherweg ist Claude Code Datei-Write (DEC-024). Der Endpoint existiert für Konsistenz und zukünftige UI-Nutzung.

### GET /api/next-step

**Query-Parameter:** `projectPath`

**Verhalten:**
1. `projectPath` validieren
2. `slices/INDEX.md` lesen → Slice-Status ermitteln
3. `features/INDEX.md` lesen → Feature-Reihenfolge ermitteln
4. `reports/` scannen → Report-Historie pro Slice ermitteln
5. Regelbasiert nächsten Schritt ableiten
6. Prompt generieren

**Response:**
```json
{
  "status": "ok",
  "recommendation": {
    "skill": "/frontend",
    "slice": "SLC-011",
    "feature": "FEAT-007",
    "reason": "SLC-011 ist der nächste offene Slice in der Build-Reihenfolge. Keine Implementation-Reports vorhanden.",
    "prompt": "/frontend — Implementiere SLC-011 (Backlog-Ansicht) gemäß...",
    "confidence": "high"
  }
}
```

Wenn kein nächster Schritt ableitbar: `{ "status": "ok", "recommendation": null, "reason": "Alle Slices sind abgeschlossen." }`

### Bestehende API Routes

Alle V1/V2 API Routes bleiben **unverändert**.

---

## V3 Next-Step Engine

### Regelwerk

Die Engine prüft in dieser Reihenfolge:

**Schritt 1 — Aktiven Slice finden:**
1. Slices aus `slices/INDEX.md` lesen
2. Build-Reihenfolge respektieren (Phase 1 → Phase 2 → Phase 3 → ...)
3. Ersten Slice finden der nicht `done` ist

**Schritt 2 — Report-Status prüfen:**
1. Reports für diesen Slice aus `reports/` lesen
2. Prüfen welche Skill-Typen bereits Reports haben

**Schritt 3 — Nächsten Skill ableiten:**

| Slice-Status | Reports vorhanden | Empfohlener Skill |
|---|---|---|
| planned/ready | keine | `/slice-planning` (falls Slice-Datei dünn ist) oder `/frontend`/`/backend` |
| in_progress | keine completion Reports | `/frontend` oder `/backend` (je nach Slice-Typ) |
| in_progress | completion ohne review | `/review` |
| in_progress | review mit needs-rework | Rework: gleicher Skill wie im letzten completion Report |
| in_progress | review mit reviewed | `/qa` |
| qa_pending | qa Report vorhanden | Slice als `done` markieren oder Nacharbeit |

**Schritt 4 — Prompt generieren:**
1. Skill-Name + Slice-Referenz
2. Akzeptanzkriterien aus der Slice-Datei (falls vorhanden)
3. Relevanter Architektur-Kontext
4. Hinweis auf relevante Dateien

### Slice-Typ-Erkennung

Der Skill-Typ (frontend/backend) wird aus der Slice-Beschreibung abgeleitet:
- Slice enthält "API", "Route", "Backend", "Library", "Migration" → `/backend`
- Slice enthält "Seite", "Ansicht", "View", "UI", "Dashboard", "Sidebar" → `/frontend`
- Unklar → `/frontend` als Default (kann manuell überschrieben werden)

### Prompt-Template

```
/{skill} — Implementiere {slice_id} ({slice_name}) für {feature_id} ({feature_name}).

Slice-Definition: /slices/{slice_file}
Architektur: /docs/ARCHITECTURE.md (V3-Sektion)
Relevante Decisions: {decision_ids}

Akzeptanzkriterien:
{criteria_from_slice_file}
```

### Confidence-Level

- `high` — Slice-Status und Report-Historie sind eindeutig
- `medium` — Slice-Status passt, aber Report-Historie ist lückenhaft
- `low` — Kein aktiver Slice gefunden oder Status uneindeutig

---

## V3 /review Skill Architecture

### Skill-Struktur

Neuer Skill unter `.claude/skills/review/`:
- `.claude/skills/review/SKILL.md` — Skill-Prompt und Instruktionen

### Review-Ablauf

1. Letzten completion Report aus `reports/` identifizieren (höchste RPT-ID mit type=completion)
2. Relevante Projektdateien laden:
   - Slice-Definition (`slices/SLC-XXX.md`)
   - Feature-Definition (`features/FEAT-XXX.md`)
   - Architektur (`docs/ARCHITECTURE.md`)
   - Decisions (`docs/DECISIONS.md`)
3. Report gegen diese Quellen prüfen:
   - Stimmen die gemeldeten Änderungen mit dem Slice-Scope überein?
   - Sind die Akzeptanzkriterien adressiert?
   - Sind die gemeldeten Dateien konsistent?
   - Wurden Probleme transparent berichtet?
   - Gibt es Widersprüche zu Architektur oder Decisions?
4. Strukturiertes Review-Ergebnis erstellen
5. Review als Report speichern (type=review, reviewOf=RPT-XXX)
6. Status des geprüften Reports aktualisieren (completed → reviewed oder needs-rework)

### Review-Ergebnis-Struktur

```markdown
---
id: RPT-004
date: "2026-03-21"
skill: review
slice: SLC-011
feature: FEAT-007
type: review
status: completed
reviewOf: RPT-003
title: "Review RPT-003 — Frontend SLC-011"
---

# Review — RPT-003

## Ergebnis: bestanden / nicht bestanden / teilweise bestanden

## Geprüfte Kriterien
- [x] Scope-Übereinstimmung mit Slice-Definition
- [x] Akzeptanzkriterien adressiert
- [ ] Datei-Buchhaltung konsistent

## Findings
- ...

## Empfehlung
Weiter mit /qa oder: Nacharbeit nötig bei ...
```

### Review-Prüftiefe (V3.0)

Pragmatisch, nicht erschöpfend:
- Scope-Prüfung (stimmt der Report mit dem Slice überein?)
- Akzeptanzkriterien-Check (sind sie adressiert?)
- Datei-Konsistenz (stimmen die gemeldeten Dateien?)
- Problem-Transparenz (wurden Probleme offen berichtet?)
- **Nicht:** Code-Level-Analyse (das ist /qa-Territorium)
- **Nicht:** Build-Verification (das macht der Skill selbst)

---

## V3 Navigation Architecture

### Sidebar-Struktur (DEC-026)

**Projekt** (Sektions-Label — unverändert)
1. Übersicht (`/`)
2. Features (`/features`)
3. Slices (`/slices`)
4. Probleme (`/issues`)
5. Releases & Migrationen (`/releases`)
6. Entscheidungen & Verbesserungen (`/decisions`)

**Planung** (Sektions-Label — unverändert)
7. Backlog (`/backlog`)
8. Roadmap (`/roadmap`)

**Workspace** (Sektions-Label — NEU)
9. Reports (`/reports`)
10. Nächster Schritt (`/next-step`)

---

## V3 Component Architecture

### Neue Dateien

**Seiten:**
- `/app/src/app/reports/page.tsx` — Report-Liste mit Filter/Sortierung + Detail-Ansicht
- `/app/src/app/next-step/page.tsx` — Nächster-Schritt-Empfehlung mit Prompt + Kopieren-Button

**API Routes:**
- `/app/src/app/api/reports/route.ts` — GET (alle Reports lesen) + POST (Report speichern)
- `/app/src/app/api/next-step/route.ts` — GET (Empfehlung + Prompt)

**Libraries:**
- `/app/src/lib/reports.ts` — Report-Datei lesen/schreiben, Frontmatter-Parsing, ID-Generierung, Validierung
- `/app/src/lib/next-step.ts` — Nächster-Schritt-Regelwerk, Prompt-Generierung

**Skill:**
- `.claude/skills/review/SKILL.md` — /review Skill-Prompt

### Modifizierte V1/V2-Dateien

V3 modifiziert 3 bestehende Dateien:
- `/app/src/components/sidebar.tsx` — Dritte Sektion "Workspace" mit 2 neuen Nav-Items
- `/app/package.json` — Dev-Script Port auf 4400 ändern
- `/CLAUDE.md` — Report-Save-Instruktion hinzufügen (nach jedem nicht-trivialen Schritt Report als Datei speichern)

### Nicht modifizierte V1/V2-Dateien

Alle übrigen V1/V2-Seiten, API Routes, Components und Libraries bleiben unverändert.

---

## V3 Infrastructure

### Port-Konfiguration (DEC-025)

Dev-Server wird auf Port 4400 konfiguriert:

In `package.json`:
```json
"scripts": {
  "dev": "next dev --port 4400"
}
```

Optional in `.env.local`:
```
PORT=4400
```

### Verzeichnis-Erstellung

`reports/` wird on-demand erstellt:
- Wenn das Verzeichnis nicht existiert: Report-Ansicht zeigt Leerzustand
- Wenn der erste Report gespeichert wird (durch Claude Code oder POST API): Verzeichnis wird angelegt

---

## V3 Layer-Modell (erweitert)

### Layer 1 — UI (erweitert)
- Bestehende V1-Sichten (unverändert)
- Bestehende V2-Sichten (unverändert)
- Neue Report-Ansicht mit Filter/Sortierung und Detail-View
- Neue Nächster-Schritt-Ansicht mit Prompt-Output und Kopieren-Button
- Sidebar mit dritter Sektion "Workspace"

### Layer 2 — Application Logic (erweitert)
- Bestehende V1-Parser und Transformationen (unverändert)
- Bestehende V2-Backlog/Roadmap-Logik (unverändert)
- Neue Report-Read/Write-Logik (Frontmatter-Parsing, Verzeichnis-Scan)
- Neue Nächster-Schritt-Engine (Regelwerk + Prompt-Generierung)

### Layer 3 — Project Data Records (erweitert)
- Bestehende V1-Dateien: `docs/*.md`, `features/INDEX.md`, `slices/INDEX.md` (unverändert)
- Bestehende V2-Dateien: `planning/backlog.json`, `planning/roadmap.json` (unverändert)
- Neue V3-Dateien: `reports/RPT-*.md`

### Layer 4 — Dev System Skills (NEU)
- `/review`-Skill als Claude Code Erweiterung
- CLAUDE.md-Instruktionen für Report-Speicherung
- Bestehende Skills (frontend, backend, qa, etc.) bleiben unverändert

---

## V3 Architektur-Constraints

### 1. Keine Datenbank (DEC-018)
Alle Daten bleiben dateibasiert.

### 2. Keine externe API (DEC-017)
Keine Anthropic API, keine OpenAI API. Alles läuft über Claude Code Max-Abo.

### 3. Single-User-Annahme
Keine Concurrent-Write-Protection. Ein Nutzer, ein internes Tool.

### 4. V1/V2-Stabilität
Bestehende V1/V2-Sichten, API Routes und Datenquellen werden nicht modifiziert (außer Sidebar und Port).

### 5. Reports sind read-only im Cockpit
Das Cockpit liest Reports. Schreiben passiert durch Claude Code (DEC-024).

### 6. Projektstruktur-Erweiterung
V3 fügt `reports/` als neues Verzeichnis zur Strategaize-Projektstruktur hinzu.

---

## V3 Risiken

### Risk 9 — Report-Format-Instabilität
Reports werden von Claude Code generiert, nicht von einer festen Schablone. Das Frontmatter könnte inkonsistent werden.
Mitigierung: CLAUDE.md-Instruktion definiert das exakte Format. Frontmatter-Parser toleriert fehlende optionale Felder graceful.

### Risk 10 — Nächster-Schritt-Engine gibt falsche Empfehlungen
Bei komplexen Projektzuständen (parallele Slices, Sonderfälle) könnte die regelbasierte Logik falsch liegen.
Mitigierung: Empfehlung ist ein Vorschlag, keine Automatisierung. User kann jederzeit anders entscheiden. Confidence-Level macht Unsicherheit transparent.

### Risk 11 — Report-Verzeichnis wächst
Bei vielen Skills und Slices sammeln sich viele Report-Dateien an.
Mitigierung: Für V3.0 akzeptabel (internes Tool, überschaubare Datenmenge). Archivierungs-Strategie kann in V3.1 eingeführt werden.

### Risk 12 — CLAUDE.md-Instruktion wird nicht konsistent befolgt
Claude Code könnte die Report-Save-Instruktion manchmal überspringen.
Mitigierung: /review-Skill kann als manueller Trigger dienen. POST /api/reports als Fallback. Report-Ansicht zeigt fehlende Reports als Gap.

---

## V3 Architekturelle Zusammenfassung

V3.0 erweitert das bestehende V2-Cockpit kontrolliert zum Arbeitsplatz:
- Markdown-Dateien mit YAML-Frontmatter in `reports/` als neue Datenquelle
- 2 neue API Routes (reports read, next-step)
- 1 optionale API Route (reports write)
- 2 neue Seiten (Reports, Nächster Schritt)
- 1 neuer Claude Code Skill (/review)
- Sidebar-Erweiterung mit dritter Sektion "Workspace"
- Fester Port 4400
- CLAUDE.md-Erweiterung für Report-Speicherung
- Keine API-Kosten, keine Datenbank, keine externen Abhängigkeiten

Die Architektur folgt weiterhin dem Prinzip: langweilig, verständlich, erweiterbar.

---

## V3.1 Architecture Direction

### V3.1 Architectural Intent

V3.1 fügt eine Test-Schicht hinzu, ohne bestehende Architektur zu verändern. Tests laufen on-demand und prüfen die drei Kern-Libraries isoliert.

### V3.1 Stack-Erweiterung
- **Vitest** als Test-Runner (Dev-Dependency, DEC-027)
- Keine weiteren Dependencies nötig

---

## V3.1 Test Architecture

### Test-Runner: Vitest (DEC-027)

Vitest wird über eine eigene Konfigurationsdatei `vitest.config.ts` im `app/`-Verzeichnis konfiguriert (DEC-028).

```typescript
// app/vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

**Begründung:**
- `globals: true` → `describe`, `it`, `expect` ohne Import verfügbar
- `environment: "node"` → Libraries arbeiten mit fs/path, brauchen Node
- `alias @` → gleicher Path-Alias wie in Next.js `tsconfig.json`

### Script

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

`npm run test` = einmalig (on-demand). `npm run test:watch` = Watch-Mode wenn gewünscht.

---

## V3.1 Test-Datei-Struktur (DEC-029)

Tests leben neben den Libraries im `__tests__/`-Verzeichnis:

```
app/src/lib/
├── reports.ts
├── next-step.ts
├── backlog.ts
├── ...
└── __tests__/
    ├── reports.test.ts
    ├── next-step.test.ts
    ├── backlog.test.ts
    └── fixtures/
        ├── sample-index-v3.md
        ├── sample-report.md
        ├── sample-report-malformed.md
        ├── sample-backlog.json
        └── sample-roadmap.json
```

---

## V4 Architecture Direction

### V4 Architectural Intent

V4 ist ein reines Visual Upgrade — keine neuen Seiten, keine neuen APIs, keine neuen Datenmodelle. Die bestehende Architektur bleibt vollständig erhalten. V4 ändert ausschließlich die visuelle Präsentation.

### V4 Stack
- Next.js, Tailwind CSS, shadcn/ui (unverändert)
- Keine neuen Dependencies
- Keine API-Änderungen
- Keine Datenmodell-Änderungen

---

## V4 Design Token Architecture (DEC-031)

### Zentrale Token-Dateien

V4 verwendet zwei zentrale Dateien für alle Design-Tokens:

**1. `/app/src/lib/theme.ts`** — TypeScript-Konstanten
- App-Identität (Name, Logo)
- Brand-Farben (neu: #120774, #4454B8)
- Gradient-Definitionen (Primary, Success, Warning, Sidebar)
- Spacing-Skala (8px-Basis)
- Typografie-Hierarchie
- Shadow-Definitionen (Card, Elevated, Glow)
- Animation-Timings

**2. `/app/src/app/globals.css`** — CSS Custom Properties
- Alle `:root`-Variablen auf neue Werte aktualisieren
- Neue Gradient-Variablen hinzufügen
- Neue Shadow-Variablen hinzufügen
- Sidebar-Variablen auf Gradient-Werte aktualisieren

### Gradient-Strategie (DEC-032)

Gradients werden als CSS Custom Properties definiert und über Tailwind-Utilities konsumiert:

```css
:root {
  --gradient-primary: linear-gradient(to right, #120774, #4454b8);
  --gradient-success: linear-gradient(to right, #00a84f, #4dcb8b);
  --gradient-warning: linear-gradient(to right, #f2b705, #ffd54f);
  --gradient-sidebar: linear-gradient(to bottom, #0f172a, #0f172a, #020617);
}
```

Für Gradient-Text (KPI-Zahlen) wird `background-clip: text` verwendet:

```css
.gradient-text-primary {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Badge-Strategie (DEC-033)

Badges werden von Outline-Style zu Gradient-Fill-Style umgestellt:

**Aktuell (V3):**
```
bg-emerald-50 text-emerald-700 border-emerald-200/60
```

**Neu (V4):**
```
Success: background: gradient-success, color: white, box-shadow: glow
Warning: background: gradient-warning, box-shadow: glow
Neutral: bg-slate-100, color: slate-600, border
```

Die gesamte Badge-Logik bleibt in `status-badges.ts` — nur die Klassen-Strings ändern sich.

---

## V4 Komponenten-Änderungsplan

### Schicht 1 — Foundation (muss zuerst)
| Datei | Änderung |
|---|---|
| `theme.ts` | Komplett neu: Neue Farben, Gradients, Spacing, Shadows, Timings |
| `globals.css` | `:root`-Variablen aktualisieren, Gradient-Utilities, Glow-Utilities |

### Schicht 2 — Shared Components
| Datei | Änderung |
|---|---|
| `status-badges.ts` | Alle Badge-Styles auf Gradient/Premium umstellen |
| `components/ui/card.tsx` | Hover-Transform, Transition-Timing |
| `components/ui/badge.tsx` | Gradient-Support, Shadow-Support |
| `components/ui/button.tsx` | Primary: Gradient, Hover-Glow, Transform |
| `components/ui/empty-state.tsx` | Icon-Kreis-Styling |

### Schicht 3 — Shell & Navigation
| Datei | Änderung |
|---|---|
| `components/sidebar.tsx` | Gradient-Background, Active-Glow, Logo-Gradient-Text |
| `components/app-shell.tsx` | Minimal (Hintergrund-Anpassung wenn nötig) |

### Schicht 4 — Seiten (je Seite)
| Datei | Änderung |
|---|---|
| `app/page.tsx` | Header-Banner, KPI-Cards Premium, Fortschritts-Upgrade |
| `app/features/page.tsx` | Premium-Tabelle, KPI-Cards |
| `app/slices/page.tsx` | Premium-Tabelle, Fortschrittsbalken, KPI-Cards |
| `app/issues/page.tsx` | Card-Upgrade, Status-Dots |
| `app/releases/page.tsx` | Timeline-Style, Release-Dots |
| `app/decisions/page.tsx` | Card-Upgrade |
| `app/backlog/page.tsx` | Premium-Tabelle, KPI-Cards |
| `app/roadmap/page.tsx` | Timeline-Meilensteine, Fortschrittsbalken |
| `app/reports/page.tsx` | Premium-Tabelle, Category-Badges |
| `app/next-step/page.tsx` | Dunkler Prompt-Block, Aufgaben-Liste |

---

## V4 Architektur-Constraints

### 1. Keine neuen Dependencies
Alle visuellen Änderungen werden mit bestehendem Tailwind CSS + CSS Custom Properties umgesetzt.

### 2. Bestehende Komponenten-Interfaces bleiben stabil
Props, Typen und API-Verträge aller Komponenten bleiben unverändert. Nur die CSS-Klassen und Styles ändern sich.

### 3. Tests müssen bestehen bleiben
Alle 45 bestehenden Unit Tests müssen nach V4 weiterhin bestehen. V4 ändert kein Verhalten, nur Darstellung.

### 4. Schrittweise Implementation
V4 wird in Schichten implementiert: Foundation → Shared Components → Shell → Seiten. Jede Schicht muss eigenständig lauffähig sein.

### 5. Style Guide als Referenz
`/docs/strategaize_styleguide.md` ist die visuelle Referenz. Bei Konflikten zwischen Style Guide und technischer Machbarkeit hat die technische Machbarkeit Vorrang, mit dokumentierter Abweichung.

---

## V4 Risiken

### Risk 13 — Umfangreiche CSS-Änderungen brechen Layouts
Mitigierung: Foundation-Slice zuerst (theme.ts + globals.css), dann schrittweise pro Komponente. Nach jeder Schicht Browser-Verifikation.

### Risk 14 — Gradient-Text auf kleinen Screens
Mitigierung: Gradient-Text nur für große KPI-Zahlen. Fallback: Farbiger Text ohne Gradient.

### Risk 15 — Tailwind-Kompatibilität mit Custom-Gradients
Mitigierung: CSS Custom Properties + `@layer utilities` statt Tailwind-Plugin. Getesteter Ansatz aus Style Guide.

---

## V4 Architekturelle Zusammenfassung

V4 ist ein kontrolliertes Visual Upgrade in 4 Schichten:
1. **Foundation** — theme.ts + globals.css (neue Tokens, Gradients, Shadows)
2. **Shared Components** — Badges, Cards, Buttons (Gradient-Styles)
3. **Shell** — Sidebar (Gradient-Background, Active-Glow)
4. **Seiten** — Jede Seite einzeln upgraden (KPI-Cards, Tabellen, Page-spezifisch)

Keine neuen Dateien, keine neuen APIs, keine neuen Dependencies. Nur visuelle Transformation bestehender Komponenten.

Die Architektur folgt weiterhin dem Prinzip: kontrolliert, schrittweise, rückbaubar.

**Begründung:** `__tests__/` neben `lib/` ist Vitest/Jest-Standard. Fixtures als echte Dateien statt Inline-Strings — lesbarer und näher an der Produktionsrealität (DEC-030).

---

## V3.1 File-System-Test-Strategie (DEC-030)

Libraries lesen und schreiben echte Dateien. Tests verwenden **echte temporäre Verzeichnisse**, keine Mocks.

### Ansatz

```typescript
import { mkdtempSync, rmSync } from "fs";
import path from "path";
import os from "os";

let tmpDir: string;

beforeEach(() => {
  tmpDir = mkdtempSync(path.join(os.tmpdir(), "cockpit-test-"));
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});
```

**Begründung:**
- Libraries nutzen `fs.readFileSync`, `fs.writeFileSync`, `fs.existsSync` direkt
- Mocking von `fs` wäre fragil und würde nicht die echte Logik testen
- Temporäre Verzeichnisse simulieren echte Projekt-Strukturen
- Cleanup in `afterEach` verhindert Datei-Reste
- `os.tmpdir()` funktioniert auf Windows und Unix

### Fixture-Kopie in Tests

Tests die Lese-Funktionen prüfen, kopieren Fixture-Dateien ins temp-Verzeichnis:

```typescript
import { copyFileSync, mkdirSync } from "fs";

function setupProjectDir(tmpDir: string) {
  mkdirSync(path.join(tmpDir, "reports"), { recursive: true });
  copyFileSync(
    path.join(__dirname, "fixtures", "sample-report.md"),
    path.join(tmpDir, "reports", "RPT-001.md")
  );
}
```

---

## V3.1 Test-Scope pro Library

### reports.ts — Testfälle

| Testfall | Was wird geprüft |
|---|---|
| Frontmatter parsen (vollständig) | Alle Felder korrekt extrahiert |
| Frontmatter parsen (optional leer) | Optionale Felder (slice, feature, reviewOf, result) = null |
| Frontmatter parsen (malformed) | Kaputte Datei → graceful skip, kein Crash |
| ID-Generierung (leeres Verzeichnis) | Erste ID = RPT-001 |
| ID-Generierung (bestehende Reports) | Höchste ID + 1 |
| Report schreiben + zurücklesen | Round-Trip: write → read → Daten identisch |
| Verzeichnis-Scan | Nur RPT-*.md Dateien, andere ignoriert |
| Leeres Verzeichnis | Leeres Array, kein Fehler |
| Fehlendes Verzeichnis | hasReportsDir() = false |

### next-step.ts — Testfälle

| Testfall | Was wird geprüft |
|---|---|
| Slice-Parsing (Single-Table) | Slices korrekt aus INDEX.md extrahiert |
| Slice-Parsing (Multi-Table V1+V2+V3) | Nur SLC-Zeilen, keine Header/Separator |
| Skill-Typ Frontend-Keywords | "Ansicht", "Seite", "View", "UI" → /frontend |
| Skill-Typ Backend-Keywords | "API", "Route", "Backend", "Library" → /backend |
| Skill-Typ Default | Unklare Beschreibung → /frontend |
| Regelwerk: kein Report → implement | Empfiehlt /frontend oder /backend |
| Regelwerk: completion ohne review → /review | Empfiehlt /review |
| Regelwerk: review needs-rework → rework | Empfiehlt gleichen Skill nochmal |
| Regelwerk: reviewed → /qa | Empfiehlt /qa |
| Post-Impl: alle done → /qa Gesamt | Empfiehlt Gesamt-QA |
| Post-Impl: nach QA → /final-check | Empfiehlt Final-Check |
| Edge: keine Slices | recommendation = null |
| Edge: alle done + released | Projekt abgeschlossen |

### backlog.ts — Testfälle

| Testfall | Was wird geprüft |
|---|---|
| Validierung: gültige Eingabe | Keine Fehler |
| Validierung: fehlender Titel | Fehler-Array enthält Meldung |
| Validierung: ungültiger Typ | Fehler-Array enthält Meldung |
| Validierung: ungültige Priorität | Fehler-Array enthält Meldung |
| ID-Generierung (leer) | Erste ID = BL-001 |
| ID-Generierung (bestehende) | Höchste ID + 1 |
| Read/Write Round-Trip | write → read → Daten identisch |
| Fehlende Datei | Leeres Array, kein Fehler |
| Malformed JSON | null zurückgegeben |

---

## V3.1 Architektur-Constraints

### 1. Tests sind isoliert
Tests verändern keine Produktionsdaten. Alle File-System-Operationen in temp-Verzeichnissen.

### 2. Keine neuen Runtime-Dependencies
Vitest ist nur Dev-Dependency. Produktions-Bundle bleibt unverändert.

### 3. Keine Architektur-Änderungen an Libraries
Libraries werden getestet, nicht refaktoriert. Tests testen die bestehende API.

### 4. Keine CI/CD-Integration
Tests laufen nur on-demand. Kein Build-Blocker.

---

## V3.1 Risiken

### Risk 13 — Vitest + Next.js 16 Kompatibilität
Vitest muss den `@`-Path-Alias aus `tsconfig.json` korrekt auflösen.
Mitigierung: Expliziter `resolve.alias` in `vitest.config.ts`.

### Risk 14 — Windows-Path-Handling in Tests
`os.tmpdir()` gibt auf Windows Backslash-Pfade. Libraries nutzen `path.join` das plattform-korrekt arbeitet.
Mitigierung: Immer `path.join` statt String-Concatenation in Tests.

---

## V3.1 Architekturelle Zusammenfassung

V3.1 fügt eine Test-Schicht hinzu:
- 1 neue Dev-Dependency (Vitest)
- 1 Konfigurationsdatei (`vitest.config.ts`)
- 3 Test-Dateien in `lib/__tests__/`
- 5 Fixture-Dateien in `lib/__tests__/fixtures/`
- 2 neue npm Scripts (`test`, `test:watch`)
- Keine Änderungen an bestehenden Libraries oder Cockpit-Code
- Keine Runtime-Auswirkungen
