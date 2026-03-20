# SLC-006 Issues View

## Slice ID
SLC-006

## Name
Issues View

## Related Feature
FEAT-004 Bugs / Issues View

## Purpose
Render known issues and bugs as a card list on the Issues page.

## Goal
The Issues page shows all issue entries from `docs/KNOWN_ISSUES.md` as stacked cards with labeled fields. Open issues are visually prominent. The user can answer: "What problems exist? What is still open?"

## Included in scope

### Card list (not a data table)
Each issue is rendered as a card with these fields:

| Field | Required | Notes |
|---|---|---|
| Issue ID + title | yes | Card heading, e.g., "ISSUE-001 — Short issue title" |
| Status | yes | e.g., open, resolved, wontfix |
| Severity | yes | blocker, high, medium, low |
| Area | yes | affected component or area |
| Summary | yes | short description |
| Impact | no | shown when present in source, omitted silently when absent |
| Workaround | no | shown when present in source, omitted silently when absent |
| Next action | no | shown when present in source, omitted silently when absent |

### Visual indicators
- Severity displayed as color-coded badge on card (red for blocker, orange for high, yellow for medium, gray for low)
- Status displayed as badge (distinct style from severity)
- Resolved/wontfix issues displayed with muted styling (e.g., reduced opacity or lighter colors) so open issues stand out

### Card list behavior
- Cards are stacked vertically, one per issue
- Display order: as listed in the source file (no automatic sorting in V1)
- No pagination required (V1 expects 0-20 issues)

### Data parsing
- Read `docs/KNOWN_ISSUES.md` from the selected project directory
- Each `### ISSUE-XXX — Title` heading starts a new issue entry
- Below each heading, expect `- FieldName: value` lines
- Optional fields (Impact, Workaround, Next action) may be absent — handle gracefully
- If the file contains only "none yet" or similar with no `### ISSUE-` headings: treat as empty

### UI pattern establishment
This is the first card-list view. The card layout and field rendering pattern established here should be reusable for SLC-007 and SLC-008.

## Explicitly out of scope
- Issue creation or editing
- Assignment system
- Comment threads
- SLA logic
- Reading from `qa/bug-reports/` or any other source
- Advanced filtering or search

## Data sources
- `docs/KNOWN_ISSUES.md` — the only data source for this view

## States to handle
| Condition | Behavior |
|---|---|
| KNOWN_ISSUES.md exists with parseable issue entries | Render the card list |
| KNOWN_ISSUES.md missing | Show: "No issues file found for this project" |
| KNOWN_ISSUES.md present but no issue entries (e.g., "none yet") | Show: "No known issues" (this is a positive signal, not an error) |
| KNOWN_ISSUES.md malformed | Show: "Could not parse issues file" |
| An issue entry is missing required fields | Show the card with available data, leave missing required fields as "—" |

## Expected result
Known issues are visible in a structured card list that makes open problems obvious and is faster to review than reading the raw markdown file.

## Acceptance criteria
- Issues page shows a card list with all documented fields
- Severity and status badges are color-coded
- Open issues are visually prominent, resolved issues are muted
- Optional fields appear when present, are absent without error when missing
- "No known issues" state is handled explicitly
- Each error state from the table above works correctly
- The view loads data for the currently selected project

## Dependencies
- SLC-001 (layout and Issues page route)
- SLC-002 (project context for directory path)

## Risks
- KNOWN_ISSUES.md structure varying between projects
- Card layout not scaling well with many fields

## Priority
medium

## Status
done
