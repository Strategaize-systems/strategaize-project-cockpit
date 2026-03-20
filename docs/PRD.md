# PRD

## Project Name
Strategaize Project Cockpit

## Purpose

Strategaize Project Cockpit ist ein internes operatives Dashboard für die Sichtbarkeit über Softwareprojekte, die mit dem Strategaize Dev System verwaltet werden.

Ziel ist es, verstreutes Projektwissen durch eine klare, strukturierte Übersicht zu ersetzen:

- aktueller Projektstatus
- aktive und abgeschlossene Features
- aktive und abgeschlossene Slices
- bekannte Probleme und Fehlerberichte
- Releases und Migrationen
- technische und prozessuale Entscheidungen
- Skill-Verbesserungen

## Problem

Current project work depends too heavily on:
- chat memory
- manually opening markdown files
- scattered notes
- fragmented visibility over progress and next steps

This creates friction when:
- resuming work after interruptions
- reviewing what has been completed
- seeing what remains open
- tracking bugs, releases, and migrations
- coordinating future contributors

## Target Outcome

The cockpit should provide a structured internal interface that gives a fast and reliable answer to questions like:

- Where does this project currently stand?
- What features are planned, active, done, blocked, or deferred?
- Which implementation slices are currently active?
- Which issues exist?
- What was released and what changed?
- Which migrations happened and why?
- Which decisions shaped the project?
- Which repeated findings should improve the dev system itself?

## Users

### Primary user
- Richard / internal project owner

### Secondary future users
- internal developer
- technical collaborator
- future freelancer or contractor
- later internal operations support

## V1 Scope

V1 should focus on read-oriented project visibility, not full editing or workflow automation.

### Included in V1
- project selector — simple context switch between registered projects
- project overview / dashboard page (default landing page)
- current state display
- features view (data table)
- slices view (data table with resume orientation)
- issues / bugs view (card list)
- releases / migrations view (two stacked card list sections)
- decisions / skill improvements view (two stacked card list sections)
- left sidebar navigation with fixed structure:
  1. Overview (default/home)
  2. Features
  3. Slices
  4. Issues
  5. Releases & Migrations
  6. Decisions & Improvements

### Multi-project in V1
Multi-project support is intentionally part of V1, but only as a lightweight project context selector.

V1 multi-project means:
- a simple list of registered project directories
- switching between projects changes the active data context
- each project is a local directory path containing the expected Strategaize project structure
- no complex project management, no cross-project analytics, no roles/permissions

### Explicitly not included in V1
- full project management tool behavior
- drag-and-drop boards
- team permissions
- workflow automation
- Dify integration
- n8n integration
- Cloud Code remote control
- direct writeback editing for all project files
- advanced analytics
- multi-tenant SaaS architecture
- cross-project analytics or aggregation
- project creation wizard
- role-based access control

## Functional goals

### Goal 1 — Project overview
Provide a clear overview of the selected project:
- current state
- current phase
- current focus
- next steps
- blockers
- last stable version

### Goal 2 — Features visibility
Display project features in a usable structured way.

### Goal 3 — Slices visibility
Display smaller execution units so active work is visible and resumable.

### Goal 4 — Issue visibility
Display known problems, bug reports, and open issue status.

### Goal 5 — Release and migration visibility
Show release history and migration records so technical change history is visible.

### Goal 6 — Decisions and improvements visibility
Show technical decisions and recurring lessons that should improve the broader dev system.

## Non-functional goals

- simple and fast internal usability
- low operational friction
- clear information structure
- extensible architecture for future growth
- compatible with preferred default stack
- suitable for internal hosting and controlled environments

## Delivery Mode
Internal Tool

## Preferred Stack
- Next.js
- Supabase if needed later
- Tailwind CSS
- shadcn/ui
- Docker
- Hetzner
- Coolify

## Initial success criteria

V1 is successful if it allows the user to:
- open the cockpit
- select a project
- see current state clearly
- review features and slices clearly
- review issues, releases, migrations, decisions, and improvements clearly
- resume project work faster than before

## V1 data source strategy

The cockpit reads structured markdown files from local project directories.

### How projects are represented
Each project is a local directory containing the standard Strategaize project structure:
- `docs/STATE.md`
- `docs/PRD.md`
- `docs/KNOWN_ISSUES.md`
- `docs/RELEASES.md`
- `docs/MIGRATIONS.md`
- `docs/DECISIONS.md`
- `docs/SKILL_IMPROVEMENTS.md`
- `features/INDEX.md`
- `slices/INDEX.md`

### V1 data reading rules
- V1 reads markdown files from disk (server-side, via Next.js server components or API routes)
- V1 reads Index files (`features/INDEX.md`, `slices/INDEX.md`) as the primary structured source for list views
- V1 reads single-document records (`docs/STATE.md`, `docs/DECISIONS.md`, etc.) as-is
- Individual feature files (`features/FEAT-*.md`) and slice files (`slices/SLC-*.md`) are **not** read in V1 — only the Index files
- V1 does not include individual detail pages for features or slices — the table view from INDEX.md is the complete visibility layer
- No database is needed in V1 — all data comes from the filesystem
- Parsing assumes the documented markdown structure — malformed files should produce a visible error state, not a crash

### Project registration in V1
V1 uses a simple configuration (e.g., a JSON config file or environment variable) listing project directory paths.
No dynamic project creation, no database-backed project registry.

## Risks

- overbuilding V1 into a full PM platform
- introducing unnecessary complexity too early
- building too much editing logic too soon
- unclear mapping between markdown records and UI views
- scope creep from future ideas before the read-oriented core is stable
- markdown parsing edge cases if project files deviate from expected structure

## Guiding constraint

V1 must stay small, practical, and fast to deliver.
The purpose is to make project visibility operationally useful first.
