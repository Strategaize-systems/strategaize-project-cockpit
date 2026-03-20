# SLC-003 State View

## Slice ID
SLC-003

## Name
State View

## Related Feature
FEAT-001 Project Overview

## Purpose
Render the project overview / dashboard as the default landing page. This is the first slice that reads real project data from markdown files.

## Goal
The overview page shows the current operational state of the selected project so the user can immediately understand where the project stands. This slice also establishes the markdown file reading pattern that later slices will reuse.

## Included in scope

### Data to display
From `docs/STATE.md`:
- Project name
- Delivery mode
- High-level state (e.g., "intake", "implementation", "deployed")
- Current phase
- Current focus
- Immediate next steps (as a list)
- Blockers (as a list, or explicit "No blockers" if empty/missing)
- Last stable version (or explicit "None yet" if empty/missing)

From `docs/PRD.md`:
- Short project purpose summary (the "Purpose" section content, truncated if very long)

### Layout
- Dashboard-style layout using cards or panels
- Not a complex analytics board — simple labeled fields and short lists
- State fields grouped logically (e.g., status info together, next steps together, blockers separate)

### Markdown parsing foundation
- Server-side file reading (Next.js server components or API route)
- Parsing `docs/STATE.md` expecting the documented section structure (## headings with `- key: value` lines and list items)
- Parsing `docs/PRD.md` for the Purpose section
- This parsing approach becomes the reference pattern for SLC-004 through SLC-008

## Explicitly out of scope
- Editing state data
- Project analytics or charts
- Complex history timelines
- Workflow automation
- Fetching data from any source other than STATE.md and PRD.md

## Data sources
- `docs/STATE.md` — primary source for all state fields
- `docs/PRD.md` — source for project purpose summary only

## States to handle
| Condition | Behavior |
|---|---|
| STATE.md exists and is well-formed | Display all fields normally |
| STATE.md missing | Show: "Project state file not found" with project name from config |
| STATE.md malformed / unparseable | Show: "Could not parse project state" with partial data if any was extractable |
| PRD.md missing | Omit purpose summary, display all other state fields normally |
| PRD.md malformed | Omit purpose summary silently |
| Blockers section empty or missing | Show explicit: "No blockers" |
| Next steps section empty or missing | Show explicit: "No next steps defined" |
| Last stable version empty or "none yet" | Show explicit: "None yet" |
| Project directory not accessible | Show: "Project directory not accessible" with the configured path |

## Expected result
The user opens the cockpit and immediately sees the current project state on the overview page without having to open any markdown files manually.

## Acceptance criteria
- Overview page renders as the default landing page
- All documented state fields are visible
- Purpose summary from PRD is visible when PRD exists
- Next steps and blockers are displayed as lists
- All error/empty states from the table above produce clear, non-crashing messages
- The overview is more useful than reading STATE.md and PRD.md manually
- Data updates when the project context is switched (SLC-002)

## Dependencies
- SLC-001 (layout and page routing)
- SLC-002 (project context to know which directory to read)

## Risks
- STATE.md structure varying between projects
- Overly complex dashboard layout for what is fundamentally simple data

## Priority
high

## Status
done
