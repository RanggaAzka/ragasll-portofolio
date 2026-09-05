"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during the server render and the first client render,
 * then true after hydration — without ever calling setState inside an
 * effect. Useful for deferring UI that depends on client-only state
 * (like next-themes' resolved theme) until it's safe to show.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
