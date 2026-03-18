# Privacy and Security Rules

## Purpose

These rules define the default privacy and security posture across Strategaize Dev System projects.

They are especially important in sensitive B2B environments.

## Core rules

### 1. Treat sensitive data deliberately
Do not assume business data is harmless just because the project is internal.

### 2. Prefer controlled infrastructure
Use controlled hosting and deployment paths where justified by project sensitivity.

### 3. Avoid unnecessary exposure
Do not expose secrets, credentials, or sensitive data through careless storage, logging, transport, or configuration choices.

### 4. Respect access boundaries
Authentication, authorization, and data access should not be treated casually.

### 5. Visibility matters
If a privacy- or security-relevant risk exists, it should be visible in architecture, decisions, or known issues where relevant.

### 6. Secrets must stay out of source control
Never commit secrets, credentials, tokens, or sensitive keys into the repository.

### 7. Log intentionally
Do not log sensitive data unless there is a very clear reason and it is handled deliberately.

## Minimum expectations

Projects should consider:
- where data is stored
- who can access it
- whether logs expose too much
- whether credentials are handled correctly
- whether release decisions ignore obvious security concerns
- whether access control is explicit enough
- whether privacy-relevant data handling is documented where needed

## Documentation touchpoints

Update where relevant:
- `/docs/ARCHITECTURE.md`
- `/docs/DECISIONS.md`
- `/docs/KNOWN_ISSUES.md`
- `/docs/RELEASES.md`

## Anti-patterns

Avoid:
- secrets in repositories
- casual logging of sensitive data
- access assumptions without review
- security-sensitive changes without documentation
- treating privacy as a late cosmetic task
- hardcoded credentials
- avoidable data exposure in responses, logs, or storage

## Outcome standard

Projects should remain:
- controlled
- reviewable
- minimally exposed
- aligned with the actual sensitivity of the environment
- safe enough for their intended delivery mode