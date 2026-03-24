# SLC-033 — Workspace-Seiten Premium

## Related Features
- FEAT-023 (Page-spezifische Upgrades)
- FEAT-022 (Interaction & Feedback States)

## Status
planned

## Priority
medium

## Purpose
Workspace-Seiten auf Premium-Look upgraden: Nächster Schritt mit dunklem Prompt-Block und priorisierter Aufgaben-Liste, Loading-Spinner mit Brand-Color.

## Scope

### Included
1. **Nächster Schritt**: Dunkler Prompt-Block (near-black background), großer "Prompt Kopieren"-Button mit Brand-Gradient, priorisierte Aufgaben-Liste mit Kategorie-Badges und Priority-Dots
2. **Loading-Spinner**: Brand-Color Spinner statt Text "wird geladen..."
3. **Toast-Notifications**: Falls machbar, Bottom-Right Toast für Kopier-Feedback

### Excluded
- Neue Funktionalität
- Reports-Seite (bereits in SLC-031 als Tabelle)

## Key Files
- `/app/src/app/next-step/page.tsx`

## Dependencies
- SLC-028 (Badge-Styles, Button-Gradient)

## Acceptance Criteria
- [ ] Prompt-Block hat dunklen Hintergrund
- [ ] "Prompt Kopieren" Button hat Brand-Gradient
- [ ] Aufgaben-Liste hat Kategorie-Badges und Priority-Dots
- [ ] Loading zeigt Brand-Color Spinner
- [ ] Kopier-Feedback ist visuell sichtbar
