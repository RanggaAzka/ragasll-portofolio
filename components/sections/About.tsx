"use client";

import { useRef } from "react";
import { BadgeCheck, Compass, GraduationCap, Hammer } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SmartImage } from "@/components/SmartImage";
import { BackgroundLines } from "@/components/BackgroundLines";
import { currentlyList, site, stats, traits } from "@/data/site";

const CURRENT_ICONS = [Hammer, Compass, GraduationCap];

const TRAIT_LAYOUT = [
  { top: "2%", left: "6%", rotate: -9 },
  { top: "16%", left: "40%", rotate: 6 },
  { top: "34%", left: "4%", rotate: -4 },
  { top: "48%", left: "36%", rotate: 9 },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const traitsWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // Typewriter-style reveal of the headline via a clip-path wipe,
      // with a blinking cursor that stays put at the trailing edge.
      gsap.fromTo(
        headingRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: reducedMotion ? 0.4 : 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        "[data-reveal='about-body']",
        { opacity: 0, y: reducedMotion ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      if (reducedMotion) return;

      // Floating trait cards: staggered entrance, then a gentle
      // continuous idle drift so the stack always feels a little alive.
      const cards = gsap.utils.toArray<HTMLElement>("[data-trait-card]");

      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.85, rotate: 0 },
        {
          opacity: 1,
          scale: 1,
          rotate: (i) => TRAIT_LAYOUT[i].rotate,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: traitsWrapRef.current, start: "top 85%" },
        }
      );

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: "+=12",
          duration: 2.4 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { rotate: 0, scale: 1.06, zIndex: 50, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotate: TRAIT_LAYOUT[i].rotate,
            scale: 1,
            zIndex: 10 + i * 10,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="about" className="relative section-padding">
      <BackgroundLines />
      <div className="container-page relative z-10">
        <p className="eyebrow mb-3">About Me</p>
        <h2
          ref={headingRef}
          className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {site.tagline}
          <span className="typewriter-cursor" aria-hidden="true" />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <div data-reveal="about-body" className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border sm:h-20 sm:w-20"
                style={{ borderColor: "var(--border)" }}
              >
                <SmartImage
                  src={site.profileImage}
                  alt={site.name}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                  fallbackLabel="Photo"
                />
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold sm:text-lg">
                  {site.name}
                  <BadgeCheck size={16} style={{ color: "#3b82f6" }} />
                </p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {site.role} · {site.location}
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-3 gap-4 border-y py-6"
              style={{ borderColor: "var(--border)" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="eyebrow mb-2 whitespace-nowrap">{s.label}</p>
                  <p className="font-feature-tabular text-2xl font-extrabold sm:text-3xl">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              {currentlyList.map((item, i) => {
                const Icon = CURRENT_ICONS[i % CURRENT_ICONS.length];
                return (
                  <div key={item.title} className="flex items-center gap-3">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div data-reveal="about-body" className="flex flex-col justify-between gap-10">
            <div>
              <p
                className="max-w-2xl text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--muted)" }}
              >
                {site.bio}
              </p>
              <p className="mt-4 text-sm sm:text-base">
                Want to know more about my experience?{" "}
                <a
                  href={site.resumeHref}
                  data-cursor-hover
                  className="link-underline font-semibold"
                >
                  Download my resume
                </a>
                .
              </p>
            </div>

            <div
              ref={traitsWrapRef}
              className="relative mx-auto h-64 w-full max-w-md sm:h-72 lg:mx-0 lg:h-80"
            >
              {traits.map((trait, i) => {
                const layout = TRAIT_LAYOUT[i];
                return (
                  <div
                    key={trait}
                    data-trait-card
                    data-cursor-hover
                    className="surface-card absolute flex aspect-[4/3] w-40 flex-col justify-between p-5 shadow-xl sm:w-44"
                    style={{
                      top: layout.top,
                      left: layout.left,
                      zIndex: 10 + i * 10,
                      transform: `rotate(${layout.rotate}deg)`,
                    }}
                  >
                    <span className="eyebrow">Trait</span>
                    <span className="text-lg font-bold sm:text-xl">{trait}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
