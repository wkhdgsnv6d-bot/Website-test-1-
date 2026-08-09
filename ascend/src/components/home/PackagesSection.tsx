import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PackageCard } from "@/components/ascend/PackageCard";
import { TextLink } from "@/components/ui/Buttons";
import { PACKAGES } from "@/lib/packages";

export function PackagesSection() {
  return (
    <Section surface="bone" id="packages">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="COMPLETE SYSTEMS"
            index="04"
            title={["THREE WAYS", "TO ASCEND."]}
          />
        </div>
        <div className="lg:col-span-6 lg:pb-4">
          <MotionReveal delay={0.1}>
            <p className="max-w-[44ch] text-base leading-relaxed opacity-65">
              Three complete systems, built as a progression. Establish the
              foundation, automate the customer journey, then connect the whole
              operation.
            </p>
            <p className="mt-8 type-meta text-[0.62rem] opacity-40">
              ESTABLISH → AUTOMATE → CONNECT
            </p>
          </MotionReveal>
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {PACKAGES.map((pkg, i) => (
          <MotionReveal key={pkg.id} delay={i * 0.08} className="flex">
            <PackageCard pkg={pkg} className="w-full" />
          </MotionReveal>
        ))}
      </div>

      <MotionReveal delay={0.1}>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-black/10 pt-10">
          <p className="max-w-[46ch] text-sm opacity-55">
            Not sure which one fits? The diagnostic takes about a minute.
          </p>
          <TextLink href="/packages">COMPARE ALL PACKAGES</TextLink>
        </div>
      </MotionReveal>
    </Section>
  );
}
