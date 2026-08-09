import type { StageId } from "./ascend-system";

export type PackageId = "essential" | "growth" | "partner";

export type AscendPackage = {
  id: PackageId;
  name: string;
  /** ESTABLISH / AUTOMATE / CONNECT */
  verb: string;
  price: string;
  priceNote?: string;
  purpose: string;
  description: string;
  stages: StageId[];
  includes: string[];
  suits: string[];
  recommended?: boolean;
  cta: string;
};

export const PACKAGES: AscendPackage[] = [
  {
    id: "essential",
    name: "ESSENTIAL",
    verb: "ESTABLISH.",
    price: "$1,500 + $149/month",
    purpose: "Digital foundation.",
    description:
      "A credible, fast, well-structured digital presence that captures enquiries properly — the base every other stage is built on.",
    stages: ["attract", "capture"],
    includes: [
      "Professional website",
      "Up to 5 pages",
      "Mobile optimisation",
      "Enquiry capture",
      "Basic SEO foundation",
      "Analytics",
      "Hosting",
      "Security",
      "Backups",
      "Maintenance",
    ],
    suits: [
      "Businesses with no website, or a website that no longer represents them",
      "Operators who currently rely on word of mouth alone",
      "Anyone who needs a credible foundation before automating anything",
    ],
    cta: "EXPLORE ESSENTIAL",
  },
  {
    id: "growth",
    name: "GROWTH",
    verb: "AUTOMATE.",
    price: "From $4,500 + $799/month",
    purpose: "Customer acquisition and response system.",
    description:
      "Everything in the foundation, plus the response, qualification and conversion layer that stops opportunities being lost between arriving and being answered.",
    stages: ["attract", "capture", "respond", "qualify", "convert", "manage"],
    includes: [
      "Growth-focused website",
      "Advanced enquiry capture",
      "AI receptionist",
      "Lead qualification",
      "Booking/quote capture",
      "CRM pipeline",
      "Automated follow-up",
      "Hosting",
      "Maintenance",
      "Ongoing support",
    ],
    suits: [
      "Businesses already generating enquiries they cannot answer fast enough",
      "Teams losing quotes to slow or inconsistent follow-up",
      "Operators on site all day with nobody covering the phone",
    ],
    recommended: true,
    cta: "EXPLORE GROWTH",
  },
  {
    id: "partner",
    name: "PARTNER",
    verb: "CONNECT.",
    price: "From $8,000 + $1,500/month",
    purpose: "Connected customer and operations system.",
    description:
      "The full journey. Front-of-house and back-of-house connected, monitored and improved over time as one operating system rather than a set of tools.",
    stages: [
      "attract",
      "capture",
      "respond",
      "qualify",
      "convert",
      "manage",
      "deliver",
      "retain",
    ],
    includes: [
      "Advanced website or optimisation",
      "Professional AI receptionist",
      "CRM",
      "Lead pipeline",
      "Quote follow-up",
      "Review automation",
      "Internal automation",
      "Reporting",
      "Monitoring",
      "Priority support",
      "Monthly optimisation",
    ],
    suits: [
      "Established businesses running several systems that do not talk to each other",
      "Teams where administration is the constraint on taking more work",
      "Owners who want the whole journey measured, not just the website",
    ],
    cta: "EXPLORE PARTNER",
  },
];

export function getPackage(id: PackageId): AscendPackage {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) throw new Error(`Unknown package: ${id}`);
  return pkg;
}

/** Rows for the /packages comparison table. */
export const COMPARISON_ROWS: {
  label: string;
  values: Record<PackageId, string | boolean>;
}[] = [
  {
    label: "Progression",
    values: { essential: "Establish", growth: "Automate", partner: "Connect" },
  },
  {
    label: "Ascend stages covered",
    values: { essential: "2 of 8", growth: "6 of 8", partner: "All 8" },
  },
  {
    label: "Website",
    values: {
      essential: "Professional, up to 5 pages",
      growth: "Growth-focused",
      partner: "Advanced or optimisation",
    },
  },
  {
    label: "Enquiry capture",
    values: { essential: "Standard", growth: "Advanced", partner: "Advanced" },
  },
  {
    label: "AI receptionist",
    values: { essential: false, growth: true, partner: "Professional" },
  },
  {
    label: "Lead qualification",
    values: { essential: false, growth: true, partner: true },
  },
  {
    label: "Booking / quote capture",
    values: { essential: false, growth: true, partner: true },
  },
  {
    label: "CRM pipeline",
    values: { essential: false, growth: true, partner: true },
  },
  {
    label: "Automated follow-up",
    values: { essential: false, growth: true, partner: true },
  },
  {
    label: "Review automation",
    values: { essential: false, growth: false, partner: true },
  },
  {
    label: "Internal automation",
    values: { essential: false, growth: false, partner: true },
  },
  {
    label: "Reporting",
    values: { essential: "Analytics", growth: "Analytics", partner: "Full reporting" },
  },
  {
    label: "Monitoring",
    values: { essential: false, growth: false, partner: true },
  },
  {
    label: "Support",
    values: { essential: "Maintenance", growth: "Ongoing", partner: "Priority" },
  },
  {
    label: "Monthly optimisation",
    values: { essential: false, growth: false, partner: true },
  },
];
