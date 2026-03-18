---
name: requirements
description: Turn a rough project idea into a clear, execution-ready V1 requirements baseline with explicit scope, constraints, and success criteria.
---

# Requirements Skill

## Purpose

This skill is used to define what should be built before architecture and implementation begin.

It should turn an initial idea into a usable project definition.

Use it when:
- the project idea exists but is still rough
- the user knows the problem but not yet the exact software shape
- V1 scope needs to be fixed before architecture or coding starts
- goals, users, features, and constraints need to be clarified

## Inputs

Typical inputs may include:
- idea
- business goal
- rough target user
- rough feature list
- known constraints
- preferred stack or delivery context
- explicit exclusions or boundaries

Input does not need to be complete.
This skill should reduce ambiguity and produce a usable V1 baseline.

## Core behavior

When invoked, this skill should:

1. Clarify the actual problem being solved.
2. Identify the user or operator.
3. Define the intended outcome.
4. Translate rough ideas into a clear V1 scope.
5. Separate in-scope vs out-of-scope.
6. Identify constraints, assumptions, and open questions.
7. Keep future ideas visible without silently absorbing them into V1.
8. Produce structured requirements artifacts for the repo.

## Main responsibilities

- define project purpose
- define user/problem context
- define V1 scope
- define out-of-scope items
- define success criteria
- assign delivery mode

## Required output sections

The result should define at minimum:

- Problem statement
- Goal / intended outcome
- Primary user(s)
- V1 scope
- Out of scope
- Core features
- Constraints
- Risks / assumptions
- Success criteria
- Open questions
- Delivery mode

## Repo outputs

This skill should primarily prepare or update:

- `/docs/PRD.md`
- `/features/INDEX.md`

And where relevant:
- initial feature records under `/features/`
- `/docs/STATE.md`

## Scope rules

Keep V1 narrow.
Do not silently expand the project.
Do not turn a small internal tool into a platform.
Do not add automation, integrations, or advanced intelligence unless explicitly justified.
Prefer clear and testable scope over impressive scope.

Clarify explicitly:
- now
- later
- not part of this project

## Delivery mode awareness

Requirements should align with the intended delivery mode and project type, for example:
- internal tool
- client-specific internal app
- controlled business utility
- other clearly defined small-scope software

## Output format

Always produce:
1. a short requirements summary
2. a structured V1 definition
3. explicit out-of-scope boundaries
4. a clear delivery mode recommendation or confirmation
5. the recommended next step

In most cases, the next recommended skill should be:
- `/architecture`

## Quality bar

Requirements are good enough when:
- purpose is clear
- V1 scope is clear
- out-of-scope is visible
- current project direction is buildable
- architecture can begin without major guessing

Avoid generic filler language.
Avoid inflated scope.
Prefer operational clarity over polished wording.