import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { AscendSystemTimeline } from "@/components/ascend/AscendSystemTimeline";
import { TextLink } from "@/components/ui/Buttons";
import { Watermark } from "@/components/brand/Watermark";

export function SystemSection() {
  return (
    <Section surface="ink" id="system" size="tall">
      <Watermark className="absolute -right-10 -top-8 -z-10" />

      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="THE ASCEND SYSTEM"
            index="02"
            title={["THE ASCEND", "SYSTEM"]}
            size="large"
          />
        </div>
        <div className="lg:col-span-5 lg:pb-4">
          <MotionReveal delay={0.1}>
            <p className="max-w-[38ch] text-lg leading-relaxed opacity-65">
              A business journey designed around outcomes, not software.
            </p>
            <p className="mt-8 type-meta text-[0.6rem] opacity-35">
              EIGHT STAGES · ONE CONNECTED JOURNEY
            </p>
          </MotionReveal>
        </div>
      </div>

      <div className="mt-24 lg:mt-32">
        <AscendSystemTimeline />
      </div>

      <MotionReveal delay={0.05}>
        <div className="mt-28 border-t border-white/10 pt-14 lg:mt-36">
          <p className="type-display max-w-[24ch] text-[clamp(1.6rem,3.8vw,3rem)]">
            Your business doesn&apos;t need more software.
            <span className="block opacity-55">
              It needs the right systems working together.
            </span>
          </p>
          <div className="mt-12">
            <TextLink href="/system" surface="dark">
              EXPLORE THE FULL SYSTEM
            </TextLink>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
