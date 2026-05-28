"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

/** ── Données carousel ──────────────────────────────────────────────────── */
const CAROUSEL_ITEMS = [
  {
    id: "design-thinking",
    label: "Atelier Design Thinking",
    context: "UX Research · 2024",
    image: "/images/carousel-design-thinking.webp",
  },
  {
    id: "desk",
    label: "Environnement de création",
    context: "Product Design · 2024",
    image: "/images/carousel-desk.webp",
  },
  {
    id: "edition-ybc",
    label: "Direction éditoriale YBC",
    context: "Direction artistique · 2025",
    image: "/images/carousel-editionYBC.jpg",
  },
  {
    id: "sharecare",
    label: "UX Design Sharecare",
    context: "IA & Santé · 2025",
    image: "/images/carousel-sharecare.gif",
  },
] as const;

/** ── Styles par position ────────────────────────────────────────────────── */
const POSITION_STYLES: Record<
  "front" | "middle" | "back" | "hidden",
  React.CSSProperties
> = {
  front: {
    opacity: 1,
    transform: "translate(0px, 0px) scale(1) rotate(-0.5deg)",
    zIndex: 30,
  },
  middle: {
    opacity: 0.52,
    transform: "translate(22px, 18px) scale(0.955) rotate(1.5deg)",
    zIndex: 20,
  },
  back: {
    opacity: 0.22,
    transform: "translate(42px, 34px) scale(0.91) rotate(3deg)",
    zIndex: 10,
  },
  hidden: {
    opacity: 0,
    transform: "translate(-48px, -8px) scale(0.85) rotate(-3deg)",
    zIndex: 5,
    pointerEvents: "none",
  },
};

function getPosition(
  index: number,
  current: number,
  total: number
): "front" | "middle" | "back" | "hidden" {
  if (index === current) return "front";
  if (index === (current + 1) % total) return "middle";
  if (index === (current + 2) % total) return "back";
  return "hidden";
}

/** ── Composant ─────────────────────────────────────────────────────────── */
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
    <section className="relative overflow-hidden bg-canvas min-h-[580px] md:min-h-[640px]">
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 h-full">

        {/* ── Portrait SVG fantôme ─────────────────────────────────────────── */}
        <div
          className="absolute right-0 top-0 h-full pointer-events-none hidden md:block z-[1]"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 260 580"
            className="h-full w-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="130" cy="88" rx="62" ry="70" />
            <rect x="108" y="154" width="44" height="38" rx="4" />
            <path d="M0 195 Q8 178 52 172 L130 172 L208 172 Q252 178 260 195 L260 580 L0 580 Z" />
          </svg>
        </div>

        {/* ── Carousel stack (droite) ──────────────────────────────────────── */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[52%] hidden md:flex items-center justify-center z-[2]"
          aria-hidden="true"
        >
          {/* Zone des cartes empilées */}
          <div className="relative w-[300px] h-[390px]">
            {CAROUSEL_ITEMS.map((item, i) => {
              const pos = getPosition(i, current, count);
              const style = POSITION_STYLES[pos];
              return (
                <div
                  key={item.id}
                  className="absolute inset-0 rounded-[14px] overflow-hidden bg-surface"
                  style={{
                    ...style,
                    boxShadow:
                      pos === "front"
                        ? "0 24px 64px oklch(0 0 0 / 0.18), 0 4px 16px oklch(0 0 0 / 0.08)"
                        : "0 12px 32px oklch(0 0 0 / 0.10)",
                    transition:
                      "opacity 0.72s cubic-bezier(0.4, 0, 0.2, 1), transform 0.72s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="300px"
                    className="object-cover"
                    priority={i === 0}
                    unoptimized={item.image.endsWith(".gif")}
                  />

                  {/* Légende sur la carte front uniquement */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-4"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0 0 0 / 0.62) 0%, oklch(0 0 0 / 0) 100%)",
                      opacity: pos === "front" ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.1em] mb-1"
                      style={{ color: "oklch(100% 0 0 / 0.55)" }}
                    >
                      {item.context}
                    </p>
                    <p
                      className="text-[13px] font-[520] tracking-[-0.01em] leading-[1.3]"
                      style={{ color: "oklch(100% 0 0 / 0.95)" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots navigation */}
          <div
            className="absolute bottom-10 right-10 flex gap-[7px] items-center"
            aria-hidden="false"
          >
            {CAROUSEL_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
                className="h-[5px] rounded-full transition-all duration-400 cursor-pointer"
                style={{
                  width: i === current ? "18px" : "5px",
                  backgroundColor:
                    i === current
                      ? "oklch(14% 0 0 / 0.75)"
                      : "oklch(14% 0 0 / 0.20)",
                  transition: "width 0.35s ease, background-color 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Contenu texte ────────────────────────────────────────────────── */}
        <div className="relative z-[2] max-w-[520px] pt-20 pb-24 md:pt-28 md:pb-32">

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
