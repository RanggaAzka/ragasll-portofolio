"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SmartImage } from "@/components/SmartImage";
import { site } from "@/data/site";

const MARQUEE_TEXT = `${site.heroMarquee} • `;
const GROUP_REPEAT = 3;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // Entrance reveal for the portrait — runs once, regardless of motion pref
      // (kept extremely brief so it never feels like "waiting").
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: reducedMotion ? 0 : 36, scale: reducedMotion ? 1 : 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: reducedMotion ? 0.4 : 1.1, ease: "power3.out", delay: 0.5 }
      );

      if (reducedMotion) return;

      // Continuous idle drift of the marquee track (two identical groups
      // back to back so translating by exactly -50% loops seamlessly).
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      // Extra scroll-scrubbed parallax on a *separate* wrapper so it never
      // fights with the infinite-loop tween above (different element,
      // different transform ownership).
      gsap.to(parallaxRef.current, {
        x: () => -window.innerWidth * 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Portrait drifts slightly slower than the page for a grounded,
      // layered parallax feel as the hero scrolls away.
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(indicatorRef.current, {
        y: 10,
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const marqueeGroup = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={keyPrefix === "b"}>
      {Array.from({ length: GROUP_REPEAT }).map((_, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="text-outline shrink-0 whitespace-nowrap px-4 font-extrabold uppercase leading-none sm:px-6"
          style={{ fontSize: "clamp(4.5rem, 18vw, 20rem)" }}
        >
          {MARQUEE_TEXT}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden"
    >
      <div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-0 flex items-center will-change-transform"
      >
        <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
          {marqueeGroup("a")}
          {reducedMotion ? null : marqueeGroup("b")}
        </div>
      </div>

      <div className="container-page relative z-10 flex flex-1 flex-col pt-20 sm:pt-28">
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{ color: "var(--muted)" }}
          >
            {site.availableForWork && (
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--available)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--available)" }}
                />
              </span>
            )}
            Available for work
          </span>
          <span
            className="hidden text-[11px] font-medium uppercase tracking-[0.16em] sm:inline"
            style={{ color: "var(--muted)" }}
          >
            {site.location}
          </span>
        </div>

        <div className="relative mt-auto flex flex-1 items-end justify-center">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-[54vw] max-w-[280px] opacity-0 sm:w-[56vw] sm:max-w-[340px] lg:max-w-[400px]"
          >
            <SmartImage
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 340px, 54vw"
              className="rounded-t-[2.5rem] object-cover object-top"
              containerClassName="rounded-t-[2.5rem]"
              fallbackLabel="Add profile.jpg"
            />
          </div>
        </div>

        <div className="flex items-center justify-center pb-5 pt-3 sm:pb-8">
          <span className="eyebrow">{site.role}</span>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-8 right-4 z-10 hidden flex-col items-center gap-3 sm:right-8 sm:flex"
      >
        <span className="h-10 w-px" style={{ background: "var(--border-strong)" }} />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--muted)", writingMode: "vertical-rl" }}
        >
          Scroll Down
        </span>
      </div>
    </section>
  );
}
