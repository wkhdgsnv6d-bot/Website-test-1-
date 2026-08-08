import { cn } from "@/lib/utils";

/**
 * The Ascend peak / A mark.
 * An outer peak with an inner echo — reads as an ascent and as a stylised "A".
 * Used as favicon motif, section marker, button detail and mobile icon.
 */
export function PeakIcon({
  className,
  strokeWidth = 1.5,
  inner = true,
}: {
  className?: string;
  strokeWidth?: number;
  inner?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={cn("h-4 w-4", className)}
    >
      <path d="M1.5 21 L12 3 L22.5 21" />
      {inner && <path d="M7.2 21 L12 12.7 L16.8 21" />}
    </svg>
  );
}
