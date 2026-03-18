# FEAT-003 Slices View

## Feature ID
FEAT-003

## Name
Slices View

## Purpose
Provide structured visibility into implementation slices so active work and next implementation steps are easy to identify and resume after interruption.

## Problem
Without a clear slice view, it is hard to see which execution unit is currently active, which is next, and what the overall implementation progress looks like. This is especially painful when resuming work after a break.

## Goal
Make the slice index scannable, status-visible, and resume-oriented. The user should be able to open this view and immediately know: What was I working on? What comes next?

## Included in scope

### Slice table
A table displaying the following columns from `slices/INDEX.md`:
- Slice ID (e.g., SLC-001)
- Slice name
- Related Feature (e.g., FEAT-001)
- Status (planned, ready, in_progress, blocked, qa_pending, done)
- Priority (high, medium, low)
- Notes (short text)

### Resume orientation
- Slices with status `in_progress` should be visually prominent (e.g., highlighted row or top-of-list placement)
- Slices with status `ready` or `planned` with high priority represent "next work"
- The view should make the active work unit obvious without requiring the user to scan the entire list
- Resume orientation is derived purely from status and priority — no additional logic or heuristics

### Visual status clarity
- Status should be visually distinguishable (badges/labels consistent with features view)
- Feature relation should be readable (show feature ID or name)

### V1 detail behavior
- V1 does **not** render individual slice detail pages
- The table view is the complete slice visibility layer in V1

## Explicitly out of scope
- automatic slice scheduling or ordering
- task engine behavior
- advanced PM board logic
- editing slice data directly in V1
- reading individual `slices/SLC-*.md` files in V1
- slice detail pages
- progress bars or percentage calculations
- automatic "next slice" recommendation logic

## Data sources (V1)
- `slices/INDEX.md` — the only data source for this view in V1

## V1 data reading rules
- The INDEX.md file is parsed expecting a markdown table with columns: ID, Slice, Related Feature, Status, Priority, Notes
- Parsing should handle minor formatting variations gracefully
- If INDEX.md is missing: show empty state
- If INDEX.md is malformed: show error state

## UI expectations
- A clean data table, consistent with the features table pattern
- Accessible from the left sidebar navigation under a clear label (e.g., "Slices")
- The table should work well with 5-30 slices (V1 realistic range)
- Active slices (`in_progress`) should be visually distinct from the rest

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| slices/INDEX.md missing | Show: "No slice index found for this project" |
| slices/INDEX.md present but empty table | Show: "No slices defined yet" |
| slices/INDEX.md malformed | Show: "Could not parse slice index" |

## Acceptance criteria
- slices are displayed in a structured table
- all six columns (ID, name, related feature, status, priority, notes) are visible
- in_progress slices are visually prominent
- feature relation is visible per slice
- the table is more usable than manually reading the markdown file
- the view supports fast resume after interruption
- missing or malformed INDEX.md produces a clear, non-crashing state
- the view loads for the currently selected project context

## Priority
high

## Status
planned
