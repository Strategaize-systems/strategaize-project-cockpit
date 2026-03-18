# SLC-001 Project Shell

## Slice ID
SLC-001

## Name
Project Shell

## Related Feature
FEAT-001 Project Overview

## Purpose
Create the foundational application shell so all later views have a stable structural and technical base.

## Goal
After this slice is done, the cockpit has a running Next.js app with the fixed layout structure, sidebar navigation, routing for all 6 pages, and the shared UI foundation (Tailwind CSS, shadcn/ui). No real data is rendered yet — only the structural skeleton.

## Included in scope

### Project initialization
- Next.js project with App Router
- Tailwind CSS setup
- shadcn/ui setup (initial components: at minimum Button, Card, Badge for later use)
- TypeScript configuration
- Basic project folder structure

### Layout
- Fixed left sidebar + scrollable main content area
- Sidebar width: fixed (not resizable), visually distinct from content area
- Main content area: padded, max-width constrained or full-width (simple, not complex responsive grid)

### Sidebar navigation
The sidebar contains exactly 6 navigation items in this fixed order:
1. Overview (route: `/`, default landing page)
2. Features (route: `/features`)
3. Slices (route: `/slices`)
4. Issues (route: `/issues`)
5. Releases & Migrations (route: `/releases`)
6. Decisions & Improvements (route: `/decisions`)

Active navigation item is visually highlighted.

### Page routing
- 6 page routes matching the navigation items above
- Each page initially renders a placeholder (e.g., page title + "Content coming soon")
- The overview page (`/`) is the default landing page

### Responsive minimum
- Sidebar should remain usable down to ~768px viewport width
- Below that: sidebar can collapse to icons-only or be hidden behind a toggle
- No complex responsive behavior required in V1

## Explicitly out of scope
- Project selector component and logic (SLC-002)
- Real data rendering on any page (SLC-003 through SLC-008)
- Project configuration reading
- Markdown parsing
- Any backend logic
- Authentication
- Dark mode (not required in V1, can be added later)

## Data sources
None. This slice is purely structural.

## States to handle
| Condition | Behavior |
|---|---|
| App loads successfully | Shell renders with sidebar and placeholder content |
| Navigation clicked | Correct page route is activated, active item highlighted |
| No other states apply | This slice has no data dependencies |

## Expected result
A running Next.js application with the cockpit layout, sidebar navigation, and 6 routed placeholder pages. The shell is ready to receive the project selector (SLC-002) and data views (SLC-003+).

## Acceptance criteria
- `npm run dev` starts the cockpit locally
- Sidebar with 6 navigation items renders
- Clicking each navigation item loads the correct page
- Active navigation item is visually highlighted
- Layout is stable (sidebar does not shift, content area does not overflow)
- Placeholder content is visible on each page
- shadcn/ui components are available for later slices
- The shell does not crash and renders cleanly

## Dependencies
None. This is the first slice.

## Risks
- Overdesigning the layout before real content is placed
- Spending time on responsive edge cases that don't matter yet

## Priority
high

## Status
done
