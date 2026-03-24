---
title: Design System Discovery
date: 2026-03-23
status: completed — Figma-Designs erhalten, Requirements geschrieben
---

# Design System — Discovery

## Ziel
Cockpit visuell upgraden (moderner, professioneller), dann Design als wiederverwendbare Baseline für alle Strategaize-Projekte extrahieren.

## V4.0 — Design Upgrade Cockpit
- Figma-Design umsetzen
- theme.ts + globals.css aktualisieren
- Komponenten visuell anpassen (Cards, Sidebar, Tabellen, Badges)
- Ergebnis: Cockpit sieht professioneller aus

## V4.1 — Design System + Anpassbarkeit
- Design Tokens als wiederverwendbare Konfiguration
- Pro-Projekt-Anpassung: Farben, Logo, Font über Config
- Skill oder Template für neue Projekte

## Figma → Code Workflow
1. Design in Figma erstellen
2. Design-Werte ablesen (Farben, Font, Spacing, Radius, Schatten)
3. Werte an Claude Code geben
4. Umsetzung in theme.ts + globals.css + Komponenten

## Benötigte Werte aus Figma
- Farben: Primary, Secondary, Accent, Background, Card, Text, Status-Farben
- Font: Name (Google Fonts), Größen
- Spacing/Radius: Falls abweichend
- Schatten: Stärke
- Layout: Sidebar-Form, Card-Design, Tabellen-Style (falls geändert)

## Blocker
- Figma-Account noch nicht freigeschaltet

## Parked
- Figma-to-Code Automatisierung (nicht nötig)
- Design System als npm Package (erst bei mehreren Projekten)
- Dark Mode (nicht V4.0)
