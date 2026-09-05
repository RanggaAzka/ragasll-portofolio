"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A minimal two-part custom cursor (a tight dot + a trailing ring) that
 * expands over interactive elements. Only mounts on fine-pointer desktop
 * devices, and stays fully out of the way otherwise so touch users never
 * lose the native cursor/tap behavior.
 *
 * All transform writes (position AND scale) go through GSAP so they
 * composite through its internal transform cache instead of fighting
 * with React-driven inline styles.
 */
export function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = isFinePointer && !reducedMotion;

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, [data-cursor-hover]';

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(interactiveSelector);
      setHovering(Boolean(el));
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    gsap.to(ringRef.current, {
      scale: hovering ? 1.7 : 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [hovering, enabled]);

  useEffect(() => {
    if (!enabled) return;
    gsap.to([dotRef.current, ringRef.current], {
      opacity: visible ? 1 : 0,
      duration: 0.25,
    });
  }, [visible, enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-4 -mt-4 h-8 w-8 rounded-full border opacity-0"
        style={{ borderColor: "var(--foreground)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full opacity-0"
        style={{ background: "var(--foreground)" }}
      />
    </div>
  );
}
