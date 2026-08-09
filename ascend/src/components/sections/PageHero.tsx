import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { MotionReveal, RevealLine } from "@/components/ui/MotionReveal";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { Watermark } from "@/components/brand/Watermark";
import { cn } from "@/lib/utils";

/** Shared opening band for every page other than the home page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
  image,
  children,
}: {
  eyebrow: string;
  title: string | string[];
  intro?: ReactNode;
  /** Small tracked items shown along the base rule. */
  meta?: string[];
  image?: string;
  children?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper grain">
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.16] grayscale"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />
        </div>
      )}

      <Watermark className="absolute -right-8 top-16 -z-10 hidden lg:block" />

      <Container>
        <div className="pb-20 pt-40 sm:pb-24 sm:pt-48 lg:pb-28 lg:pt-56">
          <MotionReveal>
            <p className="flex items-center gap-3 type-label opacity-55">
              <PeakIcon className="h-3 w-3" inner={false} />
              {eyebrow}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <h1
              className={cn(
                "mt-10 type-display text-[clamp(2.5rem,8vw,6.5rem)]",
                lines.length > 1 && "max-w-[16ch]",
              )}
            >
              {lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <RevealLine className="mt-12 w-full max-w-lg" delay={0.2} />
          </MotionReveal>

          {intro && (
            <MotionReveal delay={0.15}>
              <div className="mt-10 max-w-[58ch] text-lg leading-relaxed opacity-70">
                {intro}
              </div>
            </MotionReveal>
          )}

          {children && <div className="mt-12">{children}</div>}
        </div>
      </Container>

      {meta && meta.length > 0 && (
        <div className="border-t border-white/10">
          <Container>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
              {meta.map((item) => (
                <li key={item} className="type-meta text-[0.6rem] opacity-35">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </section>
  );
}
