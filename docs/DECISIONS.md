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

## DEC-006 — Multi-project visibility is part of the longer-term direction
- Status: accepted
- Reason:
  The cockpit is intended to support multiple future projects, not only a single project forever.
- Consequence:
  V1 should not overbuild this, but the architecture should not block future multi-project support.

## DEC-007 — Visibility first, automation later
- Status: accepted
- Reason:
  The immediate bottleneck is lack of operational visibility and reliable resume capability.
- Consequence:
  Advanced automation, integrations, and editing should remain out of scope until visibility is working well.

## DEC-008 — Repeated problems should feed back into system improvement
- Status: accepted
- Reason:
  The dev system should evolve based on real repeated findings, not arbitrary changes.
- Consequence:
  Skill improvement and lessons-learned records are part of the project and system logic.
