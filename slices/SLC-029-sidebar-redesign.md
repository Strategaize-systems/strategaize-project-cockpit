# SLC-029 — Sidebar Redesign

## Related Features
- FEAT-018 (Sidebar Redesign)

## Status
planned

## Priority
high

## Purpose
Sidebar visuell upgraden zum Premium-Look: Gradient-Hintergrund, Active-State mit Glow, Logo mit Gradient-Text.

## Scope

### Included
1. **Background**: Gradient (linear-gradient to bottom, #0f172a → #020617)
2. **Active Nav-Item**: Brand-Gradient background + Glow-Shadow (0 10px 15px rgba(68,84,184,0.25))
3. **Hover Nav-Item**: rgba(255,255,255,0.05) Background
4. **Logo-Bereich**: "StrategAIze" mit Gradient-Text, Untertitel "Project Cockpit / Operations Dashboard"
5. **Section-Header**: 10px, Uppercase, Letter-Spacing 0.12em, Farbe #64748b
6. **Footer**: Version subtil

### Excluded
- Navigation-Struktur ändern
- Neue Sidebar-Items

## Key Files
- `/app/src/components/sidebar.tsx`

## Dependencies
- SLC-027 (nutzt Gradient-CSS-Variablen)

## Acceptance Criteria
- [ ] Sidebar hat Gradient-Hintergrund (dunkel oben → dunkler unten)
- [ ] Aktives Nav-Item hat Brand-Gradient + Glow
- [ ] Hover zeigt subtle White-Overlay
- [ ] Logo-Text hat Gradient-Effekt
- [ ] Section-Header sind 10px Uppercase mit Letter-Spacing
- [ ] Collapsed-State funktioniert weiterhin
- [ ] Mobile-Overlay funktioniert weiterhin
