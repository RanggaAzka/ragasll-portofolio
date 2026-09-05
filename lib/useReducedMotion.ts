"use client";

import { useMediaQuery } from "@/lib/useMediaQuery";

/** Tracks the user's `prefers-reduced-motion` setting reactively. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
