---
name: ui-update
description: Refine an existing UI without changing core feature scope by improving clarity, consistency, usability, responsiveness, and visual structure.
---

# UI Update Skill

## Purpose

This skill is used to improve an already existing user interface without changing the underlying product scope.

It exists for cases where:
- the feature already works
- the UI is usable but not yet clean enough
- layout, clarity, consistency, responsiveness, or interaction quality should be improved
- the project needs refinement, not new frontend feature work

Use it when:
- the main implementation already exists
- the user wants UI cleanup, polish, or consistency improvement
- the goal is to improve clarity and usability without expanding scope
- the work is mostly presentational, structural, or interaction-focused

This skill is not a replacement for `/frontend`.
Use `/frontend` for building or extending UI functionality.
Use `/ui-update` for refining existing UI.

## Inputs

Typical inputs may include:
- existing implemented UI
- active page, screen, or component
- user feedback
- QA findings
- visual inconsistencies
- usability pain points
- relevant UI rules
- relevant project state

Typical repo inputs:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- relevant slice records
- relevant feature records

## Core behavior

When invoked, this skill should:

1. Improve the clarity of the existing interface.
2. Preserve the current feature scope unless explicitly told otherwise.
3. Reduce visual inconsistency and unnecessary friction.
4. Improve layout, spacing, hierarchy, wording, and interaction quality where needed.
5. Keep the UI aligned with existing project patterns.
6. Avoid unnecessary redesign or decorative churn.
7. Make the result easier to use, review, and maintain.

## Main responsibilities

- refine existing layout structure
- improve visual consistency
- improve usability and readability
- improve spacing, hierarchy, and interaction clarity
- improve responsiveness where relevant
- reduce rough edges without expanding feature scope

## Repo outputs

This skill primarily affects existing frontend implementation files.

Where relevant, it may also update:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/DECISIONS.md`

## Scope rules

Do not redesign the product unless explicitly requested.
Do not add new feature scope under the label of UI refinement.
Do not introduce new visual systems if the current one can be improved instead.
Do not optimize for impressiveness over usability.
Do not create churn by changing UI patterns without a clear reason.

Prefer:
- clearer layout
- better hierarchy
- more predictable interaction
- better readability
- better consistency
- better responsiveness

## Output format

Always provide:
1. what UI area was refined
2. what type of refinement was made
3. which files were changed
4. whether any follow-up UI issues remain
5. the recommended next step

Common next steps:
- `/qa`
- `/docs`
- `/frontend` if more substantial UI implementation is still needed

## Quality bar

UI update work is good when:
- the interface becomes clearer
- consistency improves
- usability improves
- responsiveness improves where needed
- feature scope does not silently expand
- the result feels cleaner without becoming overdesigned

A good UI update makes the interface easier to use, not just nicer to look at.