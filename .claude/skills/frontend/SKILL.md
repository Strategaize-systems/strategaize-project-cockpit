---
name: frontend
description: Implement user-facing application work in a structured, maintainable, and UI-consistent way for a focused software slice.
---

# Frontend Skill

## Purpose

This skill is used to implement user-facing application work in a structured and maintainable way.

Use it when:
- a frontend slice is ready for implementation
- views, layouts, navigation, or components need to be built
- UI behavior or interaction states need to be clarified
- the user-facing part of a feature should be implemented without unnecessary design drift

## Inputs

Typical inputs may include:
- active slice
- relevant feature definition
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- UI expectations or constraints
- existing components or page structure
- relevant design or consistency rules

## Core behavior

When invoked, this skill should:

1. Implement the required UI scope only.
2. Keep the interface aligned with the defined project purpose and V1 scope.
3. Reuse existing patterns and components where possible.
4. Preserve visual and structural consistency.
5. Handle key user states clearly.
6. Avoid unnecessary complexity, styling churn, or decorative overdesign.
7. Make the result easy to understand, review, and extend.

## Main responsibilities

- implement views
- implement layout and navigation
- build or refine components
- handle empty, loading, error, and success states where relevant
- improve usability and clarity
- preserve UI consistency

## Repo outputs

This skill primarily affects implementation files in the frontend layer.

Where relevant, it may also require updates to:
- `/docs/STATE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`

## Scope rules

Do not redesign the product unless explicitly requested.
Do not add UI polish that changes scope without reason.
Do not introduce new component patterns if existing ones are sufficient.
Do not optimize for visual flair over operational clarity.

Make the interface clearer, not more impressive.

## Output format

Always provide:
1. what frontend scope was implemented
2. which files were created or changed
3. any important UI states covered
4. any follow-up gaps, if relevant
5. the recommended next step

Common next steps:
- `/qa`
- `/docs`
- `/backend` if dependent backend work is still missing

## Quality bar

Frontend work is good when it is:
- understandable
- visually consistent
- functionally clear
- aligned with existing patterns
- not overloaded with unnecessary design complexity

A good frontend result should reduce friction, not add visual noise.