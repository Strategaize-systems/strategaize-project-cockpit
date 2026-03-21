# SLC-021 — /review-Skill + Report-Save

## Related Features
- FEAT-015 (/review-Skill)
- FEAT-011 (Report-Speicherung — Auto-Save-Instruktion)

## Status
planned

## Priority
high

## Purpose
Zwei zusammengehörige Teile der Report-Infrastruktur:
1. Der `/review`-Skill für Claude Code, der Completion Reports gegen Projektkriterien prüft.
2. Die CLAUDE.md-Erweiterung, die sicherstellt, dass Reports automatisch als Dateien gespeichert werden.

Beide sind Voraussetzung dafür, dass das V3-Workspace-Ökosystem funktioniert: ohne Report-Save gibt es keine Reports zum Anzeigen, ohne /review gibt es keinen internen Prüfschritt.

## Scope

### Included
1. **`.claude/skills/review/SKILL.md`**: Skill-Prompt der den letzten Completion Report identifiziert, gegen Slice-Definition, Akzeptanzkriterien, Architektur und Decisions prüft, und ein strukturiertes Review-Ergebnis erstellt.
2. **Report-Speicherung als Teil des Reviews**: Der /review-Skill speichert sein Ergebnis als eigenen Report (type=review, reviewOf=RPT-XXX).
3. **CLAUDE.md Erweiterung**: Instruktion die Claude Code anweist, nach jedem nicht-trivialen Arbeitsschritt einen Completion Report als Markdown-Datei in `reports/` zu speichern.

### Excluded
- Cockpit-Code-Änderungen (keine)
- Automatische Ausführung des /review-Skills nach jedem anderen Skill
- Code-Level-Analyse im Review (das ist /qa-Territorium)

## Key Files

### Neue Dateien
- `/.claude/skills/review/SKILL.md`

### Modifizierte Dateien
- `/CLAUDE.md` — Report-Save-Instruktion hinzufügen

## Dependencies
- Keine harte Abhängigkeit auf andere V3-Slices
- Nutzt das Report-Format aus der V3-Architektur (DEC-021)
- Sollte idealerweise nach SLC-016 gebaut werden, damit das Report-Format bereits in lib/reports.ts definiert ist

## Technical Notes

### Review-Ablauf
1. Letzten completion Report aus `reports/` identifizieren (höchste RPT-ID mit type=completion)
2. Relevante Projektdateien laden:
   - Slice-Definition (`slices/SLC-XXX.md`)
   - Feature-Definition (`features/FEAT-XXX.md`)
   - Architektur (`docs/ARCHITECTURE.md`)
   - Decisions (`docs/DECISIONS.md`)
3. Report gegen diese Quellen prüfen:
   - Scope-Übereinstimmung mit Slice-Definition
   - Akzeptanzkriterien adressiert
   - Datei-Buchhaltung konsistent
   - Probleme transparent berichtet
   - Keine Widersprüche zu Architektur/Decisions
4. Strukturiertes Review-Ergebnis erstellen
5. Review als Report speichern (type=review, reviewOf=RPT-XXX)

### Review-Prüftiefe (V3.0)
Pragmatisch, nicht erschöpfend:
- Scope-Prüfung ✓
- Akzeptanzkriterien-Check ✓
- Datei-Konsistenz ✓
- Problem-Transparenz ✓
- **Nicht:** Code-Level-Analyse
- **Nicht:** Build-Verification
- **Nicht:** Browser-Test

### CLAUDE.md Report-Save-Instruktion (Entwurf)
```
## Report-Speicherung (V3)

Nach jedem nicht-trivialen Arbeitsschritt (Implementation, QA, Review, etc.)
muss der Completion Report als Markdown-Datei in `reports/` des Zielprojekts
gespeichert werden.

Format: YAML-Frontmatter + Markdown-Body
Dateiname: RPT-XXX.md (nächste freie ID)
Speicherort: reports/ im Zielprojekt-Repo

Frontmatter-Felder:
- id (Pflicht): RPT-XXX
- date (Pflicht): ISO-Datum
- skill (Pflicht): ausgeführter Skill
- slice (Optional): Slice-Referenz
- feature (Optional): Feature-Referenz
- type (Pflicht): completion oder review
- status (Pflicht): completed
- reviewOf (Optional): RPT-XXX bei type=review
- title (Pflicht): Kurzbeschreibung
```

### Review-Report-Ergebnis
```markdown
---
id: RPT-004
date: "2026-03-21"
skill: review
slice: SLC-016
feature: FEAT-011
type: review
status: completed
reviewOf: RPT-003
title: "Review RPT-003 — Frontend SLC-016"
---

# Review — RPT-003

## Ergebnis: bestanden / nicht bestanden / teilweise bestanden

## Geprüfte Kriterien
- [x] Scope-Übereinstimmung
- [x] Akzeptanzkriterien adressiert
- [ ] Datei-Buchhaltung konsistent

## Findings
- ...

## Empfehlung
Weiter mit /qa oder: Nacharbeit nötig bei ...
```

## Acceptance Criteria
- [ ] `/review` ist als Skill in Claude Code aufrufbar
- [ ] Skill identifiziert den letzten Completion Report korrekt
- [ ] Skill liest relevante Projektdateien (Slice, Feature, Architektur, Decisions)
- [ ] Skill prüft Scope-Übereinstimmung, Akzeptanzkriterien, Datei-Konsistenz, Transparenz
- [ ] Skill speichert das Review-Ergebnis als Report (type=review)
- [ ] Review-Report hat korrekte Frontmatter (inkl. reviewOf-Referenz)
- [ ] CLAUDE.md enthält Report-Save-Instruktion mit korrektem Format
- [ ] Instruktion ist klar genug dass Claude Code sie konsistent befolgen kann
