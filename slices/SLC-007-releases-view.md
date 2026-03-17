# SLC-007 Releases View

## Slice ID
SLC-007

## Name
Releases View

## Related Feature
FEAT-005 Releases / Migrations View

## Purpose
Render release and migration history in a structured internal view.

## Goal
Make technical change history visible and easier to review.

## Included in scope
- release list rendering
- migration list rendering
- date
- identifier
- summary
- risk or rollback note visibility where relevant

## Explicitly out of scope
- deployment control
- release pipeline automation
- migration execution tooling

## Expected result
Release and migration records become operationally visible instead of hidden in raw logs.

## Acceptance criteria
- release records render clearly
- migration records render clearly
- history review becomes easier

## Risks
- inconsistent source formatting
- combining release and migration visibility too heavily in V1

## Priority
medium

## Status
planned
