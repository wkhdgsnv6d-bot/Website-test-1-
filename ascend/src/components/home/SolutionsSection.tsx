import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SolutionCard } from "@/components/ascend/SolutionCard";
import { PrimaryButton } from "@/components/ui/Buttons";
import { SOLUTIONS } from "@/lib/solutions";

export function SolutionsSection() {
  return (
    <Section surface="ink" id="solutions">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="ASCEND SOLUTIONS"
            index="05"
            title={["ALREADY HAVE SYSTEMS", "THAT WORK?"]}
          />
          <MotionReveal delay={0.15}>
            <p className="mt-10 type-display text-[clamp(1.25rem,2.6vw,1.9rem)] opacity-60">
              Keep what works. Upgrade what doesn&apos;t.
            </p>
          </MotionReveal>
        </div>
        <div className="lg:col-span-5 lg:pb-3">
          <MotionReveal delay={0.1}>
            <p className="max-w-[40ch] text-base leading-relaxed opacity-60">
              Established businesses rarely need a rebuild. They need the one or
              two parts that are holding everything else back.
            </p>
          </MotionReveal>
        </div>
      </div>

      <div className="mt-20 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution, i) => (
          <MotionReveal key={solution.id} delay={i * 0.05} className="bg-ink">
            <SolutionCard solution={solution} surface="dark" className="border-0" />
          </MotionReveal>
        ))}
      </div>

      <MotionReveal delay={0.1}>
        <div className="mt-16">
          <PrimaryButton href="/solutions" surface="dark">
            EXPLORE ASCEND SOLUTIONS
          </PrimaryButton>
        </div>
      </MotionReveal>
    </Section>
  );
}
