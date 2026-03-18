# UI Consistency Rules

## Purpose

These rules define the default consistency expectations for user-facing project work.

They exist to keep interfaces stable, readable, and easy to extend over time.

## Core rules

### 1. Prefer consistency over novelty
The UI should feel stable and intentional, not randomly assembled.

### 2. Keep internal tools clear
Internal tools should prioritize readability and usability over visual flash.

### 3. Reuse patterns where practical
Do not create unnecessary visual fragmentation.

Reuse:
- layout patterns
- component patterns
- interaction patterns
- spacing logic
- typography hierarchy

### 4. Respect layout discipline
Spacing, hierarchy, and structure should remain coherent.

### 5. Handle common states deliberately
Loading, empty, error, and completion states should not be ignored where relevant.

### 6. Reduce one-off styling
Do not introduce arbitrary one-off styling decisions when an existing pattern is sufficient.

### 7. Clarity beats decoration
If there is a tradeoff, choose the version that is easier to understand and use.

## Anti-patterns

Avoid:
- random component choices
- inconsistent spacing
- inconsistent visual hierarchy
- avoidable layout drift
- styling complexity without real value
- new visual patterns without justification
- decorative churn that does not improve usability

## Outcome standard

A consistent UI should feel:
- readable
- stable
- clear
- deliberate
- easy to extend later