# FEAT-005 Releases / Migrations View

## Feature ID
FEAT-005

## Name
Releases / Migrations View

## Purpose
Provide visibility into release history and migration history so technical change records are easy to review and understand. Both record types share a navigation entry but are displayed as distinct sections within the same page.

## Problem
Release and migration records often become hard to review when they exist only as raw markdown. Understanding what was released, what changed structurally, and what rollback options exist requires manual file inspection.

## Goal
Make release and migration history visible in a clean internal view. The user should be able to answer: What was released? When? What migrations happened? What risks exist?

## Included in scope

### Releases section
A structured list displaying release entries parsed from `docs/RELEASES.md`:
- Release ID (e.g., REL-001)
- Version or release name
- Date
- Scope summary
- Summary
- Risks
- Rollback notes

### Migrations section
A separate structured list displaying migration entries parsed from `docs/MIGRATIONS.md`:
- Migration ID (e.g., MIG-001)
- Migration title
- Date
- Scope / reason
- Affected areas
- Risk
- Rollback notes

### UI separation
- Releases and migrations are displayed as **two distinct sections** on the same page (e.g., tabs, or stacked sections with clear headings)
- They share a single sidebar navigation entry (e.g., "Releases & Migrations")
- Each section has its own empty state handling
- No artificial merging of the two record types into a unified list

## Explicitly out of scope
- automated deployment control
- migration execution tools
- release pipeline management
- advanced release dashboards
- release comparison or diff views
- editing records in V1

## Data sources (V1)
- `docs/RELEASES.md` — source for release entries
- `docs/MIGRATIONS.md` — source for migration entries

## V1 data reading rules
- Each file is parsed expecting the documented heading + field structure
- RELEASES.md: each `### REL-XXX` section becomes one release entry
- MIGRATIONS.md: each `### MIG-XXX` section becomes one migration entry
- If a file is missing: show empty state for that section only (the other section still works)
- If a file contains only "none yet": show explicit empty state
- If a file is malformed: show error state for that section

## UI expectations
- Accessible from the left sidebar navigation under a single label (e.g., "Releases & Migrations")
- Releases section appears first, migrations section below (or as a second tab)
- Each section should work well with 0-20 entries (V1 realistic range)
- Chronological order (newest first) is the default

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| RELEASES.md missing | Releases section shows: "No releases file found" |
| RELEASES.md present but no entries | Show: "No releases yet" |
| MIGRATIONS.md missing | Migrations section shows: "No migrations file found" |
| MIGRATIONS.md present but no entries | Show: "No migrations yet" |
| Both files missing | Both sections show their respective empty states |
| Either file malformed | Affected section shows: "Could not parse [releases/migrations] file" |

## Acceptance criteria
- release entries are displayed in a structured format
- migration entries are displayed separately in a structured format
- both sections exist on the same page but are clearly distinct
- rollback notes and risks are visible where present
- empty states are handled explicitly per section
- the view is more usable than manually reading the markdown files
- missing or malformed source produces a clear, non-crashing state per section
- the view loads for the currently selected project context

## Priority
medium

## Status
planned
