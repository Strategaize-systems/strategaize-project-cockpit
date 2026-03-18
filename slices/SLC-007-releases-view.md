# SLC-007 Releases & Migrations View

## Slice ID
SLC-007

## Name
Releases & Migrations View

## Related Feature
FEAT-005 Releases / Migrations View

## Purpose
Render release history and migration history as two stacked card list sections on a single page.

## Goal
The Releases & Migrations page shows both record types in clearly separated sections. The user can answer: "What was released? When? What migrations happened? What are the risks?"

## Included in scope

### Page structure
- Two vertically stacked sections on one page
- Section 1: "Releases" (appears first)
- Section 2: "Migrations" (appears below)
- Each section has its own heading, its own card list, and its own empty/error state
- No tabs — stacked sections per DEC-010
- No artificial merging of the two record types

### Releases section — card fields
Each release entry is rendered as a card:

| Field | Required | Notes |
|---|---|---|
| Release ID + version/name | yes | Card heading, e.g., "REL-001 — v0.1.0" |
| Date | yes | |
| Scope | yes | scope summary |
| Summary | yes | |
| Risks | no | shown when present, omitted when absent |
| Rollback notes | no | shown when present, omitted when absent |

### Migrations section — card fields
Each migration entry is rendered as a card:

| Field | Required | Notes |
|---|---|---|
| Migration ID + title | yes | Card heading, e.g., "MIG-001 — Add user table" |
| Date | yes | |
| Scope / Reason | yes | |
| Affected areas | yes | |
| Risk | no | shown when present, omitted when absent |
| Rollback notes | no | shown when present, omitted when absent |

### Display behavior
- Cards are stacked vertically within each section
- Display order: newest first (reverse of file order, since files typically append chronologically)
- No pagination required (V1 expects 0-20 entries per section)

### Data parsing
- Read `docs/RELEASES.md`: each `### REL-XXX — Title` heading starts a new release entry
- Read `docs/MIGRATIONS.md`: each `### MIG-XXX — Title` heading starts a new migration entry
- Below each heading, expect `- FieldName: value` lines
- If a file contains only "none yet" with no `### REL-` or `### MIG-` headings: treat as empty
- Each file is parsed independently — one file failing does not affect the other section

### Visual style
- Card layout consistent with SLC-006 (Issues View)
- No severity/status badges needed (releases and migrations don't have severity)
- Clean, informational cards

## Explicitly out of scope
- Automated deployment control
- Migration execution tools
- Release pipeline management
- Release comparison or diff views
- Editing records

## Data sources
- `docs/RELEASES.md` — source for releases section
- `docs/MIGRATIONS.md` — source for migrations section

## States to handle
| Condition | Behavior |
|---|---|
| RELEASES.md exists with entries | Releases section renders card list |
| RELEASES.md missing | Releases section shows: "No releases file found" |
| RELEASES.md present but no entries | Releases section shows: "No releases yet" |
| RELEASES.md malformed | Releases section shows: "Could not parse releases file" |
| MIGRATIONS.md exists with entries | Migrations section renders card list |
| MIGRATIONS.md missing | Migrations section shows: "No migrations file found" |
| MIGRATIONS.md present but no entries | Migrations section shows: "No migrations yet" |
| MIGRATIONS.md malformed | Migrations section shows: "Could not parse migrations file" |
| Both files missing | Both sections show their respective "not found" messages |

Each section handles its states independently. A missing RELEASES.md does not affect the Migrations section.

## Expected result
Release and migration history is visible in two clearly separated sections that are faster to review than reading the raw markdown files.

## Acceptance criteria
- Page shows two distinct sections with clear headings
- Release cards display all documented fields
- Migration cards display all documented fields
- Optional fields appear when present, are absent without error when missing
- Each section handles empty/error states independently
- Display order is newest first
- The view loads data for the currently selected project
- Card layout is consistent with SLC-006

## Dependencies
- SLC-001 (layout and Releases page route)
- SLC-002 (project context for directory path)
- SLC-006 (establishes the card list component pattern)

## Risks
- Source file structure varying between projects
- Confusion about whether releases and migrations should be visually merged

## Priority
medium

## Status
planned
