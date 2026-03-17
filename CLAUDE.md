# CLAUDE

## Purpose

This file defines the working behavior for Cloud Code inside the Strategaize Project Cockpit repository.

The objective is to keep work controlled, slice-based, and aligned with Strategaize Dev System.

## Core behavior

- Respect the project records as the main source of truth.
- Prefer documented project state over assumptions.
- Keep implementation scope narrow.
- Avoid broad speculative rewrites.
- Work in slices whenever possible.
- Preserve V1 scope discipline.

## Primary project records

Treat these files as authoritative when present:

- `docs/STATE.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/RELEASES.md`
- `docs/MIGRATIONS.md`
- `docs/SKILL_IMPROVEMENTS.md`
- `features/INDEX.md`
- `slices/INDEX.md`

## Current project objective

Build a small internal cockpit that improves visibility across project records.

The first version should remain read-oriented and should not become a full project management platform.

## Scope discipline

Do not introduce the following into V1 unless explicitly approved:
- workflow automation
- broad editing interfaces
- drag-and-drop PM logic
- permissions systems
- Dify integration
- n8n integration
- advanced analytics
- unnecessary multi-project complexity

## Preferred execution pattern

Use this order where relevant:
1. confirm current state
2. confirm active slice
3. implement a narrow change
4. verify it
5. document meaningful updates

## Documentation updates

Update records when relevant:
- update `STATE.md` when project focus changes materially
- update `DECISIONS.md` when an important direction changes
- update `KNOWN_ISSUES.md` when a notable unresolved issue appears
- update `MIGRATIONS.md` for meaningful schema or storage changes
- update `RELEASES.md` for meaningful release points
- update `SKILL_IMPROVEMENTS.md` when repeated findings reveal a system gap

## Quality rule

“Implemented” is not the same as “ready”.

Before something is treated as ready:
- the relevant slice should be complete
- the result should be checkable
- obvious issues should be handled or recorded
- project records should remain coherent

## Final instruction

Keep the project small, useful, and operationally clear.

The goal is to create a practical internal cockpit, not an oversized meta-platform.
