# SLC-008 Decisions & Improvements View

## Slice ID
SLC-008

## Name
Decisions & Improvements View

## Related Feature
FEAT-006 Decisions / Skill Improvements View

## Purpose
Render project decisions and dev-system improvement findings as two stacked card list sections on a single page.

## Goal
The Decisions & Improvements page shows both record types in clearly separated sections. The user can answer: "What decisions shaped this project? What recurring problems should improve the dev system?"

## Included in scope

### Page structure
- Two vertically stacked sections on one page
- Section 1: "Decisions" (appears first)
- Section 2: "Skill Improvements" (appears below)
- Each section has its own heading, its own card list, and its own empty/error state
- No tabs — stacked sections per DEC-010
- No artificial merging — these two record types have different structures and different purposes

### Decisions section — card fields
Each decision entry is rendered as a card:

| Field | Required | Notes |
|---|---|---|
| Decision ID + title | yes | Card heading, e.g., "DEC-001 — V1 is read-oriented" |
| Status | yes | e.g., accepted, superseded, deprecated |
| Reason | yes | short rationale |
| Consequence | yes | impact summary |

### Skill Improvements section — card fields
Each improvement entry is rendered as a card:

| Field | Required | Notes |
|---|---|---|
| Improvement ID + title | yes | Card heading, e.g., "IMP-001 — Slice planning needs state handling" |
| Date | yes | |
| Source | yes | where the finding originated |
| Observation | yes | |
| Suggested improvement | yes | |
| Affected area | yes | |
| Status | yes | |

### Display behavior
- Cards are stacked vertically within each section
- Display order: as listed in the source files (decisions are typically in definition order, improvements in chronological order)
- No pagination required (V1 expects 5-30 decisions, 0-15 improvements)

### Data parsing — important difference
- `docs/DECISIONS.md`: each `## DEC-XXX — Title` heading starts a new entry (note: `##` level, not `###`)
- `docs/SKILL_IMPROVEMENTS.md`: each `### IMP-XXX — Title` heading starts a new entry (note: `###` level)
- The different heading levels are intentional in the source files — the parser must handle both correctly
- Below each heading, expect `- FieldName: value` lines
- If a file contains only "none yet" with no matching headings: treat as empty
- Each file is parsed independently

### Visual style
- Card layout consistent with SLC-006 and SLC-007
- Decision status displayed as badge (e.g., green for accepted, gray for superseded, red for deprecated)
- Improvement cards: no special badge styling needed, clean labeled fields

### Key distinction (for UI clarity)
- **Decisions** are project-specific directional choices
- **Skill Improvements** are cross-project system learnings
- This distinction should be clear from the section headings but does not require additional UI treatment

## Explicitly out of scope
- Automated system evolution
- Editing records
- Governance or approval workflows
- Decision dependency graphs
- Improvement tracking/ticketing

## Data sources
- `docs/DECISIONS.md` — source for decisions section
- `docs/SKILL_IMPROVEMENTS.md` — source for skill improvements section

## States to handle
| Condition | Behavior |
|---|---|
| DECISIONS.md exists with entries | Decisions section renders card list |
| DECISIONS.md missing | Decisions section shows: "No decisions file found" |
| DECISIONS.md present but no entries | Decisions section shows: "No decisions recorded yet" |
| DECISIONS.md malformed | Decisions section shows: "Could not parse decisions file" |
| SKILL_IMPROVEMENTS.md exists with entries | Improvements section renders card list |
| SKILL_IMPROVEMENTS.md missing | Improvements section shows: "No skill improvements file found" |
| SKILL_IMPROVEMENTS.md present but no entries | Improvements section shows: "No skill improvements recorded yet" |
| SKILL_IMPROVEMENTS.md malformed | Improvements section shows: "Could not parse improvements file" |
| Both files missing | Both sections show their respective "not found" messages |

Each section handles its states independently.

## Expected result
Decisions and skill improvement records are visible in two clearly separated sections that are faster to review than reading the raw markdown files.

## Acceptance criteria
- Page shows two distinct sections with clear headings
- Decision cards display ID, title, status, reason, and consequence
- Decision status values have color-coded badges
- Improvement cards display all 7 documented fields
- Each section handles empty/error states independently
- Different heading levels (`##` vs `###`) are parsed correctly
- The view loads data for the currently selected project
- Card layout is consistent with SLC-006 and SLC-007

## Dependencies
- SLC-001 (layout and Decisions page route)
- SLC-002 (project context for directory path)
- SLC-006 (establishes the card list component pattern)

## Risks
- The different heading levels between DECISIONS.md and SKILL_IMPROVEMENTS.md causing parser bugs
- Decision entries having inconsistent field structures across projects

## Priority
medium

## Status
planned
