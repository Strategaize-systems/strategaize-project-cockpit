---
name: backend
description: Implement backend-side work in a structured, migration-aware, architecture-aligned way for a focused software slice.
---

# Backend Skill

## Purpose

This skill is used to implement backend-side work within the active project scope and slice structure.

Use it when:
- backend logic needs to be implemented or changed
- data handling, persistence, APIs, auth, policies, jobs, or integrations are involved
- the active slice requires server-side or database-related work
- implementation should stay aligned with architecture and release discipline

## Inputs

Typical inputs may include:
- active slice
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/PRD.md`
- relevant feature records
- relevant migration records
- relevant issue records
- delivery mode
- security or privacy constraints

## Core behavior

When invoked, this skill should:

1. Implement only the backend scope required for the active slice.
2. Keep the work aligned with approved architecture and decisions.
3. Preserve data integrity, security, and maintainability.
4. Make schema, policy, and API implications explicit.
5. Update migration, decision, or issue records when relevant.
6. Avoid hidden backend complexity and quiet architecture drift.
7. Prefer small, reviewable changes over broad restructuring.

## Main responsibilities

- implement backend logic
- support data handling
- support auth and policies
- support APIs and integrations
- support storage and migration work
- keep backend work aligned with architecture and release discipline

## Repo outputs

This skill primarily affects backend implementation files.

Where relevant, it should also prepare or update:
- `/docs/MIGRATIONS.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/STATE.md`

## Scope rules

Do not let backend work quietly expand into uncontrolled architecture drift.
Do not introduce unnecessary abstractions, infrastructure, or services.
Do not redesign the data model unless the slice actually requires it.
Do not add integrations, jobs, queues, or background systems without explicit justification.
Prefer boring, understandable backend structure over clever backend sprawl.

## Output format

Always provide:
1. what backend scope was implemented
2. which files were created or changed
3. whether migrations, policies, or data-model changes were involved
4. any important follow-up risks or gaps
5. the recommended next step

Common next steps:
- `/qa`
- `/docs`
- `/frontend` if dependent UI work is still missing

## Quality bar

Backend work is good when it is:
- narrow in scope
- consistent with architecture
- migration-aware where needed
- security-aware where needed
- understandable later
- safe to review and extend

A good backend result should reduce hidden risk, not move it around.