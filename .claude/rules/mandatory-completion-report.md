# Mandatory Completion Report

## Purpose

This rule enforces transparent completion reporting for every non-trivial work step.

The goal is to make all meaningful work operationally traceable, reviewable, and easy to continue without hidden assumptions.

## When this rule applies

This rule applies to every non-trivial task, including but not limited to:
- requirements refinement
- architecture work
- slice planning
- frontend work
- backend work
- QA review
- final checks
- documentation changes
- bug fixes
- record cleanup
- file creation, modification, renaming, moving, or deletion

Do not wait for the user to ask for a summary.

## Mandatory completion report

At the end of every non-trivial work step, always provide a structured completion report.

The completion report must contain all of the following sections:

### 1. Outcome summary
State:
- what was done
- whether the work is fully complete, partially complete, or blocked

### 2. Files reviewed
List the relevant files reviewed.
Always use full repository-relative paths.

### 3. Files changed
List every changed file.
Always use full repository-relative paths.

For each changed file, state briefly:
- what changed
- why it changed

### 4. Files created
List every newly created file.
Always use full repository-relative paths.

For each created file, state briefly:
- its purpose
- why it was created

### 5. Files intentionally not changed
List files that were reviewed but deliberately left unchanged.
Always use full repository-relative paths.

For each such file, state briefly:
- why it was left unchanged

### 6. Problems found
Explicitly list:
- inconsistencies
- missing files
- invalid references
- weak assumptions
- contradictions
- scope issues
- unclear source-of-truth situations
- anything that does not cleanly line up

Do not hide, smooth over, or silently ignore problems.

### 7. Open points or deferred decisions
List:
- unresolved questions
- intentionally postponed changes
- items that must be handled in a later step

### 8. Recommended next step
State:
- the next recommended skill, mode, or work step
- why that is the correct next step

## File path rule

Always use full repository-relative paths.

Correct examples:
- `/docs/PRD.md`
- `/features/INDEX.md`
- `/slices/SLC-004-features-table.md`

Incorrect examples:
- `docs/PRD.md`
- `INDEX.md`
- `SLC-004-features-table.md`

Do not describe file work without explicit paths.

## Counting and consistency rule

If counts are mentioned, they must exactly match the listed items.

Examples:
- if you say 3 files were created, exactly 3 created files must be listed
- if you say 7 files were modified, exactly 7 modified files must be listed

If a referenced file or path does not exist, explicitly say so.

If a source is assumed but not actually present, explicitly report it as a problem.

Do not present inconsistent counting or vague file accounting as final output.

## Silent completion is not allowed

Do not finish meaningful work with:
- no summary
- only a generic summary
- only a narrative explanation without file accounting
- only a recommendation for the next step

A proper completion report is mandatory.

## Quality expectation

The completion report must reflect the true state of the work.

Do not imply that a task is complete if:
- only part of it was done
- files were reviewed but not updated
- assumptions remain unresolved
- blockers exist
- required follow-up work is still pending