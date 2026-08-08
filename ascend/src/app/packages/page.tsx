import type { Metadata } from "next";
import { COMPARISON_ROWS, PACKAGES } from "@/lib/packages";
import { IMAGES } from "@/lib/brand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { PackageCard } from "@/components/ascend/PackageCard";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Essential (Establish), Growth (Automate) and Partner (Connect) — three complete Ascend systems, built as a progression.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="COMPLETE SYSTEMS"
        title={["THREE WAYS", "TO ASCEND."]}
        image={IMAGES.stone}
        intro="Each package is a complete system rather than a list of features. They are designed as a progression — establish the foundation, automate the customer journey, then connect the whole operation."
        meta={["ESSENTIAL → ESTABLISH", "GROWTH → AUTOMATE", "PARTNER → CONNECT"]}
      />

      {/* Progression */}
      <Section surface="charcoal" size="compact">
        <div className="grid gap-10 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <MotionReveal key={pkg.id} delay={i * 0.08}>
              <div className="flex items-start gap-6 border-t border-white/12 pt-8">
                <span className="type-meta text-[0.65rem] tabular-nums opacity-30">
                  0{i + 1}
                </span>
                <div>
                  <p className="type-display text-[1.5rem]">{pkg.verb}</p>
                  <p className="mt-4 max-w-[30ch] text-sm leading-relaxed opacity-55">
                    {pkg.purpose}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      {/* Cards */}
      <Section surface="bone">
        <SectionHeading
          eyebrow="PACKAGES"
          index="01"
          title={["WHAT EACH", "SYSTEM INCLUDES"]}
          intro="Pricing is indicative for this prototype. Every engagement begins with the diagnostic, so scope reflects the stages that actually need work."
        />

        <div className="mt-20 grid items-stretch gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <MotionReveal
              key={pkg.id}
              delay={i * 0.08}
              className="flex scroll-mt-28"
            >
              <div id={pkg.id} className="flex w-full scroll-mt-28">
                <PackageCard
                  pkg={pkg}
                  detailed
                  href="/diagnostic"
                  className="w-full"
                />
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section surface="paper">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="COMPARISON"
              index="02"
              title={["SIDE BY SIDE"]}
            />
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <MotionReveal delay={0.1}>
              <p className="max-w-[40ch] text-base leading-relaxed opacity-60">
                The difference between packages is how far along the Ascend
                System they reach — not how many features are bundled.
              </p>
            </MotionReveal>
          </div>
        </div>

        <MotionReveal delay={0.1}>
          <div className="-mx-6 mt-16 overflow-x-auto px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">
                Package comparison across inclusions
              </caption>
              <thead>
                <tr className="border-b border-black/20">
                  <th scope="col" className="w-[28%] py-6 pr-6 type-label opacity-45">
                    Inclusion
                  </th>
                  {PACKAGES.map((pkg) => (
                    <th
                      key={pkg.id}
                      scope="col"
                      className={cn(
                        "px-5 py-6 align-bottom",
                        pkg.recommended && "bg-black/[0.04]",
                      )}
                    >
                      <span className="block type-label">{pkg.name}</span>
                      <span className="mt-2 block type-meta text-[0.6rem] opacity-40">
                        {pkg.price}
                      </span>
                      {pkg.recommended && (
                        <span className="mt-3 inline-flex items-center gap-2 type-meta text-[0.55rem] opacity-60">
                          <PeakIcon className="h-2.5 w-2.5" inner={false} />
                          MOST POPULAR
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-black/10">
                    <th
                      scope="row"
                      className="py-5 pr-6 text-sm font-normal opacity-70"
                    >
                      {row.label}
                    </th>
                    {PACKAGES.map((pkg) => {
                      const value = row.values[pkg.id];
                      return (
                        <td
                          key={pkg.id}
                          className={cn(
                            "px-5 py-5 text-sm",
                            pkg.recommended && "bg-black/[0.04]",
                          )}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <>
                                <PeakIcon
                                  className="h-3.5 w-3.5 opacity-80"
                                  inner={false}
                                />
                                <span className="sr-only">Included</span>
                              </>
                            ) : (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="block h-px w-4 bg-current opacity-20"
                                />
                                <span className="sr-only">Not included</span>
                              </>
                            )
                          ) : (
                            <span className="opacity-75">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <p className="mt-12 max-w-[62ch] text-sm leading-relaxed opacity-45">
            Prototype pricing shown for evaluation only. Payment processing,
            proposals and contracts are intentionally not part of this build.
          </p>
        </MotionReveal>
      </Section>

      <FinalCta
        title={["NOT SURE WHICH", "ONE FITS?"]}
        support="Answer four questions. The diagnostic recommends a package — or tells you a targeted solution would serve you better."
        primary={{ label: "START DIAGNOSTIC", href: "/diagnostic" }}
        secondary={{ label: "VIEW SOLUTIONS", href: "/solutions" }}
      />
    </>
  );
}
