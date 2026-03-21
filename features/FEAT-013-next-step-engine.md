# FEAT-013 — Nächster-Schritt-Engine

## Status
planned

## Priority
high

## Version
V3

## Beschreibung
Regelbasierte Empfehlung des nächsten Arbeitsschritts mit fertigem Prompt und Ein-Klick-Kopieren.

## Problemkontext
Der Nutzer muss aktuell selbst entscheiden, welcher Skill als nächstes ausgeführt werden soll und den Prompt manuell formulieren. Die Informationen dafür (Slice-Status, Feature-Reihenfolge, offene Reviews) existieren bereits in den Projektdateien — sie müssen nur ausgewertet und als konkreter nächster Schritt präsentiert werden.

## In Scope
- Regelbasierte Logik die Slice-Status und Feature-Status auswertet
- Berücksichtigt: aktiven Slice, Slice-Reihenfolge, Feature-Phase, offene Reviews
- Empfiehlt den nächsten Skill (z.B. `/frontend für SLC-011`)
- Generiert einen vollständigen, kontextreichen Prompt mit:
  - Skill-Name
  - Slice-Referenz
  - Relevante Akzeptanzkriterien
  - Relevante Kontext-Dateien
- Ein-Klick-Kopieren des Prompts in die Zwischenablage
- Dedizierte Cockpit-Seite oder prominenter Bereich
- Aktualisierung bei Seiten-Reload (liest aktuelle Projektdaten)

## Out of Scope
- LLM-gestützte Empfehlung (regelbasiert ist ausreichend für V3.0)
- Automatische Ausführung des empfohlenen Schritts
- Mehrere alternative Vorschläge gleichzeitig
- Konfigurierbare Regeln durch den Nutzer
- Prompt-Templates bearbeitbar in der UI

## Erfolgskriterien
- Nutzer sieht auf der Cockpit-Seite den empfohlenen nächsten Schritt
- Der Vorschlag ist spezifisch (konkreter Skill + konkreter Slice, nicht nur "mach QA")
- Der generierte Prompt enthält genug Kontext für Claude Code
- Ein Klick kopiert den Prompt in die Zwischenablage
- Empfehlung aktualisiert sich wenn sich der Projektzustand ändert

## Offene Punkte (gelöst)
- ~~Exaktes Regelwerk~~ → Architecture V3: 4-Schritt-Logik (Slice finden → Reports prüfen → Skill ableiten → Prompt generieren)
- ~~Prompt-Template-Struktur~~ → Architecture V3: /{skill} + Slice-Referenz + Akzeptanzkriterien + Kontext-Dateien
- ~~Leerzustand~~ → API gibt `recommendation: null` mit Begründung zurück
- ~~Route~~ → Eigene Route `/next-step` unter Workspace-Sektion (DEC-026)
