---
title: Testing-Strategie Discovery
date: 2026-03-21
status: ready for implementation
---

# Testing-Strategie — Discovery

## Phase 1 (jetzt — V3.1)
- Vitest als Test-Runner einrichten
- Unit Tests für lib/reports.ts (Frontmatter-Parsing, ID-Gen, Read/Write)
- Unit Tests für lib/next-step.ts (Slice-Parsing, Skill-Erkennung, Regelwerk)
- Unit Tests für lib/backlog.ts (Validierung, ID-Gen)
- npm run test Script (on-demand)

## Phase 2 (bei V4)
- API Route Tests (GET/POST Endpoints)

## Phase 3 (bei Hetzner-Deployment)
- CI/CD Pipeline (GitHub Actions: lint + test bei Push)

## Später (bei externen Nutzern)
- E2E Browser Tests (Playwright)
- Security Tests
- Performance Tests

## Delivery-Mode-Steuerung
Test-Tiefe soll vom Delivery Mode abhängen:
- internal-tool: Unit Tests on-demand
- client-app: Unit + API Tests, E2E empfohlen, bei jedem Build
- saas: Alles + CI/CD + Security + Performance

## Entscheidung
- Tests on-demand (npm run test), nicht bei jedem Build
- Vitest wegen Next.js-Kompatibilität und Zero-Config
