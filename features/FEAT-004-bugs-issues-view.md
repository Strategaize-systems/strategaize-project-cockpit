# FEAT-004 Bugs / Issues View

## Feature ID
FEAT-004

## Name
Bugs / Issues View

## Purpose
Provide visibility into known problems, bug reports, and issue status for the selected project.

## Problem
Without a dedicated issue view, known problems become scattered across notes, chat context, and memory.

## Goal
Make issues visible enough that they do not become invisible or forgotten.

## Included in scope
- issue or bug identifier
- issue title
- status
- severity or priority where available
- short symptom summary
- issue list view

## Explicitly out of scope
- full issue tracker replacement
- assignment system
- comment threads
- advanced workflow states
- SLA logic

## Data sources
- `docs/KNOWN_ISSUES.md`
- `qa/bug-reports/...`

## Expected UI outcome
A clean issue area that shows:
- what problems are known
- what remains open
- what has been resolved
- what may influence release confidence

## Acceptance criteria
- known issues are visible
- bug records are reviewable
- open issues are easier to track than through raw file inspection
- unresolved issues are not hidden

## Priority
medium

## Status
planned
