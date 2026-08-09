export type StageId =
  | "attract"
  | "capture"
  | "respond"
  | "qualify"
  | "convert"
  | "manage"
  | "deliver"
  | "retain";

export type AscendStage = {
  id: StageId;
  /** Two-digit ordinal used as a visual marker. */
  index: string;
  name: string;
  /** Short capability list shown under the stage name. */
  components: string;
  /** One-line outcome. Used on the home timeline. */
  summary: string;
  /** Deeper explanation used on /system. */
  meaning: string;
  problems: string[];
  improvements: string[];
  packages: ("essential" | "growth" | "partner")[];
  solutions: string[];
};

export const ASCEND_STAGES: AscendStage[] = [
  {
    id: "attract",
    index: "01",
    name: "ATTRACT",
    components: "Website • Google • SEO",
    summary: "Help more potential customers discover the business.",
    meaning:
      "Everything that happens before a customer contacts you. How the business is found, how credible it looks in the first five seconds, and whether the right people are arriving at all.",
    problems: [
      "The business is difficult to find on Google",
      "The website looks dated next to competitors",
      "Traffic arrives but does not match the work you want",
      "No clear picture of where enquiries come from",
    ],
    improvements: [
      "A website built to communicate credibility immediately",
      "Search and local visibility foundations",
      "Clear service structure and page hierarchy",
      "Analytics so demand can actually be measured",
    ],
    packages: ["essential", "growth", "partner"],
    solutions: ["Web Presence", "Search Visibility"],
  },
  {
    id: "capture",
    index: "02",
    name: "CAPTURE",
    components: "Calls • Forms • Chat • Enquiries",
    summary: "Make it easy for customers to take the next step.",
    meaning:
      "The moment intent becomes a record. If an enquiry only exists in a missed call log or somebody's inbox, it is not captured — it is at risk.",
    problems: [
      "Enquiries scattered across phone, email, social and forms",
      "Forms that ask too much, too early",
      "No record of who tried to make contact",
      "Out-of-hours interest disappears entirely",
    ],
    improvements: [
      "Enquiry paths designed for how customers actually make contact",
      "Every enquiry logged in one place",
      "Mobile-first contact and call behaviour",
      "Capture that continues outside business hours",
    ],
    packages: ["essential", "growth", "partner"],
    solutions: ["Web Presence", "Customer Response"],
  },
  {
    id: "respond",
    index: "03",
    name: "RESPOND",
    components: "AI Receptionist • Automated Response",
    summary: "Respond even when staff are unavailable.",
    meaning:
      "The gap between an enquiry arriving and a human acknowledging it. In most service businesses this is the single most expensive gap in the journey.",
    problems: [
      "Calls missed while the team is on site or on the tools",
      "Enquiries answered hours or days later",
      "Response quality depends on who happens to be free",
      "Weekends and evenings go unanswered",
    ],
    improvements: [
      "An AI receptionist that answers consistently, day or night",
      "Immediate acknowledgement on every channel",
      "Consistent tone and information on every response",
      "Escalation to a human when it genuinely matters",
    ],
    packages: ["growth", "partner"],
    solutions: ["Customer Response"],
  },
  {
    id: "qualify",
    index: "04",
    name: "QUALIFY",
    components: "Lead Qualification • Customer Information",
    summary:
      "Collect the right information before staff spend time on the enquiry.",
    meaning:
      "Sorting the enquiries worth your team's time from the ones that are not, and arriving at that decision with the details already gathered.",
    problems: [
      "Time spent on enquiries that were never going to convert",
      "Details gathered repeatedly across calls and emails",
      "No consistent set of questions asked up front",
      "Urgent work sitting behind low-value enquiries",
    ],
    improvements: [
      "A consistent qualification path on every enquiry",
      "Job type, location, timing and scope captured once",
      "Priority visible before anyone picks up the phone",
      "Staff time spent on genuine opportunities",
    ],
    packages: ["growth", "partner"],
    solutions: ["Customer Response", "Lead Conversion"],
  },
  {
    id: "convert",
    index: "05",
    name: "CONVERT",
    components: "Bookings • Quotes • Follow-Up",
    summary: "Move opportunities toward a sale.",
    meaning:
      "Turning a qualified enquiry into a booked job or an accepted quote — and making sure nothing stalls silently in between.",
    problems: [
      "Quotes sent and never followed up",
      "Bookings arranged through long back-and-forth",
      "No visibility of which quotes are still live",
      "Follow-up depends on somebody remembering",
    ],
    improvements: [
      "Booking and quote requests captured cleanly",
      "Structured follow-up that runs on its own",
      "Clear status on every open opportunity",
      "Fewer opportunities lost to silence",
    ],
    packages: ["growth", "partner"],
    solutions: ["Lead Conversion"],
  },
  {
    id: "manage",
    index: "06",
    name: "MANAGE",
    components: "CRM • Pipeline • Customer Data",
    summary: "Keep customer information organised and visible.",
    meaning:
      "One reliable view of customers and work in progress, so decisions are made from the system rather than from memory.",
    problems: [
      "Customer detail spread across notebooks, phones and inboxes",
      "No shared view of what stage each job is at",
      "Handover between staff loses context",
      "Reporting means rebuilding the picture by hand",
    ],
    improvements: [
      "A CRM structured around your actual pipeline",
      "Every enquiry, quote and job in one place",
      "Shared visibility across the team",
      "Records that survive staff changes",
    ],
    packages: ["growth", "partner"],
    solutions: ["Connected Systems", "Business Automation"],
  },
  {
    id: "deliver",
    index: "07",
    name: "DELIVER",
    components: "Internal Workflows • Administration • Automation",
    summary: "Reduce repetitive work behind the scenes.",
    meaning:
      "The administration that surrounds delivering the work — scheduling, paperwork, updates, invoicing prompts and internal handovers.",
    problems: [
      "The same information re-entered into several systems",
      "Manual scheduling and job paperwork",
      "Customer updates written from scratch every time",
      "Admin absorbing evenings and weekends",
    ],
    improvements: [
      "Repetitive steps handled automatically",
      "Information entered once and reused",
      "Consistent customer updates through delivery",
      "Less administration per job completed",
    ],
    packages: ["partner"],
    solutions: ["Business Automation", "Connected Systems"],
  },
  {
    id: "retain",
    index: "08",
    name: "RETAIN",
    components: "Reviews • Re-engagement • Customer Follow-Up",
    summary: "Continue the customer relationship after the sale.",
    meaning:
      "What happens after the job is done. Reviews, repeat work and referrals are usually the cheapest growth available, and usually the most neglected.",
    problems: [
      "Reviews only requested when somebody remembers",
      "Past customers never contacted again",
      "Maintenance and repeat work left to chance",
      "Referral potential unused",
    ],
    improvements: [
      "Review requests triggered by completed work",
      "Structured re-engagement of past customers",
      "Service and maintenance reminders",
      "A customer base that keeps producing value",
    ],
    packages: ["partner"],
    solutions: ["Business Automation", "Search Visibility"],
  },
];

export const STAGE_ORDER = ASCEND_STAGES.map((s) => s.id);

export function getStage(id: StageId): AscendStage {
  const stage = ASCEND_STAGES.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown Ascend stage: ${id}`);
  return stage;
}

export function stageNames(ids: StageId[]): string[] {
  return ids.map((id) => getStage(id).name);
}
