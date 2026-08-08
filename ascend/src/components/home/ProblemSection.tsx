import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal, Stagger, StaggerItem } from "@/components/ui/MotionReveal";

const PROBLEMS = [
  {
    label: "Missed enquiries",
    note: "Calls and messages that arrive while nobody is free to answer.",
  },
  {
    label: "Slow follow-up",
    note: "Replies that land hours after the customer has moved on.",
  },
  {
    label: "Manual admin",
    note: "The same details typed into three places, every job.",
  },
  {
    label: "Disconnected systems",
    note: "Good tools that do not talk to each other.",
  },
  {
    label: "Outdated digital presence",
    note: "A website that no longer matches the standard of the work.",
  },
];

export function ProblemSection() {
  return (
    <Section surface="paper" id="problem">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="THE PROBLEM"
            index="01"
            title={["GROWTH ISN'T", "ALWAYS ABOUT", "DOING MORE."]}
          />
        </div>

        <div className="lg:col-span-7">
          <MotionReveal>
            <p className="max-w-[56ch] text-lg leading-relaxed opacity-70 sm:text-xl">
              Many businesses already generate opportunities. The problem is
              what happens after they arrive — missed calls, slow responses,
              disconnected software, poor follow-up and repetitive
              administration create friction that limits growth.
            </p>
          </MotionReveal>

          <Stagger className="mt-16">
            {PROBLEMS.map((problem, i) => (
              <StaggerItem
                key={problem.label}
                className="group border-t border-black/10 last:border-b"
              >
                <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-10">
                  <span className="type-meta w-10 shrink-0 text-[0.65rem] tabular-nums opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-display w-full max-w-[16ch] text-[1.35rem] sm:text-[1.6rem]">
                    {problem.label}
                  </span>
                  <span className="max-w-[34ch] text-sm leading-relaxed opacity-55 sm:ml-auto sm:text-right">
                    {problem.note}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <MotionReveal delay={0.1}>
            <p className="mt-16 type-display max-w-[20ch] text-[clamp(1.5rem,3.2vw,2.5rem)]">
              Ascend finds the friction and builds around it.
            </p>
          </MotionReveal>
        </div>
      </div>
    </Section>
  );
}
