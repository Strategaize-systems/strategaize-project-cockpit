# Review Skill

## Purpose

This skill reviews the last Completion Report against project criteria to provide an independent quality check.

It replaces an external review instance (e.g., ChatGPT) with an internal, context-aware review that has full access to project files.

Use it when:
- a Completion Report was just produced by another skill
- the user wants an independent check before proceeding
- the Nächster-Schritt-Engine recommends `/review`

## Core behavior

When invoked, this skill should:

1. Identify the last Completion Report in `reports/` (highest RPT-ID with type=completion).
2. Read the relevant project context files.
3. Check the report against defined criteria.
4. Produce a structured review result.
5. Save the review as a report file (type=review).

## Step 1 — Find the last Completion Report

Scan the `reports/` directory in the active project.
Find the file with the highest RPT-XXX ID where frontmatter `type: completion`.

If no completion report exists:
- state clearly that no report was found
- do not fabricate a review

## Step 2 — Load project context

For the slice and feature referenced in the report, load:
- Slice definition: `slices/SLC-XXX-*.md`
- Feature definition: `features/FEAT-XXX-*.md` (if it exists)
- Architecture: `docs/ARCHITECTURE.md`
- Decisions: `docs/DECISIONS.md`

If a referenced file does not exist, note it but continue.

## Step 3 — Review criteria

Check the Completion Report against these criteria:

### 3a. Scope alignment
Does the reported work match the slice scope?
- Are the listed files consistent with the slice definition?
- Were out-of-scope changes introduced without justification?

### 3b. Acceptance criteria coverage
Are the acceptance criteria from the slice definition addressed?
- Which criteria are clearly met?
- Which criteria are unclear or not addressed?
- Which criteria were skipped?

### 3c. File accounting consistency
Is the file reporting consistent?
- Do file counts match listed files?
- Are all created/modified files listed?
- Are paths complete and valid?

### 3d. Problem transparency
Were problems reported honestly?
- Are there issues hidden as "open points" that should be "problems"?
- Is verification confidence stated clearly?
- Are browser/runtime gaps acknowledged?

### 3e. Architecture and decisions alignment
Does the work contradict any documented architecture or decisions?

## Step 4 — Produce review result

The review output must follow this structure:

```
## Ergebnis: bestanden / nicht bestanden / teilweise bestanden

## Geprüfte Kriterien
- [x/✗] Scope-Übereinstimmung mit Slice-Definition
- [x/✗] Akzeptanzkriterien adressiert
- [x/✗] Datei-Buchhaltung konsistent
- [x/✗] Probleme transparent berichtet
- [x/✗] Architektur/Decisions-Alignment

## Findings
- list specific findings, if any

## Empfehlung
- next step recommendation
```

## Step 5 — Save as report

Save the review result as a new report file in `reports/`:

```yaml
---
id: RPT-XXX
date: "YYYY-MM-DD"
skill: review
slice: SLC-XXX
feature: FEAT-XXX
type: review
status: completed
reviewOf: RPT-XXX
title: "Review RPT-XXX — [Titel des geprüften Reports]"
---
```

The `reviewOf` field must reference the ID of the reviewed completion report.

Generate the next available RPT-ID by scanning existing reports.

## Review depth (V3.0)

Pragmatic, not exhaustive:
- Scope check: yes
- Acceptance criteria check: yes
- File consistency: yes
- Problem transparency: yes
- Architecture alignment: yes
- Code-level analysis: no (that is /qa territory)
- Build verification: no (the skill does that itself)
- Browser testing: no (the user does that)

## What this skill is NOT

- Not a code review tool
- Not a build verification tool
- Not a replacement for /qa
- Not an approval gate — it is an advisory check

The user always makes the final decision on whether to proceed.

## Scope rules

Do not:
- re-implement anything
- modify any code files
- run builds or tests
- expand the review scope beyond what was reported
- invent findings that are not supported by the report content

## Output format

Always produce:
1. The structured review result (as shown in Step 4)
2. The saved report file path
3. A clear recommendation for the next step

## Quality bar

A good review:
- is honest about what was checked and what was not
- distinguishes between real problems and minor observations
- does not inflate small issues into blockers
- does not hide real problems behind a clean "bestanden"
- gives a clear, actionable recommendation
