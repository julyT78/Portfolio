import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

/**
 * Cards flottantes — reprend les projets réels avec leurs couleurs
 * Positions relatives au conteneur droit (52% de la largeur)
 */
const FLOAT_CARDS: {
  id: string;
  title: string;
  client: string;
  image: string;
  bg: string;
  pos: CSSProperties;
  opacity: number;
  rotate: string;
}[] = [
  {
    id: "pulse",
    title: "Dashboard PULSE",
    client: "Softeam · 2026",
    image: "/images/book/2.png",
    bg: "bg-coral",
    pos: { top: 60, right: 140 },
    opacity: 1,
    rotate: "0deg",
  },
  {
    id: "labo-ia",
    title: "Laboratoire IA Design",
    client: "Softeam · 2025",
    image: "/images/book/4.png",
    bg: "bg-lilac",
    pos: { top: 40, right: -10 },
    opacity: 0.55,
    rotate: "2.5deg",
  },
  {
    id: "chantier-ia",
    title: "Chantier IA transverse",
    client: "Softeam · 2025",
    image: "/images/book/6.png",
    bg: "bg-mint",
    pos: { bottom: 70, right: 60 },
    opacity: 0.35,
    rotate: "-1.5deg",
  },
  {
    id: "power-bi",
    title: "Outil Power BI",
    client: "La Poste · 2026",
    image: "/images/book/8.png",
    bg: "bg-cream",
    pos: { bottom: 50, right: 270 },
    opacity: 0.7,
    rotate: "0deg",
  },
];

export function PresentationHero() {
  const t = useTranslations("presentationHero");

  return (
    <section className="relative overflow-hidden bg-canvas min-h-[580px] md:min-h-[640px]">
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 h-full">

        {/* ── Portrait SVG fantôme ───────────────────────────────────────────── */}
        {/* Silhouette géométrique — fond atmosphérique, non intrusif */}
        <div
          className="absolute right-0 top-0 h-full pointer-events-none hidden md:block z-[1]"
          style={{ opacity: 0.07 }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 260 580"
            className="h-full w-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tête */}
            <ellipse cx="130" cy="88" rx="62" ry="70" />
            {/* Cou */}
            <rect x="108" y="154" width="44" height="38" rx="4" />
            {/* Épaules + buste (trapèze) */}
            <path d="M0 195 Q8 178 52 172 L130 172 L208 172 Q252 178 260 195 L260 580 L0 580 Z" />
          </svg>
        </div>

        {/* ── Cards flottantes ──────────────────────────────────────────────── */}
        {/* Conteneur absolu sur la moitié droite — masqué mobile */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[52%] hidden md:block z-[2]"
          aria-hidden="true"
        >
          {FLOAT_CARDS.map(({ id, title, client, image, bg, pos, opacity, rotate }) => (
            <div
              key={id}
              className={`absolute w-[204px] ${bg} rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,.12)] select-none`}
              style={{
                ...pos,
                opacity,
                transform: `rotate(${rotate})`,
              }}
            >
              {/* Image aperçu projet */}
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="204px"
                  className="object-cover"
                />
              </div>
              {/* Légende */}
              <div className="px-3.5 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink/45 mb-1">
                  {client}
                </p>
                <p className="text-[12px] font-[540] text-ink leading-[1.3] tracking-[-0.01em]">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Contenu texte ─────────────────────────────────────────────────── */}
        {/* z-index 2 · max-width 520px · full-width mobile */}
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
