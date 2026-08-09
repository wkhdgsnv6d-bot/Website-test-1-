export const BRAND = {
  name: "ASCEND AUTOMATION",
  monogram: "ACND",
  tagline: "LESS ADMIN. MORE GROWTH.",
  support: "KEEP WHAT WORKS. UPGRADE WHAT DOESN'T.",
  services: "WEBSITES • AI • AUTOMATION • CONNECTED BUSINESS SYSTEMS",
  philosophy: "TECHNOLOGY IS THE MECHANISM. THE OUTCOME IS THE PRODUCT.",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "System", href: "/system" },
  { label: "Solutions", href: "/solutions" },
  { label: "Packages", href: "/packages" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/about" },
];

/**
 * Prototype imagery. Remote, monochrome-friendly architectural/workspace shots.
 * Replace each `src` with a local file in /public to take the site offline-safe.
 */
export const IMAGES = {
  heroArchitecture:
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  darkFacade:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
  workspace:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  brushedMetal:
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1600&q=80",
  glassDetail:
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
  stairs:
    "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1600&q=80",
  device:
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
  commercialSpace:
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
  stone:
    "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80",
  concrete:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
} as const;
