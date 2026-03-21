# SLC-014 Backlog-Eintrag bearbeiten

## Slice ID
SLC-014

## Name
Backlog-Eintrag bearbeiten

## Related Feature
FEAT-010 Backlog-Datenpflege (minimal)

## Purpose
Add the update capability for existing backlog items: PATCH API route and inline editing in the Backlog UI.

## Goal
The user can change status, priority, and version assignment of existing backlog items directly in the Backlog view. Changes persist immediately to planning/backlog.json.

## Included in scope

### Update validation in Backlog Library (`/app/src/lib/backlog.ts`)
- `validateBacklogUpdate(changes)` — validates that update fields contain valid enum values
- Reuses `writeBacklogItems` from SLC-013

### PATCH API Route
- `PATCH /api/backlog/update` — updates existing item fields
  - Body: `{ projectPath, id, changes: { status?, priority?, version? } }`
  - Response: `{ status: "ok" | "not_found" | "validation_error", item?: {...} }`
  - Validates `projectPath` via existing `validateProjectPath()`
  - Only allows updating: status, priority, version
  - Does NOT allow updating: id, title, type, description, createdAt

### Inline editing on Backlog page
- Editable fields per item row:
  - Status (Dropdown: Open, In Progress, Done, Deferred, Blocked)
  - Priorität (Dropdown: High, Medium, Low)
  - Version (Dropdown or Freitext)
- Edit controls accessible per item (inline dropdown in table row or via row action)
- Changes send PATCH to /api/backlog/update
- On success: item updates in place, brief success feedback
- On error: revert to previous value, error message
- German UI copy for all labels and feedback

## Explicitly out of scope
- Creating new items (SLC-013)
- Deleting backlog items
- Changing item type after creation
- Changing item ID, title, or description
- Bulk operations (multi-select, bulk status change)
- Drag-and-drop reordering
- Undo/Redo

## Data sources
- PATCH /api/backlog/update (created in this slice)
- GET /api/backlog (from SLC-009 — refresh after update)

## States to handle
| Condition | Behavior |
|---|---|
| Edit field changed with valid value | PATCH sent, item updated in place, success feedback |
| Edit with invalid enum value | Validation error, revert to previous value |
| PATCH for non-existent item ID | "not_found" error, UI feedback |
| Network error during update | Error feedback, revert to previous value |

## Expected result
Users can adjust status, priority, and version of backlog items directly from the Backlog view. Changes persist to planning/backlog.json immediately.

## Acceptance criteria
- Status, Priority, Version can be changed inline per item
- Changes persist to planning/backlog.json
- Updated item reflects changes immediately in the UI
- Invalid enum values are rejected with clear feedback
- Non-existent item ID returns structured error
- Revert to previous value on error
- All UI copy is German

## Dependencies
- SLC-009 (backlog.ts read functions, GET API route)
- SLC-011 (backlog page with table view)
- SLC-013 (writeBacklogItems function, backlog write infrastructure)

## Risks
- Inline editing pattern may not fit well with table layout (fallback: row action menu with dropdown)
- Optimistic UI updates vs. server confirmation timing

## Priority
medium

## Status
done
