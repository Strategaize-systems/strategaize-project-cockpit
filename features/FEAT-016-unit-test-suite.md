# FEAT-016 — Unit Test Suite

## Version
V3.1

## Status
planned

## Priority
high

## Description
Automatisierte Unit Tests für die drei Kern-Libraries des Cockpits. Schützt kritische Logik (Parsing, ID-Generierung, Regelwerk, Validierung) vor Regressionen bei zukünftigen Änderungen.

## Scope

### Included
1. **Vitest Setup** — Test-Runner, Konfiguration, npm Script
2. **reports.ts Tests** — Frontmatter-Parsing, ID-Gen, Read/Write, Fehlertoleranz
3. **next-step.ts Tests** — Slice-Parsing, Skill-Erkennung, Regelwerk, Post-Impl-Workflow
4. **backlog.ts Tests** — Validierung, ID-Gen, Read/Write
5. **Test-Fixtures** — Beispiel-Markdown und -JSON Dateien

### Excluded
- API Route Tests
- E2E Browser Tests
- CI/CD Integration
- Coverage-Reporting

## Success Criteria
- `npm run test` läuft ohne Fehler
- Alle drei Libraries haben definierte Testfälle
- Tests laufen in unter 5 Sekunden
- Regressions-Schutz nachweisbar (absichtlicher Bug wird erkannt)

## Related Backlog
- BL-020

## Discovery
- /planning/testing-discovery.md
