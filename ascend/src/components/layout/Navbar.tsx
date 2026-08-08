"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky header. Every page opens on a dark band, so the bar starts
 * transparent with light type and resolves to a solid light bar on scroll.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:bg-ink focus:px-4 focus:py-3 focus:type-label focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-90 transition-all duration-500 [transition-timing-function:var(--ease-ascend)]",
          scrolled
            ? "border-b border-black/10 bg-paper/90 text-ink backdrop-blur-md"
            : "border-b border-white/0 text-paper",
        )}
      >
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
          <LogoLockup variant="header" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href.startsWith("/") &&
                  !link.href.includes("#") &&
                  pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative block py-2 type-label"
                    >
                      <span className={cn(active ? "opacity-100" : "opacity-65 transition-opacity duration-300 group-hover:opacity-100")}>
                        {link.label}
                      </span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 [transition-timing-function:var(--ease-ascend)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/diagnostic"
              className={cn(
                "hidden items-center gap-3 px-6 py-3.5 type-label transition-colors duration-500 lg:inline-flex",
                scrolled
                  ? "bg-ink text-paper hover:bg-graphite"
                  : "border border-white/30 text-paper hover:border-white/80 hover:bg-white/5",
              )}
            >
              START DIAGNOSTIC
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="ascend-mobile-menu"
              className="-mr-3 flex items-center gap-2 p-3 lg:hidden"
            >
              <span className="type-label">MENU</span>
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
