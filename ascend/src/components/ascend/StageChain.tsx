import { ASCEND_STAGES, type StageId } from "@/lib/ascend-system";
import { cn } from "@/lib/utils";

/**
 * The full eight-stage journey with covered stages lit.
 * Laid out as a 4×2 block so coverage always reads as a shape, not a sentence.
 */
export function StageChain({
  stages,
  className,
  size = "default",
}: {
  stages: StageId[];
  className?: string;
  size?: "small" | "default";
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-4 gap-x-3 gap-y-3",
        size === "small" ? "max-w-sm" : "max-w-md",
        className,
      )}
    >
      {ASCEND_STAGES.map((stage) => {
        const covered = stages.includes(stage.id);
        return (
          <li key={stage.id} className="flex flex-col gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "block h-px w-full",
                covered ? "bg-current opacity-70" : "bg-current opacity-15",
              )}
            />
            <span
              className={cn(
                "type-meta leading-none",
                size === "small" ? "text-[0.55rem]" : "text-[0.6rem]",
                covered ? "opacity-90" : "opacity-25",
              )}
            >
              {stage.name}
            </span>
            <span className="sr-only">
              {covered ? "included" : "not included"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Simple arrow-separated sequence, used for the operational journey band. */
export function FlowChain({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-4">
          <span className="type-meta text-[0.7rem]">{item}</span>
          {i < items.length - 1 && (
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-25" />
          )}
        </li>
      ))}
    </ol>
  );
}
