import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/MotionReveal";

export const APPROACH_STEPS = [
  { index: "01", name: "DIAGNOSE", copy: "Understand the business." },
  { index: "02", name: "MAP", copy: "Map the current customer journey." },
  { index: "03", name: "IDENTIFY", copy: "Find bottlenecks." },
  { index: "04", name: "DESIGN", copy: "Build the right solution." },
  { index: "05", name: "IMPLEMENT", copy: "Connect the technology." },
  { index: "06", name: "MEASURE", copy: "Track meaningful outcomes." },
  { index: "07", name: "OPTIMISE", copy: "Improve over time." },
];

export function ApproachSection() {
  return (
    <Section surface="paper" id="approach">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="HOW ASCEND WORKS"
              index="06"
              title={[
                "A BETTER SYSTEM",
                "STARTS WITH",
                "UNDERSTANDING",
                "THE ONE YOU",
                "ALREADY HAVE.",
              ]}
              intro="No rebuild for the sake of it. The process begins with what exists, and changes only what is measurably in the way."
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Stagger step={0.06}>
            {APPROACH_STEPS.map((step) => (
              <StaggerItem
                key={step.index}
                className="group border-t border-black/10 last:border-b"
              >
                <div className="flex items-baseline gap-6 py-8 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:translate-x-1 sm:gap-10">
                  <span className="type-meta w-8 shrink-0 text-[0.65rem] tabular-nums opacity-30">
                    {step.index}
                  </span>
                  <span className="type-display w-[8.5rem] shrink-0 text-[1.35rem] sm:w-44 sm:text-[1.75rem]">
                    {step.name}
                  </span>
                  <span className="text-sm leading-relaxed opacity-55 sm:text-base">
                    {step.copy}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
