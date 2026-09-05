"use client";

import { useRef, type ElementType } from "react";
import { Code, ExternalLink, FolderGit2, Layers, Users, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BackgroundLines } from "@/components/BackgroundLines";
import { milestones, type Milestone } from "@/data/milestones";

const ICONS: Record<Milestone["icon"], LucideIcon> = {
  rocket: Code,
  folder: FolderGit2,
  layers: Layers,
  users: Users,
};

export function Milestones() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal='milestones-header']",
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
        "[data-reveal='milestone-row']",
        { opacity: 0, y: reducedMotion ? 0 : 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="milestones" className="relative section-padding">
      <BackgroundLines />
      <div className="container-page relative z-10">
        <div data-reveal="milestones-header">
          <p className="eyebrow mb-3">Journey</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Milestones
          </h2>
          <p
            className="mt-4 max-w-md text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            Key moments and turning points that shaped my journey as a web
            developer.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          {milestones.map((item, i) => {
            const Icon = ICONS[item.icon];
            const hasLink = item.href && item.href !== "#";
            const Wrapper: ElementType = hasLink ? "a" : "div";
            return (
              <Wrapper
                key={item.title}
                data-reveal="milestone-row"
                data-cursor-hover={hasLink ? true : undefined}
                {...(hasLink
                  ? { href: item.href, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-4 border-t py-6 first:border-t-0 sm:py-7"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                  <span
                    className="font-feature-tabular hidden text-sm sm:inline"
                    style={{ color: "var(--muted-soft)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-bold sm:text-lg">
                      {item.title}
                    </p>
                    <p
                      className="flex flex-wrap items-center gap-2 text-xs sm:text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      <span>
                        {item.description} — {item.date}
                      </span>
                      {item.placeholder && (
                        <span
                          className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                          style={{ borderColor: "var(--border-strong)" }}
                        >
                          Add details
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {hasLink && (
                  <ExternalLink
                    size={16}
                    className="shrink-0 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
