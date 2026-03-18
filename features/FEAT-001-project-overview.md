# FEAT-001 Project Overview

## Feature ID
FEAT-001

## Name
Project Overview

## Purpose
Provide the main entry point and dashboard of the cockpit. Shows the current operational state of the selected project so the user can immediately understand where the project stands without opening raw markdown files.

This feature also owns the project selector — the simple context switch that determines which project is currently displayed.

## Problem
Project state is currently spread across multiple records and often reconstructed from memory or manual file inspection. There is no single place to see the current state at a glance.

## Goal
Give the user one screen that answers: What project am I looking at? Where does it stand? What happens next? What is blocking it?

## Included in scope

### Project selector (part of this feature)
- dropdown or similar selector in the sidebar or header area
- lists all registered projects from the configuration
- switching projects changes the entire cockpit context
- remembers the last selected project (e.g., localStorage)
- the selector is a simple context switch, not a project management interface

### Project overview / dashboard content
- current project name
- current delivery mode
- current high-level state (e.g., intake, implementation, deployed)
- current phase
- current focus
- immediate next steps (as a list)
- blockers (as a list, or explicit "none" if empty)
- last stable version (or explicit "none yet")
- short project purpose summary (from PRD)

## Explicitly out of scope
- editing project state data in V1
- project analytics or charts
- workflow automation
- permissions handling
- complex history timelines
- project creation or deletion
- cross-project dashboard or aggregation

## Data sources (V1)
- `docs/STATE.md` — primary source for state, phase, focus, next steps, blockers, last stable version
- `docs/PRD.md` — source for project name, purpose summary, delivery mode
- Project configuration file — source for the list of registered projects

## V1 data reading rules
- All data is read from the filesystem on the server side
- The project selector reads from the static project configuration
- STATE.md and PRD.md are parsed expecting the documented markdown structure
- If STATE.md is missing or malformed: show a clear "state unavailable" message
- If PRD.md is missing: show project name from config, omit purpose summary

## UI expectations
- The project overview is the default landing page when opening the cockpit
- The project selector is always accessible (sidebar or header)
- Layout should feel like a simple dashboard card or panel, not a complex analytics board

## Empty / missing / error states
| Condition | Behavior |
|---|---|
| No projects configured | Show a clear message: "No projects registered" |
| Selected project directory not found | Show error: "Project directory not accessible" |
| STATE.md missing | Show: "Project state file not found" with project name from config |
| STATE.md malformed | Show: "Could not parse project state" with partial data if possible |
| PRD.md missing | Omit purpose summary, show remaining state data normally |
| Blockers section empty | Show explicit "No blockers" |
| Next steps section empty | Show explicit "No next steps defined" |

## Acceptance criteria
- the project selector shows all registered projects
- switching projects changes the displayed data
- the current state is visible clearly on the overview page
- next steps and blockers are visible
- missing or malformed source files produce a visible, non-crashing state
- the overview improves resume speed versus raw file browsing
- the overview is the default landing page

## Priority
high

## Status
planned
