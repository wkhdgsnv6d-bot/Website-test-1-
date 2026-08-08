import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AscendSolution } from "@/lib/solutions";
import { getStage } from "@/lib/ascend-system";
import { cn } from "@/lib/utils";

export function SolutionCard({
  solution,
  surface = "light",
  className,
}: {
  solution: AscendSolution;
  surface?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={`/solutions#${solution.id}`}
      className={cn(
        "group relative flex min-h-[19rem] flex-col justify-between border p-8 transition-colors duration-500 [transition-timing-function:var(--ease-ascend)]",
        surface === "dark"
          ? "border-white/12 hover:border-white/40 hover:bg-white/[0.03]"
          : "border-black/12 hover:border-black/40 hover:bg-black/[0.02]",
        className,
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="type-meta text-[0.65rem] tabular-nums opacity-35">
            {solution.index}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 opacity-25 transition-all duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70"
          />
        </div>

        <h3 className="type-display mt-10 text-[1.5rem]">{solution.name}</h3>
        <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed opacity-65">
          {solution.short}
        </p>
      </div>

      <div
        className={cn(
          "mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6",
          surface === "dark" ? "border-white/12" : "border-black/10",
        )}
      >
        <span className="type-meta text-[0.65rem] opacity-80">
          {solution.price}
        </span>
        <span className="type-meta text-[0.6rem] opacity-35">
          {solution.stages.map((s) => getStage(s).name).join(" · ")}
        </span>
      </div>
    </Link>
  );
}
