import { Card, CardContent } from "@/components/ui/card";

/**
 * Shared empty/error state card for consistent messaging across views.
 */
export function EmptyState({
  message,
  variant = "muted",
}: {
  message: string;
  variant?: "muted" | "error";
}) {
  return (
    <Card>
      <CardContent className="pt-6 pb-6">
        <p
          className={`text-sm ${
            variant === "error"
              ? "text-destructive font-medium"
              : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
