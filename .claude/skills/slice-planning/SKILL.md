---
name: slice-planning
description: Turn approved features and architecture into narrow, executable slices that are easy to implement, test, review, and resume.
---

# Slice Planning Skill

## Purpose

This skill is used to turn features into smaller execution units.

This is one of the most important control layers in the system because it keeps implementation narrow, reviewable, and resumable.

Use it when:
- requirements and architecture are clear enough
- features need to be broken into execution-ready work units
- implementation risk should be reduced before coding starts
- the project needs a safer, more resumable delivery structure

## Inputs

Typical inputs may include:
- `/features/INDEX.md`
- feature records
- `/docs/ARCHITECTURE.md`
- `/docs/PRD.md`
- current project state
- known implementation constraints

## Core behavior

When invoked, this skill should:

1. Translate feature scope into smaller implementation units.
2. Keep each slice narrow enough to fit manageable context.
3. Reduce execution risk by separating unrelated concerns.
4. Make slices easier to test, review, and resume after interruption.
5. Keep slices aligned with architecture and V1 scope.
6. Avoid large blended work units that hide complexity.
7. Produce a practical execution order where useful.

## Main responsibilities

- split features into smaller slices
- reduce execution risk
- create manageable work units
- improve implementation clarity
- support better resume behavior after interruption

## Repo outputs

This skill should primarily prepare or update:
- `/slices/INDEX.md`

And where relevant:
- individual slice records under `/slices/`
- `/docs/STATE.md`

## Slice rules

A good slice should:
- have a clear goal
- stay within one focused change area where possible
- be understandable without excessive context loading
- be testable in a believable way
- be resumable after interruption
- avoid mixing unrelated fixes or unrelated architectural changes

If a slice feels too broad, it probably is.

## Output format

Always produce:
1. a short slicing summary
2. a proposed slice list in sensible order
3. the purpose of each slice
4. notable risks or dependencies
5. the recommended next step

Common next steps:
- `/frontend`
- `/backend`
- `/docs`

## Quality bar

Slice planning is good when each slice is:
- narrow enough to fit manageable context
- easy to test
- easy to resume
- not overloaded with unrelated work
- aligned with project scope and architecture

A good slice plan should make implementation safer, not just more organized on paper.