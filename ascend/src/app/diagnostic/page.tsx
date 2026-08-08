import type { Metadata } from "next";
import { IMAGES } from "@/lib/brand";
import { Container } from "@/components/ui/Section";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { Watermark } from "@/components/brand/Watermark";

export const metadata: Metadata = {
  title: "The Ascend Diagnostic",
  description:
    "Four questions that locate the friction in your customer journey and point to the right Ascend package or solution.",
};

export default function DiagnosticPage() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper grain">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] grayscale"
          style={{ backgroundImage: `url(${IMAGES.stairs})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/95 to-ink" />
      </div>

      <Watermark className="absolute -left-6 bottom-0 -z-10 hidden lg:block" />

      <Container>
        <div className="pb-28 pt-36 sm:pt-44 lg:pb-36">
          {/* Intro */}
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MotionReveal>
                <p className="flex items-center gap-3 type-label opacity-55">
                  <PeakIcon className="h-3 w-3" inner={false} />
                  ASCEND DIAGNOSTIC
                </p>
              </MotionReveal>
              <MotionReveal delay={0.05}>
                <h1 className="mt-10 type-display text-[clamp(2.5rem,7.5vw,5.5rem)]">
                  Find your
                  <span className="block opacity-50">bottleneck.</span>
                </h1>
              </MotionReveal>
            </div>
            <div className="flex items-end lg:col-span-5">
              <MotionReveal delay={0.1}>
                <p className="max-w-[40ch] text-base leading-relaxed opacity-60">
                  Four questions, about a minute. Your answers are mapped to the
                  eight stages of the Ascend System to show where the friction
                  most likely sits.
                </p>
              </MotionReveal>
            </div>
          </div>

          {/* Flow */}
          <div className="mt-20 lg:mt-28">
            <div className="max-w-4xl">
              <DiagnosticFlow />
            </div>
          </div>

          {/* Prototype note */}
          <div className="mt-20 max-w-4xl border-t border-white/10 pt-8">
            <p className="max-w-[62ch] text-xs leading-relaxed opacity-35">
              Prototype — the diagnostic runs entirely in your browser. There is
              no form submission, no data capture and no CRM connection in this
              build. In production this is where booking, contact and CRM
              hand-off would sit.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
