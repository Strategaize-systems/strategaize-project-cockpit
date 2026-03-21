# SLC-012 Roadmap-Ansicht

## Slice ID
SLC-012

## Name
Roadmap-Ansicht

## Related Feature
FEAT-008 Versionen-/Roadmap-Sicht

## Purpose
Implement the full Roadmap page showing project versions with scope, status, and progress indicators.

## Goal
The Roadmap page shows all defined project versions in order, each with status, scope summary, assigned item count, and a progress indicator. The user can answer: "What versions exist? How far is each version? What is the current active version?"

## Included in scope

### Version display
- Show all versions from GET /api/roadmap
- Display per version: Name, Status, Summary, Item count, Progress
- UI pattern: card list — each version as a card (similar to V1 card patterns)
- Cards ordered by `order` field (ascending)
- Active version visually prominent
- Released versions with muted/completed styling

### Progress indicator
- Progress bar or percentage display per version
- Based on: done items / total items assigned to that version
- Shows "X von Y erledigt" or similar
- Zero items: show "Keine zugeordneten Einträge"

### Status badges
- released, active, planned, deferred — color-coded badges
- Active = primary color, Released = muted/success, Planned = neutral, Deferred = warning

### Empty and error states
- No roadmap file: "Noch keine Roadmap-Daten vorhanden" with hint that planning/roadmap.json needs to be created manually
- Empty roadmap (0 versions): "Keine Versionen definiert"
- Project not accessible: error state

## Explicitly out of scope
- Version creation/editing via UI (read-only in V2)
- Gantt chart or timeline view
- Clicking a version to see its items (cross-link to backlog)
- Cross-project roadmap

## Data sources
- GET /api/roadmap (from SLC-010 — includes progress data)

## States to handle
| Condition | Behavior |
|---|---|
| Versions exist with progress data | Card list with progress bars |
| No roadmap file | Empty state with hint about manual creation |
| Empty roadmap (0 versions) | Empty state message |
| Version with 0 assigned items | Card shows "Keine zugeordneten Einträge" |
| API error | Error state |
| Loading | Loading indicator |

## Expected result
A fully functional Roadmap page that replaces the placeholder from SLC-009. Users can see all project versions, their status, and progress at a glance.

## Acceptance criteria
- Roadmap page shows all versions as cards in correct order
- Each card shows name, status badge, summary, progress indicator
- Progress shows done/total items and visual bar
- Active version is visually prominent
- Empty states render correctly for each scenario
- Page loads data for the currently selected project
- V1 pages are unaffected

## Dependencies
- SLC-009 (sidebar navigation with Roadmap entry)
- SLC-010 (roadmap API with progress data)

## Risks
- Roadmap.json not existing initially (clear empty state guidance needed)
- Progress bar misleading if few items are assigned

## Priority
high

## Status
done
