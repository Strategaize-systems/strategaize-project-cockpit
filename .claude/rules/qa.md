# QA Rules

## Purpose

These rules define the minimum QA expectations across projects using Strategaize Dev System.

The goal is to keep verification practical, believable, and proportional to project risk.

## QA philosophy

QA is not paperwork for its own sake.

QA exists to confirm:
- the intended slice actually works
- obvious breakage is caught
- unresolved issues are visible
- release confidence is based on something real

Implementation completion is not proof of readiness.

## Minimum QA baseline

Unless explicitly justified otherwise, QA should check:

- the build succeeds
- relevant lint/type checks pass
- the intended flow works
- obvious UI breakage is absent
- obvious backend breakage is absent
- obvious empty/error state issues are reviewed where relevant
- major blockers are visible

## QA should be proportional

### Internal Tool
- pragmatic QA
- enough to avoid chaos
- enough to support safe internal use

### Client App
- stronger flow checks
- stronger issue clarity
- stronger operational awareness

### SaaS Product
- strongest QA and release discipline
- stronger issue visibility
- stronger go-live expectations

## QA outputs

QA should produce or update where relevant:
- QA reports
- bug reports
- project status
- known issues
- slice status
- feature status

## Severity discipline

Findings should be classified clearly where possible:

- Blocker
- High
- Medium
- Low

Do not inflate small issues into blockers.
Do not downgrade serious release risks into cosmetic notes.

## QA anti-patterns

Avoid:
- treating implementation as proof of correctness
- calling work “done” without checking it
- hiding unresolved issues
- overcomplicating QA for tiny internal changes
- underchecking changes that affect critical flows
- pretending confidence is high when test depth is low

## QA outcome

QA is successful when it creates a believable answer to:
- does this work?
- what still does not work?
- what remains uncertain?
- is this ready for the next step?

A good QA result reduces false confidence instead of creating it.