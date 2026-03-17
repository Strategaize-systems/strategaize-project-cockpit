# SLC-002 Project Selector

## Slice ID
SLC-002

## Name
Project Selector

## Related Feature
FEAT-001 Project Overview

## Purpose
Allow the cockpit to identify and switch the active project context.

## Goal
Provide a simple way to choose which project the cockpit currently displays.

## Included in scope
- basic project selection logic
- simple selection UI
- active project context handling

## Explicitly out of scope
- advanced multi-project management
- permissions by project
- complex project metadata editing

## Expected result
The cockpit can switch between project contexts in a controlled way.

## Acceptance criteria
- active project can be selected
- selected project context is reflected in the UI
- later views can depend on the selected project

## Risks
- overbuilding multi-project behavior too early
- making project selection more complex than V1 needs

## Priority
high

## Status
planned
