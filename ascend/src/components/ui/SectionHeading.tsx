import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";
import { MotionReveal, RevealLine } from "./MotionReveal";

/** Small tracked label with the peak marker. Also used standalone. */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 type-label opacity-60", className)}>
      <PeakIcon className="h-3 w-3" inner={false} />
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

/**
 * Standard section header: eyebrow, editorial title, optional intro.
 * `title` accepts an array to force line breaks in the display type.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  size = "default",
  className,
  children,
}: {
  eyebrow?: string;
  index?: string;
  title: string | string[];
  intro?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
  className?: string;
  children?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <MotionReveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </MotionReveal>
      )}

      <MotionReveal delay={0.05}>
        <h2
          className={cn(
            "type-display mt-7 max-w-[22ch] text-balance",
            size === "large"
              ? "text-[clamp(2.25rem,6.2vw,5rem)]"
              : "text-[clamp(1.9rem,4.6vw,3.5rem)]",
            align === "center" && "mx-auto",
          )}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </MotionReveal>

      <MotionReveal delay={0.1} className={cn(align === "center" && "w-full")}>
        <RevealLine className="mt-9 w-full max-w-[7rem]" delay={0.15} />
      </MotionReveal>

      {intro && (
        <MotionReveal delay={0.15}>
          <div
            className={cn(
              "mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed opacity-70 sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </div>
        </MotionReveal>
      )}

      {children}
    </div>
  );
}
