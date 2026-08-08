import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Surface = "paper" | "bone" | "ink" | "charcoal";

const surfaceClasses: Record<Surface, string> = {
  paper: "bg-paper text-ink",
  bone: "bg-bone text-ink",
  ink: "bg-ink text-paper grain",
  charcoal: "bg-charcoal text-paper grain",
};

/** Page gutter. Every full-width band uses this for grid alignment. */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16",
        wide ? "max-w-[1680px]" : "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Full-width band with consistent vertical rhythm and a top hairline. */
export function Section({
  children,
  id,
  surface = "paper",
  className,
  contained = true,
  divide = true,
  size = "default",
}: {
  children: ReactNode;
  id?: string;
  surface?: Surface;
  className?: string;
  contained?: boolean;
  divide?: boolean;
  size?: "compact" | "default" | "tall";
}) {
  const padding = {
    compact: "py-16 sm:py-20 lg:py-24",
    default: "py-20 sm:py-28 lg:py-36",
    tall: "py-24 sm:py-36 lg:py-48",
  }[size];

  const isDark = surface === "ink" || surface === "charcoal";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        surfaceClasses[surface],
        padding,
        divide && "border-t",
        divide && (isDark ? "border-white/10" : "border-black/10"),
        id && "scroll-mt-28",
        className,
      )}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
