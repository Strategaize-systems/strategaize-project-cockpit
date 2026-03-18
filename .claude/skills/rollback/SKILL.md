---
name: rollback
description: Support controlled recovery from a release or change that created unacceptable problems by defining a safe fallback path and its implications.
---

# Rollback Skill

## Purpose

This skill exists to support controlled recovery from a release or change that created unacceptable problems.

Use it when:
- a deployment or change introduced unacceptable risk or breakage
- reverting is safer than continued patching
- a fallback point must be identified and executed carefully
- operational control must be preserved under pressure

## Inputs

Typical inputs may include:
- release record
- migration record
- current incident or failure
- known stable version or fallback point
- deployment details
- current known issues
- rollback constraints
- operational context

## Core behavior

When invoked, this skill should:

1. Identify the safest realistic fallback target.
2. Clarify what must be rolled back and in what order.
3. Surface rollback implications, especially for data, migrations, and partial state changes.
4. Preserve operational control under pressure.
5. Prefer a controlled recovery path over improvisation.
6. Make post-rollback verification explicit.
7. Update release or incident records where relevant.

## Main responsibilities

- identify fallback point
- support recovery to a known stable state
- clarify rollback implications
- preserve operational control under pressure

## Repo outputs

This skill may prepare or update:
- `/docs/RELEASES.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/STATE.md`
- `/docs/MIGRATIONS.md`

## Rollback review points

A believable rollback plan should make clear:
- what is being rolled back
- what stable target is being restored
- what order the rollback should follow
- what data or migration risks exist
- what verification is required after rollback

## Scope rules

Rollback readiness should exist before it is needed.

Do not improvise blindly under pressure.
Do not assume rollback is trivial when schema, data, or state transitions are involved.
Do not use rollback as a substitute for understanding what changed.
Do not hide rollback risks just because reverting feels safer than debugging.

## Output format

Always provide:
1. rollback trigger / reason
2. fallback target
3. rollback scope
4. important risks or constraints
5. recovery steps or recovery order
6. post-rollback verification expectations
7. recommended next step

Common next steps:
- `/doctor`
- `/qa`
- `/docs`
- `/post-launch`

## Quality bar

Rollback work is good when:
- the fallback target is clear
- the recovery path is understandable
- the rollback is not improvised blindly
- risks are visible before action
- the restored state can be verified afterward

A good rollback result restores control first and clarity second, without sacrificing either.