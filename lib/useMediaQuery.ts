"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query via useSyncExternalStore rather than the
 * classic useEffect+setState pattern, so there's no synchronous setState
 * call inside an effect body (and no flash-then-correct-value render).
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
