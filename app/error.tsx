"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unexpected app error:", error);
  }, [error]);

  return (
    <div
      className="grid min-h-screen place-items-center px-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Something went wrong</p>
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          The page couldn&apos;t load.
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Please try reloading the page. If the problem persists, come back
          later.
        </p>
        <button type="button" onClick={reset} className="btn-pill btn-pill-ink mt-8">
          Try Again
        </button>
      </div>
    </div>
  );
}