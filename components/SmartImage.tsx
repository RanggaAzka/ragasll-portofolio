"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onError" | "alt"> & {
  alt: string;
  fallbackLabel?: string;
  containerClassName?: string;
};

/**
 * Drop-in replacement for next/image that renders a clean, on-brand
 * placeholder instead of a broken-image icon when the file at `src`
 * doesn't exist yet. Once you add the real file at the same path, it
 * renders automatically — no component changes needed.
 */
export function SmartImage({
  fallbackLabel,
  containerClassName,
  className,
  alt,
  ...props
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed p-4 text-center",
          containerClassName
        )}
        style={{
          borderColor: "var(--border-strong)",
          background: "var(--surface)",
          color: "var(--muted)",
        }}
      >
        <ImageIcon size={20} strokeWidth={1.5} className="opacity-60" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">
          {fallbackLabel ?? "Add image"}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
