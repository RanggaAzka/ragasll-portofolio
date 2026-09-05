"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { navLinks, site } from "@/data/site";
import { socials } from "@/data/socials";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  resolveHref: (href: string) => string;
};

export function MobileMenu({ open, onClose, onNavigate, resolveHref }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !rootRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        rootRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35 }
      ).fromTo(
        linksRef.current?.querySelectorAll("a") ?? [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        "-=0.15"
      );
    },
    { dependencies: [open], scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[60] flex flex-col opacity-0 lg:hidden"
      style={{
        background: "var(--background)",
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div className="container-page flex items-center justify-between pt-4 sm:pt-6">
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em]">
          {site.firstName}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-10 w-10 place-items-center rounded-full border"
          style={{ borderColor: "var(--border)" }}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="container-page flex flex-1 flex-col justify-center gap-2">
        <ul ref={linksRef} className="flex flex-col gap-1.5">
          {navLinks.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={resolveHref(link.href)}
                onClick={(e) => onNavigate(e, link.href)}
                className="block py-3 text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page flex flex-col gap-6 pb-8 sm:pb-10">
        <a
          href={resolveHref("#contact")}
          onClick={(e) => onNavigate(e, "#contact")}
          className="btn-pill btn-pill-ink w-full justify-center"
        >
          Hire Me
        </a>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer" : undefined}
              className="link-underline"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
