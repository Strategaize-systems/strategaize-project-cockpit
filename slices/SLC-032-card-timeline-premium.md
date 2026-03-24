# SLC-032 — Card/Timeline-Seiten Premium

## Related Features
- FEAT-023 (Page-spezifische Upgrades)

## Status
planned

## Priority
medium

## Purpose
Card- und Timeline-basierte Seiten upgraden: Issues mit Premium-Cards, Releases mit Timeline-Dots, Decisions mit Card-Upgrade, Roadmap mit Meilenstein-Timeline.

## Scope

### Included
1. **Issues**: Card-Upgrade mit Status-Dots, Hover-Transform, Severity-Badges Premium
2. **Releases**: Timeline-Stil mit farbigen Dots (Grün=Released, Orange=Planned), expandierbare Details, Version-Badges
3. **Decisions**: Card-Upgrade, Section-Trennung
4. **Roadmap**: Timeline-Meilensteine mit Fortschrittsbalken, Status-Badges

### Excluded
- Neue Datenfelder
- Neue Seiten-Layouts

## Key Files
- `/app/src/app/issues/page.tsx`
- `/app/src/app/releases/page.tsx`
- `/app/src/app/decisions/page.tsx`
- `/app/src/app/roadmap/page.tsx`

## Dependencies
- SLC-028 (Card-Hover, Badge-Styles)

## Acceptance Criteria
- [ ] Issues-Cards haben Hover-Transform + Status-Dots
- [ ] Releases zeigen Timeline mit farbigen Dots
- [ ] Roadmap zeigt Meilenstein-Timeline mit Fortschritt
- [ ] Decisions haben Card-Upgrade
- [ ] Alle Seiten konsistent mit neuem Design
