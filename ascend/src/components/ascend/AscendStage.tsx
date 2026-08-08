"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AscendStage } from "@/lib/ascend-system";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Desktop timeline node. Rendered as a tab inside AscendSystemTimeline.
 */
export function StageNode({
  stage,
  active,
  tabIndex,
  onSelect,
  onKeyDown,
  refCallback,
}: {
  stage: AscendStage;
  active: boolean;
  tabIndex: number;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  refCallback: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={refCallback}
      type="button"
      role="tab"
      id={`stage-tab-${stage.id}`}
      aria-selected={active}
      aria-controls={`stage-panel-${stage.id}`}
      tabIndex={tabIndex}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onKeyDown={onKeyDown}
      className="group relative flex cursor-pointer flex-col items-start pb-1 text-left"
    >
      <span
        className={cn(
          "type-meta text-[0.65rem] tabular-nums transition-opacity duration-500",
          active ? "opacity-70" : "opacity-30 group-hover:opacity-50",
        )}
      >
        {stage.index}
      </span>

      {/* Node row — the connecting hairline runs through here. */}
      <span className="relative mt-5 flex h-4 w-full items-center">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current opacity-15"
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative z-10 block size-1.5 border border-current transition-all duration-500 [transition-timing-function:var(--ease-ascend)]",
            active
              ? "bg-current opacity-100"
              : "bg-transparent opacity-35 group-hover:opacity-70",
          )}
        />
      </span>

      <span
        className={cn(
          "mt-5 type-label transition-opacity duration-500",
          active ? "opacity-100" : "opacity-45 group-hover:opacity-80",
        )}
      >
        {stage.name}
      </span>
    </button>
  );
}

/**
 * Mobile / vertical presentation. Expands in place.
 */
export function StageAccordionItem({
  stage,
  open,
  onToggle,
  first = false,
  last = false,
}: {
  stage: AscendStage;
  open: boolean;
  onToggle: () => void;
  first?: boolean;
  last?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <li className="relative pl-8">
      {/* Continuous vertical spine, capped at the first and last nodes. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[3px] w-px bg-current opacity-15",
          last ? "top-0 h-5" : first ? "top-5 bottom-0" : "inset-y-0",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-5 block size-1.5 border border-current transition-colors duration-500",
          open ? "bg-current opacity-100" : "opacity-40",
        )}
      />

      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`stage-accordion-${stage.id}`}
          className="flex w-full items-center justify-between gap-4 border-b border-current/10 py-5 text-left"
        >
          <span className="flex items-baseline gap-4">
            <span className="type-meta text-[0.65rem] tabular-nums opacity-35">
              {stage.index}
            </span>
            <span className="type-display text-[1.35rem]">{stage.name}</span>
          </span>
          <PeakIcon
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)]",
              open ? "opacity-70" : "rotate-180 opacity-35",
            )}
            inner={false}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`stage-accordion-${stage.id}`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="py-6 pr-2">
              <p className="type-meta text-[0.65rem] opacity-45">
                {stage.components}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed opacity-75">
                {stage.summary}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
