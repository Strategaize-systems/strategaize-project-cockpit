---
name: docs
description: Keep project and system documentation current, useful, and aligned with real delivery work so knowledge is not trapped in chat or memory.
---

# Docs Skill

## Purpose

This skill is used to maintain meaningful project and system documentation throughout delivery.

It exists to support clarity, reuse, handoff, recovery, and long-term maintainability.

Use it when:
- meaningful implementation or planning changes were made
- project records are stale or incomplete
- decisions, issues, releases, migrations, or state changed
- the project needs better continuity for future work or handoff

## Inputs

Typical inputs may include:
- current project state
- current decisions
- feature and slice changes
- issue findings
- release findings
- migration changes
- architecture changes
- system evolution findings

## Core behavior

When invoked, this skill should:

1. Identify which records actually need updating.
2. Update the minimum set of documents required to keep the project understandable.
3. Preserve continuity between requirements, architecture, slices, implementation, QA, and release state.
4. Avoid empty documentation work that adds no operational value.
5. Capture important knowledge that would otherwise remain trapped in chat or memory.
6. Keep records usable for future resumption, review, and handoff.

## Main responsibilities

- keep key project records coherent
- support structured project documentation
- support handoff readiness
- reduce dependence on memory or chat-only knowledge

## Repo outputs

This skill may prepare or update:

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

And where relevant:
- individual feature records under `/features/`
- individual slice records under `/slices/`

## Documentation rules

Documentation should improve clarity, not create empty paperwork.

Only update what is materially affected.
Do not rewrite stable documents without reason.
Do not create polished filler language where precise operational notes are enough.
Do not leave important records stale after meaningful project changes.

## Output format

Always provide:
1. which documents were updated
2. why each update was needed
3. what important information was added or corrected
4. any records that still remain incomplete
5. the recommended next step

Common next steps:
- `/qa`
- `/go-live`
- `/deploy`
- `/post-launch`
- `/doctor`

## Quality bar

Documentation work is good when:
- key records are current enough to support real use
- important knowledge is not trapped in chat only
- project understanding improves for future reviewers
- handoff and resumption become easier
- the documentation is lean, useful, and operationally relevant

A good documentation result increases continuity and reduces avoidable rework.