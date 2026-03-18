# Git and Release Rules

## Purpose

These rules define the minimum Git and release discipline expected across projects.

They exist to preserve traceability, reviewability, and recovery clarity over time.

## Core rules

### 1. Stable states matter
Projects should maintain identifiable stable states.

A project should not rely on memory alone to know which state was safe.

### 2. Do not mix unrelated changes
Commits and releases should not become dumping grounds for unrelated work.

### 3. Release visibility is required
Meaningful releases should leave a visible record.

### 4. Recovery awareness matters
Release logic should consider rollback implications, not only forward progress.

### 5. Keep version history understandable
The project history should remain interpretable later.

### 6. Prefer clear intent over clever commit history
A simple, readable history is better than a messy “fast” history.

### 7. Separate implementation from release significance
Not every commit is a release, but every meaningful release should be visible and understandable.

## Minimum expectations

Where relevant:
- meaningful commit grouping
- visible release notes
- known stable point awareness
- issue visibility for unresolved release risks
- understandable release boundaries
- explicit release-relevant documentation updates

## Documentation touchpoints

Update where relevant:
- `/docs/RELEASES.md`
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/DECISIONS.md`
- `/docs/MIGRATIONS.md`

## Anti-patterns

Avoid:
- giant mixed commits
- unclear release boundaries
- “just push it” release behavior
- hidden release risk
- commits that combine unrelated fixes, refactors, and feature changes without reason
- untraceable release-state changes
- treating Git history as irrelevant after deployment

## Outcome standard

Git and release handling should support:
- traceability
- recovery
- review
- operational clarity
- understandable project history