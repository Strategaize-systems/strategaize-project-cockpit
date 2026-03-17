# FEAT-001 Project Overview

## Feature ID
FEAT-001

## Name
Project Overview

## Purpose
Provide a clear high-level overview of the selected project so that the user can immediately understand the current operational state without opening raw markdown files manually.

## Problem
Project state is currently spread across multiple records and often reconstructed from memory or manual file inspection.

## Goal
Show the most important project status information in one place.

## Included in scope
- current project name
- current delivery mode
- current high-level state
- current phase
- current focus
- immediate next steps
- blockers
- last stable version
- short project purpose summary

## Explicitly out of scope
- editing all overview data directly in V1
- project analytics
- workflow automation
- permissions handling
- complex history timelines

## Data sources
- `docs/STATE.md`
- `docs/PRD.md`

## Expected UI outcome
A clear overview area or page that answers:
- what project is this?
- where does it currently stand?
- what happens next?
- what is blocking it, if anything?

## Acceptance criteria
- the selected project can be identified clearly
- the current state is visible clearly
- the next steps are visible clearly
- blockers are visible clearly
- the overview improves resume speed versus raw file browsing

## Priority
high

## Status
planned
