import { Card, CardContent } from "@/components/ui/card";
import { CircleOff, AlertCircle } from "lucide-react";

/**
 * Shared empty/error state card for consistent messaging across views. (V4 Premium)
 */
export function EmptyState({
  message,
  variant = "muted",
}: {
  message: string;
  variant?: "muted" | "error";
}) {
  const Icon = variant === "error" ? AlertCircle : CircleOff;
  const iconBg = variant === "error" ? "bg-red-50" : "bg-slate-50";
  const iconColor = variant === "error" ? "text-red-400" : "text-slate-300";

  return (
    <Card>
      <CardContent className="pt-8 pb-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBg} mb-4`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <p
            className={`text-sm ${
              variant === "error"
                ? "text-destructive font-medium"
                : "text-muted-foreground"
            }`}
          >
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
