"use client";

import Link from "next/link";
import { useCallback, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, FolderGit2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SmartImage } from "@/components/SmartImage";
import { BackgroundLines } from "@/components/BackgroundLines";
import { Lightbox } from "@/components/Lightbox";
import { projects } from "@/data/projects";


/** Target visual state for a gallery item at a given distance from active. */
function getGalleryTarget(delta: number) {
  const abs = Math.abs(delta);
  return {
    x: `${delta * 38}%`,
    scale: Math.max(1 - abs * 0.16, 0.6),
    opacity: abs <= 2 ? Math.max(1 - abs * 0.38, 0) : 0,
  };
}

export function Work() {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const detailRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasPositionedRef = useRef(false);

  const advance = useCallback((dir: 1 | -1) => {
    setActive((prev) => (prev + dir + projects.length) % projects.length);
  }, []);

  useEffect(() => {
  if (reducedMotion || lightboxIndex !== null) return;

  const interval = setInterval(() => {
    advance(1);
  }, 3000);

  return () => clearInterval(interval);
}, [advance, reducedMotion, lightboxIndex]);

  // Reveal the header once when the section scrolls into view.
  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: reducedMotion ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  // Drive every gallery item's position/scale/opacity/z-index through GSAP.
  // On the very first run we snap instantly (gsap.set) so nothing flies in
  // from the wrong spot; every change after that animates (gsap.to).
  useGSAP(
    () => {
      const method = hasPositionedRef.current ? gsap.to : gsap.set;
      const duration = reducedMotion ? 0 : 0.7;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = getGalleryTarget(i - active);
        method(el, { ...target, duration, ease: "power3.out", overwrite: "auto" });
      });

      hasPositionedRef.current = true;
    },
    { dependencies: [active, reducedMotion] }
  );

  // Cross-fade the title/description whenever the active project changes.
  useGSAP(
    () => {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies: [active] }
  );

  const activeProject = projects[active];

  return (
    <section ref={sectionRef} id="work" className="relative section-padding">
      <BackgroundLines paused={lightboxIndex !== null} />
      <div className="container-page relative z-10">
        <div
          ref={headerRef}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow mb-3">Selected Work</p>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Work Gallery
            </h2>
            <p
              className="mt-4 max-w-md text-sm sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              A collection of systems, digital projects, and technical work
              I&apos;ve built.
            </p>
          </div>
          <Link
            href="/work"
            data-cursor-hover
            className="btn-pill btn-pill-outline self-start sm:self-auto"
          >
            View More Projects <ExternalLink size={14} />
          </Link>
        </div>

        <div className="gallery-fade-mask relative mt-14 h-[200px] sm:h-[300px] lg:h-[400px]">
          {projects.map((project, i) => {
            const abs = Math.abs(i - active);
            const isActive = i === active;
            return (
              // Outer element owns static centering only, so the inner
              // button's transform belongs entirely to GSAP (no fighting
              // over the same `transform` property).
              <div
                key={project.number}
                className="absolute left-1/2 top-1/2 w-[64%] max-w-[560px] sm:w-[46%]"
                style={{
                  transform: "translate(-50%, -50%)",
                  zIndex: 50 - abs * 10,
                }}
              >
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setLightboxIndex(i);
                  }}
                  aria-label={`Show project: ${project.title}`}
                  aria-current={isActive}
                  tabIndex={abs <= 2 ? 0 : -1}
                  data-cursor-hover
                  className="relative block aspect-[1900/910] w-full overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "var(--border)",
                    pointerEvents: "auto",
                  }}
                >
                  <SmartImage
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 560px, 60vw"
                    className="object-contain"
                    fallbackLabel={project.title}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous project"
            data-cursor-hover
            className="grid h-9 w-9 place-items-center rounded-full border transition-transform hover:-translate-x-0.5"
            style={{ borderColor: "var(--border)" }}
          >
            <ChevronLeft size={16} />
          </button>
          <span
            className="font-feature-tabular text-xs font-medium"
            style={{ color: "var(--muted)" }}
          >
            {activeProject.number} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next project"
            data-cursor-hover
            className="grid h-9 w-9 place-items-center rounded-full border transition-transform hover:translate-x-0.5"
            style={{ borderColor: "var(--border)" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div ref={detailRef} className="mx-auto mt-10 max-w-2xl text-center">
          <h3 className="text-xl font-bold sm:text-2xl">{activeProject.title}</h3>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            {activeProject.description}
          </p>
          <div className="mt-5 flex items-center justify-center gap-6">
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="link-underline text-sm font-semibold"
              >
                View Project →
              </a>
            )}
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${activeProject.title} source on GitHub`}
                data-cursor-hover
              >
                <FolderGit2 size={18} strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        key={lightboxIndex}
        selectedIndex={lightboxIndex}
        projects={projects}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}

