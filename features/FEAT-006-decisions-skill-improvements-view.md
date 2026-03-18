# FEAT-006 Decisions / Skill Improvements View

## Feature ID
FEAT-006

## Name
Decisions / Skill Improvements View

## Purpose
Provide visibility into important project decisions and recurring development system learnings. Both record types share a navigation entry but are displayed as distinct sections, preserving their different purposes and structures.

## Problem
Important decisions and repeated delivery learnings are easy to lose when they are buried in documentation files or chat history. Without a structured view, institutional knowledge erodes over time.

## Goal
Make decisions and skill improvement records reviewable. The user should be able to answer: What decisions shaped this project? What recurring problems should improve the dev system?

## Included in scope

### Decisions section
A structured list displaying decision entries parsed from `docs/DECISIONS.md`:
- Decision ID (e.g., DEC-001)
- Decision title
- Status (e.g., accepted, superseded, deprecated)
- Reason (short rationale)
- Consequence (impact summary)

### Skill Improvements section
A separate structured list displaying improvement entries parsed from `docs/SKILL_IMPROVEMENTS.md`:
- Improvement ID (e.g., IMP-001)
- Improvement title
- Date
- Source (where the finding originated)
- Observation
- Suggested improvement
- Affected area
- Status

### UI separation
- Decisions and skill improvements are displayed as **two distinct sections** on the same page (e.g., tabs, or stacked sections with clear headings)
- They share a single sidebar navigation entry (e.g., "Decisions & Improvements")
- Each section has its own empty state handling
- No artificial merging — the two record types have different structures and different purposes

### Key distinction
- **Decisions** are project-specific directional choices (e.g., "V1 is read-oriented")
- **Skill Improvements** are cross-project system learnings (e.g., "skill X should handle Y better")
- Both are read-only in V1

## Explicitly out of scope
- automated system evolution
- direct editing of decision or improvement records in V1
- governance workflow
- approval engine
- decision dependency graphs
- improvement tracking/ticketing

## Data sources (V1)
- `docs/DECISIONS.md` — source for decision entries
- `docs/SKILL_IMPROVEMENTS.md` — source for skill improvement entries

## V1 data reading rules
- DECISIONS.md: each `## DEC-XXX` section becomes one decision entry
- SKILL_IMPROVEMENTS.md: each `### IMP-XXX` section becomes one improvement entry
- Note the different heading levels: decisions use `##`, improvements use `###`
- If a file is missing: show empty state for that section only
- If a file contains only "none yet": show explicit empty state
- If a file is malformed: show error state for that section

## UI expectations
- Accessible from the left sidebar navigation under a single label (e.g., "Decisions & Improvements")
- Decisions section appears first, improvements section below (or as a second tab)
- Decisions should work well with 5-30 entries (V1 realistic range)
- Improvements should work well with 0-15 entries (V1 realistic range)

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| DECISIONS.md missing | Decisions section shows: "No decisions file found" |
| DECISIONS.md present but no entries | Show: "No decisions recorded yet" |
| SKILL_IMPROVEMENTS.md missing | Improvements section shows: "No skill improvements file found" |
| SKILL_IMPROVEMENTS.md present but no entries | Show: "No skill improvements recorded yet" |
| Both files missing | Both sections show their respective empty states |
| Either file malformed | Affected section shows: "Could not parse [decisions/improvements] file" |

## Acceptance criteria
- decision entries are displayed in a structured format showing ID, title, status, reason, and consequence
- skill improvement entries are displayed separately in a structured format
- both sections exist on the same page but are clearly distinct
- empty states are handled explicitly per section
- the view is more usable than manually reading the markdown files
- missing or malformed source produces a clear, non-crashing state per section
- the view loads for the currently selected project context

## Priority
medium

## Status
planned
