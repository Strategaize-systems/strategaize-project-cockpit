---
name: discovery
description: Turn rough spoken or loosely formulated product ideas into a structured, scoped, versioned starting point that is ready for requirements work.
---

# Discovery Skill

## Purpose

This skill is used before `/requirements` when an idea is still too rough, too broad, too mixed, or too unstable to turn directly into requirements.

Its job is to take messy early-stage product thinking and turn it into a structured, realistic, decision-ready starting point.

This skill is especially useful when the user:
- speaks freely instead of writing structured requirements
- mixes goals, questions, ideas, and future thoughts together
- jumps between current scope and later ideas
- wants to know whether something is realistic or sensible
- needs help separating version 1 from version 2, 3, 4, or later
- wants to preserve later ideas without letting them bloat the current scope

## What this skill is for

Use this skill to:
- absorb rough product ideas in free-form language
- identify the main goal behind a messy or spoken-style input
- separate core scope from adjacent ideas
- detect scope creep early
- propose a phased or versioned product cut
- identify what should happen now, later, or much later
- prepare an idea so `/requirements` can be done cleanly

This skill is not just for polished product concepts.
It is specifically meant to work with rough, spoken, exploratory input.

## When to use

Use `/discovery` when:
- the user has an idea, but it is still loose or exploratory
- the user is talking through a problem while thinking
- the user is mixing immediate goals with future expansion ideas
- the product cut is still unclear
- the version boundaries are not yet clean
- the user wants an initial realism or feasibility reaction
- a larger product block should be shaped before `/requirements`
- there is a risk that too much will be forced into the first version

Typical examples:
- a new major product stage such as V3
- a new module with many possible directions
- a customer-specific automation concept that starts from raw discussion
- a platform idea with multiple future expansion paths
- a spoken dump of “I want this, and maybe that too, and later also this”

## When not to use

Do not use `/discovery` when:
- the product stage is already clearly scoped and documented
- the next correct step is directly `/requirements`
- only architecture details remain open
- only slice planning remains
- the task is already implementation-ready

## Core behavior

When invoked, this skill should do the following:

1. Accept rough input without requiring clean structure.
2. Extract the likely main goal from mixed or spoken-style input.
3. Separate:
   - the core idea
   - side ideas
   - future ideas
   - unclear ideas
4. Identify whether the user is trying to solve:
   - a real product need
   - a workflow pain point
   - an execution problem
   - a visibility problem
   - a planning problem
5. Detect scope creep or version confusion early.
6. Judge whether the idea:
   - is basically viable
   - is viable only in a smaller first cut
   - should be split across multiple stages
   - should be postponed
   - is not sensible in the requested form
7. Propose a practical version or phase structure.
8. Preserve later ideas without allowing them to pollute the current scope.
9. Prepare a clean path into `/requirements`.

## Working style

This skill must tolerate the user’s natural working style.

That means:
- the user may speak freely
- the input may be messy
- the user may think while talking
- the user may jump forward and backward
- the user may ask “can this even be done?”
- the user may mix current needs with future ideas

Do not treat that as bad input.
Instead:
- sort it
- structure it
- classify it
- cut it into sensible product stages

This skill should reduce chaos without fighting the user’s natural idea flow.

## Discovery phases

This skill works in two internal phases.

### Phase A — Raw idea intake and structuring

First:
- absorb the raw idea
- identify the likely main thread
- detect side ideas and future thoughts
- distinguish between:
  - immediate desired outcome
  - possible future extension
  - questions
  - assumptions
  - uncertainty
  - scope inflation

At this stage, the goal is not precision.
The goal is to transform rough thought into structured understanding.

### Phase B — Product shaping

Then:
- frame the main problem
- define the likely product goal
- separate in-scope and out-of-scope
- propose version or phase boundaries
- identify what should be parked for later
- decide whether the topic is ready for `/requirements`

## Feasibility and realism check

This skill must not only organize ideas.
It must also judge them realistically.

It should explicitly signal:
- this is feasible
- this is feasible, but not all at once
- this should be split into stages
- this belongs to a later version
- this is risky in the current form
- this is too broad for the current version
- this is not sensible as currently framed

Do not just restate the user’s idea.
Interpret it and pressure-test it.

## Version and phase cutting

This skill should actively propose staged delivery.

If the input contains too much for one version, the skill should separate it into:
- current version
- next version
- later version
- parked ideas

This is a core responsibility, not an optional extra.

Possible framing styles:
- V1 / V2 / V3 / later
- Phase 1 / Phase 2 / Phase 3
- now / later / much later

Prefer whichever framing best fits the project context.

## Parking later ideas

The skill must preserve useful later ideas without letting them bloat the immediate scope.

That means:
- do not lose them
- do not ignore them
- do not force them into version 1
- clearly mark them as later-stage candidates

This is especially important when the user produces new ideas while speaking.

## Questions and follow-ups

This skill may ask clarifying questions, but only in a disciplined way.

### Allowed
Ask a few focused questions when they are genuinely needed to determine:
- the primary user or operator
- the first version boundary
- what absolutely must be in the first cut
- what must definitely stay out
- what the product is really trying to improve

### Not allowed
Do not ask endless exploratory questions.
Do not ask questions that belong in architecture unless they block product shaping.
Do not use questions as a substitute for structuring the idea.

### Rule
First structure what you can from the user’s input.
Then ask only the smallest number of high-value follow-ups.

If enough is already clear, make a best-effort shaping proposal instead of stalling.

## Inputs

Typical inputs may include:
- rough voice-style text from the user
- free-form idea dumps
- project context
- current product stage
- existing PRD or state context
- known roadmap or version logic
- files, notes, evidence, or summaries from earlier work

The input does not need to be clean.

## Output format

The output of `/discovery` should use this structure.

### 1. Raw idea summary
- restate the user’s idea in clearer terms
- show that the rough input was understood correctly

### 2. Likely main goal
- identify the actual core objective behind the idea

### 3. Side ideas and attached thoughts
- list other ideas that were mixed into the discussion
- separate them from the core objective

### 4. Feasibility and realism assessment
- what is realistic
- what is only realistic in a smaller cut
- what is too broad right now
- what should be postponed

### 5. Scope proposal
- in scope for the current version
- out of scope for the current version

### 6. Version or phase proposal
- propose a practical sequence such as:
  - V1 / V2 / V3 / later
  - or Phase 1 / 2 / 3 / later
- clearly identify what belongs now versus later

### 7. Recommended current focus
- define the exact focus for the next product step
- do not leave the user with multiple competing “first” directions

### 8. Parked later ideas
- explicitly preserve ideas that should not enter the current scope

### 9. Critical open questions
- only list the few questions that are genuinely necessary before `/requirements`

### 10. Readiness for `/requirements`
State one of:
- ready
- partly ready
- not ready

And briefly explain why.

### 11. Recommended next step
Usually:
- `/requirements`

But if not ready:
- say what must be clarified first

## Quality bar

A good discovery result is:
- structured
- grounded
- realistic
- scope-cutting
- version-aware
- useful for decision-making
- tolerant of messy user input
- honest about what should wait

A weak discovery result is:
- just a paraphrase
- too vague
- too broad
- no clear version cut
- no realism filter
- no parking of later ideas
- premature architecture
- endless brainstorming without convergence

## Important constraints

This skill must not:
- implement anything
- produce detailed architecture
- define detailed data models
- write slice plans in detail
- turn into a giant research rabbit hole
- flood the user with unnecessary theory

This skill is for shaping the product direction so later steps can be done correctly.

## Typical next step

If the output is strong enough, the usual next step is:
- `/requirements`

If the idea is still too broad after discovery, the skill should say so clearly and explain what remains unresolved.

## Final instruction

The goal of `/discovery` is not to make the idea perfect.

The goal is to turn rough thinking into a clean enough product direction that the next formal step can be done without hidden scope chaos.