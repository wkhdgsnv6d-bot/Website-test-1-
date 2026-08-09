import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Oversized ACND monogram used as a background detail.
 * Deliberately rare — one per page at most.
 */
export function Watermark({
  className,
  text = BRAND.monogram,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none font-display font-semibold leading-none tracking-[0.18em]",
        "text-[clamp(6rem,26vw,22rem)] opacity-[0.035]",
        className,
      )}
    >
      {text}
    </span>
  );
}
