# SLC-016 — V3 Fundament (Port + Report-Library + Sidebar)

## Related Features
- FEAT-011 (Report-Speicherung)
- FEAT-014 (Workspace-Navigation und Infrastruktur)

## Status
planned

## Priority
high

## Purpose
Grundlage für alle V3-Slices schaffen: fester Port, Report-Datenschicht (Library), Sidebar-Erweiterung um "Workspace"-Sektion und Platzhalter-Seiten für die neuen Views.

Folgt dem gleichen Pattern wie SLC-009 (V2 Fundament): Library + Navigation + Platzhalter in einem Schritt, damit nachfolgende Slices sofort darauf aufbauen können.

## Scope

### Included
1. **Port 4400**: `package.json` dev-Script auf `--port 4400` ändern. Optional `.env.local` mit `PORT=4400`.
2. **lib/reports.ts**: Frontmatter-Parsing (YAML-Frontmatter zwischen `---`), Verzeichnis-Scan (`reports/`), ID-Generierung (RPT-XXX), Read/Write-Funktionen, Validierung.
3. **Sidebar**: Dritte Sektion "Workspace" mit 2 Nav-Items: "Reports" (`/reports`), "Nächster Schritt" (`/next-step`).
4. **Platzhalter-Seiten**: `/app/src/app/reports/page.tsx` und `/app/src/app/next-step/page.tsx` mit leerem Grundgerüst (Page-Header, Loading-State, Leerzustand).

### Excluded
- API Routes (SLC-017)
- Report-Ansicht mit Filter/Sortierung (SLC-018)
- Nächster-Schritt-Engine Logik (SLC-019)
- /review-Skill (SLC-021)

## Key Files

### Neue Dateien
- `/app/src/lib/reports.ts`
- `/app/src/app/reports/page.tsx` (Platzhalter)
- `/app/src/app/next-step/page.tsx` (Platzhalter)

### Modifizierte Dateien
- `/app/src/components/sidebar.tsx` — Workspace-Sektion hinzufügen
- `/app/package.json` — Port 4400

## Dependencies
- Keine — erster V3-Slice

## Technical Notes

### Frontmatter-Parsing (lib/reports.ts)
Einfaches String-Parsing ohne externe Abhängigkeiten:
1. Text zwischen erstem `---` und zweitem `---` extrahieren
2. Zeilen als `key: value` parsen
3. Quoted Strings entquoten
4. Body = alles nach dem zweiten `---`

### Report-Interface
```typescript
interface Report {
  id: string;           // RPT-001, RPT-002, ...
  date: string;         // ISO-Datum
  skill: string;        // frontend, backend, qa, review, etc.
  slice: string | null; // SLC-XXX oder null
  feature: string | null; // FEAT-XXX oder null
  type: "completion" | "review";
  status: "completed" | "reviewed" | "needs-rework";
  reviewOf: string | null; // RPT-XXX bei type=review
  title: string;
  body: string;         // Markdown-Inhalt
}
```

### ID-Generierung
Gleiches Pattern wie Backlog (BL-XXX):
1. reports/ scannen
2. RPT-Prefixes extrahieren
3. Maximum + 1, zero-padded auf 3 Stellen

## Acceptance Criteria
- [ ] Dev-Server startet auf Port 4400
- [ ] `lib/reports.ts` kann YAML-Frontmatter korrekt parsen (Pflichtfelder + optionale Felder)
- [ ] `lib/reports.ts` kann `reports/` Verzeichnis scannen und alle RPT-*.md lesen
- [ ] `lib/reports.ts` kann Report-Datei schreiben (Frontmatter + Body)
- [ ] `lib/reports.ts` generiert korrekte IDs (RPT-001 bei leerem Verzeichnis, RPT-XXX+1 bei bestehenden)
- [ ] Sidebar zeigt drei Sektionen: Projekt, Planung, Workspace
- [ ] "Reports" und "Nächster Schritt" sind in der Sidebar sichtbar und navigierbar
- [ ] Platzhalter-Seiten laden korrekt mit Page-Header und Leerzustand
- [ ] Bestehende V1/V2-Seiten funktionieren unverändert
