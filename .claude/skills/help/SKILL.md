---
name: help
description: Use this skill to determine the correct next Strategaize development skill and the most sensible next step for the current project state.
---

# Help Skill

## Purpose

This skill helps choose the correct next step in the Strategaize development workflow.

Use it when:
- the user is unsure which skill should run next
- the current project stage is unclear
- multiple possible next actions exist
- the project needs a practical recommendation instead of broad workflow theory
- the user wants the safest and most sensible next move

This skill is the workflow navigator for the Strategaize development system.

## Inputs

Typical inputs may include:
- current project state
- existing documentation
- current implementation status
- current blockers
- active slice or feature
- open risks or known issues
- release status

Typical repo inputs:
- `/docs/STATE.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/MIGRATIONS.md`
- `/features/INDEX.md`
- `/slices/INDEX.md`

## Core behavior

When invoked, this skill should:

1. Identify the current project stage.
2. Determine what inputs already exist.
3. Detect missing prerequisites.
4. Recommend the next best skill or sequence.
5. Keep the recommendation practical, minimal, and execution-oriented.
6. Prefer the smallest correct next step over broad parallel work.
7. Avoid pretending the project is further along than the documentation supports.

## Standard workflow

The normal Strategaize development flow is:

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
- `/docs`
- `/doctor`
- `/rollback`

## Decision logic

Recommend `/requirements` when:
- the idea is still rough
- scope is not clearly fixed
- the business goal or V1 boundary is still unclear
- the user knows the problem but not yet the precise software definition

Recommend `/architecture` when:
- requirements exist
- implementation should begin soon
- technical shape, boundaries, or data flow are still unclear
- architecture decisions should be made before coding

Recommend `/slice-planning` when:
- requirements and architecture are clear enough
- features need to be broken into small, executable work units
- implementation risk should be reduced before coding starts

Recommend `/frontend` when:
- user-facing UI, pages, components, layout, or interaction work is needed
- the current slice is primarily frontend-oriented

Recommend `/backend` when:
- server logic, persistence, auth, policies, APIs, jobs, storage, or integrations are needed
- the current slice is primarily backend-oriented

Recommend `/qa` when:
- implementation is complete or partially complete
- a slice or feature must be verified against expected behavior
- readiness for the next step should be tested instead of assumed

Recommend `/final-check` when:
- normal QA is complete
- the project appears close to release
- a broader pre-go-live audit is needed across code quality, security, compliance, testing, deployment readiness, and operational readiness
- the project needs a believable release-readiness assessment beyond feature completion

Recommend `/go-live` when:
- final-check results exist
- release readiness must be judged explicitly
- a go / no-go or conditional go decision is needed

Recommend `/deploy` when:
- the release is approved
- deployment to staging or production should be executed carefully
- rollout, traceability, and rollback awareness must be operationally controlled

Recommend `/post-launch` when:
- a release has happened
- early live behavior, issues, and stability should be reviewed
- follow-up action after deployment must be clarified

Recommend `/docs` when:
- project records need updating
- implementation, decisions, issues, releases, migrations, or state changed
- continuity and handoff quality are at risk

Recommend `/doctor` when:
- something is broken
- behavior is inconsistent
- root cause is unclear
- diagnosis is needed before further implementation

Recommend `/rollback` when:
- a recent change introduced unacceptable risk or breakage
- reverting is safer than continuing to patch
- a stable fallback point must be restored in a controlled way

## Output format

Always respond with:
1. current assessed stage
2. recommended next skill
3. why that skill is the correct next move
4. any missing prerequisite inputs
5. the concrete next action

If useful, also provide:
- the skill after that
- key caution points before proceeding

## Scope rules

Do not give vague workflow advice.
Do not recommend large parallel workstreams unless clearly necessary.
Do not skip foundational steps just to reach implementation faster.
Do not recommend coding when requirements or architecture are clearly missing.
Do not recommend release steps when QA or final-check evidence is missing.

Prefer the smallest correct next step.

## Quality bar

A good help result should:
- reduce confusion
- identify the real current phase
- make the next action obvious
- prevent premature implementation or release activity
- keep the project moving without unnecessary detours

This skill should improve flow control, not just summarize the process.