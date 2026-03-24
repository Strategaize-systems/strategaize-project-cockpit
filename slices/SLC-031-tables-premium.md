# SLC-031 — Tabellen-Seiten Premium

## Related Features
- FEAT-020 (Premium Tabellen)
- FEAT-023 (Page-spezifische Upgrades)

## Status
planned

## Priority
high

## Purpose
Alle Tabellen-Seiten (Features, Slices, Backlog, Reports) auf Premium-Look upgraden: Gradient-Top-Border, sortierbare Header, Row-Hover mit Left-Border, Status-Dots.

## Scope

### Included
1. **Tabellen-Container**: 4px Gradient-Top-Border (Brand-Gradient), rounded corners, elevated shadow
2. **Header**: Uppercase, 12px, Sortier-Hover → Brand-Color
3. **Row-Hover**: Subtle Gradient-Background + 4px Left-Border (Brand) + ID in Brand-Color
4. **Status-Dots**: Neben Slice/Feature-Name, mit Glow (Success=Green, Warning=Yellow, Neutral=Slate)
5. **Fortschrittsbalken**: In Slices-Tabelle, Gradient + Glow
6. **KPI-Cards**: Oben auf jeder Tabellen-Seite (Totals, Completed, In Progress etc.)
7. **Seiten**: features/page.tsx, slices/page.tsx, backlog/page.tsx, reports/page.tsx

### Excluded
- Tatsächliche Sortier-Funktionalität
- Action-Icons (vereinfacht: nur visuelles Hover-Pattern wenn sinnvoll)

## Key Files
- `/app/src/app/features/page.tsx`
- `/app/src/app/slices/page.tsx`
- `/app/src/app/backlog/page.tsx`
- `/app/src/app/reports/page.tsx`

## Dependencies
- SLC-027 (Tokens, Gradients)
- SLC-028 (Badge-Styles, Card-Hover)

## Acceptance Criteria
- [ ] Alle 4 Tabellen-Seiten haben Gradient-Top-Border
- [ ] Header sind Uppercase mit Hover-Color
- [ ] Row-Hover zeigt Gradient + Left-Border
- [ ] Status-Dots sind neben Namen sichtbar
- [ ] Slices-Tabelle hat Fortschrittsbalken
- [ ] KPI-Cards oben auf jeder Seite
- [ ] Responsive: Auf kleinem Bildschirm benutzbar
