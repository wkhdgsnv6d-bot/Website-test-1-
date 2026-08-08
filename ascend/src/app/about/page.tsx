import type { Metadata } from "next";
import { BRAND, IMAGES } from "@/lib/brand";
import { ASCEND_STAGES } from "@/lib/ascend-system";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal, RevealLine, Stagger, StaggerItem } from "@/components/ui/MotionReveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { TextLink } from "@/components/ui/Buttons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Ascend Automation exists. Technology is the mechanism — the outcome is the product. Keep what works. Upgrade what doesn't.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ASCEND"
        title={["WE BUILD THE", "SYSTEM, NOT", "THE SOFTWARE."]}
        image={IMAGES.heroArchitecture}
        intro="Ascend Automation exists for businesses that are already good at what they do, and are being slowed down by everything around it."
        meta={[BRAND.monogram, BRAND.tagline, BRAND.support]}
      />

      {/* Why Ascend exists */}
      <Section surface="paper">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="ORIGIN"
              index="01"
              title={["WHY ASCEND", "EXISTS."]}
            />
          </div>
          <div className="lg:col-span-7">
            <MotionReveal>
              <p className="max-w-[58ch] text-lg leading-relaxed opacity-75 sm:text-xl">
                Most businesses do not have a technology problem. They have a
                friction problem that technology happens to be able to solve.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <p className="mt-10 max-w-[58ch] text-base leading-relaxed opacity-60">
                The pattern repeats: enquiries arrive and go unanswered, quotes
                are sent and never chased, customer information lives in three
                places, and the owner absorbs the difference by working nights.
                None of that is fixed by buying another tool. It is fixed by
                designing the journey properly and then choosing technology to
                serve it.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <p className="mt-8 max-w-[58ch] text-base leading-relaxed opacity-60">
                Ascend was built around that order of operations — journey
                first, mechanism second.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <div className="mt-14">
                <ImageBlock
                  src={IMAGES.workspace}
                  alt="Quiet modern workspace in monochrome"
                  ratio="banner"
                  overlay="light"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section surface="ink" size="tall">
        <MotionReveal>
          <p className="flex items-center gap-3 type-label opacity-50">
            <PeakIcon className="h-3 w-3" inner={false} />
            PHILOSOPHY
          </p>
        </MotionReveal>

        <div className="mt-20">
          <MotionReveal>
            <p className="type-display max-w-[15ch] text-[clamp(2.25rem,8vw,6.5rem)]">
              Technology is the mechanism.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <RevealLine className="my-12 w-full max-w-2xl" delay={0.2} />
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <p className="type-display max-w-[15ch] text-[clamp(2.25rem,8vw,6.5rem)] opacity-45">
              The outcome is the product.
            </p>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.2}>
          <p className="mt-20 max-w-[56ch] text-lg leading-relaxed opacity-60">
            Businesses should not need to understand every AI model, API or
            automation platform. Ascend handles the technology. The customer
            should understand the result — faster response, fewer manual steps,
            better visibility, more work won.
          </p>
        </MotionReveal>
      </Section>

      {/* Keep what works */}
      <Section surface="bone">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="APPROACH"
              index="02"
              title={["KEEP WHAT WORKS.", "UPGRADE WHAT", "DOESN'T."]}
            />
          </div>
          <div className="lg:col-span-7">
            <MotionReveal>
              <p className="max-w-[58ch] text-lg leading-relaxed opacity-70">
                An established business has earned its systems. Ripping them out
                to install something new is disruption sold as progress.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <p className="mt-10 max-w-[58ch] text-base leading-relaxed opacity-60">
                Ascend starts by finding what is already performing and leaving
                it alone. The work goes where the friction is — usually one or
                two stages of the journey, not all eight. That is why the
                diagnostic comes before the proposal, and why targeted solutions
                exist alongside complete systems.
              </p>
            </MotionReveal>

            <Stagger className="mt-14 grid gap-px border border-black/12 bg-black/12 sm:grid-cols-3">
              {[
                { k: "DIAGNOSE FIRST", v: "Understand before recommending." },
                { k: "CHANGE LESS", v: "Alter only what is in the way." },
                { k: "MEASURE AFTER", v: "Outcomes, not feature counts." },
              ].map((item) => (
                <StaggerItem key={item.k} className="bg-bone p-7">
                  <p className="type-label opacity-45">{item.k}</p>
                  <p className="mt-4 text-sm leading-relaxed opacity-65">
                    {item.v}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* The Ascend System */}
      <Section surface="charcoal">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="THE FRAMEWORK"
              index="03"
              title={["THE ASCEND", "SYSTEM."]}
              intro="Eight stages that describe how a customer actually moves through a business — from never having heard of it, to coming back."
            />
            <MotionReveal delay={0.15}>
              <div className="mt-12">
                <TextLink href="/system" surface="dark">
                  EXPLORE THE SYSTEM
                </TextLink>
              </div>
            </MotionReveal>
          </div>

          <div className="lg:col-span-7">
            <Stagger step={0.05}>
              {ASCEND_STAGES.map((stage) => (
                <StaggerItem
                  key={stage.id}
                  className="border-t border-white/10 last:border-b"
                >
                  <div className="flex items-baseline gap-6 py-6 sm:gap-10">
                    <span className="type-meta w-8 shrink-0 text-[0.6rem] tabular-nums opacity-30">
                      {stage.index}
                    </span>
                    <span className="type-display w-[7.5rem] shrink-0 text-[1.2rem] sm:w-40 sm:text-[1.5rem]">
                      {stage.name}
                    </span>
                    <span className="text-sm leading-relaxed opacity-55">
                      {stage.summary}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Systems should work together */}
      <Section surface="paper">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="POSITION"
              index="04"
              title={["MODERN BUSINESS", "SYSTEMS SHOULD", "WORK TOGETHER."]}
            />
            <MotionReveal delay={0.1}>
              <p className="mt-10 max-w-[52ch] text-base leading-relaxed opacity-65">
                A website that does not feed the CRM. A CRM that does not
                trigger follow-up. A booking tool nobody checks. Individually
                these are fine products; together they are a job for a person
                who should be doing something else.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.14}>
              <p className="mt-8 max-w-[52ch] text-base leading-relaxed opacity-65">
                Ascend treats the connections as the product. The value is not
                in any single tool — it is in information moving between them
                without anyone carrying it.
              </p>
            </MotionReveal>
          </div>

          <div className="lg:col-span-6">
            <MotionReveal delay={0.1}>
              <div className="grid gap-6 sm:grid-cols-2">
                <ImageBlock
                  src={IMAGES.glassDetail}
                  alt="Glass and steel structural detail"
                  ratio="tall"
                  overlay="light"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <ImageBlock
                  src={IMAGES.concrete}
                  alt="Architectural concrete surface"
                  ratio="tall"
                  overlay="light"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="sm:mt-14"
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </Section>

      {/* Starting with service businesses */}
      <Section surface="bone">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="DIRECTION"
              index="05"
              title={["STARTING WITH", "SERVICE BUSINESSES.", "DESIGNED TO", "EXPAND."]}
            />
          </div>
          <div className="lg:col-span-7">
            <MotionReveal>
              <p className="max-w-[58ch] text-lg leading-relaxed opacity-70">
                Ascend begins with trades and service businesses because the
                operational problems there are clear, measurable and repeatable.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <p className="mt-10 max-w-[58ch] text-base leading-relaxed opacity-60">
                A missed call has an obvious cost. An unfollowed quote has an
                obvious cost. That clarity makes it possible to build systems
                that can be judged on outcomes rather than impressions.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <p className="mt-8 max-w-[58ch] text-base leading-relaxed opacity-60">
                The eight stages themselves are not trade-specific. Attract,
                capture, respond, qualify, convert, manage, deliver and retain
                describe a professional services firm, a clinic or a supplier
                just as accurately — which is where the system is designed to go
                next.
              </p>
            </MotionReveal>
          </div>
        </div>
      </Section>

      {/* Brand */}
      <Section surface="ink">
        <SectionHeading
          eyebrow="IDENTITY"
          index="06"
          title={["THE MARK"]}
          intro="A monogram, a peak, and a single line of intent. The identity is deliberately quiet — the work should be the loudest thing in the room."
        />

        <Stagger className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" step={0.08}>
          <StaggerItem>
            <div className="flex aspect-square flex-col items-center justify-center gap-8 border border-white/12 bg-charcoal grain">
              <PeakIcon className="h-16 w-16 opacity-90" strokeWidth={1} />
              <p className="type-meta text-[0.6rem] opacity-35">PEAK MARK</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex aspect-square flex-col items-center justify-center gap-8 border border-white/12 bg-paper text-ink">
              <p className="font-display text-5xl font-semibold tracking-[0.24em]">
                {BRAND.monogram}
              </p>
              <p className="type-meta text-[0.6rem] opacity-40">MONOGRAM</p>
            </div>
          </StaggerItem>

          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-square overflow-hidden border border-white/12">
              <ImageBlock
                src={IMAGES.darkFacade}
                alt="Brand application mockup on an architectural facade"
                ratio="square"
                overlay="heavy"
                frame={false}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                <LogoLockup variant="stacked" href={null} />
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        <MotionReveal delay={0.1}>
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="type-meta text-[0.65rem] opacity-40">
              {BRAND.services}
            </p>
          </div>
        </MotionReveal>
      </Section>

      <FinalCta />
    </>
  );
}
