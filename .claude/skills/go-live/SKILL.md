---
name: go-live
description: Assess whether a project state is actually ready for release into staging or production and make release risk explicit before deployment.
---

# Go-Live Skill

## Purpose

This skill is used to decide whether a project state is actually ready for release into staging or production.

It prevents the false assumption that “implemented” automatically means “ready”.

Use it when:
- implementation is complete enough for release consideration
- QA has been performed and release readiness should be evaluated
- known issues, risks, or migration implications need a go / no-go decision
- staging or production release should be judged deliberately instead of assumed

## Inputs

Typical inputs may include:
- current project state
- QA results
- known issues
- release notes
- migration awareness
- delivery mode expectations
- rollback awareness
- operational constraints

## Core behavior

When invoked, this skill should:

1. Assess whether the current state is truly release-ready.
2. Surface blocking issues and accepted risks clearly.
3. Distinguish between tolerable imperfection and unacceptable release risk.
4. Confirm whether operational minimums are met.
5. Make the release decision explicit: go, no-go, or conditional go.
6. Prevent false confidence caused by implementation completion alone.
7. Keep the assessment aligned with the current delivery mode.

## Main responsibilities

- check release readiness
- review blocking issues
- review known risks
- confirm operational minimums
- support a clear go / no-go decision

## Repo outputs

This skill may prepare or update:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`

## Readiness criteria

A believable go-live review should answer:
- is this actually ready?
- what is still risky?
- what must be fixed first?
- what is acceptable for the current delivery mode?

## Scope rules

Do not hide unresolved risk just to move faster.
Do not treat partial QA as full confidence.
Do not ignore migration or rollback implications where they matter.
Do not approve release simply because the main happy path works.

## Output format

Always provide:
1. release target considered
2. readiness decision: go / no-go / conditional go
3. blockers
4. accepted risks
5. required fixes before release, if any
6. operational concerns, if any
7. recommended next step

Common next steps:
- `/deploy`
- `/qa`
- `/doctor`
- `/docs`
- `/rollback`

## Quality bar

Go-live work is good when it creates a believable answer to:
- is this actually ready?
- what is still risky?
- what must be fixed first?
- what is acceptable for the current delivery mode?

A good go-live result makes release risk visible instead of hiding it behind optimism.