import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagnosticPreview } from "@/components/diagnostic/DiagnosticPreview";

export function DiagnosticSection() {
  return (
    <Section surface="paper" id="diagnostic-preview">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="ASCEND DIAGNOSTIC"
            index="03"
            title={["WHERE IS YOUR", "BUSINESS BEING", "HELD BACK?"]}
          />
        </div>
        <div className="flex items-end lg:col-span-6">
          <p className="max-w-[42ch] text-base leading-relaxed opacity-60">
            Most businesses can name the symptom long before they can name the
            cause. The Ascend System gives every symptom a location.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <DiagnosticPreview />
      </div>
    </Section>
  );
}
