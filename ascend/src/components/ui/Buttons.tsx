import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Surface = "light" | "dark";

type BaseProps = {
  children: ReactNode;
  href?: string;
  /** Which surface the button sits on, so it inverts correctly. */
  surface?: Surface;
  className?: string;
  withArrow?: boolean;
  fullWidth?: boolean;
} & Omit<ComponentProps<"button">, "children" | "className">;

const shared =
  "group/btn inline-flex items-center justify-center gap-3 px-7 py-4 type-label " +
  "transition-all duration-500 [transition-timing-function:var(--ease-ascend)] " +
  "disabled:pointer-events-none disabled:opacity-40";

function Inner({
  children,
  withArrow,
}: {
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

function render(classes: string, props: BaseProps) {
  const { children, href, withArrow, className, fullWidth, surface, ...rest } =
    props;
  void surface;
  const merged = cn(shared, classes, fullWidth && "w-full", className);

  if (href) {
    return (
      <Link href={href} className={merged}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button type="button" className={merged} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

/** Solid, high-contrast. One per view where possible. */
export function PrimaryButton(props: BaseProps) {
  const surface = props.surface ?? "light";
  return render(
    surface === "dark"
      ? "bg-paper text-ink hover:bg-white"
      : "bg-ink text-paper hover:bg-graphite",
    { withArrow: true, ...props },
  );
}

/** Hairline outline. Sits beside the primary action. */
export function SecondaryButton(props: BaseProps) {
  const surface = props.surface ?? "light";
  return render(
    cn(
      "border",
      surface === "dark"
        ? "border-white/25 text-paper hover:border-white/70 hover:bg-white/5"
        : "border-black/20 text-ink hover:border-black/60 hover:bg-black/[0.03]",
    ),
    { withArrow: true, ...props },
  );
}

/** Text-only action used inside cards and list rows. */
export function TextLink({
  href,
  children,
  className,
  surface = "light",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  surface?: Surface;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 type-label",
        surface === "dark" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover/link:scale-x-100" />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-ascend)] group-hover/link:translate-x-1"
      />
    </Link>
  );
}
