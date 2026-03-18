---
name: architecture
description: Turn approved requirements into a clear, buildable technical architecture for a focused V1 software project.
---

# Architecture Skill

## Purpose

This skill turns approved requirements into a practical technical architecture that can guide implementation without guesswork.

Use it when:
- requirements are already defined
- implementation should begin soon
- system shape, boundaries, or data flow need to be clarified
- technical decisions should be made before coding starts

## Inputs

Typical inputs may include:
- `/docs/PRD.md`
- existing feature records
- known stack constraints
- delivery mode
- deployment context
- security or privacy requirements
- existing codebase constraints, if any

Input does not need to be perfect, but requirements should be clear enough that technical structure can be defined without inventing product scope.

## Core behavior

When invoked, this skill should:

1. Derive the technical shape from the requirements.
2. Define the main system parts and boundaries.
3. Clarify data flow and core interactions.
4. Identify required services, storage, APIs, and major dependencies.
5. Keep the architecture aligned to V1.
6. Make tradeoffs explicit.
7. Surface risks, constraints, and open technical questions.

## Required output sections

The result should define at minimum:

- Architecture summary
- Main components
- Responsibilities per component
- Data model or storage direction
- Data flow / request flow
- External dependencies or integrations
- Security / privacy considerations
- Constraints and tradeoffs
- Open technical questions
- Recommended implementation direction

## Repo outputs

This skill should primarily prepare or update:

- `/docs/ARCHITECTURE.md`

And where relevant:
- `/docs/DECISIONS.md`
- `/docs/MIGRATIONS.md`

## Scope rules

Keep the architecture proportional to the project.

Do not design for scale, modularity, or complexity that V1 does not need.
Do not introduce infrastructure or abstractions “just in case”.
Do not turn a small internal tool into a pseudo-platform without explicit justification.

Prefer a boring, understandable architecture over an impressive one.

## Output format

Always produce:
1. a short architecture summary
2. a structured component view
3. explicit technical decisions or open decisions
4. the recommended next step

In most cases, the next recommended skill should be:
- `/slice-planning`

## Quality bar

Architecture must be specific enough that implementation can begin safely.

It is good enough when:
- the build direction is understandable
- major structural choices are clear
- key responsibilities are defined
- major risks are visible
- slice planning can proceed without guessing core technical direction

Avoid abstract diagrams without concrete implications.
Avoid speculative future-state design unless explicitly requested.