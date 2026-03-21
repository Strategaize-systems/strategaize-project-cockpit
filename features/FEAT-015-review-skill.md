# FEAT-015 — /review-Skill

## Status
planned

## Priority
high

## Version
V3

## Beschreibung
Neuer Claude Code Skill der Completion Reports gegen Projektkriterien prüft und ein strukturiertes Review-Ergebnis speichert.

## Problemkontext
Bisher wurden Reports manuell in ChatGPT geprüft — aufwändig, kontextarm und nicht persistent. Ein integrierter /review-Skill hat vollen Zugriff auf Projektdateien (Slice-Definition, Architektur, Decisions, Akzeptanzkriterien) und kann eine fundierte, nachvollziehbare Prüfung durchführen. Das Review-Ergebnis wird als Report gespeichert und ist im Cockpit sichtbar.

## In Scope
- Skill-Datei unter `.claude/skills/review/`
- Prüft den letzten (oder angegebenen) Completion Report gegen:
  - Slice-Definition und Akzeptanzkriterien
  - Architektur-Vorgaben (ARCHITECTURE.md)
  - Relevante Decisions (DECISIONS.md)
  - Gemeldete Probleme vs. tatsächlicher Zustand
- Strukturiertes Ergebnis: bestanden / nicht bestanden / teilweise bestanden
- Offene Punkte und Nacharbeit-Empfehlungen
- Speichert Review-Ergebnis als Report (Typ: review) in reports/
- Gibt klare Handlungsempfehlung: weiter oder korrigieren

## Out of Scope
- Automatische Code-Analyse oder Linting
- Build-Verification durch den Skill selbst
- Automatische Korrektur bei Nicht-Bestehen
- Review von Reports anderer Projekte
- Konfigurierbare Prüfkriterien über die UI

## Erfolgskriterien
- Nutzer kann `/review` in Claude Code aufrufen
- Skill liest den relevanten Report und prüft gegen Projektdateien
- Ergebnis ist strukturiert und nachvollziehbar
- Review-Report wird persistent gespeichert (reports/)
- Im Cockpit ist der Review-Status des geprüften Reports sichtbar

## Offene Punkte (gelöst)
- ~~Identifikation des letzten Reports~~ → Höchste RPT-ID mit type=completion aus reports/
- ~~Automatisch nach jedem Skill?~~ → Nein, manueller Aufruf durch User. Kann später automatisiert werden.
- ~~Prüftiefe~~ → Pragmatisch: Scope-Prüfung, Akzeptanzkriterien-Check, Datei-Konsistenz, Problem-Transparenz. Kein Code-Level-Review.

## Hinweis
Dies ist ein Claude Code Skill (`.claude/skills/`), kein Cockpit-UI-Feature. Er erzeugt aber Daten (Review-Reports) die im Cockpit angezeigt werden (FEAT-012).
