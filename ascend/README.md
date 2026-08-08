# ASCEND AUTOMATION — prototype website

First/test version. A high-fidelity prototype for evaluating brand feel, page
structure, customer journey, and the Ascend Diagnostic as a real experience.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lucide.

## Run it

```bash
cd ascend
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run lint       # eslint
```

## Pages

| Route         | Contents                                                        |
| ------------- | --------------------------------------------------------------- |
| `/`           | Home — 11 sections, hero through final CTA                       |
| `/system`     | The Ascend System in depth, all 8 stages + coverage matrix       |
| `/solutions`  | Six targeted solutions, each with problem / outcome / components |
| `/packages`   | Essential, Growth, Partner + comparison table                    |
| `/about`      | Brand philosophy and identity                                    |
| `/diagnostic` | Interactive 4-step diagnostic + generated recommendation         |

`Approach` in the navigation is an anchor to the "How Ascend Works" section on
the home page (`/#approach`), not a separate route.

## Where things live

```
src/
  app/                     # routes + root layout + icon.svg (favicon)
  components/
    brand/                 # PeakIcon, LogoLockup, BrandDivider, Watermark
    layout/                # Navbar, MobileMenu, Footer
    ui/                    # Section, Container, SectionHeading, Buttons,
                           # ImageBlock, MotionReveal (+ Stagger, RevealLine)
    ascend/                # AscendStage, AscendSystemTimeline, StageChain,
                           # PackageCard, SolutionCard, CoverageMatrix
    diagnostic/            # DiagnosticFlow, DiagnosticStep, DiagnosticResults,
                           # DiagnosticPreview (home taster)
    sections/              # Hero, PageHero, FinalCta (shared bands)
    home/                  # one file per home-page section
  lib/
    brand.ts               # brand constants, nav links, IMAGE placeholders
    ascend-system.ts       # the 8 stages — single source of truth
    packages.ts            # 3 packages + comparison rows
    solutions.ts           # 6 solutions
    diagnostic.ts          # questions + client-side recommendation rules
```

### Editing content

Almost all copy lives in `src/lib/*.ts`. Changing a stage, package or solution
there updates every page, card, chip and matrix that references it.

Design tokens (the whole monochrome palette, type scale helpers, grain) are in
`src/app/globals.css` under `@theme`.

## Placeholders

Nothing below is production-ready — all intentionally stubbed:

- **Photography** — remote Unsplash URLs in `src/lib/brand.ts` (`IMAGES`).
  Replace each `src` with a file in `/public`. All images render through
  `ImageBlock`, which applies the monochrome treatment, so swapping the URL is
  the only change needed. `next.config.ts` sets `images.unoptimized` for the
  prototype; remove it once assets are local.
- **Contact details** — no phone, email, address or social links anywhere.
- **Diagnostic** — runs entirely in React state. No submission, no storage, no
  CRM. `buildResult()` in `src/lib/diagnostic.ts` holds the rules.
- **Pricing** — indicative only. No payment processing, proposals or contracts.
- **Booking / AI infrastructure** — not wired up. CTAs route to the diagnostic.
- **Case study** — labelled "DEMO EXAMPLE — NOT A REAL CLIENT RESULT" with no
  numerical claims.

## Accessibility notes

Semantic landmarks, skip link, visible focus rings, `role="tablist"` with
arrow/Home/End keys on the desktop system timeline, `aria-pressed` on all
selectable cards, `aria-live` on the home diagnostic summary, and a full
`prefers-reduced-motion` path (motion components render their final state).
