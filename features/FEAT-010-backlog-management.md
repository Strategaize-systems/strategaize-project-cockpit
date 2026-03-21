# FEAT-010 — Backlog-Datenpflege (minimal)

## Status
planned

## Priority
medium

## Version
V2

## Beschreibung
Minimale Möglichkeit, Backlog-Einträge anzulegen und zu pflegen, ohne Markdown-Dateien manuell bearbeiten zu müssen.

## Problemkontext
Ohne Schreibzugriff wäre V2 nur ein erweitertes Read-Cockpit. Ein Planungscockpit braucht die Möglichkeit, neue Arbeitspakete zu erfassen und bestehende zu aktualisieren. V2 begrenzt dies bewusst auf minimale Datenpflege — kein vollständiges PM-Editing.

## In Scope
- Formular zum Anlegen eines neuen Backlog-Eintrags (Typ, Titel, Priorität, Version, Beschreibung)
- Bearbeitung von Status, Priorität, Versionszuordnung bestehender Einträge
- Schreibt direkt in strukturierte Repo-Dateien (kein DB-Layer)
- Validierung der Eingaben (Pflichtfelder, gültige Werte)
- Bestätigung nach erfolgreichem Speichern

## Out of Scope
- Vollständiges Editing aller Felder (z.B. ID-Änderung, Typ-Änderung nach Anlage)
- Löschen von Backlog-Einträgen über die UI
- Drag-and-Drop-Umorganisation
- Massenoperationen (Bulk-Edit, Bulk-Status-Change)
- Bearbeitung anderer Projektdateien (STATE.md, DECISIONS.md etc.)
- Versionserstellung oder Versions-Editing
- Undo/Redo-Funktionalität

## Erfolgskriterien
- Nutzer kann einen neuen Backlog-Eintrag über die UI anlegen
- Nutzer kann Status und Priorität eines Eintrags ändern
- Änderungen sind sofort in der Backlog-Sicht sichtbar
- Die zugrundeliegende Datei im Repo wird korrekt aktualisiert

## Offene Punkte
- Write-API: Server Action oder API Route? (Architecture-Entscheidung)
- Konfliktbehandlung: Was passiert bei gleichzeitigem Dateizugriff? (Architecture-Entscheidung)
- ID-Vergabe: Wie werden neue IDs generiert? (Architecture-Entscheidung)
- Scope-Grenze: Ist Versionszuordnung-Ändern in V2 oder V3? (Scope-Entscheidung)
