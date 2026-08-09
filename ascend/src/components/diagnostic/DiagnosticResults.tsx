"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { DiagnosticResult } from "@/lib/diagnostic";
import { getStage } from "@/lib/ascend-system";
import { getPackage } from "@/lib/packages";
import { getSolution } from "@/lib/solutions";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { StageChain } from "@/components/ascend/StageChain";
import { PeakIcon } from "@/components/brand/PeakIcon";

export function DiagnosticResults({
  result,
  onRestart,
}: {
  result: DiagnosticResult;
  onRestart: () => void;
}) {
  const pkg = result.packageId ? getPackage(result.packageId) : undefined;
  const solutions = result.solutions.map(getSolution);
  const primarySolution = solutions[0];

  const exploreHref = pkg
    ? `/packages#${pkg.id}`
    : primarySolution
      ? `/solutions#${primarySolution.id}`
      : "/solutions";

  return (
    <div>
      <MotionReveal>
        <p className="flex items-center gap-3 type-label opacity-50">
          <PeakIcon className="h-3 w-3" inner={false} />
          YOUR ASCEND PATH
        </p>
      </MotionReveal>

      <MotionReveal delay={0.05}>
        <p className="mt-12 type-meta text-[0.65rem] opacity-40">RECOMMENDED</p>
        <h2 className="type-display mt-5 text-[clamp(2.75rem,9vw,6.5rem)]">
          {pkg ? pkg.name : "ASCEND SOLUTIONS"}
        </h2>
        {pkg && (
          <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-display text-2xl tracking-tight opacity-90">
              {pkg.verb}
            </span>
            <span className="type-meta text-[0.7rem] opacity-50">
              {pkg.price}
            </span>
          </p>
        )}
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="mt-14 grid gap-12 border-t border-white/12 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-meta text-[0.65rem] opacity-40">WHY</p>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed opacity-85">
              {result.why}
            </p>

            {pkg && (
              <div className="mt-12">
                <p className="type-meta text-[0.65rem] opacity-40">
                  ASCEND COVERAGE
                </p>
                <StageChain stages={pkg.stages} className="mt-5" />
              </div>
            )}

            <div className="mt-12">
              <p className="type-meta text-[0.65rem] opacity-40">
                YOUR FOCUS STAGES
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {result.focusStages.map((stage) => (
                  <li
                    key={stage}
                    className="border border-white/20 px-4 py-2 type-meta text-[0.62rem] opacity-80"
                  >
                    {getStage(stage).name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="type-meta text-[0.65rem] opacity-40">
              {result.mode === "package"
                ? "ALSO RECOMMEND"
                : "RECOMMENDED SOLUTIONS"}
            </p>
            <ul className="mt-6 flex flex-col">
              {solutions.map((solution) => (
                <li key={solution.id} className="border-t border-white/12">
                  <Link
                    href={`/solutions#${solution.id}`}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="type-label">{solution.name}</span>
                      <span className="mt-3 block max-w-[28ch] text-sm leading-relaxed opacity-55">
                        {solution.short}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 opacity-30 transition-all duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1 group-hover:opacity-80"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.15}>
        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          <Link
            href={exploreHref}
            className="group inline-flex items-center justify-center gap-3 bg-paper px-8 py-5 type-label text-ink transition-colors hover:bg-white"
          >
            EXPLORE RECOMMENDATION
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1"
            />
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-3 border border-white/25 px-8 py-5 type-label transition-colors hover:border-white/70 hover:bg-white/5"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            START AGAIN
          </button>
        </div>

        <p className="mt-10 max-w-[52ch] text-xs leading-relaxed opacity-35">
          Prototype output. This recommendation is generated in the browser from
          your selections — nothing is submitted, stored or sent anywhere.
        </p>
      </MotionReveal>
    </div>
  );
}
