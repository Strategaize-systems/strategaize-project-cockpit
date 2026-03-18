# FEAT-002 Features View

## Feature ID
FEAT-002

## Name
Features View

## Purpose
Provide structured visibility into the feature-level scope of the selected project. The user should be able to see at a glance which features are planned, active, done, blocked, or deferred.

## Problem
Feature scope is often unclear once multiple additions, changes, and ideas accumulate over time. Reading raw INDEX.md is functional but not fast or comfortable.

## Goal
Make the feature index scannable and status-visible in a structured table view.

## Included in scope

### Feature table
A table displaying the following columns from `features/INDEX.md`:
- Feature ID (e.g., FEAT-001)
- Feature name
- Status (planned, ready, in_progress, blocked, done, deferred)
- Priority (high, medium, low)
- Notes (short text)

### Visual status clarity
- Status should be visually distinguishable (e.g., color-coded badges or labels)
- The table should be sortable or at minimum ordered by priority

### V1 detail behavior
- V1 does **not** render individual feature detail pages
- The table view is the complete feature visibility layer in V1
- If individual feature files exist, they are not read or displayed in V1

## Explicitly out of scope
- drag-and-drop boards
- advanced PM workflows
- feature editing interface in V1
- timeline forecasting
- reading individual `features/FEAT-*.md` files in V1
- feature detail pages
- feature grouping or categorization beyond what INDEX.md provides

## Data sources (V1)
- `features/INDEX.md` — the only data source for this view in V1

## V1 data reading rules
- The INDEX.md file is parsed expecting a markdown table with columns: ID, Feature, Status, Priority, Notes
- Parsing should handle minor formatting variations gracefully
- If INDEX.md is missing: show empty state
- If INDEX.md is malformed: show error state with explanation

## UI expectations
- A clean data table, consistent with the cockpit's table pattern
- Accessible from the left sidebar navigation under a clear label (e.g., "Features")
- The table should work well with 5-20 features (V1 realistic range)

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| features/INDEX.md missing | Show: "No feature index found for this project" |
| features/INDEX.md present but empty table | Show: "No features defined yet" |
| features/INDEX.md malformed | Show: "Could not parse feature index" |

## Acceptance criteria
- features are displayed in a structured table
- all five columns (ID, name, status, priority, notes) are visible
- status values are visually distinguishable
- the table is more usable than manually reading the markdown file
- missing or malformed INDEX.md produces a clear, non-crashing state
- the view loads for the currently selected project context

## Priority
high

## Status
planned
