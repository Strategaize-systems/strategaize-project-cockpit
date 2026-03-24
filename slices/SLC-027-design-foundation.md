# SLC-027 — Design Foundation (Theme + CSS)

## Related Features
- FEAT-017 (Brand & Theme Upgrade)

## Status
planned

## Priority
high

## Purpose
Zentrale Design-Tokens und CSS-Variablen auf die neuen Werte aus dem Figma Style Guide aktualisieren. Basis für alle weiteren V4-Slices.

## Scope

### Included
1. **theme.ts komplett neu**: Neue Brand-Farben (#120774, #4454B8), Gradient-Definitionen, Spacing-Skala (8px), Shadow-Stufen (Card, Elevated, Glow), Animation-Timings
2. **globals.css aktualisieren**: :root-Variablen auf neue Werte, Gradient-CSS-Variablen (--gradient-primary, --gradient-success, --gradient-warning, --gradient-sidebar), Shadow-Variablen
3. **Gradient-Utility-Klassen**: .gradient-text-primary, .gradient-text-success etc. in @layer utilities
4. **Sidebar-Variablen**: --sidebar auf Gradient-Werte aktualisieren

### Excluded
- Komponenten-Änderungen (SLC-028)
- Seiten-Änderungen (SLC-030+)

## Key Files
- `/app/src/lib/theme.ts` — komplett neu
- `/app/src/app/globals.css` — :root aktualisieren + neue Utilities

## Acceptance Criteria
- [ ] theme.ts enthält alle Werte aus dem Style Guide (Farben, Gradients, Spacing, Shadows, Timings)
- [ ] globals.css :root hat die neuen Farben und Variablen
- [ ] Gradient-Utilities sind in @layer utilities definiert
- [ ] Sidebar-Variablen sind aktualisiert
- [ ] App startet ohne Fehler (visuell anders aber funktional identisch)
- [ ] 45/45 Tests bestehen
