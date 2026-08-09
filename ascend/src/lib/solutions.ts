import type { StageId } from "./ascend-system";

export type SolutionId =
  | "web-presence"
  | "customer-response"
  | "lead-conversion"
  | "business-automation"
  | "search-visibility"
  | "connected-systems";

export type AscendSolution = {
  id: SolutionId;
  index: string;
  name: string;
  price: string;
  /** One line used on cards. */
  short: string;
  problem: string;
  outcome: string;
  components: string[];
  stages: StageId[];
};

export const SOLUTIONS: AscendSolution[] = [
  {
    id: "web-presence",
    index: "01",
    name: "WEB PRESENCE",
    price: "From $1,500",
    short:
      "Improve how the business looks, communicates and captures enquiries.",
    problem:
      "The website is dated, slow, hard to update, or does not reflect the standard of the work. Visitors arrive and leave without making contact.",
    outcome:
      "A presence that communicates credibility immediately and turns more of the existing traffic into recorded enquiries.",
    components: [
      "Website design and build, or targeted redesign",
      "Mobile and performance optimisation",
      "Clear service and page structure",
      "Enquiry capture and call behaviour",
      "Analytics and event tracking",
    ],
    stages: ["attract", "capture"],
  },
  {
    id: "customer-response",
    index: "02",
    name: "CUSTOMER RESPONSE",
    price: "From $1,500 + $299/month",
    short:
      "Respond, qualify and book customers even when staff are unavailable.",
    problem:
      "Calls are missed while the team is working. Enquiries sit unanswered for hours. The first business to reply usually wins the job.",
    outcome:
      "Every enquiry is acknowledged immediately, qualified consistently, and handed to the team with the detail already gathered.",
    components: [
      "AI receptionist for calls and messages",
      "Automated first response across channels",
      "Consistent qualification questions",
      "Booking and callback capture",
      "Escalation rules to a human",
    ],
    stages: ["respond", "qualify", "capture"],
  },
  {
    id: "lead-conversion",
    index: "03",
    name: "LEAD CONVERSION",
    price: "From $1,000",
    short: "Improve follow-up, quote conversion and customer progression.",
    problem:
      "Quotes are sent and forgotten. Follow-up depends on somebody remembering. Live opportunities go quiet and are never revisited.",
    outcome:
      "Structured follow-up runs whether or not anyone remembers, and every open opportunity has a visible status.",
    components: [
      "Quote and booking follow-up sequences",
      "Pipeline stages with clear ownership",
      "Reminder and re-contact logic",
      "Conversion visibility and reporting",
    ],
    stages: ["convert", "manage"],
  },
  {
    id: "business-automation",
    index: "04",
    name: "BUSINESS AUTOMATION",
    price: "From $1,500",
    short: "Reduce repetitive administration and manual processes.",
    problem:
      "The same information is typed into several places. Scheduling, paperwork and customer updates absorb hours that should go to delivery.",
    outcome:
      "Repetitive steps run automatically, information is entered once, and administration stops scaling with job volume.",
    components: [
      "Internal workflow automation",
      "Document, quote and job admin",
      "Automated customer updates",
      "Review and re-engagement triggers",
      "Task and notification routing",
    ],
    stages: ["deliver", "retain", "manage"],
  },
  {
    id: "search-visibility",
    index: "05",
    name: "SEARCH VISIBILITY",
    price: "From $750",
    short: "Improve Google and search visibility.",
    problem:
      "The business is not appearing where customers are looking, and there is no reliable picture of where enquiries actually come from.",
    outcome:
      "Better visibility for the services and areas that matter, with measurement behind it.",
    components: [
      "Technical and on-page foundations",
      "Local and map visibility",
      "Service and location page structure",
      "Review signals",
      "Search performance reporting",
    ],
    stages: ["attract"],
  },
  {
    id: "connected-systems",
    index: "06",
    name: "CONNECTED SYSTEMS",
    price: "From $2,000",
    short: "Connect CRM, software, APIs and workflows.",
    problem:
      "Good tools are already in place — they simply do not talk to each other, so staff become the integration layer.",
    outcome:
      "Existing systems keep working, connected so information moves between them without manual re-entry.",
    components: [
      "CRM and pipeline integration",
      "API and platform connections",
      "Data mapping between systems",
      "Sync and error monitoring",
      "Reporting across connected tools",
    ],
    stages: ["manage", "deliver"],
  },
];

export function getSolution(id: SolutionId): AscendSolution {
  const solution = SOLUTIONS.find((s) => s.id === id);
  if (!solution) throw new Error(`Unknown solution: ${id}`);
  return solution;
}

export function getSolutionByName(name: string): AscendSolution | undefined {
  return SOLUTIONS.find((s) => s.name.toLowerCase() === name.toLowerCase());
}
