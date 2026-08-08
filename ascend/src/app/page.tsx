import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SystemSection } from "@/components/home/SystemSection";
import { DiagnosticSection } from "@/components/home/DiagnosticSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { IndustrySection } from "@/components/home/IndustrySection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SystemSection />
      <DiagnosticSection />
      <PackagesSection />
      <SolutionsSection />
      <ApproachSection />
      <IndustrySection />
      <PhilosophySection />
      <CaseStudySection />
      <FinalCta />
    </>
  );
}
