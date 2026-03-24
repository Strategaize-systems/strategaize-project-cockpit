/**
 * Strategaize Project Cockpit — Theme & Branding Configuration (V4)
 *
 * Central place for all design tokens and branding values.
 * Based on: /docs/strategaize_styleguide.md (Figma Style Guide V2)
 *
 * Visual direction:
 * - Premium, modern, confident
 * - Brand gradients for emphasis, not decoration
 * - Clear hierarchy through weight and color
 * - Controlled energy: glows and gradients only for important states
 * - Enough whitespace, no overcrowded screens
 *
 * Usage:
 * - CSS custom properties are defined in globals.css and reference these values
 * - Components consume via Tailwind classes
 * - This file provides TypeScript-accessible constants for non-CSS contexts
 */

// ─── App Identity ───────────────────────────────────────────────────────────

export const app = {
  name: "StrategAIze Cockpit",
  shortName: "Cockpit",
  subtitle: "Operations Dashboard",
  /** Path to logo file in /public — null means text-only header */
  logoPath: null as string | null,
} as const;

// ─── Brand Colors ───────────────────────────────────────────────────────────

export const brand = {
  /** Primary Dark — deep brand blue */
  primaryDark: "#120774",
  /** Primary Main — lighter brand blue */
  primaryMain: "#4454b8",
  /** Success Dark */
  successDark: "#00a84f",
  /** Success Light */
  successLight: "#4dcb8b",
  /** Warning Dark */
  warningDark: "#f2b705",
  /** Warning Light */
  warningLight: "#ffd54f",
  /** Error */
  error: "#dc2626",
  /** Error Light */
  errorLight: "#f87171",
} as const;

// ─── Gradients ──────────────────────────────────────────────────────────────

export const gradients = {
  /** Primary brand gradient — CTAs, active states, buttons */
  primary: "linear-gradient(to right, #120774, #4454b8)",
  /** Success gradient — completed states, progress bars */
  success: "linear-gradient(to right, #00a84f, #4dcb8b)",
  /** Warning gradient — in-progress states */
  warning: "linear-gradient(to right, #f2b705, #ffd54f)",
  /** Sidebar background gradient */
  sidebar: "linear-gradient(to bottom, #0f172a, #0f172a, #020617)",
  /** Table/card top border gradient */
  topBorder: "linear-gradient(to right, #120774, #4454b8, #00a84f)",
} as const;

// ─── Surface Colors ─────────────────────────────────────────────────────────

export const surface = {
  /** App background */
  background: "#f8fafc",
  /** Card / panel surfaces */
  card: "#ffffff",
  /** Muted backgrounds — headers, hover */
  muted: "#f1f5f9",
} as const;

// ─── Text Colors ────────────────────────────────────────────────────────────

export const text = {
  /** Primary text — near-black */
  primary: "#0f172a",
  /** Secondary text — muted for labels */
  secondary: "#64748b",
  /** Tertiary — captions, less important */
  tertiary: "#94a3b8",
  /** Table header text */
  tableHeader: "#334155",
} as const;

// ─── Borders ────────────────────────────────────────────────────────────────

export const border = {
  /** Default border */
  default: "#e2e8f0",
  /** Lighter border for subtle separators */
  light: "#f1f5f9",
} as const;

// ─── Shadows ────────────────────────────────────────────────────────────────

export const shadow = {
  /** Card — subtle elevation */
  card: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  /** Card hover — elevated */
  cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  /** Brand glow — primary elements */
  brandGlow: "0 8px 16px rgba(68, 84, 184, 0.3)",
  /** Brand glow hover — stronger */
  brandGlowHover: "0 10px 15px rgba(68, 84, 184, 0.4)",
  /** Success glow */
  successGlow: "0 8px 16px rgba(0, 168, 79, 0.2)",
  /** Warning glow */
  warningGlow: "0 8px 16px rgba(242, 183, 5, 0.2)",
  /** Button shadow */
  button: "0 4px 6px rgba(68, 84, 184, 0.3)",
} as const;

// ─── Spacing (8px base) ─────────────────────────────────────────────────────

export const spacing = {
  /** 8px */
  xs: "0.5rem",
  /** 12px */
  sm: "0.75rem",
  /** 16px */
  md: "1rem",
  /** 24px */
  lg: "1.5rem",
  /** 32px */
  xl: "2rem",
  /** 48px */
  xxl: "3rem",
} as const;

// ─── Border Radius ──────────────────────────────────────────────────────────

export const radius = {
  /** 8px — badges, small elements */
  md: "0.5rem",
  /** 12px — cards, buttons */
  lg: "0.75rem",
  /** 16px — large cards */
  xl: "1rem",
  /** Full round */
  full: "9999px",
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  sizes: {
    /** 30px — Page Title */
    "3xl": "1.875rem",
    /** 20px — Subtitle */
    xl: "1.25rem",
    /** 16px — Body / Section Title */
    base: "1rem",
    /** 14px — Small Body */
    sm: "0.875rem",
    /** 12px — Caption, Table Header */
    xs: "0.75rem",
    /** 10px — Section Labels */
    xxs: "0.625rem",
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

// ─── Animation Timings ──────────────────────────────────────────────────────

export const animation = {
  /** Micro-interactions: buttons, icons */
  fast: "200ms",
  /** Cards, larger elements */
  medium: "300ms",
  /** Progress bars, smooth animations */
  slow: "500ms",
  /** Easing function */
  easing: "ease-out",
} as const;

// ─── Chart Colors ───────────────────────────────────────────────────────────

export const chartColors = {
  primary: "#4454b8",
  secondary: "#00a84f",
  tertiary: "#f2b705",
  quaternary: "#8b5cf6",
  quinary: "#ef4444",
} as const;

// ─── Legacy export (backward compatibility) ─────────────────────────────────

export const tokens = {
  brand: {
    primary: brand.primaryDark,
    secondary: text.secondary,
    accent: brand.primaryMain,
  },
  surface,
  text: {
    primary: text.primary,
    secondary: text.secondary,
  },
  border,
  status: {
    success: brand.successDark,
    warning: brand.warningDark,
    error: brand.error,
    info: brand.primaryMain,
  },
  radius: {
    base: radius.md,
  },
  shadow: {
    card: shadow.card,
  },
} as const;
