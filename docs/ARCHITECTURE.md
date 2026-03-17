# ARCHITECTURE

## Purpose

This document defines the initial architecture for Strategaize Project Cockpit V1.

The goal of V1 is not to create a full project management platform, but a small internal cockpit that reads and displays structured project information in a usable interface.

## Architectural intent

The cockpit should act as a read-oriented internal visibility layer over structured project records.

The system should:

- display project state clearly
- display features clearly
- display slices clearly
- display issues, releases, migrations, decisions, and improvements clearly
- remain small and extensible
- avoid overengineering in V1

## V1 architecture direction

### Application type
- internal web application

### Delivery mode
- internal-tool

### Hosting direction
- local development
- staging and later production deployment on Hetzner via Coolify
- Docker-based deployment path

## Preferred stack

### Frontend
- Next.js

### Styling
- Tailwind CSS

### UI layer
- shadcn/ui

### Backend direction
For V1, backend complexity should remain minimal.

The first implementation direction should prefer a simple read-oriented internal architecture that can later evolve if needed.

### Data source direction
The cockpit is intended to represent structured project records such as:
- state
- PRD
- feature index
- slice index
- issues
- releases
- migrations
- decisions
- skill improvements

V1 should prioritize reading structured project information in a controlled way.

## Initial architectural model

### Layer 1 — UI
User-facing cockpit pages and views.

Main responsibilities:
- layout
- navigation
- project selection
- section views
- clean internal presentation of project records

### Layer 2 — Application logic
Responsible for:
- loading project record sources
- transforming raw records into usable view models
- handling section-level display logic

### Layer 3 — Project data records
Structured project records remain the underlying source of truth.

These include:
- `docs/STATE.md`
- `docs/PRD.md`
- `features/INDEX.md`
- `slices/INDEX.md`
- later issue, release, migration, and decision records

## Key architectural constraints

### 1. V1 remains read-oriented
V1 should not try to become a full editing layer for all project records.

### 2. Scope must stay small
The architecture should support future growth, but V1 must remain operationally small.

### 3. Visibility first, automation later
The cockpit should first solve visibility and resume problems.
Automation and advanced editing can come later if justified.

### 4. Project-first structure
The architecture should support multiple projects over time, even if V1 starts with a simpler project selection model.

### 5. Controlled extensibility
It should be possible later to add:
- richer project views
- writeback functionality
- more automation
- stronger integrations

But these should not complicate V1 unnecessarily.

## Core V1 views

The initial architecture should support these core views:

- Project Overview
- Features View
- Slices View
- Bugs / Issues View
- Releases / Migrations View
- Decisions / Skill Improvements View

## Initial implementation direction

V1 should be implemented as a simple internal application shell with:
- project layout
- project selection pattern
- overview panel
- structured record tables or lists for feature and slice visibility
- additional views for the remaining records

## Risks

### Risk 1 — scope creep
There is a strong risk of turning the cockpit into a full internal project management platform too early.

### Risk 2 — excessive abstraction
There is a risk of designing too much future-proofing before the basic read-oriented cockpit is validated.

### Risk 3 — unclear source mapping
If structured project records are inconsistent, the cockpit UI may become harder to implement cleanly.

### Risk 4 — premature automation
There is a risk of introducing automation, editing, or integration complexity before the visibility layer is stable.

## Architectural conclusion

The correct architecture for V1 is a small internal web application with a clear UI structure and a controlled read-oriented data flow.

It should solve project visibility first, validate the system structure in practice, and leave room for later growth without trying to do everything at once.
