"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const CAROUSEL_ITEMS = [
  {
    id: "design-thinking",
    label: "Atelier Design Thinking",
    context: "UX Research · 2024",
    image: "/images/carousel-numspotBG.png",
  },
  {
    id: "desk",
    label: "Environnement de création",
    context: "Product Design · 2024",
    image: "/images/carousel-desk.png",
  },
  {
    id: "edition-ybc",
    label: "Direction éditoriale YBC",
    context: "Direction artistique · 2025",
    image: "/images/carousel-editionYBC.png",
  },
  {
    id: "sharecare",
    label: "UX Design Sharecare",
    context: "IA & Santé · 2025",
    image: "/images/carousel-sharecare.gif",
  },
] as const;

export function PresentationHero() {
  const t = useTranslations("presentationHero");
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = CAROUSEL_ITEMS.length;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4200);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleDot = (i: number) => {
    setCurrent(i);
    resetTimer();
  };

  return (
    <section className="relative overflow-hidden bg-canvas min-h-[600px] md:min-h-[700px]">

      {/* ── Background images (desktop only) ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        {CAROUSEL_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.8s ease",
              willChange: "opacity",
            }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={i === 0}
              unoptimized={item.image.endsWith(".gif")}
            />
          </div>
        ))}
      </div>

      {/* ── Gradient overlay : blanc → transparent de gauche à droite ──────── */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to right, oklch(100% 0 0 / 1) 30%, oklch(100% 0 0 / 0.85) 50%, oklch(100% 0 0 / 0) 78%)",
        }}
        aria-hidden="true"
      />

      {/* ── Légende slide active (bas droit) ─────────────────────────────── */}
      <div
        className="absolute bottom-8 right-16 z-[3] hidden md:block"
        aria-hidden="true"
      >
        {CAROUSEL_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="absolute bottom-0 right-0 text-right"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.12em] mb-[3px]"
              style={{ color: "oklch(100% 0 0 / 0.6)" }}
            >
              {item.context}
            </p>
            <p
              className="text-[13px] font-[520] tracking-[-0.01em] leading-[1.3]"
              style={{
                color: "oklch(100% 0 0 / 0.95)",
                textShadow: "0 1px 8px oklch(0 0 0 / 0.4)",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Dots navigation verticale (bord droit) ─────────────────────── */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-[4] hidden md:flex flex-col gap-[10px]"
        role="tablist"
        aria-label="Navigation carousel"
      >
        {CAROUSEL_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={item.label}
            className="rounded-full transition-all duration-350 cursor-pointer"
            style={{
              width: i === current ? "8px" : "6px",
              height: i === current ? "8px" : "6px",
              backgroundColor:
                i === current
                  ? "oklch(14% 0 0 / 0.75)"
                  : "oklch(14% 0 0 / 0.22)",
              transition:
                "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ── Contenu texte ────────────────────────────────────────────────── */}
      <div className="relative z-[2] mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="max-w-[520px] pt-20 pb-24 md:pt-28 md:pb-32">

          {/* Eyebrow */}
          <p className="font-eyebrow text-ink/40 mb-8">
            {t("eyebrow")}
          </p>

          {/* Headline */}
          <h1 className="font-display-xl text-ink max-w-[14ch] mb-8">
            {t("headline")}
          </h1>

          {/* Tagline */}
          <p className="text-[15px] font-[330] text-ink/60 leading-[1.55] tracking-[-0.015em] max-w-[46ch] mb-12">
            {t("tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#projets"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[50px] bg-ink text-canvas text-[15px] font-[480] tracking-[-0.01em] hover:opacity-85 transition-opacity"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="#playground"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[50px] border border-hairline text-ink text-[15px] font-[480] tracking-[-0.01em] hover:bg-surface transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
