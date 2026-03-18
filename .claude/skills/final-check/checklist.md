# Final Check Checklist

Use this checklist after normal implementation QA and before `/go-live`.

Mark items as:
- PASS
- FAIL
- N/A

Group findings by severity:
- Blocker
- High
- Medium
- Low

## 1. Code quality and maintainability
- Clean Code basics reviewed (readability, naming, modularity, duplication)
- No obvious god components / god files / oversized modules
- No obvious dead code remains
- No obvious unused imports remain
- No stray `console.*` usage remains outside intentional logger implementation
- Architecture still matches intended project shape
- No obvious speculative abstractions were added

## 2. Security and privacy
- No secrets or credentials are committed in the repo
- Environment variables are used instead of hardcoded secrets
- Auth/session handling is not obviously insecure
- Access control / authorization rules were reviewed where relevant
- Sensitive data is not obviously exposed through logs or responses
- Security-sensitive flows have at least been manually reviewed
- Security headers / HTTPS / transport basics are in place where relevant
- Row-level security or equivalent data access isolation exists where required

## 3. Legal and compliance readiness
- Privacy Policy exists where relevant
- Impressum / legal notice exists where relevant
- Terms / AGB exist where relevant
- Consent handling exists where non-essential cookies or tracking are used
- User data rights entry point is documented where relevant
- Third-party licenses were reviewed where relevant
- No prohibited dependency license risk is known, or risk is explicitly documented
- SBOM / dependency visibility exists where required

## 4. Testing depth
- Test cases exist for important behavior
- Unit tests exist where core logic justifies them
- Integration tests exist where interfaces are meaningful
- E2E or realistic flow tests exist where user journeys matter
- Manual QA was performed
- Main happy path works
- Important edge cases were checked
- Cross-browser checks were done where relevant
- Responsive behavior was checked where relevant
- Accessibility basics were checked where relevant
- Performance checks were done where relevant
- No known test gap is being ignored silently

## 5. CI/CD and deployment readiness
- PR build succeeds
- Relevant tests succeed
- Deployment target is clear
- Rollback path is understood
- Environments are clearly separated
- No obvious hardcoding remains
- Build/runtime config is understandable
- Domain / DNS is correct where relevant
- SSL / certificate handling is in place where relevant
- Infrastructure/config changes are traceable where relevant

## 6. Observability and operations
- Error monitoring exists or explicit absence is documented
- Alerts or crash visibility exist where relevant
- Logging is sufficient for diagnosis
- Logging does not obviously leak secrets
- Health checks / uptime awareness exist where relevant
- Backup awareness exists where relevant
- Restore awareness exists where relevant
- Cost monitoring awareness exists where relevant

## 7. Release and post-launch readiness
- Release notes are prepared where relevant
- Known issues are documented
- Accepted risks are explicit
- Feedback channel exists where relevant
- Immediate post-launch observation plan exists where relevant
- Hotfix / rollback thinking exists where realistically needed
- Follow-up ownership is clear where relevant

## Final assessment

### Blocker
- none / list items

### High
- none / list items

### Medium
- none / list items

### Low
- none / list items

## Final recommendation
- Ready for `/go-live`
- Conditionally ready for `/go-live`
- Not ready for `/go-live`

## Required fixes before go-live
- item 1
- item 2

## Accepted residual risks
- item 1
- item 2

## Recommended next step
- `/go-live`
- `/qa`
- `/doctor`
- `/docs`
- `/rollback`