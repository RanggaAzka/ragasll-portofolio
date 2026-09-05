"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollTo("#top", 0)}
      aria-label="Back to top"
      data-cursor-hover
      className={cn(
        "fixed bottom-5 right-4 z-30 grid h-11 w-11 place-items-center rounded-full border shadow-lg backdrop-blur-xl transition-all duration-500 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      style={{
        background: "color-mix(in srgb, var(--card) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <ArrowUp size={17} strokeWidth={2} />
    </button>
  );
}
