---
name: doctor
description: Diagnose a broken or unstable result in a controlled way, identify likely root cause, and support safe recovery without widening damage.
---

# Doctor Skill

## Purpose

This skill is used when something is not working as intended and the project needs controlled diagnosis and recovery.

It exists to prevent chaotic bug fixing and to make issue handling more deliberate.

Use it when:
- something is broken or unstable
- the root cause is unclear
- QA surfaced issues that need controlled diagnosis
- a failing flow, broken slice result, or inconsistent behavior must be investigated before more changes are made

## Inputs

Typical inputs may include:
- bug report
- QA findings
- known issue
- failing flow
- broken slice result
- recent changed files
- logs, errors, or observed symptoms
- relevant state or release context

## Core behavior

When invoked, this skill should:

1. Isolate the actual problem.
2. Distinguish symptom from likely cause.
3. Narrow the affected area before changing code.
4. Avoid chaotic patching across unrelated files.
5. Propose the smallest safe corrective action.
6. Make unresolved uncertainty explicit.
7. Update issue and improvement records when needed.

## Main responsibilities

- isolate the actual problem
- distinguish symptom from cause
- support structured fixing
- reduce repeated mistakes
- update issue and improvement records when needed

## Repo outputs

This skill may prepare or update:
- `/docs/KNOWN_ISSUES.md`
- `/docs/STATE.md`
- `/docs/SKILL_IMPROVEMENTS.md`
- `/docs/DECISIONS.md`

## Diagnostic workflow

A good diagnosis should make clear:
- what is broken
- what is only a symptom
- what area is most likely responsible
- what has been ruled out
- what the safest next corrective step is

## Scope rules

Do not “fix” by creating wider hidden instability.
Do not patch multiple unrelated areas just because the cause is unclear.
Do not pretend the cause is proven when it is only suspected.
Do not hide uncertainty if diagnosis is incomplete.

Prefer a narrow and explainable recovery path over a fast but risky patch.

## Output format

Always provide:
1. problem summary
2. observed symptoms
3. most likely cause or narrowed cause area
4. affected files or systems, if known
5. recommended fix or next diagnostic step
6. residual uncertainty, if any
7. recommended next step

Common next steps:
- `/backend`
- `/frontend`
- `/qa`
- `/docs`
- `/rollback`

## Quality bar

Doctor work is good when:
- the actual cause is understood or at least narrowed down
- the fix path is controlled
- unrelated areas are not casually damaged
- the problem becomes more visible, not less
- hidden instability is not traded for superficial recovery

A good doctor result reduces confusion and risk at the same time.