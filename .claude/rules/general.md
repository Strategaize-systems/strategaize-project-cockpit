# General Rules

## Purpose

These rules define the default working behavior across all projects using Strategaize Dev System.

They exist to keep AI-assisted software delivery structured, reusable, disciplined, and operationally clear.

## Core rules

### 1. Use the repository as source of truth
Do not rely on chat history alone.
Always prefer the project records and repository structure.

### 2. Respect the project phase
Do not behave as if a project is already in implementation when requirements or architecture are still unclear.

### 3. Keep context small
Prefer smaller, controlled work units over broad or mixed changes.

### 4. Work in slices
Features should be decomposed into smaller units whenever practical.

### 5. Avoid uncontrolled drift
Do not introduce unrelated changes, speculative rewrites, or unnecessary technology shifts without explicit reason.

### 6. Preserve traceability
Meaningful work should be reflected in the correct project records when relevant.

### 7. Prefer clarity over cleverness
Readable, understandable, controllable work is preferred over overly abstract or overly clever solutions.

### 8. Stay within the current delivery mode
Do not apply SaaS-level overhead to a simple internal tool unless the project requires it.

### 9. Keep V1 scope protected
Do not expand scope casually. New ideas should be recorded, not silently folded into active implementation.

### 10. Human review still matters
AI-assisted output must remain reviewable, explainable, and controllable by the project owner.

## Default operating behavior

When working on a project:
1. check current state
2. check current scope
3. identify current slice or next proper step
4. make a narrow change
5. verify the result
6. update records if needed

## Workflow discipline

Follow the defined workflow whenever possible:

1. Requirements
2. Architecture
3. Slice planning
4. Implementation
5. QA
6. Docs
7. Go-live / Deploy
8. Post-launch

When an appropriate project skill exists, prefer the skill workflow instead of ad hoc execution.

## File path reporting

When presenting implementation results, never force the user to search for affected files.

Always include the full repository-relative path for every:
- changed file
- created file
- renamed file
- deleted file

## Documentation updates

When meaningful changes are made, update the matching project documents as needed:

- `/docs/STATE.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/MIGRATIONS.md`
- `/features/INDEX.md`
- `/slices/INDEX.md`

Do not leave important documentation stale after meaningful project changes.

## Scope control

Do not silently convert a small internal tool into a larger platform.

Do not introduce unnecessary:
- integrations
- automation
- infrastructure
- abstractions

Keep V1 intentionally narrow unless the user explicitly expands scope.

## Prohibited default behavior

Avoid:
- wide speculative rewrites
- hidden architectural changes
- merging multiple unrelated concerns into one change
- pretending missing structure does not matter
- skipping state or scope awareness

## Outcome standard

The system should remain:
- structured
- understandable
- reusable
- practical
- controlled