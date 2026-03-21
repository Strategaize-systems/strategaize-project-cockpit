# SLC-020 — Nächster-Schritt-Ansicht

## Related Features
- FEAT-013 (Nächster-Schritt-Engine)

## Status
planned

## Priority
high

## Purpose
Cockpit-Seite die den empfohlenen nächsten Schritt anzeigt und den generierten Prompt per Ein-Klick-Kopieren bereitstellt. Ersetzt die Platzhalter-Seite aus SLC-016.

Dies ist die Kernseite des V3-Workspace: der Nutzer öffnet diese Seite, sieht was als nächstes kommt, klickt Kopieren, wechselt zu Claude Code und fügt ein.

## Scope

### Included
1. **Empfehlungs-Anzeige**: Skill, Slice, Feature, Begründung, Confidence-Level.
2. **Prompt-Anzeige**: Vollständiger generierter Prompt in einem visuell abgegrenzten Bereich (Code-Block-Stil).
3. **Kopieren-Button**: Ein Klick kopiert den Prompt in die Zwischenablage. Visuelles Feedback (z.B. "Kopiert!").
4. **Kein-Schritt-Zustand**: Anzeige wenn alle Slices abgeschlossen sind.
5. **Loading-State**: Während die Engine lädt.
6. **Letzte Reports**: Kurzübersicht der letzten 2-3 Reports unter der Empfehlung (Kontext).

### Excluded
- Automatische Ausführung des Prompts
- Prompt-Bearbeitung vor dem Kopieren (wird als-is kopiert)
- Mehrfach-Empfehlungen (V3.0 zeigt immer genau einen nächsten Schritt)

## Key Files

### Modifizierte Dateien
- `/app/src/app/next-step/page.tsx` (Platzhalter aus SLC-016 ersetzen)

### Genutzte bestehende Dateien
- `/app/src/app/api/next-step/route.ts` (aus SLC-019)
- `/app/src/app/api/reports/route.ts` (aus SLC-017, für letzte Reports)
- `/app/src/components/ui/*`

## Dependencies
- SLC-019 (nutzt GET /api/next-step)
- SLC-017 (nutzt GET /api/reports für Kontext)

## Technical Notes

### Clipboard-API
```typescript
await navigator.clipboard.writeText(prompt);
```
Standard Web API, funktioniert in allen modernen Browsern auf localhost.

### Layout-Empfehlung
```
┌──────────────────────────────────────┐
│  Nächster Schritt                    │
│                                      │
│  Empfehlung: /frontend für SLC-018   │
│  Feature: FEAT-012 (Report-Ansicht)  │
│  Confidence: ● hoch                  │
│  Begründung: ...                     │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ Prompt:                      │    │
│  │ /frontend — Implementiere    │    │
│  │ SLC-018 ...                  │    │
│  │                    [Kopieren]│    │
│  └──────────────────────────────┘    │
│                                      │
│  Letzte Reports:                     │
│  RPT-003 — Review SLC-017 (geprüft) │
│  RPT-002 — Frontend SLC-016 (ok)    │
└──────────────────────────────────────┘
```

### Visuelles Feedback beim Kopieren
Button-Text wechselt für 2 Sekunden von "Kopieren" zu "Kopiert!" (oder Icon-Wechsel).

## Acceptance Criteria
- [ ] Empfehlung wird korrekt angezeigt (Skill, Slice, Feature, Begründung)
- [ ] Confidence-Level ist visuell unterscheidbar (hoch/mittel/niedrig)
- [ ] Prompt wird in einem klar abgegrenzten Bereich angezeigt
- [ ] Kopieren-Button kopiert den vollständigen Prompt in die Zwischenablage
- [ ] Visuelles Feedback nach dem Kopieren (z.B. "Kopiert!")
- [ ] Kein-Schritt-Zustand wird korrekt angezeigt wenn alle Slices done sind
- [ ] Loading-State wird angezeigt während die Engine lädt
- [ ] Letzte 2-3 Reports werden als Kontext angezeigt
- [ ] Responsive: Auf kleinem Bildschirm benutzbar
