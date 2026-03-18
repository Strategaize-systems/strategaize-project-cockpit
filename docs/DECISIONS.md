# DECISIONS

## DEC-001 — The cockpit is an internal tool in V1
- Status: accepted
- Reason:
  The first version should stay small, controlled, and useful without carrying the weight of client-app or SaaS-level complexity.
- Consequence:
  V1 follows internal-tool delivery mode and lighter operational rigor than later external-facing products.

## DEC-002 — V1 is read-oriented, not a full editing platform
- Status: accepted
- Reason:
  The main current problem is lack of project visibility, not lack of editing interfaces.
- Consequence:
  V1 focuses on displaying project information clearly. Broad writeback/editing capability is deferred.

## DEC-003 — The cockpit is the first real validation project for Strategaize Dev System
- Status: accepted
- Reason:
  The system should be tested through a real internal project instead of only through theory.
- Consequence:
  This project should follow the dev-system structure with enough discipline to validate it in practice.

## DEC-004 — The cockpit should not become a Jira replacement in V1
- Status: accepted
- Reason:
  Building a full PM platform would create unnecessary scope, delay useful delivery, and distract from the real purpose.
- Consequence:
  No boards, no workflow engine, no permissions system, and no full PM feature set in V1.

## DEC-005 — The preferred V1 stack follows the default Strategaize stack
- Status: accepted
- Reason:
  Consistency with the master system improves reuse, speed, and maintainability.
- Consequence:
  V1 uses Next.js, Tailwind CSS, shadcn/ui, Docker, Hetzner, and Coolify as the main direction.

## DEC-006 — Multi-project is part of V1 as a lightweight project selector
- Status: accepted (updated 2026-03-18)
- Reason:
  The cockpit is intended to support multiple projects. A simple project selector is operationally needed from the start to switch between active projects.
- Consequence:
  V1 includes a simple project selector that reads from a static configuration. No complex multi-project management, no cross-project analytics, no roles/permissions. The selector is a context switch, not a management interface.

## DEC-007 — Visibility first, automation later
- Status: accepted
- Reason:
  The immediate bottleneck is lack of operational visibility and reliable resume capability.
- Consequence:
  Advanced automation, integrations, and editing should remain out of scope until visibility is working well.

## DEC-009 — V1 uses two UI patterns: data tables for index views, card lists for record views
- Status: accepted
- Reason:
  Index files (features/INDEX.md, slices/INDEX.md) produce rows with 5-6 short columns — these fit well in data tables. Record-based views (issues, releases, migrations, decisions, improvements) have 5-8 fields per entry — these are too dense for table columns and read better as stacked card lists with labeled fields.
- Consequence:
  FEAT-002 (Features) and FEAT-003 (Slices) use data tables. FEAT-004, FEAT-005, and FEAT-006 use card lists. This creates two consistent UI patterns across the cockpit.

## DEC-010 — Combined views use stacked sections, not tabs in V1
- Status: accepted
- Reason:
  FEAT-005 (Releases & Migrations) and FEAT-006 (Decisions & Improvements) each combine two record types on one page. Stacked sections with clear headings are simpler to implement and review than a tab component, and both sections are typically short enough to fit on one scroll.
- Consequence:
  V1 uses vertically stacked sections with section headings. Tabs may be reconsidered later if lists grow long.

## DEC-008 — Repeated problems should feed back into system improvement
- Status: accepted
- Reason:
  The dev system should evolve based on real repeated findings, not arbitrary changes.
- Consequence:
  Skill improvement and lessons-learned records are part of the project and system logic.
