"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SYMPTOMS } from "@/lib/diagnostic";
import { getStage } from "@/lib/ascend-system";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";

/**
 * Home-page taster for the diagnostic. Selecting symptoms reveals the Ascend
 * stage each one belongs to — the point being that problems have a location.
 */
export function DiagnosticPreview() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  const stages = SYMPTOMS.filter((s) => selected.includes(s.label)).map((s) =>
    getStage(s.stage),
  );

  return (
    <div>
      <ul className="grid gap-px border border-black/12 bg-black/12 sm:grid-cols-2 lg:grid-cols-4">
        {SYMPTOMS.map((symptom) => {
          const isSelected = selected.includes(symptom.label);
          const stage = getStage(symptom.stage);
          return (
            <li key={symptom.label} className="bg-paper">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(symptom.label)}
                className={cn(
                  "group flex h-full min-h-[10.5rem] w-full flex-col justify-between gap-8 p-6 text-left transition-colors duration-500 [transition-timing-function:var(--ease-ascend)]",
                  isSelected
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink hover:bg-black/[0.03]",
                )}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="max-w-[18ch] text-[0.95rem] leading-snug">
                    {symptom.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center border transition-colors duration-500",
                      isSelected
                        ? "border-paper/70 text-paper"
                        : "border-black/20 text-transparent group-hover:border-black/50",
                    )}
                  >
                    <PeakIcon className="h-2.5 w-2.5" inner={false} />
                  </span>
                </span>

                <span
                  className={cn(
                    "type-meta text-[0.6rem] transition-opacity duration-500",
                    isSelected ? "opacity-70" : "opacity-30",
                  )}
                >
                  {stage.index} · {stage.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col gap-8 border-t border-black/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
        <p
          className="max-w-[52ch] text-sm leading-relaxed opacity-65"
          aria-live="polite"
        >
          {stages.length === 0 ? (
            "Select what sounds familiar. Each symptom belongs to a stage of the Ascend System — that is where the work starts."
          ) : (
            <>
              <span className="opacity-100">
                {stages.length} selected — pointing at{" "}
              </span>
              <span className="type-meta text-[0.7rem]">
                {[...new Set(stages.map((s) => s.name))].join(" · ")}
              </span>
              <span className="opacity-100">
                . The full diagnostic turns this into a recommendation.
              </span>
            </>
          )}
        </p>

        <Link
          href="/diagnostic"
          className="group inline-flex shrink-0 items-center justify-center gap-3 bg-ink px-8 py-5 type-label text-paper transition-colors duration-500 hover:bg-graphite"
        >
          START THE ASCEND DIAGNOSTIC
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
