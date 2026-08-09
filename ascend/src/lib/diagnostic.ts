import type { StageId } from "./ascend-system";
import type { PackageId } from "./packages";
import type { SolutionId } from "./solutions";

/* ==========================================================================
   Ascend Diagnostic — prototype logic
   Entirely client-side. No backend, no submission, no storage.
   The rules below are intentionally simple and readable so they are easy to
   tune while the diagnostic is being evaluated.
   ========================================================================== */

export type StepId = "systems" | "friction" | "improve" | "maturity";

export type Option = {
  value: string;
  label: string;
  /** Ascend stages this answer points at. */
  stages?: StageId[];
  /** Clears every other selection in the step when chosen. */
  exclusive?: boolean;
};

export type Step = {
  id: StepId;
  index: string;
  question: string;
  helper: string;
  options: Option[];
  /** Single-select steps behave like radio groups. */
  single?: boolean;
};

export const STEPS: Step[] = [
  {
    id: "systems",
    index: "01",
    question: "WHAT DOES YOUR BUSINESS CURRENTLY USE?",
    helper: "Select everything already in place. There are no wrong answers.",
    options: [
      { value: "website", label: "Website" },
      { value: "crm", label: "CRM" },
      { value: "booking", label: "Booking system" },
      { value: "ai-receptionist", label: "AI receptionist" },
      { value: "seo", label: "SEO" },
      { value: "automations", label: "Automations" },
      { value: "none", label: "None / not sure", exclusive: true },
    ],
  },
  {
    id: "friction",
    index: "02",
    question: "WHERE DO YOU FEEL THE MOST FRICTION?",
    helper: "Select the points in the journey that cost you the most.",
    options: [
      { value: "getting-found", label: "Getting found", stages: ["attract"] },
      {
        value: "capturing-enquiries",
        label: "Capturing enquiries",
        stages: ["capture"],
      },
      {
        value: "responding-quickly",
        label: "Responding quickly",
        stages: ["respond"],
      },
      {
        value: "qualifying-leads",
        label: "Qualifying leads",
        stages: ["qualify"],
      },
      { value: "following-up", label: "Following up", stages: ["convert"] },
      {
        value: "managing-information",
        label: "Managing customer information",
        stages: ["manage"],
      },
      {
        value: "repetitive-admin",
        label: "Repetitive admin",
        stages: ["deliver"],
      },
      {
        value: "retention",
        label: "Customer retention",
        stages: ["retain"],
      },
    ],
  },
  {
    id: "improve",
    index: "03",
    question: "WHAT WOULD YOU MOST LIKE TO IMPROVE?",
    helper: "The outcome matters more than the technology behind it.",
    options: [
      {
        value: "more-leads",
        label: "More leads",
        stages: ["attract", "capture"],
      },
      {
        value: "faster-response",
        label: "Faster customer response",
        stages: ["respond"],
      },
      { value: "less-admin", label: "Less admin", stages: ["deliver"] },
      {
        value: "better-conversion",
        label: "Better conversion",
        stages: ["convert", "qualify"],
      },
      {
        value: "better-experience",
        label: "Better customer experience",
        stages: ["respond", "retain"],
      },
      {
        value: "connected-systems",
        label: "Better connected systems",
        stages: ["manage", "deliver"],
      },
    ],
  },
  {
    id: "maturity",
    index: "04",
    question: "HOW ESTABLISHED ARE YOUR CURRENT SYSTEMS?",
    helper: "This decides how much we keep and how much we build.",
    single: true,
    options: [
      { value: "scratch", label: "Starting from scratch" },
      { value: "some", label: "Some systems exist" },
      { value: "most", label: "Most systems work but need improvement" },
      {
        value: "established",
        label: "Established business with multiple systems",
      },
    ],
  },
];

export type Answers = Record<StepId, string[]>;

export const EMPTY_ANSWERS: Answers = {
  systems: [],
  friction: [],
  improve: [],
  maturity: [],
};

export type DiagnosticResult = {
  /** A full package, or a targeted set of Ascend Solutions. */
  mode: "package" | "solutions";
  packageId?: PackageId;
  why: string;
  focusStages: StageId[];
  solutions: SolutionId[];
};

const STAGE_PHRASE: Record<StageId, string> = {
  attract: "how the business is found",
  capture: "how enquiries are captured",
  respond: "how quickly enquiries are answered",
  qualify: "how enquiries are qualified before staff time is spent",
  convert: "how quotes and bookings are followed up",
  manage: "how customer information is organised",
  deliver: "how much administration is still done by hand",
  retain: "how customers are re-engaged after the job",
};

const STAGE_SOLUTIONS: Record<StageId, SolutionId[]> = {
  attract: ["search-visibility", "web-presence"],
  capture: ["web-presence", "customer-response"],
  respond: ["customer-response", "lead-conversion"],
  qualify: ["customer-response", "lead-conversion"],
  convert: ["lead-conversion", "customer-response"],
  manage: ["connected-systems", "lead-conversion"],
  deliver: ["business-automation", "connected-systems"],
  retain: ["business-automation", "web-presence"],
};

const FRONT_STAGES: StageId[] = ["attract", "capture"];
const RESPONSE_STAGES: StageId[] = ["respond", "qualify", "convert"];
const OPERATIONS_STAGES: StageId[] = ["manage", "deliver", "retain"];

function scoreStages(answers: Answers): Map<StageId, number> {
  const scores = new Map<StageId, number>();
  for (const step of STEPS) {
    const selected = answers[step.id] ?? [];
    // Friction is weighted above aspiration: it describes what is happening
    // now rather than what the business would like.
    const weight = step.id === "friction" ? 2 : 1;
    for (const value of selected) {
      const option = step.options.find((o) => o.value === value);
      for (const stage of option?.stages ?? []) {
        scores.set(stage, (scores.get(stage) ?? 0) + weight);
      }
    }
  }
  return scores;
}

function topStages(scores: Map<StageId, number>, limit: number): StageId[] {
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([stage]) => stage);
}

function joinPhrases(items: string[]): string {
  if (items.length === 0) return "the customer journey end to end";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function pickSolutions(stages: StageId[], limit = 2): SolutionId[] {
  const picked: SolutionId[] = [];
  for (const stage of stages) {
    for (const solution of STAGE_SOLUTIONS[stage]) {
      if (!picked.includes(solution)) picked.push(solution);
      if (picked.length >= limit) return picked;
    }
  }
  return picked.length ? picked : ["web-presence"];
}

export function buildResult(answers: Answers): DiagnosticResult {
  const scores = scoreStages(answers);
  const focusStages = topStages(scores, 3);
  const maturity = answers.maturity[0] ?? "some";
  const systems = answers.systems;
  const frictionCount = answers.friction.length;

  const hasSystem = (id: string) => systems.includes(id);
  const toolCount = systems.filter((s) => s !== "none").length;
  const hits = (group: StageId[]) => group.some((s) => (scores.get(s) ?? 0) > 0);

  const phrase = joinPhrases(focusStages.slice(0, 2).map((s) => STAGE_PHRASE[s]));

  // 1 — A single, focused problem in an otherwise working business is a
  //     targeted solution, not a full package.
  if (
    frictionCount <= 1 &&
    (maturity === "most" || maturity === "established")
  ) {
    return {
      mode: "solutions",
      why: `Your systems are largely working, and your answers point to a single constraint: ${phrase}. That is a targeted upgrade rather than a rebuild — keep what works, and change only the part that is holding things back.`,
      focusStages,
      solutions: pickSolutions(focusStages, 2),
    };
  }

  // 2 — Established business, multiple systems, friction in operations.
  if (
    (maturity === "established" || toolCount >= 3) &&
    (hits(OPERATIONS_STAGES) || hasSystem("crm"))
  ) {
    return {
      mode: "package",
      packageId: "partner",
      why: `You already run several systems, and your answers point to ${phrase}. The opportunity is connection rather than replacement — front-of-house and back-of-house working as one system, measured and improved over time.`,
      focusStages,
      solutions: pickSolutions(focusStages, 2),
    };
  }

  // 3 — Friction after the enquiry arrives: response, qualification, follow-up.
  if (hits(RESPONSE_STAGES)) {
    return {
      mode: "package",
      packageId: "growth",
      why: `Your answers suggest the biggest opportunity sits after the enquiry arrives — specifically ${phrase}. Opportunities are reaching the business; the constraint is what happens next.`,
      focusStages,
      solutions: pickSolutions(focusStages, 2),
    };
  }

  // 4 — Nothing established yet, or friction confined to being found and
  //     capturing enquiries.
  if (maturity === "scratch" || !hasSystem("website") || hits(FRONT_STAGES)) {
    return {
      mode: "package",
      packageId: "essential",
      why: `Your answers point to the front of the journey — ${phrase}. The foundation comes first: a credible presence that captures enquiries properly, before anything is automated on top of it.`,
      focusStages,
      solutions: pickSolutions(focusStages, 2),
    };
  }

  // 5 — Fallback.
  return {
    mode: "package",
    packageId: "growth",
    why: `Based on your answers, the strongest starting point is the acquisition and response layer — ${phrase}.`,
    focusStages,
    solutions: pickSolutions(focusStages, 2),
  };
}

/** Home-page preview cards: each symptom maps to one Ascend stage. */
export const SYMPTOMS: { label: string; stage: StageId }[] = [
  { label: "Customers can't find us", stage: "attract" },
  { label: "We miss enquiries", stage: "capture" },
  { label: "We respond too slowly", stage: "respond" },
  { label: "We get poor-quality leads", stage: "qualify" },
  { label: "Quotes are not followed up", stage: "convert" },
  { label: "Our CRM is disorganised", stage: "manage" },
  { label: "Too much admin is manual", stage: "deliver" },
  { label: "We don't retain or re-engage customers", stage: "retain" },
];
