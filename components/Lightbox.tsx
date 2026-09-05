"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";

type Props = {
  selectedIndex: number | null;
  projects: Project[];
  onClose: () => void;
};

export function Lightbox({ selectedIndex, projects, onClose }: Props) {
  const [index, setIndex] = useState(selectedIndex ?? 0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isOpen = selectedIndex !== null;

  const advance = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => (prev + dir + projects.length) % projects.length);
    },
    [projects.length]
  );

  // Open / close animations + body scroll lock + keyboard
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out", delay: 0.05 }
    );

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") advance(-1);
      if (e.key === "ArrowRight") advance(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, advance]);

  // Animate image swap when index changes (after initial open)
  const prevIndex = useRef(index);
  useEffect(() => {
    if (prevIndex.current !== index && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.4, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
    prevIndex.current = index;
  }, [index]);

  // Swipe gesture handlers
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      advance(dx > 0 ? -1 : 1);
    }
  }

  if (!isOpen || selectedIndex === null) return null;

  const project = projects[index];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        data-cursor-hover
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        <X size={18} color="white" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={() => advance(-1)}
        aria-label="Previous project"
        data-cursor-hover
        className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border transition-colors hover:bg-white/10 sm:left-6 sm:h-12 sm:w-12"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        <ChevronLeft size={20} color="white" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={() => advance(1)}
        aria-label="Next project"
        data-cursor-hover
        className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border transition-colors hover:bg-white/10 sm:right-6 sm:h-12 sm:w-12"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        <ChevronRight size={20} color="white" />
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col items-center gap-4 px-14 py-16 sm:px-20"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 800px, 90vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {project.technology.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                {tech}
              </span>
            ))}
          </div>
          <p
            className="mt-3 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {project.number} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
