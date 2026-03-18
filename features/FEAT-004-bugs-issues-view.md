# FEAT-004 Bugs / Issues View

## Feature ID
FEAT-004

## Name
Bugs / Issues View

## Purpose
Provide visibility into known problems and unresolved issues for the selected project so that open risks do not become invisible.

## Problem
Without a dedicated issue view, known problems are scattered across notes, chat context, and memory. Important issues can be forgotten or overlooked during release decisions.

## Goal
Make known issues visible and reviewable. The user should be able to answer: What problems exist? What is still open? What might affect the next release?

## Included in scope

### Issues list
A structured card list displaying issue records parsed from `docs/KNOWN_ISSUES.md`.

Each issue card shows:
- Issue ID and title (e.g., "ISSUE-001 — Short issue title") as card heading
- Status (e.g., open, resolved, wontfix)
- Severity (blocker, high, medium, low)
- Area (affected component or area)
- Summary (short description)
- Impact (if present in source)
- Workaround (if present in source)
- Next action (if present in source)

### V1 display format
- Use a **card list**, not a data table — each issue is a stacked card with labeled fields
- This format is chosen because issue records have 5-8 fields per entry, which is too many for clean table columns
- Optional fields (Impact, Workaround, Next action) are shown when present in the source, omitted silently when absent

### Visual severity clarity
- Severity should be visually distinguishable (color-coded badge on card)
- Open issues should be visually prominent versus resolved ones (e.g., muted styling for resolved)

## Explicitly out of scope
- full issue tracker replacement
- assignment system
- comment threads
- advanced workflow states
- SLA logic
- issue creation from the UI
- reading from `qa/bug-reports/` or any other source (does not exist in V1 project structure)

## Data sources (V1)
- `docs/KNOWN_ISSUES.md` — the **only** data source for this view in V1

### Important: V1 data source limitation
The earlier feature draft referenced `qa/bug-reports/...` as a data source. This directory does not exist in the current project structure and is **not** part of V1.

V1 reads exclusively from `docs/KNOWN_ISSUES.md`, which uses the documented entry structure:
```
### ISSUE-XXX — Short issue title
- Status:
- Severity:
- Area:
- Summary:
- Impact:
- Workaround:
- Next action:
```

## V1 data reading rules
- KNOWN_ISSUES.md is parsed expecting the documented heading + field structure
- Each `### ISSUE-XXX` section becomes one issue entry
- If KNOWN_ISSUES.md is missing: show empty state
- If KNOWN_ISSUES.md contains only "none yet" or similar: show explicit empty state
- If KNOWN_ISSUES.md is malformed: show error state

## UI expectations
- A stacked card list (not a table)
- Accessible from the left sidebar navigation (e.g., "Issues")
- Should work well with 0-20 issues (V1 realistic range)
- The view should be useful even when the list is empty (explicit "no known issues" is valuable information)

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| KNOWN_ISSUES.md missing | Show: "No issues file found for this project" |
| KNOWN_ISSUES.md present but no entries | Show: "No known issues" (this is a positive signal) |
| KNOWN_ISSUES.md malformed | Show: "Could not parse issues file" |

## Acceptance criteria
- known issues are displayed as a card list with all documented fields
- severity and status are visually distinguishable
- open issues are visually prominent
- optional fields (Impact, Workaround, Next action) appear when present, are absent without error when missing
- the "no known issues" state is handled explicitly and clearly
- the view is more usable than manually reading the markdown file
- missing or malformed source produces a clear, non-crashing state
- the view loads for the currently selected project context

## Priority
medium

## Status
planned
