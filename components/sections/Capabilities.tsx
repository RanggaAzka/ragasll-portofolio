"use client";

import { useRef } from "react";
import { Code2, Database, LayoutTemplate, Puzzle, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BackgroundLines } from "@/components/BackgroundLines";
import { capabilities, technologies, type Capability } from "@/data/capabilities";

const ICONS: Record<Capability["icon"], LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  database: Database,
  puzzle: Puzzle,
};

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal='capabilities-header']",
        { opacity: 0, y: reducedMotion ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        "[data-reveal='tech-chip']",
        { opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        "[data-reveal='capability-card']",
        { opacity: 0, y: reducedMotion ? 0 : 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative section-padding"
    >
      <BackgroundLines />
      <div className="container-page relative z-10 grid gap-14 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
        <div data-reveal="capabilities-header">
          <p className="eyebrow mb-3">My Capabilities</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            What I Can Do
          </h2>
          <p
            className="mt-4 max-w-sm text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            I combine technical, problem-solving, and digital skills to build
            reliable systems, manage data, and support efficient digital
            workflows.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                data-reveal="tech-chip"
                className="surface-card flex items-center justify-center px-3 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-[var(--card-hover)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {capabilities.map((cap) => {
            const Icon = ICONS[cap.icon];
            return (
              <div
                key={cap.number}
                data-reveal="capability-card"
                className="surface-card flex flex-col gap-5 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="font-feature-tabular text-3xl font-extrabold"
                    style={{ color: "var(--muted-soft)" }}
                  >
                    {cap.number}
                  </span>
                  <span
                    className="max-w-[9rem] text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.12em]"
                    style={{ color: "var(--muted)" }}
                  >
                    {cap.tagline}
                  </span>
                </div>

                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <Icon size={20} strokeWidth={1.6} />
                </span>

                <div>
                  <h3 className="text-lg font-bold">{cap.title}</h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {cap.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wide"
                      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
