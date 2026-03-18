---
name: final-check
description: Perform a final pre-release audit across code quality, security, compliance, testing, deployment readiness, and operational readiness before go-live.
---

# Final Check Skill

## Purpose

This skill is used after implementation and QA to perform a final structured pre-release audit before go-live.

It exists to catch important gaps that are broader than normal slice QA, especially around:
- code quality
- security
- privacy/compliance
- testing depth
- deployment readiness
- observability
- operational readiness
- legal and release hygiene

Use it when:
- the project appears feature-complete enough for release consideration
- QA has already been performed
- a final pre-go-live audit is needed
- the team wants a believable readiness answer beyond “it works on my machine”

This skill sits between:
- `/qa`
- and `/go-live`

## Inputs

Typical inputs may include:
- current project state
- QA results
- known issues
- release notes
- deployment setup
- environment configuration
- architecture records
- migration records
- relevant code paths
- monitoring / logging setup
- legal/compliance requirements
- rollback awareness

Typical repo inputs:
- `/docs/STATE.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/MIGRATIONS.md`

## Core behavior

When invoked, this skill should:

1. Perform a final pre-release audit across all critical release-readiness dimensions.
2. Look beyond feature completion and check whether the system is operationally credible.
3. Distinguish between:
   - blockers
   - serious risks
   - acceptable residual risk
   - nice-to-have follow-ups
4. Make visible what is missing before go-live.
5. Avoid treating implementation completion as sufficient release proof.
6. Produce a clear recommendation:
   - ready for `/go-live`
   - conditionally ready
   - not ready

## Audit dimensions

The final check should review the project across these dimensions where relevant:

### 1. Code quality and maintainability
Check for:
- obviously poor readability
- oversized files or components
- naming problems
- duplication
- dead code
- unused imports
- leftover debugging artifacts such as `console.*`
- architecture drift from the intended structure

### 2. Security and privacy
Check for:
- secrets or credentials in repo or code
- unsafe environment handling
- insecure auth/session handling
- missing or weak access control patterns
- missing row-level security or equivalent data isolation where relevant
- careless logging of sensitive data
- obvious missing security headers or transport/security basics where relevant

### 3. Legal and compliance readiness
Check for:
- privacy policy / legal pages where relevant
- consent handling where relevant
- third-party dependency and license awareness
- prohibited license risk where relevant
- documented user data handling and deletion/export entry points where relevant

### 4. Testing depth
Check for:
- clear test cases
- sufficient unit/integration/e2e coverage for project type
- meaningful manual QA
- cross-browser and responsive checks where relevant
- accessibility checks where relevant
- performance checks where relevant

### 5. CI/CD and deployment readiness
Check for:
- successful PR builds and tests
- controlled deployment path
- rollback awareness
- environment separation
- no obvious hardcoding
- build/runtime configuration clarity
- domain / DNS / SSL readiness where relevant

### 6. Observability and operations
Check for:
- error monitoring presence or explicit absence
- alerting awareness
- structured logging where relevant
- health checks / uptime awareness
- backup and restore awareness where relevant
- cost monitoring awareness where relevant

### 7. Post-go-live readiness
Check for:
- release notes/versioning awareness
- issue visibility
- feedback channels
- incident handling awareness
- clear follow-up ownership where relevant

## Main responsibilities

- run a final pre-release audit
- identify serious gaps before go-live
- review release-critical non-functional dimensions
- support a believable readiness recommendation
- prevent false confidence caused by “feature complete” thinking

## Repo outputs

This skill may prepare or update:
- `/docs/STATE.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`
- `/docs/DECISIONS.md`
- `/docs/MIGRATIONS.md`

If recurring gaps in process or standards are discovered, it may also update:
- `/docs/SKILL_IMPROVEMENTS.md`

## Scope rules

Do not re-run all implementation work inside this skill.
Do not turn this into open-ended architecture redesign.
Do not block release over cosmetic issues unless they create real risk.
Do not hide important release risks just because fixing them is inconvenient.
Do not confuse “optional later improvement” with “acceptable launch blocker”.

## Output format

Always provide:

1. final-check scope reviewed
2. overall assessment:
   - ready
   - conditionally ready
   - not ready
3. findings grouped by severity:
   - Blocker
   - High
   - Medium
   - Low
4. audit findings grouped by dimension
5. explicit release risks
6. required fixes before go-live
7. accepted residual risks, if any
8. recommended next step

Common next steps:
- `/go-live`
- `/qa`
- `/doctor`
- `/docs`
- `/rollback`

## Quality bar

Final-check work is good when it produces a believable answer to:
- are we actually ready beyond feature completion?
- what still creates material release risk?
- what must be fixed before go-live?
- what can be documented and accepted?
- is this ready for a serious go / no-go decision?

A good final check reduces release blindness and makes important risk visible before deployment.