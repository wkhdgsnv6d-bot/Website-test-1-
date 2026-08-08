"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ASCEND_STAGES, type StageId } from "@/lib/ascend-system";
import { PACKAGES } from "@/lib/packages";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

import { StageAccordionItem, StageNode } from "./AscendStage";

/**
 * The Ascend System, interactive.
 * Desktop: horizontal timeline (tabs) with a detail panel.
 * Mobile: vertical accordion.
 */
export function AscendSystemTimeline({
  surface = "dark",
}: {
  surface?: "dark" | "light";
}) {
  const [active, setActive] = useState<StageId>("attract");
  const [openMobile, setOpenMobile] = useState<StageId | null>("attract");
  const reduced = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeStage =
    ASCEND_STAGES.find((s) => s.id === active) ?? ASCEND_STAGES[0];
  const activeIndex = ASCEND_STAGES.findIndex((s) => s.id === active);

  const focusTab = (index: number) => {
    const next =
      ASCEND_STAGES[(index + ASCEND_STAGES.length) % ASCEND_STAGES.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(ASCEND_STAGES.length - 1);
        break;
    }
  };

  const packagesCovering = PACKAGES.filter((p) => p.stages.includes(active));

  return (
    <div className={cn(surface === "dark" ? "text-paper" : "text-ink")}>
      {/* ---------- Desktop ---------- */}
      <div className="hidden lg:block">
        <div
          role="tablist"
          aria-label="The Ascend System stages"
          className="grid grid-cols-8"
        >
          {ASCEND_STAGES.map((stage) => (
            <StageNode
              key={stage.id}
              stage={stage}
              active={stage.id === active}
              tabIndex={stage.id === active ? 0 : -1}
              onSelect={() => setActive(stage.id)}
              onKeyDown={onKeyDown}
              refCallback={(el) => {
                tabRefs.current[stage.id] = el;
              }}
            />
          ))}
        </div>

        <div className="relative mt-20 min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              id={`stage-panel-${activeStage.id}`}
              role="tabpanel"
              aria-labelledby={`stage-tab-${activeStage.id}`}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-12 gap-12"
            >
              <div className="relative col-span-5 flex flex-col">
                <p className="type-meta text-[0.65rem] tabular-nums opacity-40">
                  STAGE {activeStage.index} / 08
                </p>
                <h3 className="type-display mt-6 text-[clamp(2.5rem,4.5vw,4rem)]">
                  {activeStage.name}
                </h3>

                {/* Ghost ordinal — fills the column and marks position. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none mt-auto select-none font-display text-[9rem] font-semibold leading-none tracking-tight opacity-[0.06]"
                >
                  {activeStage.index}
                </span>
              </div>

              <div className="col-span-7 flex flex-col gap-8 border-l border-current/12 pl-12">
                <p className="type-label opacity-55">
                  {activeStage.components}
                </p>
                <p className="max-w-[46ch] text-xl leading-relaxed opacity-85">
                  {activeStage.summary}
                </p>
                <p className="max-w-[54ch] text-[0.95rem] leading-relaxed opacity-55">
                  {activeStage.meaning}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="type-meta text-[0.6rem] opacity-35">
                    COVERED BY
                  </span>
                  {packagesCovering.map((pkg) => (
                    <span
                      key={pkg.id}
                      className="border border-current/20 px-3 py-1.5 type-meta text-[0.6rem] opacity-70"
                    >
                      {pkg.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- Mobile ---------- */}
      <ul className="lg:hidden">
        {ASCEND_STAGES.map((stage, i) => (
          <StageAccordionItem
            key={stage.id}
            stage={stage}
            open={openMobile === stage.id}
            first={i === 0}
            last={i === ASCEND_STAGES.length - 1}
            onToggle={() =>
              setOpenMobile((current) => (current === stage.id ? null : stage.id))
            }
          />
        ))}
      </ul>
    </div>
  );
}
