# SLC-015 Dashboard-Erweiterung

## Slice ID
SLC-015

## Name
Dashboard-Erweiterung

## Related Feature
FEAT-009 Erweitertes Fortschritts-Dashboard

## Purpose
Enhance the existing overview page with progress, priority, and blocker visibility from V2 backlog and roadmap data.

## Goal
The overview page shows V2 planning data alongside the existing V1 project state: progress per version, priority distribution, blocker count, and open items by type. The user can answer at a glance: "How is the project progressing? Are there blockers? What types of work are open?"

## Included in scope

### Progress per version
- Show each active/planned version with a progress indicator
- Progress = done items / total items for that version
- Compact format (e.g., small progress bars or "X/Y" with percentage)
- Reuses progress display pattern from Roadmap page

### Priority distribution
- Summary of open items by priority (High: X, Medium: Y, Low: Z)
- Simple count display, no charts
- Only counts non-done items

### Blocker visibility
- Count of items with status "blocked"
- Visually prominent if count > 0 (e.g., red badge or highlighted card)
- Calm/muted if count = 0

### Open items by type
- Summary of open items by type (Bug: X, Feature: Y, Improvement: Z, etc.)
- Simple count display

### Layout integration
- New section on the existing overview page, below the current V1 content
- Section heading: "Planung" or "Fortschritt"
- Uses existing card patterns
- Does not modify the existing V1 overview cards (Status, Phase, Version, Focus, Next Steps, Blockers)

Note: `page.tsx` (overview) is an existing V1 file. This is a controlled V1 modification limited to adding a new section below existing content.

## Explicitly out of scope
- Separate dashboard page (integrates into existing overview)
- Charts, graphs, or advanced visualizations
- Historical progress curves
- Cross-project dashboard
- Clicking progress indicators to navigate to filtered backlog
- Alerts or notifications

## Data sources
- GET /api/backlog (from SLC-009) — for priority/type/status aggregation
- GET /api/roadmap (from SLC-010) — for version progress

## States to handle
| Condition | Behavior |
|---|---|
| Backlog and Roadmap data available | Show all progress sections |
| No backlog file | "Planung" section shows: "Noch keine Planungsdaten vorhanden" |
| No roadmap file | Version progress section omitted, other sections still shown |
| Both files missing | "Planung" section shows combined empty state |
| No blockers | Blocker indicator shows "0" in calm/muted style |
| Blockers exist | Blocker indicator prominent (red/warning) |
| All items done | Progress shows 100%, celebration-neutral display |

## Expected result
The overview page provides a complete picture of both project state (V1) and planning progress (V2) on a single page.

## Acceptance criteria
- Overview page shows new "Planung"/"Fortschritt" section below existing content
- Version progress indicators show correct done/total counts
- Priority distribution shows correct counts for open items
- Blocker count is visually prominent when > 0
- Type distribution shows correct counts
- Empty states handled gracefully when backlog/roadmap data is missing
- Existing V1 overview content is unchanged
- All new UI copy is German

## V1 files modified
- `/app/src/app/page.tsx` — new planning/progress section added below existing V1 content

## Dependencies
- SLC-009 (backlog read API)
- SLC-010 (roadmap API with progress)

## Risks
- Overview page becomes too long with both V1 and V2 sections
- Data loading increases (now 3 API calls: state, backlog, roadmap)

## Priority
medium

## Status
done
