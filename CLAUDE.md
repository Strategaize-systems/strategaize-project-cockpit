# CLAUDE

## Purpose

This file defines the working behavior for Claude Code inside the Strategaize Project Cockpit repository.

The objective is to keep work controlled, slice-based, and aligned with Strategaize Dev System while preserving the specific V1 boundaries of this cockpit project.

## Operating mode

Use repository documentation and project records as the source of truth.

Do not invent scope, requirements, architecture, release assumptions, data flows, or implementation behavior that are not supported by project documentation or explicit user direction.

Prefer narrow, testable changes over broad speculative implementation.

## Skill usage

When an appropriate skill exists, prefer the project skill workflow before ad hoc implementation.

### Mandatory workflow sequence

The following sequence is **mandatory** and must not be skipped, regardless of perceived scope size:

1. `/discovery` (only when idea is still rough)
2. `/requirements`
3. `/architecture`
4. `/slice-planning`
5. `/frontend` and/or `/backend` (per slice)
6. `/qa` (after every slice AND as Gesamt-QA after all slices)
7. `/final-check`
8. `/go-live`
9. `/deploy`
10. `/post-launch`

**No step may be skipped** with justifications like "the scope is small enough" or "this is straightforward enough". Even small changes benefit from the discipline of the full sequence. The only valid reason to skip a step is explicit user approval.

**After every `/frontend`, `/backend`, or `/slice-planning` step**, `/qa` must be run automatically. QA is NOT required after `/discovery`, `/requirements`, or `/architecture`. When tests exist (`npm run test`), QA must include running them.

### Support skills (can be used at any point):
- `/help`
- `/docs`
- `/doctor`
- `/rollback`
- `/ui-update`
- `/review`

## Core behavior

- Respect the project records as the main source of truth.
- Prefer documented project state over assumptions.
- Keep implementation scope narrow.
- Avoid broad speculative rewrites.
- Work in slices whenever possible.
- Preserve V1 scope discipline.
- Make work traceable and operationally explicit.
- Do not finish meaningful work silently.
- Prefer visible progress over long silent execution when the task spans multiple files or multiple phases.
- When visibility is at risk, work in smaller batches rather than one large hidden run.

## Nächster-Schritt-Logik (Cockpit Engine)

The Nächster-Schritt-Engine in the cockpit determines the next recommended step automatically. The logic must follow this sequence:

### Pre-Implementation (active version has no slices yet)
1. Check PRD.md for version section → if missing: `/requirements`
2. Check ARCHITECTURE.md for version section → if missing: `/architecture`
3. If both exist but no slices: `/slice-planning`

### Implementation (version has non-done slices)
1. No completion report → `/frontend` or `/backend` (based on slice keywords)
2. Completion without review → `/review`
3. Review with needs-rework → rework (same skill as last completion)
4. Review with reviewed → `/qa`
5. QA done → mark slice as done

### Post-Implementation (all slices done)
1. No Gesamt-QA → `/qa {version} gesamt`
2. No final-check → `/final-check`
3. No go-live → `/go-live`
4. No deploy → `/deploy`

Post-implementation reports must be NEWER (higher RPT-ID) than the latest slice completion to count for the current version. This prevents old version reports from being counted.

## Primary project records

Treat these files as authoritative when present:

- `/docs/STATE.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/MIGRATIONS.md`
- `/docs/SKILL_IMPROVEMENTS.md`
- `/features/INDEX.md`
- `/slices/INDEX.md`

## Current project objective

Build a small internal cockpit that improves visibility across project records.

The first version should remain read-oriented and should not become a full project management platform.

Multi-project support is allowed in V1 only as a simple project context selector.
It must not become complex multi-project management logic.

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

Do not turn this project into a Jira replacement or a general-purpose operations platform.

## Preferred execution pattern

Use this order where relevant:
1. confirm current state
2. confirm active slice or active requirements target
3. implement or refine a narrow change
4. verify it
5. document meaningful updates
6. report clearly what was done

If the work step is long, split it into visible sub-steps instead of doing everything in one hidden batch.

## File path reporting (MANDATORY)

Whenever creating, modifying, moving, renaming, or deleting files, always report the full repository-relative path.

Always group file results by:
- Created
- Modified
- Renamed
- Deleted

Never describe file changes without explicit paths.

Always use full paths beginning from repository root, for example:
- `/docs/PRD.md`
- `/features/FEAT-002-features-view.md`

## Completion reporting (MANDATORY)

At the end of every non-trivial work step, always provide a structured completion report without waiting for the user to ask.

A non-trivial work step includes, but is not limited to:
- requirements refinement
- architecture updates
- slice planning
- implementation work
- QA review
- documentation changes
- bug fixing
- file creation or file modification

The completion report must include:

1. Outcome summary
- what was done
- whether the step is fully complete, partially complete, or blocked

2. Files reviewed
- list relevant files reviewed
- always use full repository-relative paths

3. Files changed
- list every changed file
- always use full repository-relative paths
- for each file, briefly state what changed and why

4. Files created
- list every newly created file
- always use full repository-relative paths
- briefly state the purpose of each file

5. Files intentionally not changed
- list files that were reviewed but deliberately left unchanged
- briefly state why

6. Problems found
- explicitly list inconsistencies, missing files, weak assumptions, invalid references, scope issues, contradictions, runtime blockers, verification gaps, or unclear source-of-truth situations
- do not hide or smooth over problems

7. Open points or deferred decisions
- list what remains unresolved
- list what was intentionally postponed

8. Recommended next step
- state the next recommended skill, mode, or work step
- briefly explain why

Do not end meaningful work with only a generic summary.
Do not omit changed-file reporting.
Do not omit problem reporting when issues were found.

## Visibility rule for long tasks

If a task affects multiple files, includes multiple write steps, or is likely to produce a long response, do not stay silent until the very end.

Instead:
- work in smaller visible batches
- show brief intermediate progress after meaningful chunks
- keep intermediate updates concise
- avoid repeating the same details again in full at the end

Intermediate updates do not replace the final completion report.
They exist to preserve user visibility during longer runs.

A good intermediate update should usually contain:
- what batch was completed
- which files were affected
- whether a problem appeared
- what the next immediate batch is

## Counting and consistency rule

If counts are mentioned, they must match the listed items exactly.

Examples:
- if you say 7 files were modified, exactly 7 modified files must be listed
- if a referenced path does not exist, explicitly say so
- if a source is assumed but not present, explicitly flag it as a problem

Do not present approximate or inconsistent file accounting as final output.

## Documentation updates

Update records when relevant:
- update `/docs/STATE.md` when project focus changes materially
- update `/docs/DECISIONS.md` when an important direction changes
- update `/docs/KNOWN_ISSUES.md` when a notable unresolved issue appears
- update `/docs/MIGRATIONS.md` for meaningful schema or storage changes
- update `/docs/RELEASES.md` for meaningful release points
- update `/docs/SKILL_IMPROVEMENTS.md` when repeated findings reveal a system gap

Do not leave important project records stale after meaningful changes.

## Quality rule

“Implemented” is not the same as “ready”.

Before something is treated as ready:
- the relevant slice or requirement target should be complete
- the result should be checkable
- obvious issues should be handled or recorded
- project records should remain coherent
- the completion report should clearly reflect the true state of the work

## Report-Speicherung (V3)

After every non-trivial work step (implementation, QA, review, architecture, slice-planning, requirements), the Completion Report must be saved as a Markdown file in `reports/` of the active project.

### Format

```yaml
---
id: RPT-XXX
date: "YYYY-MM-DD"
skill: frontend
slice: SLC-XXX
feature: FEAT-XXX
type: completion
status: completed
reviewOf: null
title: "Short description"
---
```

### Fields

- `id` (required): Next sequential RPT-XXX (scan existing reports, take max + 1, zero-pad to 3 digits)
- `date` (required): Today's date in ISO format
- `skill` (required): The skill that was executed (frontend, backend, qa, review, architecture, etc.)
- `slice` (optional): Slice reference if applicable (SLC-XXX)
- `feature` (optional): Feature reference if applicable (FEAT-XXX)
- `type` (required): `completion` for normal reports, `review` for /review results
- `status` (required): `completed` for new reports
- `reviewOf` (optional): RPT-XXX reference, only for type=review
- `result` (optional but recommended for QA/review): Overall result, e.g. "PASS", "FAIL — 2 Blocker", "PASS — 1 Low-Finding (behoben)"
- `title` (required): Short description of the report

### Body

The body is the Completion Report content in Markdown format.

### File naming

`reports/RPT-XXX.md` — e.g., `reports/RPT-001.md`, `reports/RPT-002.md`

### Directory creation

Create the `reports/` directory if it does not exist.

### When to save

Save after every non-trivial skill completion. Exceptions:
- Trivial single-line fixes
- Pure conversation (no implementation)
- Steps that are part of a combined block where the final step produces the report

### When NOT to save

Do not save reports for:
- reading files
- answering questions
- explaining code
- memory updates

## Final instruction

Keep the project small, useful, and operationally clear.

The goal is to create a practical internal cockpit, not an oversized meta-platform.