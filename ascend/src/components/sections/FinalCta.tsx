import { Container } from "@/components/ui/Section";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { Watermark } from "@/components/brand/Watermark";
import { PeakIcon } from "@/components/brand/PeakIcon";

/** Closing band. Present at the foot of every page. */
export function FinalCta({
  title = ["WHERE COULD YOUR", "BUSINESS ASCEND?"],
  support = "Find the friction. Keep what works. Upgrade what doesn't.",
  primary = { label: "START DIAGNOSTIC", href: "/diagnostic" },
  secondary = { label: "VIEW SOLUTIONS", href: "/solutions" },
}: {
  title?: string[];
  support?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-ink text-paper grain">
      <Watermark className="absolute -bottom-16 left-1/2 -z-10 -translate-x-1/2" />

      <Container>
        <div className="flex flex-col items-center py-28 text-center sm:py-36 lg:py-44">
          <MotionReveal>
            <PeakIcon className="h-8 w-8 opacity-50" />
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <h2 className="mt-12 type-display text-[clamp(2.25rem,7.5vw,6rem)]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="mt-10 max-w-[44ch] text-lg leading-relaxed opacity-65">
              {support}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href={primary.href} surface="dark">
                {primary.label}
              </PrimaryButton>
              <SecondaryButton href={secondary.href} surface="dark">
                {secondary.label}
              </SecondaryButton>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
