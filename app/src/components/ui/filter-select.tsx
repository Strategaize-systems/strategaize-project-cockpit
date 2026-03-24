/**
 * Shared premium filter select for table pages. (V4)
 * Used on: Backlog, Reports, Features, Slices
 */
export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-9 rounded-lg border bg-white px-3 text-sm font-medium transition-all duration-200 cursor-pointer appearance-none pr-8 ${
        value
          ? "border-[var(--brand-primary-main)]/40 text-foreground shadow-sm"
          : "border-border/60 text-muted-foreground"
      } hover:border-[var(--brand-primary-main)]/60 focus:outline-none focus:border-[var(--brand-primary-main)] focus:ring-[3px] focus:ring-[var(--brand-primary-main)]/10`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 0.5rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1.25em 1.25em",
      }}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Filter reset button with premium styling.
 */
export function FilterResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-medium text-muted-foreground hover:text-[var(--brand-primary-main)] transition-colors px-2 py-1.5"
    >
      Filter zurücksetzen
    </button>
  );
}
