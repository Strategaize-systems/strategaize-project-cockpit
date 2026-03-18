# SLC-002 Project Selector

## Slice ID
SLC-002

## Name
Project Selector

## Related Feature
FEAT-001 Project Overview

## Purpose
Add the ability to select and switch the active project context. After this slice, the cockpit knows which project directory to read from.

## Goal
A project selector component exists in the sidebar (or header area above the navigation). The cockpit reads a static project configuration, shows all registered projects, allows switching, and persists the last selection. All downstream views can depend on the active project context.

## Included in scope

### Project configuration
- A static configuration file (e.g., `projects.config.json` at the cockpit root or via environment variable) that lists registered project directories
- Each entry contains at minimum: a display name and an absolute directory path
- The configuration is read server-side

### Project selector component
- Dropdown or select component placed in the sidebar, above the navigation items
- Shows all registered project names
- Switching projects changes the active data context for all views

### Project context provider
- A React context or equivalent pattern that provides the active project path to all pages/components
- All data-reading views (SLC-003+) will consume this context to know which directory to read from

### Default selection behavior
- First load (no stored selection): automatically select the first project in the configuration list
- Subsequent loads: restore last selected project from localStorage
- If the stored project ID no longer exists in the config: fall back to the first project
- There is no "no project selected" empty state — a project is always selected if at least one exists

### "No projects configured" state
- If the configuration file is missing or contains zero projects: show a full-page message in the content area: "No projects registered. Add project paths to the configuration."
- The sidebar navigation items remain visible but all page content shows empty/unavailable states
- This is the only global blocking state

## Explicitly out of scope
- Complex project management (create, delete, edit projects)
- Cross-project views or analytics
- Roles or permissions
- Project health indicators or status badges on the selector
- Project directory validation at selection time (handled by individual views)

## Data sources
- Project configuration file (e.g., `projects.config.json`)
- localStorage for persisting last selection

## States to handle
| Condition | Behavior |
|---|---|
| Config file exists, 1+ projects listed | Selector shows all projects, first or last-used is selected |
| Config file missing | Full-page message: "No projects registered. Add project paths to the configuration." |
| Config file present but empty list | Same full-page message as above |
| Stored project no longer in config | Fall back to first project in list silently |
| User switches project | All views reload with new project context |

## Expected result
The cockpit has a working project selector. Switching projects changes the data context. All downstream views can access the selected project path.

## Acceptance criteria
- Selector component renders in the sidebar
- All configured projects appear in the selector
- Switching projects is reflected across all pages
- Last selected project is remembered across page reloads
- "No projects configured" state renders the full-page message
- Project context is accessible to all view components

## Dependencies
- SLC-001 (shell layout must exist for selector placement)

## Risks
- Overcomplicating project context propagation
- Unclear config file format leading to parsing ambiguity

## Priority
high

## Status
planned
