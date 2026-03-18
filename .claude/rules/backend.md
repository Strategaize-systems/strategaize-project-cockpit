# Backend Rules

## Purpose

These rules define the default expectations for backend work inside Strategaize Dev System projects.

They are especially relevant for projects using:
- Next.js
- Supabase
- Docker
- controlled self-hosted or semi-controlled infrastructure

## Backend scope

Backend work may include:
- data models
- auth
- policies
- storage
- APIs
- server actions
- jobs
- integrations
- migrations

## Core rules

### 1. Respect architecture
Backend implementation should follow the current architecture and decisions records.

Do not improvise new backend structure just because the current slice exposes a weakness.

### 2. Avoid hidden backend sprawl
Do not introduce backend complexity just because it is technically possible.

### 3. Keep changes narrow
Backend changes should align to the current slice or clearly defined work unit.

### 4. Record meaningful structural changes
If a backend change affects schema, policies, storage, operational behavior, or release risk, update the relevant records.

### 5. Migration awareness is mandatory
Meaningful schema or structural changes must be reflected in `/docs/MIGRATIONS.md`.

### 6. Protect sensitive handling
Projects involving sensitive business data require deliberate handling of:
- auth
- access control
- data placement
- storage behavior
- logging exposure

### 7. Prefer operational clarity
Backend structure should remain understandable for later review and handoff.

### 8. Prefer boring over clever
When in doubt, choose the simpler backend structure that is easier to review, test, and maintain.

## Backend documentation touchpoints

Update when relevant:
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/MIGRATIONS.md`
- `/docs/RELEASES.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/STATE.md`

## Backend anti-patterns

Avoid:
- silent schema changes
- policy changes without documentation
- broad backend rewrites inside small slices
- unnecessary service multiplication
- mixing experimental integrations into core logic without reason
- introducing abstractions without operational need
- hiding risky backend shortcuts behind “temporary” logic

## Outcome standard

Backend work should be:
- controlled
- reviewable
- minimally sufficient
- operationally clear
- aligned to current project scope
- safe to extend later