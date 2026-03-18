---
name: qa
description: Verify whether a slice or implementation unit actually works as intended and is ready for the next step.
---

# QA Skill

## Purpose

This skill is used to verify whether a slice or implementation unit actually meets its intended result.

Use it when:
- implementation is complete or partially complete
- a slice should be validated before moving forward
- release confidence needs to be assessed
- visible issues, regressions, or missing acceptance coverage must be surfaced
- “done” needs to be checked instead of assumed

## Inputs

Typical inputs may include:
- active slice
- implemented result
- acceptance criteria
- relevant feature definition
- relevant architecture direction
- relevant project state
- changed files
- known issue context

## Core behavior

When invoked, this skill should:

1. Compare the actual result against the intended behavior.
2. Check whether acceptance criteria are truly met.
3. Identify visible issues, regressions, and missing coverage.
4. Distinguish between blockers and non-blockers.
5. Prevent false “done” states.
6. Produce a believable readiness assessment.
7. Recommend the correct next step based on findings.

## Main responsibilities

- verify expected behavior
- identify visible issues
- support release confidence
- create issue visibility
- prevent false “done” states

## Repo outputs

This skill may prepare or update:
- `/docs/KNOWN_ISSUES.md`
- `/docs/STATE.md`
- relevant slice records
- relevant feature records

## Output format

Always provide:
1. QA scope reviewed
2. pass / fail / mixed result
3. findings grouped by severity
4. open risks or missing checks
5. readiness assessment
6. recommended next step

Preferred severity levels:
- Blocker
- High
- Medium
- Low

## Scope rules

Do not equate “implemented” with “ready”.
Do not ignore partial failures because the main path works.
Do not hide uncertainty when test depth is limited.
Do not inflate minor issues into blockers without reason.

## Quality bar

QA is good when it produces a believable answer to:
- does this work?
- what does not work?
- what is still uncertain?
- is it ready for the next step?

A good QA result should reduce false confidence, not create it.