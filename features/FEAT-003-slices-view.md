# FEAT-003 Slices View

## Feature ID
FEAT-003

## Name
Slices View

## Purpose
Provide structured visibility into implementation slices so active work and next implementation steps are easy to resume.

## Problem
Without a clear slice view, it becomes harder to see what small execution unit is currently active, blocked, or next.

## Goal
Make slice-level execution visible and resumable.

## Included in scope
- slice ID
- slice name
- related feature
- slice status
- priority
- notes
- list or table view

## Explicitly out of scope
- automatic slice scheduling
- task engine behavior
- advanced PM board logic
- editing all slice data directly in V1

## Data sources
- `slices/INDEX.md`
- later individual `SLC-...` records

## Expected UI outcome
A structured list or table that shows:
- which slices exist
- which feature they belong to
- which ones are planned, active, blocked, or done

## Acceptance criteria
- slices can be reviewed clearly
- relation to features is visible
- active and next work units are easier to identify
- the view supports fast resume after interruption

## Priority
high

## Status
planned
