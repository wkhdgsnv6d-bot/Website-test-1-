import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/ui/Section";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { Watermark } from "@/components/brand/Watermark";
import { PeakIcon } from "@/components/brand/PeakIcon";

const SECONDARY_LINKS = [
  { label: "Ascend Diagnostic", href: "/diagnostic" },
  { label: "The Ascend System", href: "/system" },
  { label: "Packages", href: "/packages" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper grain">
      <Watermark className="absolute -bottom-10 -left-6 z-0 sm:-bottom-16" />

      <Container className="relative z-10">
        <div className="grid gap-16 border-b border-white/10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <LogoLockup variant="stacked" href={null} />
            <p className="mt-10 max-w-[34ch] text-sm leading-relaxed opacity-55">
              Websites, AI and connected business systems built around how a
              business actually operates.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-2 lg:justify-items-end"
          >
            <div>
              <p className="type-label opacity-40">Navigate</p>
              <ul className="mt-7 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm opacity-75 transition-opacity hover:opacity-100"
                    >
                      <PeakIcon
                        className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60"
                        inner={false}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-label opacity-40">Start</p>
              <ul className="mt-7 flex flex-col gap-4">
                {SECONDARY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-75 transition-opacity hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-[0.65rem] opacity-40">
            {BRAND.services}
          </p>
          <p className="text-xs opacity-35">
            Prototype website — contact details intentionally omitted.
          </p>
        </div>
      </Container>
    </footer>
  );
}
