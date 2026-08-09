import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";
import { getStage } from "@/lib/ascend-system";
import { IMAGES } from "@/lib/brand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ascend Solutions",
  description:
    "Targeted upgrades for businesses that already have systems that work. Web Presence, Customer Response, Lead Conversion, Business Automation, Search Visibility, Connected Systems.",
};

const IMAGE_FOR_SOLUTION: Record<string, string> = {
  "web-presence": IMAGES.device,
  "customer-response": IMAGES.glassDetail,
  "lead-conversion": IMAGES.workspace,
  "business-automation": IMAGES.brushedMetal,
  "search-visibility": IMAGES.stone,
  "connected-systems": IMAGES.heroArchitecture,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="ASCEND SOLUTIONS"
        title={["KEEP WHAT WORKS.", "UPGRADE WHAT", "DOESN'T."]}
        image={IMAGES.glassDetail}
        intro="Not every business needs a new system. Most established businesses need one part of an existing journey to stop leaking — and everything else left alone."
        meta={SOLUTIONS.map((s) => s.name)}
      />

      {/* Why targeted work */}
      <Section surface="paper">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="THE PRINCIPLE"
              index="01"
              title={["REPLACEMENT IS", "NOT AN UPGRADE."]}
            />
          </div>
          <div className="lg:col-span-7">
            <MotionReveal>
              <p className="max-w-[58ch] text-lg leading-relaxed opacity-70 sm:text-xl">
                An established business has usually earned its systems. The
                booking process works. The team knows the CRM. The website
                brings in enquiries. Replacing all of it to fix one problem is
                expensive, disruptive, and rarely necessary.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <p className="mt-10 max-w-[58ch] text-base leading-relaxed opacity-60">
                Ascend Solutions are single, self-contained upgrades. Each one
                targets a specific stage of the Ascend System, integrates with
                what is already in place, and can be combined later into a
                complete system if it makes sense to.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.12}>
              <div className="mt-14 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-3">
                {[
                  { k: "KEEP", v: "What already performs" },
                  { k: "UPGRADE", v: "What measurably doesn't" },
                  { k: "CONNECT", v: "Only where it earns its place" },
                ].map((item) => (
                  <div key={item.k} className="bg-paper p-7">
                    <p className="type-label opacity-45">{item.k}</p>
                    <p className="mt-4 text-sm leading-relaxed opacity-70">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>
      </Section>

      {/* Detailed solutions */}
      {SOLUTIONS.map((solution, i) => {
        const dark = i % 2 === 1;
        return (
          <Section
            key={solution.id}
            id={solution.id}
            surface={dark ? "ink" : "bone"}
          >
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              {/* Heading column */}
              <div className={cn("lg:col-span-5", dark && "lg:order-2")}>
                <div className="lg:sticky lg:top-32">
                  <p className="type-meta text-[0.65rem] tabular-nums opacity-30">
                    {solution.index} / 06
                  </p>
                  <h2 className="type-display mt-6 text-[clamp(2rem,4.6vw,3.5rem)]">
                    {solution.name}
                  </h2>
                  <p className="mt-8 max-w-[34ch] text-lg leading-relaxed opacity-65">
                    {solution.short}
                  </p>

                  <p
                    className={cn(
                      "mt-10 border-t pt-8 font-display text-2xl tracking-tight",
                      dark ? "border-white/12" : "border-black/12",
                    )}
                  >
                    {solution.price}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="type-meta text-[0.6rem] opacity-30">
                      STAGES
                    </span>
                    {solution.stages.map((stageId) => (
                      <Link
                        key={stageId}
                        href={`/system#${stageId}`}
                        className={cn(
                          "border px-3 py-1.5 type-meta text-[0.6rem] opacity-70 transition-opacity hover:opacity-100",
                          dark ? "border-white/20" : "border-black/15",
                        )}
                      >
                        {getStage(stageId).name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/diagnostic"
                      className={cn(
                        "group inline-flex items-center gap-3 border px-7 py-4 type-label transition-colors duration-500",
                        dark
                          ? "border-white/25 hover:border-white/70 hover:bg-white/5"
                          : "border-black/20 hover:border-ink hover:bg-ink hover:text-paper",
                      )}
                    >
                      CHECK IF THIS FITS
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Detail column */}
              <div className={cn("lg:col-span-7", dark && "lg:order-1")}>
                <MotionReveal>
                  <ImageBlock
                    src={IMAGE_FOR_SOLUTION[solution.id]}
                    alt=""
                    ratio="banner"
                    overlay={dark ? "medium" : "light"}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </MotionReveal>

                <MotionReveal delay={0.06}>
                  <div className="mt-12 grid gap-10 sm:grid-cols-2">
                    <div>
                      <p className="type-meta text-[0.6rem] opacity-35">
                        THE PROBLEM
                      </p>
                      <p className="mt-5 text-[0.95rem] leading-relaxed opacity-65">
                        {solution.problem}
                      </p>
                    </div>
                    <div>
                      <p className="type-meta text-[0.6rem] opacity-35">
                        THE OUTCOME
                      </p>
                      <p className="mt-5 text-[0.95rem] leading-relaxed opacity-85">
                        {solution.outcome}
                      </p>
                    </div>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.1}>
                  <div
                    className={cn(
                      "mt-12 border-t pt-10",
                      dark ? "border-white/12" : "border-black/12",
                    )}
                  >
                    <p className="type-meta text-[0.6rem] opacity-35">
                      COMMON COMPONENTS
                    </p>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                      {solution.components.map((component) => (
                        <li
                          key={component}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <PeakIcon
                            className="mt-1 h-2.5 w-2.5 shrink-0 opacity-45"
                            inner={false}
                          />
                          <span className="opacity-75">{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionReveal>
              </div>
            </div>
          </Section>
        );
      })}

      <FinalCta
        title={["NOT SURE WHICH", "PART TO UPGRADE?"]}
        support="The diagnostic points at the stage causing the most friction, then names the solution that fits."
        primary={{ label: "START DIAGNOSTIC", href: "/diagnostic" }}
        secondary={{ label: "VIEW PACKAGES", href: "/packages" }}
      />
    </>
  );
}
