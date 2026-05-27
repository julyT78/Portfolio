"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function Nav() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-hairline">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[18px] font-bold tracking-tight text-ink hover:opacity-70 transition-opacity"
          aria-label="Julie Tyrode — Accueil"
        >
          JT
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          <Link
            href="#projets"
            className="text-[15px] font-[330] text-ink hover:opacity-60 transition-opacity"
          >
            {t("projects")}
          </Link>
          <Link
            href="#about"
            className="text-[15px] font-[330] text-ink hover:opacity-60 transition-opacity"
          >
            {t("about")}
          </Link>
          <Link
            href="#contact"
            className="text-[15px] font-[330] text-ink hover:opacity-60 transition-opacity"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#playground"
            className="inline-flex items-center px-5 py-2 rounded-[50px] border border-hairline text-[15px] font-[480] text-ink hover:bg-surface transition-colors"
          >
            {t("ctaPlayground")}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-[50px] bg-ink text-canvas text-[15px] font-[480] hover:opacity-85 transition-opacity"
          >
            {t("ctaPrimary")}
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-transform ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-canvas border-t border-hairline px-6 py-6 flex flex-col gap-6">
          <Link href="#projets" onClick={() => setMenuOpen(false)} className="text-[18px] font-[330] text-ink">
            {t("projects")}
          </Link>
          <Link href="#about" onClick={() => setMenuOpen(false)} className="text-[18px] font-[330] text-ink">
            {t("about")}
          </Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)} className="text-[18px] font-[330] text-ink">
            {t("contact")}
          </Link>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="#playground"
              onClick={() => setMenuOpen(false)}
              className="flex justify-center px-5 py-3 rounded-[50px] border border-hairline text-[16px] font-[480] text-ink"
            >
              {t("ctaPlayground")}
            </Link>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex justify-center px-5 py-3 rounded-[50px] bg-ink text-canvas text-[16px] font-[480]"
            >
              {t("ctaPrimary")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
