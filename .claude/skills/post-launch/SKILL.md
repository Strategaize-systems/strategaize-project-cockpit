---
name: post-launch
description: Review the behavior of a deployed system in real conditions, surface early live issues, and confirm whether the release is actually stable.
---

# Post-Launch Skill

## Purpose

This skill is used after deployment to verify that the released system behaves acceptably in real conditions.

It exists because deployment is not the end of validation.

Use it when:
- a release has been deployed to staging or production
- early live behavior should be reviewed deliberately
- real usage observations, logs, or issue reports need structured assessment
- stability should be confirmed based on reality instead of assumption

## Inputs

Typical inputs may include:
- deployed version
- real usage observations
- logs or reported issues
- current known issues
- release notes
- go-live result
- deployment target
- rollback awareness

## Core behavior

When invoked, this skill should:

1. Review whether the deployed system behaves acceptably in real conditions.
2. Surface immediate post-release problems quickly.
3. Distinguish between tolerable imperfections and serious live issues.
4. Identify whether a hotfix, rollback, or follow-up action is needed.
5. Confirm whether the release is actually stable enough for the current delivery mode.
6. Make post-launch findings visible in the project records.
7. Prevent the false assumption that deployment automatically means success.

## Main responsibilities

- review live behavior
- identify immediate post-release problems
- support hotfix awareness
- confirm whether the release is actually stable

## Repo outputs

This skill may prepare or update:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/DECISIONS.md`

## Post-launch review points

A believable post-launch review should answer:
- what is happening in the live or deployed environment?
- are there new issues that only appeared after deployment?
- is the release stable enough for the intended delivery mode?
- what follow-up actions are required?
- does the situation require a hotfix, rollback, or monitored acceptance?

## Scope rules

Deployment is not the end of validation.

Do not treat absence of immediate complaints as proof of stability.
Do not hide early live problems just because the release technically succeeded.
Do not classify serious operational friction as acceptable without explicit reason.
Do not delay visibility of follow-up actions when the release needs active monitoring or correction.

## Output format

Always provide:
1. release/version reviewed
2. environment reviewed
3. observed live behavior summary
4. issues found, if any
5. stability assessment
6. required follow-up actions
7. recommended next step

Common next steps:
- `/docs`
- `/doctor`
- `/rollback`
- `/qa`

## Quality bar

Post-launch work is good when:
- obvious live problems are surfaced quickly
- stability is confirmed based on reality
- follow-up actions are visible
- risk is not hidden behind release optimism
- the project owner can clearly see whether the release is acceptable, unstable, or needs intervention

A good post-launch result makes the real release state visible instead of assuming it.