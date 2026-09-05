"use client";

import { useRef, useState } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SmartImage } from "@/components/SmartImage";
import { BackgroundLines } from "@/components/BackgroundLines";
import { CertificateLightbox } from "@/components/CertificateLightbox";
import { certificates } from "@/data/certificates";
import { cn } from "@/lib/utils";

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal='certificates-header']",
        { opacity: 0, y: reducedMotion ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      const rows = gsap.utils.toArray<HTMLElement>("[data-reveal='certificate-row']");
      rows.forEach((row, i) => {
        const reversed = i % 2 === 1;
        const img = row.querySelector("[data-certificate-image]");
        const text = row.querySelector("[data-certificate-text]");

        gsap.fromTo(
          img,
          { opacity: 0, x: reducedMotion ? 0 : reversed ? 44 : -44 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );

        gsap.fromTo(
          text,
          { opacity: 0, y: reducedMotion ? 0 : 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: reducedMotion ? 0 : 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="certificates" className="relative section-padding">
      <BackgroundLines />
      <div className="container-page relative z-10">
        <div data-reveal="certificates-header">
          <p className="eyebrow mb-3">Growth &amp; Experience</p>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Certificates
          </h2>
          <p
            className="mt-4 max-w-md text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            A collection of certificates earned through trainings,
            workshops, and hackathons.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {certificates.map((certificate, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={certificate.title}
                data-reveal="certificate-row"
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  data-certificate-image
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-2xl border",
                    reversed ? "lg:order-2" : "lg:order-1"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  <SmartImage
                    src={certificate.images[0]}
                    alt={certificate.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    fallbackLabel={certificate.title}
                  />

                  {/* Clickable overlay */}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    data-cursor-hover
                    className="absolute inset-0 z-10 grid place-items-center bg-black/0 transition-colors hover:bg-black/30"
                    aria-label={`View ${certificate.title} certificate`}
                  >
                    <span className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:opacity-100"
                      style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.4)" }}
                    >
                      <ImageIcon size={12} />
                      View Certificate
                    </span>
                  </button>

                  {/* Image count badge */}
                  <div
                    className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium text-white"
                    style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)" }}
                  >
                    <ImageIcon size={10} />
                    2
                  </div>
                </div>

                <div
                  data-certificate-text
                  className={reversed ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {certificate.title}
                    </h3>
                    <span
                      className="font-feature-tabular text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--muted)" }}
                    >
                      {certificate.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium" style={{ color: "var(--muted)" }}>
                    {certificate.subtitle}
                  </p>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "var(--muted-soft)" }}
                  >
                    {certificate.organization}
                  </p>
                  <p
                    className="mt-5 text-sm leading-relaxed sm:text-base"
                    style={{ color: "var(--muted)" }}
                  >
                    {certificate.description}
                  </p>
                  {certificate.certificateHref && (
                    <a
                      href={certificate.certificateHref}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="link-underline mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Certificate of Completion <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CertificateLightbox
        key={lightboxIndex}
        selectedIndex={lightboxIndex}
        certificates={certificates}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  );
}
