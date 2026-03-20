# SLC-004 Features Table

## Slice ID
SLC-004

## Name
Features Table

## Related Feature
FEAT-002 Features View

## Purpose
Render the project feature index as a structured data table on the Features page.

## Goal
The Features page shows all features from `features/INDEX.md` in a clean, scannable table with visual status indicators. The user can see at a glance which features are planned, active, done, blocked, or deferred.

## Included in scope

### Data table with these columns
| Column | Source field | Notes |
|---|---|---|
| ID | first column | e.g., "FEAT-001" |
| Feature | second column | feature name |
| Status | third column | planned, ready, in_progress, blocked, done, deferred |
| Priority | fourth column | high, medium, low |
| Notes | fifth column | short text, may be empty |

### Visual status indicators
- Status values displayed as color-coded badges (e.g., green for done, yellow for in_progress, red for blocked, gray for planned)
- Badges must be consistent with the badge style used in SLC-005 (Slices Table)

### Table behavior
- Default sort order: as listed in INDEX.md (no automatic re-sorting required in V1)
- No pagination required (V1 expects 5-20 features)
- No client-side filtering or search required in V1
- No row click / detail navigation (V1 has no feature detail pages)

### Data parsing
- Read `features/INDEX.md` from the selected project directory
- Parse the markdown table expecting 5 columns: ID, Feature, Status, Priority, Notes
- Skip the header row and separator row
- Handle minor formatting variations gracefully (extra whitespace, missing trailing pipe)

## Explicitly out of scope
- Reading individual `features/FEAT-*.md` files
- Feature detail pages
- Feature editing
- Drag-and-drop or board views
- Timeline or roadmap views
- Sorting, filtering, or search controls
- Feature grouping or categorization

## Data sources
- `features/INDEX.md` — the only data source for this view

## States to handle
| Condition | Behavior |
|---|---|
| INDEX.md exists with valid table rows | Render the data table |
| INDEX.md missing | Show: "No feature index found for this project" |
| INDEX.md present but table has zero data rows | Show: "No features defined yet" |
| INDEX.md malformed (no parseable table) | Show: "Could not parse feature index" |
| A row has fewer columns than expected | Show the row with available data, leave missing fields empty |

## Expected result
Features are displayed in a structured table that is faster to scan than reading the raw markdown file.

## Acceptance criteria
- Features page shows a data table with all 5 columns
- All rows from INDEX.md are rendered
- Status values have color-coded badges
- Each empty/error state from the table above works correctly
- The view loads data for the currently selected project
- The table is visually consistent with the cockpit's overall design

## Dependencies
- SLC-001 (layout and Features page route)
- SLC-002 (project context for directory path)

## Risks
- INDEX.md format varying between projects
- Overcomplicating the table component for V1

## Priority
high

## Status
done
