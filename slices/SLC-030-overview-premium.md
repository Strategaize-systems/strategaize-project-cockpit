# SLC-030 — Übersichtsseite Premium

## Related Features
- FEAT-019 (Premium KPI-Cards)
- FEAT-023 (Page-spezifische Upgrades)

## Status
planned

## Priority
high

## Purpose
Übersichtsseite zum Premium-Dashboard upgraden: Header-Banner mit Brand-Gradient, KPI-Cards mit Gradient-Zahlen und Hover-Glow, Fortschrittsanzeige Premium.

## Scope

### Included
1. **Header-Banner**: Gradient-Card (Blau → Indigo) mit weißem Titel + Projektbeschreibung
2. **KPI-Cards**: 4px Gradient-Top-Border, große Zahlen als Gradient-Text, Icon-Kreise in Farbe, Hover-Glow
3. **Fortschritts-Sektion**: Premium-Progressbars mit Gradient + Glow
4. **Spacing**: 8px-Grid durchsetzen

### Excluded
- Neue KPI-Metriken
- Dashboard-Layout-Änderungen

## Key Files
- `/app/src/app/page.tsx`

## Dependencies
- SLC-027 (Tokens)
- SLC-028 (Card-Hover, Badge-Styles)

## Acceptance Criteria
- [ ] Header-Banner mit Brand-Gradient ist sichtbar
- [ ] KPI-Cards haben Gradient-Top-Border
- [ ] Große Zahlen haben Gradient-Text-Effekt
- [ ] KPI-Cards haben Hover-Glow
- [ ] Fortschrittsbalken haben Gradient + Glow
- [ ] Spacing ist konsistent (8px-Grid)
