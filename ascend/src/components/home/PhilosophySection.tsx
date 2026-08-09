import { Section } from "@/components/ui/Section";
import { MotionReveal, RevealLine } from "@/components/ui/MotionReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PhilosophySection() {
  return (
    <Section surface="ink" id="philosophy" size="tall">
      <MotionReveal>
        <Eyebrow index="08">PHILOSOPHY</Eyebrow>
      </MotionReveal>

      <div className="mt-20 lg:mt-28">
        <MotionReveal>
          <p className="type-display max-w-[16ch] text-[clamp(2.25rem,8.5vw,7rem)]">
            Technology is the mechanism.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <RevealLine className="my-14 w-full max-w-3xl" delay={0.2} />
        </MotionReveal>

        <MotionReveal delay={0.15}>
          <p className="type-display max-w-[16ch] text-[clamp(2.25rem,8.5vw,7rem)] opacity-45">
            The outcome is the product.
          </p>
        </MotionReveal>
      </div>

      <MotionReveal delay={0.2}>
        <p className="mt-24 max-w-[56ch] text-lg leading-relaxed opacity-60 lg:ml-auto lg:mt-32 lg:text-right">
          Businesses should not need to understand every AI model, API or
          automation platform. Ascend handles the technology. The customer
          should understand the result.
        </p>
      </MotionReveal>
    </Section>
  );
}
