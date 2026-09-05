"use client";

import { useMemo, useRef } from "react";
import { ExternalLink, Mail, type LucideIcon } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BackgroundLines } from "@/components/BackgroundLines";
import { site } from "@/data/site";
import { socials, type SocialLink } from "@/data/socials";

const ICONS: Record<string, LucideIcon> = {
  email: Mail,
  github: FaGithub as unknown as LucideIcon,
  linkedin: FaLinkedinIn as unknown as LucideIcon,
  instagram: FaInstagram as unknown as LucideIcon,
  tiktok: FaTiktok as unknown as LucideIcon,
};

const HEADLINE_WORDS = ["LET'S", "WORK", "TOGETHER"];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const emailLink = useMemo(
    () => socials.find((s: SocialLink) => s.id === "email"),
    []
  );

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-contact-line]",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: reducedMotion ? 0.4 : 1,
          stagger: reducedMotion ? 0 : 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        "[data-reveal='contact-side']",
        { opacity: 0, y: reducedMotion ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="contact" className="relative section-padding pb-28 sm:pb-36">
      <BackgroundLines />
      <div className="container-page relative z-10">
        <p className="eyebrow mb-6">Get In Touch</p>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <h2 className="flex flex-col text-[clamp(2.75rem,13vw,8.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              {HEADLINE_WORDS.map((word) => (
                <span key={word} className="overflow-hidden py-1">
                  <span data-contact-line className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-reveal="contact-side"
              className="mt-10 max-w-md text-lg font-bold sm:text-xl"
            >
              Looking for the next problem worth solving?
            </p>
            <p
              data-reveal="contact-side"
              className="mt-3 max-w-md text-sm sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              I&apos;m open to opportunities where I can contribute to
              software development, web development, and digital
              experiences.
            </p>

            <div data-reveal="contact-side" className="mt-9 flex flex-wrap gap-4">
              <a
                href={site.resumeHref}
                data-cursor-hover
                className="btn-pill btn-pill-solid"
              >
                Download Resume →
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {socials.map((s, i) => {
              const Icon = ICONS[s.id] ?? Mail;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer" : undefined}
                  data-reveal="contact-side"
                  data-cursor-hover
                  className="surface-card group flex items-center justify-between gap-4 p-5 hover:bg-[var(--card-hover)]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow mb-1">{s.label}</p>
                      <p className="truncate text-sm font-semibold sm:text-base">
                        {s.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className="font-feature-tabular text-xs"
                      style={{ color: "var(--muted-soft)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.external && (
                      <ExternalLink
                        size={14}
                        className="opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    )}
                  </div>
                </a>
              );
            })}

            <a
              href={emailLink?.href ?? "#contact"}
              data-reveal="contact-side"
              data-cursor-hover
              className="btn-pill btn-pill-outline mt-2 w-full justify-center py-4"
            >
              Send Me a Message →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
