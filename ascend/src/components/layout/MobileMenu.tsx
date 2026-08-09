"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { PeakIcon } from "@/components/brand/PeakIcon";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="ascend-mobile-menu"
          className="fixed inset-0 z-100 bg-ink text-paper grain lg:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="flex h-dvh flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="flex items-center gap-3">
                <PeakIcon className="h-5 w-5" />
                <span className="font-display text-[0.95rem] font-semibold tracking-[0.32em]">
                  {BRAND.monogram}
                </span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-m-3 p-3 text-paper/70 transition-colors hover:text-paper"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center px-6"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: reduced ? 0 : 0.06 * i + 0.08,
                        ease: EASE,
                      }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-baseline justify-between py-6"
                      >
                        <span className="type-display text-[2.25rem]">
                          {link.label}
                        </span>
                        <span className="type-meta opacity-40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                      {active && <span className="sr-only">(current page)</span>}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-6 pb-10">
              <Link
                href="/diagnostic"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-3 bg-paper px-6 py-5 type-label text-ink"
              >
                START DIAGNOSTIC
                <PeakIcon className="h-3.5 w-3.5" inner={false} />
              </Link>
              <p className="mt-6 type-meta text-[0.65rem] opacity-40">
                {BRAND.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
