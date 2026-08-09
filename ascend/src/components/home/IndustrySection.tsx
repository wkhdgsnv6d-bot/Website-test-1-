import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { FlowChain } from "@/components/ascend/StageChain";
import { IMAGES } from "@/lib/brand";

const JOURNEY = [
  "CALLS",
  "ENQUIRIES",
  "APPOINTMENTS",
  "QUOTES",
  "JOBS",
  "FOLLOW-UP",
  "REVIEWS",
];

export function IndustrySection() {
  return (
    <Section surface="bone" id="industry">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="EXPERIENCE"
            index="07"
            title={["BUILT AROUND HOW", "REAL BUSINESSES", "WORK."]}
          />

          <MotionReveal delay={0.1}>
            <p className="mt-10 max-w-[54ch] text-base leading-relaxed opacity-65">
              Ascend begins with trades and service businesses because the
              operational problems are clear, measurable and repeatable. The
              underlying systems, however, are designed around business problems
              that exist across industries.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <div className="mt-14 border-t border-black/10 pt-10">
              <p className="type-meta text-[0.6rem] opacity-35">
                THE OPERATIONAL JOURNEY
              </p>
              <FlowChain items={JOURNEY} className="mt-7" />
            </div>
          </MotionReveal>
        </div>

        <div className="lg:col-span-6">
          <MotionReveal delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <ImageBlock
                src={IMAGES.commercialSpace}
                alt="Modern commercial interior in monochrome"
                ratio="tall"
                overlay="light"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <ImageBlock
                src={IMAGES.brushedMetal}
                alt="Close detail of brushed metal surface"
                ratio="tall"
                overlay="light"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="sm:mt-16"
              />
            </div>
          </MotionReveal>
        </div>
      </div>
    </Section>
  );
}
