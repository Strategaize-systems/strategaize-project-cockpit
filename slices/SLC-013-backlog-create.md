# SLC-013 Backlog-Eintrag erstellen

## Slice ID
SLC-013

## Name
Backlog-Eintrag erstellen

## Related Feature
FEAT-010 Backlog-Datenpflege (minimal)

## Purpose
Add the write layer for creating new backlog items: write functions in backlog.ts, POST API route, and create dialog in the Backlog UI.

## Goal
The user can create new backlog items via a form dialog in the cockpit. Created items appear immediately in the Backlog view and are persisted to planning/backlog.json.

## Included in scope

### Write functions in Backlog Library (`/app/src/lib/backlog.ts`)
- `writeBacklogItems(projectPath, items)` — writes full items array to `planning/backlog.json`
- `generateBacklogId(existingItems)` — generates next sequential ID (BL-001, BL-002, ...)
- `validateBacklogItem(item)` — validates required fields and enum values for creation
- Creates `planning/` directory on-demand if it doesn't exist

These functions extend the existing read-only backlog.ts from SLC-009.

### POST API Route
- `POST /api/backlog` — creates new backlog item
  - Body: `{ projectPath, title, type, priority, version?, description? }`
  - Auto-generates id and createdAt
  - Auto-sets status to "open"
  - Response: `{ status: "ok" | "validation_error", item?: {...}, errors?: [...] }`
  - Validates `projectPath` via existing `validateProjectPath()`

### Create UI on Backlog page
- "Neuer Eintrag" button in the Backlog page header
- Opens a form dialog with fields:
  - Titel (Pflicht, Freitext)
  - Typ (Pflicht, Dropdown: Bug, Fix, Feature, Improvement, Idea, Later)
  - Priorität (Pflicht, Dropdown: High, Medium, Low)
  - Version (Optional, Dropdown from known versions or Freitext)
  - Beschreibung (Optional, Textarea)
- Submit sends POST to /api/backlog
- On success: dialog closes, backlog list refreshes, success feedback shown
- On validation error: error messages shown in form, no dialog close
- German UI copy for all labels, placeholders, feedback messages

## Explicitly out of scope
- Editing existing items (SLC-014)
- PATCH API route (SLC-014)
- Deleting backlog items
- Bulk operations
- Inline editing

## Data sources
- POST /api/backlog (created in this slice)
- GET /api/backlog (from SLC-009 — refresh after creation)

## States to handle
| Condition | Behavior |
|---|---|
| Create form submitted with valid data | Item created, file written, list refreshed, success feedback |
| Create form with missing required fields | Validation errors shown in form |
| Create form with invalid enum value | Validation error |
| planning/ directory doesn't exist | Created on first POST |
| Network error during create | Error feedback, no data loss |

## Expected result
Users can create new backlog items from the cockpit UI. The planning/backlog.json file is created (if not existing) and updated correctly on each create operation.

## Acceptance criteria
- "Neuer Eintrag" button opens create form dialog
- All required fields are validated before submit
- Created item gets auto-generated ID (BL-XXX) and createdAt
- Created item appears in backlog list immediately after dialog closes
- planning/backlog.json is correctly updated
- planning/ directory is created if it doesn't exist
- Validation errors are shown clearly in the form
- Success feedback is shown after creation
- All UI copy is German

## Dependencies
- SLC-009 (backlog.ts read functions, GET API route)
- SLC-011 (backlog page — create UI integrates into existing view)

## Risks
- File write permissions on project directories
- JSON serialization edge cases with special characters
- Dialog UX if too many fields

## Priority
medium

## Status
done
