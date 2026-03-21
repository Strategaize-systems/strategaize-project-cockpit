# SLC-010 Roadmap-Backend

## Slice ID
SLC-010

## Name
Roadmap-Backend

## Related Feature
FEAT-008 Versionen-/Roadmap-Sicht

## Purpose
Create the Roadmap read layer and progress calculation so the Roadmap view and Dashboard can show version data with progress.

## Goal
After this slice is done, the cockpit has a working Roadmap-API that reads `planning/roadmap.json` and enriches each version with calculated progress from backlog data.

## Included in scope

### Roadmap Library (`/app/src/lib/roadmap.ts`)
- `readRoadmap(projectPath)` — reads `planning/roadmap.json`, returns versions array or empty
- `calculateProgress(versions, backlogItems)` — enriches each version with `{ total, done, percentage }` based on matching backlog items
- Handles missing file gracefully (returns empty array)

### Roadmap API Route
- `GET /api/roadmap?projectPath=...` — returns all versions with calculated progress
  - Reads roadmap.json for version definitions
  - Reads backlog.json for progress calculation (imports from backlog.ts)
  - Response: `{ status: "ok" | "not_accessible" | "file_missing" | "empty", versions: [{ ...version, progress: { total, done, percentage } }] }`

Route validates `projectPath` via existing `validateProjectPath()`.

## Explicitly out of scope
- Roadmap creation/editing via UI (read-only in V2)
- Full Roadmap page content (SLC-012)
- Dashboard integration (SLC-014)
- Any changes to backlog.ts (already created in SLC-009)

## Data sources
- `planning/roadmap.json` in the selected project directory (manually maintained)
- `planning/backlog.json` for progress calculation (read via backlog.ts from SLC-009)

## States to handle
| Condition | Behavior |
|---|---|
| roadmap.json exists with versions | GET returns versions with progress |
| roadmap.json missing | GET returns empty array with status "file_missing" |
| roadmap.json exists but backlog.json missing | Versions returned with progress { total: 0, done: 0, percentage: 0 } |
| Version has no matching backlog items | Progress { total: 0, done: 0, percentage: 0 } |
| Version has backlog items, some done | Progress calculated correctly |

## Expected result
A working Roadmap API that returns version definitions enriched with progress data. Testable via direct HTTP requests.

## Acceptance criteria
- GET /api/roadmap returns versions from planning/roadmap.json
- Each version includes calculated progress (total, done, percentage)
- Missing roadmap.json returns empty array gracefully
- Missing backlog.json results in zero progress (not error)
- Invalid projectPath returns appropriate error

## Dependencies
- SLC-009 (backlog.ts for `readBacklogItems`)

## Risks
- Backlog items referencing version IDs that don't exist in roadmap.json (tolerated, not error)

## Priority
high

## Status
done
