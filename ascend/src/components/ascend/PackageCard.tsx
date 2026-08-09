import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AscendPackage } from "@/lib/packages";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { StageChain } from "./StageChain";

/**
 * Recommendation is expressed through inversion — the Growth card is the dark
 * one — rather than colour. No accent hues anywhere in the system.
 */
export function PackageCard({
  pkg,
  href,
  className,
  detailed = false,
}: {
  pkg: AscendPackage;
  href?: string;
  className?: string;
  /** Longer form used on /packages. */
  detailed?: boolean;
}) {
  const featured = Boolean(pkg.recommended);
  const target = href ?? `/packages#${pkg.id}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col border p-8 transition-colors duration-500 [transition-timing-function:var(--ease-ascend)] sm:p-10",
        featured
          ? "border-ink bg-ink text-paper grain"
          : "border-black/12 bg-paper text-ink hover:border-black/35",
        className,
      )}
    >
      {featured && (
        <p className="absolute -top-px left-0 flex items-center gap-2 bg-ink px-4 py-2 type-meta text-[0.6rem] text-paper ring-1 ring-white/25">
          <PeakIcon className="h-2.5 w-2.5" inner={false} />
          MOST POPULAR
        </p>
      )}

      <header className={cn(featured && "pt-8")}>
        <p className="type-label opacity-45">{pkg.name}</p>
        <h3 className="type-display mt-4 text-[clamp(2rem,3.4vw,2.75rem)]">
          {pkg.verb}
        </h3>
        <p className="mt-6 text-sm opacity-60">{pkg.purpose}</p>
      </header>

      <p
        className={cn(
          "mt-8 border-t pt-8 font-display text-[1.35rem] tracking-tight",
          featured ? "border-white/15" : "border-black/10",
        )}
      >
        {pkg.price}
      </p>

      <p className="mt-6 max-w-[42ch] text-[0.95rem] leading-relaxed opacity-70">
        {pkg.description}
      </p>

      <div className="mt-9">
        <p className="type-meta text-[0.6rem] opacity-40">ASCEND COVERAGE</p>
        <StageChain stages={pkg.stages} className="mt-4" size="small" />
      </div>

      <div className="mt-9">
        <p className="type-meta text-[0.6rem] opacity-40">INCLUDES</p>
        <ul className="mt-5 flex flex-col gap-3">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm opacity-80">
              <PeakIcon
                className="mt-1 h-2.5 w-2.5 shrink-0 opacity-45"
                inner={false}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {detailed && (
        <div className="mt-9">
          <p className="type-meta text-[0.6rem] opacity-40">WHO IT SUITS</p>
          <ul className="mt-5 flex flex-col gap-3">
            {pkg.suits.map((item) => (
              <li
                key={item}
                className={cn(
                  "border-l pl-4 text-sm leading-relaxed opacity-70",
                  featured ? "border-white/20" : "border-black/15",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-10">
        <Link
          href={target}
          className={cn(
            "flex w-full items-center justify-between gap-4 border px-6 py-4 type-label transition-colors duration-500",
            featured
              ? "border-paper bg-paper text-ink hover:bg-white"
              : "border-black/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
          )}
        >
          {pkg.cta}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
