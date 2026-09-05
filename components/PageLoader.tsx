"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

/**
 * A brief, skippable-by-nature loader. It always clears itself — the
 * overlay is pointer-transparent so it can never block interaction, and a
 * hard timeout guarantees it (and the body scroll lock) is removed even if
 * the decorative GSAP animation never completes.
 */
const MAX_DURATION_MS = 2000;

export function PageLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fail-safe: release the page no matter what happens to GSAP.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDone(true);
    }, MAX_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: reduced ? 0.2 : 0.9, ease: "power2.inOut" }
      ).to(rootRef.current, {
        yPercent: -100,
        duration: reduced ? 0.1 : 0.7,
        ease: "power3.inOut",
        delay: 0.05,
      });
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--background)" }}
      aria-hidden="true"
    >
      <span
        className="text-sm font-semibold uppercase tracking-[0.3em]"
        style={{ color: "var(--muted)" }}
      >
        {site.name}
      </span>
      <div
        className="h-px w-40 overflow-hidden"
        style={{ background: "var(--border)" }}
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left"
          style={{ background: "var(--foreground)", transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}