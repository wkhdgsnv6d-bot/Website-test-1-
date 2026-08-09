import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionReveal, Stagger, StaggerItem } from "@/components/ui/MotionReveal";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { cn } from "@/lib/utils";

const COLUMNS = [
  {
    label: "BEFORE",
    index: "A",
    items: ["Missed enquiries", "Manual quote follow-up", "Slow response"],
    tone: "muted" as const,
  },
  {
    label: "ASCEND SYSTEM",
    index: "B",
    items: ["AI receptionist", "CRM", "Automated follow-up"],
    tone: "dark" as const,
  },
  {
    label: "AFTER",
    index: "C",
    items: ["Faster response", "Fewer manual steps", "Better visibility"],
    tone: "light" as const,
  },
];

export function CaseStudySection() {
  return (
    <Section surface="paper" id="example">
      <div className="grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="ILLUSTRATIVE EXAMPLE"
            index="09"
            title={["WHAT CHANGING", "ONE STAGE", "LOOKS LIKE."]}
          />
        </div>
        <div className="lg:col-span-5 lg:pb-3">
          <MotionReveal delay={0.1}>
            <p className="inline-flex items-center gap-3 border border-black/25 px-4 py-3 type-meta text-[0.6rem]">
              <PeakIcon className="h-3 w-3" inner={false} />
              DEMO EXAMPLE — NOT A REAL CLIENT RESULT
            </p>
          </MotionReveal>
        </div>
      </div>

      <Stagger className="mt-20 grid gap-6 lg:grid-cols-3 lg:gap-8" step={0.1}>
        {COLUMNS.map((column, i) => (
          <StaggerItem key={column.label} className="relative">
            <article
              className={cn(
                "flex h-full flex-col border p-8 sm:p-10",
                column.tone === "dark" &&
                  "border-ink bg-ink text-paper grain",
                column.tone === "muted" && "border-black/12 bg-bone text-ink",
                column.tone === "light" && "border-black/12 bg-paper text-ink",
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="type-label opacity-45">{column.label}</p>
                <p className="type-meta text-[0.6rem] opacity-25">
                  {column.index}
                </p>
              </div>

              <ul className="mt-12 flex flex-1 flex-col gap-5">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-start gap-4 border-t pt-5 text-[1.05rem] first:border-t-0 first:pt-0",
                      column.tone === "dark" ? "border-white/12" : "border-black/10",
                    )}
                  >
                    <PeakIcon
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 opacity-40"
                      inner={false}
                    />
                    <span
                      className={cn(
                        column.tone === "muted" ? "opacity-55" : "opacity-90",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {i < COLUMNS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-4 top-1/2 hidden h-px w-8 bg-black/20 lg:block"
              />
            )}
          </StaggerItem>
        ))}
      </Stagger>

      <MotionReveal delay={0.1}>
        <p className="mt-14 max-w-[64ch] text-sm leading-relaxed opacity-45">
          Presented as a structural illustration only. No numerical outcomes,
          timeframes or client names are claimed — real results depend entirely
          on the business, the market and the stage being addressed.
        </p>
      </MotionReveal>
    </Section>
  );
}
