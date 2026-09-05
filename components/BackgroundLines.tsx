import { wavePaths } from "@/lib/generated/wavePaths";

const LINE_CONFIG = [
  { duration: "48s", opacity: 0.5, direction: "normal" as const, strokeWidth: 1 },
  { duration: "64s", opacity: 0.35, direction: "reverse" as const, strokeWidth: 1 },
  { duration: "80s", opacity: 0.28, direction: "normal" as const, strokeWidth: 1 },
];

/**
 * Fine, low-contrast horizontal line-art that drifts slowly across a
 * section. Purely decorative (aria-hidden) and driven by CSS animation
 * so it costs nothing on the main thread.
 *
 * Pass `paused` to freeze the drift (e.g. while a lightbox is open).
 * Frozen automatically under prefers-reduced-motion via the global stylesheet.
 */
export function BackgroundLines({
  className,
  paused = false,
}: {
  className?: string;
  paused?: boolean;
}) {
  return (
    <div className={`bg-line-field ${className ?? ""}`} aria-hidden="true">
      {wavePaths.map((d, i) => {
        const config = LINE_CONFIG[i % LINE_CONFIG.length];
        return (
          <svg
            key={i}
            viewBox="0 0 2880 240"
            preserveAspectRatio="none"
            style={{
              top: `${18 + i * 28}%`,
              opacity: config.opacity,
              animation: paused
                ? "none"
                : `bg-line-scroll ${config.duration} linear infinite ${config.direction}`,
            }}
          >
            <path
              d={d}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth={config.strokeWidth}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={d}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth={config.strokeWidth}
              vectorEffect="non-scaling-stroke"
              transform="translate(1440, 0)"
            />
          </svg>
        );
      })}
    </div>
  );
}
