import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { PeakIcon } from "./PeakIcon";

type Variant = "header" | "stacked" | "footer";

/**
 * Brand hierarchy: ACND → ASCEND AUTOMATION → LESS ADMIN. MORE GROWTH.
 * `header` is the compact lockup, `stacked` the full hero/brand hierarchy.
 */
export function LogoLockup({
  variant = "header",
  href = "/",
  className,
}: {
  variant?: Variant;
  /** Pass null to render as plain markup rather than a link. */
  href?: string | null;
  className?: string;
}) {
  const content =
    variant === "stacked" ? <Stacked /> : <Inline variant={variant} />;

  if (href === null) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      href={href}
      aria-label={`${BRAND.name} — home`}
      className={cn("group inline-block", className)}
    >
      {content}
    </Link>
  );
}

function Inline({ variant }: { variant: Variant }) {
  return (
    <span className="flex items-center gap-3">
      <PeakIcon
        className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover:-translate-y-0.5",
          variant === "footer" && "h-6 w-6",
        )}
      />
      <span className="flex items-baseline gap-3">
        <span className="font-display text-[0.95rem] font-semibold tracking-[0.32em] leading-none">
          {BRAND.monogram}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-3 w-px bg-current opacity-25 sm:block"
        />
        <span className="hidden type-label opacity-70 sm:block">
          {BRAND.name}
        </span>
      </span>
    </span>
  );
}

function Stacked() {
  return (
    <span className="flex flex-col gap-4">
      <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-none tracking-[0.24em]">
        {BRAND.monogram}
      </span>
      <span className="type-label opacity-70">{BRAND.name}</span>
      <span className="type-meta opacity-45">{BRAND.tagline}</span>
    </span>
  );
}
