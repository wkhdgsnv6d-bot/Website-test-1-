import type { Metadata } from "next";
import Link from "next/link";
import { ASCEND_STAGES } from "@/lib/ascend-system";
import { PACKAGES } from "@/lib/packages";
import { getSolutionByName } from "@/lib/solutions";
import { IMAGES } from "@/lib/brand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { AscendSystemTimeline } from "@/components/ascend/AscendSystemTimeline";
import { CoverageMatrix } from "@/components/ascend/CoverageMatrix";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Ascend System",
  description:
    "Eight stages — Attract, Capture, Respond, Qualify, Convert, Manage, Deliver, Retain. A business journey designed around outcomes, not software.",
};

export default function SystemPage() {
  return (
    <>
      <PageHero
        eyebrow="THE ASCEND SYSTEM"
        title={["EIGHT STAGES.", "ONE JOURNEY."]}
        image={IMAGES.concrete}
        intro="Every business already has a customer journey. Most were never designed — they accumulated. The Ascend System gives that journey a structure, so problems can be located rather than guessed at."
        meta={ASCEND_STAGES.map((s) => `${s.index} ${s.name}`)}
      />

      {/* Interactive overview */}
      <Section surface="charcoal" size="tall">
        <SectionHeading
          eyebrow="OVERVIEW"
          title={["THE JOURNEY", "AT A GLANCE"]}
          intro="Hover, tap or use the arrow keys to move through the stages."
        />
        <div className="mt-24">
          <AscendSystemTimeline />
        </div>
      </Section>

      {/* Stage by stage */}
      <Section surface="paper" size="default">
        <SectionHeading
          eyebrow="STAGE BY STAGE"
          index="01"
          title={["WHAT EACH STAGE", "ACTUALLY MEANS"]}
        />

        <div className="mt-20">
          {ASCEND_STAGES.map((stage, i) => (
            <MotionReveal key={stage.id} delay={0.02}>
              <article
                id={stage.id}
                className={cn(
                  "grid scroll-mt-28 gap-10 border-t border-black/12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20",
                  i === ASCEND_STAGES.length - 1 && "border-b",
                )}
              >
                <header className="lg:col-span-4">
                  <p className="type-meta text-[0.65rem] tabular-nums opacity-30">
                    {stage.index} / 08
                  </p>
                  <h3 className="type-display mt-6 text-[clamp(2rem,4vw,3.25rem)]">
                    {stage.name}
                  </h3>
                  <p className="mt-6 type-label opacity-50">
                    {stage.components}
                  </p>
                  <p className="mt-8 max-w-[38ch] text-[0.95rem] leading-relaxed opacity-65">
                    {stage.meaning}
                  </p>
                </header>

                <div className="grid gap-10 lg:col-span-8 lg:grid-cols-2 lg:gap-14">
                  <div>
                    <p className="type-meta text-[0.6rem] opacity-35">
                      TYPICAL PROBLEMS
                    </p>
                    <ul className="mt-6 flex flex-col gap-4">
                      {stage.problems.map((problem) => (
                        <li
                          key={problem}
                          className="border-l border-black/15 pl-4 text-sm leading-relaxed opacity-60"
                        >
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="type-meta text-[0.6rem] opacity-35">
                      WHAT ASCEND CAN IMPROVE
                    </p>
                    <ul className="mt-6 flex flex-col gap-4">
                      {stage.improvements.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                          <PeakIcon
                            className="mt-1 h-2.5 w-2.5 shrink-0 opacity-45"
                            inner={false}
                          />
                          <span className="opacity-80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/10 pt-6">
                      <span className="type-meta text-[0.6rem] opacity-30">
                        PACKAGES
                      </span>
                      {stage.packages.map((id) => {
                        const pkg = PACKAGES.find((p) => p.id === id);
                        if (!pkg) return null;
                        return (
                          <Link
                            key={id}
                            href={`/packages#${id}`}
                            className="border border-black/15 px-3 py-1.5 type-meta text-[0.6rem] opacity-70 transition-colors hover:border-ink hover:opacity-100"
                          >
                            {pkg.name}
                          </Link>
                        );
                      })}

                      <span className="type-meta text-[0.6rem] opacity-30">
                        SOLUTIONS
                      </span>
                      {stage.solutions.map((name) => {
                        const solution = getSolutionByName(name);
                        if (!solution) return null;
                        return (
                          <Link
                            key={name}
                            href={`/solutions#${solution.id}`}
                            className="type-meta text-[0.6rem] underline decoration-black/25 underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
                          >
                            {solution.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </Section>

      {/* Coverage matrix */}
      <Section surface="ink">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="COVERAGE"
              index="02"
              title={["WHICH PACKAGE", "TOUCHES WHICH STAGE"]}
            />
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <MotionReveal delay={0.1}>
              <p className="max-w-[40ch] text-base leading-relaxed opacity-60">
                Essential establishes the front of the journey. Growth automates
                the middle. Partner connects the whole thing.
              </p>
            </MotionReveal>
          </div>
        </div>

        <MotionReveal delay={0.1}>
          <div className="mt-16">
            <CoverageMatrix surface="dark" />
          </div>
        </MotionReveal>
      </Section>

      <FinalCta
        title={["WHICH STAGE IS", "HOLDING YOU BACK?"]}
        support="The Ascend Diagnostic maps your answers to the stages above in about a minute."
        primary={{ label: "START DIAGNOSTIC", href: "/diagnostic" }}
        secondary={{ label: "VIEW PACKAGES", href: "/packages" }}
      />
    </>
  );
}
