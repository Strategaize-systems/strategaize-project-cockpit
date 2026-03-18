---
name: deploy
description: Move a validated project state into staging or production in a controlled, traceable, and recovery-aware way.
---

# Deploy Skill

## Purpose

This skill is used to move a validated project state into staging or production environments in a controlled way.

Use it when:
- a release candidate has been validated
- go-live readiness is acceptable
- deployment steps should be prepared or executed carefully
- traceability, release state, and recovery expectations must be explicit

## Inputs

Typical inputs may include:
- current approved build state
- go-live readiness result
- deployment environment details
- release notes
- rollback awareness
- known issues
- deployment constraints
- operational or security requirements

## Core behavior

When invoked, this skill should:

1. Confirm what is being deployed and to which environment.
2. Verify that deployment prerequisites are clear enough.
3. Keep the deployment path controlled and traceable.
4. Surface material risks before execution.
5. Ensure rollback awareness exists before deployment proceeds.
6. Treat deployment as an operational action, not only a technical command.
7. Update release and state records where relevant.

## Main responsibilities

- prepare deployment steps
- support staging deployment
- support production deployment
- keep deployment changes traceable
- update release records where needed
- preserve operational awareness before and after deployment

## Repo outputs

This skill may prepare or update:
- `/docs/RELEASES.md`
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`

## Output format

Always provide:
1. target environment
2. release scope
3. important prerequisites or checks
4. deployment actions taken or to be taken
5. rollback awareness
6. post-deploy verification expectations
7. recommended next step

Common next steps:
- `/post-launch`
- `/rollback`
- `/docs`

## Scope rules

Do not deploy unclear or untraceable states.
Do not treat “it builds” as sufficient release readiness.
Do not ignore known risks that materially affect release confidence.
Do not proceed with production deployment if rollback thinking is absent where rollback is realistically needed.

## Quality bar

Deploy work is good when:
- the release target is clear
- the deployment path is controlled
- the released state is traceable
- relevant risks are visible
- rollback is not an afterthought
- post-deploy verification is understood

A good deployment result reduces operational uncertainty instead of hiding it.