"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND, IMAGES } from "@/lib/brand";
import { Container } from "@/components/ui/Section";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = ["LESS ADMIN.", "MORE GROWTH."];

export function Hero() {
  const reduced = useReducedMotion();

  const line = (i: number) => ({
    initial: reduced ? undefined : { y: "110%" },
    animate: { y: "0%" },
    transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE },
  });

  const fade = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-ink text-paper grain">
      {/* Background: architectural texture, heavily suppressed. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{ backgroundImage: `url(${IMAGES.darkFacade})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/85 to-ink" />
      </div>

      {/* Geometric peak motif. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMax meet"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full text-paper opacity-[0.07]"
      >
        <motion.path
          d="M60 590 L600 40 L1140 590"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.3, ease: EASE }}
        />
        <motion.path
          d="M330 590 L600 315 L870 590"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
        />
      </svg>

      <Container className="flex flex-1 flex-col justify-center pb-16 pt-32 sm:pt-40 lg:pb-24">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Type ---------- */}
          <div className="lg:col-span-7">
            <motion.p
              {...fade(0.05)}
              className="flex items-center gap-3 type-label opacity-55"
            >
              <PeakIcon className="h-3 w-3" inner={false} />
              {BRAND.monogram} — {BRAND.name}
            </motion.p>

            <h1 className="mt-10 type-display text-[clamp(2.5rem,6.2vw,5.5rem)]">
              {HEADLINE.map((text, i) => (
                <span key={text} className="block overflow-hidden pb-1">
                  <motion.span className="block whitespace-nowrap" {...line(i)}>
                    {text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              {...fade(0.6)}
              className="mt-10 h-px w-full max-w-md bg-paper/20"
            />

            <motion.p
              {...fade(0.7)}
              className="mt-8 max-w-[44ch] text-lg leading-relaxed opacity-70"
            >
              Websites, AI and connected business systems built around how your
              business actually operates.
            </motion.p>

            <motion.p
              {...fade(0.78)}
              className="mt-7 type-meta text-[0.65rem] opacity-40"
            >
              WEBSITES • AI • AUTOMATION • CONNECTED SYSTEMS
            </motion.p>

            <motion.div
              {...fade(0.86)}
              className="mt-11 flex flex-col gap-4 sm:flex-row"
            >
              <PrimaryButton href="/system" surface="dark">
                EXPLORE ASCEND
              </PrimaryButton>
              <SecondaryButton href="/diagnostic" surface="dark">
                FIND YOUR BOTTLENECK
              </SecondaryButton>
            </motion.div>
          </div>

          {/* ---------- Visual ---------- */}
          <motion.div
            {...fade(0.5)}
            className="relative lg:col-span-5 lg:pl-8"
          >
            <ImageBlock
              src={IMAGES.stairs}
              alt="Ascending architectural staircase in monochrome"
              ratio="tall"
              overlay="medium"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="hidden lg:block"
            />
            <ImageBlock
              src={IMAGES.stairs}
              alt=""
              ratio="wide"
              overlay="medium"
              sizes="100vw"
              className="lg:hidden"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
              <span className="font-display text-3xl font-semibold tracking-[0.28em] text-paper/90">
                {BRAND.monogram}
              </span>
              <span className="type-meta text-[0.55rem] text-paper/50">
                {BRAND.support}
              </span>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ---------- Base rule ---------- */}
      <motion.div
        {...fade(1)}
        className="relative z-10 border-t border-white/10"
      >
        <Container>
          <div className="flex items-center justify-between gap-6 py-5">
            <p className="type-meta text-[0.6rem] opacity-35">
              {BRAND.philosophy}
            </p>
            <p className="hidden type-meta text-[0.6rem] opacity-35 sm:flex sm:items-center sm:gap-3">
              SCROLL
              <PeakIcon className="h-2.5 w-2.5 rotate-180" inner={false} />
            </p>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
