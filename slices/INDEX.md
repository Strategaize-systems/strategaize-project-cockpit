# Slices Index

## V1 Slice Plan

| ID | Slice | Related Feature | Status | Priority | Notes |
|---|---|---|---:|---:|---|
| SLC-001 | Project Shell | FEAT-001 | done | high | Next.js app, layout, sidebar nav, 6 page routes |
| SLC-002 | Project Selector | FEAT-001 | done | high | Project config, context switch, localStorage persistence |
| SLC-003 | State View | FEAT-001 | done | high | Overview dashboard from STATE.md + PRD.md |
| SLC-004 | Features Table | FEAT-002 | done | high | Data table from features/INDEX.md |
| SLC-005 | Slices Table | FEAT-003 | done | high | Data table from slices/INDEX.md with resume highlighting |
| SLC-006 | Issues View | FEAT-004 | done | medium | Card list from KNOWN_ISSUES.md |
| SLC-007 | Releases & Migrations View | FEAT-005 | done | medium | Two stacked card sections from RELEASES.md + MIGRATIONS.md |
| SLC-008 | Decisions & Improvements View | FEAT-006 | done | medium | Two stacked card sections from DECISIONS.md + SKILL_IMPROVEMENTS.md |

## Build order

### Phase 1 — Foundation (sequential)
1. **SLC-001** — Project Shell (no dependencies)
2. **SLC-002** — Project Selector (depends on SLC-001)
3. **SLC-003** — State View (depends on SLC-001 + SLC-002, establishes markdown parsing pattern)

### Phase 2 — Table views (sequential, reuses table pattern)
4. **SLC-004** — Features Table (establishes data table + badge pattern)
5. **SLC-005** — Slices Table (reuses table + badge pattern from SLC-004)

### Phase 3 — Card list views (sequential, reuses card pattern)
6. **SLC-006** — Issues View (establishes card list pattern)
7. **SLC-007** — Releases & Migrations View (reuses card pattern, adds two-section layout)
8. **SLC-008** — Decisions & Improvements View (reuses card + two-section pattern)

### Parallelization notes
- Phase 2 and Phase 3 are independent of each other (both depend only on Phase 1)
- Within each phase, the second slice reuses patterns from the first — sequential build is recommended
- SLC-004 + SLC-006 could run in parallel if two implementation sessions are available

## Status values
- planned
- ready
- in_progress
- blocked
- qa_pending
- done

## Slice rule
Slices should remain small enough to:
- fit within manageable implementation context
- be testable in isolation
- support reliable resume after interruption
- reduce accidental breakage during AI-assisted coding
