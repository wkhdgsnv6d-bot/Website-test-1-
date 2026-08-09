import Image from "next/image";
import { cn } from "@/lib/utils";

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  banner: "aspect-[21/9]",
  panel: "aspect-[3/2]",
} as const;

/**
 * Every photograph on the site goes through here.
 *
 * PROTOTYPE NOTE — images are remote placeholders defined in `src/lib/brand.ts`.
 * Replace the `src` with a file in /public to swap any image; the treatment
 * (monochrome, hairline frame, grain) stays consistent automatically.
 */
export function ImageBlock({
  src,
  alt,
  ratio = "landscape",
  className,
  priority = false,
  overlay = "medium",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  frame = true,
  children,
}: {
  src: string;
  alt: string;
  ratio?: keyof typeof ratios;
  className?: string;
  priority?: boolean;
  overlay?: "none" | "light" | "medium" | "heavy";
  sizes?: string;
  frame?: boolean;
  children?: React.ReactNode;
}) {
  const overlayClass = {
    none: "",
    light: "bg-ink/20",
    medium: "bg-ink/40",
    heavy: "bg-ink/65",
  }[overlay];

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden bg-charcoal grain",
        ratios[ratio],
        frame && "ring-1 ring-inset ring-white/10",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover grayscale contrast-[1.05] brightness-[0.95]"
      />
      {overlay !== "none" && (
        <span aria-hidden="true" className={cn("absolute inset-0", overlayClass)} />
      )}
      {children}
    </figure>
  );
}
