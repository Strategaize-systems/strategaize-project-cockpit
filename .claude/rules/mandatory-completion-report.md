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
- runtime failures or runtime blockers
- verification gaps that materially affect confidence
- anything that does not cleanly line up

Do not hide, smooth over, or silently ignore problems.

### 7. Open points or deferred decisions
List:
- unresolved questions
- intentionally postponed changes
- items that must be handled in a later step

This section is for planned future work or consciously deferred decisions.
Do not use this section to hide current technical problems that affected the work step.

### 8. Project record updates (MANDATORY after implementation)

After completing implementation work (frontend, backend, or combined slices), the following project records must be updated immediately as part of the completion — not deferred, not batched, not left for later:

- `/slices/INDEX.md` — set the implemented slice status to `done` (or `in_progress` if partially complete)
- `/features/INDEX.md` — set the feature status to `done` when all related slices are done
- `/planning/backlog.json` — set related backlog items to `done` (or `in_progress` if partially complete)
- `/planning/roadmap.json` — set the version status to `active` when implementation begins, `released` when complete
- `/docs/STATE.md` — update current focus and immediate next steps

This is not optional. Failing to update these records causes:
- the Nächster-Schritt-Engine to give wrong recommendations
- the Cockpit UI to show stale data
- loss of project visibility — the exact problem the cockpit is built to solve

If a slice is implemented but its status is not updated, the work is not considered reported.

### 9. QA after implementation steps (MANDATORY)

After every `/frontend`, `/backend`, or `/slice-planning` completion, QA must be performed as the immediate next action — not deferred, not skipped, not left for the user to request.

The QA step serves as the systematic check that replaces external review.

**QA is mandatory after:**
- `/frontend`
- `/backend`
- `/slice-planning`

**QA is NOT required after:**
- `/discovery`
- `/requirements`
- `/architecture`

**QA must include test execution when tests exist:**
- If `npm run test` is available, QA must run it and report the result
- Test failures are findings (severity depends on what failed)

Exceptions:
- Steps that build on each other and are not individually verifiable (e.g., a library without its API). In that case, QA after the combined block.
- Trivial fixes (single-line edits, typo corrections) do not require a full QA cycle.

After completing a qualifying skill, always either:
- run `/qa` directly as part of the same response, or
- explicitly state "Nächster Schritt: /qa" and wait for confirmation

Do not move to the next implementation slice without QA on the current one.

### 10. Recommended next step
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

Rules:
- files and directories must not be mixed in one count unless explicitly labeled
- generated files and manually authored files must not be silently merged without explanation
- if scaffolding tools created multiple files, either list each file explicitly or group them under a clearly labeled scaffold section with an exact count
- if a referenced file or path does not exist, explicitly say so
- if a source is assumed but not actually present, explicitly report it as a problem

Examples:
- if you say 3 files were created, exactly 3 created files must be listed
- if you say 7 files were modified, exactly 7 modified files must be listed
- if 5 files were generated by scaffolding and 3 files were manually authored, this distinction must be made explicit

Do not present inconsistent counting, vague file accounting, or mixed file/directory counting as final output.

## Runtime and verification clarity

Do not present temporary verification as persistent runtime state.

Examples:
- say "dev server successfully started for verification on localhost:3000" if it was only tested
- do not say "dev server is running on port 3000" unless it is still actively running at the end of the task

Claims about:
- runtime state
- ports
- responsive behavior
- route behavior
- visual states
must be based on actual verification, not assumption.

If something was not directly verified, say so explicitly.

If a key verification step could not be completed, that must appear under:
- Problems found
or
- Outcome summary when it materially limits confidence

## Problem reporting discipline

"Problems found: none" is only valid if:
- no inconsistencies were found
- no structural choices were introduced without explicit confirmation
- no assumptions remain unresolved
- no runtime ambiguity remains
- no deferred technical decisions affect the reported result
- no verification gap materially limits confidence
- no failed or blocked verification step occurred during the work

If any of those exist, they must be listed under:
- Problems found
or
- Open points / deferred decisions

Do not label something as "none" if the report later mentions:
- blocked dev server startup
- stale lock files
- browser verification not completed
- visual behavior not directly checked
- persistence behavior not directly checked
- unresolved config or runtime uncertainty

## Visibility rule for long runs

If the task is long, touches multiple files, or involves multiple write phases, do not rely on one giant final message.

Instead:
- split the work into smaller visible batches
- provide short intermediate progress updates after meaningful batches
- keep those updates concise
- avoid repeating the full same detail set again in the final report

Intermediate updates must not replace the final completion report.

Intermediate updates should usually include:
- batch completed
- affected files
- visible problem yes/no
- next immediate batch

Prefer sequential or small-batch updates over many parallel hidden writes when visibility matters.

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

Do not imply high verification confidence when runtime or browser-level validation was not completed.