# SLC-028 — Shared Components Upgrade

## Related Features
- FEAT-021 (Badge & Status Upgrade)
- FEAT-022 (Interaction & Feedback States)

## Status
planned

## Priority
high

## Purpose
Wiederverwendbare UI-Komponenten auf Premium-Look upgraden: Badges mit Gradient, Cards mit Hover-Transform, Buttons mit Gradient und Glow.

## Scope

### Included
1. **status-badges.ts**: Alle Badge-Klassen auf Gradient-Fill (Success, Warning) bzw. Premium-Neutral umstellen
2. **card.tsx**: Hover: elevated Shadow + Transform Y-2px, Transition 300ms
3. **badge.tsx**: Gradient-Background-Support, Shadow-Support
4. **button.tsx**: Primary = Brand-Gradient + Glow-Shadow + Hover-Transform Y-1px
5. **empty-state.tsx**: Icon-Kreis mit Farb-Hintergrund

### Excluded
- Seiten-spezifische Änderungen
- Neue Komponenten erstellen

## Key Files
- `/app/src/lib/status-badges.ts`
- `/app/src/components/ui/card.tsx`
- `/app/src/components/ui/badge.tsx`
- `/app/src/components/ui/button.tsx`
- `/app/src/components/ui/empty-state.tsx`

## Dependencies
- SLC-027 (nutzt neue Tokens und Gradient-Utilities)

## Acceptance Criteria
- [ ] Success-Badges haben Gradient-Fill mit weißem Text
- [ ] Warning-Badges haben Gradient-Fill
- [ ] Cards haben Hover-Transform + elevated Shadow
- [ ] Primary-Buttons haben Brand-Gradient + Hover-Glow
- [ ] Empty-States haben farbigen Icon-Kreis
- [ ] Alle bestehenden Seiten sehen automatisch anders aus (weil sie shared Components nutzen)
- [ ] 45/45 Tests bestehen
