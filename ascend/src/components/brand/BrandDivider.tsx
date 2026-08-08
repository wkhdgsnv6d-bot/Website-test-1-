import { cn } from "@/lib/utils";
import { PeakIcon } from "./PeakIcon";

/**
 * Thin architectural rule with an optional peak marker.
 * The primary way sections are separated across the site.
 */
export function BrandDivider({
  className,
  withMark = true,
  align = "left",
}: {
  className?: string;
  withMark?: boolean;
  align?: "left" | "center";
}) {
  if (!withMark) {
    return (
      <hr className={cn("border-0 border-t border-current opacity-15", className)} />
    );
  }

  return (
    <div
      className={cn("flex w-full items-center gap-4", className)}
      role="presentation"
    >
      {align === "center" && (
        <span className="h-px flex-1 bg-current opacity-15" />
      )}
      <PeakIcon className="h-3.5 w-3.5 shrink-0 opacity-40" inner={false} />
      <span className="h-px flex-1 bg-current opacity-15" />
    </div>
  );
}
