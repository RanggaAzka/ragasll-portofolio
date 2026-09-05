"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/useHasMounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const btn = btnRef.current;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const supportsViewTransition =
      typeof document.startViewTransition === "function";

    if (!btn || prefersReduced || !supportsViewTransition) {
      setTheme(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition!(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const isDark = resolvedTheme !== "light";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      data-cursor-hover
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300",
        "hover:bg-[var(--accent-dim)]",
        className
      )}
      style={{ borderColor: "var(--border)" }}
    >
      {mounted ? (
        isDark ? (
          <Sun size={15} strokeWidth={1.75} />
        ) : (
          <Moon size={15} strokeWidth={1.75} />
        )
      ) : (
        <span className="block h-[15px] w-[15px]" />
      )}
    </button>
  );
}
