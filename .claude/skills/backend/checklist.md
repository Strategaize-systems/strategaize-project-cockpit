# Backend Checklist

Use this checklist before considering backend work complete.

## Scope
- Only the intended backend slice was implemented
- No accidental scope expansion was introduced
- The work stays within the approved architecture and delivery mode

## Data and persistence
- Data model changes were made only when required
- Storage direction remains consistent with the architecture
- Data integrity implications were considered
- Relevant migration impact was identified

## Auth, security, and policies
- Auth implications were considered where relevant
- Access control or policy implications were considered where relevant
- No obvious security-sensitive shortcut was introduced
- Privacy or sensitive-data implications were not ignored

## APIs and integrations
- API behavior is aligned with the intended feature scope
- Integration logic was added only when justified
- No unnecessary external dependency or backend coupling was introduced

## Maintainability
- The implementation remains understandable
- No obvious dead backend code was introduced
- No unnecessary abstraction layer was added
- The result is reasonably maintainable

## Records and traceability
- `/docs/MIGRATIONS.md` updated when relevant
- `/docs/DECISIONS.md` updated when relevant
- `/docs/KNOWN_ISSUES.md` updated when relevant
- The result is ready for QA