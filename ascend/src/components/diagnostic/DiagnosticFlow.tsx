"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  buildResult,
  EMPTY_ANSWERS,
  STEPS,
  type Answers,
  type StepId,
} from "@/lib/diagnostic";
import { cn } from "@/lib/utils";
import { DiagnosticStep } from "./DiagnosticStep";
import { DiagnosticResults } from "./DiagnosticResults";

const EASE = [0.16, 1, 0.3, 1] as const;
const RESULT_INDEX = STEPS.length; // step 5

export function DiagnosticFlow() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();

  const step = STEPS[index];
  const onResult = index === RESULT_INDEX;
  const result = useMemo(
    () => (onResult ? buildResult(answers) : null),
    [onResult, answers],
  );

  const toggle = (stepId: StepId, value: string) => {
    const definition = STEPS.find((s) => s.id === stepId);
    const option = definition?.options.find((o) => o.value === value);

    setAnswers((prev) => {
      const current = prev[stepId];

      if (definition?.single) {
        return { ...prev, [stepId]: current.includes(value) ? [] : [value] };
      }
      if (option?.exclusive) {
        return { ...prev, [stepId]: current.includes(value) ? [] : [value] };
      }

      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      // Any real selection clears an exclusive "none / not sure" answer.
      const exclusiveValues =
        definition?.options.filter((o) => o.exclusive).map((o) => o.value) ?? [];

      return {
        ...prev,
        [stepId]: next.filter((v) => !exclusiveValues.includes(v)),
      };
    });
  };

  const canContinue = step ? (answers[step.id]?.length ?? 0) > 0 : true;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    go(0);
  };

  const progress = (index + 1) / (RESULT_INDEX + 1);

  return (
    <div>
      {/* ---------- Progress ---------- */}
      <div className="flex flex-col gap-5 border-b border-white/12 pb-8">
        <div className="flex items-center justify-between gap-6">
          <p className="type-meta text-[0.65rem] opacity-50">
            {onResult ? "RESULT" : `STEP ${step.index} / 0${STEPS.length}`}
          </p>
          <p className="type-meta text-[0.65rem] opacity-30 tabular-nums">
            {Math.round(progress * 100)}%
          </p>
        </div>

        <div
          className="grid grid-cols-5 gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={RESULT_INDEX + 1}
          aria-valuenow={index + 1}
          aria-label="Diagnostic progress"
        >
          {Array.from({ length: RESULT_INDEX + 1 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-px transition-colors duration-700 [transition-timing-function:var(--ease-ascend)]",
                i <= index ? "bg-paper" : "bg-white/20",
              )}
            />
          ))}
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="pt-14 sm:pt-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={onResult ? "result" : step.id}
            custom={direction}
            initial={reduced ? false : { opacity: 0, y: direction * 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: direction * -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {onResult && result ? (
              <DiagnosticResults result={result} onRestart={restart} />
            ) : (
              <DiagnosticStep
                step={step}
                selected={answers[step.id]}
                onToggle={(value) => toggle(step.id, value)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Controls ---------- */}
      {!onResult && (
        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => go(Math.max(0, index - 1))}
            disabled={index === 0}
            className="inline-flex items-center justify-center gap-3 px-2 py-4 type-label opacity-60 transition-opacity hover:opacity-100 disabled:pointer-events-none disabled:opacity-20 sm:justify-start"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            BACK
          </button>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {!canContinue && (
              <p className="type-meta text-[0.6rem] opacity-35 sm:mr-4">
                Select at least one option
              </p>
            )}
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={!canContinue}
              className="group inline-flex items-center justify-center gap-3 bg-paper px-8 py-5 type-label text-ink transition-all duration-500 hover:bg-white disabled:pointer-events-none disabled:opacity-25"
            >
              {index === STEPS.length - 1 ? "SEE YOUR RESULT" : "CONTINUE"}
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
