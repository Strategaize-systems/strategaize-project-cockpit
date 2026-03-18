# Deploy Rules

## Purpose

These rules define how deployment work should be handled across Strategaize Dev System projects.

Deployment is an operational action, not just a technical command.

## Core rules

### 1. Do not deploy casually
Deployment should follow a known readiness decision, not happen just because code exists.

### 2. Respect delivery mode
Internal tools can tolerate lighter deployment rigor than SaaS products, but deployment should still remain controlled.

### 3. Keep release boundaries visible
Know what is part of the release and what is not.

### 4. Update project records
Meaningful deployments should be reflected in:
- project state
- release records
- known issues where relevant

### 5. Prefer staging before production
Where practical, staging should be used as the realistic release checkpoint.

### 6. Preserve rollback awareness
Do not deploy meaningful changes without understanding the fallback path where fallback is realistically needed.

### 7. Keep environments understandable
Deployment targets, environment variables, domains, and operational configuration should not become hidden knowledge.

## Deployment records

Update where relevant:
- `/docs/STATE.md`
- `/docs/RELEASES.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/MIGRATIONS.md`

## Anti-patterns

Avoid:
- production deployment as first real test
- hidden environment changes
- deployment without release visibility
- deployment without rollback awareness
- untraceable config drift
- deploying unclear or mixed scope

## Outcome standard

Deployment should be:
- deliberate
- traceable
- proportional
- recoverable
- operationally understandable