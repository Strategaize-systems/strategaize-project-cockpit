# SLC-005 Slices Table

## Slice ID
SLC-005

## Name
Slices Table

## Related Feature
FEAT-003 Slices View

## Purpose
Render the project slice index as a structured data table on the Slices page, with visual emphasis on active work for fast resume.

## Goal
The Slices page shows all slices from `slices/INDEX.md` in a clean table. Slices with status `in_progress` are visually prominent so the user immediately sees what was being worked on. The user can answer: "What was I working on? What comes next?"

## Included in scope

### Data table with these columns
| Column | Source field | Notes |
|---|---|---|
| ID | first column | e.g., "SLC-001" |
| Slice | second column | slice name |
| Related Feature | third column | e.g., "FEAT-001" |
| Status | fourth column | planned, ready, in_progress, blocked, qa_pending, done |
| Priority | fifth column | high, medium, low |
| Notes | sixth column | short text, may be empty |

### Resume orientation
- Rows with status `in_progress` are visually highlighted (e.g., subtle background color, left border accent, or bold text)
- This highlighting makes the currently active slice(s) immediately obvious without scanning
- The highlighting is purely visual — no sorting or reordering is applied

### Visual status indicators
- Status values displayed as color-coded badges, consistent with SLC-004 (Features Table)
- Additional status values vs. features: `qa_pending` gets its own badge color (e.g., blue or orange)

### Table behavior
- Default sort order: as listed in INDEX.md
- No pagination required (V1 expects 5-30 slices)
- No client-side filtering or search required in V1
- No row click / detail navigation (V1 has no slice detail pages)

### Data parsing
- Read `slices/INDEX.md` from the selected project directory
- Parse the markdown table expecting 6 columns: ID, Slice, Related Feature, Status, Priority, Notes
- Skip the header row and separator row
- Handle minor formatting variations gracefully

## Explicitly out of scope
- Reading individual `slices/SLC-*.md` files
- Slice detail pages
- Slice editing
- Automatic "next slice" recommendation logic
- Progress bars or percentage calculations
- Automatic slice scheduling or ordering

## Data sources
- `slices/INDEX.md` — the only data source for this view

## States to handle
| Condition | Behavior |
|---|---|
| INDEX.md exists with valid table rows | Render the data table with resume highlighting |
| INDEX.md missing | Show: "No slice index found for this project" |
| INDEX.md present but table has zero data rows | Show: "No slices defined yet" |
| INDEX.md malformed (no parseable table) | Show: "Could not parse slice index" |
| No slices have status in_progress | Table renders normally, no highlighting — this is valid |
| A row has fewer columns than expected | Show the row with available data, leave missing fields empty |

## Expected result
Slices are displayed in a structured table with resume orientation that makes active work immediately visible.

## Acceptance criteria
- Slices page shows a data table with all 6 columns
- All rows from INDEX.md are rendered
- Status values have color-coded badges consistent with SLC-004
- `in_progress` rows are visually highlighted
- Each empty/error state from the table above works correctly
- The view loads data for the currently selected project
- The table supports fast resume: active slices are obvious at a glance

## Dependencies
- SLC-001 (layout and Slices page route)
- SLC-002 (project context for directory path)
- SLC-004 (establishes the table component pattern and badge styles — SLC-005 reuses them)

## Risks
- INDEX.md format varying between projects
- Resume highlighting being too subtle or too aggressive

## Priority
high

## Status
planned
