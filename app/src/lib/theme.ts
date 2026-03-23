/**
 * Strategaize Project Cockpit — Theme & Branding Configuration
 *
 * Central place for all design tokens and branding values.
 * This file is the single source of truth for visual identity.
 *
 * Visual direction:
 * - Clean, modern, calm, professional
 * - Not overloaded, no flashy enterprise or playful SaaS aesthetics
 * - Clear hierarchy, quiet surfaces, good readability
 * - Subtle accents over visual noise
 *
 * Usage:
 * - CSS custom properties are defined in globals.css and reference these semantic roles
 * - Components consume via Tailwind classes (bg-brand-primary, text-brand-accent, etc.)
 * - This file provides the TypeScript-accessible constants for non-CSS contexts
 */

// ─── App Identity ───────────────────────────────────────────────────────────

export const app = {
  name: "Strategaize Cockpit",
  shortName: "Cockpit",
  /** Path to logo file in /public — null means text-only header */
  logoPath: null as string | null,
} as const;

// ─── Design Tokens (reference values) ──────────────────────────────────────
// These mirror the CSS custom properties in globals.css.
// The actual rendering uses CSS variables; these constants exist for
// TypeScript contexts (e.g., dynamic styles, meta tags, documentation).

export const tokens = {
  brand: {
    /** Slate 900 — primary brand, sidebar background, strong elements */
    primary: "#0f172a",
    /** Slate 600 — secondary, less prominent brand surfaces */
    secondary: "#475569",
    /** Indigo 500 — accent for interactive elements, focus rings, active states */
    accent: "#6366f1",
  },
  surface: {
    /** App background — very light warm gray */
    background: "#f8fafc",
    /** Card / panel surfaces — white */
    card: "#ffffff",
    /** Muted backgrounds — subtle gray for headers, hover */
    muted: "#f1f5f9",
  },
  text: {
    /** Primary text — near-black */
    primary: "#0f172a",
    /** Secondary text — muted gray for labels, helpers */
    secondary: "#64748b",
  },
  border: {
    /** Default border — subtle separator */
    default: "#e2e8f0",
  },
  status: {
    /** Success / done — green */
    success: "#16a34a",
    /** Warning / in_progress — amber */
    warning: "#d97706",
    /** Error / blocked — red */
    error: "#dc2626",
    /** Info / planned — blue */
    info: "#2563eb",
  },
  radius: {
    /** Base border radius */
    base: "0.5rem",
  },
  shadow: {
    /** Card shadow — very subtle elevation */
    card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
  },
} as const;
