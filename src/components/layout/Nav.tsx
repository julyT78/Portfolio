"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export function Nav() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-canvas transition-shadow duration-200 ${
        scrolled ? "border-b border-hairline" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity"
          aria-label="Julie Tyrode — Accueil"
        >
          <svg
            width="28"
            height="36"
            viewBox="0 0 73 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M35.5 58L7.62939e-06 58C7.22364e-06 67.2826 3.74016 76.185 10.3977 82.7487C17.0552 89.3125 26.0848 93 35.5 93L35.5 58Z" fill="currentColor"/>
            <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#B6F500"/>
            <g clipPath="url(#clip0_323_1068)">
              <path d="M66.0649 60C62.2347 60 59.1298 63.1213 59.1298 66.9717C59.1298 70.822 62.2347 73.9434 66.0649 73.9434C69.895 73.9434 73 70.822 73 66.9717C73 63.1213 69.895 60 66.0649 60Z" fill="#B6F500"/>
              <path d="M48.8657 60C45.0355 60 41.9305 63.1213 41.9305 66.9717C41.9305 70.822 45.0355 73.9434 48.8657 73.9434C52.6958 73.9434 55.8008 70.822 55.8008 66.9717C55.8008 63.1213 52.6958 60 48.8657 60Z" fill="currentColor"/>
              <path d="M66.0649 78.0566C62.2347 78.0566 59.1298 81.178 59.1298 85.0283C59.1298 88.8787 62.2347 92 66.0649 92C69.895 92 73 88.8787 73 85.0283C73 81.178 69.895 78.0566 66.0649 78.0566Z" fill="currentColor"/>
              <path d="M48.8657 78.0566C45.0355 78.0566 41.9305 81.178 41.9305 85.0283C41.9305 88.8787 45.0355 92 48.8657 92C52.6958 92 55.8008 88.8787 55.8008 85.0283C55.8008 81.178 52.6958 78.0566 48.8657 78.0566Z" fill="currentColor" fillOpacity="0.55"/>
            </g>
            <path d="M72 3L72 53L42 53L42 3L72 3Z" fill="currentColor"/>
            <defs>
              <clipPath id="clip0_323_1068">
                <rect width="31" height="32" fill="white" transform="translate(73 92) rotate(-180)"/>
              </clipPath>
            </defs>
          </svg>
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
