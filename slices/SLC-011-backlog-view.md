# SLC-011 Backlog-Ansicht

## Slice ID
SLC-011

## Name
Backlog-Ansicht

## Related Feature
FEAT-007 Backlog-Sicht

## Purpose
Implement the full Backlog page with structured display, filtering, and sorting of all backlog items.

## Goal
The Backlog page shows all backlog items in a filterable, sortable view. The user can answer: "What work is planned? What is open? What is blocked? How is work distributed across types and priorities?"

## Included in scope

### Backlog display
- Show all backlog items from GET /api/backlog
- Display fields: ID, Title, Type, Priority, Status, Version, Description
- UI pattern: data table (consistent with V1 Features/Slices tables) — Backlog has structured columnar data that fits table layout
- Badges for Type, Priority, Status (reusing existing badge system)

### Filter bar
- Filter by Type (Bug, Fix, Feature, Improvement, Idea, Later — multi-select or dropdown)
- Filter by Priority (High, Medium, Low)
- Filter by Status (Open, In Progress, Done, Deferred, Blocked)
- Filter by Version (from available version values in backlog data)
- Filters are client-side (all data loaded, filtered in browser)
- Active filters are visually indicated
- Filters can be cleared/reset

### Sorting
- Default sort: Priority (high → medium → low), then Status
- User can toggle sort by clicking column headers (if table) or via sort dropdown

### Empty and error states
- No backlog file: "Noch keine Planungsdaten vorhanden" with hint
- Empty backlog: "Keine Backlog-Einträge vorhanden"
- Filter returns no results: "Keine Einträge für diese Filterauswahl"
- Project not accessible: error state

## Explicitly out of scope
- Create/edit UI (SLC-013)
- Inline editing
- Drag-and-drop
- Kanban view
- Pagination (V2 expects manageable item counts)

## Data sources
- GET /api/backlog (from SLC-009)

## States to handle
| Condition | Behavior |
|---|---|
| Backlog items exist | Table with items, filters, sorting |
| No backlog file | Empty state with hint text |
| Empty backlog (0 items) | Empty state message |
| Filters active, no match | "Keine Einträge für diese Filterauswahl" |
| API error | Error state |
| Loading | Loading indicator |

## Expected result
A fully functional Backlog page that replaces the placeholder from SLC-009. Users can see all work items, filter by any dimension, and sort by priority/status.

## Acceptance criteria
- Backlog page shows all items in a structured table
- Type, Priority, Status badges use consistent color coding
- All 4 filter dimensions work (type, priority, status, version)
- Sorting works (at minimum by priority and status)
- Empty states render correctly for each scenario
- Page loads data for the currently selected project
- V1 pages are unaffected

## Dependencies
- SLC-009 (backlog API, sidebar navigation)

## Risks
- Filter UI complexity if many filter dimensions interact
- Table readability with long descriptions

## Priority
high

## Status
done
