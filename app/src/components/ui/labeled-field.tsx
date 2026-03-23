/**
 * Shared labeled field component for card-based views.
 * Renders a small label above a text value. Returns null if value is empty/undefined.
 */
export function LabeledField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        {label}
      </span>
      <p className="text-sm mt-0.5 leading-relaxed">{value}</p>
    </div>
  );
}
