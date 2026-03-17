# PRD

## Project Name
Strategaize Project Cockpit

## Purpose

Strategaize Project Cockpit is an internal operational dashboard for managing visibility across software projects built with Strategaize Dev System.

Its purpose is to replace scattered project awareness with a clear and structured overview of:

- current project state
- active and completed features
- active and completed slices
- known issues and bug records
- releases and migrations
- technical and process decisions
- skill improvement findings

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
- project overview page
- current state display
- features view
- slices view
- issues / bugs view
- releases / migrations view
- decisions / skill improvements view

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

## Risks

- overbuilding V1 into a full PM platform
- introducing unnecessary complexity too early
- building too much editing logic too soon
- unclear mapping between markdown records and UI views
- scope creep from future ideas before the read-oriented core is stable

## Guiding constraint

V1 must stay small, practical, and fast to deliver.  
The purpose is to make project visibility operationally useful first.
