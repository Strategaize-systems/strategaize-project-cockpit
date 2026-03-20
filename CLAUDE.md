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

Typical workflow:
1. `/requirements`
2. `/architecture`
3. `/slice-planning`
4. `/frontend` and/or `/backend`
5. `/qa`
6. `/final-check`
7. `/go-live`
8. `/deploy`
9. `/post-launch`

Support skills:
- `/help`
- `/docs`
- `/doctor`
- `/rollback`
- `/ui-update`

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

## Final instruction

Keep the project small, useful, and operationally clear.

The goal is to create a practical internal cockpit, not an oversized meta-platform.