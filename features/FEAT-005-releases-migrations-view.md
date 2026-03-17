# FEAT-005 Releases / Migrations View

## Feature ID
FEAT-005

## Name
Releases / Migrations View

## Purpose
Provide visibility into release history and migration history so technical change records are easier to understand.

## Problem
Release and migration records often become hard to review when they exist only as raw markdown logs.

## Goal
Make release and migration history visible in a cleaner internal view.

## Included in scope
- release entries
- migration entries
- date
- identifier or version
- short summary
- risk or rollback note visibility where relevant

## Explicitly out of scope
- automated deployment control
- migration execution tools
- release pipeline management
- advanced release dashboards

## Data sources
- `docs/RELEASES.md`
- `docs/MIGRATIONS.md`

## Expected UI outcome
A readable section for:
- what changed
- when it changed
- which migration happened
- which release happened
- what rollback awareness exists

## Acceptance criteria
- release history is easier to review than raw file reading
- migration history is visible
- important change records are not hidden
- technical change tracking improves operational clarity

## Priority
medium

## Status
planned
