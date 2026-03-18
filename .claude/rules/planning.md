# Planning Rules

## Purpose

These rules define how project planning should be handled before and during implementation.

They combine:
- practical flow discipline from lightweight coding systems
- stronger decomposition and state discipline from more structured agent workflows
- a clear preference for narrow, execution-ready planning over vague or oversized planning

## Planning principles

### 1. Define before building
Before implementation starts, there must be enough clarity on:
- purpose
- scope
- delivery mode
- high-level architecture direction

Do not move into implementation just because the idea sounds obvious.

### 2. Break large work into slices
Features should be decomposed into smaller slices before implementation expands too far.

### 3. Small slices beat large implementation blocks
Each slice should be narrow enough to:
- fit manageable context
- be reviewed clearly
- be tested clearly
- reduce accidental damage
- be resumed after interruption without major reloading

### 4. Do not overplan
Planning should support delivery, not delay it.

The objective is sufficient clarity, not massive paperwork.

### 5. Preserve out-of-scope boundaries
Ideas that do not belong to the active scope should be recorded, not silently pulled into current work.

### 6. Planning must remain operational
A plan is only useful if it helps the next correct implementation step happen with less guessing.

### 7. Replanning must be explicit
When reality changes the plan, update the plan deliberately instead of drifting silently.

## Planning sequence

Preferred sequence:
1. Intake
2. Requirements
3. Architecture
4. Slice Planning
5. Implementation
6. QA
7. Final Check
8. Go-Live / Deploy

## Planning artifacts

Use these records where relevant:
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/features/INDEX.md`
- `/slices/INDEX.md`

And where useful:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`

## Feature planning rule

A feature should describe:
- what the feature is
- why it matters
- what is in scope
- what is out of scope
- how success is recognized

Do not define features so broadly that they become mini-roadmaps.

## Slice planning rule

A slice should define:
- what specific implementation unit is being done
- which feature it belongs to
- what is included
- what is excluded
- what acceptance means

A slice should not blend unrelated concerns unless there is a clear delivery reason.

## Replanning rule

If implementation reveals that the plan is no longer valid:
- do not improvise silently
- update the relevant project records
- make the change explicit
- protect traceability

## Planning anti-patterns

Avoid:
- building before scope is clear enough
- keeping all planning inside chat only
- creating giant slices
- mixing planning and implementation chaos
- pretending future ideas are current priorities
- planning abstractions the project does not yet need
- overdesigning V1 for speculative future scale

## Planning outcome

Planning is successful when:
- current scope is clear
- current feature order is understandable
- current slice order is understandable
- implementation can proceed without major guessing
- future ideas are separated from current delivery
- the project can be resumed cleanly after interruption