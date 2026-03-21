# V3 Discovery — Workspace Foundation

## Date
2026-03-21

## Status
Completed — Requirements und Architecture abgeschlossen, bereit für /slice-planning

---

## Raw Idea

Das Cockpit soll von einem Sichtbarkeits- und Planungstool zu einem aktiven Arbeitsplatz ausgebaut werden. Der aktuelle manuelle Workflow (Claude Code ausführen, Reports kopieren, in ChatGPT prüfen, Feedback zurückkopieren) soll in einer Oberfläche abgebildet werden.

## Main Goal

Den manuellen Wechsel zwischen VS Code, Claude Code und ChatGPT eliminieren — alles in einer Oberfläche steuern, prüfen und dokumentieren, sodass der Execution-Loop nahtlos läuft.

---

## Decisions Made During Discovery

### ChatGPT-Integration: Gestrichen
- Grund: Kein signifikanter Qualitätsgewinn für das Einsatzprofil (interne Tools, kleinere Kundenprojekte). Ein `/review`-Skill innerhalb von Claude Code hat vollen Projektkontext und liefert gleichwertige Ergebnisse.
- Konsequenz: Nur Anthropic/Claude als LLM-Plattform. Keine OpenAI-Abhängigkeit.

### API-basierte Execution: Gestrichen
- Grund: Würde zusätzliche Kosten zum bestehenden Max-Abo verursachen ($50-150+/Monat) für im Grunde die gleiche Funktionalität, die Claude Code bereits bietet.
- Konsequenz: Execution bleibt in Claude Code/VS Code. Cockpit ist Steuerungs- und Sichtbarkeitsschicht, nicht Execution-Engine.

### Datenbank: Nicht nötig
- Grund: Gleicher Ansatz wie V2 — JSON-Dateien und Markdown im Repo sind für ein Single-User internes Tool ausreichend.
- Konsequenz: Keine DB-Infrastruktur, keine Extra-Kosten.

### Fester Cockpit-Port
- Grund: Port-Kollisionen mit anderen Next.js-Entwicklungsprojekten (Standard 3000) vermeiden.
- Konsequenz: Cockpit bekommt einen dedizierten Port (z.B. 4400), konfiguriert in package.json/env.

### Speech-to-Text: Wispr Flow Abo ($12/Monat)
- Grund: Selbst bauen wäre unverhältnismäßig aufwändig. Wispr Flow funktioniert lokal, in jeder Anwendung.
- Konsequenz: Kein Speech-to-Text Feature im Cockpit. Wispr Flow ist externes Tool.

---

## V3 Scope — In Scope

### V3.0 — Workspace Foundation + Report Layer
- Report-Speicherung als Markdown mit YAML-Frontmatter im Repo (reports/)
- Report-Viewer im Cockpit (neue Sidebar-Sektion "Workspace")
- Nächster-Schritt-Engine (regelbasiert — prüft Slice/Feature-Status)
- Fertiger Prompt-Output mit Ein-Klick-Kopieren in Zwischenablage
- Neuer /review-Skill für Claude Code
- Fester Cockpit-Port (nicht 3000)
- Execution-Log / Historie

### V3.1 — Deeper Integration (geparkt)
- VS Code Extension die Prompts direkt injiziert (kein Paste mehr)
- WebSocket-Bridge zwischen Cockpit und Claude Code
- LLM-gestützte Nächster-Schritt-Empfehlung (statt regelbasiert)

### V3.2 — Live Execution (geparkt)
- Anthropic API + Tool Use als Execution-Engine (nur wenn Kosten akzeptabel)
- Echtzeit-Output-Streaming
- Bash-Bestätigung in der Cockpit-UI
- Vollständiger Loop ohne VS Code

---

## V3 Scope — Explizit ausgeschlossen

- ChatGPT / OpenAI Integration
- Datenbank
- Multi-User / Team-Funktionalität
- Eigene Deployment-Pipeline-Steuerung
- Git-Push/PR-Automatisierung aus der UI
- Vollautonomer Loop ohne menschliche Bestätigung
- Dritte LLM-Instanzen
- Mobile/Responsive Execution UI
- Speech-to-Text im Cockpit

---

## Parallel Work Stream: /onboard Skill

Separater Skill (nicht Teil von V3), der bestehende Git-Repositories einliest und bewertet:
- Prüft vorhandene Projektstruktur (CLAUDE.md, docs/, features/, slices/)
- Bewertet aktuellen Stand
- Identifiziert Lücken
- Schlägt Einstiegspunkt im Strategaize-Workflow vor

Eigener Discovery → Requirements Zyklus.

---

## Workflow-Modell V3.0

```
Cockpit (Browser, fester Port)
  → Zeigt nächsten Schritt + fertigen Prompt
  → [Kopieren] Button → Zwischenablage

VS Code + Claude Code
  → Prompt einfügen, ausführen
  → Bash bestätigen (wie gewohnt)
  → Report wird automatisch als Markdown gespeichert
  → /review prüft den Report

Cockpit
  → Report sichtbar
  → Review-Ergebnis sichtbar
  → Nächster Schritt aktualisiert
  → [Kopieren] → weiter
```
