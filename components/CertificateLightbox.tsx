"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { Certificate } from "@/data/certificates";

type Props = {
  selectedIndex: number | null;
  certificates: Certificate[];
  onClose: () => void;
};

export function CertificateLightbox({ selectedIndex, certificates, onClose }: Props) {
  const [certIndex, setCertIndex] = useState(selectedIndex ?? 0);
  const [imgIndex, setImgIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);

  const isOpen = selectedIndex !== null;

  const advanceCert = useCallback(
    (dir: 1 | -1) => {
      setCertIndex((prev) => (prev + dir + certificates.length) % certificates.length);
      setImgIndex(0);
    },
    [certificates.length]
  );

  const advanceImage = useCallback(
    (dir: 1 | -1) => {
      const total = certificates[certIndex]?.images.length ?? 2;
      setImgIndex((prev) => (prev + dir + total) % total);
    },
    [certIndex, certificates]
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
      if (e.key === "ArrowLeft") advanceImage(-1);
      if (e.key === "ArrowRight") advanceImage(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, advanceImage]);

  // Animate image swap when imgIndex changes
  const prevImgIndex = useRef(imgIndex);
  useEffect(() => {
    if (prevImgIndex.current !== imgIndex && imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0.4, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
    prevImgIndex.current = imgIndex;
  }, [imgIndex]);

  // Touch swipe on image
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      advanceImage(dx > 0 ? -1 : 1);
    }
  }

  // Mouse drag on image
  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 80) {
      isDragging.current = false;
      advanceImage(dx > 0 ? -1 : 1);
    }
  }
  function onMouseUp() {
    isDragging.current = false;
  }

  if (!isOpen || selectedIndex === null) return null;

  const cert = certificates[certIndex];
  const totalImages = cert.images.length;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
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

      {/* Prev certificate */}
      <button
        type="button"
        onClick={() => advanceCert(-1)}
        aria-label="Previous certificate"
        data-cursor-hover
        className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border transition-colors hover:bg-white/10 sm:left-6 sm:h-12 sm:w-12"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        <ChevronLeft size={20} color="white" />
      </button>

      {/* Next certificate */}
      <button
        type="button"
        onClick={() => advanceCert(1)}
        aria-label="Next certificate"
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
        {/* Image area */}
        <div
          ref={imageWrapRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl select-none"
          style={{ cursor: "grab" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <Image
            src={cert.images[imgIndex]}
            alt={`${cert.title} ${imgIndex === 0 ? "front" : "back"}`}
            fill
            sizes="(min-width: 1024px) 800px, 90vw"
            className="object-contain pointer-events-none"
            draggable={false}
            priority
          />


        </div>

        {/* Image dots */}
        {totalImages > 1 && (
          <div className="flex items-center gap-2">
            {cert.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImgIndex(idx)}
                aria-label={`View ${idx === 0 ? "front" : "back"}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === imgIndex ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {cert.title}
          </h3>
          <p
            className="mt-1 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {cert.organization} &middot; {cert.date}
          </p>
          <p
            className="mt-3 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {imgIndex + 1} / {totalImages}
            <span className="mx-2">&middot;</span>
            {certIndex + 1} / {String(certificates.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
