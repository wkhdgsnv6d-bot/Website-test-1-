"use client";

import type { Step } from "@/lib/diagnostic";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { Stagger, StaggerItem } from "@/components/ui/MotionReveal";

export function DiagnosticStep({
  step,
  selected,
  onToggle,
}: {
  step: Step;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="sr-only">{step.question}</legend>

      <div className="flex items-baseline gap-5">
        <span className="type-meta text-[0.7rem] tabular-nums opacity-35">
          {step.index}
        </span>
        <h2 className="type-display max-w-[18ch] text-[clamp(1.75rem,4.4vw,3rem)]">
          {step.question}
        </h2>
      </div>

      <p className="mt-6 max-w-[46ch] text-sm leading-relaxed opacity-55">
        {step.helper}
        {!step.single && (
          <span className="ml-1 opacity-70">Select as many as apply.</span>
        )}
      </p>

      <Stagger
        className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2"
        step={0.05}
      >
        {step.options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <StaggerItem key={option.value} className="bg-ink">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggle(option.value)}
                className={cn(
                  "group flex h-full w-full items-center justify-between gap-5 px-6 py-6 text-left transition-colors duration-400 [transition-timing-function:var(--ease-ascend)] sm:px-7 sm:py-7",
                  isSelected
                    ? "bg-paper text-ink"
                    : "bg-ink text-paper hover:bg-white/[0.05]",
                )}
              >
                <span className="type-label text-[0.75rem] leading-snug">
                  {option.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center border transition-all duration-400",
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-white/25 text-transparent group-hover:border-white/60",
                  )}
                >
                  <PeakIcon className="h-3 w-3" inner={false} />
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </fieldset>
  );
}
