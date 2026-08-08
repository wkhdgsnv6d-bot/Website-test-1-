import clsx, { type ClassValue } from "clsx";

/** Tiny class joiner. Kept dependency-light on purpose. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
