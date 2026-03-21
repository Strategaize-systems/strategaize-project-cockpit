# SLC-009 V2 Fundament (Read)

## Slice ID
SLC-009

## Name
V2 Fundament (Read)

## Related Feature
FEAT-007 Backlog-Sicht, FEAT-008 Versionen-/Roadmap-Sicht

## Purpose
Create the foundational V2 read layer and navigation structure so all later V2 slices have a working read API and navigable entry points.

## Goal
After this slice is done, the cockpit has a working Backlog read API, an updated sidebar with section grouping ("Projekt" / "Planung"), and placeholder pages for /backlog and /roadmap. No write capability, no full page content — only the read foundation and navigation skeleton.

## Included in scope

### Backlog Library (`/app/src/lib/backlog.ts`)
- `readBacklogItems(projectPath)` — reads `planning/backlog.json`, returns items array or empty
- TypeScript types/interfaces for BacklogItem
- Handles missing file gracefully (returns empty array, not error)

Write functions (`writeBacklogItems`, `generateBacklogId`, `validateBacklogItem`) are NOT part of this slice — they belong to SLC-013.

### Backlog API Route (read-only)
- `GET /api/backlog?projectPath=...` — returns all backlog items
  - Response: `{ status: "ok" | "not_accessible" | "file_missing" | "empty", items: [...] }`
  - Validates `projectPath` via existing `validateProjectPath()`

No POST or PATCH routes in this slice.

### Sidebar modification (`/app/src/components/sidebar.tsx`)
- Add section labels: "Projekt" (existing 6 items) and "Planung" (new 2 items)
- Add nav item: Backlog (`/backlog`) with appropriate icon
- Add nav item: Roadmap (`/roadmap`) with appropriate icon
- Existing 6 nav items remain unchanged in order and behavior

Note: `sidebar.tsx` is an existing V1 file. This is a controlled V1 modification limited to adding section labels and 2 nav items.

### Placeholder pages
- `/app/src/app/backlog/page.tsx` — renders page title + "Inhalt folgt"
- `/app/src/app/roadmap/page.tsx` — renders page title + "Inhalt folgt"

## Explicitly out of scope
- Write functions in backlog.ts (SLC-013)
- POST /api/backlog (SLC-013)
- PATCH /api/backlog/update (SLC-014)
- Roadmap library and API (SLC-010)
- Full Backlog page content with filter/sort (SLC-011)
- Backlog create/edit UI (SLC-013, SLC-014)
- Dashboard modifications (SLC-015)

## Data sources
- `planning/backlog.json` in the selected project directory (read-only)

## States to handle
| Condition | Behavior |
|---|---|
| planning/backlog.json exists with items | GET returns items array |
| planning/backlog.json missing | GET returns empty array with status "file_missing" |
| planning/backlog.json malformed | GET returns status "file_malformed" |
| Project not accessible | GET returns status "not_accessible" |

## Expected result
A working Backlog read API and V2 navigation structure. The backlog API can be tested via direct HTTP requests. The sidebar shows the V2 "Planung" section with navigable entries. No write capability exists yet.

## Acceptance criteria
- GET /api/backlog returns items from planning/backlog.json (or empty if file missing)
- Sidebar shows "Projekt" and "Planung" section labels
- Sidebar shows Backlog and Roadmap nav items
- Clicking Backlog/Roadmap navigates to placeholder pages
- Existing V1 navigation is unchanged
- No write operations exist in this slice

## V1 files modified
- `/app/src/components/sidebar.tsx` — section labels and 2 new nav items added

## Dependencies
None. V1 is complete. This is the first V2 slice.

## Risks
- Sidebar modification could affect V1 navigation feel (mitigated by keeping existing items unchanged)

## Priority
high

## Status
done
